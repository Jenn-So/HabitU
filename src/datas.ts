// Devolve a data de hoje no horário do celular, no formato "2026-11-22".
export function dataDeHoje(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  // getMonth() conta de 0 a 11 (janeiro = 0), por isso somamos 1.
  // padStart(2, '0') completa com zero à esquerda: "3" vira "03".
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}