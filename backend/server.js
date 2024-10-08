const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

// CORS 허용
app.use(cors());
app.use(express.json());

// 프록시 API 엔드포인트
app.get('/api/food', async (req, res) => {
    const NONGSARO_API_URL = 'http://api.nongsaro.go.kr/service/monthFd/monthFdLst'; // Nongsaro API 엔드포인트
    const SERVICE_KEY = '20240930BMFN7QZWMDHIZONL1QOAPQ'; // 발급받은 서비스 키

    try {
        // Nongsaro API로 요청을 보내고 응답을 받아옴
        const response = await axios.get(NONGSARO_API_URL, {
            params: {
                apiKey: SERVICE_KEY, // API 키
                year: req.query.year || '2024', // 연도 기본값 2024
                month: req.query.month || '10', // 월 기본값 10월
            }
        });

        if (response.status === 200) {
            // Nongsaro API에서 성공적으로 데이터를 받았을 때 클라이언트로 응답
            res.json(response.data);
        } else {
            // 응답 상태 코드가 200이 아닌 경우 처리
            res.status(response.status).json({ error: `Failed with status code: ${response.status}` });
        }

    } catch (error) {
        console.error('Error fetching data from Nongsaro API:', error.message);

        // 에러 응답을 클라이언트로 전송
        res.status(500).json({
            error: 'Failed to fetch data from Nongsaro API',
            details: error.message
        });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
