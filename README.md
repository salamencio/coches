# N-640 · Porto → San Tirso

Juego arcade de conducción en 3D (three.js) por el trazado real de la N-640 entre Porto y San Tirso de Abres (11,25 km, escala 1:1), con tráfico en ambos sentidos y modo online.

## Jugar

- **Escritorio:** W acelerar, S frenar, A D o ← → girar, **↑ ↓ cambiar de marcha** (caja manual de 6, con limitador a 7000 rpm). Espacio o clic para empezar.
- **Móvil:** botones en pantalla (G+ y G− cambian de marcha).
- Adelanta con cuidado: vienen coches de frente. Llega a San Tirso antes de que se acabe el tiempo.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube el contenido de esta carpeta (`index.html`, `ruta/`, `README.md`).
2. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En un minuto el juego estará en `https://TU_USUARIO.github.io/NOMBRE_REPO/`.

Para probarlo en local: `python3 -m http.server` dentro de la carpeta y abre `http://localhost:8000`.

## Modo online

Botón **🌐 Online** en el menú. Un jugador pulsa **Crear sala** y pasa el código de 4 letras; los demás lo escriben y pulsan **Unirse**. Se ven los coches y nombres de los demás y la posición en la carrera (el tráfico es local a cada jugador).

Funciona con WebRTC a través de [PeerJS](https://peerjs.com) (sin servidor propio), así que necesita servirse por **https**, como en GitHub Pages. Con redes muy restrictivas puede no conectar.

## Sonido

El motor está sintetizado con Web Audio (no es una grabación): 4 cilindros turbo estilo Hyundai N, con silbido del turbo, soplido al levantar el pie, petardeos en retención, pop al subir marcha y limitador de revoluciones. Se activa al empezar la partida.

## Cambiar el trazado

Con el botón **Cargar trazado** se puede subir otro GPX, GeoJSON o CSV (`lat,lon,altitud`). El trazado por defecto está en `ruta/N640-Porto-SanTirso.gpx` y también incrustado en `index.html` (constante `GPX_EMB`). El botón **Invertir sentido** cambia la dirección.

## Ajustes rápidos (en `index.html`)

- Distancia de visión: `Fog(FC,300,7500)` y `PerspectiveCamera(...,9500)` en el bloque 3D. Redúcelas si va lento en el móvil.
- `VMAX`: velocidad máxima (m/s, 69,4 = 250 km/h).
- En `update()`: `.015` (giro del volante), `3.4` (estabilidad) y `7.5` (aceleración).

## Notas

El trazado sale de un GPX dibujado a mano, no es una medición oficial. El relieve a los lados, la vegetación y las casas se generan por código.
