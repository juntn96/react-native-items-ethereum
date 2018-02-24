import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';

import getWeb3 from '../../utils/getWeb3'

import items from '../../utils/items'

import { getItemProp, getItemQuality } from '../../utils/utils'

import ItemCreator from '../../../build/contracts/ItemCreator.json'
const contract = require('truffle-contract')

import '../../../global'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: items,
            loading: false,
            web3: null
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            console.log('result: ', results.web3)
            this.setState({ web3: results.web3 })
        })
            .catch(error => {
                console.log('Error')
            })
    }

    _onPress = () => {

        // this.setState({loading: true})

        const web3 = this.state.web3

        const itemCreator = contract(ItemCreator)
        itemCreator.setProvider(web3.currentProvider)

        const timestamp = Date.now().toString()

        web3.eth.getCoinbase(async (error, coinbase) => {
            console.log('coinbase: ', coinbase)
            const instance = await itemCreator.deployed()
            console.log('instance: ', instance)
            const rs = await instance.test({ from: coinbase})
            console.log('result: ', rs)
            const event = await instance.Log({ from: coinbase })
            console.log('event: ', event)
            event.watch((err, rs) => {
                console.log('aaa')
                // if (err) {
                //     this.setState({loading: false})
                //     return
                // }
                console.log('rs: ', rs)
                // const itemProp = getItemProp(rs.args.itemProp.toString())
                // console.log('item props: ', itemProp)
                // const itemQuality = getItemQuality(itemProp)
                // console.log('item quality: ', itemQuality)
                // event.stopWatching((err, rs) => {
                //     this.setState({loading: false})
                // })
            })
        })
    }

    _keyExtractor = item => item.id

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#FFF',
                    margin: 8,
                    paddingBottom: 8
                }}
            >
                <View
                    style={{
                        borderRadius: 5,
                        borderWidth: 2,
                        borderColor: '#fbc531',
                        padding: 12,
                        marginRight: 8
                    }}
                >
                    <Image
                        source={item.image} />
                </View>
                <View
                >
                    <Text
                        style={{
                            color: '#FFF'
                        }}
                    > {item.name} </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 4,
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <Image source={require('../../assets/images/ic_dmg.png')} />
                        <Text style={{ color: '#FFF', marginRight: 4 }} > {item.dmg} </Text>
                        <Image source={require('../../assets/images/ic_def.png')} />
                        <Text style={{ color: '#FFF', marginRight: 4 }} > {item.dmg} </Text>
                        <Image source={require('../../assets/images/ic_str.png')} />
                        <Text style={{ color: '#FFF', marginRight: 4 }} > {item.dmg} </Text>
                        <Image source={require('../../assets/images/ic_agi.png')} />
                        <Text style={{ color: '#FFF', marginRight: 4 }} > {item.dmg} </Text>
                        <Image source={require('../../assets/images/ic_intel.png')} />
                        <Text style={{ color: '#FFF', marginRight: 4 }} > {item.dmg} </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        const { items, loading } = this.state

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#353b48',
                    paddingTop: 30
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 10
                    }}
                >
                    <Image
                        source={require('../../assets/images/treasurebox.png')}
                        style={{
                            width: Dimensions.get('screen').height / 4,
                            height: Dimensions.get('screen').height / 4
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this._onPress}
                        disabled={loading}
                        style={{
                            backgroundColor: '#4cd137',
                            paddingLeft: 36,
                            paddingRight: 36,
                            paddingTop: 8,
                            paddingBottom: 8,
                            borderRadius: 5,
                            marginTop: 14
                        }}
                    >
                        {
                            loading ?
                                <ActivityIndicator color='#FFF' />
                                :
                                <Text
                                    style={{
                                        color: '#FFF',
                                        fontWeight: '500',
                                        fontSize: 17
                                    }}
                                >Buy</Text>
                        }

                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        marginTop: 16
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 8,
                            color: '#FFF',
                            marginBottom: 8
                        }}
                    >Your Items</Text>
                    <FlatList
                        data={items}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </View>
        );
    }
}

export default Home;
