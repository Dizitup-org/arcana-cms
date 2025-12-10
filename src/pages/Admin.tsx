import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, FolderOpen, LogOut, LayoutDashboard } from "lucide-react";
import PostsList from "@/components/admin/PostsList";
import CreatePost from "@/components/admin/CreatePost";
import CategoriesManager from "@/components/admin/CategoriesManager";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                  <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
                </div>
              </a>
              <div>
                <h1 className="text-xl font-bold text-foreground">CMS Admin</h1>
                <p className="text-sm text-muted-foreground">Content Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild className="border-border/50 hover:border-primary/50 text-foreground">
                <a href="/blog">View Blog</a>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-lg grid-cols-3 bg-card/80 backdrop-blur-sm border border-border/50 p-1 h-auto">
            <TabsTrigger 
              value="posts" 
              className="gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg text-muted-foreground"
            >
              <FileText className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg text-muted-foreground"
            >
              <PlusCircle className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg text-muted-foreground"
            >
              <FolderOpen className="h-4 w-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-accent" />
              <CardHeader>
                <CardTitle className="text-foreground">Manage Posts</CardTitle>
                <CardDescription className="text-muted-foreground">
                  View, edit, and moderate your blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PostsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-accent" />
              <CardHeader>
                <CardTitle className="text-foreground">Create New Post</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Write and publish new content for your blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreatePost />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-accent" />
              <CardHeader>
                <CardTitle className="text-foreground">Manage Categories</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Organize your content with categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoriesManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;