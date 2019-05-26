import React from 'react';
import { connect } from 'react-redux';
import { 
    View,
    Image,
    StyleSheet
} from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import { getTheme } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        theme: state.settings.theme
    }
}
class ViewProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <View style = { [styles.container, { backgroundColor: getTheme(this.props.theme, 'bg')} ]}>
                <View style = {styles.profileContainer}>
                    <View style = { [styles.avatarBox, { borderColor: getTheme(this.props.theme, 'text')}] }>
                        <Image source = { { uri : this.props.user.picture } } style = { styles.previewImage } />
                    </View>
                    <MainText color = {getTheme(this.props.theme, 'text')}>
                        { `${this.props.user.first} ${this.props.user.last}` }
                    </MainText>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center'
    },
    avatarBox: {
        margin: 5,
        borderWidth: 1,
        backgroundColor: '#eee',
        width: 200,
        height: 200
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})


export default connect(mapStateToProps, null)(ViewProfileScreen);