const express = require('express');
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;

async function getUsers(req, res) {
  const Server = req.app.get('models').Server;

  const server = await Server.findById(req.params.serverId);
  if (!server || server.get('member_id') !== req.member.id) {
    return res.status(403).send({
      success: false,
      message: 'Server doesn\'t exist.'
    });
  }

  const users = await server.getUsers();
  return res.json(users || []);
}

async function createUser(req, res){
  const User = req.app.get('models').User;

  const data = req.body;
  data.server_id = req.params.serverId;

  const user = await User.create(data);
  return res.json(user);
}

async function updateUser(req, res){
  const User = req.app.get('models').User;

  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(403).send({
      success: false,
      message: 'User doesn\'t exist.'
    });
  }

  user = await user.update(req.body);
  return res.json(user);
}

async function deleteUser(req, res){
  const User = req.app.get('models').User;

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(403).send({
      success: false,
      message: 'User doesn\'t exist.'
    });
  }

  await user.destroy();
  res.json({
    success: true
  });
}