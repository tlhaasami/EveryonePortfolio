const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'src', 'lib', 'data.json');

function fetchGithubRepos(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${username}/repos?sort=updated&per_page=30`,
      method: 'GET',
      headers: {
        'User-Agent': 'EveryonePortfolio-Scraper'
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const repos = JSON.parse(body);
            resolve(repos);
          } catch (e) {
            reject(new Error("Failed to parse JSON response: " + e.message));
          }
        } else {
          reject(new Error(`GitHub API returned status code ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', error => reject(error));
    req.end();
  });
}

async function sync() {
  const username = "tlhaasami";
  console.log(`Fetching repositories for GitHub user: ${username}...`);

  try {
    const rawRepos = await fetchGithubRepos(username);
    
    // Map to GithubRepo schema
    const newRepos = rawRepos.map(repo => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      language: repo.language || "Unknown",
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      url: repo.html_url
    }));

    console.log(`Fetched ${newRepos.length} public repositories.`);

    // Read current data.json
    let currentData = {};
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      currentData = JSON.parse(fileContent);
    }

    // Merge repos avoiding duplicate urls
    const existingRepos = currentData.githubRepos || [];
    const reposMap = new Map(existingRepos.map(r => [r.url.toLowerCase(), r]));
    newRepos.forEach(r => reposMap.set(r.url.toLowerCase(), r));
    
    currentData.githubRepos = Array.from(reposMap.values());
    currentData.profile = currentData.profile || {};
    currentData.profile.socialLinks = currentData.profile.socialLinks || {};
    currentData.profile.socialLinks.github = `https://github.com/${username}`;

    // Save back to data.json
    fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2), 'utf8');
    console.log("data.json successfully updated!");

    // Also update mockData.ts so they match
    const mockDataFile = path.join(__dirname, 'src', 'lib', 'mockData.ts');
    if (fs.existsSync(mockDataFile)) {
      let mockContent = fs.readFileSync(mockDataFile, 'utf8');
      
      // We can also overwrite mockData.ts or update it programmatically
      // For simplicity, updating the data.json is sufficient because the main page reads from data.json first
    }

  } catch (error) {
    console.error("Sync Error:", error.message);
  }
}

sync();
