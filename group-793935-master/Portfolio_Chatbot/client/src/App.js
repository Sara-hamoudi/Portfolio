import React,{ Component,useEffect } from "react";
import { Typography, Icon } from 'antd';
import Chatbot from './Chatbot/Chatbot';
import ScrollableTabsButtonForce from "./components/Navigation/Navigation";
import AboutMe from "./components/AboutMe/AboutMe";
import ProjectCardList from "./components/ProjectCardList/ProjectCardList";
import Experience from "./components/Experience/Experience";
import Skill from "./components/Skill/Skill";
import ContactForm from "./components/Contact/Contact";
import Section from "./components/Section/Section.component";
import { Widget,addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatbotPortfolio from './Chatbot/ChatPortfolio';

const { Title } = Typography;

function App() {
  useEffect(() => {
   // addResponseMessage('Bienvenue comment puis-je vous aider ??');
  }, []);


  return (
<div>
      <React.Fragment>
        <ScrollableTabsButtonForce />
       
        <Section>
          <AboutMe />
        </Section>
        <Section bg>
          <ProjectCardList />
        </Section>
        <Section>
          <Experience />
        </Section>
        <Section bg>
          <Skill />
        </Section>
        <Section>
          <ContactForm />
        </Section>

      </React.Fragment>

     <ChatbotPortfolio/>

    </div>
  )
}

export default App
