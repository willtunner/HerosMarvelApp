import React, { Component, useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { css } from "./css";
import Comics from "../../Components/Comics";

class Events extends Component {
  render() {
    const title = this.props.data.title;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;

    const [comicCreator, setComicCreator] = useState([]);
    
    return (
      <View style={{ backgroundColor: "#FFF", padding: 5 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("EventPage", {
              data: this.props.data,
            })
          }
        >
          <Image
            source={{ uri: `${img}` }}
            style={css.imageComic}
            resizeMode="stretch"
          />
          <View style={css.ViewTitulo}>
            <Text style={css.TituloHero}>{title}</Text>
          </View>
        </TouchableOpacity>

        <View></View>
      </View>
    );
  }
}

export default Events;
