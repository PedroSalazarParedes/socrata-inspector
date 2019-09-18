import React, {Component} from "react";
import navio from "navio";
import "./navegante.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      inputValue: "https://www.datos.gov.co/resource/nsxu-h2dh.json"
    }
  }

  async loadDataNicely(url) {
    let loaded = false;
    let daticos = [];
    while(!loaded) {
      let output = await fetch(`${url}?$limit=10000&$offset=${daticos.length}`).then(res => res.json());
      if(output.length !== 0) {
        daticos = daticos.concat(output);
      } else {
        loaded = true;
      }
    }
    return daticos;
  }

  componentDidMount() {
   this.navigateWithPages();
  }

  componentDidUpdate() {
    this.navigateWithPages();
  }

  navigate() {
    this.nv = new navio(this.Navegante, 600);
    fetch(this.state.inputValue)
    .then(data => data.json())
    .then(datos => this.nv.data(datos))
    .then(() => this.nv.addAllAttribs())
    .catch(() => console.log("Fallamos amigos"));
  }

  async navigateWithPages() {
    this.nv = new navio(this.Navegante, 600);
    this.loadDataNicely(this.state.inputValue)
    .then(datos => this.nv.data(datos))
    .then(() => {
      this.nv.addAllAttribs();
    })
    .catch(err => console.log(err,"Fallamos amigos"));
  }

  feelingLucky() {
    const item =  Math.floor(Math.random() * (10));

    const apis = ["https://www.datos.gov.co/resource/vwwf-4ftk.json",
     "https://www.datos.gov.co/resource/54ah-2npf.json",
    "https://www.datos.gov.co/resource/6du3-6rbr.json",
    "https://www.datos.gov.co/resource/7pcy-5vx9.json",
    "https://www.datos.gov.co/resource/fcsx-656w.json",
    "https://www.datos.gov.co/resource/m6r5-5g2i.json",
    "https://www.datos.gov.co/resource/nsxu-h2dh.json",
    "https://www.datos.gov.co/resource/kcdt-jbvj.json",
    "https://www.datos.gov.co/resource/sdmr-tfmf.json",
    "https://www.datos.gov.co/resource/rvhf-aw6a.json"
  ];
  const api = apis[item];
    this.APIentrada.value=api;
    this.setState({
      inputValue: api
    })
  }

  onLoad() {
    this.setState({
      inputValue: this.APIentrada.value
    })
  }

  render() {
    return (
    <div className="App">
      <div className="input-group">
        <input type="text" className="form-control" defaultValue={this.state.inputValue} ref={APIentrada => this.APIentrada = APIentrada}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={this.onLoad.bind(this)}>Load dataset</button>
          <button className="btn btn-outline-secondary" type="button" onClick={this.feelingLucky.bind(this)}>
            <span role="img" aria-label="emojis">
              🤩🚀🦕
            </span>
          </button>
        </div>
      </div>
      <div className="navegante" ref={Navegante => this.Navegante = Navegante}></div>
    </div>);
  }
}

export default App;