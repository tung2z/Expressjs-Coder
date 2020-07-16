const db = require("../db")
const { values, value } = require("../db")

module.exports.index = (req, res) => {
    let sessionId = req.signedCookies.sessionId
    let items = []
    let itemId = db.get('sessions').find({id: sessionId}).value().cart
    Object.keys(itemId).map((item) => {
        let product = db.get('products').find({id: item}).value()
        product.count = itemId[item]
        items.push(product)
    })
    res.render('cart/index', {
        items: items
    })
}

module.exports.addToCart = (req, res) => {
    let productId = req.params.productId
    let sessionId = req.signedCookies.sessionId
    if (!sessionId){
        res.redirect('/products')
        return
    }

    let count = db.get('sessions')
                .find({id: sessionId})
                .get('cart.' + productId, 0)
                .value()

    db.get('sessions')
        .find({id: sessionId})
        .set('cart.' + productId, count + 1)
        .write()
    
    res.redirect('/products')
}