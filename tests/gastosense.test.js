'use strict';

const test = require('node:test');
const assert = require('node:assert');

const { GestorMovimientos } = require('../src/servicios/gestorMovimientos');
const { GestorPresupuestos } = require('../src/servicios/gestorPresupuestos');
const { calcularSaldo, resumenGastosPorCategoria } = require('../src/servicios/reportes');

test('registra un ingreso y un gasto válidos', () => {
  const g = new GestorMovimientos();
  const ingreso = g.registrar({ tipo: 'ingreso', monto: 1000, categoria: 'Salario', fecha: '2026-10-01' });
  const gasto = g.registrar({ tipo: 'gasto', monto: 200, categoria: 'Comida', fecha: '2026-10-02' });
  assert.strictEqual(ingreso.id, 1);
  assert.strictEqual(gasto.id, 2);
  assert.strictEqual(g.listar().length, 2);
});

test('rechaza datos no válidos', () => {
  const g = new GestorMovimientos();
  assert.throws(() => g.registrar({ tipo: 'regalo', monto: 10, categoria: 'X' }), /Tipo de movimiento/);
  assert.throws(() => g.registrar({ tipo: 'gasto', monto: -5, categoria: 'X' }), /monto/);
  assert.throws(() => g.registrar({ tipo: 'gasto', monto: 10, categoria: '  ' }), /categoría/);
  assert.throws(() => g.registrar({ tipo: 'gasto', monto: 10, categoria: 'X', fecha: '01/10/2026' }), /fecha/);
});

test('calcula el saldo disponible', () => {
  const g = new GestorMovimientos();
  g.registrar({ tipo: 'ingreso', monto: 1000, categoria: 'Salario', fecha: '2026-10-01' });
  g.registrar({ tipo: 'gasto', monto: 300, categoria: 'Comida', fecha: '2026-10-02' });
  assert.strictEqual(calcularSaldo(g.listar()), 700);
});

test('resume los gastos por categoría de mayor a menor', () => {
  const g = new GestorMovimientos();
  g.registrar({ tipo: 'gasto', monto: 100, categoria: 'Comida', fecha: '2026-10-02' });
  g.registrar({ tipo: 'gasto', monto: 300, categoria: 'Vivienda', fecha: '2026-10-03' });
  g.registrar({ tipo: 'gasto', monto: 100, categoria: 'Comida', fecha: '2026-10-04' });
  const resumen = resumenGastosPorCategoria(g.listar());
  assert.deepStrictEqual(resumen.map((f) => f.categoria), ['Vivienda', 'Comida']);
  assert.strictEqual(resumen[0].porcentaje, 60);
});

test('el presupuesto avisa al acercarse al límite y al superarlo', () => {
  const g = new GestorMovimientos();
  const p = new GestorPresupuestos(g);
  p.definir('Comida', 100, '2026-10');

  g.registrar({ tipo: 'gasto', monto: 50, categoria: 'Comida', fecha: '2026-10-02' });
  assert.strictEqual(p.estado('Comida', '2026-10').estado, 'ok');

  g.registrar({ tipo: 'gasto', monto: 35, categoria: 'Comida', fecha: '2026-10-03' });
  assert.strictEqual(p.estado('Comida', '2026-10').estado, 'cerca');

  g.registrar({ tipo: 'gasto', monto: 30, categoria: 'Comida', fecha: '2026-10-04' });
  assert.strictEqual(p.estado('Comida', '2026-10').estado, 'superado');
});

test('el presupuesto ignora gastos de otros meses y otras categorías', () => {
  const g = new GestorMovimientos();
  const p = new GestorPresupuestos(g);
  p.definir('Comida', 100, '2026-10');
  g.registrar({ tipo: 'gasto', monto: 90, categoria: 'Comida', fecha: '2026-09-30' });
  g.registrar({ tipo: 'gasto', monto: 90, categoria: 'Ocio', fecha: '2026-10-02' });
  assert.strictEqual(p.estado('Comida', '2026-10').gastado, 0);
  assert.strictEqual(p.estado('Transporte', '2026-10'), null);
});
