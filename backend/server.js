const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Nongsaro API 정보
const NONGSARO_API_URL = 'https://www.nongsaro.go.kr/portal/todayDishDtl.ps?menuId=PS00001&serviceKey=20240930BMFN7QZWMDHIZONL1QOAPQ';

// CORS 허용 및 JSON 요청 처리
app.use(cors());
app.use(express.json());

// 프록시 API 엔드포인트
app.get('/api/food', async (req, res) => {
    try {
        // Nongsaro API에 요청을 보내고 응답 데이터를 반환
        const { data } = await axios.get(NONGSARO_API_URL);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Nongsaro API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Nongsaro API' });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
