import Vendor from '../models/vendor.model';

/**
 * Load vendor and append to req.
 */
function load(req, res, next, id) {
  Vendor.get(id)
    .then((vendor) => {
      req.vendor = vendor; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get vendor
 * @returns {Vendor}
 */
function get(req, res) {
  return res.json(req.vendor);
}

/**
 * Create new vendor
 * @property {string} req.body.vendorname - The username of vendor.
 * @property {string} req.body.mobileNumber - The mobileNumber of vendor.
 * @property {location} req.body.location - The location of vendor.
 * @property {menu} req.body.menu - The menu of vendor.
 * @returns {Vendor}
 */
function create(req, res, next) {
  const vendor = new Vendor({
    vendorname: req.body.vendorname,
    mobileNumber: req.body.mobileNumber,
    location: req.body.location,
    menu: req.body.menu
  });

  vendor.save()
    .then(savedVendor => res.json(savedVendor))
    .catch(e => next(e));
}

/**
 * Update existing vendor
 * @property {string} req.body.vendorname - The username of vendor.
 * @property {string} req.body.mobileNumber - The mobileNumber of vendor.
 * @property {location} req.body.location - The location of vendor.
 * @property {menu} req.body.menu - The menu of vendor.
 * @returns {Vendor}
 */
function update(req, res, next) {
  const vendor = req.vendor;
  vendor.vendorname = req.body.vendorname;
  vendor.mobileNumber = req.body.mobileNumber;
  vendor.location = req.body.location;
  vendor.menu = req.body.menu;

  vendor.save()
    .then(savedVendor => res.json(savedVendor))
    .catch(e => next(e));
}

/**
 * Get vendor list.
 * @property {number} req.query.skip - Number of vendors to be skipped.
 * @property {number} req.query.limit - Limit number of vendors to be returned.
 * @returns {Vendor[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Vendor.list({ limit, skip })
    .then(vendors => res.json(vendors))
    .catch(e => next(e));
}

/**
 * Delete vendor.
 * @returns {Vendor}
 */
function remove(req, res, next) {
  const vendor = req.vendor;
  vendor.remove()
    .then(deletedVendor => res.json(deletedVendor))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
