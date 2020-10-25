// Thêm
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
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newPrice: ''
        }
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
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
                }}>Thêm Sản Phẩm</Text>
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
                    onChangeText={(text) => this.setState({newName: text})}
                    placeholder= "Tên Sản Phẩm"
                    value={this.state.newName}
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
                    onChangeText={(text) => this.setState({newPrice: text})}
                    placeholder= "Giá"
                    value={this.state.newPrice}
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
                            if (this.state.newName.length == 0 || this.state.newPrice.length == 0) {
                                Alert.alert(
                                    "Thông Báo",
                                    "Vui lòng nhập thông tin");
                                return;
                            }
                            const newKey = this.generateKey(10);
                            const newName = {
                                key: newKey,
                                name: this.state.newName,
                                imageUrl:"https://cdn.nguyenkimmall.com/images/thumbnails/140/140/detailed/667/10044350-dien-thoai-iphone-11-pro-max-256gb-vang-dong-1.jpg",
                                price: this.state.newPrice
                            };
                            FlatListData.push(newName);
                            this.props.parenFlatList.refreshFlatList1(newKey);
                            this.refs.myModal.close();
                        }}>
                        Lưu
                        
                    </Button>
                    

            </Modal>
        )
    }
}