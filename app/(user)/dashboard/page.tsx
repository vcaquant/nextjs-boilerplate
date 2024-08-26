import { Layout } from "@/components/layout";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout className="h-full mt-4">
      <div className="h-full flex flex-col">Hello world!</div>
    </Layout>
  );
}
