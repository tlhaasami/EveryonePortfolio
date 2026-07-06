const http = require('http');

const data = JSON.stringify({
  username: "tlhaasami" // Correct spelling with double 'a'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/scrape-github',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    const parsed = JSON.parse(body);
    console.log('SUCCESS:', parsed.success);
    if (parsed.success) {
      console.log('REPOS COUNT:', parsed.repos.length);
      console.log('FIRST REPO:', parsed.repos[0]);
    } else {
      console.log('ERROR:', parsed.error);
    }
  });
});

req.on('error', error => {
  console.error('ERROR:', error);
});

req.write(data);
req.end();
