import React from 'react';
import { ActivityIndicator, Dimensions, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { getProfile, saveProfile } from '../../store/actions/profile';
import { getColor } from '../../utility/theme';
import ProfileNavBar from './ProfileNavBar';

const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData,
        profileAPIState: state.profile,
        theme: state.theme.theme
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile : (username) => dispatch(getProfile(username)),
        saveProfile: (params) => dispatch(saveProfile(params))
    }
}

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <ProfileNavBar goBack = {navigation.getParam('goBack')}/>,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            profileLoaded: false,
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            mode: 'view',
            keyboard: 'hide',
            controls: {
                about: '',
                occupation: '',
                birthday: '',
                location: '',
                picture: ''
            },
            editPending: false
        }
        Dimensions.addEventListener('change',this.updateDimensions);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: () => {this.props.navigation.goBack()} });
        /* Call fetch profile API */
        this.props.getProfile(this.props.authData.username);
    }

    componentDidUpdate() {

        /* Load the profile if successfully fetched */
        const { profile, profileFetchResponse, profileEditState } = this.props.profileAPIState;
        if (!this.state.profileLoaded) {
            if (profileFetchResponse === 0 && !this.state.editPending) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        profile: profile,
                        controls: {
                            birthday: profile.birthday,
                            location: profile.location,
                            occupation: profile.occupation,
                            about: profile.about
                        },
                        profileLoaded: true
                    }
                })
            }
            else if (profileEditState === 'SUCCESS' && this.state.editPending) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        mode: 'view',
                        profile: profile,
                        controls: {
                            ...profile
                        },
                        profileLoaded: true,
                        editPending: false
                    }
                })
            }
        }
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
        Dimensions.removeEventListener('change',this.updateDimensions);
    }

    editItem = (key, value) => {
        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    [key]: value
                }
            }
        });
    }

    updateDimensions = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }

    onToggleEditMode = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                mode: 'edit'
            }
        });
    }

    onSaveProfile = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                profileLoaded: false,
                editPending: true
            }
        });
        this.props.saveProfile({ 
            ...this.state.controls,
            username: this.props.authData.username,
            password: this.props.authData.password
        });
    }
    
    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Upload a new profile picture'}, res => {
            if (res.didCancel) {
                console.log('User cancelled');
            }
            else if (res.error) {
                console.log('Error', res.error);
            }
            else {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        profile: {
                            ...prevState.profile,
                            picture: res.uri
                        },
                        controls: {
                            ...prevState.controls,
                            picture: `data:image/png;base64,${res.data}`
                        }
                    }
                })
            }
        });
    }

    render() {
        if (this.state.profile === null) {
            return (
                <View style = {[styles.loadingContainer, { backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            )
        }
        else if (this.state.mode === 'view') {
            return (
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getColor(this.props.theme, 'backgroundColor')} ]}>

                    <View style = {styles.primaryDetailContainer}>
                        <View style = { [styles.avatarBox, { borderColor: getColor(this.props.theme, 'border')}] }>
                            <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                        </View>
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>{ `${this.state.profile.first} ${this.state.profile.last}` }</Text>
                    </View>

                    <View style = {styles.secondaryDetailContainer}>
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>{ `About me : ${this.state.profile.about}` }</Text>
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>{ `Occupation : ${this.state.profile.occupation}` }</Text>
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>{ `Location : ${this.state.profile.location}` }</Text>
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>{ `Birthday : ${this.state.profile.birthday}` }</Text>
                    </View>
                    <View style = {styles.itemTopContainer}>
                        <View style = {[styles.iconContainer, { borderColor: getColor(this.props.theme, 'border')}]}>
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
                <View style = {[ (this.state.viewMode === 'portrait') ? styles.portraitContainer : styles.landScapeContainer, {backgroundColor: getColor(this.props.theme, 'backgroundColor')} ]}>
                    {(this.state.keyboard === 'hide') ? 
                        <View style = {styles.primaryDetailContainer}>
                            <TouchableOpacity onPress={this.pickImageHandler}>
                                <View style = { [styles.avatarBox, { borderColor: getColor(this.props.theme, 'border')}] }>
                                    <Image source = { { uri : this.state.profile.picture } } style = { styles.previewImage } />
                                </View>
                            </TouchableOpacity>
                            <Text style = {{color:getColor(this.props.theme, 'color')}}>{ `${this.state.profile.first} ${this.state.profile.last}` }</Text>
                        </View>
                        :
                        null
                    }
                    <View style = {[styles.secondaryDetailContainer, (this.state.viewMode==='portrait') ? {marginTop: 30}: null]}>
                        <DefaultInput 
                            placeholder = {'About me'} 
                            style = {styles.input} 
                            theme={this.props.theme}
                            defaultValue = {this.state.profile.about}
                            onChangeText = { (text) => { this.editItem('about',text)}}
                        />
                        <DefaultInput 
                            placeholder = {'Occupation'} 
                            style = {styles.input} 
                            theme={this.props.theme}
                            defaultValue = {this.state.profile.occupation} 
                            onChangeText = { (text) => { this.editItem('occupation',text)}}
                        />
                        <DefaultInput 
                            placeholder = {'Location'} 
                            style = {styles.input}
                            theme={this.props.theme}
                            defaultValue = {this.state.profile.location} 
                            onChangeText = { (text) => { this.editItem('location',text)}}
                        />
                        <DefaultInput 
                            placeholder = {'Birthday'} 
                            style = {styles.input}
                            theme={this.props.theme}
                            defaultValue = {this.state.profile.birthday} 
                            onChangeText = { (text) => { this.editItem('birthday',text)}}
                        />
                    </View>
                    <View style = {styles.itemTopContainer}>
                        {(this.state.editPending === true) ?
                        <View style = {[styles.loadingContainer, { flex: 0, backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                            <ActivityIndicator></ActivityIndicator>
                        </View>
                        :
                        <Button 
                            style = {[styles.button, {borderColor: getColor(this.props.theme, 'border')}]} 
                            onPress = {this.onSaveProfile} 
                            textColor = {getColor(this.props.theme, 'color')}
                            >Save</Button>
                        }
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
        alignItems: 'center'
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
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 40,
        height: 40
    },
    button: {
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