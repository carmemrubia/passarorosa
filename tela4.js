import React from 'react';
import { ScrollView, Text } from 'react-native';
import Botao from './Componentes/Botao';
import Estilos from './Estilos/Estilos';

export default function Tela4({ navigation }) {
  return (
    <ScrollView contentContainerStyle={Estilos.scrollClean}>
      <Text style={Estilos.subtitulo}>Créditos</Text>
      <Text style={Estilos.texto}>Desenvolvido por: CARMEM R T S</Text>
      <Text style={Estilos.texto}>FATEC Itaquera</Text>
      <Text style={Estilos.texto}>Curso: Desenvolvimento de Software Multiplataforma</Text>
      <Text style={Estilos.frase}>Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize as informações aqui para uso real.</Text>
      <Botao titulo="Voltar ao início" aoPressionar={() => navigation.navigate('Tela1')} />
    </ScrollView>
  );
}