import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/order - Processes an order */
router.route('/')
  .post(validate(paramValidation.order),(req,res)=>{
  	return res.send("ok")});


export default router;


