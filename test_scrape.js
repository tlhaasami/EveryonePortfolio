const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function test() {
  const html = await fetchHTML('https://github.com/tlhaasami?tab=repositories');
  console.log("HTML length:", html.length);
  
  // Find all repo links
  // <a href="/tlhaasami/ExpenseTracker" itemprop="name codeRepository"
  // Let's print matches
  const regex = /href="\/([^\/]+)\/([^\"]+)"\s+itemprop="name codeRepository"/g;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null) {
    console.log(`Found: Owner=${match[1]}, Repo=${match[2]}`);
    count++;
  }
  console.log("Total matched count:", count);
}

test();
