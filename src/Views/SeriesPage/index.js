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

export default function ComicPage({ route, navigation }) {
  //const data = route.params.data;
  let dados;

  const {
    id,
    title,
    description,
    startYear,
    endYear,
    thumbnail,
  } = route.params.data;
  const image = `${thumbnail.path}.${thumbnail.extension}`;

  console.log("SeriesPage - Dados");
  //console.log(image);

  const [persons, setPersons] = useState([]);

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
        <ScrollView>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold" }}
            >{`#${id} - ${title}`}</Text>
          </View>

          <View style={{ padding: 10 }}>
            {/* {!desc ? "Não existe descrição" : desc} */}
            <Text style={{ textAlign: "justify" }}>
              {!description ? "Não existe descrição" : description}
            </Text>
          </View>


          <View style={{}}></View>  
          <View style={{backgroundColor: '#f4f4c4', flex: 1, height: 150, width: 150}}>

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
