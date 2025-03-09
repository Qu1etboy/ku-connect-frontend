"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { config } from "@/config";
import Draggable from "react-draggable";

/**
 * Debug tool for development environment
 */
export default function DebugTool() {
  if (config.ENV !== "development") return null;

  return (
    <Draggable cancel=".need-interaction">
      <div className="fixed bottom-4 right-4 z-[9999] rounded-md border border-gray-200 bg-white px-4 py-2 shadow-md">
        <p className="mb-2 text-sm font-medium">Debug Tools</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/onboarding" className="need-interaction">
              Onboarding
            </Link>
          </Button>
        </div>
      </div>
    </Draggable>
  );
}
