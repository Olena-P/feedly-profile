import { RootState } from "@/store";
import { ScrollViewStyleReset } from "expo-router/html";
import { useSelector } from "react-redux";

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  const isDarkMode = false;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body className={isDarkMode ? "dark" : ""}>{children}</body>
    </html>
  );
}

const responsiveBackground = `
  body.dark {
    background-color: #000;
    color: #fff;
  }

  body.light {
    background-color: #fff;
    color: #000;
  }
`;
