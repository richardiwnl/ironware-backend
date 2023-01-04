class TestController {
  async index(req, res) {
    res.json('Ok');
  }
}

export default new TestController();
