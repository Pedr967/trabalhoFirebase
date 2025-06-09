import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'; // ajuste o caminho conforme seu projeto
import { StatusBar } from 'expo-status-bar';

import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from './src/services/credenciaisFirebase';

function AdminSetup() {
  useEffect(() => {
    const garanteAdmin = async () => {
      const auth = getAuth();
      const emailAdmin = 'administrador@gmail.com';
      const senhaAdmin = 'adm123';

      try {
        const methods = await fetchSignInMethodsForEmail(auth, emailAdmin);
        if (methods.length === 0) {
          await createUserWithEmailAndPassword(auth, emailAdmin, senhaAdmin);
          console.log('Admin criado no Auth');
        }

        const pessoaRef = collection(db, 'pessoa');
        const q = query(pessoaRef, where('email', '==', emailAdmin));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(pessoaRef, {
            nome: 'administrador',
            email: emailAdmin,
            tipo: 'administrador',
            criadoEm: new Date(),
          });
          console.log('Perfil admin criado na coleção pessoa');
        }
      } catch (error) {
        console.error('Erro no setup admin:', error);
        Alert.alert('Erro', 'Falha ao configurar administrador');
      }
    };

    garanteAdmin();
  }, []);

  return null;
}

export default function App() {
  return (
    <NavigationContainer>
      <AdminSetup />
      <StackNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
