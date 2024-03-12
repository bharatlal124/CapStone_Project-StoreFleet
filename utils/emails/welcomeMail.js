import nodemailer from "nodemailer";

//Welcome Email sending function....
export const sendWelcomeEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.STORFLEET_SMPT_MAIL,
        pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.STORFLEET_SMPT_MAIL, // replace with your email
      to: user.email,
      subject: "Welcome to Storefleet",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              /* Add your custom CSS styles here */
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  color: purple;
              }
              .header {
                  text-align: center;
              }
              .logo {
                  max-width: 150px;
              }
              .content {
                  margin-top: 20px;
                 
              }
              .button {
                  display: block;
                  padding: 10px 20px;
                  background-color: #20d49a;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  text-align: center;
                  margin:auto;
                  width:100px;
                  height:20px;
                  
                
              }
             
              .userName{
                    text-align: center;
                  }
              /* Mobile Responsive Styles */
              @media only screen and (max-width: 600px) {
                  .container {
                      padding: 10px;
                  }
                  .logo {
                      max-width: 100px;
                  }
                  .button {
                      display: block;
                      margin-top: 10px;
                      text-align: center;
                      
                  }
                  .userName{
                    text-align: center;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
                  <h1>Welcome to Storefleet</h1>
              </div>
              <div class="content">
                  <p class="userName">Hello, ${user.name}</p>
                  <p>Thank you for registering with Storefleet, We're excited to have you as a new member of our community</p>
                  <p><a class="button" href="#">Get Started</a></p>
              </div>
          </div>
      </body>
      </html>
      `,

      // text: `Dear ${user.name},\n\nWelcome to StoreFleet! We are excited to have you on board.\n\nBest regards,\nStoreFleet Team`,
    };

    // Send the email...
    await transporter.sendMail(mailOptions);

    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
