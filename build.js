const fs = require('fs');

// Intentar cargar variables desde .env para entorno local
// (En Vercel esto fallará silenciosamente si no está instalado 'dotenv', 
// pero en Vercel las variables ya están en process.env)
try {
  require('dotenv').config();
} catch (e) {
  // Ignorar si no está instalado (como en Vercel)
}

const envContent = `window.env = {
  PUBLIC_BACKEND_URL: "${process.env.PUBLIC_BACKEND_URL || ''}",
  PUBLIC_SUPABASE_URL: "${process.env.PUBLIC_SUPABASE_URL || ''}",
  PUBLIC_SUPABASE_ANON_KEY: "${process.env.PUBLIC_SUPABASE_ANON_KEY || ''}"
};`;

fs.writeFileSync('env.js', envContent);
console.log('✅ env.js generado exitosamente con variables de entorno.');
