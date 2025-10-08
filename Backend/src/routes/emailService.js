const nodemailer = require("nodemailer");

/**
 * Configure SMTP transporter for sending emails
 * Supports various email providers (Gmail, Outlook, custom SMTP servers)
 */
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,       // SMTP server hostname (e.g., smtp.gmail.com for Gmail)
  port: process.env.SMTP_PORT || 587,       // SMTP port: 587 (TLS), 465 (SSL), 25 (unsecured)
  secure: process.env.SMTP_PORT === '465',  // true for port 465 (SSL), false for other ports (TLS/STARTTLS)
  auth: {
    user: process.env.SMTP_USER,     // sender email address
    pass: process.env.SMTP_PASSWORD  // email password or app-specific password (recommended for Gmail)
  },
  // Optional: connection timeout and socket timeout settings
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 60000      // 60 seconds
});

/**
 * Validates email parameters before sending
 * @param {string} to - recipient email address
 * @param {string} subject - email subject line
 * @param {string} html - HTML content of the email
 * @returns {object} validation result with isValid flag and error message
 */
const validateEmailParams = (to, subject, html) => {
  const errors = [];
  
  if (!to || typeof to !== 'string' || !to.includes('@')) {
    errors.push('Valid recipient email address is required');
  }
  
  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    errors.push('Email subject is required');
  }
  
  if (!html || typeof html !== 'string' || html.trim().length === 0) {
    errors.push('Email content is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Sends an email using the configured SMTP transporter
 * @param {string} to - recipient email address
 * @param {string} subject - email subject line
 * @param {string} html - HTML content of the email
 * @returns {Promise<boolean>} - true if email sent successfully, false otherwise
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Validate input parameters
    const validation = validateEmailParams(to, subject, html);
    if (!validation.isValid) {
      console.error("[EmailService] Validation Error:", validation.errors.join('; '));
      return false;
    }

    // Check if required environment variables are configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("[EmailService] Configuration Error: Missing required SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASSWORD)");
      return false;
    }

    // Attempt to send the email
    const info = await transporter.sendMail({
      from: `"AlgoVisualizer" <${process.env.SMTP_USER}>`,
      to: to.trim(),
      subject: subject.trim(),
      html: html,
    });
    
    console.log("[EmailService] Success: Email sent successfully with messageId:", info.messageId);
    return true;
    
  } catch (error) {
    // Provide detailed error logging based on error type
    if (error.code === 'EAUTH') {
      console.error("[EmailService] Authentication Error: Invalid SMTP credentials. Please check SMTP_USER and SMTP_PASSWORD environment variables.");
    } else if (error.code === 'ECONNECTION') {
      console.error("[EmailService] Connection Error: Unable to connect to SMTP server. Please check SMTP_HOST and SMTP_PORT settings.");
    } else if (error.code === 'ETIMEDOUT') {
      console.error("[EmailService] Timeout Error: SMTP server connection timed out. The server may be slow or unreachable.");
    } else {
      console.error("[EmailService] Unexpected Error:", {
        message: error.message,
        code: error.code,
        command: error.command,
        stack: error.stack
      });
    }
    
    return false;
  }
};

/**
 * Verifies the SMTP connection configuration
 * @returns {Promise<boolean>} - true if connection is successful, false otherwise
 */
const verifyConnection = async () => {
  try {
    const isConnected = await transporter.verify();
    if (isConnected) {
      console.log("[EmailService] Connection Verified: SMTP server connection is working properly");
      return true;
    }
  } catch (error) {
    console.error("[EmailService] Connection Verification Failed:", {
      message: error.message,
      code: error.code
    });
    return false;
  }
};

module.exports = { 
  sendEmail,
  verifyConnection
};
