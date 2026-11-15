# HabitU – Planejamento do MVP

## Objetivo
Ajudar estudantes universitários a criar hábitos acadêmicos e de bem-estar e acompanhar sua constância.

## Requisitos funcionais (MVP)
- RF01: criar um hábito (nome)
- RF02: listar os hábitos
- RF03: excluir um hábito
- RF04: marcar/desmarcar um hábito como feito no dia
- RF05: ver o progresso do mês em um calendário simples

## Requisitos não funcionais
- Funciona offline; dados salvos no próprio celular (sem servidor)
- Interface simples, com poucas telas

## Fora do MVP (só se sobrar tempo)
Lembretes/notificações, editar hábito, estatísticas, login, temas.

## Modelo de dados
- Hábito: { id, nome, criadoEm }
- Conclusões: um registro por dia com os ids dos hábitos feitos
  Ex.: { "2026-11-15": ["1", "3"] }
- Salvos com AsyncStorage nas chaves "habitos" e "conclusoes"

## Telas
1. Hoje (aba): lista de hábitos, marcar como feito, excluir, botão "Novo hábito"
2. Progresso (aba): calendário do mês
3. Novo hábito (tela modal): formulário com nome

## Decisões técnicas
React Native + Expo (Expo Go), Expo Router, TypeScript, AsyncStorage.