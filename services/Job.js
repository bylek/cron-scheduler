class JobService {

  constructor(app) {
    this.app = app;
  }

  getServerModel() {
    return this.app.get('models').Server;
  }

  getJobModel() {
    return this.app.get('models').Job
  }

  getServerService() {
    return this.app.get('services').Server;
  }

  async getJobsByServerId(serverId, userId){
    const server = await this.getServerService().getServerById(serverId, userId);
    if (!server) {
      throw new Error('Server doesn\'t exist.');
    }

    return await server.getJobs();
  }

  async getJobById(id){
    return await this.getJobModel().findById(id);
  }

  async createJob(data){
    return await this.getJobModel().create(data);
  }

  async updateJob(id, data){
    let job = await this.getJobById(id);
    if (!job) {
      throw new Error('Job doesn\'t exist.');
    }

    return await job.update(data);
  }

  async deleteJob(id){
    let job = await this.getJobById(id);
    if (!job) {
      throw new Error('Job doesn\'t exist.');
    }

    await job.destroy();
  }

}

module.exports = function(app){
  return new JobService(app);
};