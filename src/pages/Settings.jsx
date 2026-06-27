import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User, Bell, Mail, Clock, Trash2, Save, AlertTriangle } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profile, setProfile] = useState({
    name: "Galen Harbison",
    email: "galen@example.com",
    timezone: "America/New_York"
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyDigest: false,
    usageAlerts: true
  });

  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Phoenix",
    "America/Anchorage",
    "Pacific/Honolulu",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Australia/Sydney",
    "Pacific/Auckland"
  ];

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // No real save - just UI
    console.log("Profile:", profile);
    console.log("Notifications:", notifications);
  };

  const handleDeleteAccount = () => {
    // No real delete - just close dialog
    console.log("Account deletion confirmed (UI only)");
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and notifications</p>
        </div>

        {/* Profile Section */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Timezone
              </label>
              <select
                value={profile.timezone}
                onChange={(e) => handleProfileChange("timezone", e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all cursor-pointer"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz} className="bg-zinc-900">
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[#0ea5e9]" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            {/* Email Alerts */}
            <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-zinc-800">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium mb-1">Email Alerts</h3>
                  <p className="text-sm text-gray-400">Receive email notifications for important updates</p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle("emailAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.emailAlerts ? "bg-[#0ea5e9]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.emailAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Weekly Digest */}
            <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-zinc-800">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium mb-1">Weekly Digest</h3>
                  <p className="text-sm text-gray-400">Get a weekly summary of your activity</p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle("weeklyDigest")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.weeklyDigest ? "bg-[#0ea5e9]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.weeklyDigest ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Usage Alerts */}
            <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-zinc-800">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium mb-1">Usage Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified when approaching usage limits</p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle("usageAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.usageAlerts ? "bg-[#0ea5e9]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.usageAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mb-6">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-zinc-900 rounded-lg border border-red-900/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/30 font-medium px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-600/10 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Delete Account</h3>
                <p className="text-gray-400 text-sm">
                  Are you absolutely sure you want to delete your account? This action cannot be undone
                  and all your data will be permanently removed.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}