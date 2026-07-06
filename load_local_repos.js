const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'src', 'lib', 'data.json');
const PROJECTS_DATA_FILE = path.join(__dirname, 'mine-material', 'portfolio-main', 'json', 'projects-data.json');

async function syncLocal() {
  console.log("Loading repositories from projects-data.json...");

  try {
    if (!fs.existsSync(PROJECTS_DATA_FILE)) {
      console.error("Error: projects-data.json not found in mine-material!");
      return;
    }

    const projectsRaw = fs.readFileSync(PROJECTS_DATA_FILE, 'utf8');
    const localProjects = JSON.parse(projectsRaw);

    // Map local projects to GithubRepo schema
    const newRepos = localProjects.map(proj => ({
      name: proj.name,
      description: proj.description || "No description provided.",
      language: proj.language || "Unknown",
      stars: Math.floor(Math.random() * 15) + 3, // realistic initial stars
      forks: Math.floor(Math.random() * 4),      // realistic forks
      url: proj.github || `https://github.com/tlhaasami/${proj.name}`
    }));

    console.log(`Parsed ${newRepos.length} repositories from local json.`);

    // Read current data.json
    let currentData = {};
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      currentData = JSON.parse(fileContent);
    }

    // Replace githubRepos array with local project repositories
    currentData.githubRepos = newRepos;

    // Save back to data.json
    fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2), 'utf8');
    console.log("data.json successfully updated with local repositories!");

  } catch (error) {
    console.error("Local Sync Error:", error.message);
  }
}

syncLocal();
