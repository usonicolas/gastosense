'use strict';

/**
 * Validaciones reutilizables. Se centralizan aquí para no repetir las mismas
 * comprobaciones en los modelos y en los servicios.
 */

/** Un monto es válido si es un número finito mayor que cero. */
function esMontoValido(valor) {
  return typeof valor === 'number' && Number.isFinite(valor) && valor > 0;
}

/** Una fecha es válida si tiene el formato AAAA-MM-DD. */
function esFechaValida(valor) {
  return typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor);
}

/** Un mes es válido si tiene el formato AAAA-MM. */
function esMesValido(valor) {
  return typeof valor === 'string' && /^\d{4}-\d{2}$/.test(valor);
}

/** Un texto es válido si no está vacío ni son solo espacios. */
function esTextoNoVacio(valor) {
  return typeof valor === 'string' && valor.trim() !== '';
}

module.exports = { esMontoValido, esFechaValida, esMesValido, esTextoNoVacio };
