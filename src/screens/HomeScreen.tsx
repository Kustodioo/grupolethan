import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { login } = useAuth();

  const handleLogin = () => {
    // Lógica para login
    const userData = { email }; // Exemplo de dado de usuário
    login(userData);
    navigation.navigate('Home');
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login Grupo Lethan</Text>
              <TextInput
                style={[styles.input, { marginTop: 5 }]}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Senha"
                  placeholderTextColor="#aaa"
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
                  <Text style={styles.toggleButtonText}>{secureTextEntry ? 'Mostrar' : 'Esconder'}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkWrapper}>
                  <Text style={styles.link}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.linkWrapper}>
                  <Text style={styles.link}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: -70, // Increased negative margin to overlap more with the form
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10, // Reduced margin bottom to bring the inputs closer
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#069DD9',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#069DD9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the links
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff', // White border color
    borderRadius: 20, // Rounded corners
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  linkWrapper: {
    paddingHorizontal: 5,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#fff', // White color for the divider
    marginHorizontal: 5,
  },
  link: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LoginScreen;
