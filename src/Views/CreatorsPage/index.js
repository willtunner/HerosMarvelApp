import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import { css } from "../HeroPage/css";

import Series from "../../Components/Series";
import Comics from "../../Components/Comics";
import Events from "../../Components/Events";

export default function CreatorsPage({ route, navigation }) {
  const keyCode =
    "?ts=1612100588&limit=100&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116";

  const [comicCreator, setComicCreator] = useState([]);
  const [serieCreator, setSerieCreator] = useState([]);
  const [eventsCreator, setEventsCreator] = useState([]);
  
  const data = route.params.data;
  const {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
    modified,
    series,
    comics,
    events,
    stories,
    thumbnail,
  } = route.params.data;
  const imagem = thumbnail.path + "." + thumbnail.extension;

  // console.log(" #################### Creators Page ####################");
  console.log(events.available);
  let comic;
  let serie;
  let event;

  // Todo: Pega os Hqs que criou
  function getComicsCreator() {
    const completeUrl = `http://gateway.marvel.com/v1/public/creators/${id}/comics${keyCode}`;
    //console.log("##### - HQ Criadores - #####");
    //console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  // Todo: Pega as séries que participou
  function getSeriesHero() {
    const completeUrl = `http://gateway.marvel.com/v1/public/creators/${id}/series${keyCode}`;
    return axios.get(`${completeUrl}`);
  }

  // Todo: Pega as events que participou
  function getEventsCreator() {
    const completeUrl = `http://gateway.marvel.com/v1/public/creators/${id}/events${keyCode}`;
    // console.log("##### - HQ EVENTS Criadores - #####");
    // console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  useEffect(() => {
    comic = getComicsCreator();
    serie = getSeriesHero();
    event = getEventsCreator();

    comic.then((results) => {
      const comicsCreatorHQ = results.data.data.results;
      setComicCreator(comicsCreatorHQ);
    }).catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });

    serie.then((results) => {
      const SerieCreatorHQ = results.data.data.results;
      setSerieCreator(SerieCreatorHQ);
    }).catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });

    event.then((results) => {
      const EventsCreator = results.data.data.results;
      // console.log('########### EVENTS #####################')
      // console.log(EventsCreator);
      setEventsCreator(EventsCreator);
    }).catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.ViewImage}>
          <Image source={{ uri: imagem }} style={styles.image2} />
        </View>

        <ScrollView style={{ marginTop: -30 }}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {`#${id} - ${fullName}`}
            </Text>
          </View>

          <View>
            {/* //% Comics  */}
            <View style={css.ViewComic}>
              <Text style={css.txtComic}>{`COMICS (${comics.available})`}</Text>
              <FlatList
                horizontal
                data={comicCreator}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Comics navigation={navigation} data={item} />
                )}
              />
            </View>

            <View style={css.ViewComic}>
              <Text style={css.txtComic}>{`SERIES (${series.available})`}</Text>
            </View>
            {/* //Todo: Mostra as Series que participou */}
            <FlatList
              horizontal
              data={serieCreator}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Series navigation={navigation} data={item} />
              )}
            />

            {/* //Todo: Mostra as Eventos que participou */}
            <View style={css.ViewComic}>
              <Text style={css.txtComic}>{`EVENTS (${events.available})`}</Text>
            </View>

            <FlatList
              horizontal
              data={eventsCreator}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Events navigation={navigation} data={item} />
              )}
            />
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
    flex: 1,
  },
  body: {
    marginTop: 60,
    backgroundColor: "#FFF",
    width: "95%",
    borderRadius: 5,
    height: "88%",
  },
  ViewImage: {
    alignItems: "center",
  },
  image2: {
    height: 150,
    width: 150,
    borderRadius: 100,
    top: -50,
  },
});
