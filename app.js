const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json());

app.get('/get-mahasiswa', function (req, res) {
    const queryStr = "SELECT * FROM mahasiswa WHERE deleted_at IS NULL";
    conn.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            res.error(err.sqlMessage,res);
        } else {
            res.status(200).json({
                "success" : true,
                "message" : "berhasil menampilkan data",
                "data": results
            });
        }
    });
})

app.post('/store-mahasiswa', function (req, res) {
    const param = req.body;
    const name = param.name;
    const jurusan = param.jurusan;
    const now = new Date();

    const queryStr = "INSERT INTO mahasiswa (name, jurusan, created_at) VALUES (?,?,?)";
    const values = [name,jurusan, now];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "success" : true,
                "message" : "berhasil menambahkan data",
                "data": results
            });
        }
    });
})

app.get('/get-mahasiswa-by-id', function (req, res) {
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM mahasiswa WHERE deleted_at IS NULL AND id = ?";
    const values = [id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "success" : true,
                "message" : "berhasil menampilkan data",
                "data": results
            });
        }
    })
})

app.post('/update-mahasiswa', function (req, res) {
    const param = req.body;
    const id = param.id;
    const name = param.name;
    const jurusan = param.jurusan;

    const queryStr = "UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ? AND deleted_at IS NULL";
    const values = [name, jurusan, id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "success" : true,
                "message" : "berhasil mengupdate data",
                "data": results
            });
        }
    });
})

app.post('/delete-mahasiswa', function (req, res) {
    const param = req.body;
    const id = param.id;
    const now = new Date();

    const queryStr = "UPDATE mahasiswa SET deleted_at = ? WHERE id = ?";
    const values = [now, id];

    conn.query(queryStr, values, (err, results) => {
        if (err) {
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "success" : true,
                "message" : "berhasil menghapus data",
                "data": results
            });
        }
    });
})

app.listen(3000);