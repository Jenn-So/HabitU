import { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  carregarHabitos,
  salvarHabitos,
  carregarConclusoes,
  salvarConclusoes,
} from '../../armazenamento';
import { dataDeHoje } from '../../datas';
import type { Habito, Conclusoes } from '../../tipos';

export default function HojeScreen() {
  const router = useRouter();

  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [conclusoes, setConclusoes] = useState<Conclusoes>({});

  const hoje = dataDeHoje();
  const feitosHoje = conclusoes[hoje] ?? [];

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setHabitos(await carregarHabitos());
        setConclusoes(await carregarConclusoes());
      }
      carregar();
    }, [])
  );

  async function alternar(idHabito: string) {
    const jaFeito = feitosHoje.includes(idHabito);
    const novosFeitos = jaFeito
      ? feitosHoje.filter((id) => id !== idHabito)
      : [...feitosHoje, idHabito];

    const novasConclusoes = { ...conclusoes, [hoje]: novosFeitos };
    setConclusoes(novasConclusoes);
    await salvarConclusoes(novasConclusoes);
  }

  // Apaga o hábito de verdade (só é chamada depois da confirmação).
  async function excluir(idHabito: string) {
    // Lista nova sem o hábito excluído.
    const novaLista = habitos.filter((h) => h.id !== idHabito);

    // Tira o id desse hábito de todos os dias já registrados.
    const novasConclusoes: Conclusoes = {};
    for (const dia in conclusoes) {
      novasConclusoes[dia] = conclusoes[dia].filter((id) => id !== idHabito);
    }

    setHabitos(novaLista);
    setConclusoes(novasConclusoes);
    await salvarHabitos(novaLista);
    await salvarConclusoes(novasConclusoes);
  }

  // Mostra a caixinha de confirmação antes de excluir.
  function confirmarExclusao(habito: Habito) {
    Alert.alert('Excluir hábito', `Deseja excluir "${habito.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => excluir(habito.id) },
    ]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={habitos}
        extraData={conclusoes}
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
            <Pressable onPress={() => confirmarExclusao(item)} hitSlop={10}>
              <Text style={styles.lixeira}>🗑️</Text>
            </Pressable>
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