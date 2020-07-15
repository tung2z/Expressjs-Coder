const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const userRoute = require('./route/user.route')
const authRoute = require('./route/auth.route')
const productRoute = require('./route/product.route')

const authMiddleware = require('./middleware/auth.middleware')

const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser('rwerqewrrerq')) //signed Cookie

app.use(express.static('public')) // enable static file, static path

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Tung'
    })  
})

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)
app.use('/product', productRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))