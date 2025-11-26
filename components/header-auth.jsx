"use client";

import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  ChevronDown,
  Code,
  DollarSign,
  FileText,
  GraduationCapIcon,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButtonWrapper } from "./user-button-wrapper";

export function HeaderAuth() {
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        {/* Dashboard */}
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Industry Insights</span>
          </Button>
        </Link>

        {/* Growth Tools Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <StarsIcon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Growth Tools</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Career Boosters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/resume" className="flex items-center gap-2 w-full">
                <FileText className="h-4 w-4" />
                <span>Build Resume</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/ai-cover-letter" className="flex items-center gap-2 w-full">
                <PenBox className="h-4 w-4" />
                <span>Cover Letter</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/interview" className="flex items-center gap-2 w-full">
                <GraduationCapIcon className="h-4 w-4" />
                <span>Interview Prep</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/leetcode" className="flex items-center gap-2 w-full">
                <Code className="h-4 w-4" />
                <span>LeetCode Solver</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/resume" className="flex items-center gap-2 w-full">
                <DollarSign className="h-4 w-4" />
                <span>Subscription</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>

      {/* Auth Buttons */}
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <Button variant="outline">Sign Up</Button>
        </SignUpButton>
      </SignedOut>

      {/* User Avatar */}
      <UserButtonWrapper />
    </div>
  );
}
