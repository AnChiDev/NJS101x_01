const  fs= require('fs');
const requestHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;
    if(url ==='/'){
        res.write('<html>');
        res.write('<body><h1>HELLO</h1></body>');
        res.write('</html>');
        res.end();
    }
    if(url==='./message'&& method ==='POST'){
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
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server! write to message.txt</h1></body>')
    res.write('</html>');
    res.end();
}
exports.handler=requestHandler;
exports.someText='Some hard coded text';