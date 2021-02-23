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

export default function CreatorsPage({ route, navigation }) {

    const data = route.params.data;
    const { id, firstName, middleName, lastName, fullName, modified, series, comics, events, stories, thumbnail} = route.params.data;

   
    
    // const creatorURL = data.resourceURI;
    // const keyCode =
    // "?ts=1612100588&limit=100&apikey=441f8e1d35a71620f2cc514653ca8d66&hash=67b23bf97ed17c43aaec511386e91116";
    // const completeURL = creatorURL+keyCode;
    // let creatorsData;

    console.log(' #################### Creators Page ####################');
    console.log(thumbnail.path+'.'+thumbnail.extension);

    // function getHeros() {
    //   return axios.get(completeURL);
    // }

    // useEffect(() => {
    //   creatorsData = getHeros();

    //   creatorsData.then(function (resposta){
    //     const dados = resposta.data.data.results;
    //     //console.log(dados);
    //     /*
    //     const fullName = dados.map((hqs) => `${hqs.fullName}`);

    //     const thumbnail = dados.map(
    //       (hqs) => `${hqs.thumbnail.path}.${hqs.thumbnail.extension}`
    //     );
    //     console.log(fullName[0]);
    //     console.log(thumbnail[0]);
    //     */
               
    //   }).catch(function (error) {
    //     if (error) {
    //       // ? Se tiver algum erro printa no catch
    //       console.log(error);
    //     }
    //   });

    // },[]);

    return(
        <View>
          
        </View>
    );
}
