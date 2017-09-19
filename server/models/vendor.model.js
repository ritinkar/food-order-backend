import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Vendor Schema
 */
const VendorSchema = new mongoose.Schema({
  vendorname: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  location: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    }
  },
  menu: [{
    item: {
      name: {
        type: String
      },
      price: {
        type: Number
      }
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
VendorSchema.method({});

/**
 * Statics
 */
VendorSchema.statics = {
  /**
   * Get vendor
   * @param {ObjectId} id - The objectId of vendor.
   * @returns {Promise<Vendor, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((vendor) => {
        if (vendor) {
          return vendor;
        }
        const err = new APIError('No such vendor exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List vendors in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of vendors to be skipped.
   * @param {number} limit - Limit number of vendors to be returned.
   * @returns {Promise<Vendor[]>}
   */
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Vendor
 */
export default mongoose.model('Vendor', VendorSchema);
