import * as nodemailer from 'nodemailer';

export async function mail(mailDto: {
  destination: string,
  content: string,
  subject: string,
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string
  },
  tls: {
    rejectUnauthorized: boolean
  }
}): Promise<any> {
  return new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
      host: mailDto.host,
      port: mailDto.port,
      secure: mailDto.secure,
      auth: mailDto.auth,
      tls: mailDto.tls
    });
    const options = {
      from: mailDto.auth.user,
      to: mailDto.destination,
      subject: mailDto.subject,
      html: mailDto.content
    };
    transport.sendMail(options, (e, response) => {
      if (e) {
        reject({
          status: 500,
          message: e
        });
      } else {
        resolve({
          success: true,
          message: 'Please confirm your account using link we have sent to your email.'
        });
      }
    });
  });
}

// async function sms(mailDto) {
//   return new Promise((resolve, reject) => {

//   })
// }

// export async function send(data: NotifDto, types: string[]): Promise<object[]> {
//   let results: object[] = [];
//   if (types.indexOf('mail') != -1) {
//     const result = await mail(data);
//     results.push(result);
//   }
//   if (types.indexOf('sms') != -1) {
//     const result = await sms(data);
//     results.push(result);
//   }
//   return results;
// }