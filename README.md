This is the repository for the FEC project by team Yosemite

To make use of this repository on your localhost or deployed server you must take the following steps:

Clone the repo down to your machine and cd into the directory
Run: npm install
Run: touch config.js and add the following with a text editor of your choice: const key = ''; <---- add GitHub API key here const protocol = 'http'; const hostname = ''; <---- add host IP here const port = '80'; module.exports = { key, protocol, hostname, port };
Run: npx webpack --mode=production -w
Run: npm start
Navigate to IP to visit your site
Enjoy, flourish and prosper
