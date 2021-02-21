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

  const {
    id,
    title,
    description,
    startYear,
    endYear,
    thumbnail,
    characters,
    available,
  } = route.params.data;
  const image = `${thumbnail.path}.${thumbnail.extension}`;
  const collectionURI = characters.collectionURI;
  const Characters = characters.items.map((results) => results.name);

  const completeURL = `${collectionURI}?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;

  console.log("SeriesPage - Dados");
  console.log(data);

  const [persons, setPersons] = useState([]);

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
        console.log(data1);

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
      <View
        style={{
          marginTop: 60,
          backgroundColor: "#FFF",
          height: 530,
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

        <ScrollView style={{marginTop: -30}}>
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
                flex: 1,
                height: 400,
                width: 340,
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                {/* // % Ano inicio/fim */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                    height: 20,
                  }}
                >
                  <Text>Start Year: </Text>
                  <Text>{startYear}</Text>
                  <Text>End Year: </Text>
                  <Text>{endYear}</Text>
                </View>

                <View style={{ justifyContent: "flex-start", marginTop: 20 }}>
                  <Text>{`Personagens (${characters.available})`}</Text>
                  <FlatList
                    horizontal
                    data={persons}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <Persons navigation={navigation} data={item} />
                    )}
                  />
                </View>
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E2E44",
  },
});
