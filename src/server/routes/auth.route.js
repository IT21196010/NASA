/*
IT21833366
wijerathna G.D.K
AF-assignment-01
React-Frontend-Application-Using-NASA-APIs
 */
import  express  from "express";
import { googleSignIn, signin, signup } from "../controllers/auth.controller.js";

const  router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', googleSignIn)

export default router;