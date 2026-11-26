# N-640 · Coches Arcade

Versión activa: `Juego-final/index.html`. Las próximas modificaciones se aplican en esta carpeta. Los cambios de esta revisión se describen en `CAMBIOS.md`.

El menú muestra `Versión 2026.11.26 · Flota ampliada · revisión 27` para distinguir esta revisión de las copias anteriores. Después de actualizar el archivo es necesario recargar la pestaña que tuviera el juego abierto.

## Flota de la revisión 27

El lobby permite conducir los 36 vehículos. Se incorporan 29 modelos adicionales y las entregas actualizadas del Golf y el Xantia (revisión 7 de ambos). Las furgonetas, las dos grúas y la pickup pertenecen al grupo de coches. El Iveco de Rías Baixas pertenece al de autobuses.

| Categoría | Modelos | Probabilidad de cada modelo dentro del grupo |
| --- | ---: | ---: |
| Coches y furgonetas | 17 | 1/17 |
| Motos | 5 | 1/5 |
| Autobuses | 3 | 1/3 |
| Camiones | 10 | 1/10 |
| Bicicletas | 1 | 1 |

Los porcentajes de categorías del menú siguen decidiendo la mezcla de tráfico. Dentro de cada grupo todos los modelos tienen el mismo intervalo de selección aleatoria, sin ponderaciones por marca ni por disponibilidad del recurso. Se conservan los límites NPC documentados más abajo.

La carga es local por modelo y nivel de detalle: primero se preparan los modelos ligeros para NPC; los niveles cercanos se solicitan al aproximarse. Al elegir un vehículo, se prepara su modelo detallado antes de iniciar la partida. Las geometrías y texturas se comparten entre instancias; la pintura y las luces controlables se mantienen independientes. Las grúas conservan su decoración. Se usan las ruedas, pivotes y dimensiones de cada entrega; los articulados conservan todos sus enganches y las motos nuevas incorporan el piloto del juego.

Para copiar el juego debe conservarse la carpeta completa, especialmente vehicle-fleet.js y modelos/runtime/, además de los archivos de mapas, radio y retrovisor. El HTML sigue abriéndose directamente como archivo local. Detalle del catálogo en modelos/README.md y validación en informes/Validacion-revision27.md.

## Ubicación y mapas grandes

La esquina inferior derecha del minimapa muestra el nombre de la calle o carretera actual y su referencia, cuando el archivo incluye esos datos. También se conserva la localidad si figura en los atributos. Sin un nombre disponible se muestra «Carretera sin nombre»; no se realizan consultas de geolocalización ni se inventan nombres. Se leen `name`, `ref` y los atributos de localidad de GeoJSON, y los nombres disponibles en GPX. El dibujo de las carreteras del minimapa se guarda en una imagen y no se reconstruye en cada fotograma.

Las redes con más de 300 tramos o 50.000 filas usan carga por zonas. La red completa se conserva a escala 1:1 para navegación y minimapa. La importación y preparación de cruces se hacen en un Web Worker cuando el navegador lo admite. El terreno, las calzadas detalladas, sus marcas y la decoración se generan por celdas de 256 m alrededor del vehículo; las zonas lejanas se liberan, con un máximo de 224 celdas retenidas. El tráfico se concentra alrededor del jugador, con un máximo de 140 NPC y reposición que conserva las maniobras y prioridades de los vehículos existentes.

Este modo usa decoración procedural ligera y una distancia de niebla de 1.100–1.550 m para limitar el dibujo a las zonas disponibles. Las rutas normales mantienen su generación y distancia de visión anteriores. Un archivo con solo vías no reconstruye edificios ni alturas reales ausentes de sus datos.

El archivo aportado de Ribadeo está incluido en `ruta/pruebas/ribadeo-completo.geojson`. Las pruebas y tiempos medidos se describen en `informes/Validacion-revision26.md`. La carpeta completa, incluidos `map-runtime.js`, `map-streaming.js` y `map-worker-vendor.js`, debe acompañar al HTML.

## Carga durante la conducción

En las redes grandes, las zonas de 256 m se construyen en un segundo Web Worker, además del que prepara la importación. El hilo de dibujo recibe buffers terminados; la construcción pesada de terreno, uniones y marcas no se ejecuta al pasar de una zona a otra. El radio base de precarga es de 1.600 m en todas las direcciones, con 400–750 m adicionales por delante según la velocidad. El horizonte visible del modo grande llega aproximadamente a 1,5 km. Las zonas lejanas se liberan y la caché tiene un máximo de 224 celdas.

Los índices de asfalto se almacenan en matrices compactas y las alturas del suelo aprovechan la misma rejilla de 8 m que dibuja el terreno. El reciclaje de NPC busca dentro del entorno activo y reutiliza las posiciones de los actores para comprobar huecos, sin borrar sus prioridades ni cambiar los límites de velocidad. Las variantes gráficas de la escena y del retrovisor se preparan durante la entrada en partida para evitar compilarlas por primera vez durante la conducción.

