import {
    StyleSheet,
} from 'react-native'

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    mainContent: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        backgroundColor: '#ffff'
    },
    header: {
        backgroundColor: '#4682b4',
        padding: 5
    },
    wrapperTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: '#f5f5f5'
    },
    logout: {
        color: '#f5f5f5'
    },
    input__search: {
        backgroundColor: '#f5f5f5', 
        height: 30,
        width: '100%',
        color: 'black',
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    form: {
        backgroundColor: 'cornflowerblue',
        padding: 15,
        borderRadius: 20
    },
    form__input: {
        color: 'white',
        borderBottomWidth: 1,
        padding: 3
    },
    modalView: {
        borderRadius: 20,
        marginTop: '80%',
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button__submitTask: {
        marginBottom:10
    },
    card: {
        height: 50,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 40,
        paddingTop: 5,
        paddingBottom: 5,
        borderLeftWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0e68c'
    },
    
    text__todoTitle: {
        fontWeight: 'bold',
    },
    text__grey: {
        color: 'grey',
        fontSize: 12
    },
    cardDetail: {
        backgroundColor: '#f5f5dc',
        padding: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    wrapperButton: {
        flex: 1,
        flexDirection: 'row',
    },
    button__editTask: {
        textDecorationLine: 'underline',
        marginRight: 10,
        color: 'green'
    },
    button__deleteTask: {
        textDecorationLine: 'underline',
        color: 'red'
    },
    containerLogin: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffff'
    },
    text__welcome: {
        fontSize:40,
        backgroundColor: '#4682b4',
        width: '100%',
        textAlign: 'center',
        marginBottom: 50,
        borderBottomRightRadius: 50,
        color: '#ffff'
    },
    text__login: {
        fontSize:20,
        width: '100%',
        textAlign: 'center',
        color: '#ffff'
    },
    form__login: {
        backgroundColor: '#4682b4',
        width: '80%',
        borderRadius: 5,
        padding: 10
    },
    text__white: {
        color: '#ffff'
    },
    login__input: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        height: 40,
    },
    text__signup: {
        textDecorationLine: 'underline',
        color: '#ffff',
        marginTop: 5,
    }
});