const config = require('../config/database')
const mysql = require('mysql')
const pool = mysql.createPool(config)


pool.on('error', (err)=> {
    console.error(err);
})

module.exports = {
    // Ambil data semua karyawan
    getDataWisata(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM wisata;
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

    // Ambil data wisata berdasarkan id
    getDataWisataByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM wisata WHERE id_wisata = ?;
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

    // Tambah data wisata
    addDataWisata(req,res){
        let data = {
            nama_wisata: req.body.nama_wisata,
            alamat_wisata: req.body.alamat_wisata,
            deskripsi_wisata: req.body.deskripsi_wisata,
            foto_wisata: req.body.foto_wisata,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        pool.getConnection(function(err, connection) {
            if(err) throw err;
            connection.query(
                'INSERT INTO wisata SET ?',
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

    // Edit data wisata
    editDataWisata(req,res){
        let dataEdit = {
            nama_wisata: req.body.nama_wisata,
            alamat_wisata: req.body.alamat_wisata,
            deskripsi_wisata: req.body.deskripsi_wisata,
            foto_wisata: req.body.foto_wisata,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE wisata SET ? WHERE id_wisata = ?;
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

    // Delete data wisata
    deleteDataWisatan(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM wisata WHERE id_wisata = ?;
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