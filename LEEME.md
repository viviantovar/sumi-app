# App de Sumi Queen — cómo publicarla

Estos 4 archivos son la app del celular. Solo hay que dejarlos en un sitio web con HTTPS.
Los datos NO están aquí: la app se los pide a n8n, que a su vez los saca de Supabase.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (diseño + funcionamiento) |
| `manifest.json` | Le dice al celular el nombre y el ícono al instalarla |
| `sw.js` | Permite abrirla sin internet y que Chrome la acepte como app |
| `icono.png` | El logo de Sumi Queen |
| `Dockerfile` | Solo si la publicas con Easypanel |

## Opción 1 — Easypanel (en tu propio servidor)

1. Sube esta carpeta a un repositorio nuevo en GitHub (por ejemplo `sumi-app`).
   Se puede hacer desde la web de GitHub arrastrando los archivos.
2. En Easypanel: **Create Service → App**
   - Source: GitHub → el repositorio `sumi-app`
   - Build: Dockerfile
3. En **Domains** agrega el dominio que quieras:
   - Gratis y sin tocar nada: el subdominio que ofrece Easypanel
   - Con tu dominio: `sumi.viviantovar.com` (antes hay que crear un registro A
     apuntando a 82.25.76.121 donde administras viviantovar.com)
4. Deploy.

## Opción 2 — Dentro de Equilibra

Copiar los 4 archivos a `Equilibra/frontend/public/sumi/`, hacer commit y desplegar
como siempre. Queda publicada en `equilibra.viviantovar.com/sumi/`.

Ojo: obliga a reconstruir el frontend de Equilibra, así que toca una app en producción.

## Después de publicarla

Abre en el celular la dirección con la clave al final (una sola vez):

    https://TU-DIRECCION/?key=sq7Kx2mQ9vB4nZ6tR1w5Y0pL3jH8

La clave queda guardada en ese teléfono, así que después basta con abrir la app.
Luego: menú de Chrome → **Instalar aplicación**.

## Importante

- El flujo `MARTHA_APP_SUMI_QUEEN` debe estar **activo** en n8n (es quien entrega los datos).
- Cualquiera con esa dirección Y la clave puede ver tus citas: no la compartas.
- Si algún día quieres cambiar la clave, hay que cambiarla en el flujo de n8n y en el enlace.
