import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Layers, Zap, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ModernCMS</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <a href="/blog">Blog</a>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25">
                <a href="/admin">Admin Panel</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Modern Content Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
            Powerful CMS for
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block mt-2">
              Modern Websites
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create, manage, and publish content with ease. Built with modern technologies for the best user experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/25 group" asChild>
              <a href="/admin" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-border hover:bg-secondary/50 hover:border-primary/50" asChild>
              <a href="/blog">View Blog</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete content management solution with all the features you need
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">Content Management</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Create, edit, and organize your blog posts with an intuitive and powerful interface
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg shadow-accent/25 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-7 w-7 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">Category Organization</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Organize your content with a flexible and intuitive category management system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <CardHeader className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">Secure & Moderated</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Built-in moderation workflow and session management for maximum security
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto overflow-hidden border-0 shadow-2xl shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
          <CardContent className="relative text-center py-16 px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start managing your content today with our powerful and intuitive CMS platform
            </p>
            <Button size="lg" className="text-lg px-8 bg-card text-foreground hover:bg-card/90 shadow-xl" asChild>
              <a href="/admin">Access Admin Panel</a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">ModernCMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ModernCMS. Built with modern technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;