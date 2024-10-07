const apiUrl = '/.netlify/functions/food'; // Netlify Functions 엔드포인트

async function fetchMonthlyFood() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // API 응답 확인
        displayFoodItems(data); // 데이터를 화면에 출력
    } catch (error) {
        console.error('Error fetching food data:', error.message);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');

    // 응답 데이터 구조가 예상한 대로 들어오는지 확인
    if (!data || Object.keys(data).length === 0) {
        console.error('No items found in the response');
        return;
    }

    data.items.forEach(item => { // items 배열에 맞게 데이터 출력
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
