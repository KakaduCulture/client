const http = require('http');

http.createServer((req, res) => {
    // Route: Home
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('hello guys');
    } 
    // Route: About
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Project: Kakadu Culture Website
Description: This project is a simple Node.js-based website created to showcase and educate users about the rich cultural heritage of the Kakadu region in Australia. The site presents stories, traditions, and knowledge of the Bininj/Mungguy people, highlighting their deep connection to land, nature, and spiritual beliefs.
Features:
- Home page introduction
- About section with cultural background
- Visual gallery and story flow (based on provided flow task image)
- Educational content for users
Team: Quantum`);
    } 
    // Route: Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}).listen(3000);

console.log('Server running on port 3000');
