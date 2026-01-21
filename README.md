[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/VbMXIj3p)
# 🛒 LaraCRUD - Laravel 12 + React + Inertia.js + TypeScript

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

## Link Video
https://github.com/cifpfbmoll/crud-de-categor-as-con-laravel-12-react-inertia-v2-SebasRomaguera/blob/master/VideoCrud.mp4
## 📋 Descripción

Aplicación CRUD (Create, Read, Update, Delete) completa desarrollada con el stack moderno de Laravel. Este proyecto sirve como **tutorial y referencia** para desarrolladores Junior que quieren aprender desarrollo full-stack.

### ✨ Características

- ✅ **CRUD completo** de productos
- ✅ **Autenticación** con Laravel Breeze
- ✅ **SPA** (Single Page Application) con Inertia.js
- ✅ **Tipado estático** con TypeScript
- ✅ **UI moderna** con Tailwind CSS
- ✅ **Modales** para crear/editar productos
- ✅ **Validación** en frontend y backend

## 🚀 Instalación

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **PHP** 8.2 o superior
- **Composer** (gestor de dependencias PHP)
- **Node.js** 18.x o superior y **npm**
- **SQLite** o **MySQL/PostgreSQL** (opcional)
- **Git**

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/maximofernandezriera/laracrud.git
cd laracrud
```

O si tienes tu propio fork:

```bash
git clone https://github.com/TU_USUARIO/laracrud.git
cd laracrud
```

#### 2. Instalar dependencias PHP

```bash
composer install
```

Esto instalará todas las dependencias de Laravel y paquetes necesarios.

#### 3. Instalar dependencias de Node.js

```bash
npm install
```

Esto instalará React, TypeScript, Inertia.js, Tailwind CSS y todas las dependencias del frontend.

#### 4. Configurar el archivo de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura tu base de datos:

**Para SQLite (recomendado para desarrollo):**
```env
DB_CONNECTION=sqlite
# SQLite creará automáticamente database/database.sqlite
```

**Para MySQL:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

#### 5. Generar clave de aplicación

```bash
php artisan key:generate
```

#### 6. Ejecutar migraciones

```bash
php artisan migrate
```

Esto creará las tablas necesarias en tu base de datos (users, products, etc.).

#### 7. (Opcional) Ejecutar seeders

Si quieres datos de prueba:

```bash
php artisan db:seed
```

## 🎮 Uso

### Iniciar la Aplicación

Necesitas ejecutar **dos servidores** simultáneamente:

#### Terminal 1 - Servidor Backend (Laravel)

```bash
php artisan serve
```

El servidor PHP se ejecutará en `http://localhost:8000`

#### Terminal 2 - Servidor Frontend (Vite)

```bash
npm run dev
```

El servidor de desarrollo Vite compilará los assets de React/TypeScript con hot reload.

### Acceder a la Aplicación

1. Abre tu navegador en `http://localhost:8000`
2. **Regístrate** como nuevo usuario o **inicia sesión** si ya tienes cuenta
3. Una vez autenticado, accederás al Dashboard

### Funcionalidades Disponibles

#### 🔐 Autenticación
- **Registro**: Crea una cuenta nueva con email y contraseña
- **Login**: Accede con tus credenciales
- **Logout**: Cierra sesión desde el menú de usuario
- **Perfil**: Edita tu información de usuario

#### 📦 Gestión de Productos
Desde el Dashboard o el menú "Products":

- **Listar productos**: Ver todos los productos en una tabla
- **Crear producto**: Click en "Create Product" → Completa el formulario modal
  - Name (nombre del producto)
  - Description (descripción)
  - Price (precio)
  - Stock (cantidad disponible)
- **Editar producto**: Click en botón "Edit" → Modifica los datos en el modal
- **Eliminar producto**: Click en botón "Delete" → Confirma la eliminación

#### 🎨 Navegación
- **Dashboard**: Página principal después del login
- **Products**: Gestión completa de productos
- **Profile**: Configuración de tu cuenta de usuario

### Comandos de Desarrollo

## 📁 Estructura del Proyecto

```
laracrud/
├── app/
│   ├── Http/Controllers/
│   │   └── ProductController.php    # Controlador CRUD
│   └── Models/
│       └── Product.php              # Modelo Eloquent
├── database/
│   └── migrations/
│       └── create_products_table.php
├── resources/js/
│   ├── Components/Products/
│   │   ├── ProductTable.tsx         # Tabla de productos
│   │   └── ProductModal.tsx         # Modal crear/editar
│   ├── Pages/Products/
│   │   └── Index.tsx                # Página principal
│   └── types/
│       └── index.d.ts               # Tipos TypeScript
├── routes/
│   └── web.php                      # Rutas de la aplicación
└── docs/
    ├── GUIA_DESARROLLO.md           # Guía paso a paso
    └── presentacion.html            # Presentación Reveal.js
```

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [📖 Guía de Desarrollo](docs/GUIA_DESARROLLO.md) | Tutorial paso a paso para crear el proyecto |
| [🎯 Presentación](docs/presentacion.html) | Slides con Reveal.js para presentaciones |

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Laravel | 12.x | Backend/API |
| React | 19.x | Frontend UI |
| Inertia.js | 2.x | Conexión Laravel-React |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos |
| Vite | 7.x | Bundler |

### Comandos de Desarrollo

```bash
# Servidor backend (Laravel)
php artisan serve

# Servidor frontend con hot reload (Vite)
npm run dev

# Compilar assets para producción
npm run build

# Ver errores de TypeScript
npm run type-check

# Ejecutar migraciones
php artisan migrate

# Reiniciar base de datos (borra todos los datos)
php artisan migrate:fresh

# Reiniciar y ejecutar seeders
php artisan migrate:fresh --seed

# Ver rutas disponibles
php artisan route:list

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
php artisan test

# Ejecutar tests con cobertura
php artisan test --coverage

# Verificar tipos TypeScript
npm run type-check
```

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verifica que el puerto 8000 esté libre
php artisan serve --port=8080
```

### Errores de dependencias PHP
```bash
composer install --no-cache
composer dump-autoload
```

### Errores de dependencias Node
```bash
rm -rf node_modules package-lock.json
npm install
```

### Errores de migración
```bash
# Verifica que la base de datos esté configurada
php artisan migrate:status

# Reinicia las migraciones
php artisan migrate:fresh
```

### Assets no se cargan
```bash
# Limpia caché y recompila
npm run build
php artisan optimize:clear
```

## 📝 Estructura de Archivos Clave

```bash
# Desarrollo
php artisan serve          # Servidor PHP
npm run dev               # Servidor Vite (hot reload)

# Base de datos
php artisan migrate        # Ejecutar migraciones
php artisan migrate:fresh  # Reiniciar BD

# Producción
npm run build             # Compilar assets
```

## 👨‍🏫 Autor

**Máximo Fernández Riera**  
CIFP Francesc de Borja Moll  
[GitHub](https://github.com/maximofernandezriera) | [Twitter](https://twitter.com/maximofernandez)

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.
