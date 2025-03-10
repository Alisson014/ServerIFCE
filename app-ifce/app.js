const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { stringify } = require('querystring');
const prisma = new PrismaClient
// const ejs = require('ejs');


const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');


// Rota raiz
app.get('/', (req, res) => {
    res.redirect('/ifce');
});

// Rotas informativa
app.get('/ifce', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
})



// Rota professores
app.get('/ifce/professores', async (req, res) => {
    try{
        const professores = await prisma.professor.findMany();
        
        // console.log(professores);

        var html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>IFCE | Professores</title>
                <link rel="stylesheet" href="../stylesheets/style.css">
                <link rel="stylesheet" href="../stylesheets/responsivity.css">
                <link rel="stylesheet" href="../stylesheets/professores.css">
                <link rel="stylesheet" href="../stylesheets/formularioAdd.css">
            </head>
            <body>
                <nav class="navbar">
                    <div class="logo">
                        <button onclick="showMenu()"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#eee" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="38" fill="#eee" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </button>

                        <img src="../images/logo-ifce.png">
                    </div>
                    <div class="acoes">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                        </button>
                    </div>

                    
                </nav>
                <div class="menu">
                <form action="/ifce">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                            </svg>
            
                        <span>Home</span>
                        
                    </button>
                </form>
                
                <form action="/ifce/professores">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                            </svg>
                        
                        <span>Professores</span>
                    </button>
                </form>

                <form action="/ifce/estudantes">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                            <path d="M 32 2 C 15.432 2 2 15.432 2 32 s 13.432 30 30 30 s 30 -13.432 30 -30 S 48.568 2 32 2 Z M 42.994 46.508 H 21.006 V 17.492 h 21.279 v 5.139 H 26.932 v 6.16 h 14.094 v 5.039 H 26.932 v 7.461 h 16.063 V 46.508 Z"/>
                            </svg>
            
                        <span>Estudantes</span>
                    </button>
                </form>

                <form>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                            <path d="m 32 2 c -16.568 0 -30 13.431 -30 30 c 0 16.569 13.432 30 30 30 s 30 -13.432 30 -30 c 0 -16.569 -13.432 -30 -30 -30 m 11.754 20.629 h -8.682 v 23.878 h -6.104 v -23.878 h -8.721 v -5.138 h 23.506 v 5.138 Z"/>
                            </svg>
            
                        <span>Turmas</span>
                    </button>
                </form>
                </div>

                
                
                <div class="contentHero heroInitial-professores">
                    <div class="BgInitial">
                        <div class="boxAnimated">
                            <span class="quadrado"></span><span class="quadrado"></span><span class="quadrado"></span><span class="quadrado"></span> <!-- Quadrados -->

                            <strong class="triangulo"></strong><strong class="triangulo"></strong><strong class="triangulo"></strong>  <!-- Triangulos -->
                            <p class="triangulop"></p><p class="triangulop"></p><p class="triangulop"></p>                                <!-- Preenchimento -->

                            <b class="circulo"></b><b class="circulo"></b><b class="circulo"></b>                                <!-- Círculos -->
                        </div>
                    </div>
                    <section class="heroInitial">
                        <div class="textHero">
                            <h1>Gerenciamento de professores</h1>

                            <p>Obtenha os dados dos professores e os gerencie conforme a necessidade.</p>
                        </div>

                        <div class="ImgHero">
                            <img src="../images/IF-bg1.jpeg" alt="imagem-backgroung-if">
                            <img src="../images/IF-bg2.jpeg" alt="imagem-backgroung-if">
                            <img src="../images/professores01.jpg" alt="imagem-backgroung-if">
                            <img src="../images/IF-bg3.jpeg" alt="imagem-backgroung-if">
                            <img src="../images/professores02.jpg" alt="imagem-backgroung-if">
                            <img src="../images/IF-bg4.jpeg" alt="imagem-backgroung-if">
                            <img src="../images/professores03.jpg" alt="imagem-backgroung-if">
                            <img src="../images/IF-bg5.jpeg" alt="imagem-backgroung-if">
                            <img src="../images/professores04.jpg" alt="imagem-backgroung-if">
                            <img src="../images/IF-bg6.jpeg" alt="imagem-backgroung-if">
                        </div>
                    </section>
                </div>

                

                <div class="boxButton">
                    <div class="formAdd">
                        <form action="/ifce/professor/adicionar" method="post">
                            <label for="matricula">Matricula: </label>
                            <input type="text" id="matricula" name="matricula" required />
                            
                            <label for="nome">Nome: </label>
                            <input type="text" id="nome" name="nome" required />

                            <label for="email">E-mail: </label>
                            <input type="email" id="email" name="email" required />

                            <label for="departamento">Departamento: </label>
                            <input type="text" id="departamento" name="departamento" required />
                            <br/>

                            <button>Adicionar</button>
                            <button type="button" onclick="PopUpAdd()">Cancelar</button>
                        </form>
                    </div>

                    <button class="botaoP" onclick="PopUpAdd()">Adicionar Novo</button>
                </div>
                

                <div class="box-professores">
        `;
        let i = 0;
        professores.forEach(professor => {
            
            html += `
                    <section class="professor">
                    <div class="dados">
                        <p> ${professor.nome} </p>
                        <p class="separator">|</p>
                        <p> ${professor.departamento} </p>
                    </div>

                    <div class="acoes-dados">
                        <form action="/ifce/professor/dados/:${professor.id}" method="get">
                            <button>Ver dados</button>
                        </form>
                        <button onclick="updateProfessor(${professor.id})">Atualizar</button>
                        <button onclick="deleteProfesso(${professor.id})">Remover</button>
                    </div>
                    <div class="dados-r">
                        <button class="acoes-button" onclick="Opcoes( ${i} )">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                            </svg>
                        </button>

                        <div class="acoes-dados-r">
                            <form action="/ifce/professor/dados/:${professor.id}">
                                <button>Ver dados</button>
                            </form>
                            <button onclick="updateProfessor(${professor.id})">Atualizar</button>
                            <button onclick="deleteProfesso(${professor.id})">Remover</button>
                        </div>
                    </div>
                </section>
            `;
            i ++;
        });

        html += `
                    </div>

                    <footer>
                        <section>
                            <div class="links" style="width: 250px; text-align: center;">
                                <a href="/ifce"><img src="../images/logo-ifceH.png" alt="Logo-if" /></a>
                                <p>Por mais educação, ciência e tecnologia para o avanço de nosso país.</p>
                            </div>
                                <div class="links">
                                    <h2>Outros serviços</h2>
                                    <a href="#">Inscrições SISU</a>
                                    <a href="#">Processos seletivos</a>
                                    <a href="#">Editais de mestrado</a>
                                    <a href="#">Concursos públicos</a>
                                    <a href="#">Eventos abertos</a>
                                </div>

                                <div class="links">
                                    <h2>Acesse também</h2>
                                    <a href="#">Contate-nos</a>
                                    <a href="#">Site oficial</a>
                                    <a href="#">Mais sobre</a>
                                    <a href="#">Privacidade</a>
                                    <a href="#">Parcerias</a>
                                </div>

                                <div class="links">
                                    <h2>Links</h2>
                                    <a href="#">Home</a>
                                    <a href="#">Professores</a>
                                    <a href="#">Estudantes</a>
                                    <a href="#">Turmas</a>
                                </div>
                        </section>
                        <hr/>
                        <div class="endline">
                            <p>&copy; All right reserved by IFCE. 2025</p>
                            
                            <div class="socialmedia">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                </svg>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                            </div>
                        </div>
                    </footer>

                    <script src="../javascripts/script.js">     </script>
                    <script src="../javascripts/formProf.js">     </script>
                </body>
                </html>
        `;

        res.send(html);
        
    } catch(e){
        console.error(e);
        res.send('Error ao buscar professores');
    }
});

// Adicionar Professor
app.post('/ifce/professor/adicionar', async (req, res) => {
    const {matricula, nome, email, departamento} = req.body;

    try {
        await prisma.professor.create({
            data: {
                matricula,
                nome,
                email,
                departamento
            }
        });
        
        res.redirect('/ifce/professores');
        
    } catch (e){
        console.error(e);
        res.status(500).send('Erro ao adicionar professor');
    }
});

// Remover Professor
app.delete('/ifce/professor/remover/:id', async (req, res) => {
    const { id } = req.params;

    try{
        await prisma.professor.delete({
            where: { id: parseInt(id)}
        });
        res.json({message: 'Remoção de professor bem sucedida'});

    } catch(e){
        console.error(e);
        res.status(500).json({e: 'Falha na remoção de professor'});
    }
});

// Atualizar professor
app.put('/ifce/professor/atualizar/:id', async (req, res) => {
    const { id } = req.params;
    const {matricula, nome, email, departamento} = req.body;
    try{
        await prisma.professor.update({
            where: { id: parseInt(id) },
            data: {
                matricula,
                nome,
                email,
                departamento
            }
        });

        res.json({message: 'Atualização de professor realizada com sucesso'});
    } catch (e){
        console.error(e);
        res.status(500).json({e: 'Falha na atualização de professor'});
    }
});

// Dados Professor
app.get('/ifce/professor/dados/:id', async (req, res) => {
    const { id } = req.params;
    var altvar = id;
    altvar = altvar.replace(':', '');
    altvar = parseInt(altvar);
    try{
        const professor = await prisma.professor.findUnique({
            where: {
                id: altvar,
            },
        });
        
        var html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>IFCE | Professor</title>

                    <link rel="stylesheet" href="/stylesheets/style.css">
                    <link rel="stylesheet" href="/stylesheets/responsivity.css">
                    <link rel="stylesheet" href="/stylesheets/boletim.css">
                </head>
                <body>
                    <nav class="navbar">
                        <div class="logo">
                            <button onclick="showMenu()"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#eee" class="bi bi-list" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                </svg>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="38" fill="#eee" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </button>

                            <img src="/images/logo-ifce.png">
                        </div>
                        <div class="acoes">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>

                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </button>
                        </div>

                        
                    </nav>
                    <div class="menu">
                        <form action="/ifce">
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-house-fill" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                                    </svg>
                    
                                <span>Home</span>
                                
                            </button>
                        </form>
                        
                        <form action="/ifce/professores">
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                                    </svg>
                                
                                <span>Professores</span>
                            </button>
                        </form>

                        <form action="/ifce/estudantes">
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                                    <path d="M 32 2 C 15.432 2 2 15.432 2 32 s 13.432 30 30 30 s 30 -13.432 30 -30 S 48.568 2 32 2 Z M 42.994 46.508 H 21.006 V 17.492 h 21.279 v 5.139 H 26.932 v 6.16 h 14.094 v 5.039 H 26.932 v 7.461 h 16.063 V 46.508 Z"/>
                                    </svg>
                    
                                <span>Estudantes</span>
                            </button>
                        </form>

                        <form>
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                                    <path d="m 32 2 c -16.568 0 -30 13.431 -30 30 c 0 16.569 13.432 30 30 30 s 30 -13.432 30 -30 c 0 -16.569 -13.432 -30 -30 -30 m 11.754 20.629 h -8.682 v 23.878 h -6.104 v -23.878 h -8.721 v -5.138 h 23.506 v 5.138 Z"/>
                                    </svg>
                    
                                <span>Turmas</span>
                            </button>
                        </form>
                    </div>


                    <div class="conteinerAniBol">
                        <div class="animatedBg">
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                            <p></p>
                        </div>

                        <div class="conteinerBol">        
                            <div class="conteinerBoletim">
                                

                                <div class="boxBoletim">
                                    <section>
                                        <h1>Dados do Professor</h1>
                                        <div>
                                            <p id="nome"><strong>Nome: </strong> ${professor.nome} </p>
                                            <p><strong>Departamento: </strong> ${professor.departamento} </p>
                                            
                                        </div>
                                        <div>
                                            <p><strong>Matrícula: </strong> ${professor.matricula} </p>
                                            <p><strong>E-mail: </strong> ${professor.email} </p>
                                        </div>

                                        
                                        
                                    </section>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" integrity="sha512-qZvrmS2ekKPF2mSznTQsxqPgnpkI4DNTlrdUmTzrDgektczlKNRRhy5X5AAOnx5S09ydFYWWNSfcEqDTTHgtNA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.4/jspdf.plugin.autotable.min.js" integrity="sha512-PRJxIx+FR3gPzyBBl9cPt62DD7owFXVcfYv0CRNFAcLZeEYfht/PpPNTKHicPs+hQlULFhH2tTWdoxnd1UGu1g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

                        <script src="/javascripts/boletim.js">    </script>
                    </body>
                    </html>
                `;
        
        
        // console.log('executou 2');
        res.send(html);
    } catch(e){
        console.error(e);
        console.log(id, altvar);
        res.status(500).send("Erro ao carregar dados do professor")
    }

})




