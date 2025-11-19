import nodemailer from 'nodemailer'

export async function sendWelcomeEmail({ to, name }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(
      '[AI Resume Builder] Email credentials are not configured. Skipping welcome email.',
    )
    return
  }

  const defaultPort = Number(process.env.EMAIL_PORT) || 587
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: defaultPort,
    secure: defaultPort === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const message = {
    from: {
      name: 'AI Resume Builder',
      address: process.env.EMAIL_USER,
    },
    to,
    subject: 'Welcome to AI Resume Builder',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hello ${name},</h2>
        <p>Welcome to AI Resume Builder! Your account has been created successfully.</p>
        <p>You can now sign in and start:</p>
        <ul>
          <li>Generating ATS-friendly resumes tailored to each role</li>
          <li>Creating AI-powered cover letters</li>
          <li>Reviewing ATS score insights for your resume</li>
        </ul>
        <p>Log in to your workspace and start building job-winning applications.</p>
        <p>— The AI Resume Builder team</p>
      </div>
    `,
  }

  console.log('Sending welcome email to:', to)
  await transporter.sendMail(message)
  console.log('Welcome email sent OK')
}

