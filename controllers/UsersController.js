const crypto = require('crypto');
const dbClient = require('../utils/db');

function hashpwd(password) {
  return crypto.createHash('sha256').update(password, 'utf-8').digest('hex');
}

class UsersController {
  static async postNew(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const search = await dbClient.db.collection('users').find({ email }).toArray();

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return 400;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return 400;
    }
    if (search.length !== 0 /* search.length > 0 */) {
      res.status(400).json({ error: 'Already exist' });
      return 400;
    }
    const hashpw = hashpwd(password);
    const newUser = await dbClient.db.collection('users').insertOne({ email, password: hashpw });
    const response = {
      id: newUser.ops[0]._id,
      email: newUser.ops[0].email,
    };
    return res.status(201).json({ response });
  }
}

module.exports = UsersController;
