const shortid = require('shortid')

const db = require('../db')

module.exports.index = (req, res) => {
    res.render('users/index', {
        
        users: db.get('users').value()
    })
}

module.exports.search = (req, res) => {
    let q = req.query.q
    let matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('users/index', {
        users: matchedUsers,
        q: q
    })
}

module.exports.create = (req, res) => {
    res.render('users/create')
}

module.exports.view = (req, res) => {
    let id = req.params.id
    let user = db.get('users').find({ id: id}).value()
    res.render('users/view', {
        user: user
    })
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate()
    req.body.avatar = req.file.path.slice(8) //chuoi req.file.path la publics/uploads/661c719c7491e69be32e8a8c4a0ea251. slice(8) de cat chu publics di. moi mo? file duoc
    console.log(req.body.avatar)
    db.get('users').push(req.body).write()
    res.redirect('/users')
}