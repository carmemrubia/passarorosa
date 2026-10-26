import React from 'react';
import { Text, Pressable } from 'react-native';
import Estilos from '../Estilos/Estilos';

export default function Botao({ titulo, aoPressionar }) {
  return (
    <Pressable style={Estilos.botao} onPress={aoPressionar}>
      <Text style={Estilos.textoBotao}>{titulo}</Text>
    </Pressable>
  );
}