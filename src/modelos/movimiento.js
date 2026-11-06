'use strict';

/**
 * Modelo de movimiento: define qué es un ingreso o un gasto y valida sus datos.
 * No guarda nada: de eso se encarga el servicio GestorMovimientos.
 */

const {
  esMontoValido,
  esFechaValida,
  esTextoNoVacio,
} = require('../utilidades/validaciones');

const TIPOS_VALIDOS = ['ingreso', 'gasto'];

/**
 * Valida los datos y construye un movimiento.
 * @param {{tipo: 'ingreso'|'gasto', monto: number, categoria: string,
 *          descripcion?: string, fecha?: string}} datos  fecha en formato AAAA-MM-DD
 * @param {number} id identificador que se le asigna al movimiento
 * @returns {object} el movimiento creado
 * @throws {Error} si algún dato no es válido
 */
function crearMovimiento({ tipo, monto, categoria, descripcion = '', fecha }, id) {
  // TODO(patrón): aquí se aplicará Factory Method para crear cada tipo de movimiento.
  if (!TIPOS_VALIDOS.includes(tipo)) {
    throw new Error(`Tipo de movimiento no válido: "${tipo}". Use "ingreso" o "gasto".`);
  }
  if (!esMontoValido(monto)) {
    throw new Error('El monto debe ser un número mayor que cero.');
  }
  if (!esTextoNoVacio(categoria)) {
    throw new Error('La categoría es obligatoria.');
  }

  const fechaFinal = fecha ?? new Date().toISOString().slice(0, 10);
  if (!esFechaValida(fechaFinal)) {
    throw new Error('La fecha debe tener el formato AAAA-MM-DD.');
  }

  return { id, tipo, monto, categoria: categoria.trim(), descripcion, fecha: fechaFinal };
}

module.exports = { crearMovimiento, TIPOS_VALIDOS };
