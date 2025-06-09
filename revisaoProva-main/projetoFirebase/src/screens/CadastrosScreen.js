import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../styles/cadastrosStyles';
import { db } from '../services/credenciaisFirebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../services/credenciaisFirebaseAuth';

export default function ProjetosScreen({ navigation }) {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [nomeCurso, setNomeCurso] = useState('');
  const [nomeIntegrantes, setNomeIntegrantes] = useState('');
  const [temaProjeto, setTemaProjeto] = useState('');
  const [descricaoProjeto, setDescricaoProjeto] = useState('');
  const [form, setForm] = useState({
    nome: '',
    periodo: '',
    curso: '',
    email: '',
    senha: '',
    tipo: 'aluno'
  });

  const handleUserChange = (field, value) =>
    setForm({ ...form, [field]: value });

  const handleCadastrarProjeto = async () => {
    if (!nomeProjeto.trim()) {
      return Alert.alert('Atenção', 'Informe o nome do projeto.');
    }

    try {
      await addDoc(collection(db, 'projetos'), {
        nome: nomeProjeto,
        curso: nomeCurso,
        nomeIntegrantes: nomeIntegrantes,
        descricaoProjeto: descricaoProjeto,
        temaProjeto: temaProjeto,
        criadoEm: new Date()
      });

      Alert.alert('Sucesso', 'Projeto cadastrado com sucesso!');
      setNomeProjeto('');
      setNomeIntegrantes('');
      setDescricaoProjeto('');
      setTemaProjeto('');
      setNomeCurso('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o projeto.');
    }
  };

  const handleCadastrarUsuario = async () => {
    if (!form.nome || !form.email || !form.senha) {
      return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
    }

    try {
      await addDoc(collection(db, 'usuarios'), form);
      await createUserWithEmailAndPassword(auth, form.email, form.senha);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setForm({
        nome: '',
        periodo: '',
        curso: '',
        email: '',
        senha: '',
        tipo: 'aluno'
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro de Projetos</Text>
      <TextInput
        placeholder="Nome do Projeto"
        style={globalStyles.input}
        value={nomeProjeto}
        onChangeText={setNomeProjeto}
      />
      <TextInput
        placeholder="Tema do Projeto"
        style={globalStyles.input}
        value={temaProjeto}
        onChangeText={setTemaProjeto}
      />
      <TextInput
        placeholder="Curso"
        style={globalStyles.input}
        value={nomeCurso}
        onChangeText={setNomeCurso}
      />
      <TextInput
        placeholder="Integrantes do Grupo"
        style={globalStyles.input}
        value={nomeIntegrantes}
        onChangeText={setNomeIntegrantes}
      />
      <TextInput
        placeholder="Descrição do Projeto"
        style={[globalStyles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        numberOfLines={4}
        value={descricaoProjeto}
        onChangeText={setDescricaoProjeto}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleCadastrarProjeto}>
        <Text style={globalStyles.buttonText}>Cadastrar Projeto</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />

      <Text style={globalStyles.title}>Cadastro de Usuário</Text>
      <TextInput
        placeholder="Nome"
        style={globalStyles.input}
        value={form.nome}
        onChangeText={(v) => handleUserChange('nome', v)}
      />

      {form.tipo === 'aluno' && (
        <>
          <TextInput
            placeholder="Período"
            style={globalStyles.input}
            value={form.periodo}
            onChangeText={(v) => handleUserChange('periodo', v)}
          />
          <TextInput
            placeholder="Curso"
            style={globalStyles.input}
            value={form.curso}
            onChangeText={(v) => handleUserChange('curso', v)}
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={form.email}
        onChangeText={(v) => handleUserChange('email', v)}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={globalStyles.input}
        value={form.senha}
        onChangeText={(v) => handleUserChange('senha', v)}
      />

      <Text style={globalStyles.label}>Tipo de usuário</Text>
      <Picker
        selectedValue={form.tipo}
        style={globalStyles.input}
        onValueChange={(itemValue) => handleUserChange('tipo', itemValue)}
      >
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Avaliador" value="avaliador" />
      </Picker>

      <TouchableOpacity style={globalStyles.button} onPress={handleCadastrarUsuario}>
        <Text style={globalStyles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
