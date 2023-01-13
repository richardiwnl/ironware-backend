import ProdutoCompra from '../models/ProdutoCompra';

class ProdutoCompraController {
  async store(req, res) {
    try {
      const { id_produto, id_compra, quantidade } = req.body;

      const produtoCompra = await ProdutoCompra.create({ id_produto, id_compra, quantidade });

      return res.json({ produtoCompra });
    } catch (err) {
      console.log('ERRO:', err);
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new ProdutoCompraController();
