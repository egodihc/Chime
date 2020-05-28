import React from 'react';
import { connect } from 'react-redux';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getColor } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme
    }
}

class ContactNavBar extends React.Component {
    render() {
        return (
            <View style = {[styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                <View style = {styles.subContainer}>
                <TouchableOpacity onPress = {this.props.openDrawer}>
                    <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} size = {30} color = '#bbb' />
                </TouchableOpacity>
                <View style = {styles.title}>
                    <Text style = {{color: getColor(this.props.theme, 'color')}}>CONTACTS</Text>
                </View>           
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, null)(ContactNavBar);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '95%'
    },
    title: {
        marginLeft: 20
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})