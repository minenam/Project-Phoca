import * as dotenv from "dotenv";

dotenv.config();

export default () => ({
  email: {
    // transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
    transport: {
      service: "Gmail",
      host: `${process.env.EMAIL_HOST}`,
      port: 587,
      ignoreTLS: false,
      secure: true,
      auth: {
        user: process.env.EMAIL_AUTH_EMAIL,
        pass: process.env.EMAIL_AUTH_PASSWORD,
      },
    },
    defaults: {
      from: `'${process.env.EMAIL_USERNAME}' <${process.env.EMAIL_AUTH_EMAIL}>`,
    },
  },
});
