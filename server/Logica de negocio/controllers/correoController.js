const pdfMake = require('pdfmake/build/pdfmake'); // Importa pdfmake
const pdfFonts = require('pdfmake/build/vfs_fonts'); // Importa pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { Resend } = require('resend');
const resend = new Resend('re_WwuHKvU2_JTbUSKJMktJiGMT4je28fvRX');

async function generatePdf(pdfDefinition) {
    return new Promise((resolve, reject) => {
        const pdfDoc = pdfMake.createPdf(pdfDefinition);
        pdfDoc.getBuffer((buffer) => {
            resolve(buffer);
        });
    });
}

async function enviarCorreoPrueba(req, res) {
    const pdfDefinition = {
        content: [{
            text: 'Correo de prueba'
        }]
    }
    try {
        const pdfBuffer = await generatePdf(pdfDefinition);
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'dazawebtutoriales@gmail.com',
            subject: 'Hello World',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
            attachments: [{
                filename: 'invoice.pdf',
                content: pdfBuffer,
            }, ],
        });
        res.status(200).send("Correo enviado correctamente");
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    enviarCorreoPrueba
}