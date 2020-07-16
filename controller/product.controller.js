const db = require('../db')

module.exports.index = (req, res) => {
    let page = parseInt(req.query.page) || 1
    let perPage = 6
    let numOfProd = 1
    db.get('products').value().map(() => numOfProd++)
    let numOfPage = parseInt(numOfProd / perPage) + 1

    let start = (page - 1) * perPage
    let end = page * perPage
    res.render('product/product', {
        products: db.get('products').value().slice(start, end),
        numOfPage: numOfPage,
        n: 1
    })
}

module.exports.searchProducts = (req, res) => {
    let q = req.query.q 
    let matchedProducts = db.get('products').value().filter((product) => {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    let page = parseInt(req.query.page) || 1
    let perPage = 6
    let numOfProd = 0
    matchedProducts.map(() => numOfProd++)
    let numOfPage = parseInt(numOfProd / perPage) + 1

    let start = (page - 1) * perPage
    let end = page * perPage
    res.render('product/product', {
        products: matchedProducts.slice(start, end),
        numOfPage1: numOfPage,
        n: 1, 
        q: q
    })
}