## Continuidad de cruces y rotondas

La revisión 24 une las alturas de los cruces muy próximos que pertenecen al mismo enlace. Los puentes declarados conservan su separación. La calzada y los arcenes comparten un muestreo adaptativo para seguir las transiciones de altura sin escalones entre la superficie dibujada y la posición de los vehículos.

Los contornos de las uniones tienen esquinas redondeadas y bocas ajustadas al ancho real de cada ramal. El arcén se recorta contra el asfalto de todas las vías a la misma altura, y las líneas de borde omiten las bocas y los bordes interiores compartidos. Las marcas se apoyan sobre los triángulos de asfalto y se subdividen en los cambios de altura. Las trayectorias de giro que salían del asfalto ajustan sus curvas antes de iniciarse. El terreno combina la superficie de cada carretera cercana para evitar saltos al cambiar de vía de referencia.

El caso adicional está incluido en `ruta/pruebas/union-reportada-23.gpx`. El alcance y las limitaciones de la validación se detallan en `informes/Validacion-revision24.md`.

## Enlaces de autovía y carriles

El ancho de la carretera, los arcenes, el recorte del terreno, las marcas, los guardarraíles y las posiciones del tráfico comparten el perfil de cada tramo. Se admiten ramales de un carril y sentido único, con 3,5 m de calzada y circulación centrada, junto a calzadas principales de dos carriles. Los cambios de etiquetas `lanes`, `oneway` y `highway` se conservan aunque no haya un cruce entre ambos tramos.

Las bifurcaciones de autovía distinguen calzada principal y ramal. Los carriles auxiliares se ensanchan y estrechan gradualmente por la derecha; los cambios entre uno y dos carriles sin bifurcación usan una transición de ancho. Las líneas y flechas siguen esos perfiles y el ramal de un carril no lleva un separador central.

Los NPC conservan la prioridad de la calzada principal en los enlaces. Al entrar usan el carril de aceleración y comprueban el hueco delantero y trasero antes de mezclarse con el tráfico. Si no hay hueco frenan antes del final del carril. Para salir preparan el cambio al carril de deceleración; no adelantan en los ramales de un carril.

El archivo aportado está incluido en `ruta/pruebas/enlaces-autovia-25.gpx`. No contiene etiquetas de carriles ni de tipo de vía: en ese caso el juego infiere los ramales por el trazado, las curvas, las calzadas paralelas y sus conexiones. Las medidas de los carriles auxiliares son una estimación procedural; un GPX sin atributos no permite recuperar con certeza todas las características reales de la carretera. Las etiquetas explícitas tienen preferencia sobre esa inferencia.

## Retrovisor central

La parte superior central de la pantalla muestra una vista en directo de la carretera y los vehículos que quedan detrás. La imagen se invierte horizontalmente como en un espejo y la cámara sigue la orientación del vehículo, incluso al usar el control de mirar atrás. Funciona con los siete vehículos jugables.

Está activado por defecto. La tecla **E** permite activar y desactivar el espejo y se puede reasignar desde los controles. También se puede desactivar en **Tráfico y pantalla → Retrovisor central** del lobby o mediante la misma casilla en la pausa. La elección se conserva entre sesiones. Al desactivarlo se libera su textura y se deja de renderizar la vista adicional. Los avisos de emisora aparecen debajo del espejo para mantener ambos visibles.

La vista utiliza el mismo contexto WebGL del juego y una textura de tamaño limitado, adaptada a la ventana. Los archivos `rear-mirror.js` y `rear-mirror.css` deben acompañar al resto del proyecto.

## Radio del vehículo

Incluye las 21 emisoras y sus logos de la aplicación Radio España aportada, con reproductor independiente en `radio/index.html`. La carpeta `radio/` debe acompañar al juego al copiarlo o publicarlo. Las emisiones necesitan Internet; los logos y el soporte HLS están incluidos localmente.

| Control predeterminado | Acción |
| --- | --- |
| Mantener R | Abrir la rueda de emisoras |
| Flechas o rueda del ratón | Preseleccionar emisora con el selector abierto |
| Soltar R | Confirmar la emisora seleccionada |
| Coma / punto | Emisora anterior / siguiente |
| M | Encender o apagar la radio |
| Escape | Cerrar el selector sin cambiar de emisora |

La rueda solo muestra las 21 emisoras y los datos de la selección, sin opción OFF, botones de reproducción ni controles inferiores. **M** controla el encendido y apagado, con atajo reasignable. Cambiar de emisora con la radio apagada la deja apagada; al encender se reproduce la selección guardada. Coma y punto recorren únicamente emisoras, sin pasar por un estado de apagado.

