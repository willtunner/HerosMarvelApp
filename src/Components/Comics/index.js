import React, { Component, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {css} from './css';

class Comics extends Component {
  render() {
    const id = this.props.data.id;
    const title = this.props.data.title;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    //  {!desc ? "Não existe descrição" : desc}
    return (
      <View style={{backgroundColor: '#FFF', padding: 5}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ComicPage", {
              data: this.props.data,
            })}>
          <Image
            source={{ uri: `${img}` }}
            style={css.imageComic}
            resizeMode="stretch"
          />
          <View style={css.ViewTitulo}> 
            <Text style={css.TituloHero}>{title}</Text>
          </View>
        </TouchableOpacity>

        <View>
          

        </View>
      </View>
    );
  }
}

export default Comics;
