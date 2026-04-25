import nodemailer from 'nodemailer';

let transporter;

// Create a transporter using Ethereal Email for development
const getTransporter = async () => {
  if (transporter) return transporter;

  // Create a test account if no credentials are provided in env
  const testAccount = await nodemailer.createTestAccount();
  
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log(`[Email Service] Test account created: ${testAccount.user}`);
  return transporter;
};

export const sendOTPEmail = async (email, otp) => {
  try {
    const client = await getTransporter();
    
    const info = await client.sendMail({
      from: '"WealthVerse Verification" <verify@wealthverse.com>',
      to: email,
      subject: "Your WealthVerse Verification Code",
      text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>WealthVerse Verification</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #10b981; padding: 10px; border: 1px solid #ddd; display: inline-block; border-radius: 8px;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log(`[Email Service] OTP sent to ${email}`);
    console.log(`[Email Service] View email here: ${nodemailer.getTestMessageUrl(info)}`);
    
    return { success: true, messageUrl: nodemailer.getTestMessageUrl(info) };
  } catch (error) {
    console.error('[Email Service] Error sending email:', error);
    throw error;
  }
};
