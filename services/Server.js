var exec = require('ssh-exec');

class ServerService {

  constructor(app) {
    this.app = app;
  }

  getServerModel() {
    return this.app.get('models').Server;
  }

  getJobService() {
    return this.app.get('services').Job;
  }

  async getServersByUserId(userId){
    return await this.getServerModel().findAll({
      where: {
        user_id: userId
      }
    });
  }

  async getServerById(id, userId){
    const where = { id };
    if (userId) {
      where.user_id = userId;
    }
    return await this.getServerModel().findOne({ where });
  }

  async createServer(data, userId){
    data.user_id = userId;
    return await this.getServerModel().create(data);
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

  async runSyncJobsOnServer(serverId){
    const server = await this.getServerById(serverId);
    if (server) {
      const command = this.getUpdateCronCommand(await server.getJobs());
      const connectionData = server.getConnectionData();

      try {
        exec(command, connectionData);

      } catch (err) {
        console.log('[runSyncJobsOnServer] ' + err.message);
      }
    }
  }

  getUpdateCronCommand(jobs) {
    if (!jobs || jobs.length === 0) {
      return 'crontab -r';
    }

    const entries = [];
    jobs.forEach(function(job){
      entries.push(job.get('cron_entry') + ' ' + job.get('command'));
    });

    const base64entry = new Buffer(
      entries.join('\n')
    ).toString('base64');

    return `echo "${base64entry}" | base64 --decode | crontab -`;
  }

}

module.exports = function(app){
  return new ServerService(app);
};