import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URI = "http://localhost:3001";

export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_URI}/blogs`);

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();

        //  data validation
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }

        return data;
      } catch (err: any) {
        throw new Error(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 2, // Cache data for 2 minutes
  });
};

const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog: Omit<Blog, "id" | "date">) => {
      const blogs = queryClient.getQueryData<Blog[]>(["blogs"]);
      const nextId = (blogs?.length ?? 0) + 1;

      const blogWithMetadata = {
        ...newBlog,
        id: nextId,
        date: new Date().toISOString(),
      };

      const response = await fetch(`${API_URI}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogWithMetadata),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export { useBlogs, useCreateBlog };
