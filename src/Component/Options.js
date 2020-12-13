import React from 'react'

import '../index.css'
import '../style/Options.css'

import WoodImg from '../images/wood.jpg'
// import Dog from '../images/dog.png'
// import Neighbour from '../images/neighbour.png'
import Cookie from '../images/cookie.png'

class Options extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            buy: true,  // true = acheter /\ false = vendre
            buyBy: 1    // acheter ou vendre par X
        }

        this.chooseBuy = this.chooseBuy.bind(this)
        this.chooseSell = this.chooseSell.bind(this)
        // this.chooseBuyBy = this.chooseBuyBy.bind(this)
    }

    /**
     * permet d'acheter des améliorations
     */
    chooseBuy() {
        if (this.state.buy === false) {
            this.setState({
                buy: true
            }, this.props.chooseAction('buy'))
        }
    }

    /**
     * permet de vendre des améliorations
     */
    chooseSell() {
        if (this.state.buy === true) {
            this.setState({
                buy: false
            }, this.props.chooseAction('sell'))
        }
    }

    /**
     * choisi par combien on achète des améliorations
     * @param {*} e 
     */
    // chooseBuyBy(e) {
    //     if (e.target.textContent !== this.state.buyBy) {
    //         this.setState({
    //             buyBy: e.target.textContent
    //         })
    //     }
    // }

    render() {
        // console.log("buyby", this.props.buyBy)
        return (
            <div className="Container-options disable--select">
                <div className="Options__store">
                    <h2 className="Options__store--title">Store</h2>

                    <img className="Wood-img" src={WoodImg} alt="wood" />
                    <img className="Wood-img" src={WoodImg} alt="wood" />
                </div>

                <div className="Options__chooseAction">
                    <div className="Center--chooseAction">
                        <p className={this.state.buy === true ? "chooseAction--isActive" : null} onClick={this.chooseBuy}>Buy</p>
                        <p className={this.state.buy === false ? "chooseAction--isActive" : null} onClick={this.chooseSell}>Sell</p>
                    </div>
                    <div className="Center--chooseAction">
                        <p className={this.props.buyBy == 1 ? "chooseAction--isActive" : null} onClick={this.props.chooseBuyBy}>1</p>
                    </div>
                    <div className="Center--chooseAction">
                        <p className={this.props.buyBy == 10 ? "chooseAction--isActive" : null} onClick={this.props.chooseBuyBy}>10</p>
                    </div>
                    <div className="Center--chooseAction">
                        <p className={this.props.buyBy == 100 ? "chooseAction--isActive" : null} onClick={this.props.chooseBuyBy}>100</p>
                    </div>
                </div>

                <div className="Options__improve">
                    {this.props.improves.map((improve, index) => (
                        <div className="Improve__clicker" key={index} onClick={() => this.props.clickImprove(index, this.state.buy)}>
                            <img src={improve.image} />
                            <div className="Improve__info">
                                <p  className="Improve__clicker--name">{improve.name}</p>
                                <p className="Improve__clicker--price">
                                    <img className="Improve__clicker--priceImg" src={Cookie} alt="cookie" />
                                    <span className={(this.props.counterCookie < improve.price && this.state.buy || improve.number < Number(this.props.buyBy) && !this.state.buy) ? 'Improve--danger' : 'Improve--success'}> {improve.price}</span>
                                </p>
                            </div>
                            <p  className="Improve__clicker--number">{improve.number}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Options