import React, {Component} from "react";
import navio from "navio";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "https://www.datos.gov.co/resource/r4q3-ept4.json"
    }
  }



  componentDidMount() {
   this.navigate();
  }

  componentDidUpdate() {
    this.navigate();
  }

  navigate() {
    this.nv = new navio(this.Navegante, 600);
    fetch(this.state.inputValue)
    .then(data => data.json())
    .then(datos => this.nv.data(datos))
    .then(() => this.nv.addAllAttribs());
  }

  

  renderTweets() {
    //return this.state.tweets.map(t => <Tweet key={t.id} tweet={t}></Tweet>);
  }

  onChange() {
    this.setState({
      inputValue: this.APIentrada.value
    })
    console.log(this.APIentrada.value)
  }

  render() {
    return (
    <div className="App">
     <input type="text" defaultValue={this.state.inputValue} ref={APIentrada => this.APIentrada = APIentrada} onInput = {this.onChange.bind(this)}/>
     <div ref={Navegante => this.Navegante = Navegante}></div>
    </div>);
  }
}

export default App;