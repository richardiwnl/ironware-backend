import Compra from '../models/Compra';
import Usuario from '../models/Usuario';

class CompraController {
  async store(req, res) {
    try {
      let { forma_pagamento, endereco_entrega, preco_total } = req.body;

      console.log({ forma_pagamento, endereco_entrega, preco_total });

      if (preco_total) {
        preco_total = Number(preco_total);
      }

      const compra = await Compra.create({
        id_usuario: req.userId,
        forma_pagamento,
        endereco_entrega,
        preco_total,
        data_compra: new Date(),
      });

      return res.json({ compra });
    } catch (err) {
      console.log('ERRO:', err);
      console.log('userID', req.userId);
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['O ID é necessário para fazer essa requisição'],
        });
      }

      const compra = await Compra.findByPk(id);

      if (!compra) {
        return res.status(400).json({
          errors: ['Compra não existe'],
        });
      }

      return res.json({ compra });
    } catch (err) {
      return res.status(400).json({
        errros: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new CompraController();
