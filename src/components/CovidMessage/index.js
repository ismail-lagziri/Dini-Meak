import React from "react";
import { View, Text } from "react-native";

import styles from './styles';

const CovidMessage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please adhere to local health guidelines</Text>
      <Text style={styles.text}>
        Ensure safety: Adhere to local health guidelines. Together, let's create a safer environment for our carpooling community. Thank you for your cooperation.      </Text>
      <Text style={styles.learnMore}>Learn more</Text>
    </View>
  );
};

export default CovidMessage;
