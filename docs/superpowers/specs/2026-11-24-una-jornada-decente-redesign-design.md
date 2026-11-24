# Actualización de Una jornada decente

## Intención

Actualizar la presentación de *Una jornada decente* para que la web muestre la versión rediseñada del juego y el artículo explique la segunda iteración sin perder la reflexión original sobre sus metáforas educativas.

## Objetivos

- Sustituir la imagen antigua del proyecto y del artículo por la nueva captura aprobada.
- Mantener el artículo existente, su URL y su fecha de publicación original.
- Añadir al final del artículo una sección titulada `Rediseñar antes de volver a programar` con la versión revisada del texto.
- Marcar el artículo como actualizado el 24 de noviembre de 2026 y ajustar el tiempo de lectura.
- Mantener funcionando los metadatos sociales, el RSS, el sitemap y el diseño adaptable.

## No objetivos

- No publicar una segunda nota ni convertir la actualización en un changelog.
- No rediseñar la página principal ni modificar el juego.
- No cambiar el sistema de publicación: Astro ya convierte automáticamente los archivos Markdown en HTML durante el despliegue de GitHub Pages.

## Enfoques considerados

1. Reemplazar por completo el artículo original: dejaría solo la versión actual, pero perdería la historia de las decisiones iniciales.
2. Conservar el artículo y añadir una actualización fechada: mantiene la historia, muestra capacidad de iteración y evita duplicar contenido. Es el enfoque elegido.
3. Publicar una nota nueva: daría más presencia editorial al rediseño, pero el contenido actual funcionaría más como lista de cambios que como una historia independiente.

## Diseño elegido

- La nueva captura se incorporará como un nuevo recurso de imagen y será la portada compartida por la ficha destacada y la nota.
- La sección nueva irá después de la reflexión original y antes de los enlaces para respetar la cronología: primera versión, aprendizajes y rediseño.
- El texto dejará explícito qué cambió —arte, Phaser, dificultad, música y experiencia móvil— y qué se conservó: el alumnado acompaña al docente, pero no representa el obstáculo.
- La nota conservará `publishedAt: 2026-11-08`, añadirá `updatedAt: 2026-11-24` y aumentará el tiempo estimado de lectura.
- Las pruebas comprobarán la imagen nueva, la sección añadida, la fecha de actualización y que la portada principal siga enlazando al mismo proyecto y artículo.

## Trabajo restante

Preparar la imagen dentro de los recursos del sitio, actualizar el Markdown y los datos del proyecto, adaptar las pruebas, verificar la web en escritorio y móvil y publicar el resultado en `master`.
