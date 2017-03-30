class ServerService {

  constructor(app) {
    this.server = app.get('models').Server;
  }

  async getServersByUserId(userId){
    return await this.server.findAll({
      where: {
        user_id: userId
      }
    });
  }

  async getServerById(id, userId){
    return await this.server.findOne({
      where: {
        user_id: userId,
        id: id
      }
    });
  }

  async createServer(data, userId){
    data.user_id = userId;
    return await this.server.create(data);
  }

  async updateServer(id, data, userId){
    let server = await this.getServerById(id, userId);
    if (!server) {
      throw new Error('Server doesn\'t exist.');
    }

    return await server.update(data);
  }

  async deleteServer(id, userId){
    let server = await this.getServerById(id, userId);
    if (!server) {
      throw new Error('Server doesn\'t exist.');
    }

    await server.destroy();
  }

}

module.exports = function(app){
  return new ServerService(app);
};