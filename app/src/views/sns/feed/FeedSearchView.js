import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { config } from '../../../../config'
import SearchBar from "react-native-dynamic-search-bar";
import { useState } from 'react';

const staticData = [
  {id:0, tag:'d33'},
  {id:1, tag:'d33123'},
  {id:2, tag:'d0'},
  {id:3, tag:'d9'},
  {id:4, tag:'8d'},
  {id:5, tag:'7d'},
  {id:6, tag:'d6'},
  {id:7, tag:'5d'},
  {id:8, tag:'d5'},
  {id:9, tag:'d4'},
  {id:10, tag:'d3'},
  {id:11, tag:'d2'},
  {id:12, tag:'d1'},
]


const FeedSearchView = () => {
  const [dataSource, setDataSource] = useState(staticData);
  const filterList = (text) => {
    let newData = staticData;
    newData = staticData.filter((item)=>{
      const itemData = item.tag.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    })
    setDataSource(newData);
  }
  const renderItem = (item) => {
    return(
      <Text>{item.tag}</Text>
    )
  }

  return (
    <View>
      <SearchBar
        placeholder="Search here"
        onPress={() => alert("onPress")}
        onChangeText={(text) => {
          console.log(text)
          filterList(text);
        }}
        onClearPress={() => {
          filterList("");
        }}
      />
      <View style={styles.flatListStyle}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
}

export default FeedSearchView;

const styles = StyleSheet.create({
  flatListStyle: {
    marginTop: 12,
  },
})