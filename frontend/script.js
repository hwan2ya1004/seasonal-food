const apiUrl = 'http://localhost:3000/api/food'; // 백엔드 프록시 서버로 요청

async function fetchMonthlyFood() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayFoodItems(data);
    } catch (error) {
        console.error('Error fetching food data:', error);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');
    
    data.items.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');

        foodDiv.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}">
            <p>${item.description}</p>
        `;

        foodContainer.appendChild(foodDiv);
    });
}

fetchMonthlyFood();
