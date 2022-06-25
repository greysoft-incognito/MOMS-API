import { check } from 'express-validator';
import constants from '../../config/constants';
import path from 'path';

export default {
  password: [
    check('oldPassword'),
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
    check('password2').custom((value: string, { req }) => {
      if (value !== req.body.password) {
        // throw error if passwords do not match
        return false;
      } else {
        return value;
      }
    }),
  ],
  avatar: [
    check('avatar')
      .exists()
      .custom(function (value, { req }) {
        const extension = path.extname(req.file.originalname).toLowerCase();
        switch (extension) {
          case '.jpg':
            return '.jpg';
          case '.jpeg':
            return '.jpeg';
          case '.png':
            return '.png';
          default:
            return false;
        }
      }),
  ],
  name: [check('fullname').exists().isString()],
  verify: [
    check('bvn').exists().isInt().toInt(),
    check('nin').exists().isInt().toInt(),
    check('CACnumber').exists().isString(),
    check('img')
      .optional()
      .custom(function (value, { req }) {
        const extension = path.extname(req.files[0].originalname).toLowerCase();
        switch (extension) {
          case '.jpg':
            return '.jpg';
          case '.jpeg':
            return '.jpeg';
          case '.png':
            return '.png';
          default:
            return false;
        }
      }),
  ],
  editShop: [
    check('phone').optional().isString().toInt(),

    check('name').optional().isString(),
    check('desc').optional().isString(),
    check('bankAccountName').optional().isString(),
    check('bankName').optional().isString(),
    check('bankAccountNumber').optional().isString(),
    check('avatar')
      .optional()
      .custom(function (value, { req }) {
        const extension = path.extname(req.file.originalname).toLowerCase();
        switch (extension) {
          case '.jpg':
            return '.jpg';
          case '.jpeg':
            return '.jpeg';
          case '.png':
            return '.png';
          default:
            return false;
        }
      }),
  ],
};
