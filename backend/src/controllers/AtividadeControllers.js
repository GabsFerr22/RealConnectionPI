const { Atividade } = require('../models/Atividade');
const { v4: uuidv4 } = require('uuid');

exports.criarAtividade = async (req, res) => {
  try {
    const { psicologoId, titulo, descricao } = req.body;
    const novaAtividade = await Atividade.create({
      id: uuidv4(),
      psicologoId,
      titulo,
      descricao
    });
    res.status(201).json(novaAtividade);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};