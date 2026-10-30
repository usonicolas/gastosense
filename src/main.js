'use strict';

/**
 * Punto de entrada de GastoSense.
 * Ejecuta una demostración por consola de la funcionalidad básica:
 * registrar movimientos, ver el saldo, resumir gastos y revisar un presupuesto.
 *
 * Uso: npm start
 */

const { GestorMovimientos } = require('./modulos/movimientos');
const { GestorPresupuestos } = require('./modulos/presupuestos');
const { calcularSaldo, resumenGastosPorCategoria } = require('./modulos/reportes');

const formatoPesos = (valor) =>
  valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function main() {
  const movimientos = new GestorMovimientos();
  const presupuestos = new GestorPresupuestos(movimientos);

  console.log('=== GastoSense: tu dinero, bajo control ===\n');

  // 1. Registrar movimientos de ejemplo
  movimientos.registrar({ tipo: 'ingreso', monto: 1000000, categoria: 'Salario', descripcion: 'Pago mensual', fecha: '2026-10-01' });
  movimientos.registrar({ tipo: 'gasto', monto: 120000, categoria: 'Comida', descripcion: 'Supermercado', fecha: '2026-10-03' });
  movimientos.registrar({ tipo: 'gasto', monto: 45000, categoria: 'Transporte', descripcion: 'Transporte del mes', fecha: '2026-10-05' });
  movimientos.registrar({ tipo: 'gasto', monto: 350000, categoria: 'Vivienda', descripcion: 'Arriendo parcial', fecha: '2026-10-07' });
  movimientos.registrar({ tipo: 'gasto', monto: 60000, categoria: 'Comida', descripcion: 'Restaurante', fecha: '2026-10-12' });

  // 2. Historial y saldo
  console.log('Historial de movimientos:');
  for (const m of movimientos.listar()) {
    const signo = m.tipo === 'ingreso' ? '+' : '-';
    console.log(`  ${m.fecha}  ${m.categoria.padEnd(11)} ${signo}${formatoPesos(m.monto)}  (${m.descripcion})`);
  }
  console.log(`\nSaldo disponible: ${formatoPesos(calcularSaldo(movimientos.listar()))}`);

  // 3. Resumen de gastos por categoría
  console.log('\nGastos por categoría:');
  for (const fila of resumenGastosPorCategoria(movimientos.listar())) {
    console.log(`  ${fila.categoria.padEnd(11)} ${formatoPesos(fila.total)}  (${fila.porcentaje}%)`);
  }

  // 4. Presupuesto con alerta
  presupuestos.definir('Comida', 200000, '2026-10');
  const p = presupuestos.estado('Comida', '2026-10');
  console.log(`\nPresupuesto de ${p.categoria} (${p.mes}): ${formatoPesos(p.gastado)} de ${formatoPesos(p.limite)} (${p.porcentaje}%)`);
  if (p.estado === 'cerca') console.log('  Alerta: te estás acercando al límite de gasto.');
  if (p.estado === 'superado') console.log('  Alerta: superaste el límite de gasto.');
}

main();
