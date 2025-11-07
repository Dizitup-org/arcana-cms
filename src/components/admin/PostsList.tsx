import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useCMS, Post } from "@/contexts/CMSContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const PostsList = () => {
  const { posts, updatePost, deletePost } = useCMS();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleApprove = (id: number) => {
    updatePost(id, { status: "published" });
    toast.success("Post approved and published");
  };

  const handleReject = (id: number) => {
    updatePost(id, { status: "draft" });
    toast.info("Post moved to draft");
  };

  const handleDelete = (id: number) => {
    deletePost(id);
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
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No posts yet. Create your first post!
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View"
                            onClick={() => setSelectedPost(post)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedPost?.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{selectedPost?.category}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {selectedPost?.readTime}
                              </span>
                            </div>
                            {selectedPost?.excerpt && (
                              <p className="text-muted-foreground italic">{selectedPost.excerpt}</p>
                            )}
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {selectedPost?.content.split('\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                              <span>By {selectedPost?.author}</span>
                              <span>{selectedPost && new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostsList;
