# Validación de publicación — revisión 28

Se conserva la flota de 36 vehículos y los 102 LOD de las 34 importaciones. La prueba model-packs.cjs ha cargado las 34 variantes NPC con seis paquetes LOD2, sin analizar LOD0 o LOD1. Después ha cargado todos los detalles con exactamente 18 solicitudes, sin duplicados. Los 102 contenidos se comprobaron por SHA-256 contra los GLB originales. También pasaron las pruebas de flota, selector, geometría, luces, física por categoría y del cargador individual anterior.

Chrome real abrió la copia de publicación en tres ubicaciones: raíz HTTP, subruta HTTP /mi-repo/ y archivo local. En las tres se precargaron los 34 modelos, se seleccionaron los 36 vehículos jugables y se cargaron todos los LOD. No hubo errores JavaScript de página ni peticiones de recursos del juego ausentes. La única petición HTTP ausente fue favicon.ico, solicitada automáticamente por Chrome; no forma parte de los recursos del juego. Se usaron tipos MIME de JavaScript y nosniff para reproducir la comprobación de un servidor estático.

La comprobación se realiza sobre un servidor HTTP local y archivos del PC; no se ha publicado ni inspeccionado un repositorio remoto concreto. No es una medición de FPS. No se repite la batería de terreno y tráfico porque esta revisión modifica carga de recursos y empaquetado, sin cambiar esas simulaciones.

La exportación comprueba un máximo de 100 archivos y 25 MiB por archivo. El ZIP se verifica leyendo y comparando cada entrada con su archivo original. Los modelos originales y las pruebas permanecen en la carpeta de trabajo, mientras que el paquete de publicación contiene los recursos ejecutables y sus instrucciones.
