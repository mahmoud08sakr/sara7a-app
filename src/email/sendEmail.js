import nodemailer from 'nodemailer'
import { emailTamplate } from './emailTamplate.js';
export async function sendEmail(data) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "mahmoud23mostafa@gmail.com",
            pass: "ppnyntmyulttyeug",
        },
    });


    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <sfssd@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: emailTamplate(data.api) , // html body
    });

    console.log("Message sent: %s", info.messageId);

}