import React, { Component } from 'react';
import { Widget, addResponseMessage, renderCustomComponent, addUserMessage } from 'react-chat-widget';
import Card from "../Sections/Card";
import { List, Icon, Avatar } from 'antd';



class ListItems extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let poulet = [];
        poulet.push(this.props.content)
        console.log('poulet',poulet);
    }
     renderCards = (cards) => {
        return <Card cardInfo={cards} />
    }
    render() {
        return (

            <div >
                    <List.Item style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            style={{width:'18rem'}}
                                description={this.renderCards(this.props.content.card)}
                        />
                    </List.Item>
            </div>
            )
    }
}

export default ListItems;