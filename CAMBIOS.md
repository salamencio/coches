# Revisión 27 - Flota ampliada y carga por modelo

- 36 vehículos jugables en cinco grupos del lobby: 17 coches/furgonetas, 5 motos, 3 autobuses, 10 camiones y una bicicleta.
- Integración de las 31 entregas de la carpeta modelos: 29 incorporaciones y sustitución del Golf y Xantia por sus revisiones 7.
- Furgonetas, pickup y grúas clasificadas como coches; microbús Iveco Rías Baixas como autobús.
- Selección uniforme de modelos dentro de cada grupo, conservando los porcentajes de categorías y límites de tráfico.
- 102 LOD originales de 34 vehículos importados, con integridad SHA-256 verificada y carga local mediante scripts, sin fetch de archivos GLB.
- LOD detallado del vehículo elegido preparado antes de comenzar; cola de dos cargas simultáneas y LOD cercanos bajo demanda.
- Ruedas por radio y eje entregados, dirección, luces independientes, decoración de grúas, piloto en las motos nuevas y varios enganches en conjuntos articulados.
- Reconstrucción de instancias al llegar un LOD conservando posición, escala y estado de animación; retirada de instancias eliminadas del registro.
- Pruebas de escala, luces, articulación, selector, física y probabilidad, y comprobación real en Chrome/WebGL.

# Revisión 26 - Zonas en segundo plano y radio ampliado

- Construcción de geometría en un Worker dedicado y transferencia de buffers; incorporación de una sola zona terminada por fotograma.
- Radio base de 1.600 m, precarga adicional de 400–750 m por delante y caché acotada a 224 celdas. Eliminación de las zonas lejanas.
- Índices de asfalto compactos y consultas de terreno equivalentes a la rejilla dibujada, reduciendo duplicación y presión de memoria.
- Actualización incremental de los índices al incorporar o retirar una zona.
- Geometrías y materiales comunes compartidos; visibilidad de zonas calculada para la cámara principal y el retrovisor.
- Reciclaje de NPC limitado al área activa y posiciones de actores calculadas una sola vez por búsqueda.
- Preparación de recursos gráficos durante la carga, incluidas las variantes del retrovisor al ocultar el vehículo del jugador.
- Pruebas de transferencia de geometría, consultas reales por rayos, liberación de recursos y avance simulado rápido sobre Ribadeo completo.

# Revisión 25 - Ubicación y carga de redes grandes

- Nombre de calle/carretera y referencia en la esquina inferior derecha del minimapa; se conservan los cambios de nombre entre tramos y se usa un aviso claro cuando faltan datos.
- Minimap estático guardado en una imagen; solo los marcadores y la ubicación se actualizan cada fotograma.
- Búsqueda espacial de extremos y calzadas, sustituyendo los barridos completos de la red.
- Importación y preparación de cruces en segundo plano, transferencia de matrices y reutilización de las superficies preparadas.
- Generación de redes grandes por celdas, con caché acotada, liberación de geometría y registros de colisiones/visibilidad al alejarse.
- Tráfico local acotado y reposición sin borrar las prioridades de los NPC presentes.
- Corrección de dos casos de unión numérica en los cruces del archivo completo; conserva la geometría de isletas y los casos anteriores.
- Incluido el GeoJSON completo de Ribadeo y una prueba permanente de importación, nombres, geometría local y liberación de recursos.

# Revisión 24 - Continuidad de uniones, arcenes y alturas

- Altura común en grupos de cruces próximos conectados, evitando rampas abruptas en tramos cortos; separación de puentes declarados.
- Muestreo adaptativo compartido por calzada y arcenes para representar las transiciones verticales y laterales.
- Esquinas de uniones redondeadas; bocas ajustadas al ancho y sentido de cada ramal.
- Recorte de arcenes contra todas las superficies de asfalto cercanas a la misma altura, incluidas las geometrías indexadas.
- Líneas de borde sin cierres transversales en las bocas ni bordes interiores donde continúa otra calzada.
- Proyección y subdivisión adaptativa de las marcas sobre la malla de asfalto para mantenerlas visibles en las transiciones verticales; recorte de las marcas ocultas bajo otra calzada.
- Ajuste de curvas de giro de NPC cuando la trayectoria inicial sale del asfalto.
- Terreno vinculado a la superficie de cada tramo cercano, con mezcla continua entre carreteras.
- GPX adicional aportado incluido. Auditoría de superficies reales y giros en cinco rutas y ambas orientaciones; detalles en el informe de validación.
- Conservadas las funciones anteriores de radio, retrovisor, flota, sentidos de circulación y límites NPC.

