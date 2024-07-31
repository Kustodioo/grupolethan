import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'twrnc';
import RNPickerSelect from 'react-native-picker-select';
import { v4 as uuidv4 } from 'uuid';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [formId, setFormId] = useState<string>('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const clientLink = `https://lethan.com/register?ref=${user?.id}`;

  const copyToClipboard = () => {
    Clipboard.setString(clientLink);
    Alert.alert('Link Copiado', 'O link do cliente foi copiado para a área de transferência.');
  };

  const handleGenerateId = () => {
    setFormId(uuidv4());
  };

  const handleSave = () => {
    if (!selectedCity || !selectedSeller || !formId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    Alert.alert('Sucesso', `Indicação salva com ID: ${formId}`);
    setModalVisible(false);
  };

  const currentHeight = StatusBar.currentHeight ?? 0;

  const screenWidth = Dimensions.get('window').width;

  // Dados de exemplo para o gráfico de pizza
  const data = [
    {
      name: 'Cidade 1',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cidade 2',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cidade 3',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={tw`w-full items-center pt-${currentHeight} pb-5 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} relative`}>
        <TouchableOpacity style={tw`absolute top-${currentHeight} right-4 p-2 mt-10`} onPress={toggleTheme}>
          <FontAwesome name={isDarkMode ? "sun-o" : "moon-o"} size={24} color={isDarkMode ? "#FFA500" : "#000000"} />
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={tw`w-60 h-17 mt-4 mb-4`} resizeMode="contain" />
      </View>
      <ScrollView contentContainerStyle={tw`flex-grow items-center px-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <View style={tw`w-full items-center p-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg mt-5`}>
          <Text style={tw`text-2xl ${isDarkMode ? 'text-white' : 'text-black'} mb-2 text-center font-bold`}>Dashboard Grupo Lethan</Text>
          <Text style={tw`text-lg ${isDarkMode ? 'text-white' : 'text-black'} mb-2 text-center font-bold`}>Seja Bem Vindo {user?.fullName}</Text>
          <TextInput
            style={tw`w-full h-10 border border-gray-500 mb-2 px-10 bg-white bg-opacity-80 rounded-full text-gray-800`}
            value={clientLink}
            editable={false}
          />
          <View style={tw`flex-row w-full justify-between mb-5 mt-2`}>
            <TouchableOpacity style={tw`flex-1 h-12 bg-blue-500 justify-center items-center rounded-lg mr-2`} onPress={copyToClipboard}>
              <FontAwesome name="clipboard" size={20} color="#fff" />
              <Text style={tw`text-white text-lg`}>Copiar Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-1 h-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center items-center rounded-lg`} onPress={() => Alert.alert('Inteligência', 'Botão Lethan Inteligência pressionado!')}>
              <FontAwesome name="brain" size={20} color="#fff" />
              <Text style={tw`text-white text-lg`}>Lethan Inteligência</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal style={tw`flex-row mb-5`}>
          {['SAC LETHAN', 'VIDEOS EDUCATIVOS', 'OUTRO SERVIÇO'].map((service, index) => (
            <TouchableOpacity key={index} style={tw`w-32 h-24 ${index % 2 === 0 ? 'bg-blue-500' : 'bg-yellow-400'} rounded-lg p-2 mx-1 items-center justify-center`}>
              <Text style={tw`text-white text-lg`}>{service}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={tw`w-full h-10 bg-cyan-500 justify-center items-center rounded-lg mb-5 mt-2`} onPress={() => { setModalVisible(true); handleGenerateId(); }}>
          <Text style={tw`text-white text-lg`}>Cadastrar Indicação de Clientes</Text>
        </TouchableOpacity>
        <View style={tw`w-full flex-row justify-between mb-5`}>
          <TouchableOpacity style={tw`flex-1 bg-blue-500 rounded-lg p-3 mx-1 items-center justify-center`}>
            <Text style={tw`text-white text-lg`}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-1 bg-blue-500 rounded-lg p-3 mx-1 items-center justify-center`}>
            <Text style={tw`text-white text-lg`}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-1 bg-blue-500 rounded-lg p-3 mx-1 items-center justify-center`}>
            <Text style={tw`text-white text-lg`}>Perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full mb-5`}>
          <Text style={tw`text-lg ${isDarkMode ? 'text-white' : 'text-black'} mb-2 font-bold`}>Indicações</Text>
          <View style={tw`bg-white rounded-lg p-5`}>
            <Text style={tw`text-lg text-gray-800 mb-2`}>Pontos Acumulados</Text>
            <Text style={tw`text-lg text-gray-600 mb-2`}>todos seu Pontos Acumulados</Text>
            <Text style={tw`text-xl text-gray-800`}>1000 Pontos</Text>
          </View>
          <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1 justify-center items-center`}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`flex-1 justify-center items-center`}>
              <View style={tw`w-11/12 p-5 bg-white rounded-lg shadow-md items-center`}>
                <Text style={tw`text-lg mb-4`}>Cadastro de Indicação</Text>
                <TextInput
                  style={tw`w-full h-10 border border-gray-500 mb-2 px-25`}
                  placeholder="Nome Completo"
                  placeholderTextColor="#ff0000"
                />
                <TextInput
                  style={tw`w-full h-10 border border-gray-500 mb-2 px-32`}
                  placeholder="Email"
                  placeholderTextColor="#888"
                />
                <TextInput
                  style={tw`w-full h-10 border border-gray-500 mb-2 px-30`}
                  placeholder="Telefone"
                  placeholderTextColor="#ff0000"
                />
                <TextInput
                  style={tw`w-full h-10 border border-gray-500 mb-2 px-33`}
                  placeholder="Kwh"
                  placeholderTextColor="#888"
                />
                <RNPickerSelect
                  onValueChange={(value) => setSelectedCity(value)}
                  items={[
                    { label: 'Cidade 1', value: 'cidade1' },
                    { label: 'Cidade 2', value: 'cidade2' },
                    { label: 'Cidade 3', value: 'cidade3' },
                  ]}
                  style={{
                    inputIOS: tw`w-full h-10 border border-gray-500 mb-2 px-4`,
                    inputAndroid: tw`w-full h-10 border border-gray-500 mb-2 px-4`,
                  }}
                  placeholder={{ label: 'Selecione uma cidade', value: null }}
                />
                <RNPickerSelect
                  onValueChange={(value) => setSelectedSeller(value)}
                  items={[
                    { label: 'Vendedor 1', value: 'vendedor1' },
                    { label: 'Vendedor 2', value: 'vendedor2' },
                    { label: 'Outros', value: 'outros' },
                  ]}
                  style={{
                    inputIOS: tw`w-full h-10 border border-gray-500 mb-2 px-4`,
                    inputAndroid: tw`w-full h-10 border border-gray-500 mb-2 px-4`,
                  }}
                  placeholder={{ label: 'Selecione um vendedor', value: null }}
                />
                <TextInput
                  style={tw`w-full h-10 border border-gray-500 mb-2 px-2`}
                  placeholder="ID - Geração Automática"
                  placeholderTextColor="#ff0000"
                  value={formId}
                  editable={false}
                />
                <Text style={tw`text-red-500 mb-4`}>Campos em Vermelho Obrigatório</Text>
                <Pressable
                  style={tw`bg-blue-500 rounded-lg p-3 mb-4`}
                  onPress={handleSave}
                >
                  <Text style={tw`text-white text-lg`}>Cadastrar Indicação</Text>
                </Pressable>
                <Pressable
                  style={tw`absolute top-2 right-2 p-2`}
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesome name="times" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
