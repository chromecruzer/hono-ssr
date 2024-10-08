import type { FC } from "hono/jsx";

export const Layout: FC<{
  children: any;
  title?: string;
  description?: string;
}> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content={props.description || "Default description"}
        />
        <title>{props.title || "My Website"}</title>
        {/* Link to Tailwind CSS */}
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-950 text-white">
          <a href="/service/home">Hello World by Service Worker</a>
          <script type="module" src="service/main.js"></script>
          <nav>
            <a href="/home" className="mr-4">
              Home
            </a>
            <a href="/about" className="mr-4">
              About
            </a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        <main>{props.children}</main>

        <footer className="p-4 bg-gray-200 text-center">
          <p>© 2024 My Website. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};
