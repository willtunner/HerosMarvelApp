import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  ScrollView,
  Touchable,
} from "react-native";
import axios from "axios";
import Comics from "../../Components/Comics";
import Series from "../../Components/Series";
import Histories from "../../Components/Histories";
import { css } from "../HeroPage/css";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HeroPage({ route, navigation }) {
  const idC = route.params.id;
  const nome = route.params.nome;
  const imagem = route.params.imagem;
  const desc = route.params.descricao;

  const [comic, setComic] = useState([]);
  const [serie, setSerie] = useState([]);
  const [storie, setStories] = useState([]);
  const [countH, setCountH] = useState(0);
  const [countS, setCountS] = useState(0);
  const [countC, setCountC] = useState(0);
  const [idSerie, setIdSerie] = useState(0);

  let comics;
  let series;
  let stories;

  // Todo: Pega os Hqs de origem
  function getComicsHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    console.log("URL COMIC");
    console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  // Todo: Pega as séries que participou
  function getSeriesHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/series?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    console.log("URL Serie");
    console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  // Todo: Pega as stories que participou
  function getStoriessHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/stories?series=3374&ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    console.log("URL STORIES");
    console.log(completeUrl);
    return axios.get(`${completeUrl}`);
  }

  // https://gateway.marvel.com/v1/public/stories/92078/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116
  function getImageStoriesHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/stories/92078/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    return axios.get(`${completeUrl}`);
  }

  useEffect(() => {
    // ? Popula variavel dos Hqs com array que retorna
    comics = getComicsHero();
    series = getSeriesHero();
    stories = getStoriessHero();

    console.log(
      "$$$$$$$$$$$$$$$$$$$$$$ - serie comic hero - $$$$$$$$$$$$$$$$$$$$$$"
    );
    //console.log(serie);

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

    series
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.count;
        const idSerie = resposta.data.data.id;
        setSerie(dados);
        setCountS(count);
        setIdSerie(idSerie);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    stories
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.count;
        setStories(dados);
        setCountH(count);

        console.log(
          "------------------------------------------- Stories ------------------------------------------ "
        );
        //console.log(count);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    console.log(
      "---------------------------------------------- ID HISTORI ----------------------------------------------"
    );
    // console.log(storie);
  }, []);

  // ? QUANDO MUDAR O ID DO HERO
  useEffect(() => {
    // ? Popula variavel dos Hqs com array que retorna
    comics = getComicsHero();
    series = getSeriesHero();
    stories = getStoriessHero();

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

    series
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.count;
        // console.log(dados);
        setSerie(dados);
        setCountS(count);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    stories
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.count;
        setStories(dados);
        setCountH(count);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });
  }, [idC]);

  return (
    <View>
    <ScrollView>
      <View style={css.Container}>
        {/* //todo: imagem do hero */}
        <View>
          <Image
            source={{ uri: `${imagem}` }}
            style={css.Banner}
            resizeMode="center"
          />
        </View>

        {/* //todo: Nome do hero */}
        <View style={css.ViewBorder}>
          <Text style={css.txtName}>{`#${idC} - ${nome}`}</Text>
        </View>

        {/* //todo: Descrição do hero */}

        <View style={css.ViewDesc}>
          <View style={css.Desc}>
            <Text style={css.TextDesc}>
              {!desc ? "Não existe descrição" : desc}
            </Text>
          </View>
        </View>

        {/* //todo: Infos */}
        <View style={css.ViewInfo}>
          <View style={css.ViewComic}>
            <Text style={css.txtComic}>{`COMICS (${countC})`}</Text>
          </View>
          {/* //Todo: Mostra os Hqs de Origem */}
          <FlatList
            style={css.FlatComic}
            horizontal
            data={comic}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Comics navigation={navigation} data={item} />
            )}
          />
          <View style={css.ViewComic}>
            <Text style={css.txtComic}>{`SERIES (${countS})`}</Text>
          </View>
          {/* //Todo: Mostra as Series que participou */}
          <FlatList
            horizontal
            data={serie}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Series navigation={navigation} data={item} />
            )}
          />
        </View>
        
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
