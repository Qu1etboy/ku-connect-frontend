"use client";

import useUserAgent from "@/hooks/useUserAgent";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

const COOKIE_NAME = "addToHomeScreenPrompt";

export default function InstallPrompt() {
  const { isMobile, isStandalone } = useUserAgent();
  const [displayPrompt, setDisplayPrompt] = useState(false);

  const closePrompt = () => {
    setDisplayPrompt(false);
  };

  const doNotShowAgain = () => {
    // Create date 1 year from now
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie(COOKIE_NAME, "dontShow", { expires: date }); // Set cookie for a year
    setDisplayPrompt(false);
  };

  useEffect(() => {
    const addToHomeScreenPromptCookie = getCookie(COOKIE_NAME);
    if (addToHomeScreenPromptCookie !== "dontShow") {
      setDisplayPrompt(true);
    }
  }, []);

  // Don't show install button if already installed or on desktop
  if (isStandalone || !isMobile) {
    return null;
  }

  return (
    displayPrompt && (
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-12">
        <Alert className="">
          <button className="absolute right-0 top-0 p-3" onClick={closePrompt}>
            <FaTimes />
          </button>
          <AlertTitle className="text-base font-semibold">
            Install KU Connect
          </AlertTitle>
          <AlertDescription className="text-base">
            For the best experience, we recommend installing KU Connect to your
            home screen!{" "}
            <a
              href="https://www.howtogeek.com/196087/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet/"
              className="underline"
            >
              How to add website to your home screen.
            </a>
          </AlertDescription>
          <Button variant="secondary" onClick={doNotShowAgain} className="mt-2">
            Do Not Show Again
          </Button>
        </Alert>
      </div>
    )
  );
}
