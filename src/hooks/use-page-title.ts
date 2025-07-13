"use client";

import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/avaliacoes": "Avaliações",
  "/templates": "Templates",
  "/funcionarios": "Funcionários",
};

export function usePageTitle() {
  const pathname = usePathname();

  // Busca o título baseado na rota exata
  const exactTitle = routeTitles[pathname];
  if (exactTitle) {
    return exactTitle;
  }

  // Se não encontrar uma rota exata, tenta encontrar uma rota que comece com o pathname
  const matchingRoute = Object.keys(routeTitles).find((route) =>
    pathname.startsWith(route)
  );

  if (matchingRoute) {
    return routeTitles[matchingRoute];
  }

  // Fallback para rotas não mapeadas
  return "Dashboard";
}
