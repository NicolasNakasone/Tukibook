Tukibook Monorepo

Este es el monorepo de Tukibook, que incluye el cliente (frontend) y el servidor (backend).

Instalación de dependencias

Ejecuta el siguiente comando en la raíz del monorepo para instalar las dependencias de todos los paquetes:

npm install

Si necesitas instalar dependencias en un paquete específico (cliente o servidor), muévete a la carpeta correspondiente y ejecuta npm install.

Levantar el proyecto

Levantar cliente y servidor juntos

Desde la raíz del proyecto, ejecuta:

npm run dev

Levantar el cliente (Vite)

npm run dev:client

Por defecto, el cliente correrá en http://localhost:5173.

Levantar el servidor (Express + TypeScript)

npm run dev:server

Por defecto, el servidor correrá en http://localhost:3000.

Configuración

CORS

Asegúrate de que en tu servidor Express tengas configurado CORS correctamente para permitir el acceso desde el cliente:

import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors({
origin: 'http://localhost:5173', // Ajusta esto según el entorno
credentials: true,
}));

MongoDB Atlas

Si usas MongoDB Atlas, recuerda agregar tu IP a la whitelist en la configuración de seguridad de Atlas. También, define correctamente la variable de entorno MONGO_URI en tu archivo .env del servidor.

MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/miBaseDeDatos

Compartir Tipos de TypeScript

Los tipos compartidos se encuentran en el paquete tukibook-helper. Para importarlos en cualquier parte del monorepo:

import { Post, Comment } from 'tukibook-helper';

Si necesitas más detalles o cambios, házmelo saber.
