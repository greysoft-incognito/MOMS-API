import formData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../../config/config';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: <string>config.mailgun.apiKey,
  public_key: <string>config.mailgun.public_key,
  //url: 'api.mailgun.net',
});

export default mg;
