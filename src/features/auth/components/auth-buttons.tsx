"use client";

// Temporarily commented out NextAuth imports
// import { signIn, signOut } from "next-auth/react";

import { Button } from "@/ui/components/button";

export function SignInButton() {
  return <Button onClick={() => console.log("Sign in clicked")}>Sign in with Google</Button>;
}

export function SignOutButton() {
  return (
    <Button variant="outline" onClick={() => console.log("Sign out clicked")}>
      Sign Out
    </Button>
  );
}
