import * as React from 'react';
import { Route } from 'react-router';
import Home from './containers/Home';
import { Container } from 'reactstrap';
import NavMenu from './components/NavMenu';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import PostContainer from './containers/PostContainer';
import { loginActionCreators } from './store/actions/loginActions';
import { searchActionCreators } from './store/actions/searchActions';
import './css/custom.css'
import MakePost from './containers/MakePost';
import { connect } from 'react-redux';
import { ApplicationState } from './store/index';

export type SearchProps =
    typeof searchActionCreators &
    typeof loginActionCreators;

class App extends React.PureComponent<SearchProps>  {
    componentDidMount() {
        // check if user is logged in
        this.props.authenicate();
    }

    public render() {
        return (
            <div>
                <NavMenu/>
                {/* Click anywhere outside NavMenu will reset the suggested search results */}
                <div onClick={() => this.props.hidePreview()}>
                    <Container >
                        <Route exact path='/' component={Home} />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/post/:postId' component={PostContainer} />
                        <Route path='/make-post' component={MakePost} />
                    </Container>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.post,
    {
        ...searchActionCreators,
        ...loginActionCreators
    }
)(App as any)

