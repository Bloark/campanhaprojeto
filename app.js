
// const noticias = require('./mockup')
const app = require('./config/server')

const db = require('./config/dbConnection')

const port = process.env.PORT || 3000

// criando nossa primeira rota
app.get('/', async(req, res) => {
    // res.send("Olá, este é o meu primeiro server Express!")
    // res.render('home/index', { noticias:noticias.slice(0,3)})

    // Consulta SQL
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3')

    // Passando dados para o template
    res.render('home/index', {noticias: result.rows, title:'Home'})
});

//Criando a segunda rota 
app.get('/noticias', async(req, res) => {

    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC')
    res.render('noticias/noticias', { noticias: result.rows, title: 'Noticias' })

})

// rota responsável pelo recurso noticia 
app.get('/noticia', async(req, res) => {

    var id = req.query.id
    let result = await db.query('SELECT * FROM noticias WHERE id_noticia = $1',[id])
    res.render('noticias/noticia', { noticia: result.rows[0], title:'Noticia' })
})

// rota responsável pelo recurso admin 

app.get('/admin', (req,res) => {
    if(req.session.autorizado){
        res.render('admin/form_add_noticia', {title: 'Admin', autorizado:req.session.autorizado})
    }else{
        res.render('admin/login', {title:'Login'})
    }
})

// rota responsável por salvar as noticias 

app.post('/admin/salvar-noticia', async(req,res) => {

    let { titulo, conteudo } = req.body

    await db.query('INSERT INTO noticias(titulo, conteudo) VALUES($1, $2)', [titulo, conteudo], (err,result)=>{
        res.redirect('/noticias')
    })
})


// rota responsável pela saida do usuário 
app.get('/admin/sair', (req,res) =>{

    req.session.destroy((err) =>{
        res.redirect('/admin')
    })
})

// rota responsável pela autenticação do usuário 
app.post('/admin/autenticar', (req,res) => {
    const {usuario,senha} = req.body

    if(usuario === 'root' && senha === 'cellep1234'){
        req.session.autorizado = true
    }
    res.redirect('/admin')
})







app.listen(port, () => {
    console.log('Escutando na porta 3000 com Express')
    console.log('Pressione CTRL + C para encerrar o servidor')
})