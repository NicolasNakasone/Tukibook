# Tukibook

Tukibook es una red social en desarrollo, estructurada como un monorepo utilizando npm workspaces. El proyecto consta de tres paquetes principales:

- `client`: Aplicación frontend creada con Vite.
- `server`: Backend desarrollado con Express y TypeScript.
- `tukibook-helper`: Paquete compartido que almacena tipos de TypeScript y otras utilidades comunes.

## Estructura del Monorepo

```
Tukibook/
│── client/               # Frontend (Vite + React)
│   ├── src/              # Código fuente del cliente
│   ├── public/           # Archivos públicos
│   ├── node_modules/
│── server/               # Backend (Express + TypeScript)
│   ├── src/              # Código fuente del servidor
│   ├── node_modules/
│── tukibook-helper/      # Módulo compartido con tipos
│   ├── types/            # Tipos TypeScript compartidos
│   ├── index.ts          # Exportaciones principales
│── node_modules/         # Módulos raíz del monorepo
│── .gitignore            # Archivos ignorados por Git
│── .nvmrc                # Versión de Node recomendada
│── .prettier.cjs         # Configuración de Prettier
│── package.json          # Configuración del monorepo
│── package-lock.json     # Bloqueo de dependencias
│── README.md             # Documentación del proyecto
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

## Contribuir

1. Clona el repositorio
2. Crea una rama nueva (`git checkout -b mi-nueva-rama`)
3. Realiza los cambios y haz commits (`git commit -m "Mi cambio"`)
4. Sube la rama (`git push origin mi-nueva-rama`)
5. Abre un Pull Request

---

¡Tuki arriba! 🚀
