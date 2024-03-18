// netlify/functions/render.js
exports.handler = async (event, context) => {
    const path = require('path');
    const fs = require('fs');
  
    const htmlFilePath = path.join(__dirname, 'public', 'index.html');
    const html = fs.readFileSync(htmlFilePath, 'utf8');
  
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  };