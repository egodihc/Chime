import React from 'react';
import { connect } from 'react-redux';

import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Button from '../../components/UI/Button/Button';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import MainText from '../../components/UI/MainText/MainText';

import { getTheme } from '../../utility/theme';
import { getProfile } from '../../store/actions/profile';


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        profileState: state.profile
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile : (id) => dispatch(getProfile(id))
    }
}

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            profileLoaded: false,
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            mode: 'view',
            keyboard: 'hide',
            controls: {
                picture: '',
                blurb: '',
                occupation: '',
                birthday: ''
            }
        }
        Dimensions.addEventListener('change',this.updateDimensions);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentDidMount() {
        /* Call fetch profile API */
        this.props.getProfile(this.props.user.id);
    }

    keyboardDidShow = () => {
        this.setState({ keyboard: 'show'});
    }

    keyboardDidHide = () => {
        this.setState({ keyboard: 'hide'});
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
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

    updateDimensions = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    onToggleEditMode = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                mode: (prevState.mode === 'edit') ? 'view' : 'edit'
            }
        })
    }
    
    componentWillUnmount = () => {
        Dimensions.removeEventListener('change',this.updateDimensions);
    }

    render() {
        if (this.state.profile === null) {
            return (
                <View style = {styles.loadingContainer}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            )
        }
        else if (this.state.mode === 'view') {
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
                            { `About me : ${this.state.profile.blurb}` }
                        </MainText>
                        <MainText>
                            { `Occupation : ${this.state.profile.occupation}` }
                        </MainText>
                        <MainText>
                            { `Birthday : ${this.state.profile.birthday}` }
                        </MainText>
                    </View>
                    <View style = {styles.itemTopContainer}>
                        <View style = {styles.iconContainer}>
                            <TouchableOpacity onPress = {this.onToggleEditMode}>
                                <Icon name = { Platform.OS === 'android' ? 'md-create' : 'ios-create'} size = {30} color = '#bbb' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getTheme('bg')} ]}>
                    {(this.state.keyboard === 'hide') ? 
                        <View style = {styles.primaryDetailContainer}>
                            <View style = { [styles.avatarBox, { borderColor: getTheme('text')}] }>
                                <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                            </View>
                            <MainText>
                                { `${this.state.profile.first} ${this.state.profile.last}` }
                            </MainText>
                        </View>
                        :
                        null
                    }


                    <View style = {styles.secondaryDetailContainer}>
                        <DefaultInput placeholder = {'About me'} style = {styles.input} />
                        <DefaultInput placeholder = {'Occupation'} style = {styles.input}/>
                        <DefaultInput placeholder = {'Birthday'} style = {styles.input}/>
                    </View>

                    <View style = {styles.itemTopContainer}>
                        <Button style = {styles.button} onPress = {this.onToggleEditMode} textColor = {'white'}>Save</Button>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getTheme('bg')
    },
    itemTopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        width: '70%'
    },
    iconContainer: {
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 40,
        height: 40
    },
    button: {
        borderColor: 'white',
        width: '40%'
    },
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryDetailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);