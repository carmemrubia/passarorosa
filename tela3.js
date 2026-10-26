import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import Botao from './Componentes/Botao';
import Cano from './Componentes/Cano';
import Passaro from './Componentes/Passaro';
import Estilos from './Estilos/Estilos';
import {
  LARGURA,
  ALTURA_JOGO,
  PASSARO_X,
  PULO,
  FASES,
  CANOS_POR_FASE,
  criarEstadoInicial,
  proximoPasso,
  proximaFase,
  tentarFaseDeNovo,
} from './Jogo/LogicaJogo';

let Audio = null;
try {
  Audio = require('expo-av').Audio;
} catch (e) {}

const SOM_PULO = 'https://actions.google.com/sounds/v1/cartoon/pop.ogg';
const SOM_BATIDA = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';

export default function Tela3() {
  const [g, setG] = useState(criarEstadoInicial());
  const pulo = useRef(null);
  const batida = useRef(null);
  const statusRef = useRef(g.status);
  statusRef.current = g.status;

  useEffect(() => {
    if (!Audio) return;
    (async () => {
      try {
        const a = await Audio.Sound.createAsync({ uri: SOM_PULO });
        const b = await Audio.Sound.createAsync({ uri: SOM_BATIDA });
        pulo.current = a.sound;
        batida.current = b.sound;
      } catch (e) {}
    })();
    return () => {
      try {
        if (pulo.current) pulo.current.unloadAsync();
        if (batida.current) batida.current.unloadAsync();
      } catch (e) {}
    };
  }, []);

  const tocar = (ref) => {
    try {
      if (ref.current) ref.current.replayAsync();
    } catch (e) {}
  };

  useEffect(() => {
    if (g.bateu > 0) tocar(batida);
  }, [g.bateu]);

  useEffect(() => {
    if (g.status !== 'jogando') return;
    const loop = setInterval(() => {
      setG((p) => proximoPasso(p));
    }, 30);
    return () => clearInterval(loop);
  }, [g.status]);

  const pular = () => {
    const s = statusRef.current;
    if (s !== 'parado' && s !== 'jogando') return;
    setG((p) => {
      if (p.status === 'parado') return { ...p, status: 'jogando', v: PULO };
      if (p.status === 'jogando') return { ...p, v: PULO };
      return p;
    });
    tocar(pulo);
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const aoTeclar = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        pular();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, []);

  const segundos = Math.floor((g.ticks * 30) / 1000);

  const mensagens = {
    parado: 'Fase ' + g.fase + '\n\nToque para começar',
    perdeu: 'Fim de jogo',
    fase: 'Fase ' + g.fase + ' concluída!\n\nVocê venceu a fase!',
    final: 'Parabéns!\n\nVencedor final!',
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff5f9' }}>
      <Pressable onPressIn={pular} style={{ alignSelf: 'center' }}>
        <View style={[Estilos.area, { height: ALTURA_JOGO, width: LARGURA }]}>
          {g.canos.map((c) => (
            <React.Fragment key={c.id}>
              <Cano tipo="cima" x={c.x} top={0} altura={c.topo} />
              <Cano tipo="baixo" x={c.x} top={c.topo + c.gap} altura={ALTURA_JOGO - c.topo - c.gap} />
            </React.Fragment>
          ))}
          <View style={Estilos.chao} />
          <Passaro x={PASSARO_X} y={g.y} v={g.v} vivo={g.status !== 'perdeu'} />
          <Text style={Estilos.scoreGrande}>{g.pontosFase}</Text>
          {g.status !== 'jogando' && (
            <View style={Estilos.faixa}>
              <Text style={Estilos.textoFaixa}>{mensagens[g.status]}</Text>
            </View>
          )}
        </View>
      </Pressable>
      <View style={Estilos.rodape}>
        <Text style={Estilos.pontos}>Fase {g.fase} de {FASES.length}</Text>
        <Text style={Estilos.pontos}>Canos: {g.pontosFase} / {CANOS_POR_FASE}</Text>
        <Text style={Estilos.pontos}>Tempo: {segundos}s</Text>
        {g.status === 'perdeu' && (
          <Botao titulo="Tentar de novo" aoPressionar={() => setG(tentarFaseDeNovo(g))} />
        )}
        {g.status === 'fase' && (
          <Botao titulo="Próxima fase" aoPressionar={() => setG(proximaFase(g))} />
        )}
        {g.status === 'final' && (
          <Botao titulo="Jogar novamente" aoPressionar={() => setG(criarEstadoInicial())} />
        )}
      </View>
    </View>
  );
}