var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
var dotenv = require('dotenv');
dotenv.config();

router.get('/',function(req,res,next){
  res.redirect('/home');
});

router.get('/home', function(req, res, next) {
 	res.render('index');
});

router.get('/history',function(req,res,next){
	res.render('history');
});
router.get('/services',function(req,res,next){
  res.render('services');
});
router.get('/objectives', function(req, res, next) {
 	res.render('objectives');
});
router.get('/contact', function(req, res, next) {
 	res.render('contact',{msg:""});
});
router.get('/legality',function(req,res,next){
	res.render('legality');
});
router.get('/gallery',function(req,res,next){
	res.render('gallery');
});

router.post('/contact',function(req,res,next){
    sgMail.setApiKey(process.env.API_KEY);
    const msg = {
        to: "surakshya.pvt.ltd@gmail.com",
        from: req.body.email,
        subject:"("+req.body.fname+" "+req.body.lname+")"+req.body.subject,
        text: req.body.body,
    };
    sgMail.send(msg);
    const msg2 = {
        to: req.body.email,
        from: "surakshya.pvt.ltd@gmail.com",
        subject: req.body.subject,
        text:"Hello,"+req.body.fname+" "+req.body.lname+".Thank you for choosing us.",
    };
    sgMail.send(msg2);
    res.render("contact",{msg:"Your message has been sent."});
    });

module.exports = router;
