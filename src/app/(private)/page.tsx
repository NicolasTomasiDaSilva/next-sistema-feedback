"use client";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-4">
        Bem-vindo ao sistema de feedback. Selecione uma opção no menu lateral.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Avaliações</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Gerencie as avaliações dos funcionários
          </p>
          <Button size="sm">Ver Avaliações</Button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Templates</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Crie e edite templates de avaliação
          </p>
          <Button size="sm">Ver Templates</Button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Funcionários</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Gerencie o cadastro de funcionários
          </p>
          <Button size="sm">Ver Funcionários</Button>
        </div>
      </div>
    </div>
  );
}
