import Image from "next/image";
import { LoggedInButton } from "../auth/LoggedInButton";
import { Layout } from "@/components/layout";
import { ModeToggle } from "../theme/ModeToggle";
import Link from "next/link";

export const Header = async () => {
  return (
    <header className="w-full border-b border-border py-1">
      <Layout className="items-center flex-row">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="logo" width={32} height={32} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LoggedInButton />
        </div>
      </Layout>
    </header>
  );
};
