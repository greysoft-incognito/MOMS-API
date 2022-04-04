import 'dotenv/config';

export default {
  mongodb: {
    url: process.env.MONGODB_URI,
    //secret: "!&!&OJpWXnDtB0eju7OE!zDp20G1JC%6bpq2",
  },

  seeder: {
    email: process.env.SEEDER_EMAIL,
    password: process.env.SEEDER_PASSWORD,
  },

  sessionToken: process.env.SESSION_TOKEN,

  redis: {
    url: process.env.REDIS_URL,
  },

  //   facebook: {
  //     clientID: process.env.FACEBOOK_CLIENT_ID,
  //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  //   },

  //   google: {
  //     clientID: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     callbackURL: process.env.GOOGLE_CALLBACK_URL,
  //   },

  //   firebase: {
  //     private_key: process.env.private_key,
  //     client_email: process.env.client_email,
  //     client_x509_cert_url: process.env.client_x509_cert_url,
  //   },

  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_STORAGE_BUCKET_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    timeout: process.env.JWT_TIMEOUT,
  },

  app: {
    ROLE: {
      ADMIN: 'ADMIN',
    },
  },

  port: process.env.PORT,
  //   admin: {
  //     email: process.env.DEFAULT_ADMIN_EMAIL,
  //     password: process.env.DEFAULT_ADMIN_PASSWORD,
  //   },

  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
