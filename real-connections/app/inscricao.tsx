import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Picker, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

export default function Inscricao() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [crm, setCrm] = useState('');
  const [userType, setUserType] = useState<'familia' | 'psicologo'>('familia');
  const [quantidadePessoas, setQuantidadePessoas] = useState('');
  const [nomeDependente, setNomeDependente] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://192.168.1.70:3001/usuarios/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo: userType,
          crm: userType === 'psicologo' ? crm : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        router.replace('/login');
      } else {
        alert(data.erro || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error(error);
      alert('Erro na requisição');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />

      <View style={styles.card}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>Inscrição</Text>
        </View>

        <Text style={styles.title}>Faça Sua Inscrição</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="exemplo@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>Parentesco com a pessoa dependente</Text>
        <TextInput style={styles.input} placeholder="Ex: Pai, Mãe" />

        <Text style={styles.label}>Quantidade de pessoas na família</Text>
        <TextInput style={styles.input} placeholder="Ex: 2 pessoas" value={quantidadePessoas} onChangeText={setQuantidadePessoas} />

        <Text style={styles.label}>Nome do dependente</Text>
        <TextInput style={styles.input} placeholder="Nome completo do dependente" value={nomeDependente} onChangeText={setNomeDependente} />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

        <View style={styles.toggleContainer}>
          <TouchableOpacity onPress={() => setUserType('familia')}>
            <Text style={[styles.toggleText, userType === 'familia' && styles.activeToggle]}>Família</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserType('psicologo')}>
            <Text style={[styles.toggleText, userType === 'psicologo' && styles.activeToggle]}>Psicólogo</Text>
          </TouchableOpacity>
        </View>

        {userType === 'psicologo' && (
          <TextInput style={styles.input} placeholder="CRM" value={crm} onChangeText={setCrm} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Concluir</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Já possui uma conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F2F2F2', paddingBottom: 32 },
  logo: { width: 250, height: 250, alignSelf: 'center', marginTop: 24 },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
    paddingHorizontal: 24,
    marginTop: -40,
    minHeight: height / 1.6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    elevation: 10,
  },
  tagContainer: {
    alignSelf: 'center',
    backgroundColor: '#FD814A',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: -20,
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: '#FD814A',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    color: '#FD814A',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FD814A',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
    color: '#FD814A',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  toggleText: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#888',
  },
  activeToggle: {
    fontWeight: 'bold',
    color: '#FD814A',
  },
});
