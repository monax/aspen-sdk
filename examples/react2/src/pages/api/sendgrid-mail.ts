import sgMail from "@sendgrid/mail";

export const sendMail = async (email: string) => {
  const url =
    "https://app.aspenft.io/137/contract/0xD2e92A26E6D19Fd8aa0a059A23CFAb73e5471De8?pad=85c046e625";
  const to = email;

  const msg = {
    to,
    from: "noreply@aspenft.io",
    subject: "Your Unique NFT URL",
    html: `Click <a href='${url}'>here</a> to claim!`,
  };
  sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY!);
  try {
    await sgMail.send(msg);
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
