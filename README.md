# Proyecto Backend Básico

Este proyecto es un backend básico desarrollado con Express, que incluye ruteo avanzado, autenticación y autorización, y un modelo de usuario. A continuación, se detalla lo que está implementado:

## Funcionalidades Implementadas

### 1. Servidor Express Básico
- Configuración inicial en `index.js`.
- Middlewares para parsear JSON y datos codificados en URL.
- Middlewares de seguridad:
  - **Helmet**: Agrega encabezados de seguridad HTTP.
  - **CORS**: Permite solicitudes desde otros dominios.
- Middleware global para manejo de errores internos del servidor.

### 2. Ruteo Avanzado
- **Router de Mascotas** (`/api/pets`):
  - Endpoints para insertar (POST), obtener por nombre (GET) y marcar como adoptada (PUT).
  - Validación de parámetros con `router.param` para garantizar que el nombre de la mascota solo contenga letras.
- **Custom Router**:
  - Clase personalizada para manejar rutas con políticas y callbacks normalizados.
  - Manejo de errores personalizado para proporcionar respuestas claras en caso de fallas.
- **Router de Ejemplo** (`/api/example`):
  - Rutas públicas, privadas y de administrador con políticas aplicadas.
  - Documentación básica de las rutas para facilitar el mantenimiento.

### 3. Autenticación y Autorización
- **Middleware de Autenticación**:
  - Verifica y decodifica tokens JWT.
  - Maneja correctamente la expiración de tokens y proporciona respuestas claras para diferentes escenarios.
- **Router de Autenticación** (`/api/auth`):
  - Endpoint para iniciar sesión (POST `/login`) y generar tokens JWT.
  - Limitador de tasa para prevenir ataques de fuerza bruta (máximo 10 intentos por IP cada 15 minutos).
- **Router de Sesiones** (`/api/sessions`):
  - Endpoint `/current` para validar al usuario logueado y devolver sus datos asociados al JWT.
  - Incluye detalles sobre los permisos específicos del usuario según su rol.

### 4. Modelo de Usuario
- Clase `User` en `models/user.model.js`:
  - Campos: `first_name`, `last_name`, `email`, `age`, `password`, `cart`, `role`.
  - Contraseñas encriptadas con bcrypt.
  - Método estático para comparar contraseñas.

### 5. Passport Configurado
- Estrategias:
  - **Local**: Autenticación con email y contraseña.
  - **JWT**: Autenticación basada en tokens.
- Serialización y deserialización de usuarios para manejo de sesiones.

## Cómo Ejecutar el Proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Acceder a las rutas disponibles según la configuración.

## Notas Adicionales
- Asegúrate de configurar la variable de entorno `JWT_SECRET` para mayor seguridad.
- La carpeta `node_modules` está ignorada en el control de versiones.

---

¡Gracias por revisar este proyecto!