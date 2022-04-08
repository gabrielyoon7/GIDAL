import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { config } from '../../../../config'
import SearchBar from "react-native-dynamic-search-bar";


const handleOnChangeText = (text) => {
    // ? Visible the spinner
    setState({
      searchText: text,
      spinnerVisibility: true,
    });

    // ? After you've done to implement your use-case
    // ? Do not forget to set false to spinner's visibility
    setState({
      spinnerVisibility: false,
    });
  };


const FeedSearchView = () => {

    const { spinnerVisibility } = this.state;
    return (
        <View>
          <SearchBar
            height={50}
            fontSize={24}
            fontColor="#fdfdfd"
            iconColor="#fdfdfd"
            shadowColor="#282828"
            cancelIconColor="#fdfdfd"
            backgroundColor="#ba312f"
            spinnerVisibility={spinnerVisibility}
            placeholder="Search any cosmetics ..."
            fontFamily="BurbankBigCondensed-Black"
            shadowStyle={styles.searchBarShadowStyle}
            onChangeText={handleOnChangeText}
          />
        </View>
      );
}

export default FeedSearchView;