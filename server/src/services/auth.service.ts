import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";

export const registerUser = async (
  email: string,
  password: string,
  role = "client",
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, role }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return { id: data.id, email: data.email, role: data.role };
};

export const loginUser = async (email: string, password: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};
