import { Sparkles, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

const Header = ({ darkMode, toggleDarkMode, showSearch = false, onSearch }: HeaderProps) => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (onSearch) onSearch(query);
  };
  
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-semibold">PathwayAI</h1>
        </div>
        
        <div className="flex-1 mx-4 max-w-xl hidden md:block">
          {showSearch && (
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                name="search"
                placeholder="Search courses, topics, or codes..." 
                className="pl-9 w-full" 
              />
            </form>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
          />
        </div>
      </div>
      
      {showSearch && (
        <div className="py-2 px-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              name="search"
              placeholder="Search courses..." 
              className="pl-9 w-full" 
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
