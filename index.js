// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// app.use('/',(req, res, next)=>{
//     console.log('This always runs!');
//     next();    
// });

app.use('/add-product',(req, res, next)=>{
    res.send('<form action ="/product"><input type ="text" name ="title"><button type="submit">Submit</button></form>');
});
app.use('/product',(req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})
app.use('/',(req, res, next)=>{
    console.log('in the middleware');
    res.send('<h1>Hello from Express.js</h1>');
});
// const server = http.createServer(app);
app.listen(8000);