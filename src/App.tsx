import Blogs from "./Layouts/Blogs";
import Header from "./Layouts/Header";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <>
      <Header />
      <Blogs />
      <Toaster position="top-center" expand={false} richColors />
    </>
  );
};

export default App;
