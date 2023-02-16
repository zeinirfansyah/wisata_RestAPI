const config = require('../config/database')
const mysql = require('mysql')
const pool = mysql.createPool(config)


pool.on('error', (err)=> {
    console.error(err);
})

module.exports = {
    // Ambil data semua karyawan
    getDataUser(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user;
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

    // Ambil data user berdasarkan id
    getDataUserByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user WHERE id_user = ?;
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

    // Tambah data user
    addDataUser(req,res){
        let data = {
            nama_user: req.body.nama_user,
            alamat_user: req.body.alamat_user,
            email_user: req.body.email_user,
            username_user: req.body.email_user,
            password_user: req.body.password_user,
        }
        pool.getConnection(function(err, connection) {
            if(err) throw err;
            connection.query(
                'INSERT INTO user SET ?',
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

    // Edit data user
    editDataUser(req,res){
        let dataEdit = {
            nama_user: req.body.nama_user,
            alamat_user: req.body.alamat_user,
            email_user: req.body.email_user,
            username_user: req.body.email_user,
            password_user: req.body.password_user,
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE user SET ? WHERE id_user = ?;
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

    // Delete data user
    deleteDataUser(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM user WHERE id_user = ?;
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