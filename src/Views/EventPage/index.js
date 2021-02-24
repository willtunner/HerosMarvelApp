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
import Comics from "../../Components/Comics";
import Events from "../../Components/Events";
import { css } from "./css";

export default function EventPage({ route, navigation }) {
  const data = route.params.data;
  const [comicEvent, setComicEvent] = useState([]);
  const [serieEvent, setSerieEvent] = useState([]);

  let comic;
  let serie;

  const {
    description,
    id,
    start,
    end,
    thumbnail,
    title,
    creators,
    characters,
    comics,
    series,
    next,
    previous,
    urls,
  } = route.params.data;

  const imagem = `${thumbnail.path}.${thumbnail.extension}`;
  

  const keyCode =
    "?ts=1612100588&limit=100&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116";

  /**
   * AREA DE DEBUG EVENT
   */
  console.log("##### TELA DE EVENTOS #####");
  console.log(data);

  /**
   * FIM DA AREA DE DEBUG EVENT
   */

   // Todo: Pega os Hqs que criou
  function getComicsCreator() {
    const completeUrl = `http://gateway.marvel.com/v1/public/events/${id}/comics${keyCode}`;
    // console.log("##### - HQ EVENTS - #####");
    // console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  function getSeriesCreator() {
    const completeUrl = `http://gateway.marvel.com/v1/public/events/${id}/series${keyCode}`;
    //console.log("##### - HQ EVENTS - #####");
    //console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  useEffect(() => {
    comic = getComicsCreator();
    serie = getSeriesCreator();

    comic.then((results) => {
      const comicsEventHQ = results.data.data.results;
      setComicEvent(comicsEventHQ);
    }).catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });


    serie.then((results) => {
      const dataSeries = results.data.data.results;
      setSerieEvent(dataSeries);

      console.log('#### series event ####');
      console.log(dataSeries);
    })
  },[]);

  return (
    <View>
      <ScrollView>
        <View style={styles.viewC}>
          <View>
            <TouchableOpacity>
              <Image source={{ uri: imagem }} style={styles.capaHq} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoHq}>
            {/* //% Titulo */}
            <View style={{ flex: 1, width: 180 }}>
              <Text style={styles.tituloHq}>{title}</Text>
            </View>

            {/* //% Id */}
            <View style={styles.viewDescHq}>
              <Text style={styles.descBold}>Id: </Text>
              <Text style={styles.desc}>{id}</Text>
            </View>

            {/* //% Data Inicio */}
            <View style={styles.viewDesc2}>
              <Text style={styles.descBold}>Date start: </Text>
              <Text style={styles.desc}>{start}</Text>
            </View>

            {/* //% Data Fim */}
            <View style={styles.viewDesc2}>
              <Text style={styles.descBold}>Date end: </Text>
              <Text style={styles.desc}>{end}</Text>
            </View>

            {/* //% Desc Tit*/}
            <View style={styles.viewDesc}>
              <Text style={styles.descBold}>Descrição:</Text>
            </View>

            {/* //% Desc */}
            <View style={styles.viewDesc}>
              <Text style={styles.desc}>{description}</Text>
            </View>
          </View>
        </View>

        {/* //% QTD COMICS   */}
        <View style={css.ViewComic}>
          <Text style={css.txtComic}>{`COMICS (${comics.available})`}</Text>
          <FlatList
                horizontal
                data={comicEvent}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Comics navigation={navigation} data={item} />
                )}
              />
        </View>

        {/* //% SERIES   */}
        <View style={css.ViewComic}>
          <Text style={css.txtComic}>{`SERIES (10)`}</Text>
          <FlatList
              horizontal
              data={serieEvent}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Events navigation={navigation} data={item} />
              )}
            />
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
    width: 180,
  },
  viewDesc2: {
    flex: 1,
    flexDirection: "column",
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
    flex: 1,
  },
  infoHq: {
    marginLeft: 10,
  },
  titText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },
});
