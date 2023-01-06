// const http= require('http');
// const port = 8000;
// const server = http.createServer((req, res)=>{
//     const url = req.url;
//     if (url ==='/'){
//         res.setHeader("Content-Type",'text/html');
//             res.write('<html>');
//             res.write('<head><title>My First Page</title></head>');
//             res.write('<body><h1>HOME</h1></body>');
//             res.write('</html>');
//             res.end();
//     }
//     if (url ==='/user'){
//         res.setHeader("Content-Type",'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>USER</h1></body>');
//     res.write('</html>');
//     res.end();
//     }
//     if (url ==='/create'){
//         res.setHeader("Content-Type",'text/html');
//             res.write('<html>');
//             res.write('<head><title>My First Page</title></head>');
//             res.write('<body><h1>CREATE USER</h1></body>');
//             res.write('</html>');
//             res.end();
//     }
//     res.write('<head><title>My First Page</title></head>');
//     res.write('<body><h1>HELLO</h1></body>');
//     res.end()
// })
// server.listen(8000);

//1.1
// const fs = require('fs');

// fs.writeFileSync('hello.txt', 'Hello from Node.js')

//1.2
// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log(req);
// });

// server.listen(3000);

//1.3 gửi response
// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method, req.headers);

//     res.setHeader("Content-Type",'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>')
//     res.write('<body><h1>Hello from my Node.js Server</h1></body>');
//     res.write('</html>')
//     res.end()
// });

// server.listen(3000);
//
// const express = require('express')
// const app = express();
// const port = 8000;


// app.get('/', function(req, res){
//     res.send("<h1>Hello Word</h1>");

// })
// app.listen(port);

//1.4 chuyển hướng request 
// Hiển thị một trang HTML có một thẻ input và một button khi truy cập vào http://localhost:3000, bấm button thì chuyển qua http://localhost:3000/message. 
// Khi truy cập http://localhost:3000/message thì hiển thị một trang HTML có một thẻ H1 với nội dung "Hello from my Node.js server!"
// app.get('/message', function (req, res) {
//     res.send("<h1>Hello from my Node.js server!</h1>")
// })

// app.listen(port);
//Lab 1.5: Chuyển hướng request 2
//Khi có POST method được gửi tới http://localhost:3000/message thì tạo ra file message.txt với nội dung "DUMMY",
// sau đó chuyển hướng về http://localhost:3000 với response có statusCode là 302

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;
//     if(url === '/'){
//         res.write('<html>');
//         res.write('<head><title>enter Message</title></head>')
//         res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
//         res.write('</html>')
//         return res.end();
//     }
//     if (url === '/message' && method === 'POST') {
//         fs.writeFileSync('message.txt', 'DUMMY');
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//         return res.end();
//     }
//     res.setHeader("Content-Type",'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Page</title></head>')
//     res.write('<body><h1>Hello from my Node.js Server</h1></body>');
//     res.write('</html>');
//     res.end();
// });

// server.listen(8000);



//Lab 1.6: Đọc body của request
//Đọc nội dung body của request Kdi có POST method được gửi tới http://localhost:3000/message , sau đó ghi nội dung đó vào file message.txt


const http = require('http');
const fs=require('fs');
const server = http.createServer((req, res) => {
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url==='/message' && method === 'POST'){
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString();
            const message=parseBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        });
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Contente-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();
    }
);
server.listen(8000);


/**Lab 1.7: Sử dụng Hệ thống Mô-đun Node
Thực hiện export 2 thuộc tính là handler và someText trong cùng một module, chỉnh sửa code tương ứng ở nơi import và sử dụng module. */