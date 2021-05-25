const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching data");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list : contacts
        }); 
    });  
});
app.post('/create', function(req, res){
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in Creating contact");
            return;
        }
        
        return res.redirect('/');
    });
});
app.get('/delete', function(req,res){
    
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in Deleting");
            return;
        }
        return res.redirect('/');
    })
});
app.listen(port, function(err){
    if(err){
        console.log("Error", err);
    }
    console.log("Running", port);
}); 