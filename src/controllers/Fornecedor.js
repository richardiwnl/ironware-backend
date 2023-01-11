import Fornecedor from '../models/Fornecedor';
import Endereco from '../models/Endereco';

class FornecedorController {
  async store(req, res) {
    try {
      const { nome, email, telefone, cnpj, logradouro, bairro, cidade, complemento, numero, cep } =
        req.body;

      const fornecedor = await Fornecedor.create({ nome, email, telefone, cnpj });
      const endereco = await Endereco.create({
        logradouro,
        bairro,
        cidade,
        complemento,
        numero,
        cep,
      });

      await fornecedor.update({
        id_endereco: endereco.id,
      });

      return res.json({ fornecedor });
    } catch (err) {
      console.log('ERRO:', err);
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

      const fornecedor = await Fornecedor.findByPk(id, {
        include: {
          model: Endereco,
        },
      });

      if (!fornecedor) {
        return res.status(400).json({
          errors: ['O fornecedor não existe'],
        });
      }

      return res.json({ fornecedor });
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

      const fornecedor = await Fornecedor.findByPk(id);

      if (!fornecedor) {
        return res.status(400).json({
          errors: ['O fornecedor não existe'],
        });
      }

      const { nome, email, telefone, cnpj, logradouro, bairro, cidade, complemento, numero, cep } =
        req.body;

      const novoFornecedor = await fornecedor.update(nome, email, telefone, cnpj);

      const { id_endereco } = fornecedor;
      const endereco = await Endereco.findByPk(id_endereco);

      if (endereco) {
        await endereco.update({ logradouro, bairro, cidade, complemento, numero, cep });
      }

      return res.json({
        fornecedor: novoFornecedor,
        Endereco: endereco,
      });
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

      const fornecedor = await Fornecedor.findByPk(id);

      if (!fornecedor) {
        return res.status(400).json({
          errors: ['O fornecedor não existe'],
        });
      }

      const fornecedorApagado = await fornecedor.destroy();

      const { id_endereco } = fornecedor;
      const endereco = await Endereco.findByPk(id_endereco);

      if (endereco) {
        await endereco.destroy();
      }

      return res.json({
        fornecedor: fornecedorApagado,
        Endereco: endereco,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new FornecedorController();