También se puede pulsar sobre los logos, el indicador de radio durante la partida o **Elegir emisora** en el lobby y la pausa. El volumen se ajusta en los menús, es independiente del motor y se conserva entre sesiones, junto con la última emisora elegida. Por compatibilidad con las restricciones de audio del navegador, la radio empieza apagada al abrir el juego. Los cuatro atajos se pueden reasignar en los controles del juego.

Los cambios rápidos cancelan la conexión anterior, incluidas las emisiones HLS. Si falla una emisión se prueban las alternativas disponibles, se muestra el estado y se permite reintentar. Mientras se usa el selector se liberan los controles de conducción; la partida sigue avanzando.

Juego 3D de conducción con coches, motos, tráfico y rutas GPX/KML/GeoJSON/CSV. La versión actual conserva el sonido deportivo del coche, la moto de 300 km/h y los controles configurables.

## Arranque

Extraer el ZIP completo y abrir `index.html`. La conexión a Internet permite cargar three.js y PeerJS. El modo multijugador requiere HTTPS o localhost. Para GitHub Pages, `index.html`, `README.md` y `ruta/` quedan en la raíz del repositorio.

El trazado complejo aportado para esta revisión está incluido en `ruta/pruebas/trazado-complejo.gpx` y se puede seleccionar mediante **Cargar archivo**. La pestaña de una extracción anterior conserva su propia copia del juego; abrir el HTML nuevo permite ejecutar esta revisión.

## Tráfico y adelantamientos

En la revisión 14, los NPC identifican al jugador local y a cada jugador remoto de forma estable entre fotogramas. La posición, velocidad y tramo del vehículo adelantado se actualizan durante toda la maniobra. La reincorporación se decide contra su posición actual; se evita interpretar como vehículo rebasado una fotografía antigua del jugador. Los identificadores de red y de NPC pertenecen a espacios distintos, incluso si su valor bruto coincide.

| Categoría NPC | Nacional | Adelantando en sentido contrario | Autovía |
| --- | ---: | ---: | ---: |
| Coches y motos | 100 | 130 | 130 |
| Autobuses | 90 | 120 | 100 |
| Camiones | 80 | 110 | 90 |
| Bicicletas | 30 | No adelantan | Prohibidas |

Velocidades en km/h. El incremento de 30 solo se permite durante una maniobra por el carril contrario, incluida la reincorporación. En autovía se mantiene el límite de la categoría. Se conserva la excepción del escenario urbano experimental: 50 km/h y sin invasión del carril contrario.

La conducción usa una política por categoría, seguimiento de distancia y predicción de adelantamientos. En rectas despejadas se alcanza el máximo exacto; las curvas se anticipan mediante la distancia de frenado y se recupera velocidad a su salida. Curvas cerradas, cruces, obstáculos y colas pueden obligar a reducir más la velocidad.

El seguimiento de vehículos más lentos busca 8,8 metros libres, aproximadamente dos turismos. Al cerrar rápidamente sobre otro vehículo aumenta el margen de frenado. Entre ciclistas se buscan 3 metros; la separación física mínima es de 2,5 metros. Una cola real no se recicla por permanecer detenida fuera de cámara.

El NPC se aproxima al rebufo y decide la salida a 12 metros o menos. Usa toda la aceleración de adelantamiento disponible: 6,3 m/s² en coches, 8 en motos y 3,2 en pesados, con transición progresiva. Busca reincorporarse después de dejar 5 metros libres y verifica también el tráfico posterior. La predicción incluye aceleración, límites de curva, cambios de carril, vehículos agrupados y hueco para regresar. Las reservas impiden maniobras simultáneas incompatibles.

Las curvas no prohíben automáticamente adelantar. La visibilidad se comprueba con líneas sucesivas hacia el carril contrario que pueden atravesar el interior abierto de una curva. Se contrastan con el terreno, las crestas y los árboles y edificios registrados al construir el escenario. En los árboles se distingue el tronco de la copa y se usa el perfil de los pinos; una copa alta no se considera una pared hasta el suelo. Las intersecciones con obstáculos se calculan sobre la línea, para no saltarse un tronco estrecho entre muestras. Se conservan las prohibiciones explícitas de NOOPP, los accesos a cruces, las rotondas y el escenario urbano.

La decisión inicial y las posteriores usan la misma fotografía del tráfico en cada paso. El objetivo de reincorporación de un adelantamiento a un grupo se conserva, aunque cambie el vehículo que queda inmediatamente delante. Se aceptan diferencias de velocidad a partir de aproximadamente 2,5 km/h cuando la predicción completa permite la maniobra. Una predicción momentáneamente indisponible no provoca una retirada automática: se conserva el presupuesto aprobado, se comprueba el tráfico de frente y se filtran pequeñas fluctuaciones. La amenaza próxima permite reaccionar inmediatamente; se conservan la retirada detrás del vehículo adelantado, los márgenes de cruce y un límite para maniobras que no progresan.

