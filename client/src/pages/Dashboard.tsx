/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

interface ESGResult {
  id: string;
  score: number;
  inputs: any;
  created_at: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<ESGResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get("/api/esg/history");
        // Sort results chronologically (oldest to newest) for the charts
        const sortedData = response.data.sort(
          (a: ESGResult, b: ESGResult) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        setResults(sortedData);
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const borderStyle = { borderColor: "var(--border-color)" };

  // --- DYNAMIC DATA PROCESSING ---

  // 1. Top Stats
  const totalReports = results.length;
  const avgScore =
    totalReports > 0
      ? Math.round(
          results.reduce((acc, curr) => acc + curr.score, 0) / totalReports,
        )
      : 0;
  const latestScore = totalReports > 0 ? results[results.length - 1].score : 0;

  // 2. Line Chart Data (Trend over time)
  const performanceData = results.map((res) => ({
    date: new Date(res.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    score: res.score,
  }));

  // 3. Radar Chart Data (Latest breakdown based on DB inputs)
  // We dynamically map whatever keys are in your JSON inputs (e.g., carbon, waste)
  const latestInputs =
    totalReports > 0 ? results[results.length - 1].inputs : {};
  const radarData = Object.entries(latestInputs || {}).map(([key, val]) => ({
    subject: key.toUpperCase(),
    A: Number(val) || 0,
    fullMark: 100, // Adjust this max scale if your inputs go higher than 100
  }));

  if (loading) {
    return (
      <main className="min-h-screen bg-[color:var(--bg-base)] flex items-center justify-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse opacity-50">
          Syncing Operational Data...
        </div>
      </main>
    );
  }

  return (
    <main
      className="w-full min-h-screen pt-32 pb-20 px-6 md:px-16"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-2 h-2"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
              Portal // ID: {user?.id.slice(0, 8)}
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase"
            style={{ color: "var(--text-base)" }}
          >
            <span style={{ color: "var(--text-muted)" }}>
              {user?.name}'s <br />
            </span>
            Control Center
          </h1>
        </div>
        <button
          onClick={() => navigate("/esg-calculator")}
          className="px-8 py-4 border border-[color:var(--border-color)] text-[10px] font-bold uppercase tracking-widest hover:bg-[color:var(--text-base)] hover:text-[color:var(--bg-base)] transition-all"
        >
          Initiate New Audit
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
          className="p-10 border flex flex-col justify-between min-h-[180px] bg-[color:var(--bg-surface)]"
          style={borderStyle}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            Avg. Operational Score
          </span>
          <span
            className="text-6xl font-light tracking-tighter"
            style={{ color: "var(--accent)" }}
          >
            {totalReports > 0 ? avgScore : "--"}
          </span>
        </div>
        <div
          className="p-10 border flex flex-col justify-between min-h-[180px] bg-[color:var(--bg-surface)]"
          style={borderStyle}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            Latest Audit Score
          </span>
          <span
            className="text-6xl font-light tracking-tighter"
            style={{ color: "var(--text-base)" }}
          >
            {totalReports > 0 ? latestScore : "--"}
          </span>
        </div>
        <div
          className="p-10 border flex flex-col justify-between min-h-[180px] bg-[color:var(--bg-surface)]"
          style={borderStyle}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            Reports Filed
          </span>
          <span
            className="text-6xl font-light tracking-tighter"
            style={{ color: "var(--text-base)" }}
          >
            {totalReports}
          </span>
        </div>
      </div>

      {/* CHARTS SECTION */}
      {totalReports > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Trend Line */}
          <div
            className="lg:col-span-8 p-8 border bg-[color:var(--bg-surface)]"
            style={borderStyle}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest mb-8 opacity-40">
              Score Longitudinal
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border-color)"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                      fontSize: "12px",
                    }}
                    itemStyle={{ color: "var(--text-base)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--accent)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart Metrics */}
          {radarData.length > 0 && (
            <div
              className="lg:col-span-4 p-8 border bg-[color:var(--bg-surface)]"
              style={borderStyle}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest mb-8 opacity-40">
                Latest ESG Distribution
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    data={radarData}
                  >
                    <PolarGrid stroke="var(--border-color)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 9, fill: "var(--text-muted)" }}
                    />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="var(--accent)"
                      fill="var(--accent)"
                      fillOpacity={0.4}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bg-surface)",
                        borderColor: "var(--border-color)",
                        fontSize: "12px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RECENT ACTIVITY TABLE */}
      <div className="border bg-[color:var(--bg-surface)]" style={borderStyle}>
        <div
          className="p-6 border-b flex justify-between items-center"
          style={borderStyle}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest">
            Diagnostic History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="text-sm font-light">
              {results.length === 0 ? (
                <tr>
                  <td className="p-10 text-center opacity-50 uppercase tracking-widest text-xs">
                    No data recorded. Initiate an audit to populate ledger.
                  </td>
                </tr>
              ) : (
                [...results].reverse().map((res) => (
                  <tr
                    key={res.id}
                    className="border-b last:border-0 hover:bg-[color:var(--bg-base)] transition-colors"
                    style={borderStyle}
                  >
                    <td className="p-6 font-mono text-[11px] opacity-40 uppercase">
                      REF-{res.id.slice(0, 8)}
                    </td>
                    <td className="p-6">
                      {new Date(res.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td
                      className="p-6 font-bold"
                      style={{
                        color: res.score > 70 ? "#22c55e" : "var(--accent)",
                      }}
                    >
                      {res.score} PTS
                    </td>
                    <td className="p-6 text-right">
                      <button className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
