import { useState, useEffect, useRef } from "react";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default function Analytics() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    let Chart;

    const initCharts = async () => {
      // Dynamic import of Chart.js
      const ChartModule = await import("chart.js/auto");
      Chart = ChartModule.default;

      // Destroy existing charts if they exist
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      // Line Chart - Monthly Revenue
      if (lineChartRef.current) {
        const lineCtx = lineChartRef.current.getContext("2d");
        lineChartInstance.current = new Chart(lineCtx, {
          type: "line",
          data: {
            labels: ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026"],
            datasets: [
              {
                label: "Monthly Revenue ($)",
                data: [32000, 36000, 41000, 38000, 44000, 48000],
                borderColor: "#0ea5e9",
                backgroundColor: "rgba(14, 165, 233, 0.1)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#0ea5e9",
                pointBorderColor: "#0ea5e9",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#0ea5e9",
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "#94a3b8",
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#f1f5f9",
                bodyColor: "#cbd5e1",
                borderColor: "#334155",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    return `$${context.parsed.y.toLocaleString()}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: "#334155",
                  drawBorder: false,
                },
                ticks: {
                  color: "#94a3b8",
                },
              },
              y: {
                grid: {
                  color: "#334155",
                  drawBorder: false,
                },
                ticks: {
                  color: "#94a3b8",
                  callback: function (value) {
                    return `$${(value / 1000).toFixed(0)}k`;
                  },
                },
              },
            },
          },
        });
      }

      // Bar Chart - Users by Plan
      if (barChartRef.current) {
        const barCtx = barChartRef.current.getContext("2d");
        barChartInstance.current = new Chart(barCtx, {
          type: "bar",
          data: {
            labels: ["Free", "Pro", "Enterprise"],
            datasets: [
              {
                label: "Users",
                data: [1200, 520, 127],
                backgroundColor: ["#0ea5e9", "#06b6d4", "#0891b2"],
                borderColor: ["#0ea5e9", "#06b6d4", "#0891b2"],
                borderWidth: 2,
                borderRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#f1f5f9",
                bodyColor: "#cbd5e1",
                borderColor: "#334155",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    return `${context.parsed.y.toLocaleString()} users`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: "#334155",
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  color: "#94a3b8",
                  font: {
                    size: 13,
                    weight: "600",
                  },
                },
              },
              y: {
                grid: {
                  color: "#334155",
                  drawBorder: false,
                },
                ticks: {
                  color: "#94a3b8",
                  callback: function (value) {
                    return value.toLocaleString();
                  },
                },
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    initCharts();

    // Cleanup
    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, []);

  const stats = [
    {
      label: "Total Revenue",
      value: "$239,000",
      icon: DollarSign,
      change: "+18.2%",
      positive: true,
    },
    {
      label: "Total Users",
      value: "1,847",
      icon: Users,
      change: "+12.5%",
      positive: true,
    },
    {
      label: "Avg. Monthly Growth",
      value: "$3,200",
      icon: TrendingUp,
      change: "+8.1%",
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-sky-500" />
            <h1 className="text-3xl font-bold text-slate-100">Analytics Dashboard</h1>
          </div>
          <p className="text-slate-400">Track your revenue and user growth metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-sky-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-sky-500" />
                <span
                  className={`text-sm font-semibold ${
                    stat.positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Revenue Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-1">Monthly Revenue</h2>
              <p className="text-sm text-slate-400">Revenue trend from Jan - Jun 2026</p>
            </div>
            <div className="h-80">
              <canvas ref={lineChartRef}></canvas>
            </div>
          </div>

          {/* Users by Plan Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-1">Users by Plan</h2>
              <p className="text-sm text-slate-400">Distribution across subscription tiers</p>
            </div>
            <div className="h-80">
              <canvas ref={barChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5"></div>
              <p>
                Revenue increased by <span className="text-sky-500 font-semibold">50%</span> from
                January to June 2026
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5"></div>
              <p>
                Free plan users represent <span className="text-sky-500 font-semibold">65%</span>{" "}
                of total user base
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5"></div>
              <p>
                Enterprise tier shows strong adoption with{" "}
                <span className="text-sky-500 font-semibold">127</span> active customers
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5"></div>
              <p>
                Average revenue per user increased consistently across all quarters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}