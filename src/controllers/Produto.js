import Foto from '../models/Foto';
import Categoria from '../models/Categoria';
import Produto from '../models/Produto';

class ProdutoController {
  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        include: [{ model: Foto }, { model: Categoria }],
      });

      return res.json({ produtos });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async store(req, res) {
    try {
      let { nome, id_categoria, quantidade, valor } = req.body;

      const produto = await Produto.create({ nome, id_categoria, quantidade, valor });

      return res.json({ produto });
    } catch (err) {
      console.log('ERROR', err);
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

      const produto = await Produto.findByPk(id, {
        include: [{ model: Foto }, { model: Categoria }],
      });

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe'],
        });
      }

      return res.json({ produto });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['O ID é necessário para fazer essa requisição'],
        });
      }

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe'],
        });
      }

      let { nome, marca, quantidade, valor } = req.body;

      await produto.update({ nome, marca, quantidade, valor });

      return res.json({ produto });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['O ID é necessário para fazer essa requisição'],
        });
      }

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(400).json({
          errors: ['Produto não existe'],
        });
      }

      const produtoApagado = await produto.destroy();

      return res.json({ produtoApagado });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new ProdutoController();
