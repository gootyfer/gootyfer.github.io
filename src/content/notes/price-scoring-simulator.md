---
title: 'Cómo aprendí sobre licitaciones públicas construyendo un simulador'
description: 'Cómo construir un simulador me ayudó a entender las fórmulas de valoración económica y los incentivos que generan en una licitación pública.'
publishedAt: 2026-11-09
draft: false
language: es
kind: build-note
readingMinutes: 4
topics:
  - contratación pública
  - producto
  - prototipado
  - aprender construyendo
image: '../../assets/projects/price-scoring-simulator.jpg'
imageAlt: 'Simulador de fórmulas de valoración económica comparando ofertas y puntuaciones'
---

Este proyecto empezó como una prueba para optar a un puesto de Product Maker en Gobierto.

El reto consistía en construir una pequeña herramienta que ayudara a entender las fórmulas de valoración económica en las licitaciones públicas. Mi punto de partida era muy básico: no sabía prácticamente nada sobre contratación pública.

## Entender el proceso antes de diseñar

Antes de diseñar o programar, tuve que entender qué estaba intentando representar.

Lo primero fue comprender qué es una licitación pública: un proceso mediante el que una administración contrata un servicio, una obra o un suministro con reglas publicadas previamente. Las empresas interesadas —los licitadores— presentan sus ofertas, y la administración —el adjudicador— las evalúa para decidir cuál gana.

Después entendí mejor la fase de concurso. No gana necesariamente la empresa más barata: las ofertas reciben puntos según distintos criterios. Puede haber una valoración técnica —calidad de la propuesta, metodología o experiencia— y una valoración económica. En el simulador, ambas suman 100 puntos.

## La fórmula también decide

El precio es un criterio muy habitual, pero no se traduce directamente en una decisión. Antes de publicar la licitación, el adjudicador define una fórmula que convierte cada oferta económica en puntos. Esa fórmula se aplica automáticamente a todas las propuestas recibidas.

Ahí está la idea que terminó articulando el producto: con las mismas empresas, las mismas ofertas y las mismas puntuaciones técnicas, cambiar la fórmula puede cambiar el ganador.

También aprendí qué son las bajas: la diferencia entre el presupuesto base y el precio ofertado. Una baja muy agresiva puede considerarse anormalmente baja —a veces se habla de oferta temeraria— y requerir una justificación antes de ser admitida o excluida.

A partir de ahí, fui entendiendo las diferencias entre fórmulas: proporcional inversa, baja sobre presupuesto base, umbral de saciedad o referencia a la media de las ofertas. Cada una genera incentivos distintos: algunas empujan más a bajar el precio; otras limitan esa carrera y permiten que la parte técnica pese más.

## Convertir reglas en una interfaz

Construir el simulador fue también mi forma de aprender. Cada decisión de interfaz me obligó a hacer explícita una regla: qué pasa cuando una oferta supera un umbral, cómo se calculan los puntos, qué datos explican un resultado o cómo mostrar un empate sin elegir arbitrariamente un ganador.

Intenté además que la herramienta pudiera resultar útil para las dos partes del proceso: para un adjudicador que quiere entender las consecuencias de elegir una fórmula y para un licitador que quiere explorar cómo puede comportarse una estrategia de precio con unas reglas dadas.

## Un prototipo para entender

No es una herramienta jurídica ni pretende sustituir el análisis de un pliego. Es un prototipo para hacer más comprensible un mecanismo que puede parecer abstracto. Y para mí fue, sobre todo, una forma muy práctica de entrar en un dominio completamente nuevo.

[Abre el simulador](https://israelgutierrez.es/price-scoring-simulator/)

[Consulta el código del proyecto](https://github.com/gootyfer/price-scoring-simulator)
