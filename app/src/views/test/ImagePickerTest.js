import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Button, Input, FormControl, Center } from "native-base"
import axios from 'axios';
import { config } from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img } from '../sns/profile/profileImg'

const PickModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/1/1247.png");

  return <Center>
  <TouchableOpacity onPress={() => setShowModal(true)}>
  <Image style={styles.avatar} source={{ uri: image }} />
  </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>프로필 선택</Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                취소
              </Button>
              <Button onPress={() => {
              setShowModal(false);
            }}>
                저장
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>;
};

export default function ImagePickerExample() {
  return (
    <PickModal/>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    position: 'absolute',
    top: 10, left: 20
  }
});