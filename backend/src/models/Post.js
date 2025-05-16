const db = require('../config/db');

exports.createPost = async (usuario_id, conteudo) => {
  const [rows] = await db.execute(
    'INSERT INTO posts (id, usuario_id, conteudo, data_postagem) VALUES (UUID(), ?, ?, NOW())',
    [usuario_id, conteudo]
  );
  return rows;
};

exports.getPosts = async () => {
  const [rows] = await db.execute('SELECT * FROM posts ORDER BY data_postagem DESC');
  return rows;
};