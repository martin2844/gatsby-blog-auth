---
title: "Javascript Arrays"
date: "2019-06-14"
sinopsis: "En este tutorial vas a poder ver en detalle 8 metodos muy utiles para arrays, Filter, map, some, includes, every, forEach, reduce, find. Esta es la primera parte, en la segunda parte cubriremos más metodos aplicables a Arrays, que resultan utiles en muchos casos diversos"
tags: [Javascript]
category: "Front-End"
id: "78"
---


En este tutorial van a poder ver  8 metodos aplicables a arrays en javascript que nos van ayudar a trabajar mejor con ellos.
Filter, map, some, includes, every, forEach, reduce, find

### Parte 1

1. Filter

```javascript

const miembros = [
        {nombre: "Juan", edad: 20},
        {nombre: "Raul", edad: 22},
        {nombre: "Ignacio", edad: 16},
        {nombre: "Felipe", edad: 14},
        {nombre: "Roberto", edad: 17},
        {nombre: "Fausto", edad: 19},
]

const menores = miembros.filter((miembro) => {
    return miembro.edad < 18
})

console.log(menores);



```
va devolver esto =

```javascript


(3) [{…}, {…}, {…}]
0: {nombre: "Ignacio", edad: 16}
1: {nombre: "Felipe", edad: 14}
2: {nombre: "Roberto", edad: 17}
length: 3
__proto__: Array(0)
```

___

2. Map

Map va a crear un nuevo array con el resultado de la función por cada elemento del array.
Sirve en el ejemplo anterior, si queremos un array con solo las edades

```javascript

const miembros = [
        {nombre: "Juan", edad: 20},
        {nombre: "Raul", edad: 22},
        {nombre: "Ignacio", edad: 16},
        {nombre: "Felipe", edad: 14},
        {nombre: "Roberto", edad: 17},
        {nombre: "Fausto", edad: 19},
]

const soloNombres = miembros.map((miembro) => {
    return miembro.nombre
})

console.log(soloNombres);



```

va devolver esto =

```javascript



(6) ["Juan", "Raul", "Ignacio", "Felipe", "Roberto", "Fausto"]
0: "Juan"
1: "Raul"
2: "Ignacio"
3: "Felipe"
4: "Roberto"
5: "Fausto"
length: 6
__proto__: Array(0)
```

___

3. Some

El metodo some, prueba que al menos uno de los elementos del array pase la pruebaw que le pongamos en la función.
Devuelve un Boolean, osea un verdadero o falso.

```javascript

const array = [1,2,3,4,5,6,7,8];

const hayNumerosPares = array.some((numero) => {
    return numero % 2 === 0;
});

console.log(hayNumerosPares);

```

devuelve simplemente true

___

4. Includes

Al igual que some, va a devolver un Boolean. Este metodo va a verificar que el array contenga un determinado elemento.




```javascript

const array = [1,2,3,4,5,6,7,8];

const contieneNumeroSiete = array.includes(7);

console.log(hayNumerosPares);

```
devuelve simplemente true

___


5. Every

Se va a fijar que cada elemento del array cumpla la condición que ponemos. Si es verdad, devuelve true, sino falso.
Ejemplo:

```javascript
var array2 = [1,2,3,4,5,6,7];

var menoraQue8 = array2.every((numero) => {
    return numero < 8
});

console.log(menoraQue8);
```
devuelve simplemente true

___

6. forEach

Este es uno de los que más se usa probablemente, sirve para evitar un for loop tradicional. Es mucho más limpio en su sintaxis.
Lo que va hacer es repetir lo que nosotros pasemos por cada elemento del array.


```javascript
var array2 = [1,2,3,4,5,6,7];

array2.forEach((numero) => {
    console.log("esto es un for each Loop " + numero );

});


```
Devuelve -->

```javascript

esto es un for each Loop 1
esto es un for each Loop 2
esto es un for each Loop 3
esto es un for each Loop 4
esto es un for each Loop 5
esto es un for each Loop 6
esto es un for each Loop 7

```

___

8. Find

```javascript

var array1 = [6, 14, 28, 4, 34];

var encontrado = array1.find(function(numero) {
  return numero > 10;
});

console.log(encontrado);

```
Devuelve ---> 14

Esto es porque devuelve el primer resultado que encuentre que cumpla con la condición que le pasamos.

___


## Mirá el video que está todo mucho mejor explicado!



[![Mira el video](https://i.ytimg.com/vi/IFzWJ_Gtr4A/hqdefault.jpg)](https://www.youtube.com/watch?v=IFzWJ_Gtr4A&t)