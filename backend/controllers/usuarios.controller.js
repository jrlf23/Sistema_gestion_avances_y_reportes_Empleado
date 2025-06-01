const db = require('../db/connection');

const obtenerUsuarios = (req, res) => {
  db.query('SELECT * FROM Cliente', (err, results) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
};

module.exports = { obtenerUsuarios };
