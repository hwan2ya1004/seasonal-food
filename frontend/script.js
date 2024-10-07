const apiUrl = '/.netlify/functions/food'; // Netlify Functions 엔드포인트

async function fetchMonthlyFood() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 응답 데이터가 JSON인지 확인 (HTML이 아닌지 확인)
        if (typeof data === 'string' && data.includes('<html>')) {
            throw new Error('Received HTML error page instead of JSON');
        }

        console.log('API Response:', data); // API 응답 데이터 확인
        displayFoodItems(data);
    } catch (error) {
        console.error('Error fetching food data:', error.message);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');

    // 응답 데이터 구조에 맞게 처리
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