# Revisión 23 - Rueda de radio simplificada

- Rueda con las 21 emisoras, sin opción OFF, cabecera visible ni controles inferiores.
- Encendido y apagado mediante M, reasignable desde los controles. Retirados también los botones de encendido del lobby y la pausa.
- Selección y encendido independientes: elegir una emisora con la radio apagada no la enciende. Coma/punto recorren solo emisoras.
- Conservados el volumen en ajustes, los logos, el nombre seleccionado y la navegación con teclado, ratón y selector móvil.

# Revisión 22 - Ramales y enlaces de autovía

- Perfil por tramo compartido entre calzada, arcenes, terreno, líneas, guardarraíles y tráfico.
- Ramales de un carril y sentido único, con los NPC centrados y sin separador central.
- Conservados los cambios de carriles y sentido declarados en el archivo aunque el punto de transición no sea un cruce.
- Separación de zonas de autovía y curvas de enlace; inferencia de ramales en GPX sin etiquetas.
- Carriles auxiliares de aceleración y deceleración, con ensanche y cierre progresivos; transiciones entre uno y dos carriles.
- Prioridad de la calzada principal y preparación de salidas. Incorporación con comprobación de hueco delantero y trasero y espera antes del final del carril.
- Eliminados pequeños bucles de retrazado que no admiten una calzada y reforzado el cierre numérico de las superficies de los enlaces.
- GPX aportado incluido y comprobado en CPU y Chrome con WebGL, en ambas orientaciones de importación. Suite completa: 32 archivos de pruebas, cero fallos.

# Revisión 21 - Atajo del retrovisor

- E activa y desactiva el retrovisor; atajo reasignable desde los controles.
- Eliminada la × del espejo. Se mantienen las casillas del lobby y la pausa y la preferencia guardada.

# Revisión 20 - Retrovisor central

- Retrovisor superior centrado, con vista 3D en directo hacia atrás e inversión horizontal de la imagen.
- Compatible con coches, moto, bicicleta, autobús y camiones; la vista sigue la orientación del vehículo.
- Activación desde el lobby y la pausa; botón para desactivarlo en el propio espejo. Preferencia persistente.
- Un único contexto WebGL, resolución acotada y liberación del render adicional al apagarlo.
- Decorados visibles desde la cámara trasera y restauración del estado de la cámara principal tras dibujar el espejo.
- Avisos de radio bajo el espejo e indicador de radio compacto en pantallas pequeñas.

# Revisión 19 - Radio España integrada

- Añadida la aplicación Radio España en `radio/`, con sus 21 emisoras, logos, soporte HLS y avisos de licencia originales.
- Rueda de selección de emisoras, nombre y logo al cambiar, e indicador durante la conducción. Selector táctil en pantallas pequeñas.
- Mantener R para elegir y soltar para confirmar; coma/punto para cambiar, M para encender/apagar. Controles reasignables.
- Acceso desde el lobby y la pausa, volumen independiente persistente y enlace al reproductor completo.
- Una sola emisión activa: cancelación de conexiones anteriores, alternativas, recuperación de errores y sin reproducción automática al abrir el juego.

# Revisión 18 - Flota, rotondas y pesados jugables

- Corregida la conexión que impedía reconocer la rotonda del GPX aportado. Sentido único en el anillo y accesos, dos carriles por acceso inferido y flechas coherentes.
- Golf y Xantia revisados, Monbus, DAF y Scania con sus tres LOD originales. Geometría y texturas compartidas, pintura y luces independientes por vehículo.
- Selector del lobby con todos los vehículos del juego y selección transmitida en multijugador. Probabilidades iguales entre modelos de una misma categoría.
- Física específica para camiones, autobuses y bicicleta; articulación del Scania, cámara adaptada y colisiones con la longitud completa del conjunto.
- Paso alterno y retirada a un punto de espera para resolver encuentros de pesados en curvas estrechas, conservando la detección de contacto.
- Resolución adaptada al tamaño de ventana y densidad de pantalla, opción de nitidez, mayor filtrado anisotrópico y menos niebla cercana. Se mantiene el brillo anterior.
- Nuevas pruebas de carga de modelos, selección, distribución, rotonda aportada, física, colas de pesados y altura visible de marcas. Batería CPU e inspección real en Chrome/WebGL, sin errores en la pasada final.

