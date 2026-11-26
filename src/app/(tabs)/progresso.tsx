import { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { carregarHabitos, carregarConclusoes } from '../../armazenamento';
import { dataDeHoje } from '../../datas';
import type { Habito, Conclusoes } from '../../tipos';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Escolhe a cor do dia conforme a proporção de hábitos feitos.
function corDoDia(feitos: number, total: number): string {
  if (total === 0 || feitos === 0) return '#EEEEEE'; // nada feito
  const proporcao = feitos / total;
  if (proporcao >= 1) return '#E84393'; // todos feitos
  if (proporcao >= 0.5) return '#F08DBB'; // mais da metade
  return '#F8C9E0'; // poucos
}

export default function ProgressoScreen() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [conclusoes, setConclusoes] = useState<Conclusoes>({});

  // Recarrega os dados toda vez que a aba Progresso fica em foco.
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setHabitos(await carregarHabitos());
        setConclusoes(await carregarConclusoes());
      }
      carregar();
    }, [])
  );

  // Dados do mês atual.
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth(); // 0 a 11
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0 = domingo
  const hoje = dataDeHoje();

  const mesTexto = String(mes + 1).padStart(2, '0');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        {MESES[mes]} {ano}
      </Text>

      {/* Letras dos dias da semana */}
      <View style={styles.linha}>
        {DIAS_SEMANA.map((letra, i) => (
          <View key={i} style={styles.celula}>
            <Text style={styles.diaSemana}>{letra}</Text>
          </View>
        ))}
      </View>

      {/* Grade do mês */}
      <View style={styles.linha}>
        {/* Células vazias antes do dia 1 */}
        {Array.from({ length: primeiroDiaSemana }, (_, i) => (
          <View key={`vazio-${i}`} style={styles.celula} />
        ))}

        {/* Um quadrado para cada dia do mês */}
        {Array.from({ length: diasNoMes }, (_, i) => {
          const dia = i + 1;
          const chave = `${ano}-${mesTexto}-${String(dia).padStart(2, '0')}`;
          const feitos = (conclusoes[chave] ?? []).length;
          const ehHoje = chave === hoje;

          return (
            <View key={chave} style={styles.celula}>
              <View
                style={[
                  styles.quadrado,
                  { backgroundColor: corDoDia(feitos, habitos.length) },
                  ehHoje && styles.quadradoHoje,
                ]}
              >
                <Text
                  style={[
                    styles.numero,
                    feitos > 0 && habitos.length > 0 && styles.numeroClaro,
                  ]}
                >
                  {dia}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Legenda */}
      <Text style={styles.legenda}>
        Cinza: nenhum hábito feito · Rosa claro: poucos · Rosa médio: mais da
        metade · Rosa forte: todos. O dia de hoje tem borda escura.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  linha: { flexDirection: 'row', flexWrap: 'wrap' },
  celula: { width: '14.2857%', padding: 2 },
  diaSemana: { textAlign: 'center', color: '#666', fontWeight: 'bold', marginBottom: 4 },
  quadrado: {
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quadradoHoje: { borderWidth: 2, borderColor: '#333' },
  numero: { fontSize: 14, color: '#333' },
  numeroClaro: { fontWeight: 'bold' },
  legenda: { marginTop: 16, fontSize: 13, color: '#666', lineHeight: 20 },
});