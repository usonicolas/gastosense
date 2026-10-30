'use strict';

/**
 * Módulo de reportes: calcula el saldo y resúmenes a partir de los movimientos.
 * Son funciones puras: reciben una lista de movimientos y devuelven resultados.
 */

/** Saldo disponible = total de ingresos menos total de gastos. */
function calcularSaldo(movimientos) {
  return movimientos.reduce(
    (saldo, m) => (m.tipo === 'ingreso' ? saldo + m.monto : saldo - m.monto),
    0
  );
}

/**
 * Resume los gastos por categoría, de mayor a menor.
 * @returns {{categoria: string, total: number, porcentaje: number}[]}
 */
function resumenGastosPorCategoria(movimientos) {
  // TODO(patrón): aquí se aplicará Strategy para elegir el método de análisis
  // (resumen mensual, semanal, etc.).
  const gastos = movimientos.filter((m) => m.tipo === 'gasto');
  const totalGastos = gastos.reduce((suma, m) => suma + m.monto, 0);

  const porCategoria = new Map();
  for (const g of gastos) {
    porCategoria.set(g.categoria, (porCategoria.get(g.categoria) ?? 0) + g.monto);
  }

  return [...porCategoria.entries()]
    .map(([categoria, total]) => ({
      categoria,
      total,
      porcentaje: totalGastos === 0 ? 0 : Math.round((total / totalGastos) * 100),
    }))
    .sort((a, b) => b.total - a.total);
}

module.exports = { calcularSaldo, resumenGastosPorCategoria };
