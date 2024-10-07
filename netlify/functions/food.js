const axios = require('axios');

exports.handler = async function(event, context) {
    const NONGSARO_API_URL = 'https://www.nongsaro.go.kr/service/api/todayDish'; // 실제 API 엔드포인트 확인 필요
    const SERVICE_KEY = '20240930BMFN7QZWMDHIZONL1QOAPQ'; // 서비스 키

    try {
        const response = await axios.get(NONGSARO_API_URL, {
            params: {
                menuId: 'PS00001',  // API 문서에서 제공하는 파라미터를 확인하세요
                serviceKey: SERVICE_KEY
            }
        });

        // 성공적인 API 응답을 프론트엔드로 전달
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('Error fetching data from Nongsaro API:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from Nongsaro API' })
        };
    }
};
