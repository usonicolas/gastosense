# GastoSense

**Tu dinero, bajo control.** Gestor de gastos personales desarrollado como microproyecto de la asignatura de patrones de diseño y métodos de construcción de software, Universidad Manuela Beltrán (UMB).

## Descripción y objetivo

GastoSense es una aplicación para registrar, organizar y analizar ingresos y gastos personales. Su objetivo es facilitar el control del presupuesto, la planificación del ahorro y la toma de decisiones financieras responsables.

## Problema que busca resolver

Muchas personas tienen dificultades para llevar un control claro de sus ingresos y gastos. La falta de organización puede generar gastos excesivos y dificultar el ahorro. GastoSense busca:

- Organizar los movimientos financieros.
- Identificar las categorías de mayor gasto.
- Controlar presupuestos mensuales.
- Fomentar hábitos de ahorro.

## Integrantes del equipo

| Nombre | Rol | Usuario de GitHub |
|--------|-----|-------------------|
| Nombre del integrante 1 | Brayan Nicolas Ayala | usonicolas | líder técnico y backend | Estructura del repo, módulos de movimientos y presupuestos, pruebas, revisión de cambios |
| Nombre del integrante 2 | Daniel Felipe Cruz | danielcruz54  | Documentación y reportes | Módulo de reportes, README y docs/, diagramas UML, apoyo en pruebas |


> Reemplazar esta tabla con los datos reales del equipo antes de la entrega.

## Tecnologías seleccionadas

| Capa | Tecnología | Estado |
|------|------------|--------|
| Interfaz | React | Propuesta, para entregas futuras |
| Backend | Node.js | En uso (prototipo inicial) |
| Base de datos | PostgreSQL | Propuesta, para entregas futuras |
| Control de versiones | Git y GitHub | En uso |
| Diseño | Diagramas UML | Por desarrollar |
| Documentación | README y documentación técnica en Markdown | En uso |

## Estructura del repositorio

```
gastosense/
├── docs/
│   └── descripcion_proyecto.md   Descripción técnica de la solución
├── src/
│   ├── main.js                   Punto de entrada (demostración por consola)
│   └── modulos/
│       ├── movimientos.js        Registro de ingresos y gastos
│       ├── presupuestos.js       Presupuestos mensuales y alertas de límite
│       └── reportes.js           Balance y resumen por categoría
├── tests/
│   ├── README.md                 Plan de pruebas
│   └── gastosense.test.js        Pruebas básicas
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

## Instrucciones iniciales para ejecutar y revisar

Requisitos: [Node.js](https://nodejs.org/) 18 o superior. No hay dependencias externas.

```bash
# Clonar el repositorio
git clone https://github.com/usonicolas/gastosense.git
cd gastosense

# Ejecutar la demostración
npm start

# Ejecutar las pruebas
npm test
```

La demostración registra varios movimientos de ejemplo, muestra el saldo disponible, el resumen por categoría y una alerta cuando un presupuesto se acerca a su límite.

## Estado del proyecto

Entrega 1: diseño y estructura inicial. Todavía no se aplican patrones de diseño completos; la base está organizada para incorporarlos en las siguientes entregas (Factory Method, Strategy, Observer, Adapter, entre otros, según la propuesta de diseño).

## Licencia

MIT
