export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  created_at: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  created_at: string;
}

export interface ESGInput {
  id: string;
  user_id: string;
  created_at: string;
  energy_consumption: number;
  waste_generated: number;
  employee_count: number;
  training_hours: number;
  compliance_score: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}
