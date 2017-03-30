const jwt = require('jsonwebtoken');
const config = require('config');

class UserService {

  constructor(app) {
    this.app = app;
  }

  getUserModel() {
    return this.app.get('models').User;
  }

  async getUserById(id){
    return await this.getUserModel().findById(id);
  }

  async getUserByEmail(email){
    return await this.getUserModel().findOne({where: {email: email}});
  }

  async authenticate(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('Authentication failed. User not found.');
    }

    if (!user.authenticate(password)) {
      throw new Error('Authentication failed. Wrong password.');
    }

    return jwt.sign(user.getJWTPayload(), config.get('secret'), {
      expiresIn: '1d'
    });
  }

  async register(name, email, password) {
    if (await this.getUserByEmail(email)) {
      throw new Error('Register failed. User already exists.');
    }

    const user = await this.getUserModel().create({ email, password, name });
    if (!user) {
      throw new Error('Register failed. Something went wrong.')
    }

    return jwt.sign(user.getJWTPayload(), config.get('secret'), {
      expiresIn: '1d'
    });
  }

  async isAuthenticated(token) {
    if (token) {
      let user;
      try {
        user = await jwt.verify(token, config.get('secret'));

      } catch (err) {
        throw new Error('Failed to authenticate token.');
      }

      user = await this.getUserById(user.id);
      if (!user) {
        throw new Error('User doesn\'t exist.');
      }

      return user;
    }

    throw new Error('No token provided.');
  }

}

module.exports = function(app){
  return new UserService(app);
};