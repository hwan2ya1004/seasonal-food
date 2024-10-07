const axios = require('axios');

exports.handler = async function(event, context) {
    const NONGSARO_API_URL = 'https://www.nongsaro.go.kr/service/api/todayDish'; // 정확한 API 엔드포인트 확인 필요
    const SERVICE_KEY = '20240930BMFN7QZWMDHIZONL1QOAPQ'; // 제공된 서비스 키 사용

    try {
        // 백엔드에서 Nongsaro API로 요청을 전송
        const response = await axios.get(NONGSARO_API_URL, {
            params: {
                menuId: 'PS00001', // 필요한 파라미터 추가
                serviceKey: SERVICE_KEY
            }
        });

        // 성공적으로 응답을 받았을 때
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        // 에러 발생 시 콘솔 출력 및 프론트엔드로 전달
        console.error('Error fetching data from Nongsaro API:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from Nongsaro API' })
        };
    }
};
