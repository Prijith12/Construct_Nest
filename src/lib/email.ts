"use server"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async (data: EmailData) => {
    try {
        const subject = data.serviceRequest
        ? "Ordered Product/Service Provider"
        : "Service Provider Request Call";
      const response=  await resend.emails.send({
            from: `${process.env.DOMAIN_EMAIL}`,
            to: `${process.env.ADMIN_EMAIL}`,
            subject,
            html: `
        <h1>User Details</h1>
        <ul>
          <li><strong>Name:</strong> ${data.name||''}</li>
          <li><strong>Service:</strong> ${data.service||''}</li>
          <li><strong>Location:</strong> ${data.location||''}</li>
          <li><strong>Mobile:</strong> ${data.mobile||''}</li>
          <li><strong>Product:</strong> ${data.product||''}</li>
        </ul>
      `,
        });
        if(response.error==null){
            return true;
        }else{
            return false;
        }
    } catch (e) {
        return false;
    }
}
type EmailData={
    serviceRequest:boolean
    name?: string;
    service?: string;
    location?: string;
    mobile?: string;
    product?:string
}