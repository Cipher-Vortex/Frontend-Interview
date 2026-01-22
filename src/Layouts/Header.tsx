import CreateBlog from "../components/CreateBlog";
import ToogleTheme from "@/components/ToogleTheme";

const Header = () => {
  const logo =
    "https://d502jbuhuh9wk.cloudfront.net/orgData/606b3abe0cf2821005a32675/pages/assets/images/Y4FOClogo.png";
  return (
    <header className="flex items-center justify-between p-4 max-w-7xl mx-auto w-full sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
      <div className="shrink-0">
        {logo ? (
          <img
            src={logo}
            alt="CA Monk"
            className="w-auto h-8 md:h-10 transition-all"
          />
        ) : (
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
            CA Monk
          </h1>
        )}
      </div>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 text-sm font-semibold transition-colors">
          <li>
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/blogs" className="text-primary">
              Blogs
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Cipher-Vortex"
              className="hover:text-primary transition-colors"
            >
              Author
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <ToogleTheme />
        <CreateBlog />
        {/* <Button
          variant="ghost"
          className="rounded-full hidden sm:flex"
          onClick={() => window.open("https://github.com/Cipher-Vortex")}
        >
          Profile
        </Button> */}
      </div>
    </header>
  );
};

export default Header;
