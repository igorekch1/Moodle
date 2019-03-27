import React, { Component } from 'react'
import { bubble as Menu } from 'react-burger-menu';

class BurgerMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="outer-container">
                {/* <header>I am a fixed header!</header> */}
                <Menu pageWrapId={ "page-wrap" } 
                      outerContainerId={ "outer-container" }
                      width = { '20%' }
                >
                    {this.props.menuItems.map(item => {
                        return <a id="home" className="menu-item" href="/">{item.name}</a>
                    })}
                </Menu>
                <main id="page-wrap">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default BurgerMenu;