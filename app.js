require('dotenv').config()

const express = require('express');

const customersRoutes = require('./routes/customers')
const authorsRoutes = require('./routes/authors')
const bookshelvesRoutes = require('./routes/bookshelves')
const booksRoutes = require('./routes/books')
const rentsRoutes = require('./routes/rents')

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
    res.send('routes: /customers, /authors, /bookshelves, /books, /rents');
});

app.use('/customers', customersRoutes);
app.use('/authors', authorsRoutes);
app.use('/bookshelves', bookshelvesRoutes);
app.use('/books', booksRoutes);
app.use('/rents', rentsRoutes);


const PORT = process.env.APPPORT;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});