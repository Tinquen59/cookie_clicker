import React from 'react'

import '../style/Modal.css'

class ModalChangeName extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pseudoTampon: ""
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            pseudoTampon: this.props.pseudo
        })

        // this.state.pseudoTampon.select()
    }

    handleChange(e) {
        this.setState({
            pseudoTampon: e.target.value
        })
    }

    render() {
        return (
            <div className="Modal__changeName">
                <div className="ChangeName__content">
                    <div className="ChangeName__header">
                        <p>Donne un nom à ton cookie 😀</p>
                        <div>
                            <i className="fas fa-times"  onClick={this.props.closeModal}></i>
                        </div>
                    </div>
                    <div className="ChangeName__body">
                        <form onSubmit={this.props.changePseudo}>
                            <input type="text" value={this.state.pseudoTampon} onChange={this.handleChange} />
                            <div>
                                <button 
                                    className="Btn--form Send--pseudo"
                                    type="submit"
                                    onClick={(e) => this.props.changePseudo(e, this.state.pseudoTampon)}
                                >
                                    Confirmer
                                </button>
                                <button 
                                    className="Btn--form Cancel--modal"
                                    type="button"
                                    onClick={this.props.closeModal}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalChangeName