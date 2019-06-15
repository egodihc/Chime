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
        theme: state.settings.theme,
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
        this.props.getProfile(this.props.user.id)
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
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getTheme(this.props.theme, 'bg')} ]}>
    
                    <View style = {styles.primaryDetailContainer}>
                        <View style = { [styles.avatarBox, { borderColor: getTheme(this.props.theme, 'text')}] }>
                            <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                        </View>
                        <MainText color  = {getTheme(this.props.theme, 'text')}>
                            { `${this.state.profile.first} ${this.state.profile.last}` }
                        </MainText>
                    </View>
    
    
                    <View style = {styles.secondaryDetailContainer}>
                        <MainText color  = {getTheme(this.props.theme, 'text')}>
                            { `About me : ${this.state.profile.blurb}` }
                        </MainText>
                        <MainText color  = {getTheme(this.props.theme, 'text')}>
                            { `Occupation : ${this.state.profile.occupation}` }
                        </MainText>
                        <MainText color  = {getTheme(this.props.theme, 'text')}>
                            { `Birthday : ${this.state.profile.birthday}` }
                        </MainText>
                    </View>
                </View>
            )
        }
        else {
            return <ActivityIndicator></ActivityIndicator>
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
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);