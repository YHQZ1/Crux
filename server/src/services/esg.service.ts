import { supabase } from "../config/supabase.js";
import { ESGInput } from "../types/index.js";

export const calculateESGScore = (inputs: ESGInput): number => {
  const energyScore = Math.max(0, 100 - inputs.energy_consumption / 100);
  const wasteScore = Math.max(0, 100 - inputs.waste_generated / 50);
  const socialScore = Math.min(
    100,
    (inputs.training_hours / inputs.employee_count) * 20,
  );
  const complianceScore = inputs.compliance_score;
  return Math.round(
    (energyScore + wasteScore + socialScore + complianceScore) / 4,
  );
};

export const saveESGResult = async (userId: string, inputs: ESGInput) => {
  const score = calculateESGScore(inputs);

  const { data, error } = await supabase
    .from("esg_results")
    .insert([{ user_id: userId, score, inputs }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { score, result: data };
};

export const getESGHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from("esg_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
