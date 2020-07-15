const db = require('../db')

module.exports.index = (req, res) => {
    res.render('product/product', {
        products: db.get('products').value()
    })
}