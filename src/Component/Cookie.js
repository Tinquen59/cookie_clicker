import React from 'react'

import '../index.css'
import '../style/Cookie.css'

import cookieImg from '../images/cookie.png'

import ModalChangeName from './ModalChangeName'

class Cookie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pseudo: "Super Cookie",
            displayModal: false
        }


        this.changePseudo = this.changePseudo.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    /* MODAL PSEUDO */
    changePseudo(e, pseudoChange) {
        e.preventDefault()

        this.setState({
            pseudo: pseudoChange.trim()
        }, this.closeModal)
    }

    closeModal() {
        this.setState({
            displayModal: false
        })
    }
    /*  */

    

    render() {
        return (
            <div className="container-cookie">

                {/* affiche une modal */}
                {this.state.displayModal && (
                    <ModalChangeName 
                        pseudo={this.state.pseudo} 
                        closeModal={this.closeModal}
                        changePseudo={this.changePseudo}
                    />
                )}
                {/* */}

                <div className="cookie__pseudo disable--select">
                    <h2 
                        className="cookie__pseudo--title"
                        onClick={() => {
                            this.setState({
                                displayModal: true
                            })
                        }}
                    >
                        {this.state.pseudo}
                    </h2>
                </div>
    
                <div className="cookie__info disable--select">
                    {this.props.counterCookie === 0 ? (
                        <p className="cookie__info--counter">{this.props.counterCookie} cookie</p>
                    ) : (
                    <p className="cookie__info--counter">{this.props.counterCookie} cookies</p>
                    ) }
                    <p>per second : {this.props.perSecond}</p>
                </div>

                <div className="cookie__jeux ">
                    <div className="cookie__clicker">
                        <img className="cookie__clicker--img" src={cookieImg} alt="un cookie" onClick={this.props.incrementCookie} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Cookie