La reintroducción de vehículos fuera de cámara respeta tanto el corredor de regreso de un adelantamiento como la distancia desde la que un vehículo de frente podría alcanzarlo durante el tiempo restante. Así no aparece tráfico nuevo dentro de una oportunidad ya aceptada. Este filtro no sustituye la futura revisión general de generación del mapa y spawn.

Los ciclistas mantienen hasta 30 km/h, siguen las colas y nunca inician adelantamientos. La separación longitudinal y las cajas orientadas comprueban también sus posiciones durante maniobras y giros.

Las salidas de cruces se planifican antes de llegar y se recorren con trayectorias continuas. Se cede al tráfico de la vía prioritaria, al que ya circula en rotonda, a la derecha en cruces sin prioridad y al tráfico de frente al girar a la izquierda. Una salida ocupada impide entrar. Los cruces próximos comparten reserva hasta que sale la parte trasera del vehículo; la espera entre vehículos detenidos se desempata para evitar bloqueos permanentes.

### Interfaz entre la red y la IA

La IA consume PIECES, INC, PH, Y, KLIM y NOOPP; no depende del modo de creación del terreno o del spawn. Cada tramo mantiene r0/r1, a/b, yl por extremo, rb y su dirección, y hwy/flow/fd. Opcionalmente admite priority: [inicio, fin] (un valor mayor da prioridad) y visibility (distancia visible máxima en metros). Sin priority se usan yl, rotondas y prioridad a la derecha; sin visibility se estima la visibilidad geométricamente. NOOPP debe representar prohibiciones explícitas, no una prohibición general por curvatura. Los NPC conservan id estable, categoría, dimensiones, sentido y posición de tramo.

Los ramales cortos de entrada y salida a rotondas y la exclusión de bicicletas en autovía se conservan. La reintroducción en bordes del mapa sigue limitada a posiciones libres fuera de la vista.

## Carreteras y clasificación de autovías

Las coordenadas se proyectan de WGS84 a un plano local en metros, a escala 1:1 y sin ampliación visual. El trazado se reconstruye entre los puntos disponibles; no puede recuperar curvas, carriles o elevaciones que no estén en el archivo. La suavización limita el desplazamiento de los controles de curva a 2,5 m y conserva los extremos.

La red divide las intersecciones y ajusta los recorridos repetidos. Los segmentos separados de un GPX mantienen su identidad. Los cruces con diferencia de elevación de 3,5 m o más, o con capas distintas explícitas, no se conectan. Diferencias menores se consideran ruido de altura en un cruce a nivel. Con datos incompletos no siempre es posible distinguir un puente de un cruce.

Los cruces próximos comparten superficie y las bocas se adaptan a su plano en todo el ancho. Las rotondas comparten plano sin convertir todo el anillo en una única reserva de tráfico. Las uniones conservan las isletas, la textura común del asfalto, las líneas perimetrales, la guía del eje principal y las marcas de ceda el paso. En T tiene prioridad la carretera que continúa; en cruz, el eje continuo de mayor longitud dentro del archivo. Esa regla de juego no reproduce señalización real que no figure en los datos.

La detección usa metadatos highway/junction/oneway/layer/bridge/tunnel cuando existen; también infiere calzadas paralelas sostenidas y anillos geométricos. En autovías se asigna sentido único con la mediana a la izquierda y se excluyen ciclistas. Las rotondas circulan en sentido antihorario y sus entradas ceden al anillo. Los ramales cortos conservan la continuidad de sentido sin extender automáticamente la autovía a las nacionales que la cruzan. Al invertir la presentación de una ruta se conserva el sentido legal explícito.

Un GPX habitual solo contiene puntos y, a veces, alturas. La detección geométrica no garantiza identificar toda autovía o rotonda: una sola calzada abierta puede resultar indistinguible de una nacional. La casilla **Autovía** fuerza la clasificación cuando el archivo resulta ambiguo y se guarda con la ruta.

El terreno conserva la malla continua de 2 m junto al pavimento y 8 m a distancia, con recorte geométrico y transiciones compartidas. Los fragmentos sin área se eliminan durante el recorte. El apoyo de decorados usa los triángulos visibles. Las líneas discontinuas siguen la distancia 3D real, con 6 m pintados y 6 m de separación.

## Prueba urbana de Rosalía de Castro · Ribadeo

En Ruta, pulsar **Probar Rosalía de Castro · Ribadeo** y después **Jugar en solitario**. El botón **Volver a mi ruta anterior** recupera el recorrido que estaba cargado antes de activar la prueba. El escenario se guarda y vuelve a cargar al abrir el juego. También se puede importar directamente el GeoJSON con urbanBundle.

