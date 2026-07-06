import { NextResponse } from "next/server";
import https from "https";

// Helper to fetch raw HTML using Node's native https module to avoid Next.js caching issues
function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Failed to load URL: ${res.statusCode}`));
        }
      });
    }).on("error", reject);
  });
}

// Regex-based HTML Scraper to bypass API Rate Limits
async function scrapeGithubHTML(username: string) {
  const url = `https://github.com/${username}?tab=repositories`;
  const html = await fetchHTML(url);
  const repos: any[] = [];
  
  // Regex to match repository name items on GitHub
  const repoRegex = /href="\/([^\/]+)\/([^\"]+)"\s+itemprop="name codeRepository"/g;
  let match;

  while ((match = repoRegex.exec(html)) !== null) {
    const owner = match[1];
    const name = match[2];
    
    if (owner.toLowerCase() !== username.toLowerCase()) continue;

    // Find the enclosing list item chunk to extract metadata
    const startIndex = match.index;
    const endIndex = html.indexOf("</li>", startIndex);
    const chunk = html.substring(startIndex, endIndex > 0 ? endIndex : startIndex + 2000);

    // Extract Description
    const descMatch = chunk.match(/itemprop="description">([\s\S]*?)<\/p>/);
    const description = descMatch 
      ? descMatch[1].trim().replace(/<[^>]+>/g, "").replace(/\s+/g, " ") 
      : "No description provided.";

    // Extract Language
    const langMatch = chunk.match(/itemprop="programmingLanguage">([^<]+)</);
    const language = langMatch ? langMatch[1].trim() : "Unknown";

    // Extract Stars
    const starMatch = chunk.match(/href="\/[^"]+\/[^"]+\/stargazers"[^>]*>([\s\S]*?)<\/a>/);
    const stars = starMatch ? parseInt(starMatch[1].replace(/[^0-9]/g, "")) || 0 : 0;

    // Extract Forks
    const forkMatch = chunk.match(/href="\/[^"]+\/[^"]+\/forks"[^>]*>([\s\S]*?)<\/a>/);
    const forks = forkMatch ? parseInt(forkMatch[1].replace(/[^0-9]/g, "")) || 0 : 0;

    repos.push({
      name,
      description,
      language,
      stars,
      forks,
      url: `https://github.com/${owner}/${name}`,
    });
  }

  return repos;
}

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "Invalid input provided." },
        { status: 400 }
      );
    }

    const cleanInput = username.trim()
      .replace(/^https:\/\/github\.com\//, "")
      .replace(/^\//, "")
      .replace(/\/$/, "");

    const segments = cleanInput.split("/").filter(Boolean);

    // If it's a specific repository URL, use GitHub API
    if (segments.length >= 2) {
      const owner = segments[0];
      const repoName = segments[1];

      try {
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
          headers: { "User-Agent": "EveryonePortfolio-Scraper" },
        });

        if (!repoRes.ok) {
          throw new Error(`GitHub API error: ${repoRes.statusText}`);
        }

        const repoJson = await repoRes.json();
        const repo = {
          name: repoJson.name,
          description: repoJson.description || "No description provided.",
          language: repoJson.language || "Unknown",
          stars: repoJson.stargazers_count || 0,
          forks: repoJson.forks_count || 0,
          url: repoJson.html_url,
        };

        return NextResponse.json({
          success: true,
          isSingleRepo: true,
          repos: [repo],
        });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    // Otherwise, try parsing the HTML page first to bypass API rate limits
    const cleanUsername = segments[0] || cleanInput;
    console.log(`Scraping repositories for ${cleanUsername} via HTML parsing...`);

    let scrapeErrorMessage = "";
    try {
      const scrapedRepos = await scrapeGithubHTML(cleanUsername);
      console.log(`Scraped ${scrapedRepos.length} repos via HTML.`);
      
      if (scrapedRepos.length > 0) {
        return NextResponse.json({
          success: true,
          isSingleRepo: false,
          repos: scrapedRepos,
        });
      }
    } catch (scrapeError: any) {
      console.warn("HTML scraping failed, falling back to GitHub API...", scrapeError.message);
      scrapeErrorMessage = scrapeError.message;
    }

    // Fallback to GitHub API
    console.log("Calling fallback GitHub API...");
    const reposRes = await fetch(
      `https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=30`,
      {
        headers: { "User-Agent": "EveryonePortfolio-Scraper" },
      }
    );

    if (!reposRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from GitHub: ${reposRes.statusText}` },
        { status: reposRes.status }
      );
    }

    const reposJson = await reposRes.json();
    const repos = reposJson.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      language: repo.language || "Unknown",
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      url: repo.html_url,
    }));

    return NextResponse.json({
      success: true,
      isSingleRepo: false,
      repos: repos,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred while scraping GitHub." },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
