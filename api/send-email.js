import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Form data is missing" });
    }

    const {
      fullName,
      phoneNumber,
      email,
      state,
      accidentTiming,
      fault,
      injuryType,
      medicalVisits,
      hasAttorney,
      injurySeverity,
      accidentDetails,
      accidentInUS,
    } = formData;

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "n@770goodlaw.com",
        pass: "Alm564894",
      },
    });

    const mailOptions = {
      from: '"Goodlaw Calculator" <n@770goodlaw.com>',
      to: "n@770goodlaw.com",
      subject: `New Form Submission from ${fullName}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Accident in US:</strong> ${accidentInUS === 'yes' ? 'Yes' : 'No'}</p>
        <p><strong>Accident Timing:</strong> ${accidentTiming}</p>
        <p><strong>Fault:</strong> ${fault}</p>
        <p><strong>Injury Type:</strong> ${injuryType}</p>
        <p><strong>Medical Visits:</strong> ${medicalVisits}</p>
        <p><strong>Has Attorney:</strong> ${hasAttorney}</p>
        <p><strong>Injury Severity:</strong> ${injurySeverity}</p>
        <p><strong>Accident Details:</strong> ${accidentDetails || 'Not provided'}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
