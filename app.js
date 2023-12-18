const express = require('express');
const customerRoutes = require('./routes/customerRoutes')
const path = require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs')
app.set('views',path.join(__dirname, '/views'))


app.get('/', (req, res) => {
    res.send('home');
});

app.use('/customers', customerRoutes);


const PORT = 3031;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});