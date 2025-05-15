
import nodemailer from "nodemailer"

export default async function connectEmail(){
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME, // Set this environment variable
                pass: process.env.EMAIL_PASSWORD  // Set this environment variable
            },
        });

    return transporter;
  } catch (error) {
    console.error('Failed to create transporter:', error);
    throw error;
  }
};

