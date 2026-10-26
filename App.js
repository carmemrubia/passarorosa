import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import Tela1 from './tela1';
import Tela2 from './tela2';
import Tela3 from './tela3';
import Tela4 from './tela4';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontesProntas] = useFonts({ PressStart2P_400Regular });

  if (!fontesProntas) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tela1"
        screenOptions={{
          headerStyle: { backgroundColor: '#ec6f9e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'PressStart2P_400Regular', fontSize: 14 },
        }}>
        <Stack.Screen name="Tela1" component={Tela1} options={{ title: 'Boas-vindas' }} />
        <Stack.Screen name="Tela2" component={Tela2} options={{ title: 'Instruções' }} />
        <Stack.Screen name="Tela3" component={Tela3} options={{ title: 'Jogo' }} />
        <Stack.Screen name="Tela4" component={Tela4} options={{ title: 'Créditos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}