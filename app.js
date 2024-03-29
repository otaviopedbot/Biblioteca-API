require('dotenv').config()

const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const customersRoutes = require('./routes/customers')
const authorsRoutes = require('./routes/authors')
const bookshelvesRoutes = require('./routes/bookshelves')
const booksRoutes = require('./routes/books')
const rentsRoutes = require('./routes/rents')
const usersRoutes = require('./routes/users')


const app = express();
const cors = require('cors');

const frontURL = process.env.FRONTURL

app.use(cors({ origin: frontURL }));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.send('routes: /customers, /authors, /bookshelves, /books, /rents, /register, /login');
});

//rotas CRUD

app.use('/customers', customersRoutes);
app.use('/authors', authorsRoutes);
app.use('/bookshelves', bookshelvesRoutes);
app.use('/books', booksRoutes);
app.use('/rents', rentsRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.APPPORT;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});