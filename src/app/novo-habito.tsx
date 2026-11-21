import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { carregarHabitos, salvarHabitos } from '../armazenamento';
import type { Habito } from '../tipos';

export default function NovoHabitoScreen() {
  const router = useRouter();

  // Estado: o texto que está sendo digitado. Começa vazio.
  const [nome, setNome] = useState('');

  // Roda quando aperta "Salvar". É async porque ler e guardar levam um instante.
  async function salvar() {
    // 1. Validar: tira espaços das pontas e não salva se ficou vazio.
    const nomeLimpo = nome.trim();
    if (nomeLimpo === '') return;

    // 2. Montar o hábito novo, seguindo o molde Habito.
    const novoHabito: Habito = {
      id: Date.now().toString(),
      nome: nomeLimpo,
      criadoEm: new Date().toISOString(),
    };

    // 3. Ler a lista atual, 4. acrescentar o novo, 5. guardar.
    const habitos = await carregarHabitos();
    const novaLista = [...habitos, novoHabito];
    await salvarHabitos(novaLista);

    // TEMPORÁRIO: mostra a lista no terminal para conferirmos. Sai no Passo 4.
    console.log('Hábitos salvos:', novaLista);

    // 6. Voltar para a tela anterior.
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do hábito</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Ler 20 minutos"
        value={nome}
        onChangeText={setNome}
      />
      <Pressable style={styles.botao} onPress={salvar}>
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
    backgroundColor: '#E84393',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});