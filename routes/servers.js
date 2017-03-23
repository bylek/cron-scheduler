const express = require('express');
const router = express.Router();

router.get('/', getServers);
router.post('/', createServer);
router.patch('/:serverId', updateServer);
router.delete('/:serverId', deleteServer);

module.exports = router;

async function getServers(req, res) {
  const Server = req.app.get('models').Server;

  const servers = await Server.findAll({
    where: {
      user_id: req.user.id
    }
  });

  return res.json(servers || []);
}

async function createServer(req, res){
  const Server = req.app.get('models').Server;

  const data = req.body;
  data.user_id = req.user.id;

  console.log('data', data);
  const server = await Server.create(data);
  return res.json(server);
}

async function updateServer(req, res){
  const Server = req.app.get('models').Server;

  let server = await Server.findById(req.params.serverId);
  if (!server) {
    return res.status(403).send({
      success: false,
      message: 'Server doesn\'t exist.'
    });
  }

  server = await server.update(req.body);
  return res.json(server);
}

async function deleteServer(req, res){
  const Server = req.app.get('models').Server;

  const server = await Server.findById(req.params.serverId);
  if (!server) {
    return res.status(403).send({
      success: false,
      message: 'Server doesn\'t exist.'
    });
  }

  await server.destroy();
  res.json({
    success: true
  });
}