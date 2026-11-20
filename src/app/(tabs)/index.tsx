import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HABITOS_EXEMPLO = [
  { id: '1', nome: 'Estudar 1 hora', feito: true },
  { id: '2', nome: 'Beber 2 litros de água', feito: false },
  { id: '3', nome: 'Revisar a matéria do dia', feito: false },
];

export default function HojeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={HABITOS_EXEMPLO}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.check}>{item.feito ? '✅' : '⬜'}</Text>
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