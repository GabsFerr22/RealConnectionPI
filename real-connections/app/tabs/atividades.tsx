import { View, Text, StyleSheet, ScrollView, TouchableOpacity, CheckBox, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Atividades() {
  const [atividades, setAtividades] = useState([
    {
      id: 1,
      titulo: 'Assistir um filme de 1h30min sem interrupções e sem telefone.',
      respondido: false,
    },
    {
      id: 2,
      titulo: 'Ir à praia em família e passar 1h sem usar o telefone',
      respondido: true,
    },
    {
      id: 3,
      titulo: 'Passear com os animais',
      respondido: false,
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="gift-outline" size={28} color="#FD814A" />
        <Text style={styles.title}>Atividades</Text>
      </View>

      <View style={styles.dates}>
        <Text style={styles.dateText}>09/04</Text>
        <Text style={[styles.dateText, styles.selectedDate]}>10/04</Text>
        <Text style={styles.dateText}>09/04</Text>
      </View>

      {atividades.map((atividade) => (
        <View key={atividade.id} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{atividade.titulo}</Text>
            <Ionicons
              name={atividade.respondido ? 'checkbox' : 'square-outline'}
              size={24}
              color={atividade.respondido ? '#5DD39E' : '#fff'}
            />
          </View>

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>
              {atividade.respondido ? 'Visualizar relatório' : 'Responder relatório'}
            </Text>
            <Ionicons name="create-outline" size={16} color="#FD814A" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FD814A',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
  },
  selectedDate: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  card: {
    backgroundColor: '#FD814A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  botao: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  botaoTexto: {
    color: '#FD814A',
    fontWeight: 'bold',
  },
});