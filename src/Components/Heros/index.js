import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Skeleton from "./Skeleton";

class Heros extends Component {
  
  render() {
    const id = this.props.data.id;
    const nome = this.props.data.name;
    const desc = this.props.data.description;
    const img = `${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`;
    const loading1 = this.props.loading;

      
    return (
      <View>
        <Skeleton visible={loading1}>
          <TouchableOpacity
            style={styles.touchOp}
            onPress={() =>
              this.props.navigation.navigate("HeroPage", {
                id: id,
                nome: nome,
                imagem: img,
                descricao: desc,
              })
            }
          >
            <Image
              source={{
                uri: `${img}`,
              }}
              style={styles.image}
            />
            <Text style={styles.text}>{this.props.data.name}</Text>
          </TouchableOpacity>
        </Skeleton>
      </View>
    );
  }
}

export default Heros;

const styles = StyleSheet.create({
  touchOp: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    marginLeft: 30,
    fontSize: 20,
  },
});
