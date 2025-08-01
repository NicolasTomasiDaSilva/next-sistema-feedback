"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  prev: () => void;
  next: () => void;
  hasNextPage: boolean;
}
export function Pagination({ page, prev, next, hasNextPage }: PaginationProps) {
  return (
    <div className="ml-auto flex flex-row gap-2">
      <Button onClick={prev} disabled={page === 1}>
        <ChevronLeft className="size-3" />
      </Button>
      <Button onClick={next} disabled={!hasNextPage}>
        <ChevronRight className="size-3" />
      </Button>
    </div>
  );
}
