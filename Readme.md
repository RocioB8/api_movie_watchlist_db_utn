# 🎬 TP - Movie Watchlist API

## 🌐 Demo en producción

🔗 https://api-movie-watchlist-db-utn.onrender.com/

⚠️ Nota: Los endpoints de películas requieren autenticación mediante JWT.

## 📖 Descripción

Este proyecto consiste en el desarrollo de una API REST que permite gestionar una lista de películas personal para cada usuario.

La aplicación permite a los usuarios registrarse, iniciar sesión y administrar su propia colección de películas mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

Cada usuario autenticado puede:

- Agregar películas a su lista
- Visualizar sus películas guardadas
- Editar información de sus películas
- Eliminar películas de su lista

---

## 🎯 Objetivo del Proyecto

El objetivo principal es aplicar los conocimientos de desarrollo backend utilizando Node.js, Express y MongoDB, implementando autenticación mediante JSON Web Tokens (JWT) y buenas prácticas en la organización del código.

---

## 🛠 Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Base de Datos
- MongoDB
- Mongoose

### 🔹 Autenticación y Seguridad
- JSON Web Token (JWT)
- bcryptjs

### 🔹 Configuración
- dotenv
- cors

---

## 🏗 Arquitectura del Proyecto

El proyecto está desarrollado siguiendo el patrón de arquitectura **MVC (Modelo – Vista – Controlador)**, que permite organizar el código de forma modular y escalable.

### 📂 Estructura de carpetas

---

## 📁 Estructura del Proyecto (Arquitectura MVC)

El proyecto está organizado siguiendo el patrón **MVC (Modelo – Vista – Controlador)** para mantener una estructura modular, escalable y fácil de mantener.

```
src
│
├── config
│   └── mongodb.js        → Configuración y conexión a la base de datos
│
├── controllers
│   ├── auth.controller.js   → Lógica de autenticación
│   └── movie.controller.js  → Lógica de gestión de películas
│
├── middleware
│   └── authMiddleware.js → Verificación y validación del token JWT
│
├── models
│   ├── user.model.js     → Esquema del usuario
│   └── movie.model.js    → Esquema de películas asociadas al usuario
│
├── routes
│   ├── authRouter.js     → Rutas públicas de autenticación
│   └── movieRouter.js    → Rutas protegidas de películas
│
└── index.js              → Punto de entrada del servidor
```

---

### 🧩 Descripción de cada capa

### 🔹 Models
Definen la estructura de los datos utilizando **Mongoose**.  
Representan cómo se almacenan los documentos en MongoDB.

---

### 🔹 Controllers
Contienen la lógica del negocio.  
Se encargan de procesar las solicitudes HTTP y devolver respuestas.

---

### 🔹 Routes
Definen los endpoints de la API y conectan cada ruta con su controlador correspondiente.

---

### 🔹 Middleware
Funciones intermedias que se ejecutan antes de llegar a los controladores.  
En este proyecto se utiliza para validar tokens JWT y proteger rutas privadas.

---

### 🔹 Config
Contiene configuraciones externas como la conexión a MongoDB.

---

### 🔹 Index
Archivo principal que:

- Configura Express
- Aplica middlewares globales
- Registra rutas
- Inicia el servidor
- Conecta la base de datos

---

## ⚙️ Instalación y Ejecución

Para poder utilizar este proyecto en un entorno local, seguir los pasos detallados a continuación.

---

### 📥 Clonar el repositorio

Primero se debe clonar el repositorio desde GitHub y acceder a la carpeta del proyecto.

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
cd REPOSITORIO
```

---

### 📦 Instalar dependencias

Luego, instalar todas las librerías necesarias para el funcionamiento del servidor.

```bash
npm install
```
📌 Las dependencias del proyecto se encuentran declaradas en el archivo `package.json` y se instalarán automáticamente al ejecutar `npm install`.

---

### 🔐 Configurar Variables de Entorno

El proyecto utiliza variables de entorno para proteger información sensible.

1. Crear un archivo `.env` en la raíz del proyecto.
2. Copiar el contenido del archivo `.env.example`.
3. Completar los valores correspondientes.

Ejemplo:

```env
PORT=PUERTO_DEL_SERVIDOR
URI_DB=URL_DE_CONEXION_A_MONGODB
JWT_SECRET=CLAVE_SECRETA
JWT_EXPIRES=TIEMPO_DE_EXPIRACION
```

⚠️ Importante:  
El archivo `.env` está incluido en el `.gitignore` para evitar subir datos sensibles al repositorio.

---

### 🗄️ Configurar Base de Datos

Este proyecto utiliza **MongoDB** como base de datos.

Se puede utilizar:

✔ MongoDB instalado localmente  
✔ MongoDB Atlas (base de datos en la nube)

En ambos casos, se debe verificar que la variable `URI_DB` tenga la conexión correcta.

---

### ▶️ Ejecutar el servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```
---

