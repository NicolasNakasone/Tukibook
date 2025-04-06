# Tukibook 👍

![Tukibook logo](client/public/tuki.webp)

Tukibook es una red social en desarrollo, estructurada como un monorepo utilizando npm workspaces. El proyecto consta de tres paquetes principales:

- `client`: Aplicación frontend creada con Vite, React y TypeScript.
- `server`: Backend desarrollado con Express y TypeScript.
- `tukibook-helper`: Paquete compartido que almacena tipos de TypeScript y otras utilidades comunes.

## Requisitos

Asegúrate de tener las siguientes versiones instaladas:

- **Node.js**: `v18.15.0` (definido en `.nvmrc`)
- **npm**: `9.5.0`
- **React**: `18.3.1`
- **TypeScript**: `5.5.2`
- **Express**: `4.19.2`

Puedes verificar tu versión de Node y npm con:

```sh
node -v
npm -v
```

## MongoDB Atlas

Si usas **MongoDB Atlas**, recuerda agregar tu IP a la whitelist en la configuración de seguridad de Atlas.  
También, define correctamente la variable de entorno `MONGO_URI` en tu archivo `.env` del servidor:

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/miBaseDeDatos
```

## Estructura del Monorepo

```

Tukibook/
│── client/ # Frontend (Vite + React + TypeScript)
│ ├── src/ # Código fuente del cliente
│ ├── public/ # Archivos públicos
│ ├── node_modules/
│── server/ # Backend (Express + TypeScript)
│ ├── src/ # Código fuente del servidor
│ ├── node_modules/
│── tukibook-helper/ # Módulo compartido con tipos
│ ├── types/ # Tipos TypeScript compartidos
│ ├── index.ts # Exportaciones principales
│── node_modules/ # Módulos raíz del monorepo
│── .gitignore # Archivos ignorados por Git
│── .nvmrc # Versión de Node recomendada
│── .prettier.cjs # Configuración de Prettier
│── package.json # Configuración del monorepo
│── package-lock.json # Bloqueo de dependencias
│── README.md # Documentación del proyecto

```

## Instalación

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y `npm`. Luego, ejecuta:

```sh
npm install
```

Esto instalará todas las dependencias del monorepo y sus paquetes.

## Ejecución del Proyecto

Para iniciar el frontend (Vite):

```sh
npm run client
```

Para iniciar el backend (Express):

```sh
npm run server
```

También puedes instalar o verificar los tipos compartidos con:

```sh
npm run type-check
```

## Como compartir tipos de tukibook-helper

Los tipos compartidos se encuentran en el paquete tukibook-helper.
Para importarlos en cualquier parte del monorepo:

```js
import { Post, Comment } from 'tukibook-helper'
```
