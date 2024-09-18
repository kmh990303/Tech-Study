const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res, next) => {
    const { name, password } = req.body
    console.log(name, password)

    res.send({
        name,
        password,
        message: 'Success to post form data!!!'
    })
})

app.use((req, res, next) => {
    throw new Error('cannot find this route');
})

app.use((error, req, res, next) => {
    res.send({
        message: 'cannot find your fetch data...'
    })
})

const PORT = 3000; // 예: 다른 포트로 변경

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
