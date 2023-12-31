const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
try { 
  const newUser = await User.create({
    name: req.body.name,
    password: req.body.password});
  
  
  req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.username = newUser.name;
    req.session.logged_in = true;

    res.status(200).json(newUser);
  });
} catch (err) {
console.log(err)
  res.status(400).json(err);
}
}),


router.post('/', async (req, res) => {
    try {
      const userExists = await User.findOne({name: req.body.name});
      if(userExists) {
          return res.status(400).json({message:"User exists"})
      } 
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.name;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
  } catch (err) {
    console.log(err)
      res.status(400).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { name: req.body.username } });
  console.log('hello')
      if (!userData) {
        res
          .status(400)
          .json({ message: 'incorrect username or password' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.name;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;