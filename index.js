// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes= require('./routes/admin');
const shopRoutes= require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));



// app.use('/',(req, res, next)=>{
//     console.log('This always runs!');
//     next();    
// });


// app.use('/',(req, res, next)=>{
//     console.log('in the middleware');
//     res.send('<h1>Hello from Express.js</h1>');
// });
// const server = http.createServer(app);

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res,next)=>{
   res.status(404).send('<h1>Page not found</h1>');
})

app.listen(8000);