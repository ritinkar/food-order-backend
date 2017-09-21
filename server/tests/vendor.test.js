import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, {
  expect
} from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Vendor APIs', () => {
  let vendor = {
    vendorname: 'KK123',
    mobileNumber: '1234567890',
    location: {
      latitude: '1200',
      longitude: '8766'
    },
    menu: [
      {
        item: 'chicken lollipop',
        price: '150'
      },
      {
        item: 'drums of heaven',
        price: '120'
      }
    ]
  };

  describe('# POST /api/vendors', () => {
    it('should create a new vendor', (done) => {
      request(app)
        .post('/api/vendors')
        .send(vendor)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.vendorname).to.equal(vendor.vendorname);
          expect(res.body.mobileNumber).to.equal(vendor.mobileNumber);
          expect(res.body.location).to.equal(vendor.location);
          expect(res.body.menu).to.equal(vendor.menu);
          vendor = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/vendors/:vendorId', () => {
    it('should get vendor details', (done) => {
      request(app)
        .get(`/api/vendors/${vendor._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.vendorname).to.equal(vendor.vendorname);
          expect(res.body.mobileNumber).to.equal(vendor.mobileNumber);
          expect(res.body.location).to.equal(vendor.location);
          expect(res.body.menu).to.equal(vendor.menu);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when vendor does not exist', (done) => {
      request(app)
        .get('/api/vendors/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/vendors/:vendorId', () => {
    it('should update vendor details', (done) => {
      vendor.vendorname = 'KK';
      request(app)
        .put(`/api/vendors/${vendor._id}`)
        .send(vendor)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.vendorname).to.equal('KK');
          expect(res.body.mobileNumber).to.equal(vendor.mobileNumber);
          expect(res.body.location).to.equal(vendor.location);
          expect(res.body.menu).to.equal(vendor.menu);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/vendors/', () => {
    it('should get all vendors', (done) => {
      request(app)
        .get('/api/vendors')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all vendors (with limit and skip)', (done) => {
      request(app)
        .get('/api/vendors')
        .query({
          limit: 10,
          skip: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/vendors/', () => {
    it('should delete vendor', (done) => {
      request(app)
        .delete(`/api/vendors/${vendor._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.vendorname).to.equal('KK');
          expect(res.body.mobileNumber).to.equal(vendor.mobileNumber);
          expect(res.body.location).to.equal(vendor.location);
          expect(res.body.menu).to.equal(vendor.menu);
          done();
        })
        .catch(done);
    });
  });
});
