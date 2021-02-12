import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

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
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <ScrollView style={{height: 500}}>
        <Image source={image} style={{ height: 500, width: 300 }} />

        {/* //? Infos do HQ */}
        <Text>{`id: ${id}`}</Text>
        <Text>{`Formato: ${format}`}</Text>
        {/* <Text>{issueNumber}</Text> */}
        <Text>{`Páginas: ${pageCount}`}</Text>
        <Text>{`Preço: ${price}`}</Text>
        <Text>{`Valor por formato ${price}`}</Text>
      </ScrollView>
    </View>
  );
}
