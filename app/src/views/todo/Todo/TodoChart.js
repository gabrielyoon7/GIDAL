import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function TodoChart() {
    const renderLegend = (text, color) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <View
                    style={{
                        height: 18,
                        width: 18,
                        marginRight: 10,
                        borderRadius: 4,
                        backgroundColor: color || 'white',
                    }}
                />
                <Text style={{ color: 'white', fontSize: 16 }}>{text || ''}</Text>
            </View>
        );
    };

    return (
        <View>
            <View
                style={{
                    marginVertical: 100,
                    marginHorizontal: 30,
                    borderRadius: 10,
                    paddingVertical: 50,
                    backgroundColor: '#414141',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>


                {/*********************    Custom Header component      ********************/}
                <Text
                    style={{
                        color: 'white',
                        fontSize: 32,
                        fontWeight: 'bold',
                        marginBottom: 12,
                    }}>
                    Quarterly Sales
                </Text>
                {/****************************************************************************/}


                <PieChart
                    strokeColor="white"
                    strokeWidth={4}
                    donut
                    data={[
                        { value: 30, color: 'rgb(84,219,234)' },
                        { value: 40, color: 'lightgreen' },
                        { value: 20, color: 'orange' },
                    ]}
                    innerCircleColor="#414141"
                    innerCircleBorderWidth={4}
                    innerCircleBorderColor={'white'}
                    showValuesAsLabels={true}
                    showText
                    textSize={18}
                    showTextBackground={true}
                    centerLabelComponent={() => {
                        return (
                            <View>
                                <Text style={{ color: 'white', fontSize: 36 }}>90</Text>
                                <Text style={{ color: 'white', fontSize: 18 }}>Total</Text>
                            </View>
                        );
                    }}
                />


                {/*********************    Custom Legend component      ********************/}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20,
                    }}>
                    {renderLegend('Jan', 'rgb(84,219,234)')}
                    {renderLegend('Feb', 'lightgreen')}
                    {renderLegend('Mar', 'orange')}
                </View>
                {/****************************************************************************/}


            </View>
        </View>
    );
}