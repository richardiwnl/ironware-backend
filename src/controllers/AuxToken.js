import jwt from 'jsonwebtoken';
import AuxiliarAdm from '../models/AuxiliarAdm';

class AuxTokenController {
  async store(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const auxiliar = await AuxiliarAdm.findOne({
      where: {
        email,
      },
    });

    if (!auxiliar) {
      return res.status(401).json({
        errors: ['Auxiliar não existe'],
      });
    }

    if (!(await auxiliar.passwordIsValid(senha))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = auxiliar;
    const token = jwt.sign(
      {
        id,
        email,
      },
      process.env.AUX_TOKEN_SECRET,
      {
        expiresIn: process.env.AUX_TOKEN_EXPIRATION,
      }
    );

    return res.json({ token });
  }
}

export default new AuxTokenController();
