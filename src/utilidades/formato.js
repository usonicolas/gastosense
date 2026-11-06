'use strict';

/** Da formato de pesos colombianos a un número (ej. 1000000 -> "$ 1.000.000"). */
function formatoPesos(valor) {
  return valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });
}

module.exports = { formatoPesos };
