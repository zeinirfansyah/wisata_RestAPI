const app = require('express').Router()
const {hotel} = require('../controllers')

// get - menampilkan semua data hotel
app.get('/hotel', function(req, res) {
    hotel.getDataHotel
})

// get - menampilkan data hotel berdasarkan id
app.get('/hotel/:id', function(req, res) {
    hotel.getDataHotelByID
})

// post - Tambah data hotel ke database
app.post('/hotel/add', function(req, res) {
    hotel.addDataHotel
})

// post = edit data hotel
app.post('/hotel/edit', function(req, res) {
    hotel.editDataHotel
})

// post = hapus data hotel
app.post('/hotel/delete/', function(req, res) {
    hotel.deleteDataHotel
})

module.exports = app