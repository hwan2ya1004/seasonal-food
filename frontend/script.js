const apiUrl = 'http://localhost:3000/api/food'; // 백엔드 API 엔드포인트

async function fetchMonthlyFood(year, month) {
    try {
        // 연도와 월을 전달하여 서버로 요청
        const response = await fetch(`${apiUrl}?year=${year}&month=${month}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // 데이터를 콘솔에 출력하여 확인
        displayFoodItems(data); // 데이터를 화면에 표시
    } catch (error) {
        console.error('Error fetching food data:', error.message);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');

    // 데이터가 없을 경우 처리
    if (!data.items || data.items.length === 0) {
        console.error('No items found in the response');
        return;
    }

    // 데이터를 화면에 출력
    data.items.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');

        foodDiv.innerHTML = `
            <h2>${item.foodNm}</h2>
            <img src="${item.foodImage}" alt="${item.foodNm}">
            <p>${item.foodDesc}</p>
        `;

        foodContainer.appendChild(foodDiv);
    });
}

// 예시: 2024년 10월의 데이터 요청
fetchMonthlyFood('2024', '10');
