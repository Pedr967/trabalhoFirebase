import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../services/credenciaisFirebaseAuth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import globalStyles from '../styles/cadastrosStyles';

const db = getFirestore();

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    periodo: '',
    curso: '',
    email: '',
    senha: '',
    tipoUsuario: 'aluno',
  });

  const handleChange = (field, value) =>
    setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'pessoa', user.uid), {
        nome: form.nome,
        periodo: form.periodo || '',
        curso: form.curso || '',
        email: form.email,
        tipo: form.tipoUsuario, 
      });

      Alert.alert('Sucesso', 'Usuário cadastrado!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Falha no cadastro');
      console.error(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        style={globalStyles.input}
        value={form.nome}
        onChangeText={(v) => handleChange('nome', v)}
      />

      {form.tipoUsuario === 'aluno' && (
        <>
          <TextInput
            placeholder="Período"
            style={globalStyles.input}
            value={form.periodo}
            onChangeText={(v) => handleChange('periodo', v)}
          />
          <TextInput
            placeholder="Curso"
            style={globalStyles.input}
            value={form.curso}
            onChangeText={(v) => handleChange('curso', v)}
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={form.email}
        onChangeText={(v) => handleChange('email', v)}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={globalStyles.input}
        value={form.senha}
        onChangeText={(v) => handleChange('senha', v)}
      />

      <Text style={globalStyles.label}>Tipo de usuário</Text>
      <Picker
        selectedValue={form.tipoUsuario}
        style={globalStyles.input}
        onValueChange={(itemValue) => handleChange('tipoUsuario', itemValue)}
      >
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Avaliador" value="avaliador" />
      </Picker>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSubmit}
      >
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
