const express = require('express');

const customersRoutes = require('./routes/customersRoutes')
const authorsRoutes = require('./routes/authorsRoutes')
const bookshelvesRoutes = require('./routes/bookshelvesRoutes')
const booksRoutes = require('./routes/booksRoutes')
const rentsRoutes = require('./routes/rentsRoutes')

const path = require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// rotas:

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/customers', customersRoutes);
app.use('/authors', authorsRoutes);
app.use('/bookshelves', bookshelvesRoutes);
app.use('/books', booksRoutes);
app.use('/rents', rentsRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});