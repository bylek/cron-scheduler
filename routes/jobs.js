const express = require('express');
const router = express.Router();

router.get('/', getJobs);
router.post('/', createJob);
router.patch('/:jobId', updateJob);
router.delete('/:jobId', deleteJob);

module.exports = router;

async function getJobs(req, res) {
  const Job = req.app.get('models').Job;
  const Server = req.app.get('models').Server;

  const server = await Server.findOne({
    where: {
      id: req.params.server_id,
      user_id: req.user.id,
    }
  });

  if (!server) {
    return res.status(403).send({
      success: false,
      message: 'Job doesn\'t exist.'
    });
  }


  const jobs = server.getJobs();
  return res.json(jobs || []);
}

async function createJob(req, res){
  const Job = req.app.get('models').Job;

  const data = req.body;
  data.server_id = req.params.serverId;

  const job = await Job.create(data);
  return res.json(job);
}

async function updateJob(req, res){
  const Job = req.app.get('models').Job;

  let job = await Job.findById(req.params.jobId);
  if (!job) {
    return res.status(403).send({
      success: false,
      message: 'Job doesn\'t exist.'
    });
  }

  job = await job.update(req.body);
  return res.json(job);
}

async function deleteJob(req, res){
  const Job = req.app.get('models').Job;

  const job = await Job.findById(req.params.jobId);
  if (!job) {
    return res.status(403).send({
      success: false,
      message: 'User doesn\'t exist.'
    });
  }

  await job.destroy();
  res.json({
    success: true
  });
}