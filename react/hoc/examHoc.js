(WrappedComponent) => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
      };
    }
    componentWillMount() {
      let username = localStorage.getItem('username');
      this.setState({
        username: username,
      });
    }
    render() {
      return <WrappedComponent username={this.state.username} />;
    }
  }
  return NewComponent;
};

//使用
class Welcome extends Component {
  render() {
    return <div>welcome{this.props.username}</div>;
  }
}

Welcome = WrappedComponent(Welcome);

export default Welcome;
