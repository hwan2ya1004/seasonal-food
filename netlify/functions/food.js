const axios = require('axios');

exports.handler = async function(event, context) {
    const NONGSARO_API_URL = 'https://www.nongsaro.go.kr/portal/todayDishDtl.ps';
    const SERVICE_KEY = '20240930BMFN7QZWMDHIZONL1QOAPQ';

    try {
        const response = await axios.get(NONGSARO_API_URL, {
            params: {
                menuId: 'PS00001', // 필요시 수정
                serviceKey: SERVICE_KEY
            }
        });

        // API 응답이 올바르게 반환되는지 확인
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
