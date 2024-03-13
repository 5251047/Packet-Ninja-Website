exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        let scores;
        const data = JSON.parse(event.body);
        const localStorageScores = localStorage.getItem('scores');

        if (localStorageScores) {
            scores = JSON.parse(localStorageScores);
        } else {
            // Read data from the text file
            const text = await fetch("data.txt").then(res => res.text());
            scores = text.split('\n').map(line => {
                const [name, score] = line.split(':');
                return { name: name.trim(), score: parseInt(score.trim()) };
            });

            // Save scores to localStorage
            localStorage.setItem('scores', JSON.stringify(scores));
        }

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
