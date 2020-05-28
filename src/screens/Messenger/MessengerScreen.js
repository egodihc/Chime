import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    ActivityIndicator
} from 'react-native';

import OtherProfile from '../OtherProfile/OtherProfile';
import MessengerNavBar from './MessengerNavBar';
import MessageCard from './MessageCard';

import ImagePicker from 'react-native-image-picker';

import { getColor } from '../../utility/theme';
import { getMessages, sendMessage } from '../../store/actions/messenger';
import { SET_MESSAGES_LOADED } from '../../store/constants';
import MessengerInput from '../../components/Messenger/MessengerInput/MessengerInput';

const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData,
        user: state.auth.user,
        messages: state.messenger.messages,
        messagesLoaded: state.messenger.messagesLoaded,
        isLoading: state.ui.isLoading,
        target: state.messenger.target,
        theme: state.theme.theme
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        getMessages : (config) => dispatch(getMessages(config)),
        sendMessage: (config) => dispatch(sendMessage(config)),
        setMessagesLoaded : () => dispatch({ type : SET_MESSAGES_LOADED })
    };
}

class MessengerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <MessengerNavBar toggleMode = {navigation.getParam('onToggleViewMode')} goBack = {navigation.getParam('goBack')}/>,
        headerLeft: null
    });

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageField: null,
            firstLoad: true,
            config: {
                sender: this.props.authData.username,
                destination: this.props.target.username,
                password: this.props.authData.password
            },
            tempMessages: [],
            mode: 'messenger',
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
        }
        Dimensions.addEventListener('change',this.updateStyles);
    }

    componentDidMount() {
        this.props.navigation.setParams({ onToggleViewMode: this.onToggleViewMode, goBack: () => { this.props.navigation.goBack()} });
        this.updateMessages();
        this.interval = setInterval(() => { this.updateMessages(); }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        Dimensions.removeEventListener('change',this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    updateMessages = () => {
        this.props.getMessages(this.state.config);
    }

    componentDidUpdate() {
        /* Update the component every time new messages are fetched */
        if (!this.props.messagesLoaded) {
            if (this.state.messages.length !== this.props.messages) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        messages: this.props.messages,
                        firstLoad: false
                    }
                })
            }
            /* Lock this loop */
            this.props.setMessagesLoaded();
            if (this.state.mode === 'messenger') {
                this.scrollView.scrollToEnd({animated: true});
            }
        }
    }

    onToggleViewMode = () => {
        this.setState({ mode: (this.state.mode === 'messenger') ? 'profile' : 'messenger' });
    }

    /* Input field handler */
    updateMessageField = (text) => {
        this.setState({messageField: text});
    }

    sendMessage = () => {
        /* Get configs for this chat session */
        const { config, messageField } = this.state;
        
        if (messageField) {
            /* Call API to send message */
            this.props.sendMessage({
                ...config,
                isImage: 0,
                message: messageField
            });

            /* Clear message input field */
            this.setState({messageField: ""});

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
        if (res.error) {
            alert('Something went wrong while loading the image.');
        }
        else {
            this.props.sendMessage({
                ...this.state.config,
                isImage: 1,
                message: `data:image/png;base64,${res.data}`
            });
        }
    }

    render() {
        const { user } = this.props;
        const { messages } = this.state;
        
        let conversation;

        if (this.state.firstLoad) {
            conversation = <ActivityIndicator />;
        }
        else {
            /* If messages are loaded */
            if (messages.length > 0) {
                conversation = messages.map((message,i) => {

                    /* Determine if chathead avatar should be displayed,
                        based off consecutive messages  */
                    let consecutiveMessage = false;
                    if (i > 0) {
                        if (messages[i-1].sender === messages[i].sender) {
                            consecutiveMessage = true;
                        }
                    }

                    return <MessageCard 
                                    key = {i}
                                    targetPic = {this.props.target.picture} 
                                    userPic = {this.props.user.picture}
                                    isSending = {(message.sender === user.username)}
                                    consecutiveMessage = {consecutiveMessage} 
                                    message = {message.message} 
                                    isImage = {message.isImage}
                                    theme={this.props.theme}
                                    timestamp = {message.timestamp}
                                        />
                });
            }
            else {
                conversation = 
                <Text style = {[styles.intro, { color : getColor(this.props.theme, 'color')}]}>
                    This is the beginning of your chat history with { `${this.props.target.first} ${this.props.target.last}`}
                </Text>
            }

        }

        

        if (this.state.mode === 'messenger') {
            return (
                <View style = {[styles.container, { backgroundColor : getColor(this.props.theme, 'backgroundColor')}]}>

                    {/* Message list section  */}
                    <ScrollView style = {styles.scrollView}
                        ref = {ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight)=>{    
                            if (contentHeight > 0){
                                this.scrollView.scrollToEnd({animated: true});
                            }    
                        }}>
                        { conversation }
                    </ScrollView>
                    
                    {/* Message input section  */}
                    <MessengerInput 
                        onChangeText = {this.updateMessageField} 
                        value = {this.state.messageField}
                        onSend={this.sendMessage}
                        theme={this.props.theme}
                        viewMode = {this.state.viewMode}
                        onLaunchCamera={this.onLaunchCamera}
                        onLaunchImageLibrary={this.onLaunchImageLibrary}
                    />
                </View>
            )
        }
        else {
            return <OtherProfile user = {this.props.target} onBack = {this.onBacktoMessengerMode}></OtherProfile>
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
    scrollView: {
        marginTop: 10
    },
    conversation: {
        justifyContent: 'flex-start'
    },
    intro: {
        textAlign: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);