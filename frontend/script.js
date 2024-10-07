const apiUrl = '/.netlify/functions/food'; // Netlify Function 엔드포인트

async function fetchMonthlyFood() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // 응답 데이터 출력
        displayFoodItems(data);
    } catch (error) {
        console.error('Error fetching food data:', error.message);
    }
}

function displayFoodItems(data) {
    const foodContainer = document.getElementById('food-container');

    // API 응답 데이터를 확인하여 올바른 경로로 접근
    if (!data || Object.keys(data).length === 0) {
        console.error('No items found in the response');
        return;
    }

    // 실제 데이터 구조를 기반으로 이 부분을 수정할 예정입니다.
    // console.log로 API 응답을 먼저 확인하세요.
}

fetchMonthlyFood();
