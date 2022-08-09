import "dotenv/config";
import nodemailer from "nodemailer"

function formatMessageText({name, email, phone, message}) {
  return `
New contact form submission received at ${(new Date()).toString()}

Name: ${name}
Email: ${email}
Phone: ${phone ?? ""}
Message:
${message}

`
}

async function main() {
  const {GMAIL_EMAIL, GMAIL_APP_PASSWORD, RECIPIENT_EMAIL} = process.env;

  const submissionData = {
    "name": "Michael G. Scott",
    "email": "worlds.best.boss@dundermifflin.com",
    "message": "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me."
  }

  const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_APP_PASSWORD
    }
  });

  const result = await client.sendMail(
    {
      from: GMAIL_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `Portfolio Contact Form: ${submissionData.name}`,
      text: formatMessageText(submissionData)
    }
  )

  console.log(result);


}

main();