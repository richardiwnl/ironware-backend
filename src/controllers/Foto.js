import multer from 'multer';

import Foto from '../models/Foto';
import Produto from '../models/Produto';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).array('fotos');

class FotoController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { id_produto } = req.body;

        if (!id_produto) {
          return res.status(400).json({
            errors: ['O ID é necessário para fazer essa requisição'],
          });
        }

        const produto = await Produto.findByPk(id_produto, {
          include: {
            model: Foto,
          },
        });

        if (!produto) {
          return res.status(400).json({
            errors: ['Produto não existe'],
          });
        }

        const fotos = [];

        for (const { originalname, filename } of req.files) {
          fotos.push(await Foto.create({ id_produto, originalname, filename }));
        }

        return res.json({ fotos });
      } catch (err) {
        console.log('ERRO', err);
        return res.status(400).json({
          errors: err.errors.map((error) => error.message),
        });
      }
    });
  }
}

export default new FotoController();
