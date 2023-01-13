import ProdutoEncomenda from '../models/ProdutoEncomenda';

class ProdutoEncomendaController {
  async store(req, res) {
    try {
      const { id_produto, id_encomenda, quantidade } = req.body;

      const produtoEncomenda = await ProdutoEncomenda.create({
        id_produto,
        id_encomenda,
        quantidade,
      });

      return res.json({ produtoEncomenda });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new ProdutoEncomendaController();
