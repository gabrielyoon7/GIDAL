import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { config } from '../../../../config'
import SearchBar from "react-native-dynamic-search-bar";


const FeedSearchView = () => {

  return (
    <View>
      <SearchBar
        placeholder="Search here"
        onPress={() => alert("onPress")}
        onChangeText={(text) => console.log(text)}
      />
    </View>
  );
}

export default FeedSearchView;