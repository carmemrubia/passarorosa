import React from 'react';
import { View } from 'react-native';
import Estilos from '../Estilos/Estilos';
import { CANO_L } from '../Jogo/LogicaJogo';

export default function Cano({ x, top, altura, tipo }) {
  const h = Math.max(altura, 0);
  const alturaTampa = Math.min(26, h);
  const posicaoTampa = tipo === 'cima' ? { bottom: 0 } : { top: 0 };

  return (
    <View style={{ position: 'absolute', left: x, top: top, width: CANO_L, height: h }}>
      <View style={[Estilos.corpoCano, { left: 4, top: 0, width: CANO_L - 8, height: h }]}>
        <View style={Estilos.brilhoCano} />
      </View>
      <View
        style={[
          Estilos.tampaCano,
          { left: -2, width: CANO_L + 4, height: alturaTampa },
          posicaoTampa,
        ]}
      />
    </View>
  );
}