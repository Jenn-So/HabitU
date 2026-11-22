import { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { carregarHabitos } from '../../armazenamento';
import type { Habito } from '../../tipos';

export default function HojeScreen() {
  const router = useRouter();

  // Estado: a lista de hábitos que aparece na tela. Começa vazia.
  const [habitos, setHabitos] = useState<Habito[]>([]);

  // Roda toda vez que a tela Hoje fica em foco (ao abrir e ao voltar do modal).
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const lista = await carregarHabitos();
        setHabitos(lista); // atualiza o estado e a tela se redesenha
      }
      carregar();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habitos}
        keyExtractor={(item) => item.id}
        // Mensagem exibida quando ainda não há nenhum hábito.
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum hábito ainda. Toque em "+ Novo hábito" para começar.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.check}>⬜</Text>
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