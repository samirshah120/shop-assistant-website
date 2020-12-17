import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import SignOutButton from './SignOut';
import '../App.css';

const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.email)
    return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        // <nav className="navigation">
        //     <ul>
        //         <li>
        //             <NavLink exact to="/" activeClassName="active">
        //                 Landing
        //   </NavLink>
        //         </li>
        //         <li>
        //             <NavLink exact to="/home" activeClassName="active">
        //                 Home
        //   </NavLink>
        //         </li>
        //         <li>
        //             <NavLink exact to="/account" activeClassName="active">
        //                 Account
        //   </NavLink>
        //         </li>
        //         <li>
        //             <SignOutButton />
        //         </li>
        //     </ul>
        // </nav>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand to="/home" activeClassName="active">AmazonLite</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact to="/home" activeClassName="active" className="notactive">Home</NavLink>
                    <NavLink exact to="/account" activeClassName="active" className="notactive">Account</NavLink>
                    <NavLink exact to="/account" activeClassName="active" className="notactive">My Cart</NavLink>
                    {/* <NavLink exact to="/signup" activeClassName="active" className="notactive">Sign Up</NavLink>
                    <NavLink exact to="/signin" activeClassName="active" className="notactive">Sign In</NavLink> */}
                    <SignOutButton />
                    {/* <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Electronics</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Aparels</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Groceries</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Contact Us</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
                 <p>Welcome {currentUser.email}</p>

            </Navbar.Collapse>
        </Navbar>
    );
};

const NavigationNonAuth = () => {
    return (
        // <nav className="navigation">
        //     <ul>
        //         <li>
        //             <NavLink exact to="/" activeClassName="active">
        //                 Landing
        //   </NavLink>
        //         </li>
        //         <li>
        //             <NavLink exact to="/signup" activeClassName="active">
        //                 Sign-up
        //   </NavLink>
        //         </li>

        //         <li>
        //             <NavLink exact to="/signin" activeClassName="active">
        //                 Sign-In
        //   </NavLink>
        //         </li>
        //     </ul>
        // </nav>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand to="/" activeClassName="active">AmazonLite</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact to="/" activeClassName="active" className="notactive">Landing</NavLink>
                    <NavLink exact to="/signup" activeClassName="active" className="notactive">Sign Up</NavLink>
                    <NavLink exact to="/signin" activeClassName="active" className="notactive">Sign In</NavLink>
                    {/* <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Electronics</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Aparels</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Groceries</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Contact Us</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;