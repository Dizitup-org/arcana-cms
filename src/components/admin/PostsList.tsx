import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  category: string;
  status: "draft" | "published" | "pending";
  author: string;
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    category: "Development",
    status: "published",
    author: "Sarah Johnson",
    createdAt: "2024-03-15"
  },
  {
    id: 2,
    title: "The Future of Content Management",
    category: "Technology",
    status: "pending",
    author: "Michael Chen",
    createdAt: "2024-03-14"
  },
  {
    id: 3,
    title: "Best Practices for SEO in 2024",
    category: "Marketing",
    status: "draft",
    author: "Emma Wilson",
    createdAt: "2024-03-13"
  }
];

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleApprove = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "published" as const } : post
    ));
    toast.success("Post approved and published");
  };

  const handleReject = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "draft" as const } : post
    ));
    toast.info("Post moved to draft");
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast.success("Post deleted successfully");
  };

  const getStatusBadge = (status: Post["status"]) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">Published</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Pending</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{getStatusBadge(post.status)}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {post.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApprove(post.id)}
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReject(post.id)}
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostsList;
