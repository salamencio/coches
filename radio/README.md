# 📻 Radio España

Reproductor web de las principales emisoras de radio de España y de Galicia. Un único archivo HTML, sin dependencias que instalar ni proceso de compilación.

## Características

- Emisoras nacionales: Cadena SER, COPE, Onda Cero, RNE Radio 1, Radio 3, esRadio, Los 40, Los 40 Classic, Cadena Dial, Cadena 100, Europa FM, Kiss FM, Hit FM y Rock FM.
- Pestaña de Galicia: Radio Galega, Radio Galega Música, SER Radio Vigo, SER Radio Coruña, SER Ferrol, SER Baixo Miño y CUAC FM.
- Buscador, control de volumen y modo claro/oscuro automático.
- Cada emisora puede tener varias URL de respaldo: si una falla, prueba la siguiente.
- Soporte HLS (`.m3u8`) mediante [hls.js](https://github.com/video-dev/hls.js), incluido dentro del HTML. No necesita descargar librerías de un CDN.
- Logos integrados de las 21 emisoras: se muestran incluso sin conexión. Las emisoras locales de la SER comparten la marca de la cadena.
- Tiempo límite de conexión y recuperación mediante enlaces de respaldo. Los cambios rápidos y la pausa cancelan la conexión anterior.
- Permite añadir emisoras propias o corregir la URL de una existente (se guardan en `localStorage`).
- Las correcciones conservan la región, el logo y los enlaces originales como respaldo. «Restaurar emisoras originales» elimina las personalizaciones guardadas.

## Publicarlo con GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo, `radio-espana`).
2. Sube los archivos de esta carpeta al repositorio, incluidos `index.html`, `README.md`, `LICENSE`, `THIRD_PARTY_NOTICES.txt`, `LOGOS.json` y `.nojekyll`. La carpeta `assets` conserva copias de los recursos para mantenimiento; el reproductor ya los lleva integrados.
3. En el repositorio, ve a **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Pulsa **Save**.
5. Espera uno o dos minutos. La web estará en `https://TU-USUARIO.github.io/radio-espana/`.

Por línea de comandos:

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/radio-espana.git
git push -u origin main
```

## Probarlo en local

Abre `index.html` con doble clic en Chrome o Firefox. No hace falta servidor.

El audio en directo requiere conexión a Internet. Los logos y la biblioteca HLS están integrados en `index.html`, que también puede copiarse por separado.

## Reparación y comprobaciones

- esRadio: sustituido el dominio antiguo por el stream vigente de Flumotion, con respaldo AAC.
- SER Baixo Miño: corregido el identificador a `SER_ASO_BAIXOMINO`, con respaldo AAC.
- Eliminados los respaldos que devolvían errores HTTP, DNS o de certificado. Se conservan las direcciones de entrada de los operadores, evitando guardar enlaces con tokens temporales.
- HLS usa hls.js cuando el navegador admite MediaSource y reproducción nativa en los demás navegadores compatibles. Esto evita el fallo observado con las listas comprimidas de Radio Galega en Chrome.
- Consulta `VERIFICACION.md` para ver el resultado de las pruebas.

## Cómo editar las emisoras

Las emisoras están en el array `ST` dentro de `index.html`:

```js
{n:"Nombre", g:"Género", c:"#color", u:"URL principal", a:["URL alternativa 1","URL alternativa 2"], w:"https://web-oficial"}
```

- `u`: URL del stream (MP3, AAC o `.m3u8`). Usa siempre `https://`, porque GitHub Pages sirve la página por HTTPS y el navegador bloquea audio `http://`.
- `a`: lista opcional de URL de respaldo.
- `w`: web oficial, que se muestra si ninguna URL funciona.
- `gal:1`: añade la emisora a la pestaña de Galicia.
- Para un logo, añade una entrada en el objeto `LOGO` con una imagen en `data:image/png;base64,...` (también admite JPEG o SVG) y el nombre exacto de la emisora. `LOGOS.json` documenta la procedencia de las imágenes incluidas.

## Aviso

- Las direcciones de streaming las gestionan las propias cadenas y cambian con frecuencia. Si una emisora deja de sonar, actualiza su URL con el formulario de la página o abre una *issue*.
- Los nombres y logos de las emisoras son marcas de sus respectivos propietarios. Este proyecto no está afiliado a ninguna de ellas. Si publicas el repositorio, usa únicamente logos que tengas derecho a mostrar.

## Licencia

MIT. Consulta el archivo `LICENSE`.