### ✅ Servidor en funcionamiento

Una vez iniciado correctamente, el servidor quedará disponible en:

```
http://localhost:PUERTO_DEL_SERVIDOR
```

---
---

## 🔌 Endpoints de la API

La API permite registrar usuarios, autenticarse y gestionar una lista de películas asociadas a cada usuario.

---

## 🔐 Autenticación

### 📝 Registrar Usuario

Permite crear un nuevo usuario.

📌 Endpoint
```
POST /api/auth/register
```

📌 Body (JSON)
```json
{
  "username": "usuario1",
  "email": "usuario@email.com",
  "password": "123456"
}
```

📌 Respuesta exitosa
```json
{
  "success": true,
  "data": "TOKEN_JWT"
}

```
📌 Este endpoint también devuelve un token JWT que permite acceder directamente a las rutas protegidas.

---

### 🔑 Login de Usuario

Permite autenticarse y obtener un token JWT.

📌 Endpoint
```
POST /api/auth/login
```

📌 Body (JSON)
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

📌 Respuesta exitosa
```json
{
  "success": true,
  "token": "TOKEN_JWT"
}
```

⚠️ Este token debe enviarse en las rutas protegidas.

---

## 🎬 Películas (Rutas Protegidas)

Todas las rutas requieren autenticación mediante JWT.

📌 Header obligatorio
```
Authorization: Bearer TOKEN_JWT
```

---

### 📄 Obtener Películas del Usuario

Devuelve todas las películas asociadas al usuario autenticado.

📌 Endpoint
```
GET /api/movies
```
✅Si el usuario no posee películas registradas, la API devuelve un array vacío junto a un mensaje informativo.

---

### ➕ Crear Película

Permite agregar una nueva película.

📌 Endpoint
```
POST /api/movies
```

📌 Body (JSON)
```json
{
  "success": true,
  "message": "Película creada con éxito",
  "data": { ... }
}

```

---

### ✏️ Actualizar Película

Permite modificar una película existente.

📌 Endpoint
```
PATCH /api/movies/:id
```

📌 Body (JSON)
```json
{
  "success": true,
  "message": "Película actualizada con éxito",
  "data": { ... }
}

```
🗨 PATCH permite actualizar uno o varios campos de la película sin necesidad de enviar todos los datos.

---

### ❌ Eliminar Película

Permite borrar una película.

📌 Endpoint
```
DELETE /api/movies/:id
```

📌 Respuesta exitosa
```json
{
  "success": true,
  "message": "Película eliminada con éxito",
  "data": { ... }
}
```
---
## 🧪 Pruebas de la API con Bruno

Para probar y verificar el correcto funcionamiento de la API se utilizó **Bruno**, una herramienta para testear endpoints HTTP similar a Postman o Thunder Client.

👉 Bruno permite enviar requests, configurar headers, body y visualizar respuestas del servidor.

---

## 📦 Instalación de Bruno

1. Descargar Bruno desde su página oficial:

👉 https://www.usebruno.com/

2. Instalar la aplicación.

3. Abrir Bruno.

---

## 📁 Importar Colección de Pruebas

Dentro del repositorio del proyecto se incluye una colección de requests preparada para facilitar las pruebas.

### Pasos:

1. Abrir Bruno.
2. Seleccionar **Open Collection**.
3. Elegir la carpeta `/bruno` incluida en el proyecto.
4. Automáticamente se cargarán todas las pruebas disponibles.

---

## 🔐 Flujo Recomendado de Pruebas

Para utilizar correctamente la API se recomienda seguir el siguiente orden:

---

### 1️⃣ Registrar Usuario

📌 Request  
```
POST /api/auth/register
```

📌 Body
```json
{
  "username": "usuarioPrueba",
  "email": "usuario@test.com",
  "password": "123456"
}
```

---

### 2️⃣ Iniciar Sesión

📌 Request  
```
POST /api/auth/login
```

📌 Body
```json
{
  "email": "usuario@test.com",
  "password": "123456"
}
```

📌 Resultado  
Se obtiene un **Token JWT** necesario para acceder a las rutas protegidas.

---

### 3️⃣ Configurar Token en Bruno

1. Copiar el token recibido en el login.
2. Ir a la pestaña **Headers**.
3. Agregar:

```
Authorization: Bearer TOKEN_JWT
```

---

### 4️⃣ Probar Endpoints de Películas

Una vez configurado el token se pueden probar:

✔ Crear película  
✔ Obtener películas  
✔ Actualizar película  
✔ Eliminar película  

---

## ✅ Validaciones Probadas

Durante las pruebas se verificó:

- Registro de usuarios
- Login y generación de token
- Protección de rutas mediante middleware
- CRUD completo de películas
- Restricción de acceso a películas de otros usuarios
- Manejo de errores y validaciones

---


