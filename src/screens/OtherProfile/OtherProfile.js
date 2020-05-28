import React from 'react';
import { connect } from 'react-redux';
import { 
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import { getColor } from '../../utility/theme';
import { getProfile } from '../../store/actions/profile';

const mapStateToProps = (state) => {
    return {
        profileState: state.profile,
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile : (username) => dispatch(getProfile(username))
    }
}

class ViewProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            profileLoaded: false,
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
        }
        Dimensions.addEventListener('change',this.updateDimensions);
    }
    

    componentDidMount() {
        /* Call fetch profile API */
        this.props.getProfile(this.props.user.username)
    }

    componentWillUnmount = () => {
        Dimensions.removeEventListener('change',this.updateDimensions);
    }

    componentDidUpdate() {

        /* Load the profile if successfully fetched */
        const { profile, profileFetchResponse } = this.props.profileState;
        if (!this.state.profileLoaded) {
            // TODO:
            // Handle fail profile fetch response
            if (profileFetchResponse === 0) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        profile: profile,
                        profileLoaded: true
                    }
                })
            }
        }
    }


    render() {
        if (this.state.profileLoaded) {
            return (
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getColor(this.props.theme,'backgroundColor')} ]}>
    
                    <View style = {styles.primaryDetailContainer}>
                        <View style = { [styles.avatarBox, { borderColor: getColor(this.props.theme,'border')}] }>
                            <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                        </View>
                        <Text style = {{color: getColor(this.props.theme, 'color')}}>{ `${this.state.profile.first} ${this.state.profile.last}` }</Text>
                    </View>
    
                    <View style = {styles.secondaryDetailContainer}>
                        <Text style = {{color: getColor(this.props.theme, 'color')}}>{ `About me : ${this.state.profile.about}` }</Text>
                        <Text style = {{color: getColor(this.props.theme, 'color')}}>{ `Occupation : ${this.state.profile.occupation}` }</Text>
                        <Text style = {{color: getColor(this.props.theme, 'color')}}>{ `Location : ${this.state.profile.location}` }</Text>
                        <Text style = {{color: getColor(this.props.theme, 'color')}}>{ `Birthday : ${this.state.profile.birthday}` }</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style = {[styles.loadingContainer, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                    <ActivityIndicator />
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    portraitContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    landScapeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    primaryDetailContainer: {
        alignItems: 'center'
    },
    secondaryDetailContainer: {
        marginTop: 50
    },
    avatarBox: {
        margin: 5,
        borderWidth: 1,
        backgroundColor: '#eee',
        width: 175,
        height: 175
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },
    loadingContainer: { 
        flex: 1, 
        justifyContent: 'center'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);