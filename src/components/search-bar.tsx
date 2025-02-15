import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; 

export function SearchBar({onClick}:{onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void}) {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-lg w-full max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Find contractors, materials, or services..."
          className="pl-10 pr-4 py-2 rounded-lg border-none focus:ring-0 w-full"
        />
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all" onClick={onClick}>
        View Products
      </Button>
    </div>
  );
}