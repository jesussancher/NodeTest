const fs = require('fs');
const express = require('express')
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { response } = require('express');

app.listen(8000, () =>{
    console.log("Servidor iniciado en el puerto 8000")
})
app.use(express.static('public')) //Servir archivos estáticos sobre el directorio Public

app.get('/', (req,res) =>{
    console.log(req)
    res.send("<h1>Hello world</h1>")
})

app.get('/bienvenida', (req,res) =>{
    res.send("<h1>Sección de Bienvenida</h1>")
})


app.use('/', router);
app.use(bodyParser.urlencoded())

app.get('/inicio', (request, response) =>{
    console.log(request.url)
    response.sendFile(path.join(__dirname,'/./assets/login.html'));
})
app.get('/registro', (request, response) =>{
    console.log(request.url)
    response.sendFile(path.join(__dirname,'/./assets/register.html'));
})
app.use((req, res) => {
    res.send('<h1>404</h1>')
})
app.get('/restablecer-contrasena', (request, response) =>{
    console.log(request.url)
    response.sendFile(path.join(__dirname,'/./assets/forgot-password.html'));
})
app.get('/nosotros', (request, response) =>{
    let count = [];
    let counter = 0;
    console.log(request.url)
    try{
        const results = fs.readFileSync('./assets/contador.txt');
        for(let i = 8; i < results.toString().length; i ++){
            count.push(results.toString()[i])
        }
        counter = parseInt(count.join(""),10) + 1
        response.send("<h1>"+results.toString()+"</h1>")
        try{
            const results = fs.writeFileSync('./assets/contador.txt',('visitas:'+counter))
            console.log(results)
        }catch(error){
            console.log(error.message)
        }

    }catch(error){
        console.log(error.message)
    }
})


app.use('/prueba', (request, response) =>{
    console.log(request.url)
    if(request.url === '/captura'){
        response.send("El usuario está intentando acceder a una imagen llamada captura")
    }
    response.send(request.url)
})
fs.readFile('./hola-mundo.txt',(error,data) => {
    if(error){
        console.log("No se encontró el archivo")
    }else {
        const lorem = data.toString()
        const arreglo = lorem.split(" ")
        console.log(arreglo[1])
    }
});

fs.writeFile('hola-mundo.txt', "Holaaaa", (error) => {
    if(error){
        console.log("No se pudo escribir en el archivo")
    }else {

    }
})

try{
    const results = fs.readFileSync('hola-mundo.txt');
    console.log(results.toString())
}catch(error){
    console.log(error.message)
}

try{
    const results = fs.writeFileSync('hola-mundo.txt','Holaaaaaa mundo')
    console.log(results)
}catch(error){
    console.log(error.message)
}

try{
    fs.appendFileSync('hola-mundo.txt','Holi')
}catch(error){
    console.log(error.message)
}
