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

export default function CreatorsPage({ route, navigation }) {

    const data = route.params.data;
    console.log('Creators Page ####################');
    console.log(data);

    return(
        <View>

        </View>
    );
}
