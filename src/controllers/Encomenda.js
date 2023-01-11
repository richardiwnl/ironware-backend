import Encomenda from '../models/Encomenda';
import AuxiliarAdm from '../models/AuxiliarAdm';
import Fornecedor from '../models/Fornecedor';

class EncomendaController {
  async store(req, res) {
    try {
      let { id_fornecedor, valor_total, data_entrega, data_realizacao } = req.body;

      const fornecedor = await Fornecedor.findByPk(id_fornecedor);

      if (!fornecedor) {
        return res.status(400).json({
          errors: ['Fornecedor não existe'],
        });
      }

      id_fornecedor = Number(id_fornecedor);
      valor_total = Number(valor_total);

      const encomenda = await Encomenda.create({
        id_fornecedor,
        id_auxiliar_adm: req.userId,
        valor_total,
        data_entrega,
        data_realizacao,
      });

      return res.json({ encomenda });
    } catch (err) {
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

      const encomenda = await Encomenda.findByPk(id, {
        include: [
          {
            model: AuxiliarAdm,
          },
          {
            model: Fornecedor,
          },
        ],
      });

      if (!encomenda) {
        return res.status(400).json({
          errors: ['Encomenda não existe'],
        });
      }

      return res.json({ encomenda });
    } catch (err) {
      console.log('ERROR:', err);
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

      const encomenda = await Encomenda.findByPk(id, {
        include: [
          {
            model: AuxiliarAdm,
          },
          {
            model: Fornecedor,
          },
        ],
      });

      if (!encomenda) {
        return res.status(400).json({
          errors: ['Encomenda não existe'],
        });
      }

      let { id_fornecedor, valor_total, data_entrega, data_realizacao } = req.body;

      valor_total = Number(valor_total);

      const novaEncomenda = await encomenda.update({
        id_fornecedor,
        valor_total,
        data_entrega,
        data_realizacao,
      });

      return res.json({
        novaEncomenda,
      });
    } catch (err) {
      console.log('ERRO:', err);
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

      const encomenda = await Encomenda.findByPk(id, {
        include: [
          {
            model: AuxiliarAdm,
          },
          {
            model: Fornecedor,
          },
        ],
      });

      if (!encomenda) {
        return res.status(400).json({
          errors: ['Encomenda não existe'],
        });
      }

      const encomendaApagada = await encomenda.destroy();

      return res.json({ encomendaApagada });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new EncomendaController();
