export interface User {
  id: string;
  email: string;
  password: string;
  role: "admin" | "client";
  created_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export interface ESGInput {
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
