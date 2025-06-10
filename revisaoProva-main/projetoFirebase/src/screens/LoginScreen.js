import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import auth from '../services/credenciaisFirebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/credenciaisFirebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const pessoaRef = collection(db, 'pessoa');
      const q = query(pessoaRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        await AsyncStorage.setItem(
          '@usuarioLogado',
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            tipo: userData.tipo,
          })
        );

        Alert.alert('Sucesso', 'Logado com sucesso!');
        navigation.navigate('HomeTabs'); 
      } else {
        Alert.alert('Erro', 'Usuário não encontrado na coleção pessoa');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha no login: ' + error.message);
      console.error(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        style={globalStyles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
