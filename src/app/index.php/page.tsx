import type { Metadata } from "next";
import { InnerApp } from "@/components/sites/www-cqcpe-cn-ccd5d01f/shared/InnerApp";
import { innerMetadataTitle, parseCqcpeSearchParams } from "@/lib/cqcpe-catalog";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = parseCqcpeSearchParams(await searchParams);
  return {
    title: innerMetadataTitle(query),
    description: "重庆市规划展览馆官方网站",
  };
}

export default async function IndexPhpPage({ searchParams }: PageProps) {
  const query = parseCqcpeSearchParams(await searchParams);
  if (!query.c && !query.s) {
    redirect("/");
  }
  return <InnerApp query={query} />;
}
