#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();
var path = require('path');
var simpleoauth2 = require("simple-oauth2");

var hbs = require('hbs');

var request = require('request');

var fs = require('fs');

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.set('port', process.env.PORT || 8080 );

app.set('view engine', 'hbs');

app.get('/', function (req, res){
    dict = {
        Daniel :   'poop',
        Kushal  :  [['Kushal', 1, 'Robo'], ['Roger', 2, 'APUSH'], ['Tuan', 3, 'English11'], ['Ethan', 4, 'APPhysics'], ['Yash', 5, 'CalcBC'], ['Nitish', 6, 'DNA'], ['Nitish', 7, 'Neuro']],
        Mikail   : [['David', 1, 'APChem'], ['Tuan', 2, 'English10'], ['Kushal', 3, 'Proto'], ['Roger', 4, 'APGov'], ['Ethan', 5, 'EM'], ['Steven', 6, 'Bio'], ['Yash', 7, 'Math45']],
        Justin  :  [['Tuan', 1, 'English11'], ['Prerak', 2, 'APMusicTheory'], ['Nitish', 3, 'Neuro'], ['Prateek', 4, 'Electronics'], ['Steven', 5, 'Bio'], ['Kushal', 6, 'Proto'], ['Yash', 7, 'Math45']],
        Alex : [['David', 1, 'APChem'], ['Prateek', 2, 'Electronics'], ['Nitish', 3, 'Neuro'], ['Nitish', 4, 'DNA'], ['Yash', 5, 'CalcBC'], ['Roger', 6, 'APUSH'], ['Prateek', 7, 'Tech']],
        William  :  [['Steven', 1, 'Bio'], ['Nitish', 2, 'Neuro'], ['Prateek', 3, 'Electronics'], ['Roger', 4, 'APGov'], ['Kushal', 5, 'Proto'], ['Yash', 6, 'CalcBC'], ['Prerak', 7, 'Drama']],
        Aneesh  :  [['Kushal', 1, 'Robo'], ['Roger', 2, 'APUSH'], ['Nitish', 3, 'Neuro'], ['Prerak', 4, 'APMusicTheory'], ['Steven', 5, 'Bio'], ['Ethan', 6, 'EM'], ['Prateek', 7, 'Tech']],               
    }
    res.render('HACKTJ', dict);
})


var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});