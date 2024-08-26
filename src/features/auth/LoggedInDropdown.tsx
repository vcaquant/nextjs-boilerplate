"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren, useEffect } from "react";
import { signOutAction } from "./auth.action";
import { Crown, LogOut } from "lucide-react";
import { useUserStore } from "@/stores/user";
import Link from "next/link";

export type LoggedInDropdownProps = PropsWithChildren & { user: any };

export const LoggedInDropdown = (props: LoggedInDropdownProps) => {
  const { setUser, avatar, username, email } = useUserStore((state) => state);

  useEffect(() => {
    setUser(props.user);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/account">
          <DropdownMenuItem>
            <div className="flex items-center">
              <div className="mr-2">
                <img
                  src={avatar}
                  alt={`${username ?? "-"}'s profile picture`}
                  className="rounded-full h-8 w-8"
                />
              </div>
              <div>
                <div className="font-bold flex gap-2 items-center">
                  {username}
                </div>
                <div className="text-sm text-gray-500">{email}</div>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOutAction();
          }}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
