// Sửa
import React, { Component } from  'react';
import {
    AppRegistry, 
    FlatList, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Alert,
    Platform, 
    TouchableHighlight, 
    Dimensions, 
    TextInput,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import FlatListData from '../data/FlatListData';

var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editName: '',
            editPrice: ''
        };
    }
    showEditModal = (editingName, FlatListItem) => {
        console.log(`editingName = ${JSON.stringify(editingName)}`);
        this.setState({
            key: editingName.key,
            editName: editingName.name,
            editPrice: editingName.price,
            FlatListItem: FlatListItem
        });
        this.refs.myModal.open();
    }
    generateKey = (number0fCharacters) => {
        return require('random-string')({length: number0fCharacters});
    }
    render(){
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'android' ? 30 : 0 ,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280,
                    paddingBottom:150
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                }}
            >
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 150
                }}>Sửa Sản Phẩm</Text>
                <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 80,
                        marginRight: 30,
                        marginTop: 40,
                        marginBottom: 10,
                        marginBottomwidth: 1,
                    }}
                    onChangeText={(text) => this.setState({editName: text})}
                    placeholder= "Tên Sản Phẩm"
                    value={this.state.editName}
                    />
                    <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 80,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        marginBottomwidth: 1,
                    }}
                    onChangeText={(text) => this.setState({editPrice: text})}
                    placeholder= "Giá"
                    value={this.state.editPrice}
                    />
                    <Button
                        style={{ fontSize: 18, color: 'white'}}
                        containerStyle={{
                            padding: 8,
                            marginLeft: 100,
                            marginRight: 100,
                            height: 40,
                            borderRadius: 6,
                            backgroundColor: 'blue'
                        }}
                        onPress={() => {
                            if (this.state.editName.length == 0 || this.state.editPrice.length == 0) {
                                Alert.alert(
                                    "Thông Báo",
                                    "Vui lòng nhập thông tin");
                                return;
                            }
                            // Cập nhật
                            var foundIndex = FlatListData.findIndex(item => this.state.key == item.key);
                            if (foundIndex <0) {
                                return; //Không tìm thấy
                            }
                            FlatListData[foundIndex].name = this.state.editName;
                            FlatListData[foundIndex].price = this.state.editPrice;
                            //refresh FlatList Item
                            this.state.FlatListItem.refreshFlatListItem();
                            this.refs.myModal.close();
                        }}>
                        Lưu
                        
                    </Button>
                    

            </Modal>
        )
    }
}