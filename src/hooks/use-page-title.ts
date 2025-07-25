import { pages } from "@/lib/routes/routes";
import { usePathname } from "next/navigation";

export function usePageTitle() {
  const pathname = usePathname();

  
  const exactTitle = pages.find((page) => page.url === pathname)?.title;
  if (exactTitle) {
    return exactTitle;
  }

  return "";
}
