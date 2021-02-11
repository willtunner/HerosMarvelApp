import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, FlatList, ScrollView } from "react-native";
import axios from "axios";
import Comics from '../../Components/Comics';

export default function HeroPage({ route, navigation }) {
  const idC = route.params.id;
  const nome = route.params.nome;
  const imagem = route.params.imagem;
  const desc = route.params.descricao;

  const [comic, setComic] = useState([]);

  let comics;

  function getComicsHero() {

    const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
    return axios.get(`${completeUrl}`);
    console.log(completeUrl);
  }

  useEffect(() =>{
    comics = getComicsHero();

    comics.then(function (resposta){
        const dados = resposta.data.data.results;
        setComic(dados);

        // ? Pegando dados dos Hqs
        const desc = dados.map((hqs) => `${hqs.description}`);
        const id = dados.map((hqs) => `${hqs.id}`);
        const title = dados.map((hqs) => `${hqs.title}`);
        const thumbnail = dados.map((hqs) => `${hqs.thumbnail.path}.${hqs.thumbnail.extension}`);
        const images = dados.map((hqs) => `${hqs.images.map((path) => path.path)}.${hqs.images.map((ext) => ext.extension)}`);



        console.log('################## teste comics ##################');
        const completeUrl = `https://gateway.marvel.com/v1/public/characters/${idC}/comics?ts=1612100588&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116`;
        console.log(completeUrl);

        // console.log(`id: ${id} - Titulo: ${title} - Descrição: ${desc} - thumbnail: ${thumbnail} - images ${images}`);
    }).catch(function (error) {
        if (error) {
          // ? Se tiver algum erro printa no catch
          console.log(error);
        }
      });

  },[]);

  return (
    <View style={{ marginTop: 10, }}>
      {/* //todo: imagem do hero */}
      <View>
        <Image
          source={{
            uri: `${imagem}`,
          }}
          style={{
            width: "100%",
            height: 150,
            marginBottom: 1,
            marginTop: 10,
          }}
        />
      </View>

      {/* //todo: Nome do hero */}
      <View
        style={{
          backgroundColor: "#EC1D24",
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 20 }}>{nome}</Text>
      </View>

      {/* //todo: Descrição do hero */}
      <ScrollView>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <View style={{ backgroundColor: "#173F5F", width: "95%", borderRadius: 15, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: '#FFF', textAlign: 'justify'}}>{ !desc ? 'Não existe descrição' : desc}</Text>
        </View>
      </View>

      {/* //todo: Infos */}
      <View>
            <Text>{idC}</Text>
            <View style={{backgroundColor: ''}}></View>
            <FlatList 
                horizontal
                data={comic}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Comics navigation={navigation} data={item} />
                  )}
            />
      </View>

      <Button
        title="Voltar"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </ScrollView>
    </View>
  );
}

//this.props.navigation.state.params.resultado
