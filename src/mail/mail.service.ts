import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.126.com', // 你的邮件服务器地址
            auth: {
                user: 'bytebeyong@126.com', // 邮箱地址
                pass: 'KBBDHDLKKASFXAWS', // 邮箱密码
            },
        });
    }
    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'bytebeyong@126.com',
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
