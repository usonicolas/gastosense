'use strict';

/**
 * Módulo de movimientos: registra ingresos y gastos y permite consultarlos.
 *
 * Por ahora los datos viven en memoria. En una entrega posterior este módulo
 * se conectará a la base de datos (PostgreSQL) sin cambiar su interfaz pública.
 */

const TIPOS_VALIDOS = ['ingreso', 'gasto'];

class GestorMovimientos {
  constructor() {
    this._movimientos = [];
    this._siguienteId = 1;
  }

  /**
   * Valida y guarda un movimiento.
   * @param {{tipo: 'ingreso'|'gasto', monto: number, categoria: string,
   *          descripcion?: string, fecha?: string}} datos  fecha en formato AAAA-MM-DD
   * @returns {object} el movimiento guardado, con su id
   */
  registrar({ tipo, monto, categoria, descripcion = '', fecha }) {
    // TODO(patrón): aquí se aplicará Factory Method para crear cada tipo de movimiento.
    if (!TIPOS_VALIDOS.includes(tipo)) {
      throw new Error(`Tipo de movimiento no válido: "${tipo}". Use "ingreso" o "gasto".`);
    }
    if (typeof monto !== 'number' || !Number.isFinite(monto) || monto <= 0) {
      throw new Error('El monto debe ser un número mayor que cero.');
    }
    if (typeof categoria !== 'string' || categoria.trim() === '') {
      throw new Error('La categoría es obligatoria.');
    }

    const fechaFinal = fecha ?? new Date().toISOString().slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaFinal)) {
      throw new Error('La fecha debe tener el formato AAAA-MM-DD.');
    }

    const movimiento = {
      id: this._siguienteId++,
      tipo,
      monto,
      categoria: categoria.trim(),
      descripcion,
      fecha: fechaFinal,
    };
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

module.exports = { GestorMovimientos, TIPOS_VALIDOS };
