import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { loadRemoteSiteContent } from "./utils/siteContent";
import { SiteThemeBootstrap } from "./utils/theme";
import "./index.css";

function AppBootstrap() {
  const [contentVersion, setContentVersion] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function syncRemoteContent() {
      await loadRemoteSiteContent();

      if (!isMounted) {
        return;
      }

      React.startTransition(() => {
        setContentVersion((current) => current + 1);
      });
    }

    syncRemoteContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SiteThemeBootstrap />
      <RouterProvider router={router} key={contentVersion} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppBootstrap />
  </React.StrictMode>,
);
