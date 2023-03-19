import Categoria from '../models/Categoria';

class CategoriaController {
  async store(req, res) {
    try {
      if (!req.body.nome) {
        return res.status(400).json({
          errors: ['O nome é necessário para essa requisição'],
        });
      }

      const nome = req.body.nome.toUpperCase();
      const categoria = await Categoria.create({ nome });

      return res.json({ categoria });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    try {
      const categorias = await Categoria.findAll();

      return res.json({ categorias });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new CategoriaController();
