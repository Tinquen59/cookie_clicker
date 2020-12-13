import React from 'react'

import Cookie from '../images/cookie.png'

import '../index.css'
import '../style/SuperCookie.css'

class SuperCookie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            whenSuperCookieIsDiplay: 60000, //   durée (en ms) à attendre pour le prochain affichage
            duringDisplySuperCookie: 5000,  // durée (en ms) où le cookie est afficher
            // isDisplay: false,       // ***********
            maxPositionTop: 95,
            maxPositionLeft: 96,
            positionTopSuperCookie: undefined,
            positionLeftSuperCookie: undefined,
            bonus: 5000
        }

        this.superCookie = undefined;

        this.displaySuperCookieCookie = this.displaySuperCookieCookie.bind(this)
        this.duringSuperCookie = this.duringSuperCookie.bind(this)
        this.getSuperCookie = this.getSuperCookie.bind(this)
    }

    componentDidMount() {
        this.displaySuperCookieCookie()
    }

    displaySuperCookieCookie() {
        this.superCookie = setTimeout(() => {
            this.setState({
                positionTopSuperCookie: Math.floor(Math.random() * Math.floor(this.state.maxPositionTop)),
                positionLeftSuperCookie: Math.floor(Math.random() * Math.floor(this.state.maxPositionLeft)),
                // isDisplay: true     // ***********
            })

            // console.log('fin du setTimeout')
            this.duringSuperCookie()
        }, this.state.whenSuperCookieIsDiplay)
    }

    duringSuperCookie() {
        this.superCookie = setTimeout(() => {
            this.setState({
                positionTopSuperCookie: undefined,
                positionLeftSuperCookie: undefined,
                // isDisplay: false    // ********
            })

            this.displaySuperCookieCookie()
        }, this.state.duringDisplySuperCookie)
    }

    getSuperCookie() {
        clearTimeout(this.superCookie)
        this.setState({
            positionTopSuperCookie: undefined,
            positionLeftSuperCookie: undefined,
            isDisplay: false
        }, () => {
            this.displaySuperCookieCookie()
            this.props.addBonusSuperCookie(this.state.bonus)
        })
    }

    render() {
        return (
            <div className="Container__superCookie disable--select">
                <div className="SuperCookie__header">
                    <h2 className="SuperCookie--title">
                        Attention des supers cookies peuvent apparaître dans l'espace
                    </h2>
                </div>

                {(this.state.positionTopSuperCookie && this.state.positionLeftSuperCookie) && (
                    <img
                    className="SuperCookie--img"
                    style={{
                        top: this.state.positionTopSuperCookie + '%',
                        left: this.state.positionLeftSuperCookie + '%'
                    }}
                    src={Cookie}
                    alt="Super cookie"
                    onClick={this.getSuperCookie}
                />
                )}
            </div>
        )
    }
}

export default SuperCookie