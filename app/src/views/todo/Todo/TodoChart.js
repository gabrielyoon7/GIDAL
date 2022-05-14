import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function TodoChart(props) {
    const statistics = props.todoStatistics;
    // const data = props.data;
    const [data, setData] = useState([]);
    const [legends, setLegends] = useState([]);
    const [showChart, setShowChart] = useState(false);

    const RenderLegend = (props) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <View
                    style={{
                        height: 18,
                        width: 18,
                        marginRight: 10,
                        borderRadius: 4,
                        backgroundColor: props.legend.color || 'white',
                    }}
                />
                <Text style={{ color: 'white', fontSize: 16 }}>{props.legend.type || ''}</Text>
            </View>
        );
    };

    useEffect(() => {
        if (statistics.length !== 0) {
            console.log(statistics)
            let dataArr = [];
            let legendArr = [];
            statistics.forEach(function (element, idx) {
                dataArr.push({ value: element.count, color: element.color })
                legendArr.push({ type: element.type, color: element.color, key: idx })
            });
            setData(dataArr);
            setLegends(legendArr);
        }
    },[statistics])

    useEffect(() => {
        if(data.length !== 0) {
            console.log("data",data)
            setShowChart(true);
        }
    },[data])

    const ShowChart = () => {
        return(
            <PieChart
                    strokeColor="white"
                    strokeWidth={4}
                    donut={true}
                    data={data}
                    innerCircleColor="#414141"
                    innerCircleBorderWidth={4}
                    innerCircleBorderColor={'white'}
                    showValuesAsLabels={true}
                    showText
                    textSize={18}
                    showTextBackground={true}
                    shiftX={0}
                    shiftY={0}

                    // centerLabelComponent={() => {
                    //     return (
                    //         <View>
                    //             <Text style={{ color: 'white', fontSize: 36 }}>90</Text>
                    //             <Text style={{ color: 'white', fontSize: 18 }}>Total</Text>
                    //         </View>
                    //     );
                    // }}
                />
        )
    }

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

                {showChart ? <ShowChart /> : null}

                {/*********************    Custom Legend component      ********************/}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                    }}>
                    {legends.map((legend) => (
                        <RenderLegend key={legend.key} legend={legend} />
                    ))}
                </View>
                {/****************************************************************************/}


            </View>
        </View>
    );
}