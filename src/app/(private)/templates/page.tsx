"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Templates() {
  return (
    <>
      <Button className="ml-auto">
        <Plus className="size-3" />
        Adicionar Template
      </Button>
    </>
  );
}
