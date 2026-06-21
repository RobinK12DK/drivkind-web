import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, phone, businessName, type, plan, message } = await request.json()

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'robin@drivkind.co.za',
      replyTo: email,
      subject: `New DRIVKIND. Enquiry — ${businessName || name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Business / Dealership: ${businessName || 'Not provided'}`,
        `Type: ${type || 'Not provided'}`,
        `Plan interested in: ${plan || 'Not provided'}`,
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
