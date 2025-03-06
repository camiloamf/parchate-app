import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

    const { name, email, message, captchaToken } = req.body;

    if (!name || !email || !message || !captchaToken) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET!,
            response: captchaToken,
        }).toString(),
    });

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
        return res.status(400).json({ error: "reCAPTCHA inválido" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    try {
        await transporter.sendMail({
            from: "camiloamf22@gmail.com",
            to: "camiloamf@hotmail.com, camiloamf22@gmail.com",
            subject: `Prueba Técnica Full Stack Parchate, ${name}`,
            text: `Correo: ${email}\n\nMensaje:\n${message}`,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
}
