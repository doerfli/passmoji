class MojiGenerator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        length: 13,
        passmoji: ""
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
        that.setPassmoji(json.passmoji);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  setPassmoji = (passmoji) => {
    console.log(passmoji);
    this.setState({passmoji: passmoji});
  }

  render() {
    let passmoji;

    if (this.state.passmoji.length > 0) {
      passmoji = <div>
        <div className="content has-text-centered is-large">
          <div className="box">
            <span id="passmoji" className="emoji">{this.state.passmoji}</span>
          </div>
          <button className="clipboard-btn button is-primary" data-clipboard-action="copy" data-clipboard-target="#passmoji">
            <span className="icon">📋</span>&nbsp;&nbsp;&nbsp;Copy passmoji to clipboard
          </button>
        </div>
        <div className="content has-text-centered is-small">
          <div className="columns">
            <div className="column is-one-third">&nbsp;</div>
            <div className="column">
              <div className="notification is-warning">
                A word of <b>warning</b>: not all services support the use of emojis (or unicode characters in general)
                as passwords. Please use the passmoji with caution.
              </div>
            </div>
            <div className="column is-one-third">&nbsp;</div>
          </div>
        </div>
      </div>;
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
