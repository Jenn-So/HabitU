import { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  carregarHabitos,
  carregarConclusoes,
  salvarConclusoes,
} from '../../armazenamento';
import { dataDeHoje } from '../../datas';
import type { Habito, Conclusoes } from '../../tipos';

export default function HojeScreen() {
  const router = useRouter();

  // Estados: a lista de hábitos e os dias/hábitos já concluídos.
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [conclusoes, setConclusoes] = useState<Conclusoes>({});

  // Ids dos hábitos feitos hoje (lista vazia se ainda não há nenhum).
  const hoje = dataDeHoje();
  const feitosHoje = conclusoes[hoje] ?? [];

  // Roda toda vez que a tela Hoje fica em foco.
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setHabitos(await carregarHabitos());
        setConclusoes(await carregarConclusoes());
      }
      carregar();
    }, [])
  );

  // Marca o hábito como feito hoje, ou desmarca se já estava feito.
  async function alternar(idHabito: string) {
    const jaFeito = feitosHoje.includes(idHabito);
    const novosFeitos = jaFeito
      ? feitosHoje.filter((id) => id !== idHabito)
      : [...feitosHoje, idHabito];

    const novasConclusoes = { ...conclusoes, [hoje]: novosFeitos };
    setConclusoes(novasConclusoes); // atualiza a tela na hora
    await salvarConclusoes(novasConclusoes); // guarda no celular
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={habitos}
        extraData={conclusoes} // avisa a lista para redesenhar quando isso mudar
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum hábito ainda. Toque em "+ Novo hábito" para começar.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable onPress={() => alternar(item.id)} hitSlop={10}>
              <Text style={styles.check}>
                {feitosHoje.includes(item.id) ? '✅' : '⬜'}
              </Text>
            </Pressable>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.lixeira}>🗑️</Text>
          </View>
        )}
      />
      <Pressable style={styles.botao} onPress={() => router.push('/novo-habito')}>
        <Text style={styles.botaoTexto}>+ Novo hábito</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  vazio: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 32 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FDEAF3',
  },
  check: { fontSize: 22, marginRight: 12 },
  nome: { flex: 1, fontSize: 16 },
  lixeira: { fontSize: 20 },
  botao: {
    backgroundColor: '#E84393',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});