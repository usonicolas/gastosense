'use strict';

/**
 * Servicio de movimientos: guarda los ingresos y gastos y permite consultarlos.
 *
 * Por ahora los datos viven en memoria. En una entrega posterior este servicio
 * se conectará a la base de datos (PostgreSQL) sin cambiar su interfaz pública.
 */

const { crearMovimiento } = require('../modelos/movimiento');

class GestorMovimientos {
  constructor() {
    this._movimientos = [];
    this._siguienteId = 1;
  }

  /**
   * Valida y guarda un movimiento nuevo.
   * @param {object} datos  ver crearMovimiento en modelos/movimiento.js
   * @returns {object} el movimiento guardado, con su id
   */
  registrar(datos) {
    const movimiento = crearMovimiento(datos, this._siguienteId);
    this._siguienteId += 1;
    this._movimientos.push(movimiento);
    return movimiento;
  }

  /** Devuelve una copia del historial, del más reciente al más antiguo. */
  listar() {
    return [...this._movimientos].sort(
      (a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id
    );
  }

  /** Devuelve solo los movimientos de un tipo ("ingreso" o "gasto"). */
  listarPorTipo(tipo) {
    return this.listar().filter((m) => m.tipo === tipo);
  }
}

module.exports = { GestorMovimientos };