# Revisión 17 — Cruces, circulación y guardarraíles

- Eliminada la superposición de grava sobre el asfalto de los cruces; material común con los tramos y caras orientadas hacia arriba.
- Detección adicional de anillos circulares incompletos dentro de un trazado, con circulación antihoraria y flechas direccionales.
- Adelantamientos encadenados en autovía sin reincorporaciones innecesarias entre vehículos próximos.
- Colisión de coche y moto contra los segmentos de guardarraíl visibles, con respuesta lateral y daño según impacto.
- Luces de cruce encendidas y frenada inmediata ante una reincorporación cercana.
- Cinco suites adicionales con casos reproducibles. Se mantienen límites de velocidad, ajustes de brillo y comprobaciones anteriores. Validación CPU; inspección visual WebGL pendiente.

# Revisión 16 — Red GPX métrica y cruces continuos

- Proyección WGS84 a metros sin factor de escala visual. Importación con dos puntos, espacios de nombres, segmentos separados, elevaciones parciales y metadatos de vía conservados al guardar.
- Reconstrucción de intersecciones, eliminación de recorridos repetidos, conservación de pasos elevados distinguibles y curvas suavizadas con desviación limitada.
- Cruces cercanos unidos en una superficie común, con transición de altura en todo el ancho de las bocas. Rotondas con plano compartido, isletas y reservas de tráfico por acceso.
- Reparadas las marcas viales orientadas hacia abajo. Guía de la carretera principal y marcas de ceda el paso en los cruces.
- Prioridad para la carretera que continúa en T y para el eje continuo más largo en cruz. La espera en una vía secundaria no anula la prioridad principal.
- Calzadas paralelas con circulación por la derecha y rotondas antihorarias. La clasificación de autovía no se propaga indiscriminadamente a una nacional que la cruce.
- Recorte del terreno con descarte temprano de fragmentos sin área para evitar crecimiento explosivo de memoria.
- Se conservan límites, adelantamientos, intermitentes, iluminación y decorados. Validación de geometría y tráfico en CPU; sin afirmar inspección visual WebGL.

Un GPX sin metadatos no determina carriles, prioridades reales ni puentes. La escala corresponde a sus coordenadas; las clasificaciones geométricas son inferencias. La casilla Autovía sigue disponible para archivos ambiguos.

# Revisión 15 · Bordes continuos e intermitentes

- Corregida la prioridad de profundidad de los arcenes de grava; ligera separación de la base y franjas completas sin recorte de visibilidad por objeto.
- Barreras metálicas y postes visibles hasta 2200 m, con el mismo alcance y conservando el límite de sombras cercanas.
- Corregidos los cuatro intermitentes involuntarios en los modelos procedurales: izquierdo al salir a adelantar y derecho al reincorporarse.
- Se mantienen iluminación, terreno, decorados y decisiones de IA de la revisión anterior. Comprobaciones CPU de carretera y escenario; inspección WebGL pendiente.

# Revisión 14 · Luz más suave y seguimiento del vehículo adelantado

- Importada como base la actualización gráfica recibida: paisaje rural atlántico de la revisión 13. Se mantienen sus decorados, geometría, materiales, texturas, recursos y pruebas.
- Menor exposición y menor intensidad solar/ambiental; horizonte menos blanquecino.
- Corregida una causa reproducida de reincorporación antes de ponerse en paralelo: al adelantar al jugador local se conservaba una fotografía antigua de su posición. Se actualiza el objetivo por identidad estable durante la maniobra.
- Seguimiento equivalente para jugadores de red, incluso al reemplazarse el objeto recibido, y separación de identificadores de NPC y participantes remotos.
- Pruebas nuevas con jugador en movimiento, aceleración, ambos sentidos, todas las categorías a motor y 30/60/120 Hz. Se conservan las pruebas de tráfico de frente, retirada, cruces y límites.
- Comprobaciones automatizadas CPU; Chrome no llega a cargar el juego en el intento de inspección de esta revisión. No se afirma validación visual ni medición de rendimiento WebGL.

