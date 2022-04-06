/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config/config';
import mg from './mailgun';
import { MailData, To } from '../interfaces/Mail.interface';

class Emailing {
  from: string;
  domain: string;
  data;
  constructor(data: To) {
    this.from = config.emailAccount.email;
    this.domain = <string>config.mailgun.domain;
    this.data = data;
  }

  sendEmail = async (data: MailData) => {
    try {
      const result = await mg.messages.create(this.domain, data);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  verify = async () => {
    const mailData = {
      from: this.from,
      to: `"${this.data.to.name}" <${this.data.to.email}>`,
      subject: 'verify your mail',
      html: '',
    };
    try {
      return await this.sendEmail(mailData);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  forgotPassword = async () => {
    const mailData = {
      from: this.from,
      to: `"${this.data.to.name}" <${this.data.to.email}>`,
      subject: 'Reset your Password',
      html: '',
    };
    try {
      return await this.sendEmail(mailData);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  newPassword = async () => {
    const mailData = {
      from: this.from,
      to: `"${this.data.to.name}" <${this.data.to.email}>`,
      subject: 'Welcome to MOMS',
      html: '',
    };
    try {
      return await this.sendEmail(mailData);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default Emailing;
