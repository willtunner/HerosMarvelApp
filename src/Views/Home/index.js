import React, { useState, useEffect } from "react";
// import {Container, Titulo, Pesquisar, Sublinhado, Negrito, TextoSecundario, Label, AreaTexto, TituloHero, TextTiluto} from './src/styles/css';
import { StatusBar } from "expo-status-bar";
const axios = require("axios");
import {FlatList, View} from 'react-native';
import Heros from '../../Components/Heros';
import styled from "styled-components/native/";
import Pagination from '../../Components/Pagination';


export default function Home({navigation}) {

  let dados;
  
  const [hero, setHero] = useState([]);

  function getHeros() {
    const BASE = "https://gateway.marvel.com/";
    const URL = "v1/public/characters";
    const Caracters = "v1/public/characters/1011334";
    const timeStamp = "ts=1612100588";
    const orderBy = "orderBy=name";
    const limit = "limit=4";
    const apiKey = "apikey=441f8e1d35a71620f2cc514653ca8d66";
    const hash = "hash=67b23bf97ed17c43aaec511386e91116";
    const completeUrl = `${BASE}${URL}?${timeStamp}&${orderBy}&${limit}&${apiKey}&${hash}`;

    console.log(
      "============================= URL COMPLETA ============================="
    );
    console.log(completeUrl);

    return axios.get(
      `${BASE}${URL}?${timeStamp}&${orderBy}&${limit}&${apiKey}&${hash}`
    );
  }

  useEffect(() => {
    // ? Pega os dados retornados da função e armazena na variavel
    dados = getHeros();

    dados
      .then(function (resposta) {
        // ? pega a resposta e salva o array de todos os heros na variavel
        const heros = resposta.data.data.results;
        // ? popula o state hero
        setHero(heros);
        console.log('heros vindo do state..');
        console.log(hero);

        console.log(
          "============================= HEROS ============================="
        );
        console.log(heros);
        // ? Faz um map pegando apenas os nomes
        const names = hero.map((heros) => `${heros.id} - ${heros.name}`);
        // ? Mostra no console os nomes retornados
        console.log(
          "============================= NAMES ============================="
        );
        console.log(names);

        console.log(
          "============================= IMAGENS ============================="
        );
        console.log(
          heros.map(
            (heros) => `${heros.thumbnail.path}.${heros.thumbnail.extension}`
          )
        );
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });
  }, []);

  return (
    <Container>
      <StatusBar style="auto" />

      <Titulo>
        <Sublinhado>BUSCA </Sublinhado>
        <Negrito>MARVEL</Negrito>
        <TextoSecundario>TESTE FRONT-END</TextoSecundario>
      </Titulo>

      <Pesquisar>
        <Label>Nome do Personagem</Label>
        <AreaTexto placeholder="Digite o nome do seu heroi" />
      </Pesquisar>

      <TituloHero>
        <TextTiluto>Nome</TextTiluto>
      </TituloHero>

      <View>
        <FlatList
          data={hero}
          keyExtractor={ item => item.id.toString() }
          renderItem = { ({item}) => <Heros navigation={navigation} data={item} />}
        />
      </View>
      <Pagination />
      <View style={{width: '100%', height:15, backgroundColor: '#d32024'}}></View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin-top: 12px;
  background-color: #fff;
`;

const Titulo = styled.View`
  flex-direction: row;
  margin-top: 12px;
  justify-content: center;
`;

const Pesquisar = styled.View`
  flex-direction: column;
  margin-top: 12px;
  justify-content: center;
  margin-left: 53px;
`;

const Sublinhado = styled.Text`
  color: #d32024;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline red;
  font-family: "Roboto_900Black";
`;
const Negrito = styled.Text`
  color: #d32024;
  font-size: 16px;
  font-weight: bold;
  font-family: "Roboto_900Black";
`;

const TextoSecundario = styled.Text`
  color: #d32024;
  font-size: 16px;
  font-weight: normal;
  font-family: "Roboto_300Light";
`;

const Label = styled.Text`
  color: #d32024;
  font-size: 16px;
  font-weight: normal;
  font-family: "Roboto_400Regular";
`;

const AreaTexto = styled.TextInput`
  color: #000;
  font-size: 16px;
  font-weight: normal;
  border: solid 1px;
  width: 90%;
  border-radius: 5px;
  height: 40px;
`;
const TituloHero = styled.TextInput`
  background-color: #d32024;
  height: 40px;
  margin-top: 12px;
  width: 100%;
  padding-left: 100px;
`;

const TextTiluto = styled.Text`
  color: #fff;
  font-size: 20px;
`;
