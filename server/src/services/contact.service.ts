import { supabase } from "../config/supabase.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const saveContact = async (form: any) => {
  const { error } = await supabase.from("contacts").insert([form]);
  if (error) throw new Error(error.message);

  const emailPayload = {
    from: "CRUX System <onboarding@resend.dev>",
    to: [process.env.NOTIFY_EMAIL!],
    subject: `New Lead: ${form.company || "General Inquiry"}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #000; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 40px;">
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid #000; padding-bottom: 15px; margin-bottom: 30px;">
          Operational Inquiry Received
        </h2>
        <div style="margin-bottom: 20px;">
          <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0 0 5px 0;">Client Name</p>
          <p style="margin: 0; font-size: 16px;">${form.name}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0 0 5px 0;">Corporate Identity</p>
          <p style="margin: 0; font-size: 16px;">${form.email} // ${form.company}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <p style="font-size: 10px; text-transform: uppercase; color: #888; margin: 0 0 5px 0;">Target Sector</p>
          <p style="margin: 0; font-size: 16px;">${form.service}</p>
        </div>
        <div style="background: #f4f4f4; padding: 25px; border-left: 2px solid #000; margin-top: 30px;">
          <p style="margin: 0; font-size: 15px; line-height: 1.6; font-style: italic;">"${form.message}"</p>
        </div>
        <p style="font-size: 9px; color: #aaa; margin-top: 50px; text-transform: uppercase; letter-spacing: 2px;">
          Authorized Dispatch // CRUX Systems 2026
        </p>
      </div>
    `,
  };

  resend.emails.send(emailPayload).catch(() => {});

  return { success: true };
};
