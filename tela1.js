import React from 'react';
import { View, Text } from 'react-native';
import Botao from './Componentes/Botao';
import Estilos from './Estilos/Estilos';

export default function Tela1({ navigation }) {
  return (
    <View style={Estilos.container}>
      <Text style={Estilos.titulo}>Flappy Bird</Text>
      <Text style={Estilos.textoClaro}>Bem-vindo ao jogo!</Text>
      <Botao titulo="Instruções" aoPressionar={() => navigation.navigate('Tela2')} />
      <Botao titulo="Jogar" aoPressionar={() => navigation.navigate('Tela3')} />
      <Botao titulo="Créditos" aoPressionar={() => navigation.navigate('Tela4')} />
    </View>
  );
}