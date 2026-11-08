---
title: '¿Cómo se convierte una reivindicación educativa en un juego?'
description: 'Cómo convertir ratios, cansancio y falta de recursos en mecánicas jugables sin presentar al alumnado como el problema.'
publishedAt: 2026-11-08
draft: false
language: es
kind: build-note
readingMinutes: 8
topics:
  - diseño de producto
  - aprendizaje mediante juegos
  - educación pública
image: ../../assets/projects/una-jornada-decente.jpg
imageAlt: 'Una jornada decente game start screen'
---

Esa fue la pregunta que dio origen a Una jornada decente, un pequeño juego web pensado para ayudar a entender algunas de las demandas del profesorado de la educación pública madrileña.

Quería hablar de ratios, burocracia, falta de recursos, problemas de climatización y deterioro de las instalaciones. Pero no quería limitarme a presentar una lista de datos. La idea era que quien jugase pudiera sentir, aunque solo fuera durante unos minutos, cómo esas condiciones se acumulan a lo largo de un curso.

## Una interacción que no necesita explicación

El principal reto no fue técnico. Fue encontrar metáforas jugables que transmitieran el problema sin sugerir que el alumnado es una carga.

El punto de partida fue una mecánica similar a la del dinosaurio de Chrome: un personaje avanza automáticamente y el jugador solo tiene que saltar para evitar obstáculos.

Es una interacción que casi todo el mundo reconoce. Funciona con teclado o con un toque en la pantalla y permite empezar a jugar sin tutoriales largos. Esa sencillez dejaba espacio para que el significado apareciera a través de la propia partida.

El personaje es un docente que recorre un curso dividido en tres trimestres. Por el camino encuentra pilas de formularios, archivadores, goteras, ventiladores averiados, problemas de calefacción y paredes deterioradas.

## Los alumnos no son el obstáculo

Los obstáculos no representan al alumnado. Representan las condiciones que dificultan el trabajo educativo.

Una primera posibilidad era que el profesor llevase cada vez más alumnos detrás y que eso hiciera más difícil saltar. Mecánicamente funcionaba, pero la metáfora tenía un problema evidente: podía interpretarse como que los niños eran el obstáculo o la carga que impedía avanzar.

Por eso decidí separar ambas ideas.

Los alumnos acompañan visualmente al docente y saltan con él. A medida que aumenta la ratio aparecen más figuras, hasta un máximo representativo. Junto al grupo se muestra la cifra total.

La dificultad, sin embargo, no aumenta porque “los alumnos pesen”. Aumenta porque atender adecuadamente a un grupo mayor exige más energía al docente.

El efecto jugable es parecido —el salto se va haciendo más corto—, pero la explicación cambia por completo. El cansancio no procede de estar rodeado de niños, sino de intentar ofrecer la misma atención con menos tiempo y recursos por persona.

Esa distinción era fundamental para que la mecánica no contradijera el mensaje del proyecto.

## La dificultad se acumula

La energía funciona como la medida central de la partida.

Al comenzar un trimestre, el docente dispone de toda su energía. Esta disminuye de forma progresiva y lo hace más rápido conforme aumenta la ratio. Cuando la energía baja, el salto pierde altura. Los obstáculos, mientras tanto, siguen llegando y el mundo acelera.

La dificultad no aparece de golpe. Se acumula.

Esto permite que el jugador empiece con una sensación de control y vaya descubriendo que acciones que antes eran fáciles dejan de serlo. No porque haya olvidado cómo jugar, sino porque está intentando responder a una situación cada vez más exigente con menos capacidad disponible.

Chocar con un obstáculo también reduce la energía, pero no termina inmediatamente la partida. El curso está organizado en tres trimestres y cada uno funciona como una etapa de resistencia. Al agotarse la energía llegan las vacaciones de Navidad o Semana Santa, se recupera la energía y comienza el siguiente trimestre con una dificultad inicial algo mayor.

El objetivo no es castigar al jugador. Es mostrar que descansar ayuda, pero no elimina las condiciones estructurales que producen el cansancio.

## Un curso que cambia con las estaciones

Los obstáculos también cambian según avanza el curso.

Al principio predominan el papeleo, los archivadores y los problemas de climatización del invierno. Más adelante aparecen las goteras. En el tercer trimestre llegan el calor y las tareas de cierre de curso. Los desperfectos de las instalaciones pueden aparecer en cualquier momento.

La burocracia se repite deliberadamente. No es un acontecimiento excepcional, sino una presencia constante.

El escenario acompaña esa progresión. Las ventanas, las verjas y los lazos verdes se desplazan con la partida. Cada vez aparecen más lazos, inspirados en los que se colocan en colegios y puentes como símbolo de la defensa de la educación pública.

La música también responde al juego: una mezcla de charanga y sonido de videojuego que acelera cuando aumenta la velocidad del mundo. Navidad, Semana Santa y el final de curso tienen sus propias transiciones musicales.

## Primero la experiencia, después los datos

No quería interrumpir continuamente la partida con cifras o mensajes. La experiencia debía poder entenderse primero a través de las sensaciones: más alumnado, menos energía, saltos más cortos, más velocidad y obstáculos que no dejan de llegar.

Los datos aparecen al final.

Después de completar el curso, el juego conecta sus metáforas con información pública sobre ratios, salarios docentes, coste de vida y condiciones de las aulas. La intención no es presentar el juego como una simulación exacta, sino utilizarlo como puerta de entrada a una realidad más compleja.

También hay una versión sin animación que explica el recorrido para quienes prefieran no jugar o tengan activada la reducción de movimiento.

## Elegir qué simplificar

Crear Una jornada decente implicó tomar decisiones sobre lo que el juego debía evitar.

No quería personalizar el conflicto en una figura política concreta. Tampoco quería presentar al profesorado como héroes que pueden superar cualquier dificultad con suficiente habilidad. Y, sobre todo, no quería que el alumnado apareciera como el problema.

El centro de la experiencia son las condiciones: ratios elevadas, falta de apoyos, cansancio acumulado, burocracia e infraestructuras insuficientes.

Un juego simplifica necesariamente la realidad. La responsabilidad está en decidir qué simplifica y qué mensaje producen esas simplificaciones.

En este caso, la idea que quería conservar era sencilla: el problema no es tener más alumnos, sino pretender atenderlos igual de bien sin aumentar el tiempo, los apoyos y los recursos disponibles.

[Juega a Una jornada decente](https://israelgutierrez.es/educacion-publica/)

[Consulta el código del proyecto](https://github.com/gootyfer/educacion-publica)
