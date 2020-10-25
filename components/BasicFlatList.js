// Thêm ảnh vào FlatList
// Xoá item
import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import FlatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowkey: null,
            numberOfRefresh: 0
        };
    }
    refreshFlatListItem = () => {
        this.setState((privState) => {
            return {
                numberOfRefresh: privState.numberOfRefresh + 1
            };
        });
    }
    render(){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowkey != null) {
                    this.setState({ activeRowkey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowkey: this.props.item.key });

            },
            right: [
                {
                    onPress:() => {
                        // Alert.alert("Cập Nhật");
                        this.props.parenFlatList.refs.editModal.showEditModal(FlatListData[this.props.index], this);
                    },
                    text: 'Sửa', type: 'primary'
                },
                {
                    onPress:() => {
                        const deletingRow = this.state.activeRowkey;
                        Alert.alert(
                            'Thông Báo',
                            'Bạn có chắc chắn muốn xóa ?',
                            [
                                {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'Cancel'},
                                {text: 'Có', onPress: () => {
                                    FlatListData.splice(this.props.index, 1);
                                    // Refresh FlatList !
                                    this.props.parenFlatList.refreshFlatList(deletingRow);
                                }},
                            ],
                        )

                    },
                    text: 'Xoá', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                flex:1,
                flexDirection: 'column'
            }}>
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                    // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
                    backgroundColor: 'white'
                }}>
                    <Image 
                        source={{uri: this.props.item.imageUrl}}
                        style={{width: 100, height: 100, margin: 5}}
                    >
                    </Image>
                    <View style= {{
                        flex: 1,
                        flexDirection:'column',
                        height: 100
                     }}>
                            <Text style = {styleS.FlatListItem}>{this.props.item.name}</Text>
                            <Text style = {styleS.FlatListItem}>{this.props.item.price}</Text>
                    </View>
                </View>
                <View style={{
                    height:2,
                    backgroundColor: 'black'
                }}>

                </View>
            </View>
            </Swipeout>
            
            
            
        );
    }
}
const styleS = StyleSheet.create({
    FlatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 18,
    }
});

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deleteRowKey: null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refreshFlatList = (deletedKey) => {
        this.setState((privState) => {
            return {
            deleteRowKey: deletedKey
            };
        });
        // this.refs.FlatList.scrollToEnd();
    }
    refreshFlatList1 = (deletedKey) => {
        this.setState((privState) => {
            return {
            deleteRowKey: deletedKey
            };
        });
        this.refs.FlatList.scrollToEnd();
    }

    _onPressAdd () {
        this.refs.addModal.showAddModal();
    }
    render() {
        return (
            <View style={{flex: 1, marginTop: 22, Platform:0}}>
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'tomato',
                    height: 40}}>
                        <TouchableHighlight
                            style={{marginRight: 10}}
                            underlayColor= 'tomato'
                            onPress={this._onPressAdd}>
                                <Image
                                    style = {{width: 35, height: 35}}
                                    source={require('../icons/iconadd.png')}
                                />

                        </TouchableHighlight>

                </View>
                <FlatList
                    ref={"FlatList"}
                    data={FlatListData}
                    renderItem={({item, index})=>{
                        // console.log(`Item = $ {item}, index = ${index}`);
                        return (
                            <FlatListItem item={item} index={index} parenFlatList={this}>

                            </FlatListItem>);
                    }}
                    >

                </FlatList>
                <AddModal ref={'addModal'} parenFlatList={this} >
                    
                </AddModal>
                <EditModal ref={'editModal'} parenFlatList={this}>

                </EditModal>
            </View>
        );
    }
}