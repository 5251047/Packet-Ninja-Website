// functions/updateScores.js
const { promises: fs } = require('fs');

exports.handler = async (event, context) => {
  const { data } = JSON.parse(event.body);

  try {
    // Get the file path
    const filePath = '/tmp/scores.txt';

    // Create or append scores to the file
    const fileContents = await fs.readFile(filePath, 'utf-8').catch(() => '');
    const updatedContents = fileContents + data.map(({ name, score }) => `${name}:${score}\n`).join('');
    await fs.writeFile(filePath, updatedContents);

    // Upload the file to Persistent Object Storage
    await context.utils.bucket.upload(filePath, '/scores.txt', { isPublic: false });

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