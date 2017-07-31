class MojiGenerator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        length: 13,
        passmoji: "",
        passmoji_imgs: []
    };
  }

  changeLength = (event) => {
    var value = event.target.value;
    this.setState({length: value});
  }

  getPassmoji = () => {
    // console.log(1);
    var that = this;
    fetch('/emoji.json?length=' + this.state.length)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        // console.log('parsed json', json);
        that.setPassmoji(json.passmoji, json.passmoji_imgs);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  setPassmoji = (passmoji, passmoji_imgs) => {
    console.log(passmoji);
    this.setState({passmoji: passmoji, passmoji_imgs: passmoji_imgs});
  }

  render() {
    let passmoji;

    if (this.state.passmoji.length > 0) {
      passmoji = <Passmoji passmoji={this.state.passmoji} passmoji_imgs={this.state.passmoji_imgs}/>;
    }

    return (
      <div>
        <div className="content has-text-centered is-large">
          <div>
            Generate a new passmoji with length
            <input className="input inlineinput" value={this.state.length} onChange={this.changeLength} name="length" size="3" />
            &nbsp;
            <button className="button is-primary valigninherit" onClick={this.getPassmoji}>Go!</button>
          </div>
        </div>
        <div>
          {passmoji}
        </div>
      </div>
    );
  }
}
