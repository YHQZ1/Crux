import { supabase } from "../config/supabase.js";
import { ESGInput } from "../types/index.js";

export const calculateESGScore = (inputs: ESGInput): number => {
  const energyScore = Math.max(0, 100 - inputs.energy_consumption / 100);
  const wasteScore = Math.max(0, 100 - inputs.waste_generated / 5);

  const trainingRatio =
    inputs.employee_count > 0
      ? (inputs.training_hours / inputs.employee_count) * 5
      : 0;

  const socialScore = Math.min(100, trainingRatio);
  const complianceScore = inputs.compliance_score;

  return Math.round(
    (energyScore + wasteScore + socialScore + complianceScore) / 4,
  );
};

export const saveESGResult = async (userId: string, inputs: ESGInput) => {
  const score = calculateESGScore(inputs);

  const { data, error } = await supabase
    .from("esg_results")
    .insert([
      {
        user_id: userId,
        score,
        energy_consumption: inputs.energy_consumption,
        waste_generated: inputs.waste_generated,
        employee_count: inputs.employee_count,
        training_hours: inputs.training_hours,
        compliance_score: inputs.compliance_score,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { score, id: data.id };
};

export const getESGHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from("esg_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};
