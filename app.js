const express = require('express');
const app = express()

app.get('/', (req,res) => {
    res.send('bunda');
})

app.listen('3030', () => {
    console.log('Rodando na porta 3030');
});