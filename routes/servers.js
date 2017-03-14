const express = require('express');
const router = express.Router();

router.get('/', getServers);
router.post('/', createServer);
router.patch('/:id', updateServer);
router.delete('/:id', deleteServer);

module.exports = router;

async function getServers(req, res) {
  const Server = req.app.get('models').Server;

  const servers = await Server.findAll({
    where: {
      member_id: req.member.id
    }
  });

  return res.json(servers || []);
}

async function createServer(req, res){
  const Server = req.app.get('models').Server;

  const data = req.body;
  data.member_id = req.member.id;

  const server = await Server.create(data);
  return res.json(server);
}

async function updateServer(req, res){
  const Server = req.app.get('models').Server;

  let server = await Server.findById(req.params.id);
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

  const server = await Server.findById(req.params.id);
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