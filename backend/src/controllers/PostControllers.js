const { Post } = require('../models/Post');
const { v4: uuidv4 } = require('uuid');

exports.criarPost = async (req, res) => {
  try {
    const { usuarioId, conteudo } = req.body;
    const novoPost = await Post.create({
      id: uuidv4(),
      usuarioId,
      conteudo
    });
    res.status(201).json(novoPost);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
