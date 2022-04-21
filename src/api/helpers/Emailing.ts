/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config/config';
import mg from './mailgun';
import { MailData, To } from '../interfaces/Mail.interface';

class Emailing {
  from: string;
  domain: string;
  data;
  constructor(data: To) {
    this.from = <string>config.emailAccount.email;
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
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MOMS</title>
      
          <style>
              .main{
                  width: 50%;
                  margin: 0 auto;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  text-align: center;
              }
      
              h1{
                  text-align: center;
                  margin: 10% 0 6%;
              }
              h3{
                  text-align: center;
                  font-weight: 100;
                  line-height: 2;
                  width: 80%;
                  margin: 0 auto 5%;
              }
      
              button{
                  height: 50px;
                  width: 100px;
                  cursor: pointer;
                  font-size: 1rem;
              }
      
              .password{
                  background-color: rgb(128, 128, 128, 0.3);
                  width: 50%;
                  font-weight: bold;
                  font-size: 1.5rem;
              }
          </style>
      </head>
      <body>
          <div class="main">
          <!-- brand name -->
              <h1>MOMS EXPRESS</h1>
              <H3> Welcome ${this.data.to.name} to MOMSExpress an online platform where you can shop for your desired products from different sellers around the world.
                  Verify your Email: </H3>
              <a href="${this.data.url}"><button>Verify</button></a>

          </div>
      </body>
      </html>`,
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
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MOMS</title>
      
          <style>
              .main{
                  width: 50%;
                  margin: 0 auto;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  text-align: center;
              }
      
              h1{
                  text-align: center;
                  margin: 10% 0 6%;
              }
              h3{
                  text-align: center;
                  font-weight: 100;
                  line-height: 2;
                  width: 80%;
                  margin: 0 auto 5%;
              }
      
              button{
                  height: 50px;
                  width: 100px;
                  cursor: pointer;
                  font-size: 1rem;
              }
      
              .password{
                  background-color: rgb(128, 128, 128, 0.3);
                  width: 50%;
                  font-weight: bold;
                  font-size: 1.5rem;
              }
          </style>
      </head>
      <body>
          <div class="main">
          <!-- brand name -->
              <h1>MOMS EXPRESS</h1>
              <H3> Welcome ${this.data.to.name} to MOMSExpress an online platform where you can shop for your desired products from different sellers around the world.
                  Your Login password is: </H3>
                  <a href="${this.data.url}"><button>Reset</button></a>
                  </div>
      </body>
      </html>`,
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
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MOMS</title>
      
          <style>
              .main{
                  width: 50%;
                  margin: 0 auto;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  text-align: center;
              }
      
              h1{
                  text-align: center;
                  margin: 10% 0 6%;
              }
              h3{
                  text-align: center;
                  font-weight: 100;
                  line-height: 2;
                  width: 80%;
                  margin: 0 auto 5%;
              }
      
              button{
                  height: 50px;
                  width: 100px;
                  cursor: pointer;
                  font-size: 1rem;
              }
      
              .password{
                  background-color: rgb(128, 128, 128, 0.3);
                  width: 50%;
                  font-weight: bold;
                  font-size: 1.5rem;
              }
          </style>
      </head>
      <body>
          <div class="main">
          <!-- brand name -->
              <h1>MOMS EXPRESS</h1>
              <H3> Welcome ${this.data.to.name} to MOMSExpress an online platform where you can shop for your desired products from different sellers around the world.
                  Your Login password is: </H3>
              <!-- <button> <a href=""></a> Reset</button> -->
      
              <h3 class="password"> Users password is ${this.data.url}</h3>
          </div>
      </body>
      </html>`,
    };
    try {
      return await this.sendEmail(mailData);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default Emailing;
