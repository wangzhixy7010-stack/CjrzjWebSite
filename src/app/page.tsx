import type { Metadata } from "next";
import { CqcpeHome } from "@/components/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2/CqcpeHome";
import { innerMetadataTitle, parseCqcpeSearchParams } from "@/lib/cqcpe-catalog";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = parseCqcpeSearchParams(await searchParams);
  if (query.c === "search") {
    return {
      title: innerMetadataTitle(query),
      description: "重庆市规划展览馆官方网站",
    };
  }
  return {
    title: "重庆市规划展览馆",
    description: "重庆市规划展览馆官方网站",
  };
}

export default async function Home({ searchParams }: PageProps) {
  const query = parseCqcpeSearchParams(await searchParams);
  if (query.c === "search") {
    const { InnerApp } = await import(
      "@/components/sites/www-cqcpe-cn-ccd5d01f/shared/InnerApp"
    );
    return <InnerApp query={query} />;
  }
  return <CqcpeHome />;
}
