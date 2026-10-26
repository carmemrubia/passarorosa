import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const LARGURA = Math.min(width, 420);
export const ALTURA_JOGO = Math.max(Math.min(height * 0.55, 480), 380);
export const PASSARO = 30;
export const PASSARO_X = 70;
export const CANO_L = 64;
export const PULO = -5.5;

export const CANOS_POR_FASE = 20;

export const FASES = [
  { velocidade: 2.5, abertura: 200 },
  { velocidade: 3, abertura: 180 },
  { velocidade: 3.5, abertura: 165 },
];

const GRAVIDADE = 0.25;
const QUEDA_MAXIMA = 6;
const MARGEM = 4;
const ESPACO = 230;
const CHAO = 12;

let contadorCano = 0;

const novoCano = (x, fase) => {
  const gap = FASES[fase - 1].abertura;
  const topo = Math.max(Math.random() * (ALTURA_JOGO - gap - 100 - CHAO) + 50, 20);
  contadorCano = contadorCano + 1;
  return { id: contadorCano, x, topo, gap, passou: false };
};

export const criarEstadoInicial = (fase = 1, total = 0, ticks = 0) => ({
  y: ALTURA_JOGO / 2,
  v: 0,
  fase,
  status: 'parado',
  pontosFase: 0,
  pontosTotal: total,
  gerados: 1,
  canos: [novoCano(LARGURA, fase)],
  ticks,
  bateu: 0,
});

export const proximaFase = (p) => criarEstadoInicial(p.fase + 1, p.pontosTotal, p.ticks);

export const tentarFaseDeNovo = (p) =>
  criarEstadoInicial(p.fase, p.pontosTotal - p.pontosFase, p.ticks);

export const proximoPasso = (p) => {
  if (p.status !== 'jogando') return p;

  const cfg = FASES[p.fase - 1];
  let pontosFase = p.pontosFase;
  let pontosTotal = p.pontosTotal;
  let gerados = p.gerados;

  let canos = p.canos
    .map((c) => ({ ...c, x: c.x - cfg.velocidade }))
    .filter((c) => c.x > -CANO_L);

  const ultimo = canos[canos.length - 1];
  if (gerados < CANOS_POR_FASE && (!ultimo || ultimo.x <= LARGURA - ESPACO)) {
    canos.push(novoCano(LARGURA, p.fase));
    gerados = gerados + 1;
  }

  canos = canos.map((c) => {
    if (!c.passou && c.x + CANO_L < PASSARO_X) {
      pontosFase = pontosFase + 1;
      pontosTotal = pontosTotal + 1;
      return { ...c, passou: true };
    }
    return c;
  });

  const v = Math.min(p.v + GRAVIDADE, QUEDA_MAXIMA);
  const y = p.y + v;

  const bateuCano = canos.some(
    (c) =>
      PASSARO_X + PASSARO - MARGEM > c.x &&
      PASSARO_X + MARGEM < c.x + CANO_L &&
      (y + MARGEM < c.topo || y + PASSARO - MARGEM > c.topo + c.gap)
  );
  const bateuChao = y < 0 || y + PASSARO > ALTURA_JOGO - CHAO;
  const morreu = bateuCano || bateuChao;

  let status = 'jogando';
  if (morreu) {
    status = 'perdeu';
  } else if (pontosFase >= CANOS_POR_FASE) {
    status = p.fase === FASES.length ? 'final' : 'fase';
  }

  return {
    ...p,
    y,
    v,
    status,
    pontosFase,
    pontosTotal,
    gerados,
    canos,
    ticks: p.ticks + 1,
    bateu: p.bateu + (morreu ? 1 : 0),
  };
};