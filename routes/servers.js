const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
  const Server = req.app.get('models').Server;

  let servers;
  try {
    servers = await Server.findAll({
      where: {
        user_id: req.user.id
      }
    });

  } catch (err) {}

  return res.json(servers || []);
});

router.patch('/:id', async function(req, res){
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
});

router.post('/', async function(req, res){
  const Server = req.app.get('models').Server;

  let data = req.body;
  data.user_id = req.user.id;

  let server = Server.create(data);
  return res.json(server);
});

router.delete('/:id', async function(req, res){
  const Server = req.app.get('models').Server;

  let server = Server.findById(req.params.id);
  if (!server) {
    return res.status(403).send({
      success: false,
      message: 'Server doesn\'t exist.'
    });
  }

  server.destroy();
  res.json({
    success: true
  });
});

module.exports = router;
