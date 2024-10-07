const apiUrl = '/.netlify/functions/food'; // Netlify Function 엔드포인트

async function fetchMonthlyFood() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // API 응답을 콘솔에 출력
        displayFoodItems(data); // 데이터를 화면에 출력하는 함수 호출
    } catch (error) {
        console.error('Error fetching food data:', error.message);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');

    // 올바른 데이터 구조에 맞게 접근
    if (!data.result || !data.result.foods) {
        console.error('No items found in the response');
        return;
    }

    // 데이터를 화면에 추가
    data.result.foods.forEach(item => {
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

// API 요청을 수행
fetchMonthlyFood();
