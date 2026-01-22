import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateBlog } from "@/hooks/useBlogs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CreateBlog = () => {
  const [open, setOpen] = useState(false);
  const mutation = useCreateBlog();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = (formData.get("category") as string)
      .split(",")
      .map((c) => c.trim().toUpperCase());
    const coverImage = formData.get("coverImage") as string;
    const content = formData.get("content") as string;

    if (!title || !description || !category[0] || !coverImage || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    mutation.mutate(
      {
        title,
        description,
        category,
        coverImage,
        content,
      },
      {
        onSuccess: () => {
          toast.success("Blog post created successfully!");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            error instanceof Error ? error.message : "Failed to create blog",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Write a New Insight
          </DialogTitle>
          <DialogDescription>
            Share your expertise with the professional community. Fill in the
            details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="font-bold">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. The Future of Fintech"
                className="border-primary/20 focus-visible:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="font-bold">
                  Categories (comma separated)
                </Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="FINANCE, TECH"
                  className="border-primary/20 focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverImage" className="font-bold">
                  Cover Image URL
                </Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  placeholder="https://images.pexels.com/..."
                  className="border-primary/20 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="font-bold">
                Brief Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="A short hook for your readers..."
                className="border-primary/20 focus-visible:ring-primary"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content" className="font-bold">
                Article Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Dive deep into the topic..."
                className="min-h-[200px] border-primary/20 focus-visible:ring-primary"
                required
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {mutation.isPending ? "Publishing..." : "Publish Insight"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlog;
