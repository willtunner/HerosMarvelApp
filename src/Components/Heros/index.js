import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

class Heros extends Component {
  render() {

    const id = this.props.data.id;
    const nome = this.props.data.name;
    const desc = this.props.data.description;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`
    

    return (
      <View>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 10,
            alignContent: "center",
            alignItems: "center",
            borderBottomColor: "red",
            borderBottomWidth: 2,
          }}
          onPress={() =>
            this.props.navigation.navigate("HeroPage", {
              id: id, nome: nome, imagem: img, descricao: desc
            })
          }
        >
          <Image
            source={{
              uri: `${img}`,
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <Text style={{ marginLeft: 30, fontSize: 20 }}>
            {this.props.data.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Heros;
