const axios = require('axios');

exports.handler = async function(event, context) {
    const NONGSARO_API_URL = 'https://www.nongsaro.go.kr/service/api/todayDish'; // API URL (올바른 경로 확인 필요)
    const SERVICE_KEY = '20240930BMFN7QZWMDHIZONL1QOAPQ'; // 서비스 키

    try {
        const response = await axios.get(NONGSARO_API_URL, {
            params: {
                menuId: 'PS00001', // 파라미터를 문서에서 다시 확인
                serviceKey: SERVICE_KEY
            }
        });

        // 응답이 정상인지 확인한 후 프론트엔드로 전달
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
