# AgroKit Ecológico - MVP Web

Plataforma web para la comercialización de kits alimentarios ecológicos que conecta productores locales con compradores.

## 🚀 Características

- ✅ Registro de usuarios (Productores y Compradores)
- ✅ Autenticación con localStorage
- ✅ Panel de productor para gestionar kits alimentarios
- ✅ Catálogo de kits para compradores
- ✅ Simulación de pedidos
- ✅ Diseño responsive y limpio

## 🛠️ Tecnologías

- React 18
- Vite
- React Router
- JavaScript (ES6+)
- CSS puro

## 📦 Instalación

\`\`\`bash
npm install
\`\`\`

## 💻 Desarrollo

\`\`\`bash
npm run dev
\`\`\`

El proyecto estará disponible en `http://localhost:5173`

## 🏗️ Build para Producción

\`\`\`bash
npm run build
\`\`\`

Los archivos optimizados se generarán en la carpeta `dist/`

## 📱 Uso de la Aplicación

### Como Productor:
1. Regístrate seleccionando el rol "Productor"
2. Inicia sesión
3. Crea kits alimentarios con nombre, descripción y precio
4. Gestiona tus kits (ver listado y eliminar)

### Como Comprador:
1. Regístrate seleccionando el rol "Comprador"
2. Inicia sesión
3. Explora el catálogo de kits disponibles
4. Realiza pedidos de los kits que te interesen

## 🚢 Despliegue en Vercel

Este proyecto está listo para desplegarse en Vercel:

1. Sube el código a GitHub
2. Importa el proyecto en Vercel
3. Vercel detectará automáticamente la configuración de Vite
4. ¡Despliega!

## 📝 Estructura del Proyecto

\`\`\`
src/
├── components/
│   └── Layout.jsx       # Layout principal con header y navegación
├── pages/
│   ├── Inicio.jsx       # Página de inicio
│   ├── Registro.jsx     # Formulario de registro
│   ├── Login.jsx        # Formulario de inicio de sesión
│   ├── PanelProductor.jsx  # Panel del productor
│   ├── Catalogo.jsx     # Catálogo para compradores
│   └── Pedido.jsx       # Confirmación de pedido
├── App.jsx              # Configuración de rutas
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales
\`\`\`

## 📄 Licencia

MIT
