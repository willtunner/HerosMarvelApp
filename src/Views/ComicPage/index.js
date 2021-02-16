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

import Persons from "../../Components/Persons";

export default function ComicPage({ route, navigation }) {
  const data = route.params.data;
  let dados;

  const [persons, setPersons] = useState([]);

  //const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;

  const {
    id,
    format,
    images,
    issueNumber,
    pageCount,
    prices,
    description,
    title,
    characters,
  } = route.params.data;

  const collectionURI = characters.collectionURI;
  const image = images.map((result) => result.path + "." + result.extension);
  const price = prices.map((result) => result.price);
  const typePrice = prices.map((result) => result.type);
  const Characters = characters.items.map((results) => results.name);
  const CharactersURI = characters.items.map((results) => results.resourceURI);
  const completeURL = `${collectionURI}?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;

  console.log(
    "============================= DEBUG - TESTE ============================="
  );
  // console.log(image[2]);
  console.log(completeURL);
  console.log("$$$$$$$$$$$$$$$$$$$$$$$ DATA $$$$$$$$$$$$$$$$$$$$$$$$$");
  //console.log(data);

  // ? Função para pegar a url dos personagens
  function getHeros() {
    return axios.get(completeURL);
  }

  useEffect(() => {
    dados = getHeros();

    dados
      .then(function (resposta) {
        const data1 = resposta.data.data.results;
        const personagens = data1.map((results) => results);
        console.log(
          "$$$$$$$$$$$$$$$$ RESPOTA DA URL COMPLETA $$$$$$$$$$$$$$$$$$$$"
        );
        console.log(personagens);

        setPersons(personagens);
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
      <ScrollView style={styles.scrollVI}>
        <View style={styles.viewC}>
          <View>
            <TouchableOpacity>
              <Image source={{ uri: image[0] }} style={styles.capaHq} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoHq}>
            {/* //? Infos do HQ */}

            {/* //% Titulo */}
            <View style={{ flex: 1 }}>
              <Text style={styles.tituloHq}>{title}</Text>
            </View>

            {/* //% Id */}
            <View style={styles.viewDescHq}>
              <Text style={styles.descBold}>Id: </Text>
              <Text style={styles.desc}>{id}</Text>
            </View>

            {/* //% Nº: */}
            <View style={styles.viewDescHq}>
              <Text style={styles.descBold}>Nº: </Text>
              <Text style={styles.desc}>{issueNumber}</Text>
            </View>

            {/* //% Desc Tit*/}
            <View style={styles.viewDesc}>
              <Text style={styles.descBold}>Descrição:</Text>
            </View>

            {/* //% Desc */}
            <View style={styles.viewDesc}>
              <Text style={styles.desc}>{description}</Text>
            </View>

            {/* //% Formato */}
            <View style={styles.viewDesc}>
              <Text style={styles.descBold}>Formato: </Text>
              <Text style={styles.desc}>{format}</Text>
            </View>

            {/* //% Páginas */}
            <View style={styles.viewDesc}>
              <Text style={styles.descBold}>Páginas: </Text>
              <Text style={styles.desc}>{pageCount}</Text>
            </View>

            {/* //% Páginas */}
            <View style={styles.viewPrice}>
              <Text style={styles.descBold}>Preços: </Text>
              <View style={styles.precos}>
                <Text style={styles.descPreco}>{price[0]}</Text>
                <Text style={styles.descBold}>{typePrice[0]}</Text>
              </View>
              <View style={styles.precos}>
                {/* {!desc ? "Não existe descrição" : desc} */}
                <Text style={styles.descPreco}>{price[1]}</Text>
                <Text style={styles.descBold}>{typePrice[1]}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* //% Characters */}
        <View
          style={{
            height: 200,
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: "column",
          }}
        >
          <FlatList
          horizontal
          data={persons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Persons navigation={navigation} data={item} />
          )}
        />
          {/* <Persons navigation={navigation} data={data} /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E2E44",
  },
  tituloHq: {
    fontSize: 15,
    textAlign: "justify",
    fontWeight: "700",
    color: "#FFF",
  },
  viewDescHq: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  desc: {
    color: "#FFF",
    textAlign: "justify",
    fontSize: 12,
  },
  descBold: {
    color: "#FFF",
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 14,
  },
  descPreco: {
    color: "#FFF",
    textAlign: "justify",
    marginRight: 5,
  },
  viewDesc: {
    flex: 1,
    flexDirection: "row",
    width: 190,
  },
  viewPrice: {
    flex: 1,
    flexDirection: "column",
    width: 190,
  },
  precos: {
    flex: 1,
    flexDirection: "row",
  },
  scrollVI: {
    height: 500,
  },
  capaHq: {
    height: 280,
    width: 170,
  },
  viewC: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    marginBottom: 15,
  },
  infoHq: {
    marginLeft: 10,
  },
});
