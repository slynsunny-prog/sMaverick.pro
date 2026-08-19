import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { to, pdfBase64, customerName } = await req.json();

    await resend.emails.send({
      from: 'sMAVERICK <onboarding@resend.dev>',
      to: [to],
      subject: `Your sMAVERICK Solar Audit Report - ${customerName}`,
      html: `<p>Hi ${customerName},</p><p>Attached is your Solar Energy Audit Report from sMAVERICK.</p>`,
      attachments: [
        {
          filename: `sMAVERICK-Report-${customerName}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}