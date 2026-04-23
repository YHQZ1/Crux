import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const ESGCalculator = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    energy_consumption: 5000,
    waste_generated: 100,
    employee_count: 50,
    training_hours: 200,
    compliance_score: 80,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/api/esg", inputs);
      navigate("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  const borderStyle = { borderColor: "var(--border-color)" };
  const sliderClass =
    "w-full h-1 bg-[color:var(--border-color)] appearance-none outline-none accent-[color:var(--accent)] cursor-pointer mt-6 transition-all";

  return (
    <main
      className="w-full min-h-screen pt-32 pb-20 px-6 md:px-16"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-2 block">
              Operational Diagnostic / PHASE 0{step}
            </span>
            <h1
              className="text-4xl font-bold tracking-tighter uppercase"
              style={{ color: "var(--text-base)" }}
            >
              ESG{" "}
              <span style={{ color: "var(--text-muted)" }}>Calculator.</span>
            </h1>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="h-1 flex-grow md:w-12 transition-all duration-700"
                style={{
                  backgroundColor:
                    s <= step ? "var(--accent)" : "var(--border-color)",
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="p-8 md:p-16 border"
          style={{ ...borderStyle, backgroundColor: "var(--bg-surface)" }}
        >
          {step === 1 && (
            <div className="flex flex-col gap-12">
              <div className="space-y-1">
                <h2 className="text-xl font-medium tracking-tight">
                  Environmental Metrics
                </h2>
                <p className="text-xs opacity-40 uppercase tracking-widest">
                  Input direct resource usage data
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between opacity-60">
                    Energy Consumption (kWh){" "}
                    <span className="font-mono text-[14px] text-[color:var(--text-base)]">
                      {inputs.energy_consumption.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    name="energy_consumption"
                    min="1000"
                    max="10000"
                    step="100"
                    value={inputs.energy_consumption}
                    onChange={handleInputChange}
                    className={sliderClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between opacity-60">
                    Waste Generated (kg){" "}
                    <span className="font-mono text-[14px] text-[color:var(--text-base)]">
                      {inputs.waste_generated}
                    </span>
                  </label>
                  <input
                    type="range"
                    name="waste_generated"
                    min="0"
                    max="500"
                    step="5"
                    value={inputs.waste_generated}
                    onChange={handleInputChange}
                    className={sliderClass}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-12">
              <div className="space-y-1">
                <h2 className="text-xl font-medium tracking-tight">
                  Social & Safety Metrics
                </h2>
                <p className="text-xs opacity-40 uppercase tracking-widest">
                  Employee welfare and training benchmarks
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between opacity-60">
                    Workforce Size{" "}
                    <span className="font-mono text-[14px] text-[color:var(--text-base)]">
                      {inputs.employee_count}
                    </span>
                  </label>
                  <input
                    type="range"
                    name="employee_count"
                    min="10"
                    max="500"
                    value={inputs.employee_count}
                    onChange={handleInputChange}
                    className={sliderClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between opacity-60">
                    Annual Training (Hours){" "}
                    <span className="font-mono text-[14px] text-[color:var(--text-base)]">
                      {inputs.training_hours}
                    </span>
                  </label>
                  <input
                    type="range"
                    name="training_hours"
                    min="0"
                    max="2000"
                    step="10"
                    value={inputs.training_hours}
                    onChange={handleInputChange}
                    className={sliderClass}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-12">
              <div className="space-y-1">
                <h2 className="text-xl font-medium tracking-tight">
                  Governance & Compliance
                </h2>
                <p className="text-xs opacity-40 uppercase tracking-widest">
                  Internal audits and regulatory health
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest flex justify-between opacity-60">
                    Compliance Audit Score{" "}
                    <span className="font-mono text-[14px] text-[color:var(--text-base)]">
                      {inputs.compliance_score}%
                    </span>
                  </label>
                  <input
                    type="range"
                    name="compliance_score"
                    min="0"
                    max="100"
                    value={inputs.compliance_score}
                    onChange={handleInputChange}
                    className={sliderClass}
                  />
                </div>
              </div>

              <div
                className="p-8 border bg-[color:var(--bg-base)]"
                style={borderStyle}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(inputs)
                    .slice(0, 4)
                    .map(([key, val]) => (
                      <div key={key}>
                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-40 block mb-1">
                          {key.replace("_", " ")}
                        </span>
                        <span className="text-sm font-mono">{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-16 md:mt-20 flex justify-between items-center gap-6">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 cursor-pointer transition-opacity"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[color:var(--accent)] hover:text-white transition-all cursor-pointer border border-[color:var(--text-base)]"
                style={{
                  backgroundColor: "var(--text-base)",
                  color: "var(--bg-base)",
                }}
              >
                Next Phase
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-10 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                style={{ backgroundColor: "var(--accent)", color: "white" }}
              >
                {loading ? "Analyzing..." : "Record Dispatch"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
