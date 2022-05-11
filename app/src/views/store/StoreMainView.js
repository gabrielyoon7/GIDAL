import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, FlatList, View } from 'react-native';
import BackButton from '../../components/common/BackButton';

const StoreMainView = (props) => {
    return(
     <View>
     <BackButton navigation={props.navigation} />
        <Button title="스토어"/>
    </View>
    )
}


export default StoreMainView;