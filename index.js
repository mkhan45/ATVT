#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();
var path = require('path');
var simpleoauth2 = require("simple-oauth2");

var hbs = require('hbs');

var request = require('request');

var fs = require('fs');

const execSync = require('child_process').execSync;

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.set('port', process.env.PORT || 8080 );

app.set('view engine', 'hbs');


function runPython(req, res, next){
    execSync("cd resources && python schedule.py");
    next();
}

function readTxt(req, res, next){
    chars = fs.readFileSync(__dirname + '//resources//sample.txt').toString().split("\n");
    console.log(chars);
    var dict = {};
    
    for(x = 0; x < chars.length; x++){
        try{
        var name = (chars[x].split(':')[0]);
        var classes = chars[x].split(':')[1].split(',');
        var arr = [];
        
        if(chars[x].split(":")[1].trim() == "TBD"){
            dict[name] = [['TBD', 1, 'TBD'], ['TBD', 2, 'TBD'], ['TBD', 3, 'TBD'], ['TBD', 4, 'TBD'], ['TBD', 5, 'TBD'], ['TBD', 6, 'TBD'], ['TBD', 7, 'TBD']]
        }
        else{
            for (var i = 0; i < classes.length; i++){
                teacher = (classes[i].split('/')[0]);
                class_ = classes[i].split('/')[1];
                arr.push([teacher, i + 1, class_]);   
            }
            
            //delete arr[arr.length - 1];
            dict[name] = arr;
        }}catch(err){}
    }
    
    // console.log("test");
    // console.log(dict);
    
    res.locals.dictionary = dict;
    
    next();
}

app.get('/', [runPython, readTxt], function (req, res){
    // dict = {
    //     Daniel :   'poop',
    //     Kushal  :  [['Kushal', 1, 'Robo'], ['Roger', 2, 'APUSH'], ['Tuan', 3, 'English11'], ['Ethan', 4, 'APPhysics'], ['Yash', 5, 'CalcBC'], ['Nitish', 6, 'DNA'], ['Nitish', 7, 'Neuro']],
    //     Mikail   : [['David', 1, 'APChem'], ['Tuan', 2, 'English10'], ['Kushal', 3, 'Proto'], ['Roger', 4, 'APGov'], ['Ethan', 5, 'EM'], ['Steven', 6, 'Bio'], ['Yash', 7, 'Math45']],
    //     Justin  :  [['Tuan', 1, 'English11'], ['Prerak', 2, 'APMusicTheory'], ['Nitish', 3, 'Neuro'], ['Prateek', 4, 'Electronics'], ['Steven', 5, 'Bio'], ['Kushal', 6, 'Proto'], ['Yash', 7, 'Math45']],
    //     Alex : [['David', 1, 'APChem'], ['Prateek', 2, 'Electronics'], ['Nitish', 3, 'Neuro'], ['Nitish', 4, 'DNA'], ['Yash', 5, 'CalcBC'], ['Roger', 6, 'APUSH'], ['Prateek', 7, 'Tech']],
    //     William  :  [['Steven', 1, 'Bio'], ['Nitish', 2, 'Neuro'], ['Prateek', 3, 'Electronics'], ['Roger', 4, 'APGov'], ['Kushal', 5, 'Proto'], ['Yash', 6, 'CalcBC'], ['Prerak', 7, 'Drama']],
    //     Aneesh  :  [['Kushal', 1, 'Robo'], ['Roger', 2, 'APUSH'], ['Nitish', 3, 'Neuro'], ['Prerak', 4, 'APMusicTheory'], ['Steven', 5, 'Bio'], ['Ethan', 6, 'EM'], ['Prateek', 7, 'Tech']],               
    // }
    feed_dict = {
        people : res.locals.dictionary,
    }
    res.render('HACKTJ', feed_dict);
})

function readTxtTeacher(req, res, next){
    chars = fs.readFileSync(__dirname + '//resources//teachers.txt').toString().split("\n");
    console.log(chars);
    var dict = {};
    
    for(x = 0; x < chars.length; x++){
        try{
            var name = (chars[x].split(':')[0]);
            var classes = chars[x].split(':')[1].split(',');
            var arr = [];
            
            if(chars[x].split(":")[1].trim() == "TBD"){
                dict[name] = ['TBD', 'TBD', 'TBD']
            }
            
            dict[name] = classes;
        }catch(err){}
    }
    
    // console.log("test");
    // console.log(dict);
    
    res.locals.dictionaryTeacher = dict;
    
    next();
}


app.get('/teachers', [runPython, readTxtTeacher], function (req, res){
    feed_dict = {
        people : res.locals.dictionaryTeacher,
    }
    res.render('HACKTJ', feed_dict);
})


var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});