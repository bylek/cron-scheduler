const express = require('express');
const router = express.Router();

router.get('/', getJobs);
router.get('/:jobId', getJob);
router.post('/', createJob);
router.patch('/:jobId', updateJob);
router.delete('/:jobId', deleteJob);

module.exports = router;

async function getJobs(req, res) {
  const JobService = req.app.get('services').Job;

  try {
    const jobs = await JobService.getJobsByServerId(req.query.server_id, req.user.id);
    return res.json(jobs || []);

  } catch (err) {
    return res.status(403).send({
      success: false,
      message: err.message
    });
  }
}

async function getJob(req, res) {
  const JobService = req.app.get('services').Job;

  const job = await JobService.getJobById(req.params.jobId);
  return res.json(job);
}

async function createJob(req, res){
  const JobService = req.app.get('services').Job;

  const job = await JobService.createJob(req.body);
  return res.json(job);
}

async function updateJob(req, res){
  const JobService = req.app.get('services').Job;

  try {
    const job = await JobService.updateJob(req.params.jobId, req.body);
    return res.json(job);

  } catch (err) {
    return res.status(403).send({
      success: false,
      message: err.message
    });

  }
}

async function deleteJob(req, res){
  const JobService = req.app.get('services').Job;

  try {
    await JobService.deleteJob(req.params.jobId);
    return res.json({
      success: true
    });

  } catch (err) {
    return res.status(403).send({
      success: false,
      message: err.message
    });

  }
}