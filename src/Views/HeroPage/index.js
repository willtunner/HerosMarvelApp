import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList, ScrollView } from "react-native";
import axios from "axios";
import Comics from "../../Components/Comics";
import { css } from "../HeroPage/css";

export default function HeroPage({ route, navigation }) {
  const idC = route.params.id;
  const nome = route.params.nome;
  const imagem = route.params.imagem;
  const desc = route.params.descricao;

  const [comic, setComic] = useState([]);
  const [serie, setSerie] = useState([]);

  let comics;
  let series;

  // Todo: Pega os Hqs de origem
  function getComicsHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    return axios.get(`${completeUrl}`);
    console.log(completeUrl);
  }

  // Todo: Pega as séries que participou
  function getSeriesHero() {
    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/series?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    return axios.get(`${completeUrl}`);
  }

  useEffect(() => {
    // ? Popula variavel dos Hqs com array que retorna
    comics = getComicsHero();
    series = getSeriesHero();

    comics
      .then(function (resposta) {
        const dados = resposta.data.data.results;
        setComic(dados);

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

        console.log("################## teste comics ##################");
        const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
        console.log(completeUrl);

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
        setSerie(dados);

        console.log('------------------------------------------- SERIES ------------------------------------------ ');
        console.log(dados);
      })
  }, []);

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
            <Text style={css.txtComic}>Comics</Text>
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
            <Text style={css.txtComic}>Series</Text>
          </View>
          <FlatList
            horizontal
            data={serie}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Comics navigation={navigation} data={item} />
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
