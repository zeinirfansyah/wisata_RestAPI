// app.js adalah yang pertama kali dijalankan ketika aplikasi dijalankan

// Import library yang dibutuhkan

const express = require('express')
const bodyParser = require('body-parser')
const app = express()


// pemakaian body parser untuk ekstrak data request berformat JSON dan urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// panggil routes route wisata, route user, dan route hotel
const routeWisata = require('./src/routes/route-wisata')
const routeHotel = require('./src/routes/route-hotel')
const routeUser = require('./src/routes/route-user')

app.use(routeWisata)
app.use(routeHotel)
app.use(routeUser)


app.listen(3000, () => {
    console.log('Server run on port 3000')
})
