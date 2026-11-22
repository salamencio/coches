# N-640 · Porto → San Tirso

Juego arcade de conducción en 3D (three.js) sobre una ruta real cargada desde un archivo GPX, con tráfico, caja de 6 marchas, física con límite de agarre, minimapa y modo online para varios jugadores.

## Publicar en GitHub Pages

1. Crea un repositorio y sube `index.html`, `ruta/` y `README.md`.
2. **Settings → Pages → Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Abre `https://TU_USUARIO.github.io/NOMBRE_REPO/`.

Local: `python3 -m http.server` en esta carpeta y abre `http://localhost:8000`.

## Menú

- **Jugar en solitario** o **Crear sala / Unirse** con código de 4 letras (WebRTC con PeerJS, sin servidor propio; necesita https).
- En la sala, el anfitrión elige ruta, nombres y tráfico y pulsa **Empezar carrera**. **Todos reciben la misma ruta y los mismos NPC** (el anfitrión simula el tráfico).
- **Ruta:** carga GPX, KML (Google My Maps / Earth), GeoJSON o CSV (`lat,lon,altitud`). Se guarda en el navegador. Hay botones para invertir el sentido, volver a la ruta por defecto y poner nombre al inicio y al final.
- **Controles:** se pueden cambiar uno a uno (se guardan en el navegador).
- **Street View (opcional):** pega una API key de Google Maps (Maps JavaScript API, con la web autorizada en la clave) y durante la carrera aparece una ventana con la vista real de tu posición.

## Controles por defecto

| Acción | Tecla |
|---|---|
| Acelerar / frenar | W / S |
| Girar | A D o ← → |
| Subir / bajar marcha | ↑ / ↓ |
| Freno de mano | Espacio |
| Mirar atrás (mantener) | B |
| Claxon | H |
| Ráfagas | L |
| Intermitentes izq. / der. / emergencia | Z / X / C |
| Pausa (solo offline) | P |

En móvil hay botones en pantalla.

## Lo que hace el juego con tus rutas

- Quita automáticamente los tramos de ida y vuelta (cruces, salidas) y suaviza la línea.
- Corrige el rumbo para que el coche no gire 360º, y recorta el terreno, árboles y casas que se cruzan con otras partes de la ruta.
- No genera tráfico de frente en rotondas, tramos muy cerrados ni zonas donde la ruta se solapa. Puedes desactivarlo del todo en el menú (útil en autovías).
- Quitamiedos metálicos solo en el exterior de curvas.

## Física

Conducción arcade: el coche gira aunque aceleres o frenes, y gira más a baja velocidad. El freno de mano (Espacio) deja derrapar suavemente por encima de 30 km/h. Ajustes en `physStep()` de `index.html`: `.015` (giro), `3.4` (estabilidad), `2.2` (giro extra a baja velocidad).

## Notas

- Sin daños no hay penalización de tiempo: si los daños llegan al 100 % el coche se queda parado unos segundos y se reinicia.
- Los NPC (coches hasta 100 km/h, autobuses 90, camiones 80, bicis 30) frenan en curvas, adelantan cuando el carril contrario está libre y se paran si los chocas.
- El sonido del motor está sintetizado (no es una grabación).
- Las líneas y señales no se generan desde el archivo: los GPX de ejemplo no traen esa información.
