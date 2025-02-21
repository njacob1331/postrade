'use client';
import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut, SignedIn, useUser, SignUpButton } from "@clerk/nextjs";
// import UserMenu from "@/components/auth/user-menu";
import { UserButton } from "@clerk/nextjs";

export default function Authentication() {
  const { user } = useUser();
  const username = user?.username;

  return (
    <div>
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton>
            <Button variant="secondary">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
          {/* <UserMenu username={username ?? ''} imageUrl={user?.imageUrl ?? ''} /> */}
      </SignedIn>
    </div>
  );
}

