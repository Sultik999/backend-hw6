var express = require('express');
var router = express.Router();

//DataBase connect
var mysql = require('mysql');
var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hw6_nodejs_crud',
	debug: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconnect', function (req, res, next) {
	if (db != null) {
		res.send('connect success');
	} else {
		res.send('connect fail');
	}
});

router.get('/select', function (req, res, next) {
	db.query('SELECT * FROM tb_book', function (err, rs) {
		res.render('select', { books: rs });
	});
});

router.get('/form', function (req, res, next) {
	res.render('form', { book: {} });
});

// Insert
router.post('/form', function (req, res, next) {
	db.query('INSERT INTO tb_book SET ?', req.body, function (err, rs) {
		res.redirect('/select');
		// res.send('insert success');
	});
});

// Delete
router.get('/delete', function (req, res, next) {
	db.query('DELETE FROM tb_book WHERE id = ?', req.query.id, function (err, rs) {
		res.redirect('/select');
	});
});

// Edit
router.get('/edit', function(req, res, next) {
	db.query('SELECT * FROM tb_book WHERE id = ?', req.query.id, function (err, rs) {
		res.render('form', { book: rs[0] });
	});
});

router.post('/edit', function (req, res, next) {
	var param = [
		req.body,		// data for update
		req.query.id 	// condition for update
	]
	db.query('UPDATE tb_book SET ? WHERE id = ?', param, function (err, rs) {
		res.redirect('/select');	// go to page select
	});
});

module.exports = router;
