const express = require('express');
const cors = require('cors');
const app = express();
const movieList = require('./movie-list.json');

const { body, validationResult } = require('express-validator');

app.use(cors())
app.use(express.json())
app.listen(4000, () => console.log("app is listening"))

app.get('/get-movie-list', (req, res) => {

    return res.status(200).send(movieList);
})

app.post('/login', body('email').isEmail(), body('password').isLength({ min: 4 }), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password } = req.body;
    if (email === "admin@email.com" && password === "password") {
        return res.status(200).send("Login success")
    }
    else {
        return res.status(401).send("Authentication failed")
    }
})