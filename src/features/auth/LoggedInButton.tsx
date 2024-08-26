import { Button } from "@/components/ui/button";
import { SignInButton } from "./SignInButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoggedInDropdown } from "./LoggedInDropdown";
import { baseAuth } from "@/auth/auth";

export const LoggedInButton = async () => {
  const session = await baseAuth();

  if (!session?.user) {
    return <SignInButton />;
  }

  return (
    <LoggedInDropdown user={session.user}>
      <Button variant={"ghost"} size={"sm"}>
        <Avatar className="size-6">
          <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
          {session.user.image ? (
            <AvatarImage
              src={session.user.image}
              alt={`${session.user.name ?? "-"}'s profile picture`}
            />
          ) : null}
        </Avatar>
      </Button>
    </LoggedInDropdown>
  );
};
