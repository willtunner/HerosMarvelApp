import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import Heros from "../../Components/Heros";
import styled from "styled-components/native/";
import ArrowL from "../../../assets/ArrowL.png";
import ArrowR from "../../../assets/ArrowR.png";
import findButtom from "../../../assets/find_hero.png";
import {Container, Titulo, Pesquisar, Sublinhado, Negrito, TextoSecundario, Label, ViewFindHero, AreaTexto, ButtonFindHero, TituloHero, TextTiluto, BodyHero, LineRed, Avatar} from './css';



export default function Home({ navigation }) {
  console.log(
    "------------------------------------------- Home ------------------------------------------ "
  );
  
  let dados;

  const [hero, setHero] = useState([]);
  const [loadding, setLoading] = useState(true);

  // ? Navegações
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [peerPage, setPeerPage] = useState(4);
  const [total, setTotal] = useState(12);
  // Math.ceil arredonda para cima
  const [totalPage, setTotalPage] = useState(Math.ceil(total / peerPage));
  const [nameHero, setNameHero] = useState();

  function findHeroName() {
    const masterKey = `ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    const BASE = "https://gateway.marvel.com/v1/public/characters?";
    const nameHero = `name=iron man&`;
    const completeUrl = `${BASE}?${nameHero}${masterKey}`;

    const hero = axios.get(completeUrl);
    setHero(hero);

  }

  function getHeros() {
    const BASE = "https://gateway.marvel.com/";
    const URL = "v1/public/characters";
    const Caracters = "v1/public/characters/1011334";
    const timeStamp = `1612100588`;
    const offset1 = `offset=${offset}`;
    const orderBy = "orderBy=name";
    const limit = `limit=4`;
    const total = 100;
    const masterKey = `ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    const completeUrl = `${BASE}${URL}?${masterKey}&${offset1}&${orderBy}&${limit}`;

    return axios.get(completeUrl);
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
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    let timer = setInterval(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <Container>
      <StatusBar style="auto" />

      <Titulo>
        <Sublinhado>BUSCA </Sublinhado>
        <Negrito>MARVEL</Negrito>
        <TextoSecundario>TESTE FRONT-END</TextoSecundario>
      </Titulo>

      {/* //todo: PESQUISAR */}
      <Pesquisar>
        <Label>Nome do Personagem</Label>
        <ViewFindHero>
          <AreaTexto placeholder="Digite o nome do seu heroi" />
          <ButtonFindHero onPress={() => alert("clicou")}>
            <Avatar source={findButtom} />
          </ButtonFindHero>
        </ViewFindHero>
      </Pesquisar>

      <TituloHero>
        <TextTiluto>Nome</TextTiluto>
      </TituloHero>

      {/* //Todo: lista Heros */}
      <BodyHero>
        <FlatList
          data={hero}
          style={{ height: "63%" }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Heros navigation={navigation} data={item} loading={loadding} />
          )}
        />
      </BodyHero>

      <LineRed/>

      {/* //Todo: <Pagination /> */}
      <View style={styles.ViewPage}>
        <TouchableOpacity>
          <Image source={ArrowL} style={styles.arrows} />
        </TouchableOpacity>

        {/* <View style={styles.naviPage}>
          <TouchableOpacity style={styles.rounded}>
            <Text style={styles.pagination2}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rounded2}>
            <Text style={styles.pagination}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rounded2}>
            <Text style={styles.pagination}>3</Text>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity onPress={() => controls.next()}>
          <Image source={ArrowR} style={styles.arrows} />
        </TouchableOpacity>
      </View>
    </Container>
  );
}





const styles = StyleSheet.create({
  arrows: {
    height: 35,
    width: 35,
  },
  pagination: {
    fontSize: 25,
    color: "#d32024",
  },
  pagination2: {
    fontSize: 25,
    color: "#FFF",
  },
  rounded: {
    backgroundColor: "#d32024",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 10,
  },
  rounded2: {
    borderWidth: 1,
    borderColor: "#d32024",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 10,
  },
  ViewPage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  naviPage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  ViewFind: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  ImgFind: {
    height: 30,
    width: 30,
    margin: 5,
    padding: 10,
    right: 38,
  },
});
