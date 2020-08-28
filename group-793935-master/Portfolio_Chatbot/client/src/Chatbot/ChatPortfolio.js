import React, { useEffect,useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import Card from "./Sections/Card";
import { Widget,addResponseMessage, addUserMessage,renderCustomComponent } from 'react-chat-widget';
import './Sections/style.css'
import LisItems from './Sections/ListItems'
//import 'react-chat-widget/lib/styles.css';



function ChatPortfolio() {

    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
     const [state, setState] = useState("");
     const [blab, setBlab] = useState("");

    const handleNewUserMessage = (newMessage) => {
       // alert(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        //setState(newMessage)
    console.log(newMessage.includes("nom"))
    // if(newMessage.includes("nom")){
    //     //console.log(state)
    //     setBlab("nom")
    //     //textQuery(newMessage)
        
    // }
   
    if(newMessage.includes("modifie") || newMessage.includes("vide"))
    {
        setState(newMessage.replace("modifie ", ""));
        textQuery(newMessage);  
    }else if(newMessage.includes("nom")){
        setBlab("nom")
        textQuery(newMessage)
    }else if(newMessage.includes("description")){
        setBlab("description")
        textQuery('voici une description')
    }else if(newMessage.includes("date")){
        setBlab("date")
        textQuery("calibre la date")
    }else if(newMessage.includes("languages" || "langues" || "framework", "logiciels")){
        setBlab("used_language")
        textQuery("met a jour les languages")
    }else if(blab.includes("nom")){
        // console.log(blab)
        textQuery('modifie le nom du projet '+ state +' par ' +  newMessage)
         setState("")
         setBlab("")
     }else if(blab.includes("description")){
        // console.log(blab)
        textQuery('met a jour la date de '+ state +' par ' +  newMessage)
         setState("")
         setBlab("")
     }else if(blab.includes("date")){
        // console.log(blab)
         textQuery('renew project '+ state +' by new ' +  (newMessage.replace("date ", "")).toString())
         setState("")
         setBlab("")
     }else if(blab.includes("used_language")){
        // console.log(blab)
         textQuery('redéfinie les languages utilisés par '+ newMessage  +' dans mon projet ' + state )
         setState("")
         setBlab("")
     }else{
        textQuery(newMessage);
    }

    };

    useEffect(() => {
       // renderMessage(messagesFromRedux);
        eventQuery("welcomeToMyWebsite");

    }, [])


    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))


        }

    }


    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const renderOneMessage = (message, i, value) => {
        
       //const rowLen = state.length;
        // we need to give some condition here to separate message kinds 

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            if (value === i + 1) {
                if(message.who == 'bot'){
                    if(message.content.text.text != ""){
                        addResponseMessage((message.content.text.text).toString())
                    }
                   
               }
           } 
            // return <Message key={i} who={message.who} text={message.content.text.text} />
                //addResponseMessage((message.content.text.text).toString())
        
               
            
        }
    

                //const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />
                   if(message.content && message.content.card && message.content.card.buttons){
                    if (value === i + 1) {
                        if(message.who == 'bot'){
                            return renderCustomComponent(LisItems , {...message})
                        }
                    }
                }
            
        

        // template for card message 
    }



    const renderMessage = (returnedMessages) => {
        const poulet = returnedMessages.length;
        
        //setState(poulet)
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i, poulet);
            })
        } else {
            return null;
        }
    }



    return (
    <div>
        <div>
        {renderMessage(messagesFromRedux)}
        </div>
        <Widget 
        title={"SAMY"}
        handleNewUserMessage={handleNewUserMessage}
        senderPlaceHolder={'Posez votre question...'}
        // fullScreenMode={true}
        subtitle={'Bonjour je m\'apelle Samy.'}
        />
    </div>
    )
}

export default ChatPortfolio;
