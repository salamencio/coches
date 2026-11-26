# Coches Arcade — publicación en GitHub, revisión 28

Esta carpeta contiene solo los archivos necesarios para ejecutar y publicar el juego, los ejemplos de mapas y los avisos de las bibliotecas/radio. Los modelos originales, pruebas, informes e históricos permanecen en la carpeta de trabajo del PC.

## Subida desde el navegador

1. Abrir la carpeta GitHub-listo-revision28.
2. En el repositorio de GitHub: Add file → Upload files.
3. Arrastrar el CONTENIDO COMPLETO de esta carpeta, incluyendo las subcarpetas. Deben conservarse sus nombres y estructura. No seleccionar únicamente los archivos sueltos del primer nivel.
4. Confirmar que index.html queda en la raíz del repositorio, junto a vehicle-fleet.js, vehicle-packs.js y las carpetas modelos, vendor, radio y ruta.
5. Confirmar la subida con Commit changes.
6. En Settings → Pages elegir la rama publicada y /(root). Si ya se usaba esa configuración no es necesario cambiarla. Esperar a que termine la publicación y recargar la página con Ctrl + F5.

El ZIP debe descomprimirse antes de subirlo: subir únicamente un ZIP al repositorio no publica su contenido como página web.

No deben mezclarse index.html de la revisión 27 y los archivos de esta revisión. Las copias antiguas que ya estuvieran en el repositorio no se usan desde este index actualizado.

## Modelos y rutas

Se incluyen los mismos 36 vehículos jugables y los tres niveles de detalle originales de las 34 importaciones. Los 102 recursos de modelos se han agrupado en 18 paquetes. Se mantiene la carga por nivel de detalle y los modelos se analizan únicamente cuando hacen falta; un paquete compartido no obliga a crear todas sus geometrías.

Las rutas se resuelven desde la ubicación del cargador, por lo que funcionan tanto en la raíz como en una dirección de proyecto del tipo /nombre-del-repositorio/. Three.js se sirve desde vendor para evitar depender de su CDN. Los servicios de radio y multijugador siguen necesitando conexión.

El servidor publicado debe conservar modelos/runtime/flota-01-lod0.js y los demás paquetes exactamente dentro de modelos/runtime. Un error 404 en esos archivos indica que falta la carpeta o se ha cambiado su ubicación/nombre.

La subida web de GitHub admite 100 archivos por operación y 25 MiB por archivo. Esta entrega se verifica para quedar por debajo de ambos límites:
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository?platform=windows