// Rotas Estudantes
app.get('/ifce/estudantes', async (req, res) => {
    try{
        const estudantes = await prisma.aluno.findMany();
        
        // console.log(estudantes);

        var html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>IFCE | Estudantes</title>
                <link rel="stylesheet" href="/stylesheets/style.css">
                <link rel="stylesheet" href="/stylesheets/responsivity.css">
                <link rel="stylesheet" href="/stylesheets/professores.css">
                <link rel="stylesheet" href="/stylesheets/formularioAdd.css">
            </head>
            <body>
                <nav class="navbar">
                    <div class="logo">
                        <button onclick="showMenu()"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#eee" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="38" fill="#eee" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </button>

                        <img src="/images/logo-ifce.png">
                    </div>
                    <div class="acoes">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                        </button>
                    </div>

                    
                </nav>
                <div class="menu">
                <form action="/ifce">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                            </svg>
            
                        <span>Home</span>
                        
                    </button>
                </form>
                
                <form action="/ifce/professores">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                            </svg>
                        
                        <span>Professores</span>
                    </button>
                </form>

                <form action="/ifce/estudantes">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                            <path d="M 32 2 C 15.432 2 2 15.432 2 32 s 13.432 30 30 30 s 30 -13.432 30 -30 S 48.568 2 32 2 Z M 42.994 46.508 H 21.006 V 17.492 h 21.279 v 5.139 H 26.932 v 6.16 h 14.094 v 5.039 H 26.932 v 7.461 h 16.063 V 46.508 Z"/>
                            </svg>
            
                        <span>Estudantes</span>
                    </button>
                </form>

                <form>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                            <path d="m 32 2 c -16.568 0 -30 13.431 -30 30 c 0 16.569 13.432 30 30 30 s 30 -13.432 30 -30 c 0 -16.569 -13.432 -30 -30 -30 m 11.754 20.629 h -8.682 v 23.878 h -6.104 v -23.878 h -8.721 v -5.138 h 23.506 v 5.138 Z"/>
                            </svg>
            
                        <span>Turmas</span>
                    </button>
                </form>
                </div>

                
                
                <div class="contentHero heroInitial-professores">
                    <div class="BgInitial">
                        <div class="boxAnimated">
                            <span class="quadrado"></span><span class="quadrado"></span><span class="quadrado"></span><span class="quadrado"></span> <!-- Quadrados -->

                            <strong class="triangulo"></strong><strong class="triangulo"></strong><strong class="triangulo"></strong>  <!-- Triangulos -->
                            <p class="triangulop"></p><p class="triangulop"></p><p class="triangulop"></p>                                <!-- Preenchimento -->

                            <b class="circulo"></b><b class="circulo"></b><b class="circulo"></b>                                <!-- Círculos -->
                        </div>
                    </div>
                    <section class="heroInitial">
                        <div class="textHero">
                            <h1>Gerenciamento de Estudantes</h1>

                            <p>Obtenha os dados dos alunos e os gerencie conforme a necessidade.</p>
                        </div>

                        <div class="ImgHero">
                            <img src="/images/IF-bg1.jpeg" alt="imagem-backgroung-if">
                            <img src="/images/IF-bg2.jpeg" alt="imagem-backgroung-if">
                            <img src="/images/professores01.jpg" alt="imagem-backgroung-if">
                            <img src="/images/IF-bg3.jpeg" alt="imagem-backgroung-if">
                            <img src="/images/professores02.jpg" alt="imagem-backgroung-if">
                            <img src="/images/IF-bg4.jpeg" alt="imagem-backgroung-if">
                            <img src="/images/professores03.jpg" alt="imagem-backgroung-if">
                            <img src="/images/IF-bg5.jpeg" alt="imagem-backgroung-if">
                            <img src="/images/professores04.jpg" alt="imagem-backgroung-if">
                            <img src="/images/IF-bg6.jpeg" alt="imagem-backgroung-if">
                        </div>
                    </section>
                </div>

                

                <div class="boxButton">
                    <div class="formAdd">
                        <form action="/ifce/estudante/adicionar" method="post">
                            <label for="matricula">Matricula: </label>
                            <input type="text" id="matricula" name="matricula" required />
                            
                            <label for="nome">Nome: </label>
                            <input type="text" id="nome" name="nome" required />

                            <label for="idade">Idade: </label>
                            <input type="number" id="idade" name="idade" min="14" required />

                            <label for="email">E-mail: </label>
                            <input type="email" id="email" name="email" required />

                            <label for="turma">Turma: </label>
                            <input type="text" id="turma" name="turma" required />
                            <br/>

                            <button>Adicionar</button>
                            <button type="button" onclick="PopUpAdd()">Cancelar</button>
                        </form>
                    </div>

                    <button class="botaoP" onclick="PopUpAdd()">Adicionar Novo</button>
                </div>
                

                <div class="box-professores">
        `;
        let i = 0;
        estudantes.forEach(estudante => {
            
            html += `
                    <section class="professor">
                    <div class="dados">
                        <p> ${estudante.nome} </p>
                        <p class="separator">|</p>
                        <p> ${estudante.turma} </p>
                    </div>

                    <div class="acoes-dados">
                        <form action="/ifce/estudante/boletim/:${estudante.id}" method="get">
                            <button>Boletim</button>
                        </form>
                        <button onclick="updateEstudante(${estudante.id})">Atualizar</button>
                        <button onclick="deleteEstudante(${estudante.id})">Remover</button>
                    </div>
                    <div class="dados-r">
                        <button class="acoes-button" onclick="Opcoes( ${i} )">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                            </svg>
                        </button>

                        <div class="acoes-dados-r">
                            <form action="/ifce/estudante/boletim/:${estudante.id}" method="get">
                                <button>Boletim</button>
                            </form>
                            <button onclick="updateEstudante(${estudante.id})">Atualizar</button>
                            <button onclick="deleteEstudante(${estudante.id})">Remover</button>
                        </div>
                    </div>
                </section>
            `;
            i ++;
        });

        html += `
                    </div>

                    <footer>
                        <section>
                            <div class="links" style="width: 250px; text-align: center;">
                                <a href="/ifce"><img src="/images/logo-ifceH.png" alt="Logo-if" /></a>
                                <p>Por mais educação, ciência e tecnologia para o avanço de nosso país.</p>
                            </div>
                                <div class="links">
                                    <h2>Outros serviços</h2>
                                    <a href="#">Inscrições SISU</a>
                                    <a href="#">Processos seletivos</a>
                                    <a href="#">Editais de mestrado</a>
                                    <a href="#">Concursos públicos</a>
                                    <a href="#">Eventos abertos</a>
                                </div>

                                <div class="links">
                                    <h2>Acesse também</h2>
                                    <a href="#">Contate-nos</a>
                                    <a href="#">Site oficial</a>
                                    <a href="#">Mais sobre</a>
                                    <a href="#">Privacidade</a>
                                    <a href="#">Parcerias</a>
                                </div>

                                <div class="links">
                                    <h2>Links</h2>
                                    <a href="#">Home</a>
                                    <a href="#">Professores</a>
                                    <a href="#">Estudantes</a>
                                    <a href="#">Turmas</a>
                                </div>
                        </section>
                        <hr/>
                        <div class="endline">
                            <p>&copy; All right reserved by IFCE. 2025</p>
                            
                            <div class="socialmedia">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                </svg>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#999" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                            </div>
                        </div>
                    </footer>

                    <script src="/javascripts/script.js">     </script>
                    <script src="/javascripts/formEst.js">     </script>
                </body>
                </html>
        `;

        res.send(html);
        
    } catch(e){
        console.error(e);
        res.send('Error ao buscar professores');
    }
});

// Adicionar Estudante
app.post('/ifce/estudante/adicionar', async (req, res) => {
    const {matricula, nome, idade, email, turma} = req.body;

    try {
        await prisma.aluno.create({
            data: {
                matricula,
                nome,
                idade: parseInt(idade),
                email,
                turma,
                b: {
                    create:{
                        arte_n4: 0.0,
                        arte_n3: 0.0,
                        arte_n2: 0.0,
                        arte_n1: 0.0,
                        biologia_n4: 0.0,
                        biologia_n3: 0.0,
                        biologia_n2: 0.0,
                        biologia_n1: 0.0,
                        ed_fisica_n4: 0.0,
                        ed_fisica_n3: 0.0,
                        ed_fisica_n2: 0.0,
                        ed_fisica_n1: 0.0,
                        filosofia_n4: 0.0,
                        filosofia_n3: 0.0,
                        filosofia_n2: 0.0,
                        filosofia_n1: 0.0,
                        fisica_n4: 0.0,
                        fisica_n3: 0.0,
                        fisica_n2: 0.0,
                        fisica_n1: 0.0,
                        geografia_n4: 0.0,
                        geografia_n3: 0.0,
                        geografia_n2: 0.0,
                        geografia_n1: 0.0,
                        historia_n4: 0.0,
                        historia_n3: 0.0,
                        historia_n2: 0.0,
                        historia_n1: 0.0,
                        ingles_n4: 0.0,
                        ingles_n3: 0.0,
                        ingles_n2: 0.0,
                        ingles_n1: 0.0,
                        matematica_n4: 0.0,
                        matematica_n3: 0.0,
                        matematica_n2: 0.0,
                        matematica_n1: 0.0,
                        portugues_n4: 0.0,
                        portugues_n3: 0.0,
                        portugues_n2: 0.0,
                        portugues_n1: 0.0,
                        sociologia_n2: 0.0,
                        sociologia_n1: 0.0,
                        sociologia_n3: 0.0,
                        sociologia_n4: 0.0,
                        quimica_n4: 0.0,
                        quimica_n3: 0.0,
                        quimica_n2: 0.0,
                        quimica_n1: 0.0,        
                    }
                }
            }
        });
        
        // res.redirect('/ifce/getLastEstudent');
        res.redirect('/ifce/estudantes');
    } catch (e){
        console.error(e);
        res.status(500).send('Erro ao adicionar estudante');
    }
});

// Remover Estudante
app.delete('/ifce/estudante/remover/:id', async (req, res) => {
    const { id } = req.params;

    try{
        await prisma.aluno.delete({
            where: { id: parseInt(id)}
        });
        res.json({message: 'Remoção de aluno bem sucedida'});

    } catch(e){
        console.error(e);
        res.status(500).json({e: 'Falha na remoção de aluno'});
    }
});

// Atualizar Estudante
app.put('/ifce/estudante/atualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { matricula, nome, idade, email, turma } = req.body;
    try{
        await prisma.aluno.update({
            where: {
                id: parseInt(id),
            },
            data: {
                matricula,
                nome,
                idade: parseInt(idade),
                email,
                turma
            }
        });
        res.json({message: "Aluno atualizado com sucesso"});
    } catch (e){
        console.error(e);
        res.status(500).json({error: "Falha ao atualizar aluno"});
    }
})


// Rota teste
app.get('/teste', (req, res) => {
    const t = [
        {
            id: 1,
            nome: "1",
        },
        {
            id: 2,
            nome: "2",
        },
    ];

    res.send(`rekgop ${t[t.length -1].id} `);
})

// Rotas Boletim
app.get('/ifce/estudante/boletim/:id', async (req, res) => {
    const { id } = req.params;
    var altvar = id;
    altvar = altvar.replace(':', '');
    altvar = parseInt(altvar);

    try{
        const estudante = await prisma.aluno.findUnique({
            where: {id: altvar}
        });
        html = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Boletim</title>

                            <link rel="stylesheet" href="/stylesheets/style.css">
                            <link rel="stylesheet" href="/stylesheets/responsivity.css">
                            <link rel="stylesheet" href="/stylesheets/boletim.css">
                        </head>
                        <body>
                            <nav class="navbar">
                                <div class="logo">
                                    <button onclick="showMenu()"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#eee" class="bi bi-list" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                        </svg>
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="38" fill="#eee" class="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                        </svg>
                                    </button>

                                    <img src="/images/logo-ifce.png">
                                </div>
                                <div class="acoes">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                    </button>

                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#eee" class="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                        </svg>
                                    </button>
                                </div>

                                
                            </nav>
                            <div class="menu">
                                <form action="/ifce">
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-house-fill" viewBox="0 0 16 16">
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                                            </svg>
                            
                                        <span>Home</span>
                                        
                                    </button>
                                </form>
                                
                                <form action="/ifce/professores">
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                                            </svg>
                                        
                                        <span>Professores</span>
                                    </button>
                                </form>

                                <form action="/ifce/estudantes">
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                                            <path d="M 32 2 C 15.432 2 2 15.432 2 32 s 13.432 30 30 30 s 30 -13.432 30 -30 S 48.568 2 32 2 Z M 42.994 46.508 H 21.006 V 17.492 h 21.279 v 5.139 H 26.932 v 6.16 h 14.094 v 5.039 H 26.932 v 7.461 h 16.063 V 46.508 Z"/>
                                            </svg>
                            
                                        <span>Estudantes</span>
                                    </button>
                                </form>

                                <form>
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#444" class="bi bi-p-circle-fill" viewBox="0 0 62 62" translate="yes" transform="translate(-1, 0)">
                                            <path d="m 32 2 c -16.568 0 -30 13.431 -30 30 c 0 16.569 13.432 30 30 30 s 30 -13.432 30 -30 c 0 -16.569 -13.432 -30 -30 -30 m 11.754 20.629 h -8.682 v 23.878 h -6.104 v -23.878 h -8.721 v -5.138 h 23.506 v 5.138 Z"/>
                                            </svg>
                            
                                        <span>Turmas</span>
                                    </button>
                                </form>
                            </div>


                            <div class="conteinerAniBol">
                                <div class="animatedBg">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                    <p></p>
                                </div>

                                <div class="conteinerBol">        
                                    <div class="conteinerBoletim">
                                        

                                        <div class="boxBoletim">
                                            <section>
                                                <h1>Boletim</h1>
                                                <div>
                                                    <p id="nome"><strong>Nome: </strong> ${estudante.nome} </p>
                                                    <p><strong>Turma: </strong> ${estudante.turma} </p>
                                                    
                                                </div>
                                                <div>
                                                    <p><strong>Matrícula: </strong> ${estudante.matricula} </p>
                                                    <p><strong>E-mail: </strong> ${estudante.email} </p>
                                                </div>
                                                <div>
                                                    <p id="cfr" ></p>
                                                    <p id="maiornota" ></p>
                                                    <p id="menornota" ></p>
                                                </div>

                                                <button class="buttondownload" onclick="GeraBoletim()">Download das notas</button>
                                                
                                            </section>
                                            <table id="Boletim">
                                            <thead>
                                                <tr>
                                                    <th>Matéria</th>
                                                    <th>N1</th>
                                                    <th>N2</th>
                                                    <th>N3</th>
                                                    <th>N4</th>
                                                    <th>Situação</th>
                                                </tr>
                                            </thead>
                                            <tbody>

        `;

        
    } catch (e){
        console.error(e);
        res.status(500).send("Erro ao buscar boletim");
    }

    try{
        const boletim = await prisma.boletim.findUnique({
            where: {aluno_id: altvar}
        });
        html += `
                                        <tr>
                                            <td>Arte
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s1"> ${boletim.arte_n1} </td>
                                            <td class="s1"> ${boletim.arte_n2} </td>
                                            <td class="s1"> ${boletim.arte_n3} </td>
                                            <td class="s1"> ${boletim.arte_n4} </td>
                                            <td class="situacao1" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Biologia
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s2"> ${boletim.biologia_n1} </td>
                                            <td class="s2"> ${boletim.biologia_n2} </td>
                                            <td class="s2"> ${boletim.biologia_n3} </td>
                                            <td class="s2"> ${boletim.biologia_n4} </td>
                                            <td class="situacao2" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Ed. Fìsica
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s3"> ${boletim.ed_fisica_n1} </td>
                                            <td class="s3"> ${boletim.ed_fisica_n2} </td>
                                            <td class="s3"> ${boletim.ed_fisica_n3} </td>
                                            <td class="s3"> ${boletim.ed_fisica_n4} </td>
                                            <td class="situacao3" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Filosofia
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s4"> ${boletim.filosofia_n1} </td>
                                            <td class="s4"> ${boletim.filosofia_n2} </td>
                                            <td class="s4"> ${boletim.filosofia_n3} </td>
                                            <td class="s4"> ${boletim.filosofia_n4} </td>
                                            <td class="situacao4" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Física
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s5"> ${boletim.fisica_n1} </td>
                                            <td class="s5"> ${boletim.fisica_n2} </td>
                                            <td class="s5"> ${boletim.fisica_n3} </td>
                                            <td class="s5"> ${boletim.fisica_n4} </td>
                                            <td class="situacao5" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Geografia
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s6"> ${boletim.geografia_n1} </td>
                                            <td class="s6"> ${boletim.geografia_n2} </td>
                                            <td class="s6"> ${boletim.geografia_n3} </td>
                                            <td class="s6"> ${boletim.geografia_n4} </td>
                                            <td class="situacao6" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>História
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s7"> ${boletim.historia_n1} </td>
                                            <td class="s7"> ${boletim.historia_n2} </td>
                                            <td class="s7"> ${boletim.historia_n3} </td>
                                            <td class="s7"> ${boletim.historia_n4} </td>
                                            <td class="situacao7" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Inglês
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s8"> ${boletim.ingles_n1} </td>
                                            <td class="s8"> ${boletim.ingles_n2} </td>
                                            <td class="s8"> ${boletim.ingles_n3} </td>
                                            <td class="s8"> ${boletim.ingles_n4} </td>
                                            <td class="situacao8" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Matemática
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s9"> ${boletim.matematica_n1} </td>
                                            <td class="s9"> ${boletim.matematica_n2} </td>
                                            <td class="s9"> ${boletim.matematica_n3} </td>
                                            <td class="s9"> ${boletim.matematica_n4} </td>
                                            <td class="situacao9" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Português
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s10"> ${boletim.portugues_n1} </td>
                                            <td class="s10"> ${boletim.portugues_n2} </td>
                                            <td class="s10"> ${boletim.portugues_n3} </td>
                                            <td class="s10"> ${boletim.portugues_n4} </td>
                                            <td class="situacao10" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Sociologia
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s11"> ${boletim.sociologia_n1} </td>
                                            <td class="s11"> ${boletim.sociologia_n2} </td>
                                            <td class="s11"> ${boletim.sociologia_n3} </td>
                                            <td class="s11"> ${boletim.sociologia_n4} </td>
                                            <td class="situacao11" >Regular</td>
                                        </tr>
                                        <tr>
                                            <td>Química
                                                <span>
                                                    <button title="Adicionar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#063306" class="bi bi-shift-fill" viewBox="0 0 16 16">
                                                            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z"/>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </td>
                                            <td class="s12"> ${boletim.quimica_n1} </td>
                                            <td class="s12"> ${boletim.quimica_n2} </td>
                                            <td class="s12"> ${boletim.quimica_n3} </td>
                                            <td class="s12"> ${boletim.quimica_n4} </td>
                                            <td class="situacao12" >Regular</td>
                                        </tr>
                                    </tbody>
                                    
                                </table>

                                
                            </div>
                        </div>
                    </div>
                </div>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" integrity="sha512-qZvrmS2ekKPF2mSznTQsxqPgnpkI4DNTlrdUmTzrDgektczlKNRRhy5X5AAOnx5S09ydFYWWNSfcEqDTTHgtNA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.4/jspdf.plugin.autotable.min.js" integrity="sha512-PRJxIx+FR3gPzyBBl9cPt62DD7owFXVcfYv0CRNFAcLZeEYfht/PpPNTKHicPs+hQlULFhH2tTWdoxnd1UGu1g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

                <script src="/javascripts/boletim.js">    </script>
            </body>
            </html>
        `;
        res.send(html);
    } catch (e){
        console.error(e);
        res.status(500).send("Erro ao buscar boletim");
    }
});

// Alterar nota
app.post('/ifce/boletim/alterarnota/:id', async (req, res) => {
    const { id } = req.params;
})

app.listen(port, () => {
    console.log(`Servidor Rodando na porta: http://localhost:${port}`);
  });