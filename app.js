const express = require('express');
const customersRoutes = require('./routes/customerRoutes')
const path = require('path')

const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('customers/index');
});

app.use('/customers', customersRoutes);


const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});