- 128 edificios aproximados con dimensiones del archivo, fachadas sencillas, ventanas, puertas y bases adaptadas a la pendiente.
- 6 medianas, 12 pasos de peatones, 35 señales y 3 ubicaciones de semáforos. Los semáforos son decorativos y permanecen en verde.
- Aceras y calzada de 11,2 m adaptadas para esta prueba, sin vegetación ni casas aleatorias dentro del escenario. No se inventan ramales ni rotondas que no figuran en la geometría del archivo.
- NPC en carriles separados de las medianas, con máximo experimental de 50 km/h para vehículos a motor y 30 para ciclistas, sin adelantamientos por el carril contrario. Los límites de las otras rutas se conservan.
- Colisiones del jugador con edificios y medianas. La inversión del recorrido conserva la colocación geográfica de los objetos.
- El bloque urbano se incluye al guardar la ruta y al compartirla con una sala que use esta versión.

Es una **interpretación experimental de los datos aportados**, no una reproducción real 1:1. El informe de auditoría sigue siendo aplicable a su fiabilidad. Las pruebas de escena y terreno se ejecutan en CPU; falta comprobar la apariencia final y los FPS en WebGL.

## Entorno rural atlántico — revisión 13

Bosquetes de caducifolios y pinos, prados abiertos, hierba, helechos, flores, rocas en taludes y pequeños conjuntos rurales con piedra, enfoscado, patios, cierres y anexos. La decoración usa la semilla compartida de la partida y se excluye geométricamente de todo el pavimento. Los obstáculos se registran en la visibilidad de los NPC. Es una interpretación procedural, no una reproducción cartográfica.

Se han inspeccionado vistas reales de conducción y generales en Chrome, incluidos cruce, rotonda y autovía. Se midieron muestras medias de unos 117/120 FPS en conducción y 71 FPS en la vista general de una rotonda a 1080p con la RTX 5060 Laptop, con el coche detenido; no se afirma ese rendimiento durante toda la ruta. El alcance exacto, los registros y lo pendiente están en [el informe de revisión](informes/Entorno-rural-revision13.md).

Para revisar el escenario, abrir `index.html?review=1`; el modo normal no muestra el panel de diagnóstico. Mantener `environment-review.js` junto al HTML y la carpeta `tests/` para usar los presets locales.

## Gráficos y vehículos

- Los turismos del jugador y los NPC usan los GLB Compacto_01 entregados en la carpeta modelos, inspirados en el Golf VIII. Se conservan las geometrías originales, interior, matrícula, materiales, ruedas y superficies luminosas. Camiones, autobuses y motos conservan sus modelos.
- La moto mantiene el carenado inspirado en una Ninja 400, con doble faro, cúpula, piloto articulado y ruedas detalladas.
- El paisaje incluye copas suaves, pinos por niveles, hierba, viviendas con ventanas y tejados, balizas y nubes. La vegetación se distribuye por la ruta y se muestra por zonas para reducir el trabajo gráfico fuera de la vista.
- Se ha aumentado la resolución de imagen y de las sombras. El terreno y su transición exterior tienen la misma extensión para evitar cortes en el borde de la malla.
- El Golf usa LOD0 para el jugador y niveles 0/1/2 para el tráfico según distancia, con histéresis. Las instancias comparten geometría y texturas; pintura y luces son independientes. No es un modelo oficial del fabricante.
- Los GLB y GLTFLoader r128 están incrustados en index.html para evitar accesos locales bloqueados al abrirlo con file://. Los originales están en modelos/golf; el cargador y su licencia, en vendor.

## Conducción del jugador: arcade WASD

Se ha sustituido el modelo de neumáticos de dos ejes del jugador por un controlador de trayectoria arcade compartido por coche y moto, con ajustes distintos. La dirección cambia la curvatura real desde el primer instante; no hay tiempos de espera por duración de pulsación ni fuerzas laterales que bloqueen el arranque.

- Toques cortos: pequeñas correcciones de trayectoria. Mantener la tecla da acceso rápido a todo el giro. Al soltar o invertir se centra con rapidez, sin corregir automáticamente hacia el carril.
- Coche: girar, acelerar o frenar en curva no genera derrape lateral. La dirección conserva la velocidad disponible; siguen existiendo resistencia del motor, frenada, cambios de marcha y límites de velocidad.
- Freno de mano: único mando que inicia un derrape en el coche, con giro asistido hasta 2,7 rad/s, frenado progresivo y recuperación rápida al soltar. El ángulo lateral y la velocidad de giro se reducen a alta velocidad. La recuperación disipa movimiento lateral en lugar de convertirlo en un impulso hacia delante. Desde parado permite pivotar sin añadir propulsión. Los impactos pueden desplazar el vehículo temporalmente.
- Moto: mayor autoridad de giro, inclinación visual progresiva y limitada a 1,25 rad/s; la tumbada acompaña al giro sin retrasar la trayectoria. El caballito reduce la capacidad de giro.
- La autoridad de giro se adapta a la velocidad. El agarre arcade máximo en asfalto es de 2,9 g para el coche y 3,4 g para la moto, valores deliberadamente altos para el juego. La hierba ofrece bastante menos capacidad de giro y aceleración.
- Quemar rueda con W + S conserva la oscilación lateral y el humo en ambos vehículos.
- La integración se subdivide para mantener el comportamiento a distintas frecuencias de imagen. El velocímetro y las colisiones del coche incluyen su velocidad lateral durante el derrape.
- Los estados de dirección, movimiento lateral, inclinación y perturbaciones se reinician al empezar, reaparecer o cambiar de vehículo.

