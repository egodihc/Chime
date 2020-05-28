import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getColor } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        target: state.messenger.target,
        theme: state.theme.theme
    }
}

class ProfileNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {[styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                <View style = {styles.backButton}>
                    <TouchableOpacity onPress ={()=> {this.props.goBack()}}>
                        <Icon name = {'md-arrow-back'} color = {getColor(this.props.theme, 'color')} size={30} />
                    </TouchableOpacity>
                </View>
                <View style = {styles.titleContainer}>
                    <Text style = {{color: getColor(this.props.theme, 'color')}}>My profile</Text>
                </View>
            </View>
        )
    }
}


export default connect(mapStateToProps, null)(ProfileNavBar);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleContainer: {
        paddingLeft: 10
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    }
})