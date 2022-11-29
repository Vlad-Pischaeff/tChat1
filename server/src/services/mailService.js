'use strict';

const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    async sendResetPasswordMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Reset password',
            test: '',
            html: `
                <div>
                    <p>chat application</p>
                    </hr>
                    <a href="${link}">Click for reset password</a>
                </div>
            `
        })
    }
}

module.exports = new MailService();
