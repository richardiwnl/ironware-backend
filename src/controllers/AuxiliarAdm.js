import AuxiliarAdm from '../models/AuxiliarAdm';

class AuxiliarAdmController {
  async store(req, res) {
    try {
      const auxiliar = await AuxiliarAdm.create(req.body);
      const { id, nome, email, telefone, cpf, data_nasc, hash_senha } = auxiliar;

      return res.json({ id, nome, email, telefone, cpf, data_nasc, hash_senha });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const id = req.userId;

      if (!id) {
        return res.status(400).json({
          errors: ['O ID é necessário para fazer essa requisição'],
        });
      }

      const auxiliar = await AuxiliarAdm.findByPk(id);

      if (!auxiliar) {
        return res.status(400).json({
          errors: ['O auxiliar não existe'],
        });
      }

      return res.json(auxiliar);
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

      const auxiliar = await AuxiliarAdm.findByPk(id);

      if (!auxiliar) {
        return res.status(400).json({
          errors: ['Usuário não existe!'],
        });
      }

      const novoAuxiliar = await auxiliar.update(req.body);

      return res.json({ novoAuxiliar });
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

      const auxiliar = await AuxiliarAdm.findByPk(id);

      if (!auxiliar) {
        return res.status(400).json({
          errors: ['Usuário não existe!'],
        });
      }

      const auxiliarApagado = await auxiliar.destroy();

      return res.json({ auxiliarApagado });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new AuxiliarAdmController();
