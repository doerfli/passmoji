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
    // console.log(passmoji);
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

  isAllCategoriesSelected = () => {
    var r = true;
    for ( var s in this.state.categories_selected) {
      r &= this.state.categories_selected[s];
    }
    return r;
  }

  selectAllCategories = () => {
    var toSet = ! this.isAllCategoriesSelected();
    var u = this.state.categories_selected;
    for ( var s in u) {
      u[s] = toSet;
    }
    this.setState({categories_selected: u});
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
            <div className="columns">
              <div className="column is-2 is-offset-4 is-size-6">
                and including categories
              </div>
              <div className="column is-3">
                <div className="control is-left">
                  <label className="checkbox">
                    <input type="checkbox" checked={this.isAllCategoriesSelected()} onChange={this.selectAllCategories} />&nbsp;<b>all</b>
                  </label>
                </div>
                {this.props.categories.map(function(cat, i) {
                    return (
                      <div key={i} className="control is-left level nomarginbottom">
                        <span className="level-left">
                          <span className="level-item is-narrow">
                            <label className="checkbox">
                              <input type="checkbox" data-i={i} checked={this.state.categories_selected[i]} onChange={this.selectCategory} />
                              &nbsp;{cat.name}&nbsp;

                            </label>
                          </span>
                          <span className="level-item is-narrow nomarginright">
                            (
                          </span>
                            {cat.sample.map(function(url, i) {
                              return (<img src={url} className="level-item image is-16x16 is-narrow moji_sample"/>);
                            }.bind(this))}&hellip;
                          <span className="level-item is-narrow">
                            )
                          </span>
                        </span>
                      </div>
                    );
                }.bind(this))}
              </div>
            </div>
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
