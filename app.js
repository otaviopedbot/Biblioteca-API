const express = require('express');
const customersRoutes = require('./routes/customerRoutes')


con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

const app = express();

app.get('/', (req, res) => {
    res.send('home');
});

app.use('/customers', customersRoutes);


const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});