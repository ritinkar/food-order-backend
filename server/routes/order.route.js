import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/config';
import Vendor from '../models/vendor.model';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/order - Processes an order */
router.route('/')
  .post(validate(paramValidation.order), (req, res, next) => {
      Vendor.get(req.body.vendorID)
        .then((vendor) => {
          //check if item in vendor.menu
          let item = vendor.menu.find((item) => item.item === req.body.item);
          if (!item) {
            return next(new Error("no such item"));
          }
          console.log(item);
          //send sms to vendor.phone containing location,username, mobileno,item
          return next();
        })
        .catch(e => {return next(e)});
    },
    (req, res) => {
      return res.send("ok");
    },
    (error, req, res, next) => {
      res.status(500);
      res.json({
        message: error.message
      });
    },
  );


export default router;
