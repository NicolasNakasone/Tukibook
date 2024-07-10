# Tukibook

Tukibook es una red social con temática de un meme llamado 'Flork' haciendo 👍. La aplicación permite a los usuarios crear publicaciones, comentarlas y darles like en tiempo real, gracias a la integración con WebSockets.

## Tecnologías Utilizadas

- **Frontend**: React, Redux Toolkit, TypeScript
- **Backend**: Node.js, Express, Mongoose, Socket.IO
- **Base de Datos**: MongoDB

## Características

- Crear publicaciones
- Comentar publicaciones
- Dar like a publicaciones
- Actualización en tiempo real mediante WebSockets
- En proximas versiones, se vendrán multiples funcionalidades como:
- Usuarios, poder tener seguidores, chats en tiempo real, poder crear hilos, y más

## Instalación

Sigue estos pasos para levantar el proyecto localmente.

### Prerrequisitos

- Node.js (versión 14 o superior)
- MongoDB (local o en la nube)

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tukibook.git
cd tukibook
```

### Instalar Dependencias

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

## Configuración

### Backend

Crea un archivo `.env` en la carpeta `server` con las siguientes variables:

```env
API_PORT=3000
MONGO_URI=mongodb://localhost:27017/tukibook
CLIENT_URL=http://localhost:5173
```

### Frontend

Crea un archivo `.env` en la carpeta `client` con las siguientes variables:

```env
VITE_API_URL=http://localhost:3000
```

## Ejecución

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd ../client
npm start
```

Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento.

## Estructura del Proyecto

```
tukibook/
├── client/         # Código del frontend
├── server/         # Código del backend
└── README.md       # Este archivo
```

## Uso

1. Crea una cuenta o inicia sesión.
2. Crea una publicación.
3. Observa cómo las publicaciones se actualizan en tiempo real en todos los clientes conectados.
4. Comenta y da like a las publicaciones.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna sugerencia o encuentras algún problema, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
