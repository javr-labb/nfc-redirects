# YAN Fragance — Tienda en línea

Tienda estática (HTML/CSS/JS, sin backend) para YAN Fragance. Los pedidos se
arman en el navegador del cliente y se envían como un mensaje de WhatsApp
con todo lo necesario para generar el envío. Por ahora se acepta pago por
transferencia bancaria; más abajo se explica cómo sumar pago con tarjeta.

## Estructura del proyecto

```
yan-fragance/
├── index.html          → Página de inicio
├── catalogo.html        → Catálogo con filtros por género y familia olfativa
├── producto.html         → Ficha de producto (se llena según ?id=... en la URL)
├── carrito.html          → Carrito de compras
├── checkout.html         → Formulario de envío + pago, genera el mensaje de WhatsApp
├── gracias.html           → Página de confirmación tras enviar el pedido
├── nosotros.html          → Historia de la marca
├── css/styles.css        → Todos los estilos (colores y tipografía en un solo lugar)
├── js/config.js           → ⚙️ Datos del negocio: WhatsApp, banco, redes, envíos
├── js/products-data.js     → 🧴 Catálogo de productos (nombre, precio, fotos, notas)
├── js/bottle-art.js         → Frascos ilustrados de respaldo (mientras no hay fotos reales)
├── js/cart.js                 → Lógica del carrito (localStorage del navegador)
├── js/whatsapp-order.js        → Arma el mensaje de pedido para WhatsApp
└── js/main.js                    → Renderizado de páginas e interacciones
```

No hay build ni dependencias — son archivos estáticos. Se puede abrir
`index.html` directamente o subir la carpeta completa a cualquier hosting.

## Lo primero que debes editar

### 1. Colores y tipografía (identidad de marca)
Ahora mismo la paleta es un **placeholder** (verde botella + tinta + bronce)
porque no tuve acceso automático a las fotos ni colores reales de
`@yan_fragance` en Instagram (Instagram bloquea la lectura automática de
perfiles). Para dejarlo con la paleta real del cliente:

1. Abre `css/styles.css`, línea `:root { ... }` al principio del archivo.
2. Cambia los valores hexadecimales de `--ink`, `--cream`, `--forest`,
   `--bronze` por los colores reales de la marca (puedes sacarlos con
   cualquier "color picker" de una captura de pantalla de su feed).
3. Si el cliente tiene un logo, reemplaza el texto `YAN Fragance` en cada
   `<a class="logo">` por un `<img>` apuntando a `assets/img/brand/logo.svg`.

### 2. Datos del negocio (`js/config.js`)
Edita este archivo para poner:
- El banco, titular y CLABE reales para recibir transferencias.
- Confirmar el número de WhatsApp (ya está puesto: `525535123355`).
- Redes sociales reales.
- Montos de envío gratis y costo de envío estándar.

### 3. Productos reales (`js/products-data.js`)
Los 9 productos que hay ahora son de ejemplo. Reemplaza cada uno con los
productos reales del cliente: nombre, precio, notas olfativas, tamaño y
foto. Si aún no tienes fotos, deja `"image": ""` y se mostrará
automáticamente un frasco ilustrado con el color de su familia olfativa
para que la tienda no se vea vacía.

Para agregar la foto real de un producto:
1. Guarda la foto (cuadrada, mínimo 1000×1000px) en `assets/img/products/`.
2. Pon el nombre del archivo en el campo `"image"` de ese producto.

## Cómo funciona el flujo de pedido

1. El cliente agrega productos al carrito (se guarda en su navegador).
2. En "Finalizar pedido" llena su nombre, teléfono, dirección completa y
   elige método de pago.
3. Si elige transferencia, ve los datos bancarios en pantalla.
4. Al tocar "Confirmar pedido por WhatsApp", se abre WhatsApp con un
   mensaje ya redactado que incluye: productos, cantidades, precios,
   subtotal, envío, total, y la dirección completa — todo lo que
   necesitas para generar la guía de envío.
5. El cliente adjunta su comprobante de transferencia directamente en
   ese chat de WhatsApp.

No se procesa ningún dato de tarjeta en el sitio — es solo un mensaje de
texto armado con JavaScript, no hay servidor ni base de datos.

## Publicar el sitio (GitHub Pages, gratis)

1. Crea un repositorio en GitHub y sube todos estos archivos a la rama
   `main`.
2. Ve a **Settings → Pages**.
3. En "Source" elige la rama `main` y la carpeta `/ (root)`.
4. Guarda. En un par de minutos el sitio queda publicado en
   `https://tu-usuario.github.io/nombre-del-repo/`.
5. Si el cliente tiene su propio dominio (ej. `yanfragance.com`), en la
   misma sección de Pages puedes configurarlo como dominio personalizado.

Cada vez que subas cambios a `main`, el sitio se actualiza solo.

## Cómo agregar pago con tarjeta más adelante

Este sitio es estático (sin servidor propio), así que las opciones más
simples para aceptar tarjeta sin contratar a un programador son:

**Opción recomendada para empezar: Mercado Pago o Stripe con "Payment
Links"**
- Mercado Pago y Stripe permiten generar una liga de pago fija por
  producto o por monto, sin escribir código.
- Se pone esa liga como botón en el checkout (ej. "Pagar con tarjeta").
- Limitación: no calcula el carrito automáticamente si el pedido tiene
  varios productos con montos distintos; funciona mejor para un monto
  fijo o kits.

**Opción para carrito dinámico con monto exacto: Mercado Pago Checkout
Pro**
- Se necesita una función pequeña de servidor (no puede vivir solo en
  GitHub Pages) que genere una "preferencia de pago" con el total exacto
  del carrito. Esa función se puede alojar gratis en Vercel o Netlify
  Functions en unos minutos, y el resto del sitio se queda igual.
- Una vez que tengan cuenta de Mercado Pago (o Stripe) lista, puedo
  ayudarte a conectar esa función.

Cuando el cliente tenga cuenta creada en Mercado Pago, Stripe o Conekta,
dime cuál eligió y con qué credenciales de prueba cuenta, y conecto esa
parte.

## Ideas para seguir mejorando (opcional)
- Agregar reseñas/calificaciones por producto.
- Agregar página de preguntas frecuentes (envíos, cambios, duración).
- Agregar seguimiento de pedidos (requeriría una base de datos simple).
- Conectar Meta Pixel / Google Analytics para medir visitas y conversión.
