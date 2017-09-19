var React = require('react');

var UserImg = React.createClass({
    getInitialState: function() {
        return {
            src: this.props.src
        };
    },
    render: function() {
        return <img 
            onError={() => this.setState({src: 'http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg'})}
            src={this.state.src}
        />
    }
});
module.exports = UserImg;
