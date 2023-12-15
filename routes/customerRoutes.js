const express = require('express');
const router = express.Router();

router.get('/customers', (req, res) => {
    con.query('select * from  books', (err, result) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            res.status(500).send('Erro interno do servidor');
        } else {
            res.send(result);
        }
    });
});

module.exports = router;