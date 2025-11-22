"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function UserButtonWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <SignedIn>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
            userButtonPopoverCard: "shadow-xl",
            userPreviewMainIdentifier: "font-semibold",
          },
        }}
        afterSignOutUrl="/"
      />
    </SignedIn>
  );
}
