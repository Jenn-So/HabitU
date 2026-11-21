import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Conclusoes, Habito } from './tipos';

// As "etiquetas" das gavetinhas, como no planejamento.
const CHAVE_HABITOS = 'habitos';
const CHAVE_CONCLUSOES = 'conclusoes';

export async function carregarHabitos(): Promise<Habito[]> {
  try {
    const texto = await AsyncStorage.getItem(CHAVE_HABITOS);
    // Se ainda não existe nada guardado, devolve lista vazia.
    return texto ? JSON.parse(texto) : [];
  } catch (erro) {
    console.error('Erro ao carregar hábitos:', erro);
    return [];
  }
}

export async function salvarHabitos(habitos: Habito[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_HABITOS, JSON.stringify(habitos));
}

export async function carregarConclusoes(): Promise<Conclusoes> {
  try {
    const texto = await AsyncStorage.getItem(CHAVE_CONCLUSOES);
    return texto ? JSON.parse(texto) : {};
  } catch (erro) {
    console.error('Erro ao carregar conclusões:', erro);
    return {};
  }
}

export async function salvarConclusoes(conclusoes: Conclusoes): Promise<void> {
  await AsyncStorage.setItem(CHAVE_CONCLUSOES, JSON.stringify(conclusoes));
}