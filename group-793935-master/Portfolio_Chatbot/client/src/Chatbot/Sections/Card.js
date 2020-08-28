import React,{useEffect} from 'react'
import { Card, Icon } from 'antd';
import { EditOutlined, EllipsisOutlined, CloseOutlined  } from '@ant-design/icons'
import { addUserMessage } from 'react-chat-widget';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../_actions/message_actions';
import Axios from 'axios';
const { Meta } = Card;

function CardComponent(props) {
    const dispatch = useDispatch();
    function update(e) {
        e.preventDefault();
        textQuery('modifie '+ props.cardInfo.title)
        // textQuery('modifie '+ props.cardInfo.title)
      }

      function deleted(e) {
        e.preventDefault();
        textQuery('efface '+ props.cardInfo.title)
      }
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
       // console.log(props.cardInfo)
      });


      const textQuery = async (text) => {
        addUserMessage(text)
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
    return (
        <Card
            style={{ width: 350, margin:10}}
            cover={
                <img
                style={{height:140}}
                    alt={props.cardInfo.subtitle}
                    src={'https://drive.google.com/uc?id=1ZFbiXqnep2HGVEVIA8c-UQ-rR5NwYb9u'} />
            }
            actions={[

                <div style={{display:'flex'}}>
                <a target="_blank" rel="noopener noreferrer" onClick={deleted}>
                        <CloseOutlined key="setting"  />
                        </a>
                <a target="_blank" rel="noopener noreferrer" onClick={update}>
                        <EditOutlined key="edit" />
                </a>
                </div>
                
            ]}
        >
            
            <Meta
                title={props.cardInfo.title}
                description={props.cardInfo.subtitle}
            />
        <div style={{ marginLeft:-15, marginTop:10}}>
        <p style={{fontSize:13}}>languages utilisés: {props.cardInfo.buttons[0].text}</p>
        <p style={{fontSize:13}}>date : {props.cardInfo.buttons[0].postback}</p>
        </div>
        </Card>

    )
}

export default CardComponent
