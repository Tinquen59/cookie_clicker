import React from 'react'

import logo from './logo.svg';
import Dog from './images/dog.png';
import Neighbour from './images/neighbour.png';

import './App.css';

import Cookie from './Component/Cookie';
import Options from './Component/Options'
import SuperCookie from './Component/SuperCookie';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      improves: [
        {
          image: Neighbour,
          name: "Voisin",
          priceDefault: 10,
          price: 10,   // le prix change en fonction de la quantité choisi
          number: 0,
          addPersecondDefault: 2,
          addPersecond: 2
        },
        {
          image: Dog,
          name: "Chien",
          priceDefault: 100,
          price: 100,   // le prix change en fonction de la quantité choisi
          number: 0,
          addPersecondDefault: 5,
          addPersecond: 5
        }
      ],
      buyBy: 1,
      counterCookie: 0,
      counterClick: 0,
      incrementValue: 1,
      perSecond: 0,
      // isPersecond: false
    }
  
    this.isPersecond = false
    this.incrementCookieEverySecond = undefined

    this.incrementCookie = this.incrementCookie.bind(this)
    this.archievement = this.archievement.bind(this)

    this.addBonusSuperCookie = this.addBonusSuperCookie.bind(this)

    this.chooseBuyBy = this.chooseBuyBy.bind(this)
    // this.calcPriceImprove = this.calcPriceImprove.bind(this)
    this.clickImprove = this.clickImprove.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.perSecond > 0 && this.isPersecond === false) {
      this.isPersecond = true

      this.incrementCookieEverySecond = setInterval(() => {
        this.setState((state) => ({
          counterCookie: state.counterCookie + state.perSecond
        }))
      }, 1000)
    }
  }


  // Cookie
  /**
   * permet d'incrémenter la valeur du cookie lors d'un clic
   */
  incrementCookie() {
    this.setState({
      counterCookie: this.state.counterCookie + this.state.incrementValue,
      counterClick: this.state.counterClick + 1
    }, this.archievement)
  }

  /**
   * débloque des succès en fonction du nombre de clique et permet d'avoir plus de cookie par seconde
   */
  archievement() {
    const firstSucces = 100;

    if (this.state.counterClick == firstSucces) {
      alert(`bravo vous avez cliqué ${firstSucces} fois`);
      this.setState(state => ({
          perSecond: state.perSecond + 1
      }))
    }
  }


  // SuperCookie
  addBonusSuperCookie(bonus) {
    this.setState({
      counterCookie: this.state.counterCookie + bonus
    })
  }


  // Options
  chooseAction(action) {
    console.log("action", action)
    // console.log(this.state.improves)

    // for (const improve of this.state.improves) {
    //   let price = improve.price

    //   console.log("price", price)
    // }
  }

  /**
     * choisi par combien on achète des améliorations
     * @param {*} e 
     */
    chooseBuyBy(e) {
      if (e.target.textContent != this.state.buyBy) {
        const tamponImproves = this.state.improves;

        if (e.target.textContent > 1) {
          for (const improve of tamponImproves) {
            console.log(improve.priceDefault)
            improve.price = this.calcPriceImprove(e, improve.priceDefault)
            improve.addPersecond = improve.addPersecondDefault * e.target.textContent

          }
        } else {
          for (const improve of tamponImproves) {
            improve.price = improve.priceDefault
            improve.addPersecond = improve.addPersecondDefault
          }
        }

        this.setState({
            buyBy: e.target.textContent,
            improves: tamponImproves
        })
      }
  }

  calcPriceImprove(e, price) {
    let tamponPrice = price
    for (let i = 1; i <= Number(e.target.textContent); i++) {
      tamponPrice *= 2
    }

    return tamponPrice
  }

  /**
   * achète une amélioration si action = true /\ vend une amélioration si action = false
   */
  clickImprove(index, action) {
    console.log(action)
    let tamponImproves = this.state.improves

    if (action) {
      if(this.state.counterCookie >= tamponImproves[index].price) {
        const newCounterCookie = this.state.counterCookie -= tamponImproves[index].price
        tamponImproves[index].number += Number(this.state.buyBy)
        tamponImproves[index].priceDefault *= 2
        tamponImproves[index].price *= 2

        this.setState({
            improves: tamponImproves,
            counterCookie: newCounterCookie,
            perSecond: this.state.perSecond += this.state.improves[index].addPersecond
        })
      }
    } else {
      if (tamponImproves[index].number >= this.state.buyBy) {
        tamponImproves[index].number -= Number(this.state.buyBy)
        tamponImproves[index].price /= 2

        console.log("cookie", this.state.counterCookie)
        console.log("prix", tamponImproves[index].price)
        
        this.setState({
          improves: tamponImproves,
          counterCookie: this.state.counterCookie + tamponImproves[index].price,
          perSecond: this.state.perSecond - tamponImproves[index].addPersecond
        })
      }
    }
    
  }


  render() {
    // console.log( this.state.improves.map(improve => improve.price * this.state.buyBy) )
    return (
      <div className="App">  
        <div className="App-separator">
          <Cookie 
            incrementCookie={this.incrementCookie} 
            counterCookie={this.state.counterCookie}
            perSecond={this.state.perSecond}
          />
        </div>

        <div className="App-separator">
          <SuperCookie 
            incrementCookie={this.incrementCookie}
            addBonusSuperCookie={this.addBonusSuperCookie}
          />
        </div>

        <div className="App-separator">
          <Options 
            counterCookie={this.state.counterCookie}
            improves={this.state.improves}
            buyBy={this.state.buyBy}
            chooseAction={this.chooseAction}
            chooseBuyBy={this.chooseBuyBy}
            clickImprove={this.clickImprove}
          />
        </div>
      </div>
    );
  }
}

export default App;
