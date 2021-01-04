import * as React from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import { Container } from 'reactstrap';
import NavMenu from './components/NavMenu';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Post from './components/Post';
import * as PostStore from './store/Post';
import './custom.css'
import MakePost from './components/MakePost';
import { connect } from 'react-redux';
import { ApplicationState } from './store';

export type SearchProps =
    PostStore.PostState &
    typeof PostStore.actionCreators;

class App extends React.PureComponent<SearchProps>  {

    public render() {
        return (
            <div onClick={() => this.props.resetSearchPreview()}>
                <NavMenu/>
                <Container>
                    <Route exact path='/' component={Home} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/post/:postId' component={Post} />
                    <Route path='/make-post' component={MakePost} />
                </Container>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(App as any)

