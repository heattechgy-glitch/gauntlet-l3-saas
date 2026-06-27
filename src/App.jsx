import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoginPage from "@/components/LoginPage";
import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/components/Overview";
import Analytics from "@/components/Analytics";
import Settings from "@/components/Settings";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || "/");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || "/");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderRoute = () => {
    switch (currentRoute) {
      case "/":
        return <Overview />;
      case "/analytics":
        return <Analytics />;
      case "/settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <DashboardLayout>{renderRoute()}</DashboardLayout>;
}

export default App;