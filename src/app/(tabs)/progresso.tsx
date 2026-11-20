import { View, Text, StyleSheet } from 'react-native';

const DIAS_DO_MES = 30; // novembro tem 30 dias

// Cores de exemplo; depois vão depender dos hábitos realmente feitos
function corDoDia(dia: number) {
  if (dia % 3 === 0) return '#6C5CE7';
  if (dia % 2 === 0) return '#C9C3F5';
  return '#EEEEEE';
}

export default function ProgressoScreen() {
  const dias = Array.from({ length: DIAS_DO_MES }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novembro 2026</Text>
      <View style={styles.grade}>
        {dias.map((dia) => (
          <View key={dia} style={[styles.dia, { backgroundColor: corDoDia(dia) }]}>
            <Text style={styles.diaTexto}>{dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dia: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaTexto: { fontSize: 12 },
});