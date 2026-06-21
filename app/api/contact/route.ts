import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, type, message } = await request.json()

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'robin@drivkind.co.za',
      replyTo: email,
      subject: `New DRIVKIND. Enquiry — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Type: ${type || 'Not provided'}`,
        ``,
        `Message:`,
        message,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
