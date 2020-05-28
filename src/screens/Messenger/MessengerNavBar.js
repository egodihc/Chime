import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { getColor } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        target: state.messenger.target,
        theme: state.theme.theme
    }
}

class MessengerNavBar extends React.Component {
    render() {
        return (
            <View style = {[styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                <View style = {styles.backButton}>
                    <TouchableOpacity onPress ={()=> {this.props.goBack()}}>
                        <Icon name = {'md-arrow-back'} color = {getColor(this.props.theme, 'color')} size={30} />
                    </TouchableOpacity>
                </View>
                <View style = {[styles.subContainer, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                    <Text style ={{color: getColor(this.props.theme, 'color')}}>{ `${this.props.target.first} ${this.props.target.last}`}</Text>
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
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'space-between'
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        paddingRight: 10
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})