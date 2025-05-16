const db = require('../config/db');

exports.createAtividade = async (psicologo_id, titulo, descricao, pontuacao) => {
  const [rows] = await db.execute(
    'INSERT INTO atividades (id, psicologo_id, titulo, descricao, pontuacao) VALUES (UUID(), ?, ?, ?, ?)',
    [psicologo_id, titulo, descricao, pontuacao]
  );
  return rows;
};

exports.getAtividades = async () => {
  const [rows] = await db.execute('SELECT * FROM atividades');
  return rows;
};