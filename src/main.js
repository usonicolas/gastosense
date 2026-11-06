'use strict';

/**
 * Punto de entrada de GastoSense.
 * Ejecuta una demostración por consola: registra movimientos de ejemplo,
 * muestra el saldo, resume los gastos y revisa un presupuesto.
 * Aquí solo se conectan las piezas; la lógica vive en servicios/ y la
 * salida en pantalla en componentes/.
 *
 * Uso: npm start
 */

const { GestorMovimientos } = require('./servicios/gestorMovimientos');
const { GestorPresupuestos } = require('./servicios/gestorPresupuestos');
const { calcularSaldo, resumenGastosPorCategoria } = require('./servicios/reportes');
const consola = require('./componentes/consola');

function main() {
  const movimientos = new GestorMovimientos();
  const presupuestos = new GestorPresupuestos(movimientos);

  consola.mostrarTitulo();

  movimientos.registrar({ tipo: 'ingreso', monto: 1000000, categoria: 'Salario', descripcion: 'Pago mensual', fecha: '2026-10-01' });
  movimientos.registrar({ tipo: 'gasto', monto: 120000, categoria: 'Comida', descripcion: 'Supermercado', fecha: '2026-10-03' });
  movimientos.registrar({ tipo: 'gasto', monto: 45000, categoria: 'Transporte', descripcion: 'Transporte del mes', fecha: '2026-10-05' });
  movimientos.registrar({ tipo: 'gasto', monto: 350000, categoria: 'Vivienda', descripcion: 'Arriendo parcial', fecha: '2026-10-07' });
  movimientos.registrar({ tipo: 'gasto', monto: 60000, categoria: 'Comida', descripcion: 'Restaurante', fecha: '2026-10-12' });

  const historial = movimientos.listar();
  consola.mostrarHistorial(historial);
  consola.mostrarSaldo(calcularSaldo(historial));
  consola.mostrarResumenPorCategoria(resumenGastosPorCategoria(historial));

  presupuestos.definir('Comida', 200000, '2026-10');
  consola.mostrarPresupuesto(presupuestos.estado('Comida', '2026-10'));
}

main();
