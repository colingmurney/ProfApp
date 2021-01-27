import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/navMenu.css';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { LoginState } from '../store/interfaces/ILogin';
import { loginActionCreators } from '../store/actions/loginActions';
import { searchActionCreators } from '../store/actions/searchActions';
import Search from './Search';

type NavMenuProps = LoginState &
    typeof loginActionCreators &
    typeof searchActionCreators

class NavMenu extends React.PureComponent<NavMenuProps, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    handleClick() {
        this.props.hidePreview();
    }
    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand onClick={() => this.handleClick()} tag={Link} to="/">ProfApp</NavbarBrand>
                        <Search/>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul onClick={() => this.handleClick()} className="navbar-nav flex-grow">
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
                                { this.props.isSignedIn && <button onClick={() => this.props.logout()} className="btn btn-danger">Logout</button> }
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
    {
        ...loginActionCreators,
        ...searchActionCreators
    }
)(NavMenu as any);