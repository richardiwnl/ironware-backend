import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import AuxiliarAdm from '../models/AuxiliarAdm';

// AVISO!!! Código de baixíssima qualidade a seguir:
export default async function (req, res, next) {
  if (req.userId || req.userEmail) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Autenticação necessária'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.AUX_TOKEN_SECRET);
    const { id, email } = dados;

    const auxiliar = await AuxiliarAdm.findOne({
      where: {
        id,
        email,
      },
    });

    if (!auxiliar) {
      return res.status(401).json({
        errors: ['Auxiliar não existe'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    req.user = AuxiliarAdm;

    next();
  } catch (err) {

    // Eu nem sei se isso funciona e sinceramente, essas são as piores linhas de código que já escrevi.
    if (err instanceof JsonWebTokenError && err.message === 'invalid signature') {
      return next();
    }

    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
}
