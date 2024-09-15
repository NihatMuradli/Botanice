document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('jwtToken');

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
                const flowersResponse = await fetch(`http://localhost:5000/api/flowers/findFlowersByUserId/${result.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (flowersResponse.ok) {
                    const flowers = await flowersResponse.json();
                    const dashboard = document.querySelector('.dashboard');
                    dashboard.innerHTML = '';

                    flowers.forEach(flower => {
                        if (flower.condition==undefined) {
                            const card = document.createElement('a');
                        card.classList.add("dash-card");
                        card.innerHTML = `
                            <img src="../../static/images/ficus-benjamina-care.jpg" alt="card-img" class="dash-img">
                            <div class="dash-overlay">
                                <i class="fa-regular fa-flower-tulip"></i>
                                <span class="condtion">Good</span>
                            </div>
                            <div class="dash-type">${flower.specie}</div>
                            <div class="dash-blurs">
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                            </div>
                            `;
                        dashboard.appendChild(card);
                        } else {
                            const card = document.createElement('a');
                        card.classList.add("dash-card");
                        card.innerHTML = `
                            <img src="../../static/images/ficus-benjamina-care.jpg" alt="card-img" class="dash-img">
                            <div class="dash-overlay">
                                <i class="fa-regular fa-flower-tulip"></i>
                                <span class="condtion">${flower.condition}</span>
                            </div>
                            <div class="dash-type">${flower.specie}</div>
                            <div class="dash-blurs">
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                            </div>
                            `;
                        dashboard.appendChild(card);
                        }
                        
                    });

                } else {
                    console.error('Error fetching computers:', computersResponse.status, computersResponse.statusText);
                }
            } else {
                console.error('Unable to retrieve flower information.');
            }
        } else {
            location.replace("../../templates/access/login.html");
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});


