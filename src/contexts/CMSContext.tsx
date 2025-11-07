import React, { createContext, useContext, useState, useEffect } from "react";

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: "draft" | "published" | "pending";
  author: string;
  createdAt: string;
  readTime: string;
}

export interface Category {
  id: number;
  name: string;
  postCount: number;
}

interface CMSContextType {
  posts: Post[];
  categories: Category[];
  addPost: (post: Omit<Post, "id" | "createdAt" | "readTime">) => void;
  updatePost: (id: number, post: Partial<Post>) => void;
  deletePost: (id: number) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: number) => void;
  getPublishedPosts: () => Post[];
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    excerpt: "Learn the fundamentals of building modern web applications with the latest technologies and best practices.",
    content: "Modern web development has evolved significantly over the years. In this comprehensive guide, we'll explore the essential tools and technologies you need to build robust, scalable web applications.\n\nWe'll cover:\n- Modern JavaScript frameworks\n- Best practices for code organization\n- Performance optimization techniques\n- Testing strategies\n\nWhether you're a beginner or an experienced developer, this guide will help you stay up-to-date with the latest trends in web development.",
    category: "Development",
    status: "published",
    author: "Sarah Johnson",
    createdAt: new Date("2024-03-15").toISOString(),
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Future of Content Management",
    excerpt: "Exploring how content management systems are evolving to meet the needs of modern digital experiences.",
    content: "Content Management Systems (CMS) have come a long way from simple blog platforms. Today's CMS solutions are powerful, flexible, and designed to handle complex digital experiences.\n\nKey trends include:\n- Headless CMS architecture\n- API-first approaches\n- Better developer experience\n- Enhanced security features\n\nThis article explores where CMS technology is heading and what it means for content creators and developers.",
    category: "Technology",
    status: "published",
    author: "Michael Chen",
    createdAt: new Date("2024-03-10").toISOString(),
    readTime: "7 min read"
  }
];

const initialCategories: Category[] = [
  { id: 1, name: "Development", postCount: 1 },
  { id: 2, name: "Technology", postCount: 1 },
  { id: 3, name: "Marketing", postCount: 0 },
  { id: 4, name: "Design", postCount: 0 }
];

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("cms_posts");
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("cms_categories");
    return saved ? JSON.parse(saved) : initialCategories;
  });

  useEffect(() => {
    localStorage.setItem("cms_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("cms_categories", JSON.stringify(categories));
  }, [categories]);

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const addPost = (post: Omit<Post, "id" | "createdAt" | "readTime">) => {
    const newPost: Post = {
      ...post,
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      readTime: calculateReadTime(post.content)
    };
    setPosts([newPost, ...posts]);

    // Update category post count
    setCategories(cats =>
      cats.map(cat =>
        cat.name === post.category
          ? { ...cat, postCount: cat.postCount + 1 }
          : cat
      )
    );
  };

  const updatePost = (id: number, updatedPost: Partial<Post>) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const updated = { ...post, ...updatedPost };
        
        // Update read time if content changed
        if (updatedPost.content) {
          updated.readTime = calculateReadTime(updatedPost.content);
        }

        // Update category counts if category changed
        if (updatedPost.category && updatedPost.category !== post.category) {
          setCategories(cats =>
            cats.map(cat => {
              if (cat.name === post.category) {
                return { ...cat, postCount: cat.postCount - 1 };
              }
              if (cat.name === updatedPost.category) {
                return { ...cat, postCount: cat.postCount + 1 };
              }
              return cat;
            })
          );
        }

        return updated;
      }
      return post;
    }));
  };

  const deletePost = (id: number) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setPosts(posts.filter(p => p.id !== id));
      
      // Update category post count
      setCategories(cats =>
        cats.map(cat =>
          cat.name === post.category
            ? { ...cat, postCount: cat.postCount - 1 }
            : cat
        )
      );
    }
  };

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name,
      postCount: 0
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.status === "published");
  };

  return (
    <CMSContext.Provider
      value={{
        posts,
        categories,
        addPost,
        updatePost,
        deletePost,
        addCategory,
        deleteCategory,
        getPublishedPosts
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