La caja de cambios y sus controles se conservan. La moto mantiene su máximo arcade de 300 km/h; el coche conserva 250 km/h aproximadamente. Estos ajustes afectan solo a los vehículos del jugador: los límites y el comportamiento de los NPC no cambian.

## Controles

| Acción | Tecla |
| --- | --- |
| Acelerar / frenar | W / S |
| Girar | A / D o flechas izquierda / derecha |
| Subir / bajar marcha | Flecha arriba / abajo |
| Freno de mano / giro arcade del coche | Espacio |
| Caballito de la moto | V mantenida + aceleración |
| Quemar rueda y oscilar lateralmente a baja velocidad | W + S |
| Mirar atrás | B mantenida |
| Claxon / ráfagas | H / L |
| Intermitente izquierdo / derecho / emergencia | Z / X / C |
| Pausa | P o Esc |
| Marcha atrás | S con el vehículo parado, sin acelerar |

Los controles se pueden cambiar en el menú. El motor del coche se sintetiza con un carácter inspirado en un Hyundai i30 N, incluidos petardeos breves; el de la moto conserva la síntesis de cuatro cilindros. No se incluyen grabaciones de los modelos reales.

## Verificación

- `node tests/passing-player.cjs`: adelantamiento completo al jugador local en movimiento por todas las categorías a motor, ambos sentidos y 30/60/120 Hz; jugadores remotos cuyo objeto cambia cada paso; aceleración durante la maniobra y separación de identidades de red/NPC. Se comprueban reincorporación tras rebasar el vehículo real, una sola maniobra completa y ausencia de contactos en los escenarios simulados.

- `node tests/run-all.cjs`: ejecuta todas las suites.
- `node tests/rural.cjs`: colocación fuera del pavimento, raíces, semilla, colores y capacidad de instancias, obstáculos NPC, patios y liberación de recursos.
- `node tests/rural-world.cjs`: genera la malla completa de cuatro rutas y comprueba triángulos, alturas, vértices compartidos y conservación de la red.

- `node tests/passing-commitment.cjs`: permanencia de la decisión sin amenaza, protección frente a reintroducciones en el corredor reservado, diferencias pequeñas de velocidad, visibilidad bajo copas y detección de troncos, conservación del objetivo de un grupo y maniobras completas en ambos sentidos a 30/60/120 Hz.
- `node tests/passing-safety.cjs`: curvas abiertas, obstáculos y bancos de terreno, zonas intermedias ocultas, duración prevista y real, aceleración del jugador de frente y retirada sin contacto a 30/60/120 Hz. Los terrenos de estos casos son fixtures sintéticos del código de producción; no constituyen inspección visual de WebGL.

- `node tests/npc-ai.cjs`: categorías y sentidos, seguimiento a dos coches, rebufo y adelantamiento de todas las categorías, curvas visibles, crestas, tráfico de frente, anticipación de curvas, colas de ciclistas a 30/60/120 Hz y prioridades de cruces. Simulación CPU del código de producción, sin navegador ni WebGL.

- `node tests/models.cjs`: carga de los tres GLB, igualdad de los datos incrustados, escala, orientación, ruedas, luces, materiales independientes, geometría compartida, cambios de LOD y sustitución inicial sin desplazar los coches. Pruebas de geometría/materiales en CPU con carga de imágenes simulada; no validan WebGL.
- `node tests/urban.cjs`: importación urbana, escena completa y terreno finitos, carriles y medianas, colisiones, inversión, persistencia y recuperación de la ruta anterior (CPU, sin WebGL).
- `node tests/game.cjs`: controles físicos, límites, rutas, giros, retenciones y adelantamientos completos.
- `node tests/regression.cjs`: incluye el GPX adjunto, superficies de cruces sin autointersecciones, continuidad de autovía, prohibición de bicicletas, cálculo temporal de adelantamientos, elipse de agarre y detección de solapes entre NPC.
- `node tests/stress.cjs`: simulaciones prolongadas de las rutas de ejemplo.
- `node tests/sports.cjs`: freno de mano con aceleración, recuperación, giro de la moto y accesos de ángulo pequeño.
- `node tests/merge.cjs`: conservación de velocidad en una conexión suave de autovía.
- `node tests/terrain.cjs`: altura del prado junto a pendientes y carreteras a distintas cotas, continuidad de los terraplenes y geometría del trazado complejo.
- `node tests/refinement.cjs`: ausencia de área verde sobre el asfalto tras el recorte, continuidad de marcas, continuidad de la dinámica a 60 km/h, giro de la moto y seguimiento del tráfico lento.
- `node tests/handling.cjs`: conducción arcade de ambos vehículos; ausencia de derrape normal, curvas rápidas, toques WASD, cambios de carril, contravolante, arranque, marcha atrás, freno de mano, recuperación, caballitos, hierba, quemar rueda, manejadores WASD del juego y estabilidad a 30/60/120 Hz.
- `node tests/junctions.cjs`: dirección progresiva, rotación durante el derrape, pendientes bajo los ejes, altura de giros y accesos separados a rotondas.
- `node tests/generation.cjs`: unión de ramales, conservación de isletas, cierre de cruces complejos y continuidad de altura en todo el ancho de cada boca.
- `node tests/map-import.cjs`: escala métrica, GPX con dos puntos y etiquetas XML, elevaciones ausentes, pasos elevados, prioridades, orientación de las marcas, superficies de rotondas, reservas por acceso, sentido legal de autovías y persistencia de metadatos.

