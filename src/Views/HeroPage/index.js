import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList, ScrollView } from "react-native";
import axios from "axios";
import Comics from "../../Components/Comics";
import Histories from "../../Components/Histories";
import { css } from "../HeroPage/css";

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

  let comics;
  let series;
  let stories;

  // Todo: Pega os Hqs de origem
  function getComicsHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    return axios.get(`${completeUrl}`);
    
    console.log('$$$$$$$$$$$$$$$$$$$$$$ - id retorno comic hero - $$$$$$$$$$$$$$$$$$$$$$');
    console.log(idC);
  }

  // Todo: Pega as séries que participou
  function getSeriesHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/series?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    return axios.get(`${completeUrl}`);
  }

  // Todo: Pega as stories que participou
  function getStoriessHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/stories?series=3374&ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
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

    comics
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        const count = resposta.data.data.count;
        setComic(dados);
        setCountC(countC);

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

        /*
        console.log("################## teste comics ##################");
        const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
        console.log(completeUrl);
        */

        // console.log(`id: ${id} - Titulo: ${title} - Descrição: ${desc} - thumbnail: ${thumbnail} - images ${images}`);
      })
      .catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

    series.then(function (resposta) {
      const dados = resposta.data.data.results;
      const count = resposta.data.data.count;
      setSerie(dados);
      setCountS(count);

      /*
      console.log(
        "------------------------------------------- SERIES ------------------------------------------ "
      );
      console.log(dados);
      */
    })
    .catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });


    stories.then(function (resposta) {
      const dados = resposta.data.data.results;
      const count = resposta.data.data.count;
      setStories(dados);
      setCountH(count)

      console.log(
        "------------------------------------------- Stories ------------------------------------------ "
      );
      console.log(count);
    }).catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });

    console.log('---------------------------------------------- ID HISTORI ----------------------------------------------');
    console.log(storie);

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

    series.then(function (resposta) {
      const dados = resposta.data.data.results;
      const count = resposta.data.data.count;
      setSerie(dados);
      setCountS(count);
    })
    .catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });


    stories.then(function (resposta) {
      const dados = resposta.data.data.results;
      const count = resposta.data.data.count;
      setStories(dados);
      setCountH(count)

    }).catch(function (error) {
      if (error) {
        // ? Se tiver algum erro printa no catch
        console.log(error);
      }
    });

  }, [idC]);

  return (
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
          <Text style={css.txtName}>{nome}</Text>
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
          <View style={css.ViewId}>
            <Text style={css.txtId}>{`ID: #${idC}`}</Text>
          </View>

          <View style={css.ViewComic}>
            <Text style={css.txtComic}>{`Comics - ${countC}`}</Text>
          </View>
          {/* //Todo: Mostra os Hqs de Origem */}
          <FlatList
            horizontal
            data={comic}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Comics navigation={navigation} data={item} />
            )}
          />
          <View style={css.ViewComic}>
            <Text style={css.txtComic}>{`Series - ${countS}`}</Text>
          </View>
          {/* //Todo: Mostra as Series que participou */}
          <FlatList
            horizontal
            data={serie}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Comics navigation={navigation} data={item} />
            )}
          />

          <View style={css.ViewComic}>
            <Text style={css.txtComic}>{`Histories - ${countH}`}</Text>
          </View>
          {/* //Todo: Mostra as historias que participou */}
          <FlatList
            horizontal
            data={storie}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Histories navigation={navigation} data={item} />
            )}
          />
         
        </View>
        <View>
          <Button
            title="Voltar"
            onPress={() => navigation.navigate("Home")}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}
