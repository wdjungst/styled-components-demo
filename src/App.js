import React from 'react';
import { 
  Header,
  Button,
  Segment,
  Icon,
  Grid,
  Card,
} from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { HeaderText } from './HeaderText';

const AppContainer = styled.div`
  background: linear-gradient(to bottom, aliceblue, black);
`

const Transparent = styled.div`
  background: transparent !important;
`

const StyledCard = styled(Card)`
  height: 200px;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const IssueCard = StyledCard.extend`
  border: solid 1px red !important;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`

const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg } !important;
  background-color: ${ props => props.theme.bg };
`

const SearchBox = styled.input`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`

class App extends React.Component {
  state = { repos: [], visible: [] }

  componentDidMount() {
    const url = 'https://api.github.com/users/wdjungst/repos?sort=created'
    axios.get(url)
      .then( res => this.setState({ repos: res.data, visible: res.data }) )
  }

  search = () => {
    let regex = new RegExp(this.searchTerm.value.toLowerCase());
    if ( this.searchTerm.value === '' )
      this.setState({ visible: this.state.repos });
    else {
      let visible = this.state.repos.filter( r => regex.test(r.full_name.toLowerCase()) )
      this.setState({ visible });
    }
  }

  render() {
    return (
      <AppContainer>
        <Header 
          fSize="large"
          as={ (props) => <HeaderText {...props} />} 
        >
          My Portfolio
        </Header>
    
        <Segment as={Transparent}>
          <Header as={HeaderText} >My Projects</Header>
          <label>Search</label>
          <SearchBox onChange={this.search} innerRef={ n => this.searchTerm = n } />
          <Grid>
            <Grid.Row>
              { this.state.visible.map( r => { 
                  const Component = r.open_issues > 0 ? IssueCard : StyledCard
                  return (
                    <Grid.Column key={r.id} width={4}>
                      <Component>
                        <Card.Content>
                          <Card.Header>
                            <Truncated>
                              { r.full_name }
                            </Truncated>
                          </Card.Header>
                          <Card.Meta>
                            { r.description }
                          </Card.Meta>
                          { r.stargazers_count > 0 &&
                              <Star>
                                <Icon name="star" />
                              </Star>
                          }
                        </Card.Content>
                        <Card.Content extra>
                          <ButtonLink 
                            href={r.html_url}
                            target="_blank"
                            rel="noopener norefferer"
                          >
                            View
                          </ButtonLink>
                        </Card.Content>
                      </Component>
                    </Grid.Column>
                   )
                 }
               )}
            </Grid.Row>
          </Grid>
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
  }
}

export default App;
