interface EmailTemplateProps {
  name: string;
  resetLink: string;
}

export default ({ name, resetLink }: EmailTemplateProps) => {
  return `
    <div style="width: 60%; margin-left: auto; margin-right: auto; 
    ">
      <h1 style="font-size: 1.25rem; text-align: center; font-family: 'Playfair Display', serif;
      ">
        Forgot Password
      </h1>

      <p style="font-size: 1.1rem; font-family: 'Montserrat', sans-serif;;
      ">
        Hi, ${name}
      </p>

      <p style="font-size: 1.0rem; font-family: 'Montserrat', sans-serif;;
      ">
        You recently requested a password reset. To reset your password, please click the the button below:
      </p>

      <a style="padding: 1rem 1rem; background-color: #d4af37; border-radius: 4px; width: 150px; color: #fff; display: grid; text-align: center; place-items: center; cursor: pointer; font-size: 1.1rem; text-decoration: none; font-family: 'Sniglet', cursive !important;
      " href="${resetLink}">
        Reset Password
      </a>

      <p style="font-size: 1.1rem; font-family: 'Montserrat', sans-serif;;
      ">
        This link will expire in 2 hours. If you do not reset your password within that time, you will need to request a new password reset.
        If you did not request a password reset, please ignore this email.
      </p>
    </div>
  `;
};