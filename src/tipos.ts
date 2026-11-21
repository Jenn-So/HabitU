// Molde de um hábito.
export type Habito = {
  id: string;
  nome: string;
  criadoEm: string; // data de criação em formato de texto
};

// Quais hábitos foram feitos em cada dia.
// Exemplo: { "2026-11-15": ["id1", "id2"] }
// Record<string, string[]> = objeto com chaves de texto e listas de textos.
export type Conclusoes = Record<string, string[]>;