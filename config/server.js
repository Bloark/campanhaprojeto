// Importando o express
const express = require('express');
// crindo um objetoexpress na variável app
const app = express();

//Importação do express-sessions
const session = require('express-session')

//Habilita o método post
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configurando EJS
app.set('view engine', 'ejs')

// Definindo o caminho das views ejs 
app.set('views', './app/views')

app.use(express.static('./app/public'))

app.use(session({
    secret:'N(Q$B=jRsjE()8RS',
    resave:false,
    saveUninitialized:false
}))

module.exports = app;