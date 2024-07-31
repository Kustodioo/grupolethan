import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    // Adicione aqui a lógica para envio das instruções de redefinição de senha
    Alert.alert('Sucesso', 'Instruções de redefinição de senha enviadas para o seu email');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-800`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw`flex-1 justify-center items-center px-5 bg-gray-800`}>
            <Text style={tw`text-2xl text-white mb-5 text-center`}>Redefinir Senha</Text>
            <TextInput
              style={tw`w-full h-10 border border-gray-500 mb-5 px-4 bg-white bg-opacity-80 rounded-md`}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={tw`w-full h-10 bg-blue-500 justify-center items-center rounded-md mb-5`} onPress={handleResetPassword}>
              <Text style={tw`text-white text-lg`}>Enviar Instruções</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`justify-center items-center border border-white rounded-md px-5 py-2`} onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-white text-lg`}>Voltar para Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
