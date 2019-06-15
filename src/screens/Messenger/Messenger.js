import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Text,
    ActivityIndicator
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import { MessageCard } from './MessageCard';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Icon from 'react-native-vector-icons/Ionicons';

import { getTheme } from '../../utility/theme';

import { getMessages, sendMessage, clearDisable } from '../../store/actions/messenger';
import { CLEAR_MESSAGES } from '../../store/constants';
import ViewProfileScreen from '../ViewProfileScreen/ViewProfileScreen';


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        messages: state.messenger.messages,
        messagesLoaded: state.messenger.messagesLoaded,
        isLoading: state.ui.isLoading,
        theme : state.settings.theme
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        getMessages : (config) => dispatch(getMessages(config)),
        sendMessage: (config) => dispatch(sendMessage(config)),
        clearMessages : () => dispatch({ type : CLEAR_MESSAGES }),
        clearDisable: () => dispatch(clearDisable())
    };
}

class MessengerScreen extends React.Component {

    static navigatorStyle = {
        tabBarHidden: true
    }

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageField: null,
            firstLoad: true,
            config: {
                sender: this.props.user.id,
                destination: this.props.target.id,
                isGroup: this.props.isGroup,
                pw: this.props.user.pw
            },
            tempMessages: [],
            pickedImage: null,
            mode: 'messenger',
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
        }
        Dimensions.addEventListener('change',this.updateStyles);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    
    componentDidMount() {
        
        this.props.navigator.setStyle({
            navBarTextColor: getTheme(this.props.theme, 'text'),
            navBarBackgroundColor: getTheme(this.props.theme, 'bg')
        }); 

        this.props.getMessages(this.state.config);
    }

    
    componentWillUnmount() {
        this.props.clearDisable();
        Dimensions.removeEventListener('change',this.updateStyles);
    }


    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }



    componentDidUpdate() {

        /* Update the component every time new messages are fetched */
        if (!this.props.messagesLoaded) {

            this.setState(prevState => {
                return {
                    ...prevState,
                    messages: this.props.messages,
                    tempMessages: [],
                    firstLoad: false
                }
            })
            /* Lock this loop */
            this.props.clearMessages();
        }

    }

    
    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'viewProfile') {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        mode: 'profile'
                    }
                })
            }
            else if (event.id === 'backPress') {
                if (this.state.mode === 'messenger') {
                    this.props.navigator.pop();
                }
                else {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            mode: 'messenger'
                        }
                    })
                }
            }
        }
    }

    onBacktoMessengerMode = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                mode: 'messenger'
            }
        })
    }

    

    /* Input field handler */
    updateMessageField = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                messageField: text
            }
        })
    }


    sendMessage = () => {
        
        /* Get configs for this chat session */
        const { config, messageField } = this.state;
        
        if (messageField) {
            /* Call API to send message */
            this.props.sendMessage({
                ...config,
                isFile: 0,
                message: messageField
            });

            /* Add temp message */
            let tempMessages = this.state.tempMessages;
            const tempMessage = {
                ...config,
                isFile: 0,
                message: messageField,
                isTemp: true
            };

            tempMessages.push(tempMessage);
            let messages = this.state.messages;
            messages.push({
                ...tempMessage,
                filecode: 10
            });
            this.setState(prevState => {
                return {
                    ...prevState,
                    tempMessages: tempMessages,
                    messages: messages
                }
            })

            /* Clear message input field */
            this.setState(prevState => {
                return {
                    ...prevState,
                    messageField: null
                }
            });
            this.scrollView.scrollToEnd({animated: true});
        }

    }

    onLaunchCamera = () => {
        ImagePicker.launchCamera({ title: 'Take a photo'}, (res) => {
            this.imageHandler(res);
        });
    }

    onLaunchImageLibrary = () => {
        ImagePicker.launchImageLibrary({ title: 'Pick an image'}, (res) => {
            this.imageHandler(res);
        });
    }

    imageHandler = (res) => {
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
                    pickedImage: { base64: res.data }
                }
            });
            RNFetchBlob.fs.readFile(res.uri, 'base64')
            .then((data) => {
                this.props.sendMessage({
                    ...this.state.config,
                    isFile: 1,
                    message: `data:image/png;base64,${data}`
                });
            })



        }
    }


    render() {
        

        const { target, messages, user, isLoading } = this.props;

        if (this.state.firstLoad) {
            this.conversation = <ActivityIndicator />;
        }
        /* If messages are loaded */
		if (!isLoading) {
            if (messages.length > 0) {
                this.conversation = messages.map((message,i) => {

                    /* Determine if chathead avatar should be displayed,
                        based off consecutive messages  */
                    let consecutiveMessage = false;
                    if (i > 0) {
                        if (messages[i-1].sender === messages[i].sender) {
                            consecutiveMessage = true;
                        }
                    }
    
                    let isSending = (message.sender === user.id);
                    let targetPic = target.picture;

                    /* Check if message was sent */
                    let isSent = false;
                    if (message.isTemp === undefined) {
                        isSent = true;
                    }
                    
                    /* Change target picture according to group chat */
                    if (target.isGroup) {
                        for (var j = 0; j < members.length; j++) {
                            if (members[j].id === message.sender) {
                                targetPic = members[j].picture;
                            }
                        }
                    }
    
                    return <MessageCard key = {i}
                                    targetPic = { targetPic } 
                                    isSending = { isSending }
                                    consecutiveMessage = { consecutiveMessage } 
                                    message = { message.message } 
                                    fileCode = { message.filecode }
                                    isSent = {isSent}
                                     />
                });
            }
            else {
                this.conversation = 
                <Text style = {[styles.intro, { color : getTheme(this.props.theme, 'text')}]}>
                    This is the beginning of your chat history with { `${this.props.target.first} ${this.props.target.last}`}
                </Text>
            }

        }

        if (this.state.mode === 'messenger') {
            return (
                
                
                <View style = {[styles.container, { backgroundColor : getTheme(this.props.theme, 'bg')}]}>

                    {/* Message list section  */}
                    <ScrollView style = {styles.scrollView}
                        ref = {ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight)=>{        
                            this.scrollView.scrollToEnd({animated: true});
                        }}>
        
                        { this.conversation }
                    </ScrollView>
                    

                    {/* Message input section  */}
                    <View style = { styles.inputContainer }>
                        <View style = {[styles.media, (this.state.viewMode === 'portrait') ? null : styles.landscapeMediaContainer ]}>
                            <TouchableOpacity onPress = {this.onLaunchCamera}>
                                <Icon name = { 'md-camera' } color = { getTheme(this.props.theme, null) } size = {30}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this.onLaunchImageLibrary}>
                                <Icon name = { 'md-image' } color = { getTheme(this.props.theme, null) } size = {30}/>
                            </TouchableOpacity>
                        </View>
                        <View style = {[styles.textArea , (this.state.viewMode === 'portrait') ? null : styles.landscapeTextAreaContainer ]}>
                            <DefaultInput 
                                style = {[styles.messageInput, {backgroundColor: getTheme(this.props.theme, 'input')}, { color: getTheme(this.props.theme, 'text')}]} 
                                onChangeText = { (text) => { this.updateMessageField(text) }}
                                value = { this.state.messageField }
                            />
                            <TouchableOpacity onPress = {this.sendMessage}>
                                <Icon name = { 'md-send' } color = { getTheme(this.props.theme, null) } size = {30}/>
                            </TouchableOpacity>
                        </View>
                    </View>
    
                </View>
            )
        }
        else {
            return <ViewProfileScreen user = {this.props.target} onBack = {this.onBacktoMessengerMode}></ViewProfileScreen>
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
    },
    media: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '20%'
    },
    scrollView: {
        marginTop: 10
    },
    conversation: {
        justifyContent: 'flex-start'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 10,
    },
    intro: {
        textAlign: 'center'
    },  
    messageInput: {
        borderRadius: 5,
        backgroundColor: '#E9E9E9',
        width: '85%'
    },
    textArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    landscapeMediaContainer: {
        width: '10%'
    },
    landscapeTextAreaContainer: {
        width: '90%'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);