# Revisión 13 — Paisaje rural atlántico

- Malla continua con 2 m junto al pavimento y 8 m a distancia, sin bajadas aisladas de vértices al recortar. Limpieza de fragmentos colapsados y mezcla suave de alturas entre calzadas próximas.
- Asfalto seco con textura de escala mundial compartida por cruces y tramos, reparaciones discretas y marcas medidas sobre distancia 3D real.
- Bosquetes, claros, hierba agrupada, helechos, flores y rocas sobre la malla visible; exclusión exacta del pavimento y registro de obstáculos en la visibilidad NPC.
- Conjuntos rurales variados de piedra/enfoscado con tejados, chimeneas, carpintería, cimientos, patios, cierres y anexos. Patios y entradas adaptados a los triángulos del terreno.
- Instanciación por sectores, detalle por distancia y liberación de geometrías, materiales, texturas propias y buffers de instancias al reconstruir.
- Nuevas comprobaciones de decorados, recursos y mundo completo. Inspección real en Chrome desde conducción y vistas generales, con cruce, rotonda y autovía. Muestras estacionarias a 1080p de aproximadamente 117/120 FPS y 71 FPS en la vista general de una rotonda, en RTX 5060 Laptop; sin garantía de rendimiento de una ruta completa en movimiento.
- Diagnóstico opcional con ?review=1. Alcance y pendientes en informes/Entorno-rural-revision13.md.

# Revisión 12 · Adelantamientos decididos

- Corregida una causa reproducida de retiradas prematuras: un vehículo reciclado podía reaparecer de frente dentro de una maniobra ya iniciada. Las reservas protegen ahora también su ventana de encuentro, manteniendo posiciones fuera de cámara y sin solapes.
- Una predicción nueva ausente no cancela por sí sola un adelantamiento; se conserva la previsión admitida, se filtran pequeñas fluctuaciones y se mantiene la reacción ante peligro próximo, cruces y falta prolongada de progreso.
- Objetivo de regreso estable en adelantamientos a grupos. La decisión inicial y la reevaluación usan el tráfico congelado del mismo paso, sin depender de que otro vehículo se haya actualizado antes.
- Umbral de diferencia de velocidad reducido de 4,7 a unos 2,5 km/h; comprobación cada 0,10 s. Se conservan potencia, distancias y límites por categoría.
- Visibilidad ajustada a troncos y copas en lugar de cilindros opacos completos. Las intersecciones sobre la línea detectan también obstáculos estrechos.
- Pruebas nuevas de compromiso de maniobra y de reintroducciones; se mantienen las comprobaciones de retirada ante tráfico de frente. El diagnóstico que reproducía cuatro retiradas por nuevas reintroducciones registra cero con el filtro aplicado en los mismos escenarios.
- Comprobaciones automatizadas CPU; el intento de iniciar Chrome falla antes de cargar el juego. No se afirma inspección visual ni validación de FPS en WebGL.

# Revisión 11 · Visibilidad y retirada

- Sustituida la restricción de visibilidad al corredor del asfalto por líneas de visión sobre el terreno y obstáculos del escenario.
- Predicción con aceleración, seguimiento, cambios de carril y reincorporación; evaluación del tráfico de frente durante la maniobra y posibilidad de frenar y regresar detrás.
- Añadidos escenarios de seguridad de adelantamientos en curvas y frente al jugador a distintas frecuencias de simulación.

# Revisión 10 · IA NPC

