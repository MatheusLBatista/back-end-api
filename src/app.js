// importando express
import express from "express";

//instanciando express
const app = express();

app.use(express.json());

const unidades = [
    {id: 0, name: "Todos"},
    {id: 1, name: "Admin"},
    {id: 2, name: "Gerente"},
    {id: 3, name: "Usuários"}
];

const grupos = [
    {id: 0, name: "Todos"},
    {id: 1, name: "Vilhena"},
    {id: 2, name: "New York"},
    {id: 3, name: "London"}
];

const usuarios = [
    {id: 0, name: "João Silva"},
    {id: 1, name: "Gabriel Silva"},
    {id: 2, name: "Nora Smith"},
    {id: 3, name: "John Smith"}
];

function crud (table, route, findParam) {
    let path = `/${route}/`

    //list all of em
    app.get(path, (req, res) => {
        let name = req.query.name;

        if(name){
            let result = table.filter(item => item.name === name);
            res.status(200).json(result)
        }

        res.status(200).json(table);
    })

    //list a specific item
    app.get(`${path}:id`, (req, res) => {
        let index = findParam(req.params.id);

        if(index === -1) return res.status(404).send('Not found');

        res.status(200).json(table[index]);
    })

    //create an item
    app.post(path, (req, res) => {
        table.push(req.body);
        res.status(201).send('Item successfully created!');
    })

    //edit an item
    app.put(`${path}:id`, (req, res) => {
        let index = findParam(req.params.id);
        table[index].name = req.body.name;
        res.status(200).json(table[index])
    })

    //deleting an item
    app.delete(`${path}:id`, (req, res) => {
        // let { id } = req.params;
        let index = findParam(req.params.id);
        table.splice(index, 1);

        res.status(200).send(`Item de index ${index} da tabela ${table} foi deletado com sucesso!`)
    })
    
}

function findGroup(id){
    return grupos.findIndex(grupo => grupo.id == id);
}

function findUnit(id){
    return unidades.findIndex(unidade => unidade.id == id);
}

function findUser(id){
    return usuarios.findIndex(user => user.id == id);
}

crud(usuarios, 'usuarios', findUser);
crud(grupos, 'grupos', findGroup);
crud(unidades, 'unidades', findUnit);

// // Rota vazia - raiz
// app.get('/', (req, res) => {
//     res.status(200).send('Bem-vindo ao auth');
// })

// // Rotas para cada array
// app.get('/grupos', (req, res) => {
//     res.status(200).json(grupos);
// })

// app.get('/grupos/:id', (req, res) => {
//     let index = findGroup(req.params.id);
//     res.status(200).json(grupos[index]);
// })

// app.post('/grupos', (req, res) => {
//     console.log("cheguei aqui")
//     grupos.push(req.body);
//     res.status(201).send("Grupo cadastrado")
// })

// app.put('/grupos/:id', (req, res) => {
//     let index = findGroup(req.params.id);

//     //passa o parametro da requisicao
//     grupos[index].name = req.body.name;  //usa um parametro para recuperar
 
//     //para recuperar um dado no corpo da requisisao
//     res.json(grupos[index]); //devolve todo array
// })

// app.delete('/grupos/:id', (req, res) => {
//     let { id } = req.params; //same as let id = req.params.id - i can restore values other than just id
//     let index = findGroup(id);
//     grupos.splice(index, 1);
//     //o index (poderia apagar mais que 1 elemento se eu quisesse)

//     //nao precisa ou que retornar um objeto 
//     res.send(`Grupo ${id} removido`);
// })

// app.get('/unidades', (req, res) => {
//     res.status(200).json(unidades);
// })

// app.get('/unidades/:id', (req, res) => {
//     let index = req.params.id
//     res.status(200).json(unidades[index])
// })

// app.put('/unidades/:id', (req, res) => {
//     let index = findGroup(req.params.id);
//     unidades[index].name = req.body.name;
//     res.status(200).json(unidades[index]);
// })

// app.post('/unidades', (req, res) => {
//     unidades.push(req.body);
//     res.status(201).json('Grupo criado')
// })

// app.delete('/unidades/:id', (req, res) => {
//     let { id } = req.params;
//     let index = findGroup(id);
//     unidades.splice(index, 1);

//     res.status(200).json(`Unidade ${id} removida com sucesso!`)
// })

// app.get('/usuarios', (req, res) => {
//     res.status(200).json(usuarios);
// })

// app.get('/usuarios/:name', (req, res) => {
//     let { name } = req.params;
//     let findName = usuarios.findIndex(user => user.name === name);
    
// })

// app.get('/usuarios/:id', (req, res) => {
//     let index = findUser(req.params.id);
//     res.status(200).json(usuarios[index])
// })

// app.put('/usuarios/:id', (req, res) => {
//     let index = findUser(req.params.id);
//     usuarios[index].name = req.body.name;
//     res.status(200).json(usuarios[index]);
// })

// app.post('/usuarios', (req, res) => {
//     usuarios.push(req.body);
//     res.status(201).json("Usuário criado com sucesso!")
// })

// app.delete('/usuarios/:id', (req, res) => {
//     let { id } = req.params;
//     let index = findUser(id);
//     usuarios.splice(index, 1)

//     res.status(200).json(`Usuário ${id} removida com sucesso!`);
// })

// function findGroup(id){
//     return grupos.findIndex(grupo => grupo.id == id);
// }

// function findUnidade(id){
//     return unidades.findIndex(unidade => unidade.id == id);
// }

// function findUser(id){
//     return usuarios.findIndex(user => user.id == id);
// }


// // app.get('/usuarios', (req, res) => {
// //     const usuarioNome = req.query.name;
// //     console.log(usuarioNome);
// //     res.status(200).json(usuarios);

// //     const usuario = usuarios.find(u => u.name === usuarioNome);
// //     if(!usuario) {
// //         return res.status(404).json({ message: 'Usuário não encontrado' })
// //     }

// //     // usuario.forEach(usuario => {
// //     //     if(usuarios.nome === usuarioNome){
// //     //         res.status(200).json(usuarios);
// //     //     } else {
// //     //         res.status(404);
// //     //     }
// //     // })

// // })


// exportando para o server.js fazer uso
export default app

