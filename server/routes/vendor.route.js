import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import vendorCtrl from '../controllers/vendor.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/vendors - Get list of vendors */
  .get(vendorCtrl.list)

  /** POST /api/vendors - Create new vendor */
  .post(validate(paramValidation.createVendor), vendorCtrl.create);

router.route('/:vendorId')
  /** GET /api/vendors/:vendorId - Get vendor */
  .get(vendorCtrl.get)

  /** PUT /api/vendors/:vendorId - Update vendor */
  .put(validate(paramValidation.updateVendor), vendorCtrl.update)

  /** DELETE /api/vendors/:vendorId - Delete vendor */
  .delete(vendorCtrl.remove);

/** Load vendor when API with vendorId route parameter is hit */
router.param('vendorId', vendorCtrl.load);

export default router;
