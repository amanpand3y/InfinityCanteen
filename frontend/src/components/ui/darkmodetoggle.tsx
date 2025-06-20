import { useEffect, useState } from "react";
import { Button } from "./button";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="px-4 py-2 rounded border bg-muted dark:bg-foreground text-foreground dark:text-background"
    >
      {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
};

export default DarkModeToggle;
