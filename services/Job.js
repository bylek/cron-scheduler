class JobService {

  constructor(app) {
    this.app = app;
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
    const job = await this.getJobModel().create(data);
    this.getServerService().runSyncJobsOnServer(job.get('server_id'));
    return job;
  }

  async updateJob(id, data){
    let job = await this.getJobById(id);
    if (!job) {
      throw new Error('Job doesn\'t exist.');
    }

    job = await job.update(data);
    this.getServerService().runSyncJobsOnServer(job.get('server_id'));
    return job;
  }

  async deleteJob(id){
    let job = await this.getJobById(id);
    if (!job) {
      throw new Error('Job doesn\'t exist.');
    }

    const serverId = job.get('server_id');
    await job.destroy();
    this.getServerService().runSyncJobsOnServer(serverId);
  }

}

module.exports = function(app){
  return new JobService(app);
};