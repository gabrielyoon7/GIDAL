import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function TodoChart(props) {
    const statistics = props.todoStatistics;
    const [data, setData] = useState([]);
    const [legends, setLegends] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [isEmpty, setEmpty] = useState(false);

    const RenderLegend = (props) => {
        return (
            <View key={props.key} style={{ flexDirection: 'row', marginBottom: 12,  }}>
                <View
                    style={{
                        height: 18,
                        width: 18,
                        marginRight: 10,
                        borderRadius: 4,
                        backgroundColor: props.legend.color || 'white',
                    }}
                />
                <Text style={{ color: '#414141', fontSize: 16 }}>{props.legend.type || ''}</Text>
            </View>
        );
    };

    useEffect(() => {
        if (statistics.length !== 0) {
            console.log(statistics)
            let dataArr = [];
            let legendArr = [];
            let total = 0
            statistics.forEach(function (element, idx) {
                total += element.count
                dataArr.push({ value: element.count, color: element.color })
                legendArr.push({ type: element.type, color: element.color, key: idx })
            });
            if(total === 0){
                setEmpty(true);
            }
            setData(dataArr);
            setLegends(legendArr);
        }
    },[statistics])

    useEffect(() => {
        if(data.length !== 0) {
            // console.log("data",data)
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
                    innerCircleColor="#f7d2fa"
                    innerCircleBorderWidth={4}
                    innerCircleBorderColor={'white'}
                    showValuesAsLabels={true}
                    showText
                    textSize={18}
                    showTextBackground={true}
                    shiftX={0}
                    shiftY={0}
                />
        )
    }

    const ShowStatics = () => {
        return (
            <View
                style={{
                    marginVertical: 10,
                    borderRadius: 10,
                    padding:10,
                    // paddingVertical: 30,
                    backgroundColor: '#f7d2fa',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                {showChart ? <ShowChart /> : null}

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
            </View>
        )
    }

    return (
        <View >
            {isEmpty
            ?
            <Text>등록한 할 일이 없습니다.</Text>
            :
            <ShowStatics />
            }
        </View>
    );
}