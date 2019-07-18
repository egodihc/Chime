import React from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText/MainText';

const mapStateToProps = (state) => {
    return {
        target: state.messenger.target
    }
}

class MessengerNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.subContainer}>
                    <MainText color = {'white'}>{ `${this.props.target.first} ${this.props.target.last}`}</MainText>
                    <TouchableOpacity onPress = {this.props.toggleMode}>
                        <Image source = {{uri: this.props.target.picture}} style = {styles.imageContainer}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


export default connect(mapStateToProps, null)(MessengerNavBar);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%'
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})