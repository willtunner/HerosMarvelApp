import styled from 'styled-components/native/';
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  } from '@expo-google-fonts/roboto';
  
  
    let [fontsLoaded] = useFonts({
      Roboto_100Thin,
      Roboto_100Thin_Italic,
      Roboto_300Light,
      Roboto_300Light_Italic,
      Roboto_400Regular,
      Roboto_400Regular_Italic,
      Roboto_500Medium,
      Roboto_500Medium_Italic,
      Roboto_700Bold,
      Roboto_700Bold_Italic,
      Roboto_900Black,
      Roboto_900Black_Italic,
    });


export const Container = styled.View`
  flex: 1;
  margin-top: 12px;
  background-color: #fff;
`;

export const Titulo = styled.View`
  flex-direction: row;
  margin-top: 12px;
  justify-content: center;
`;

export const Pesquisar = styled.View`
  flex-direction: column;
  margin-top: 12px;
  justify-content: center;
  margin-left: 53px;
`;

export const Sublinhado = styled.Text`
  color: #D32024;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline red;
  font-family: 'Roboto_900Black';
`;
export const Negrito = styled.Text`
  color: #D32024;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Roboto_900Black';
`;

export const TextoSecundario = styled.Text`
  color: #D32024;
  font-size: 16px;
  font-weight: normal;
  font-family: 'Roboto_300Light';
`;

export const Label = styled.Text`
  color: #D32024;
  font-size: 16px;
  font-weight: normal;
  font-family: 'Roboto_400Regular';
`;

export const AreaTexto = styled.TextInput`
  color: #000;
  font-size: 16px;
  font-weight: normal;
  border: solid 1px;
  width: 90%;
  border-radius: 5px;
  height: 40px;
`;
export const TituloHero = styled.TextInput`
 background-color: #D32024;
 height: 40px;
 margin-top: 12px;
 width: 100%;
 padding-left: 100px;
 `;

export const TextTiluto = styled.Text`
 color: #FFF;
 font-size: 20px;
`;
