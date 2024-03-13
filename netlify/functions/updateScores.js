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
      // Prepare HTML response
      const htmlResponse = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Scores</title>
          </head>
          <body>
              <h1>Scores</h1>
              <ul id="scores">
                  ${scores.map(score => `<li>${score.name} : ${score.score}</li>`).join('')}
              </ul>
              <script>
                  function updateScores(scores) {
                      var scoresList = document.getElementById("scores");
                      scoresList.innerHTML = ""; // Clear previous scores

                      scores.forEach(function(score) {
                          var listItem = document.createElement("li");
                          listItem.textContent = score.name + " : " + score.score;
                          scoresList.appendChild(listItem);
                      });
                  }

                  // Initial update
                  updateScores(${JSON.stringify(scores)});

                  // Poll for updates every 5 seconds (for demonstration purposes)
                  setInterval(function() {
                      fetch("/.netlify/functions/updateScores", {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({})
                      })
                      .then(response => response.json())
                      .then(data => updateScores(data.data))
                      .catch(error => console.error('Error fetching scores:', error));
                  }, 5000);
              </script>
          </body>
          </html>
      `;

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
}
