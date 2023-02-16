const config = require('../config/database')
const mysql = require('mysql')
const pool = mysql.createPool(config)


pool.on('error', (err)=> {
    console.error(err);
})

module.exports = {
    // Ambil data semua karyawan
    getDataHotel(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM hotel;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },

    // Ambil data hotel berdasarkan id
    getDataHotelByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM hotel WHERE id_hotel = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },

    // Tambah data hotel
    addDataHotel(req,res){
        let data = {
            nama_hotel: req.body.nama_hotel,
            alamat_hotel: req.body.alamat_hotel,
            deskripsi_hotel: req.body.deskripsi_hotel,
            foto_hotel: req.body.foto_hotel,
            latitude_hotel: req.body.latitude_hotel,
            longitude_hotel: req.body.longitude_hotel
        }
        pool.getConnection(function(err, connection) {
            if(err) throw err;
            connection.query(
                'INSERT INTO hotel SET ?',
                [data],
                function (error, results) {
                    if(error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil tambah data!',
                        data: results
                    })
                })
                connection.release()
        })
    },

    // Edit data hotel
    editDataHotel(req,res){
        let dataEdit = {
            nama_hotel: req.body.nama_hotel,
            alamat_hotel: req.body.alamat_hotel,
            deskripsi_hotel: req.body.deskripsi_hotel,
            foto_hotel: req.body.foto_hotel,
            latitude_hotel: req.body.latitude_hotel,
            longitude_hotel: req.body.longitude_hotel
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE hotel SET ? WHERE id_hotel = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },

    // Delete data hotel
    deleteDataHotel(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM hotel WHERE id_hotel = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    }
}