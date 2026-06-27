import { DollarSign, Users, TrendingDown, CreditCard, Activity } from "lucide-react";

export default function Overview() {
  const stats = [
    {
      title: "Revenue",
      value: "$48.2k",
      change: "+12%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Users",
      value: "1,847",
      change: "+8%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Churn",
      value: "2.3%",
      change: "-0.4%",
      icon: TrendingDown,
      trend: "down"
    },
    {
      title: "MRR",
      value: "$12.4k",
      change: "+15%",
      icon: CreditCard,
      trend: "up"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "upgraded to Pro plan",
      time: "2 minutes ago"
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "completed onboarding",
      time: "15 minutes ago"
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      action: "canceled subscription",
      time: "1 hour ago"
    },
    {
      id: 4,
      user: "David Park",
      action: "updated payment method",
      time: "3 hours ago"
    },
    {
      id: 5,
      user: "Lisa Anderson",
      action: "invited 3 team members",
      time: "5 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm font-medium">{stat.title}</span>
                  <Icon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <div>
                  <span className="font-medium text-white">{activity.user}</span>
                  <span className="text-gray-400"> {activity.action}</span>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}