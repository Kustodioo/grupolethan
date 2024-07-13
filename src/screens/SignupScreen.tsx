import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState<string>('');
  const [cellPhone, setCellPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [openSeller, setOpenSeller] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !fullName || password !== confirmPassword) {
      Alert.alert('Erro', 'Por favor, insira todos os campos e certifique-se de que as senhas correspondem');
      return;
    }

    try {
      await register({ fullName, cellPhone, email, address, selectedSeller, selectedCity, password });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      navigation.navigate('Home');
    } catch (error: any) {  // Adiciona tipo 'any' para o erro
      Alert.alert('Erro', error.message);
    }
  };

  const sellers = [
    { label: 'Vendedor 1', value: 'vendedor1' },
    { label: 'Vendedor 2', value: 'vendedor2' },
    { label: 'Outros', value: 'outros' },
  ];

  const cities = [
    { label: 'Cidade 1', value: 'cidade1' },
    { label: 'Cidade 2', value: 'cidade2' },
    { label: 'Cidade 3', value: 'cidade3' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Cadastre-se</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#fff"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Celular"
              placeholderTextColor="#fff"
              value={cellPhone}
              onChangeText={setCellPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço (opcional)"
              placeholderTextColor="#fff"
              value={address}
              onChangeText={setAddress}
            />
            <DropDownPicker
              open={openSeller}
              value={selectedSeller}
              items={sellers}
              setOpen={setOpenSeller}
              setValue={setSelectedSeller}
              placeholder="Selecione um vendedor"
              style={styles.picker}
              placeholderStyle={{ color: '#fff' }}
              dropDownContainerStyle={[styles.dropDownContainer, { backgroundColor: '#fff' }]}
              zIndex={5000}
              zIndexInverse={6000}
            />
            <DropDownPicker
              open={openCity}
              value={selectedCity}
              items={cities}
              setOpen={setOpenCity}
              setValue={setSelectedCity}
              placeholder="Selecione uma cidade"
              style={styles.picker}
              placeholderStyle={{ color: '#fff' }}
              dropDownContainerStyle={[styles.dropDownContainer, { backgroundColor: '#fff' }]}
              zIndex={4000}
              zIndexInverse={5000}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#fff"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              secureTextEntry
              placeholderTextColor="#fff"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backButtonText}>Voltar para Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333333',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333333',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    color: '#fff',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  dropDownContainer: {
    backgroundColor: '#fff',
    borderColor: 'gray',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#069DD9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignupScreen;
