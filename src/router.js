/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignIn } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const handleGetProfile = async (req, res) => {
    try {
      const result = await UserController.getProfile(req.user.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
const handleUpdateProfile = async (req, res) => {
try {
    const result = await UserController.updateProfile(req.user.id, req.body);
    res.json(result);
} catch (error) {
    res.status(500).json({ error: error.toString() });
}
};

router.post('/signIn', requireSignIn, async (req, res) => {
    try {
      const token = UserController.signIn(req.user);
      res.json({
        token, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName,
      });
    } catch (error) {
      res.status(422).json({ error: error.toString() });
    }
  });
  
router.post('/signUp', async (req, res) => {
try {
    const token = await UserController.signUp(req.body);
    res.json({
    token, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, resume: req.body.resume,
    });
} catch (error) {
    res.status(422).json({ error: error.toString() });
}
});
  
router.route('/profile')
  .get(requireAuth, handleGetProfile)
  .put(requireAuth, handleUpdateProfile);

export default router;
