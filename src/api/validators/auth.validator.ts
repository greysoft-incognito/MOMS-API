import { check } from 'express-validator';
import * as constants from '../../config/constants';

export default {
  login: [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage(constants.MESSAGES.INVALID_EMAIL),
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
  ],
  email: [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage(constants.MESSAGES.INVALID_EMAIL),
  ],
  password: [
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
    check('password2').custom((value: string, { req }) => {
      if (value !== req.body.password) {
        // throw error if passwords do not match
        throw new Error(constants.MESSAGES.PASSWORD_MATCH_ERROR);
      } else {
        return value;
      }
    }),
  ],
  buyerRegister: [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage(constants.MESSAGES.INVALID_EMAIL),
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
    check('password2').custom((value: string, { req }) => {
      if (value !== req.body.password) {
        // throw error if passwords do not match
        throw new Error(constants.MESSAGES.PASSWORD_MATCH_ERROR);
      } else {
        return value;
      }
    }),
  ],
  sellerRegister: [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage(constants.MESSAGES.INVALID_EMAIL),
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
    check('password2').custom((value: string, { req }) => {
      if (value !== req.body.password) {
        // throw error if passwords do not match
        throw new Error(constants.MESSAGES.PASSWORD_MATCH_ERROR);
      } else {
        return value;
      }
    }),
  ],
};
