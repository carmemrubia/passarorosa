import React from 'react';
import { View } from 'react-native';
import Estilos from '../Estilos/Estilos';

export default function Passaro({ x, y, v, vivo }) {
  const inclinacao = Math.max(-25, Math.min(v * 7, 70));

  return (
    <View
      style={[
        Estilos.passaroBox,
        {
          left: x,
          top: y,
          opacity: vivo ? 1 : 0.6,
          transform: [{ rotate: inclinacao + 'deg' }],
        },
      ]}>
      <View style={Estilos.passaroCorpo} />
      <View style={Estilos.passaroAsa} />
      <View style={Estilos.passaroOlho}>
        <View style={Estilos.passaroPupila} />
      </View>
      <View style={Estilos.passaroBico} />
    </View>
  );
}