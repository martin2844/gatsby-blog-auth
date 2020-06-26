---

title: "NodeJS server"
date: "2019-06-29"
sinopsis: "En este tutorial vas aprender como armar tu primer server web local usando NodeJS y Express. Es muy simple y rápido, pero también es muy útil. En menos de 15 minutos vas a tener un server corriendo de forma local, sirviendo todos tus archivos html y más. "
tags: [Nodejs]
category: "Back-end"
id: "3"
---

Como hacer un server en menos de 15 minutos.

1. Bajar NodeJs, desde [nodejs](https://nodejs.org/en/) , hay que bajar la version recomendada para todos los usuarios, simplemente para asegurarnos después de que ningun error sea porque la versión todavía no tiene full support.
2. Chequear que se instaló correctamente corriendo desde la consola de comandos lo siguiente:

```shell 
node -v
```
Si devuelve la versión es que se instaló correctamente, de otra forma dirá que no reconoce el comando.

3. Armar una nueva carpeta 
4. abrir la carpeta con VSCODE.
5. Nueva terminal en VSCODE, corremos NPM init. Todo que si.
6. Luego, en la terminal, correr "npm i express" para instalar express
7. Nuevo Archivo, llamado index.js con lo siguiente:
    
```javascript
const express = require("express");
const app = express();
const PORT = (process.env.PORT || 3000);

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/contacto", (req,res) => {
    res.sendFile(__dirname + "/contacto.html");
});

app.listen(PORT, ()=> {
    console.log("El servidor esta corriendo");
});
```

8. Crear archivos index.html, y contacto.html con lo que querramos. Cada uno de esos archivos será accesible a través de las rutas que especificamos con el app.get. Por ejemplo, para ir a la página de contacto vamos a ir a http://localhost:3000/contacto.

9. Antes de probarlo, correr en consola
```shell 
node index.js
````

###Nuestro server esta listo, probalo!





[![Mira el video](https://i.ytimg.com/vi/BThMYS4AmQA/hqdefault.jpg)](https://www.youtube.com/watch?v=BThMYS4AmQA)