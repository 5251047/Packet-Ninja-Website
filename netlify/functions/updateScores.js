// netlify/functions/update_scores.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const scores = JSON.parse(event.body);

  // Read the existing HTML file
  const htmlFilePath = path.join(__dirname, 'public', 'index.html');
  let htmlContent;
  try {
    htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  } catch (err) {
    console.error('Error reading HTML file:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error reading HTML file' }),
    };
  }

  // Generate the updated score list HTML
  const scoreList = scores.map(({ name, score }) => `<li>${name}: ${score}</li>`).join('');
  const updatedScoreListHtml = `<ul id="score-list">${scoreList}</ul>`;

  // Update the HTML content with the new score list
  const updatedHtmlContent = htmlContent.replace(
    /(<div id="score-container">)([\s\S]*?)(<\/div>)/,
    `$1\n${updatedScoreListHtml}\n$3`
  );

  // Write the updated HTML content back to the file
  try {
    fs.writeFileSync(htmlFilePath, updatedHtmlContent);
  } catch (err) {
    console.error('Error writing HTML file:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error writing HTML file' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Scores updated successfully' }),
  };
};