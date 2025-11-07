import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  postCount: number;
}

const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Development", postCount: 12 },
    { id: 2, name: "Technology", postCount: 8 },
    { id: 3, name: "Marketing", postCount: 5 },
    { id: 4, name: "Design", postCount: 7 }
  ]);
  
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      toast.error("Category already exists");
      return;
    }

    const category: Category = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: newCategory.trim(),
      postCount: 0
    };

    setCategories([...categories, category]);
    setNewCategory("");
    toast.success("Category added successfully");
  };

  const handleDeleteCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category && category.postCount > 0) {
      toast.error(`Cannot delete category with ${category.postCount} posts`);
      return;
    }

    setCategories(categories.filter(c => c.id !== id));
    toast.success("Category deleted successfully");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddCategory} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="categoryName">New Category</Label>
          <div className="flex gap-2">
            <Input
              id="categoryName"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button type="submit" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Existing Categories</h3>
        <div className="grid gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{category.name}</span>
                <Badge variant="secondary">{category.postCount} posts</Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteCategory(category.id)}
                disabled={category.postCount > 0}
                title={category.postCount > 0 ? "Cannot delete category with posts" : "Delete category"}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesManager;
