import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";

import { css } from "../HeroPage/css";

import Comics from "../../Components/Comics";
import Persons from "../../Components/Persons";
import Creators from "../../Components/Creators";

export default function ComicPage({ route, navigation }) {
  const data = route.params.data;
  console.log(data);

  let dados;
  let comics;
  let creator;

  const {
    id,
    title,
    description,
    startYear,
    endYear,
    thumbnail,
    characters,
    available,
    creators,
  } = route.params.data;
  const collectionURI = characters.collectionURI;
  const keyCode =
    "?ts=1612100588&limit=100&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116";

  const image = `${thumbnail.path}.${thumbnail.extension}`;
  const Characters = characters.items.map((results) => results.name);
  const criadores = creators.collectionURI;

  const completeURL = `${collectionURI + keyCode}`;

  console.log("SeriesPage - Dados");
  //console.log(criadores);

  const [persons, setPersons] = useState([]);
  const [comic, setComic] = useState([]);
  const [countC, setCountC] = useState(0);
  const [creatorsPage, setCreators] = useState(0);
  const [countCreators, setCountCreators] = useState(0);

  // ? Função para pegar a url dos personagens
  function getHeros() {
    return axios.get(completeURL);
  }

  // ? Pega os Hqs de origem
  function getComicsSerie() {
    const completeUrl = `http://gateway.marvel.com/v1/public/series/${id}/comics${keyCode}`;
    console.log("URL Serie");
    //console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  function getCreatorsSerie() {
    const completeUrl = criadores + keyCode;
    console.log("URL Criadores");
    console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  useEffect(() => {
    dados = getHeros();
    comics = getComicsSerie();
    creator = getCreatorsSerie();

    dados
      .then(function (resposta) {
        const data1 = resposta.data.data.results;
        const personagens = data1.map((results) => results);
        console.log(
          "$$$$$$$$$$$$$$$$ RESPOTA DA URL COMPLETA $$$$$$$$$$$$$$$$$$$$"
        );
        //console.log(data1);

        setPersons(personagens);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    comics
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.count;
        setComic(dados);
        setCountC(count);

        // ? Pegando dados dos Hqs
        const desc = dados.map((hqs) => `${hqs.description}`);
        const id = dados.map((hqs) => `${hqs.id}`);
        const title = dados.map((hqs) => `${hqs.title}`);
        const thumbnail = dados.map(
          (hqs) => `${hqs.thumbnail.path}.${hqs.thumbnail.extension}`
        );
        const images = dados.map(
          (hqs) =>
            `${hqs.images.map((path) => path.path)}.${hqs.images.map(
              (ext) => ext.extension
            )}`
        );
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    creator
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.total;

        setCreators(dados);
        setCountCreators(count);

        console.log("Retorno criadores");
        //console.log(count);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 60,
          backgroundColor: "#FFF",
          width: "95%",
          borderRadius: 5,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: image }}
            style={{ height: 150, width: 150, borderRadius: 100, top: -50 }}
          />
        </View>

        <ScrollView style={{ marginTop: -30 }}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {`#${id} - ${title}`}
            </Text>
          </View>

          <View style={{ padding: 10 }}>
            {/* {!desc ? "Não existe descrição" : desc} */}
            <Text style={{ textAlign: "justify" }}>
              {!description ? "Não existe descrição" : description}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                // backgroundColor: "#f4f4c4",
                width: 340,
                borderRadius: 20,
              }}
            >
              <View style={{ height: 1400 }}>
                {/* // % Ano inicio/fim */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                  }}
                >
                  <Text>Start Year: </Text>
                  <Text>{startYear}</Text>
                  <Text>End Year: </Text>
                  <Text>{endYear}</Text>
                </View>

                {/* //% Personagens */}
                <View style={{ justifyContent: "flex-start", marginTop: 20 }}>
                  <Text
                    style={styles.textTit}
                  >{`PERSONAGENS (${characters.available})`}</Text>
                  <FlatList
                    horizontal
                    data={persons}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <Persons navigation={navigation} data={item} />
                    )}
                  />
                </View>

                {/* //% Comics  */}
                <View style={{ marginTop: 25 }}>
                  <Text style={styles.textTit}>{`COMICS (${countC})`}</Text>
                  <FlatList
                    style={[css.FlatComic]}
                    horizontal
                    data={comic}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <Comics navigation={navigation} data={item} />
                    )}
                  />
                </View>

                {/* //% Creators  */}
                <View style={{ marginTop: 25 }}>
                  <Text
                    style={styles.textTit}
                  >{`CRIADORES (${countCreators})`}</Text>
                  <FlatList
                    style={[css.FlatComic]}
                    horizontal
                    data={creatorsPage}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <Creators navigation={navigation} data={item} />
                    )}
                  />
                </View>

                {/* //% */}

              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1E2E44",
  },
  textTit: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
  },
});
