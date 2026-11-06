'use strict';

/**
 * Componente de consola: se encarga solo de mostrar información en pantalla.
 * No calcula nada; recibe los datos ya listos. Así, cuando exista la interfaz
 * web (React), este archivo es lo único que se reemplaza.
 */

const { formatoPesos } = require('../utilidades/formato');

function mostrarTitulo() {
  console.log('=== GastoSense: tu dinero, bajo control ===\n');
}

function mostrarHistorial(movimientos) {
  console.log('Historial de movimientos:');
  for (const m of movimientos) {
    const signo = m.tipo === 'ingreso' ? '+' : '-';
    console.log(`  ${m.fecha}  ${m.categoria.padEnd(11)} ${signo}${formatoPesos(m.monto)}  (${m.descripcion})`);
  }
}

function mostrarSaldo(saldo) {
  console.log(`\nSaldo disponible: ${formatoPesos(saldo)}`);
}

function mostrarResumenPorCategoria(resumen) {
  console.log('\nGastos por categoría:');
  for (const fila of resumen) {
    console.log(`  ${fila.categoria.padEnd(11)} ${formatoPesos(fila.total)}  (${fila.porcentaje}%)`);
  }
}

function mostrarPresupuesto(p) {
  console.log(
    `\nPresupuesto de ${p.categoria} (${p.mes}): ${formatoPesos(p.gastado)} de ${formatoPesos(p.limite)} (${p.porcentaje}%)`
  );
  if (p.estado === 'cerca') console.log('  Alerta: te estás acercando al límite de gasto.');
  if (p.estado === 'superado') console.log('  Alerta: superaste el límite de gasto.');
}

module.exports = {
  mostrarTitulo,
  mostrarHistorial,
  mostrarSaldo,
  mostrarResumenPorCategoria,
  mostrarPresupuesto,
};
