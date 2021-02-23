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

import Persons from "../../Components/Persons";
import Creators from '../../Components/Creators/';



export default function ComicPage({ route, navigation }) {
  console.log(
    "------------------------------------------- Comic Page ------------------------------------------ "
  );
  const data = route.params.data;
  // console.log("COMIC PAGE LOG ############");
  // console.log(data);

  let dados;
  let creator;

  const [persons, setPersons] = useState([]);
  const [creatorsPage, setCreators] = useState(0);
  const [countCreators, setCountCreators] = useState(0);
  const [countHeros, setCountHeros] = useState(0);

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
    creators,
  } = route.params.data;

  const criadores = creators.collectionURI;
  const collectionURI = characters.collectionURI;
  const image = images.map((result) => result.path + "." + result.extension);
  const price = prices.map((result) => result.price);
  const typePrice = prices.map((result) => result.type);
  const Characters = characters.items.map((results) => results.name);
  const CharactersURI = characters.items.map((results) => results.resourceURI);
  const keyCode =
    "?ts=1612100588&limit=100&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116";
  const completeURL = collectionURI+keyCode;

  // ? Função para pegar a url dos personagens
  function getHeros() {
    return axios.get(completeURL);
  }

  function getCreatorsSerie() {
    const completeUrl = criadores + keyCode;
    // console.log("URL Criadores");
    // console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  useEffect(() => {
    dados = getHeros();
    creator = getCreatorsSerie();

    dados
      .then(function (resposta) {
        const data1 = resposta.data.data.results;
        const count = resposta.data.data.total;
        setCountHeros(count);
        const personagens = data1.map((results) => results);

        setPersons(personagens);
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

      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });
      
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.viewC}>
          <View>
            <TouchableOpacity>
              <Image source={{ uri: image[0] }} style={styles.capaHq} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoHq}>
            {/* //? Infos do HQ */}

            {/* //% Titulo */}
            <View style={{ flex: 1, width: 180 }}>
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
        <View>
          <View>
            <Text style={styles.titText} >{`PERSONAGENS (${countHeros})`} </Text>
          </View>
          <FlatList
            horizontal
            data={persons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Persons navigation={navigation} data={item} />
            )}
          />
        </View>

        {/* //% Creators  */}
        <View style={{ marginTop: 25 }}>
          <Text style={styles.titText}>{`CRIADORES (${countCreators})`}</Text>
          <FlatList
            style={{marginBottom: 10,}}
            horizontal
            data={creatorsPage}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Creators navigation={navigation} data={item} />
            )}
          />
        </View>

      </ScrollView>

      <View style={css.BackTouchableOpacity}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            style={{
              textAlign: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 25,
            }}
          >
            BACK TO HOME
          </Text>
        </TouchableOpacity>
      </View>
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
    width: 180,
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
    marginBottom: 10,
    backgroundColor: "#282A36",
  },
  infoHq: {
    marginLeft: 10,
  },
  titText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  }
});
