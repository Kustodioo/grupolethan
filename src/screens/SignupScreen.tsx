import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from 'twrnc';

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
    } catch (error: any) {
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
    <SafeAreaView style={tw`flex-1 bg-gray-800`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAwareScrollView contentContainerStyle={tw`flex-grow justify-center items-center px-5 bg-gray-800`} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw`w-full items-center`}>
            <Text style={tw`text-2xl text-white mb-5 text-center`}>Cadastre-se</Text>
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md text-white`}
              placeholder="Nome Completo"
              placeholderTextColor="#fff"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md text-white`}
              placeholder="Celular"
              placeholderTextColor="#fff"
              value={cellPhone}
              onChangeText={setCellPhone}
            />
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md text-white`}
              placeholder="Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md text-white`}
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
              style={tw`w-full mb-5 bg-white bg-opacity-80 rounded-md`}
              placeholderStyle={{ color: '#fff' }}
              dropDownContainerStyle={tw`bg-white border border-gray-500`}
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
              style={tw`w-full mb-5 bg-white bg-opacity-80 rounded-md`}
              placeholderStyle={{ color: '#fff' }}
              dropDownContainerStyle={tw`bg-white border border-gray-500`}
              zIndex={4000}
              zIndexInverse={5000}
            />
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md text-white`}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#fff"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md text-white`}
              placeholder="Confirmar Senha"
              secureTextEntry
              placeholderTextColor="#fff"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={tw`w-full h-10 bg-blue-500 justify-center items-center rounded-md mb-5`} onPress={handleSignup}>
              <Text style={tw`text-white text-lg`}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`justify-center items-center border border-white rounded-md px-5 py-2`} onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-white text-lg`}>Voltar para Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