- Categorías y límites: coches/motos 100/130, autobuses 90/100, camiones 80/90; hasta +30 km/h exclusivamente al adelantar por el carril contrario. Ciclistas a 30.
- Control de velocidad y distancia sustituido; seguimiento a 8,8 m, aproximación al rebufo y aceleración de adelantamiento por categoría.
- Predicción de maniobras con huecos de regreso, potencia, curvas, reservas y aproximación del tráfico contrario. Adelantamientos en curvas cuando el corredor visual y el perfil lo permiten.
- Frenado anticipado para curvas y recuperación del máximo al salir; sin variaciones aleatorias de velocidad de crucero.
- Ciclistas sin adelantamientos, separación en retenciones y conservación de las colas fuera de cámara. Límite de categoría también durante conectores de giro.
- Prioridad de vías, rotondas, derecha y cesión a vehículos de frente al girar a la izquierda; salidas bloqueadas y reservas de cruces conservadas.
- Contrato documentado para conectar la próxima generación de terreno, cruces y spawn. No se ha rehecho esa generación en esta revisión.
- Pruebas específicas en tests/npc-ai.cjs y batería anterior actualizada a 130 km/h. Las comprobaciones son simulaciones automatizadas CPU; el intento de iniciar Chrome falla antes de cargar el juego y no constituye inspección visual.

# Revisión 9 · Ribadeo experimental

- Mapa de prueba seleccionable en el menú a partir del urbanBundle aportado; original incrustado para abrir index.html sin servidor local.
- Edificios, medianas, marcas, señales y semáforos decorativos; aceras y calzada adaptadas para probar el conjunto.
- Retirados los decorados aleatorios del tramo urbano. Fachadas y cimientos generados a partir de las dimensiones, sin atribuir fidelidad cartográfica a esos datos.
- Carriles NPC apartados de las medianas, máximo experimental urbano y sin invasión del carril contrario al adelantar. Rutas anteriores sin cambios.
- Colisiones con edificios y medianas; geometría y marcas siguen la pendiente del trazado.
- Recuperación de la ruta previa, persistencia del escenario, inversión y transmisión del bloque urbano en las salas.
- Comprobaciones automatizadas, incluida una reconstrucción completa del mundo en CPU. No se ha validado visualmente en WebGL.

# Revisión 8 · Golf y freno controlado

- Freno de mano con mayor disipación, deslizamiento lateral progresivo y limitado, y rotación adaptada a la velocidad.
- Soltar el freno de mano ya no convierte la velocidad lateral en aceleración longitudinal, incluso con el acelerador mantenido.
- Integración de los tres GLB Compacto_01 entregados, sin alterar los archivos originales. Modelo del jugador y de los turismos NPC.
- Ruedas con sus pivotes, orientación y rodadura correctas; luces de freno, marcha atrás e intermitentes separadas.
- LOD por distancia con histéresis, geometría compartida y materiales de pintura/luces por coche. Liberación de materiales privados al cambiar de vehículo o reconstruir tráfico.
- Modelos y cargador incrustados en index.html; no requieren un servidor local para cargar los GLB.
- Pruebas numéricas de frenado y ausencia de impulso al recuperar agarre; comprobaciones CPU de importación, dimensiones, materiales, animación, LOD y carga inicial.
- Sin validación visual WebGL en este entorno.

# Revisión 7 · Conducción arcade WASD

Se rehace la conducción de los dos vehículos del jugador. Se retira la simulación lateral de dos ejes del coche y las progresiones basadas en tiempo de pulsación.

- Trayectoria controlada directamente, respuesta inmediata y retorno rápido; toques para corregir y pulsaciones mantenidas para girar con fuerza.
- El coche no derrapa por girar, acelerar ni frenar. El freno de mano inicia el derrape; los impactos conservan su desplazamiento temporal.
- Mayor paso por curva en coche y moto, sin pérdida de velocidad artificial por ángulo de rueda.
- Freno de mano con rotación asistida y recuperación rápida; permite pivotar desde parado.
- Moto con giro ágil, tumbada gradual, caballitos y reducción de autoridad durante el caballito.
- Se mantienen quemar rueda, oscilación lateral, marchas, velocidades máximas, sonido y modelos.
- Control subdividido para estabilidad entre 30, 60 y 120 Hz. Reinicio de estados completo.
- NPC y generación sin cambios.

Pruebas automatizadas: curva de radio 60 m a 144 km/h, cambios de carril, toques cortos, contravolante, arranques y marcha atrás, ausencia de derrape normal, freno de mano, humo, terreno, caballitos, quemar rueda y teclado WASD. También pasan las suites generales de juego y regresión.

No se ha podido completar la prueba visual: el acceso al navegador está indisponible y Chrome se cierra durante el arranque automatizado antes de cargar el juego. Las pruebas numéricas no equivalen a comprobar las sensaciones conduciendo.
