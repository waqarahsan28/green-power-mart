import React from 'react';
import {Dimensions,View,Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = () => {

  return (
    <View>
    <Text style={{textAlign:'center',fontSize:20,fontWeight:"bold"}}>Summary</Text>
    <LineChart
      data={{
        labels: [],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      // yAxisLabel="$"
      // yAxisSuffix="k"
      // yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        // backgroundColor: "black",
        backgroundGradientFrom: "#B48CEF",
        backgroundGradientTo: "#B48CEF",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => 'black',
        labelColor: (opacity = 1) => 'black',
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "black"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>
  );
};

export default Chart;