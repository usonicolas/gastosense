'use strict';

/**
 * Módulo de presupuestos: define un límite mensual por categoría y
 * indica si los gastos se acercan o superan ese límite.
 */

const { esMontoValido, esMesValido } = require('../utilidades/validaciones');

// Se avisa cuando el gasto llega a este porcentaje del límite.
const UMBRAL_ALERTA = 0.8;

class GestorPresupuestos {
  /** @param {import('./gestorMovimientos').GestorMovimientos} gestorMovimientos */
  constructor(gestorMovimientos) {
    this._movimientos = gestorMovimientos;
    this._limites = new Map(); // clave: "AAAA-MM|categoria"
  }

  /**
   * Define el límite de gasto de una categoría para un mes.
   * @param {string} categoria
   * @param {number} limite  monto máximo a gastar
   * @param {string} mes     formato AAAA-MM
   */
  definir(categoria, limite, mes) {
    if (!esMontoValido(limite)) {
      throw new Error('El límite del presupuesto debe ser un número mayor que cero.');
    }
    if (!esMesValido(mes)) {
      throw new Error('El mes debe tener el formato AAAA-MM.');
    }
    this._limites.set(`${mes}|${categoria}`, limite);
  }

  /**
   * Consulta cuánto se ha gastado frente al límite.
   * @returns {{categoria: string, mes: string, limite: number, gastado: number,
   *            porcentaje: number, estado: 'ok'|'cerca'|'superado'}|null}
   *          null si no hay presupuesto definido para esa categoría y mes
   */
  estado(categoria, mes) {
    const limite = this._limites.get(`${mes}|${categoria}`);
    if (limite === undefined) return null;

    const gastado = this._movimientos
      .listarPorTipo('gasto')
      .filter((m) => m.categoria === categoria && m.fecha.startsWith(mes))
      .reduce((suma, m) => suma + m.monto, 0);

    // TODO(patrón): aquí se aplicará Observer para notificar la alerta
    // automáticamente cuando se registre un gasto nuevo.
    let estado = 'ok';
    if (gastado > limite) estado = 'superado';
    else if (gastado >= limite * UMBRAL_ALERTA) estado = 'cerca';

    return {
      categoria,
      mes,
      limite,
      gastado,
      porcentaje: Math.round((gastado / limite) * 100),
      estado,
    };
  }
}

module.exports = { GestorPresupuestos, UMBRAL_ALERTA };
