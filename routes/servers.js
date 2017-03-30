const express = require('express');
const router = express.Router();

router.get('/', getServers);
router.get('/:serverId', getServer);
router.post('/', createServer);
router.patch('/:serverId', updateServer);
router.delete('/:serverId', deleteServer);

module.exports = router;

async function getServers(req, res) {
  const ServerService = req.app.get('services').Server;
  const servers = await ServerService.getServersByUserId(req.user.id);

  return res.json(servers || []);
}

async function getServer(req, res) {
  const ServerService = req.app.get('services').Server;

  const server = await ServerService.getServerById(req.params.serverId, req.user.id);
  return res.json(server);
}

async function createServer(req, res){
  const ServerService = req.app.get('services').Server;

  const server = await ServerService.createServer(req.body, req.user.id);
  return res.json(server);
}

async function updateServer(req, res){
  const ServerService = req.app.get('services').Server;

  try {
    const server = await ServerService.updateServer(req.params.serverId, req.body, req.user.id);
    return res.json(server);

  } catch(err) {
    return res.status(403).send({
      success: false,
      message: err.message
    });
  }
}

async function deleteServer(req, res){
  const ServerService = req.app.get('services').Server;

  await ServerService.deleteServer(req.params.serverId, req.user.id);
  res.json({
    success: true
  });
}