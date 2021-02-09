import React, { useState, useEffect } from "react";
import { View, Text, Button } from 'react-native';

export default function HeroPage({navigation}) {
    return(
        <View style={{margin: 20}}>
            <Text>Hello Hero</Text>
            <Button title="Voltar" onPress={() => navigation.navigate('Home')}></Button>
        </View>
    );
}
