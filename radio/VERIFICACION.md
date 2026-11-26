# Verificación de Radio España

Fecha: 26 de noviembre de 2026 a las 10:29 (Europe/Madrid).

Entorno: Google Chrome en Windows. Verificación automática con un navegador real en modo sin interfaz.

## Reproducción

21/21 emisoras reproducidas. Cada prueba exige el evento de reproducción, datos de audio disponibles y avance del reloj del elemento de audio. No es únicamente una comprobación HTTP ni una escucha humana.

| Emisora | Reproducción en Chrome | Logo decodificado |
| --- | --- | --- |
| Cadena SER | Correcta | Correcto |
| COPE | Correcta | Correcto |
| Onda Cero | Correcta | Correcto |
| RNE Radio 1 | Correcta | Correcto |
| Radio 3 | Correcta | Correcto |
| esRadio | Correcta | Correcto |
| Los 40 | Correcta | Correcto |
| Los 40 Classic | Correcta | Correcto |
| Cadena Dial | Correcta | Correcto |
| Cadena 100 | Correcta | Correcto |
| Europa FM | Correcta | Correcto |
| Kiss FM | Correcta | Correcto |
| Hit FM | Correcta | Correcto |
| Rock FM | Correcta | Correcto |
| Radio Galega | Correcta | Correcto |
| Radio Galega Música | Correcta | Correcto |
| SER Radio Coruña | Correcta | Correcto |
| SER Ferrol | Correcta | Correcto |
| SER Radio Vigo | Correcta | Correcto |
| CUAC FM | Correcta | Correcto |
| SER Baixo Miño | Correcta | Correcto |

## Conexiones

30/30 direcciones principales y de respaldo verificadas por HTTPS, leyendo datos de audio. En HLS se siguen las listas hasta descargar un segmento de audio. No se incluyen respuestas HTML, listas vacías, errores HTTP ni certificados inválidos como conexiones válidas.

## Funcionamiento de la aplicación

- 21 logos integrados decodificados por Chrome, también al abrir index.html como archivo local.
- Pausa y reanudación.
- Cambio rápido de Radio Galega a Cadena SER.
- Recuperación automática después de guardar deliberadamente una URL personalizada rota para SER Radio Vigo.
- La corrección de una emisora de Galicia conserva su región y su logo.
- Restauración de las 21 emisoras originales.
- Búsqueda sin tildes y filtros regionales.
- Vista móvil de 375 píxeles sin desbordamiento horizontal; capturas de escritorio y móvil revisadas.
- Radio Galega y Europa FM reproducidas con HLS al abrir index.html mediante file://, sin servidor.
- Sin errores JavaScript registrados en las pruebas finales.

## Alcance

Las comprobaciones reflejan la disponibilidad durante esta sesión. Las emisiones dependen de los servidores de cada cadena y de la conexión del oyente. No se ha probado Safari, Firefox ni un dispositivo iOS/Android físico.

SHA-256 de index.html verificado: `64da6d6772e3d8a0b7946c9a878d73284d9c6f00676476eba6f427c37c4ab906`.
