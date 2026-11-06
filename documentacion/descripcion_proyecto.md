# Descripción del proyecto: GastoSense

## 1. Descripción general de la solución

GastoSense es un gestor de gastos personales con una arquitectura por capas: una interfaz de usuario (web o móvil), una capa de lógica de negocio, servicios de dominio y una base de datos. En esta primera entrega se construye la lógica de negocio como prototipo por consola en Node.js, de modo que la interfaz y la base de datos puedan incorporarse después sin reescribirla.

## 2. Necesidad identificada

Muchas personas tienen dificultades para llevar un control claro de sus ingresos y gastos. La falta de organización puede generar gastos excesivos y dificultar el ahorro.

## 3. Requerimientos

### Funcionales

- Registrar ingresos y gastos.
- Clasificar movimientos por categorías.
- Consultar el historial.
- Crear presupuestos mensuales.
- Definir metas de ahorro.
- Visualizar gráficos y reportes.
- Mostrar alertas de límites de gasto.

### No funcionales

- Interfaz intuitiva y accesible.
- Diseño adaptable a celular y computador.
- Protección de datos personales.
- Rendimiento adecuado.
- Código modular y mantenible.
- Validación de los datos ingresados.

## 4. Módulos y responsabilidades

| Módulo | Archivo | Responsabilidad | Estado |
|--------|---------|-----------------|--------|
| Movimientos | `src/servicios/gestorMovimientos.js` | Validar y guardar ingresos y gastos; consultar el historial | Implementado (base) |
| Presupuestos | `src/servicios/gestorPresupuestos.js` | Definir un límite mensual por categoría y avisar al acercarse a él | Implementado (base) |
| Reportes | `src/servicios/reportes.js` | Calcular el balance y el resumen por categoría | Implementado (base) |
| Metas de ahorro | pendiente | Definir metas y calcular el avance | Por desarrollar |
| Interfaz | pendiente | Pantallas web y móvil | Por desarrollar |
| Persistencia | pendiente | Guardado en base de datos | Por desarrollar |

## 5. Tecnologías y herramientas

- **Interfaz:** React (propuesta).
- **Backend:** Node.js (en uso para el prototipo).
- **Base de datos:** PostgreSQL (propuesta).
- **Control de versiones:** Git y GitHub.
- **Diseño:** diagramas UML.
- **Documentación:** README y documentación técnica en Markdown.

## 6. Patrones de diseño propuestos (para entregas siguientes)

| Tipo | Patrón | Aplicación en el proyecto | Ejemplo de uso |
|------|--------|---------------------------|----------------|
| Creacional | Factory Method | Crear distintos tipos de movimientos | Ingreso o gasto |
| Creacional | Singleton | Gestionar una instancia de configuración | Preferencias generales |
| Estructural | Adapter | Facilitar la integración con servicios externos | Importación de datos |
| Estructural | Decorator | Añadir atributos o filtros a reportes | Reportes por categoría |
| Comportamiento | Observer | Actualizar alertas al cambiar un presupuesto | Aviso de límite |
| Comportamiento | Strategy | Aplicar diferentes métodos de análisis de gastos | Resumen mensual o semanal |

En esta entrega no se implementan patrones completos. El prototipo deja los puntos de extensión señalados con comentarios `TODO(patrón)` en el código.

## 7. Organización del desarrollo

- Rama `main` estable; el trabajo nuevo se hace en ramas por funcionalidad (`feature/nombre`) y se integra con pull requests revisados por otro integrante.
- Commits pequeños, en español, con mensajes que describen el cambio.
- Cada funcionalidad nueva incluye al menos una prueba en `tests/`.
- Las tareas se reparten por módulo entre los integrantes del equipo.

## 8. Resultado esperado

Un prototipo funcional de gestor de gastos personales que permita registrar movimientos, consultar balances, organizar presupuestos y visualizar reportes, acompañado de diagramas de diseño y documentación técnica.
