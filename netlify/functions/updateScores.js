// functions/updateScores.js
exports.handler = async (event, context) => {
    const { data } = JSON.parse(event.body);
    const fs = require('fs');
    const path = require('path');
  
    try {
      // Get the file path
      const filePath = path.join(process.cwd(), 'scores.txt');
  
      // Append scores to the file
      for (const { name, score } of data) {
        const line = `${name}:${score}\n`;
        fs.appendFileSync(filePath, line);
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Scores updated successfully' }),
      };
    } catch (error) {
      console.error('Error updating scores:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error updating scores' }),
      };
    }
  };
