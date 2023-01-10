import Endereco from '../models/Endereco';
import Usuario from '../models/Usuario';

class EnderecoController {
  async store(req, res) {
    try {
      const endereco = await Endereco.create(req.body);
      const { logradouro, bairro, cidade, complemento, numero, cep } = endereco;

      const usuario = await req.user.findByPk(req.userId);

      usuario.id_endereco = endereco.id;

      usuario.save();

      return res.json({ logradouro, bairro, cidade, complemento, numero, cep });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const usuario = await req.user.findByPk(req.userId);
      const endereco = await Endereco.findByPk(usuario.id_endereco);

      if (!endereco) {
        return res.status(400).json({
          errors: ['Endereço inexistente'],
        });
      }

      const { logradouro, bairro, cidade, complemento, numero, cep } = endereco;

      return res.json({ logradouro, bairro, cidade, complemento, numero, cep });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const usuario = await req.user.findByPk(req.userId);
      const endereco = await Endereco.findByPk(usuario.id_endereco);

      if (!endereco) {
        return res.status(400).json({
          errors: ['Endereço inexistente'],
        });
      }

      endereco.update(req.body);

      const { logradouro, bairro, cidade, complemento, numero, cep } = endereco;

      return res.json({ logradouro, bairro, cidade, complemento, numero, cep });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  // TODO: Código não testado devido ao RESTRICT do banco de dados.
  /*
    Um usuário devia apagar ou atualizar seu endereço?

    async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId);
      const endereco = await Endereco.findByPk(usuario.id_endereco);

      if (!endereco) {
        return res.status(400).json({
          errors: ['Você não possui um endereço cadastrado'],
        });
      }

      endereco.destroy();

      res.json({ endereco });
    } catch (err) {
      res.status(400).json({
        errors: err.errros.map((error) => error.message),
      });
    }
  } */
}

export default new EnderecoController();
