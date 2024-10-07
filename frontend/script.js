const apiUrl = 'http://localhost:3000/api/food'; // 로컬 백엔드에서 데이터를 받기 위한 엔드포인트

async function fetchMonthlyFood() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // 데이터가 올바르게 들어오는지 확인
        displayFoodItems(data); // 데이터를 화면에 출력
    } catch (error) {
        console.error('Error fetching food data:', error.message);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');

    if (!data.items || data.items.length === 0) {
        console.error('No items found in the response');
        return;
    }

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
