import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ComicPage({ route, navigation }) {
  const data = route.params.data;

  //const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;

  const {
    id,
    format,
    images,
    issueNumber,
    pageCount,
    prices,
    description,
    title
  } = route.params.data;
  const image = images.map((result) => result.path + "." + result.extension);
  const price = prices.map((result) => result.price);
  const typePrice = prices.map((result) => result.type);

  console.log(
    "============================= DEBUG - TESTE ============================="
  );
  // console.log(image[2]);
  console.log(data);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollVI}>
        <View style={styles.viewC}>
          <View>
            <TouchableOpacity>
              <Image source={{uri:image[0]}} style={styles.capaHq} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoHq}>
            {/* //? Infos do HQ */}

            {/* //% Titulo */}
            <View style={{flex:1}}>
              <Text style={styles.tituloHq}>{title}</Text>
            </View>

            {/* //% Id */}
            <View style={styles.viewDescHq}>
              <Text style={styles.desc}>id: </Text> 
              <Text style={styles.desc}>{id}</Text>
            </View>

            {/* //% Nº: */}
            <View style={styles.viewDescHq}>
              <Text style={styles.desc}>Nº: </Text> 
              <Text style={styles.desc}>{issueNumber}</Text>
            </View>

            {/* //% Desc */}
            <View style={styles.viewDesc}>
              <Text style={styles.desc}>{description}</Text>
            </View>

            {/* //% Formato */}
            <View style={styles.viewDesc}>
              <Text style={styles.desc}>Formato: </Text>
              <Text style={styles.desc}>{format}</Text>
            </View>

            {/* //% Páginas */}
              <View style={styles.viewDesc}>
                <Text style={styles.desc}>Páginas: </Text>
                <Text style={styles.desc}>{pageCount}</Text>
              </View>

            {/* //% Páginas */}
            <View style={styles.viewPrice}>
                <Text style={styles.desc}>Preços: </Text>
                <View style={styles.precos}>
                  <Text style={styles.descPreco}>{price[0]}</Text>
                  <Text style={styles.descPreco}>{ typePrice[0]}</Text>
                </View>
                <View style={styles.precos}>
                  {/* {!desc ? "Não existe descrição" : desc} */}
                  <Text style={styles.descPreco}>{price[1]}</Text>
                  <Text style={styles.descPreco}>{typePrice[1]}</Text>
                </View>
              </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: '#1E2E44'
  },
  tituloHq: {
    fontSize: 15,
    textAlign: 'justify',
    fontWeight: '700',
    color: '#FFF'
  },
  viewDescHq:{
    flex:1, 
    flexDirection: 'row',
    marginBottom: 5
  },
  desc: {
    color: '#FFF',
    textAlign: 'justify',
  },
  descPreco: {
    color: '#FFF',
    textAlign: 'justify',
    marginRight: 5
  },
  viewDesc: {
    flex: 1,
    flexDirection: 'row',
    width: 190
  },
  viewPrice: {
    flex: 1,
    flexDirection: 'column',
    width: 190
  },
  precos: {
    flex: 1,
    flexDirection: 'row'
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
    padding: 5
  },
  infoHq: {
    marginLeft: 10
  },
  
});
