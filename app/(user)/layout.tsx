import { Header } from "@/features/layout/Header";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      {props.children}
    </div>
  );
}
