import React, { useState, useEffect } from "react";
// import {Container, Titulo, Pesquisar, Sublinhado, Negrito, TextoSecundario, Label, AreaTexto, TituloHero, TextTiluto} from './src/styles/css';
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
import Pagination from "../../Components/Pagination";
import ArrowL from "../../../assets/ArrowL.png";
import ArrowR from "../../../assets/ArrowR.png";

export default function Home({ navigation }) {
  let dados;

  const [hero, setHero] = useState([]);

  // ? Navegações
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [peerPage, setPeerPage] = useState(4);
  const [total, setTotal] = useState(12);
  // Math.ceil arredonda para cima
  const [totalPage, setTotalPage] = useState(Math.ceil(total / peerPage));

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

    console.log(
      "============================= URL COMPLETA ============================="
    );
    console.log(completeUrl);

    return axios.get(`${completeUrl}`);
  }

  // ! Funções de controle da navegação
  const controls = {
    next() {
      setPage(page +1);
      const lastPage = page > totalPage;

      if(lastPage) {
        setPage( page -1);
      }
    },
    prev() {
      setPage(page -1)
    },
    goTo() {},
  };



  /**
   * page = offset
   * peerPage = limit
   * totalPage = total
   */

  useEffect(() => {
    // ? Pega os dados retornados da função e armazena na variavel
    dados = getHeros();

    dados
      .then(function (resposta) {
        // ? pega a resposta e salva o array de todos os heros na variavel
        const heros = resposta.data.data.results;
        // ? popula o state hero
        setHero(heros);
        console.log("heros vindo do state..");
        // console.log(hero);

        console.log(
          "============================= HEROS ============================="
        );
        // console.log(heros);
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

        console.log(
          "============================= COMICS ============================="
        );
        console.log(heros.map((heros) => `${heros.comics.collectionURI}}`));

        console.log(
          "============================= TOTALPAGES ============================="
        );
        console.log(`Total de pages: ${totalPage}`);
        console.log(`Página atual: ${page}`);
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Heros navigation={navigation} data={item} />
          )}
        />
      </View>
      <View style={styles.redBorder}></View>
      {/* <Pagination /> */}
      <View style={styles.ViewPage}>
        <TouchableOpacity>
          <Image source={ArrowL} style={styles.arrows} />
        </TouchableOpacity>

        <View style={styles.naviPage}>
          <TouchableOpacity style={styles.rounded}>
            <Text style={styles.pagination2}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rounded2}>
            <Text style={styles.pagination}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rounded2}>
            <Text style={styles.pagination}>3</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => controls.next()}>
          <Image source={ArrowR} style={styles.arrows} />
        </TouchableOpacity>
      </View>
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
  color: #ec1d24;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline red;
`;
const Negrito = styled.Text`
  color: #ec1d24;
  font-size: 16px;
  font-weight: bold;
`;

const TextoSecundario = styled.Text`
  color: #ec1d24;
  font-size: 16px;
  font-weight: normal;
`;

const Label = styled.Text`
  color: #ec1d24;
  font-size: 16px;
  font-weight: normal;
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
  background-color: #ec1d24;
  height: 40px;
  margin-top: 12px;
  width: 100%;
  padding-left: 100px;
`;

const TextTiluto = styled.Text`
  color: #fff;
  font-size: 20px;
`;

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
  redBorder: {
    width: "100%",
    height: 15,
    backgroundColor: "#EC1D24",
    marginBottom: 20,
  },
});
