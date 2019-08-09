import MailGun from 'mailgun-js';

const mailGunClient = new MailGun({
	apiKey: process.env.MAILGUN_API_KEY || '',
	domain: ''
});
