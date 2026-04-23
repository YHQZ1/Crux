import { supabase } from "../config/supabase.js";
import { ContactForm } from "../types/index.js";

export const saveContact = async (form: ContactForm) => {
  const { error } = await supabase.from("contacts").insert([form]);
  if (error) throw new Error(error.message);
  return { message: "Message received, we will get back to you soon." };
};
