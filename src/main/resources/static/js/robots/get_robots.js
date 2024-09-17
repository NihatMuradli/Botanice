document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('jwtToken');
        console.log('Token:', token); // Add this to see if token is present and valid


        if (token) {
            const response = await fetch('http://localhost:5000/api/users/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                location.replace("../../templates/access/login.html");
                return;
            }

            const result = await response.json();

            if (result.userId) {
                const robotsResponse = await fetch(`http://localhost:5000/api/robots/findRobotsByUserId/${result.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(robotsResponse);
                if (robotsResponse.ok) {
                    const robots = await robotsResponse.json();
                    const dashboard = document.querySelector('.dashboard');
                    dashboard.innerHTML = '';

                    robots.forEach(robot => {
                        const card = document.createElement('a');
                        card.classList.add("dash-card");
                        card.href = `robot.html?id=${robot.robotId}`;
                        card.innerHTML = `
                            <img src="../../static/images/bot-img.jpeg" alt="card-img" class="dash-img">
                            <div class="dash-overlay">
                                <i class="fa-solid fa-robot"></i>
                                <span class="condtion">${robot.status || 'Working'}</span>
                            </div>
                            <div class="dash-type">${robot.version}</div>
                        `;

                        dashboard.appendChild(card);
                    });


                } else {
                    console.error('Error fetching robots:', robotsResponse.status, robotsResponse.statusText);
                }
            } else {
                console.error('Unable to retrieve robot information.');
            }
        } else {
            location.replace("../../templates/access/login.html");
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});