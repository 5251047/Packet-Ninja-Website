const fs = require('fs');

exports.handler = async (event, context) => {
    try {
        const scoresData = fs.readFileSync('scores.json');
        const scores = JSON.parse(scoresData);
        
        console.log('Received scores:', scores);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scores)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
