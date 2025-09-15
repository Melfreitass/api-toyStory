import dados from "../models/dados.js";
const { personagens } = dados;

const getAllPersonagens = (req, res) => {
    const {nome,  tipo, anoFabricacao} = req.query;

    let resultado = personagens

     if(nome) {
        resultado = resultado.filter((p) => p.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()));
    }

     if(tipo) {
        resultado = resultado.filter((p) => p.tipo.toLocaleLowerCase().includes(tipo.toLocaleLowerCase()));
    }
    
    res.status(200).json({
        total: resultado.length,
        barbies: resultado
    })
}

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    const personagem = personagens.find(p => p.id === id);

    res.status(200).json({
        sucess: true,
        personagem: personagem
    })
}

const creatPersonagem = (req, res) => {
    const {nome, tipo, anoFabricacao, cor, quantidadeEstoque} = req.body;

    if(!nome || !tipo) {
        return res.status(400).json({
            sucess: false,
            message: "Nome e tipo são obrigatórios"
        })
    }

    const novoPersonagem = {
        id: personagens.length + 1,
        nome,
        anoFabricacao, 
        cor,
        quantidadeEstoque
    }

    personagens.push(novoPersonagem);

    res.status(201).json({
        sucess: true,
        message: "Personagem cadastrado com sucesso!",
        personagem: novoPersonagem
    })
}

const deletePersonagem = (req, res) => {
    let id = parseInt(req.params.id);

    const personagemRemover = personagens.find(p => p.id === id);

    if (!personagemRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Esse personagem não existe, ${id}`
        })
    }

    const personagensFiltrados = personagens.filter(personagem => personagem.id !== id);

    personagens.splice(0, personagens.length, ...personagensFiltrados);

    res.status(200).json({
        sucess: true,
        message: "O personagem foi removido com sucesso",
        personagemRemovido: personagemRemover
    })
}

const updatePersonagem = (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, tipo, anoFabricacao, cor, quantidadeEstoque} = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser um número válido!!"
        })
    }

    const personagemExiste = personagens.find(personagem => personagem.id === idParaEditar );

    if(!personagemExiste) {
        return res.status(404).json({
            sucess: false,
            message: `Personagem com Id: ${id} não existe`
        })
    }

    const personagensAtualizados = personagens.map(personagem =>
        personagem.id === idParaEditar ? {
            ...personagem,
            ...(nome && { nome }),
            ...(tipo && {tipo}),
            ...(anoFabricacao && {anoFabricacao: parseInt(anoFabricacao)}),
            ...(cor && { cor }),
            ...(quantidadeEstoque && {quantidadeEstoque: parseInt(quantidadeEstoque)})
        } : personagem)

        personagens.splice(0, personagens.length, ... personagensAtualizados);

        const personagemNovo = personagens.find(personagem => personagem.id === idParaEditar);

        res.status(200).json({
            success: true,
            message: `Dados do Personagem ID ${idParaEditar} atualizados com sucesso!`,
            personagem: personagemNovo
        })
}


export { getAllPersonagens, getById, creatPersonagem, deletePersonagem, updatePersonagem }