class Passmoji extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(1);
    let that = this;
    var clipboard = new Clipboard('.clipboard-btn', {
      text: function (trigger) {
        return that.props.passmoji;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="content has-text-centered is-large">
          <div className="box">
            {this.props.passmoji_imgs.map(function(img, i) {
                return (<img key={i} src={img} className="passmoji_img"/>);
            }.bind(this))}
          </div>
          <span id="passmoji" className="is-hidden">{this.props.passmoji}</span>
          <button className="clipboard-btn button is-primary">
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
      </div>
    )
  }

}
