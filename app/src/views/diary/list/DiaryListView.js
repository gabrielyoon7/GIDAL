import * as React from 'react';
import CalendarView from './CalendarView';
import DiaryList from './DiaryList';
import { Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";


Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
}

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };


const DiaryListView = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date().format("yyyy-MM-dd"));
    return (
        <>
            <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DiaryList selectedDate={selectedDate} navigation={props.navigation} />
            <Fab renderInPortal={false} shadow={2} size="md" 
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />} 
                onPress={() => props.navigation.navigate('DiaryWrite')}
                // 다이어리 쓰기 페이지로 넘어가기 (스택을 어디에 추가해야할 지 모르겠음)
            />
        </>
    )
}

export default DiaryListView;