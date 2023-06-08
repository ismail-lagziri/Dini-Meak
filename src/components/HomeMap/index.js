import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import MapView, {Marker} from 'react-native-maps';

import {API, graphqlOperation} from 'aws-amplify';
import { listCars } from '../../graphql/queries';

//import cars from '../../assets/data/cars';

const HomeMap = (props) => {

  const [cars, setCars] = useState([ ]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(
            listCars
          )
        )

        setCars(response.data.listCars.items);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCars();
  }, [])

  const getImage = (type) => {
    if (type === 'GTR Nismo') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Mustang') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  }

  return (
      <MapView
        style={{height:'100%', width:'100%'}}
        showsUserLocation={true}
        initialRegion={{
        latitude: 34.0209,
        longitude: -6.8416,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
        }}
      >
        {cars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{latitude: car.latitude, longitude: car.longitude}}
          >
            <Image 
              style={{
                width:50, 
                height:50, 
                resizeMode:"contain",
                transform:[{
                  rotate: `${car.heading}deg`
                }]
              }}
              source={getImage(car.type)}  
            />   
          </Marker>
        ))}
      </MapView>
  );
};

export default HomeMap;
