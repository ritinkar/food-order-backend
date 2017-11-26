import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/vendors
  createVendor: {
    body: {
      vendorname: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      location: {latitude: Joi.string(),longitude:Joi.string()},
      menu: Joi.array()
    }
  },

  // UPDATE /api/vendors/:vendorId
  updateVendor: {
    body: {
      vendorname: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      location: {latitude: Joi.string(),longitude:Joi.string()},
      menu: Joi.array()
    },
    params: {
      vendorId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  order: {
    body :{
      item : Joi.string().required(),
      vendor : Joi.string().required(),
      vendorID : Joi.string().required(),
      username : Joi.string().required(),
      userPhone : Joi.string().required(),
      position : {latitude: Joi.string().required(),longitude:Joi.string().required()}
    }
  }
};
