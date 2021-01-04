import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavMenu.css';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as LoginStore from '../store/Login';
import Search from './Search';

type NavMenuProps = LoginStore.LoginState &
    typeof LoginStore.actionCreators

class NavMenu extends React.PureComponent<NavMenuProps, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };
    
    componentDidMount() {
        // check if user is logged in. NavMenu component is in each Route component
        // therefore action will always be dispatched on page load
        this.props.authenicate();
    }

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">ProfApp</NavbarBrand>
                        {/* <form action="">
                            <input type="text"/>
                        </form> */}
                        <Search/>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/make-post">Make post</NavLink>
                                </NavItem>                                
                                { !this.props.isSignedIn && <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/signin">Login</NavLink>
                                </NavItem> 
                                }
                                { this.props.isSignedIn && <button onClick={() => this.props.logout()} className="btn btn-danger">Logout</button>}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(NavMenu as any);