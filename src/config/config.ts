import 'dotenv/config';

export default {
  mongodb: {
    url: process.env.MONGODB_URI,
  },

  seeder: {
    email: process.env.SEEDER_EMAIL,
    password: process.env.SEEDER_PASSWORD,
  },

  sessionToken: process.env.SESSION_TOKEN,

  redis: {
    url: process.env.REDIS_URL,
  },

  facebook: {
    clientID: <string>process.env.FACEBOOK_CLIENT_ID,
    clientSecret: <string>process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: <string>process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'first_name', 'last_name', 'email', 'picture'],
  },

  google: {
    clientID: <string>process.env.GOOGLE_CLIENT_ID,
    clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: <string>process.env.GOOGLE_CALLBACK_URL,
  },

  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_STORAGE_BUCKET_NAME,
    reigon: process.env.AWS_BUCKET_REGION,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    timeout: process.env.JWT_TIMEOUT,
  },

  port: process.env.PORT,

  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    public_key: process.env.MAILGUN_PUB_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
  emailAccount: {
    name: process.env.MG_EMAIL_SENDER,
    email: process.env.MG_EMAIL_ACCOUNT,
  },

  docs: process.env.DOCS
};