Las pruebas verifican escenarios concretos; no garantizan que cualquier GPX arbitrario esté bien definido. La iluminación final, el rendimiento y el sonido dependen del navegador y del equipo. Los modelos se han inspeccionado mediante vistas geométricas sin el renderizador WebGL.

## Ajuste de luz de la revisión 14

Se conserva el entorno rural de la revisión 13: terreno, vegetación, casas, materiales, marcas y organización de recursos. Se reduce la exposición ACES de 1,00 a 0,79, la luz solar de 1,25 a 1,05 y la luz hemisférica de 0,78 a 0,62. El tono de niebla/horizonte es menos blanco. No se cambian los límites de velocidad ni las reglas de visibilidad para reducir el brillo.

La validación de esta revisión distingue las simulaciones CPU de la inspección visual. El intento de iniciar Chrome se cierra por un fallo del proceso de informes de errores antes de cargar el juego; no se atribuyen a esta revisión capturas WebGL ni mediciones de FPS. El informe visual de la revisión 13 corresponde a aquella versión.

## Bordes de carretera de la revisión 15

Las franjas de grava del arcén se generan completas con la carretera, sin un límite de distancia corto. Se corrige su orden de profundidad para evitar que la base las oculte a distancia y se conserva su dibujado continuo. Las barreras metálicas y sus postes pasan a compartir una distancia de dibujo de 2200 m (antes 850 y 600 m respectivamente); sus sombras siguen limitadas a las proximidades. Se mantienen la geometría de los cruces, la iluminación de la revisión 14 y la IA sin cambios. La verificación disponible es de geometría y escena en CPU; no se afirma inspección visual WebGL.

En los modelos de camión, autobús, moto y turismo provisional, los intermitentes de adelantamiento se encienden por separado: izquierdo al salir y derecho al volver. Se conserva la misma convención del Golf importado. No se activan los cuatro por el mero hecho de adelantar.

## Correcciones de la revisión 17

Los cruces comparten el material de asfalto con la carretera. La grava se recorta contra todos los triángulos de asfalto de las uniones y tiene menor prioridad de profundidad; no cubre el centro del cruce. Se orientan las caras hacia arriba y se recalculan las normales después del recorte. Las comprobaciones de rayos excluyen una tolerancia de 2 mm en los bordes de triángulos muy finos.

Además de los ciclos cerrados y las etiquetas explícitas, se reconocen arcos circulares sostenidos de más de 210 grados que quedan dentro de una carretera más larga. Se separan del acceso antes de construir la geometría y se les asigna circulación antihoraria. Las rotondas incluyen flechas en el sentido legal. Es una inferencia geométrica: un GPX que solo muestra una curva corta no permite distinguir por sí solo una rotonda de una carretera normal.

En autovía se mantiene el carril izquierdo para un siguiente vehículo más lento si queda cerca y puede alcanzarse pronto: hasta 110 m, con un horizonte de aproximación de 8 s y margen antes del final del tramo. Después de rebasarlo se vuelve a la derecha. Se conserva el límite de cada categoría y la circulación nacional anterior.

Los guardarraíles visibles generan colisiones por segmento y un índice espacial independiente de la distancia de dibujo. La colisión respeta altura y extremos, separa el vehículo del metal y amortigua la velocidad normal al impacto, conservando mejor el avance en contactos laterales. Coche y moto usan pasos de física de hasta 1/120 s; el daño depende del impacto.

Los faros de los vehículos permanecen encendidos con luz de cruce. En el Golf importado se activa su emisión; la luz del jugador usa alcance corto y orientación baja, y las ráfagas siguen diferenciadas. Los faros de los modelos procedurales conservan sus superficies iluminadas. Los NPC no añaden un foco dinámico por vehículo, para evitar multiplicar el coste de iluminación.

