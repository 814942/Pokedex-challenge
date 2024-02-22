[![Say hello](https://github.com/814942/Pokedex-challenge/actions/workflows/hello.yml/badge.svg)](https://github.com/814942/Pokedex-challenge/actions/workflows/hello.yml)

[![Client Pipeline CI](https://github.com/814942/Pokedex-challenge/actions/workflows/client-pipeline.yml/badge.svg)](https://github.com/814942/Pokedex-challenge/actions/workflows/client-pipeline.yml)

[![Backend Pipeline CI](https://github.com/814942/Pokedex-challenge/actions/workflows/back-pipeline.yml/badge.svg)](https://github.com/814942/Pokedex-challenge/actions/workflows/back-pipeline.yml)

<p align='left'>
    <img src='./client/src/assets/nth.png'</img>
</p>

# Fullstack Challenge - Pokedex

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos pokemons disponibles junto con información relevante de los mismos utilizando la api externa [pokeAPI](https://pokeapi.co/). y a partir de ella poder, entre otras cosas:

  - Mostrar todos los pokemons, 15 por pagina.
  - Buscar un pokemon de acuerdo a su nombre.
  - Filtrarlos por tipos

## Objetivos completados

  - Creacion de una App utlizando React y Node (lista completa debajo).
  - Implementa un frontend que consume la información necesaria de la API.
  - Implementa un backend que consume la informacion de la API externa.
  - Implementa swagger para documentar el backend.
  - Implementa testing para el backend.
  - Implementa autentificacion con JWT.
  - Implementa Github actions para mantener la integridad del codigo.

## Comenzando

 1. Forkear el repositorio para tener una copia del mismo en sus cuentas
 2. Clonar el repositorio en sus computadoras para comenzar a trabajar
 3. Utilizar el comando `npm run dev` para levantar el proyecto. Tanto en el frontend como el backend.

 __IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. Y para que el workflow de Github action funcione correctamente.

 ## Variables de entorno
 Tanto para el frontend como el backend necesitan tener variables de entorno para poder funcionar correctamente.

 En `back` crear un archivo llamado: `.env` que tenga la siguiente forma:
 ```
PORT=9000
JWT_SECRET={secret}
```
Reemplazar `secret` con un string cualquier para probar.

 En `client` crear un archivo llamado: `.env.local` que tenga la siguiente forma:
 ```
 NEXT_PUBLIC_BACK_URL="http://localhost:9000"
 ```

## Tecnologías utilizadas:
  - React
  - Typescript
  - Next
  - SWR
  - Eslint
  - Tailwindcss
  - Node
  - Express
  - JWT
  - Swagger
  - Jest
  - Mocha
  - Supertest
  - Github Actions


&copy; 2024 Pablo Garay &bull; [Github](https://github.com/814942) &bull; [Linkedin](https://www.linkedin.com/in/pablo-garay-dev/) &bull; [Portfolio](https://pablogaray.netlify.app/)
