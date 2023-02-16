const app = require('express').Router()
const {user} = require('../controllers')

// get - menampilkan semua data user
app.get('/user', function(req, res) {
    user.getDataUser
})

// get - menampilkan data user berdasarkan id
app.get('/user/:id', function(req, res) {
    user.getDataUserByID
})

// post - Tambah data user ke database
app.post('/user/add', function(req, res) {
    user.addDataUser
})

// post = edit data user
app.post('/user/edit', function(req, res) {
    user.editDataUser
})

// post = hapus data user
app.post('/user/delete/', function(req, res) {
    user.deleteDataUser
})
module.exports = app