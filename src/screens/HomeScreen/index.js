import React from "react";
import { View, Dimensions } from "react-native";

import CovidMessage from '../../components/CovidMessage';
import HomeMap from "../../components/HomeMap";
import HomeSearch from "../../components/HomeSearch";

const HomeScreen = (props) => {
  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <HomeMap/>
      </View>

      {/*  Covid Message*/}
      <CovidMessage />

      {/*  Bottom Comp*/}
      <HomeSearch/>
    </View>
  );  
};

export default HomeScreen;
