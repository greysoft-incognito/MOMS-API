import { check } from 'express-validator';
import * as constants from '../../config/constants';
import { Request } from "express";
export default {
  fastBuyerRegister: [check('email').isEmail().normalizeEmail()
  .withMessage(constants.MESSAGES.INVALID_EMAIL)
],
  login: [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage(constants.MESSAGES.INVALID_EMAIL),
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
  ],
  buyerRegister: [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage(constants.MESSAGES.INVALID_EMAIL),
    check('password')
      .isLength({ min: 8 })
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
      check('password2').custom((value: any, { req }: Request) => {
        if (value !== req.body.newPassword) {
          // throw error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
      .withMessage(constants.MESSAGES.SHORT_PASSWORD),
  ],
};
