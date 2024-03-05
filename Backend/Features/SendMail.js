import nodemailer from 'nodemailer';
import { EmployeesModel, UsersInfoModel } from '../Model.js';

function generateOTP(length) {
    let str = "";
    for (let i = 1; i <= length; i++) {
        str += Math.round(Math.random() * 9)
    }
    return str
}


let sendMail = (app) => {
    app.post("/sendOtp", async (req, res) => {
        try {
            const { email } = req.body;
            const OTP = generateOTP(6);
            const updatedObject = await EmployeesModel.findOneAndUpdate({ email }, { tempOTP: OTP });
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'apps@ceoitbox.com',
                    pass: 'bdrafmwnojwxijuu'
                }
            });
            const mailOptions = {
                from: 'apps@ceoitbox.com',
                to: email,
                subject: 'OTP',
                html: EmailTemplate(OTP)
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send({ status: "OTP Sent !" })
        } catch (err) {
            console.log(err)
        }
    })
}
let sendMailToolList = (app) => {
    app.post("/sendOtpToolList", async (req, res) => {
        try {
            const { email, loginAs } = req.body;
            const OTP = generateOTP(6);
            if (loginAs == "Admin") {
                const updatedObject = await EmployeesModel.findOneAndUpdate({ email }, { tempOTP: OTP });
            }
            else {
                const updatedObject = await UsersInfoModel.findOneAndUpdate({ email }, { tempOTP: OTP });
            }
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'apps@ceoitbox.com',
                    pass: 'bdrafmwnojwxijuu'
                }
            });
            const mailOptions = {
                from: 'apps@ceoitbox.com',
                to: email,
                subject: 'OTP',
                html: EmailTemplate(OTP)
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });



            res.send({ status: "OTP Sent !" })
        } catch (err) {
            console.log(err)
        }
    })
}


export { sendMail, sendMailToolList }





function EmailTemplate(OTP) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .otp-section {
                background-color: #f8f8f8;
                padding: 15px;
                text-align: center;
                border-radius: 4px;
            }
    
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
    
            .instructions {
                margin-top: 20px;
                text-align: center;
                color: #777;
            }
    
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #888;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h2>OTP Verification</h2>
            </div>
            <div class="otp-section">
                <p class="otp">Your OTP is: <span style="color: #e44d26;">${OTP}</span></p>
            </div>
            <p class="instructions">Please use the above OTP to complete your verification process.</p>
            <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
            </div>
        </div>
    </body>
    
    </html>
    `
}