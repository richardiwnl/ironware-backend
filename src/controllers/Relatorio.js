import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import path from 'path';

import axios from '../../services/axios';

async function html() {
  try {
    const response = await axios.get('produtos/');
    const products = response.data.produtos;

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const valorEstoque = products.reduce(
      (accumulator, obj) => accumulator + obj.valor * obj.quantidade,
      0
    );

    const quantidadeEstoque = products.reduce(
      (accumulator, obj) => accumulator + obj.quantidade,
      0
    );

    const date = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const time = new Date().toLocaleTimeString('pt-BR', {
      minute: '2-digit',
      hour: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const data = {
      image: 'http://localhost:3000/images/ironware-logo.png',
      products,
      date: `${date} às ${time}`,
      valorEstoque: currencyFormatter.format(valorEstoque),
      quantidadeEstoque,
      valorFrete: currencyFormatter.format(quantidadeEstoque / 2 * 20),
    };

    const templatePath = path.resolve('templates', 'relatorio.html');
    const content = await readFile(templatePath, 'utf8');

    const template = Handlebars.compile(content);

    return template(data);
  } catch (error) {
    console.log(error);
    throw new Error('Erro na emissão do relatório');
  }
}

async function pdf(seed) {
  const document = await html();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(document, {
    waitUntil: 'networkidle0',
  });

  await page.pdf({
    format: 'A4',
    printBackground: true,
    path: `${__dirname}/../../relatorios/relatorio_${seed}.pdf`,
  });

  await browser.close();
}

class RelatorioController {
  async show(req, res) {
    const seed = Date.now();
    await pdf(seed);

    const file = `${__dirname}/../../relatorios/relatorio_${seed}.pdf`;

    return res.download(file);
  }
}

export default new RelatorioController();
