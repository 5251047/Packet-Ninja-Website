let previousScores = []; // Define previousScores outside the handler function

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const scores = data && Array.isArray(data.data) ? data.data : [];

        console.log('Received scores:', scores); // Log the received scores

        // Check if the received scores are different from the previous scores
        if (JSON.stringify(scores) !== JSON.stringify(previousScores)) {
            previousScores = scores;
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scores)
            };
        } else {
            // If scores are same as previous, return an empty response
            return {
                statusCode: 204, // No Content
                body: ''
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
