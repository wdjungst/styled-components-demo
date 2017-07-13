import React from 'react';
import { 
  Header,
  Button,
  Segment,
  Card, 
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: linear-gradient(to bottom, aliceblue, black);
`

const Transparent = styled.div`
  background: transparent !important;
`

const fontSize = (size) => {
  switch(size) {
    case 'large':
      return '4rem';
    case 'small':
      return '1rem';
    default:
      return '2rem';
  }
}

const HeaderText = styled.h1`
  color: white !important;
  text-align: center;
  font-size: ${ props =>fontSize(props.fSize)} !important;
`


const App = () => (
  <AppContainer>
    <Header 
      fSize="large"
      as={ (props) => <HeaderText {...props} />} 
    >
      My Portfolio
    </Header>

    <Segment as={Transparent}>
      <Header as={HeaderText} >My Projects</Header>
    </Segment>

    <Segment as={Transparent}>
      <Header 
        fSize="small" 
        as={(props) => <HeaderText {...props} />} 
      >
        Contact
      </Header>
    </Segment>

  </AppContainer>
)

export default App;
