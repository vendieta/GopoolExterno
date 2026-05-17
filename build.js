const fs = require('fs');
const path = require('path');

// Intentar cargar variables desde .env para entorno local
try {
  require('dotenv').config();
} catch (e) {
  // Ignorar si no está instalado (como en Vercel)
}

// 1. Crear carpeta 'public' que Vercel espera
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// 2. Generar env.js dentro de 'public'
const envContent = `window.env = {
  PUBLIC_BACKEND_URL: "${process.env.PUBLIC_BACKEND_URL || ''}",
  PUBLIC_SUPABASE_URL: "${process.env.PUBLIC_SUPABASE_URL || ''}",
  PUBLIC_SUPABASE_ANON_KEY: "${process.env.PUBLIC_SUPABASE_ANON_KEY || ''}"
};`;

fs.writeFileSync(path.join(publicDir, 'env.js'), envContent);
console.log('✅ env.js generado exitosamente en public/.');

// 3. Copiar el resto de los archivos estáticos a 'public'
const filesToCopy = ['index.html', 'logo.png'];
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(publicDir, file));
    console.log(`✅ ${file} copiado a public/.`);
  }
});
