import { pages } from "@/lib/routes/routes";
import { usePathname } from "next/navigation";

export function usePage() {
  const pathname = usePathname();
  const page = pages.find((page) => page.url === pathname);
  if (!page) {
    throw new Error("Page not found");
  }
  return page;
}
