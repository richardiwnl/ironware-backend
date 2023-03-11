import Endereco from '../models/Endereco';
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      const { id, nome, email, telefone, cpf, data_nasc, hash_senha } = novoUsuario;

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

      const usuario = await Usuario.findByPk(id, {
        attributes: {
          exclude: ['created_at', 'updated_at', 'id_endereco', 'cd_endereco'],
        },
        include: {
          model: Endereco,
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
      });

      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      return res.json(usuario);
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

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novoUsuario = await usuario.update(req.body);
      const { nome, email, telefone, cpf, data_nasc, hash_senha } = novoUsuario;

      return res.json({ nome, email, telefone, cpf, data_nasc, hash_senha });
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

      const usuario = await Usuario.findByPk(id, {
        attributes: {
          exclude: ['id', 'id_endereco', 'cd_endereco', 'created_at', 'updated_at'],
        },
      });

      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const usuarioApagado = await Usuario.destroy({
        where: {
          id,
        },
      });

      return res.json(usuario);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new UsuarioController();
