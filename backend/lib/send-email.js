import { config } from "dotenv";
import nodemailer from "nodemailer"
config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});


async function sendVerificationEmail(to, code) {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e5e7eb; border-radius: 10px; max-width: 520px; margin: auto;">
            <h2 style="color: #111827; margin-bottom: 10px;">Bienvenue sur <span style="color:#2563eb;">StageLink</span> 👋</h2>
            
            <p style="color: #374151; font-size: 15px;">
                Merci pour votre inscription. Pour finaliser la création de votre compte, veuillez utiliser le code de vérification ci-dessous :
            </p>

            <div style="margin: 24px 0; text-align: center;">
                <span style="display: inline-block; font-size: 24px; letter-spacing: 4px; font-weight: bold; color: #2563eb;">
                    ${code}
                </span>
            </div>

            <p style="color: #374151; font-size: 14px;">
                Ce code est valable pour une durée limitée. Ne le partagez avec personne.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

            <p style="font-size: 13px; color: #6b7280;">
                Si vous n’êtes pas à l’origine de cette inscription, vous pouvez ignorer cet email en toute sécurité.
            </p>

            <p style="font-size: 12px; color: #9ca3af;">
                © ${new Date().getFullYear()} StageLink. Tous droits réservés.
            </p>
        </div>
    `;

    const textContent = `
Bienvenue sur StageLink !

Merci pour votre inscription.
Votre code de vérification est : ${code}

Ce code est valable pour une durée limitée.
Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.

— StageLink
    `;

    try {
        await transporter.sendMail({
            from: `"StageLink" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Code de vérification – StageLink",
            html: htmlContent,
            text: textContent
        });
    } catch (error) {
        throw new Error(error.message);
    }
}


export { sendVerificationEmail }