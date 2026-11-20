import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NovoHabitoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do hábito</Text>
      <TextInput style={styles.input} placeholder="Ex.: Ler 20 minutos" />
      <Pressable style={styles.botao} onPress={() => router.back()}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});