"use client";

import { Button } from "@/components/ui/button";
import { SignInAction } from "./auth.action";

export const SignInButton = () => {
  return (
    <form>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={async () => {
          await SignInAction();
        }}
      >
        Sign In
      </Button>
    </form>
  );
};