Una reincorporación nueva dentro de la distancia de seguimiento provoca frenada inmediata si el NPC no está alejándose del vehículo que entra. Se comprueban jugador local y remoto, sin reutilizar objetos recibidos como identidad permanente.

Pruebas adicionales: tests/junction-surface.cjs, tests/roundabout-arcs.cjs, tests/highway-chain.cjs, tests/guardrail.cjs y tests/cutin-lights.cjs. Verificación de geometría, materiales y simulación CPU; no se afirma inspección visual WebGL.

## Revisión 18: flota y rotonda aportada

Se integran los GLB originales de la carpeta entregas vehiculos: Golf y Xantia revisados, DAF CF 310, Scania con tauliner y Tourismo Monbus. Cada uno conserva sus tres LOD, texturas, luces y dimensiones. El Scania conserva sus diez ruedas y la articulación del semirremolque. Los archivos están también incrustados en el HTML para permitir abrirlo directamente sin solicitar los GLB con fetch.

El selector del lobby permite jugar con Golf, Xantia, moto predeterminada, DAF, Scania, Monbus y bicicleta. La selección se guarda y se comunica a otros jugadores, también cuando cambia antes de empezar. Dentro de la categoría coches, Golf y Xantia tienen un 50 % cada uno; dentro de camiones, DAF y Scania tienen un 50 % cada uno. Monbus, moto y bicicleta son actualmente el único modelo de sus respectivas categorías. Se mantienen los porcentajes de categorías configurados en el menú y los límites NPC anteriores.

Los pesados usan física propia de juego: aceleración por potencia y masa, frenada progresiva, respuesta de dirección más lenta, límite lateral, marcha atrás y efecto de la pendiente. El Scania añade articulación dependiente de velocidad y giro, con límite al retroceder para evitar un ángulo excesivo. Las potencias y masas son parámetros de simulación, no una ficha homologada. Los camiones jugables alcanzan 90 km/h y el Monbus 100 km/h; la bicicleta alcanza 30 km/h. Coches y moto conservan la física anterior. El cambio sigue siendo manual de seis marchas con los controles existentes. La cámara se aleja y eleva para que no quede dentro de los vehículos largos.

Cuando dos vehículos no caben a la vez en una curva estrecha, la IA reserva el paso, espera antes de entrar y evita que ambos avancen hasta bloquearse. Si aparecen dentro del estrechamiento, el que debe ceder puede retroceder a un punto de espera. La cola reserva espacio para esa maniobra. Las reservas se liberan cuando queda libre la curva; los casos de prueba incluyen cuatro articulados y orden de actualización invertido. No se eliminan las colisiones para conseguir que pasen.

El GPX que reproducía la rotonda está en ruta/pruebas/rotonda-reportada.gpx. Un extremo terminaba junto al anillo pero sin conexión topológica. La reparación conecta extremos próximos, a menos de 3 m, cuando coinciden nivel y altura; divide el tramo receptor y vuelve a clasificar el ciclo. En este archivo se reconocen cuatro arcos del anillo y cuatro accesos de sentido único. Los accesos inferidos tienen dos carriles salvo que el archivo declare uno. Los separadores de carril de estas calzadas no se pintan como una carretera de doble sentido, y las flechas indican el sentido legal en ambos carriles.

La prueba específica recorre el archivo durante 120 segundos en cada orientación de importación y comprueba que el tráfico del anillo es antihorario. Se conservan las comprobaciones anteriores de pasos elevados, cruces, materiales, prioridad y luces. Las inferencias siguen dependiendo de la calidad y contenido del GPX; no se afirma una clasificación universal de cualquier archivo ambiguo.

## Nitidez de imagen

El render 3D deja de usar un tamaño fijo de 1600 × 900. Ahora sigue el tamaño real de la ventana y la densidad de pantalla, con adaptación al redimensionar y un presupuesto máximo de píxeles. El HUD se ajusta a la misma resolución. En Tráfico y pantalla aparece Nitidez: resolución nativa, mayor nitidez o priorizar rendimiento. La carretera usa la anisotropía máxima admitida por la GPU y la niebla empieza más lejos. Se conserva la exposición 0,79 y la iluminación tenue anterior; no se añade desenfoque de profundidad.

Las nuevas pruebas de flota, rotonda reportada, física de pesados y encuentros en curvas usan el código de producción en CPU. Las pruebas de resolución verifican el tamaño del búfer calculado; no sustituyen una inspección visual real en WebGL ni una medida de FPS.

La revisión 18 se comprobó también en Chrome con WebGL: selección y avance de los siete vehículos, cámaras de pesados, rotonda aportada y accesos de dos carriles. La pasada final no registró errores de página. Detalle en informes/Validacion-revision18.md e informes/pruebas-revision18.txt; no se afirma una medición de FPS.
