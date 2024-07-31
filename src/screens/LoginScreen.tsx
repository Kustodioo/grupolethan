import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import tw from 'twrnc';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { login } = useAuth();

  const handleLogin = () => {
    const userData = { email };
    login(userData);
    navigation.navigate('Home');
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={tw`flex-1`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={tw`flex-1`}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw`absolute inset-0 bg-black bg-opacity-20 justify-center items-center px-8`}>
            <Image source={require('../assets/logo.png')} style={tw`w-50 h-17 mb-6`} resizeMode="contain" />
            <View style={tw`w-full items-center`}>
              <Text style={tw`text-2xl text-white mb-4 text-center`}>Login Grupo Lethan</Text>
              <TextInput
                style={tw`w-full h-10 border border-gray-500 mb-2 px-4 bg-white bg-opacity-80 rounded-md`}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
              />
              <View style={tw`flex-row items-center w-full mb-2`}>
                <TextInput
                  style={tw`flex-1 h-10 border border-gray-500 px-4 bg-white bg-opacity-80 rounded-md`}
                  placeholder="Senha"
                  placeholderTextColor="#aaa"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={tw`absolute right-2 h-10 justify-center items-center`}>
                  <Text style={tw`text-blue-500 text-sm`}>{secureTextEntry ? 'Mostrar' : 'Esconder'}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={tw`w-full h-10 bg-blue-500 justify-center items-center rounded-md mb-2`} onPress={handleLogin}>
                <Text style={tw`text-white text-lg`}>Entrar</Text>
              </TouchableOpacity>
              <View style={tw`flex-row justify-center items-center border border-white rounded-md py-1 px-2 mt-2`}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={tw`px-2`}>
                  <Text style={tw`text-white text-sm`}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <View style={tw`w-px h-5 bg-white mx-2`} />
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={tw`px-2`}>
                  <Text style={tw`text-white text-sm`}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
