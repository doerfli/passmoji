class MojiGenerator extends React.Component {

  constructor(props) {
    super(props);
    var cats = [];
    for(var c in this.props.categories) {
      cats.push(true);
    }
    this.state = {
        categories_selected: cats,
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
    var cq = this.getCategoryQuery();
    var that = this;
    fetch('/emoji.json?length=' + this.state.length + cq)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        // console.log('parsed json', json);
        that.setPassmoji(json.chars, json.imgs);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  setPassmoji = (passmoji, passmoji_imgs) => {
    console.log(passmoji);
    this.setState({passmoji: passmoji, passmoji_imgs: passmoji_imgs});
  }

  selectCategory = (event) => {
    var source = event.target;
    var idx = source.dataset.i;
    var u = this.state.categories_selected;
    u[idx] = !u[idx];
    this.setState({categories_selected: u});
  }

  getCategoryQuery = () => {
    var query = "";
    for ( var i = 0; i < this.state.categories_selected.length; i++) {
      if ( ! this.state.categories_selected[i]) continue;
      query += "&categories[]=" + this.props.categories[i]["value"];
    }
    return encodeURI(query);
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
            Generate a new passmoji with length&nbsp;
            <input className="input inlineinput" value={this.state.length} onChange={this.changeLength} name="length" size="3" />
            {this.props.categories.map(function(cat, i) {
                return (
                  <div key={i} className="level nomarginbottom">
                    <div className="control level-item has-text-centered">
                      <label className="checkbox">
                        <input type="checkbox" data-i={i} checked={this.state.categories_selected[i]} onChange={this.selectCategory} />&nbsp;include {cat.name}
                      </label>
                    </div>
                  </div>
                );
            }.bind(this))}
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
