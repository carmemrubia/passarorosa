import React from 'react';
import { ScrollView, Text } from 'react-native';
import Botao from './Componentes/Botao';
import Estilos from './Estilos/Estilos';

export default function Tela2({ navigation }) {
  return (
    <ScrollView contentContainerStyle={Estilos.scrollClean}>
      <Text style={Estilos.subtitulo}>Como jogar</Text>
      <Text style={Estilos.texto}>1. Toque na tela ou aperte a barra de espaço para o pássaro subir.</Text>
      <Text style={Estilos.texto}>2. Passe pelos canos sem bater.</Text>
      <Text style={Estilos.texto}>3. Cada fase tem 20 canos.</Text>
      <Text style={Estilos.texto}>4. São 3 fases, cada uma mais rápida que a anterior.</Text>
      <Text style={Estilos.texto}>5. Vença as 3 fases para ser o vencedor final!</Text>
      <Botao titulo="Jogar" aoPressionar={() => navigation.navigate('Tela3')} />
    </ScrollView>
  );
}