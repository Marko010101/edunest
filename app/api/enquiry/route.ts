import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Edunest <info@studywithedunest.com>'
const TO = 'info@studywithedunest.com'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, phone, state, city, message } = body

  if (!name || !email || !phone || !state || !city) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const messageRow = message
    ? `<tr>
        <td colspan="2" style="padding:10px 0;border-top:1px solid #f3f4f6;">
          <p style="margin:0 0 6px;color:#637085;font-weight:600;font-size:15px;">Message</p>
          <p style="margin:0;color:#1C2B3A;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</p>
        </td>
       </tr>`
    : ''

  try {
    const { error: resendError } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email as string,
      subject: `New Enquiry — ${name} (${city}, ${state})`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#0C2340;padding:24px 28px;">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">New Student Enquiry</h1>
            <p style="margin:4px 0 0;color:#C8972A;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">via studywithedunest.com</p>
          </div>
          <div style="padding:28px;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#1C2B3A;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:110px;color:#637085;font-weight:600;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#637085;font-weight:600;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="color:#0C2340;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#637085;font-weight:600;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="tel:+91${phone}" style="color:#0C2340;">+91 ${phone}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#637085;font-weight:600;">State</td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">${state}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;${message ? 'border-bottom:1px solid #f3f4f6;' : ''}color:#637085;font-weight:600;">City</td>
                <td style="padding:10px 0;${message ? 'border-bottom:1px solid #f3f4f6;' : ''}">${city}</td>
              </tr>
              ${messageRow}
            </table>
            <p style="margin:24px 0 0;font-size:13px;color:#637085;line-height:1.6;">
              Hit <strong>Reply</strong> to contact this student directly — reply-to is set to their email address.
            </p>
          </div>
        </div>
      `,
    })

    if (resendError) {
      console.error('[Resend] send rejected:', resendError)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Resend] unexpected error:', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
