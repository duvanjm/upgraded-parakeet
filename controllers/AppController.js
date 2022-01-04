const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    if (dbClient.isAlive()) {
      res.status(200).json({ db: true }, 200);
    }
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const obj = {
      users,
    };
    res.status(200).json(obj, 200);
  }
}

module.exports = AppController;
