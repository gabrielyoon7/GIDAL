import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function TodoChart(props) {
    const statistics = props.todoStatistics;
    const [data, setData] = useState([]);
    const [legends, setLegends] = useState([]);

    const renderLegend = (legend) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 12 }} key={legend.key}>
                <View
                    style={{
                        height: 18,
                        width: 18,
                        marginRight: 10,
                        borderRadius: 4,
                        backgroundColor: legend.color || 'white',
                    }}
                />
                <Text style={{ color: 'white', fontSize: 16 }}>{legend.type || ''}</Text>
            </View>
        );
    };

    useEffect(() => {
        let dataArr = [];
        let legendArr = [];
        statistics.forEach(function(element, idx) {
            dataArr.push({value: element.count, color: element.color})
            legendArr.push({type: element.type, color: element.color, key: idx})
        });
        setData(dataArr);
        setLegends(legendArr);
    },[statistics])

    return (
        <View>
            <View
                style={{
                    marginVertical: 10,
                    // marginHorizontal: 30,
                    borderRadius: 10,
                    paddingVertical: 30,
                    backgroundColor: '#414141',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>


                {/*********************    Custom Header component      ********************/}
                {/* <Text
                    style={{
                        color: 'white',
                        fontSize: 32,
                        fontWeight: 'bold',
                        marginBottom: 12,
                    }}>
                    Quarterly Sales
                </Text> */}
                {/****************************************************************************/}


                <PieChart
                    strokeColor="white"
                    strokeWidth={4}
                    donut
                    data={data}
                    innerCircleColor="#414141"
                    innerCircleBorderWidth={4}
                    innerCircleBorderColor={'white'}
                    showValuesAsLabels={true}
                    showText
                    textSize={18}
                    showTextBackground={true}
                    // centerLabelComponent={() => {
                    //     return (
                    //         <View>
                    //             <Text style={{ color: 'white', fontSize: 36 }}>90</Text>
                    //             <Text style={{ color: 'white', fontSize: 18 }}>Total</Text>
                    //         </View>
                    //     );
                    // }}
                />


                {/*********************    Custom Legend component      ********************/}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                    }}>
                    {/* {renderLegend('Jan', 'rgb(84,219,234)')}
                    {renderLegend('Feb', 'lightgreen')}
                    {renderLegend('Mar', 'lightgray')} */}
                    {legends.map((legend) => (
                        renderLegend(legend)
                    ))}
                </View>
                {/****************************************************************************/}


            </View>
        </View>
    );
}