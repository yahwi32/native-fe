import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { COLOR } from "@/enum/color";
const Chart = () => {
  return (
    <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 16, color: COLOR.text, fontWeight: 700 }}>
        Average beat statistics for the past 7 days
      </Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [80, 86, 81, 120, 67, 84, 90],
            },
          ],
        }}
        width={Dimensions.get("window").width - 48} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="time"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Chart;
