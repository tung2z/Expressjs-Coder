const express = require('express')
const app = express()

const userRoute = require('./route/user.route')

const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public')) // enable static file, static path

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Tung'
    })  
})

app.use('/users', userRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))