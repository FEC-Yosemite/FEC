# FEC
This is the repository for the FEC project by team Yosemite

To make use of this repository on your localhost or deployed server you must take the following steps:

1. Clone the repo down to your machine and cd into the directory
2. Run: npm install
3. Run: touch config.js and add the following with a text editor of your choice:

          const key = '*******'; // add GitHub API key here
          const protocol = 'http';
          const hostname = '*******'; // add host IP here
          const port = '****'; // add host port here
          module.exports = { key, protocol, hostname, port };
          
4. Run: npx webpack --mode=production
5. Run: npm start
6. Navigate to IP to visit your site
7. Enjoy, flourish and prosper

