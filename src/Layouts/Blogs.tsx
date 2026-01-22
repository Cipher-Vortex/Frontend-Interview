import { useState, useMemo, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlogs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  Calendar,
  Tag,
  Share2,
  Bookmark,
  Clock,
  ArrowLeft,
  TrendingUp as LucideTrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Blogs = () => {
  const { data, isLoading, error, isError } = useBlogs();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showListOnMobile, setShowListOnMobile] = useState(true);

  const blogs = useMemo(() => data || [], [data]);

  useEffect(() => {
    if (blogs.length > 0 && !selectedId) {
      setSelectedId(blogs[0].id);
    }
  }, [blogs, selectedId]);

  const selectedBlog = useMemo(
    () =>
      blogs.find((b) => b.id === selectedId) ||
      (blogs.length > 0 ? blogs[0] : null),
    [blogs, selectedId],
  );

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setShowListOnMobile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          Loading professional insights...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Alert variant="destructive" className="shadow-lg">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load blogs. Please check your connection."}
          </AlertDescription>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <header className="mb-10 lg:mb-16 text-center">
        <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/20">
          The Knowledge Base
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
          Future of Finance & Tech
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
          Insights that empower modern professionals in a digital-first world.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Sidebar - Blog List */}
        <div
          className={cn(
            "w-full lg:w-[38%] space-y-4 lg:sticky lg:top-24 pr-1",
            !showListOnMobile && "hidden lg:block",
          )}
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Recent Articles
            </h3>
            <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {blogs.length} Posts
            </span>
          </div>

          <div className="space-y-4 space-x-4 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2 scroll-m-0.5">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className={cn(
                  "group cursor-pointer transition-all duration-300 border shadow-sm hover:shadow-md",
                  selectedId === blog.id
                    ? "ring-1 ring-primary bg-primary/2 border-primary/20"
                    : "bg-card border-border/50",
                )}
                onClick={() => handleSelect(blog.id)}
              >
                <CardHeader className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-bold text-primary uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      {Array.isArray(blog.category)
                        ? blog.category[0]
                        : blog.category}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground/80">
                      <Calendar className="w-3 h-3" />
                      {formatDate(blog.date)}
                    </div>
                  </div>
                  <CardTitle
                    className={cn(
                      "text-lg lg:text-xl leading-snug transition-colors",
                      selectedId === blog.id
                        ? "text-primary"
                        : "group-hover:text-primary",
                    )}
                  >
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {blog.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Content - Blog Detail */}
        <div
          className={cn(
            "w-full lg:w-[62%] transition-all duration-500",
            showListOnMobile && "hidden lg:block",
          )}
        >
          {selectedBlog ? (
            <div className="space-y-6 lg:sticky lg:top-24">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mb-4 -ml-2 text-muted-foreground hover:text-primary gap-2"
                onClick={() => setShowListOnMobile(true)}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </Button>

              <Card className="overflow-hidden border-none shadow-2xl bg-card ">
                <div className="relative aspect-video sm:aspect-16/10 lg:aspect-video overflow-hidden group">
                  <img
                    src={selectedBlog.coverImage}
                    alt={selectedBlog.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(selectedBlog.category) ? (
                        selectedBlog.category.map((cat: string) => (
                          <span
                            key={cat}
                            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white dark:text-black bg-primary px-3 py-1 rounded-full"
                          >
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-primary px-3 py-1 rounded-full">
                          {selectedBlog.category}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                      {selectedBlog.title}
                    </h2>
                  </div>
                </div>

                <CardContent className="p-6 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap gap-4 sm:gap-6 items-center mb-8 pb-6 border-b border-border">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-foreground leading-none mb-1">
                          Expert Hub
                        </p>
                        <p className="text-[10px] font-medium uppercase tracking-widest opacity-60">
                          Verified
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-muted-foreground border-l border-border pl-4 sm:pl-6">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDate(selectedBlog.date)}</span>
                    </div>

                    <div className="ml-auto flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-9 h-9 border-primary/10"
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-9 h-9 border-primary/10"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-lg sm:text-xl font-serif text-muted-foreground mb-10 italic leading-relaxed border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-xl">
                      {selectedBlog.description}
                    </p>

                    <div className="space-y-6 text-foreground/80 leading-relaxed text-base sm:text-lg">
                      {selectedBlog.content
                        .split("\n\n")
                        .map((paragraph: string, idx: number) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Topic Flow
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(selectedBlog.category) &&
                          selectedBlog.category.map((cat: string) => (
                            <span
                              key={cat}
                              className="text-[10px] font-bold uppercase text-primary bg-primary/5 rounded border border-primary/10 px-3 pointer-events-none"
                            >
                              #{cat}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-tighter">
                        6 min read
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/10  bg-primary/1 text-muted-foreground min-h-[60vh] text-center">
              <LucideTrendingUp className="w-12 h-12 text-primary/20 mb-4" />
              <h3 className="text-xl font-bold text-foreground/80 mb-2">
                Select an Article
              </h3>
              <p className="max-w-xs text-sm">
                Choose an insight from the sidebar to start reading.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Blogs;
