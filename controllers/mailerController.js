const nodemailer = require("nodemailer");

const sendEmail = async (mail) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "gmoliva.dev@gmail.com", // generated ethereal user
            pass: "gponprngtrvgglwy", // generated ethereal password
        },
    });

    let directory = [
        "matias.vilche1901@alumnos.ubiobio.cl",
        "benjamin.oyarzo1801@alumnos.ubiobio.cl",
        "norman.vergara1901@alumnos.ubiobio.cl"

    ]

    const msg = {
        from: '"Mankekes Platform 👻" <noreply@mankekesIECI.com>', // sender address
        to: directory, // list of receivers
        subject: "It works!", // Subject line
        text: "Este correo se envia de forma automatica a los maricones. Favor no responder.", // plain text body
        // html: "<b>Hello world?</b>", // html body
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    //if(info.messageId)	return res.status(201).send({msg: "mail sent"});
    //else return res.status(400).send({msg : "mail could not be sent"})
    if (info.messageId) return console.log("mail sent")
    else return console.log("mail could not be sent")
}



module.exports = {
    sendEmail

}