import React from 'react';
import { connect } from 'react-redux';
import { 
    View,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import { getTheme } from '../../utility/theme';
import { getProfile } from '../../store/actions/profile';

const mapStateToProps = (state) => {
    return {
        profileState: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile : (id) => dispatch(getProfile(id))
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
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getTheme('bg')} ]}>
    
                    <View style = {styles.primaryDetailContainer}>
                        <View style = { [styles.avatarBox, { borderColor: getTheme('text')}] }>
                            <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                        </View>
                        <MainText>
                            { `${this.state.profile.first} ${this.state.profile.last}` }
                        </MainText>
                    </View>
    
    
                    <View style = {styles.secondaryDetailContainer}>
                        <MainText>
                            { `About me : ${this.state.profile.about}` }
                        </MainText>
                        <MainText>
                            { `Occupation : ${this.state.profile.occupation}` }
                        </MainText>
                        <MainText>
                            { `Location : ${this.state.profile.location}` }
                        </MainText>
                        <MainText>
                            { `Birthday : ${this.state.profile.birthday}` }
                        </MainText>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style = {styles.loadingContainer}>
                    <ActivityIndicator></ActivityIndicator>
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
        backgroundColor: getTheme('bg'), 
        flex: 1, 
        justifyContent: 'center'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);