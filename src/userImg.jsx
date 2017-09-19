var React = require('react');

var UserImg = React.createClass({
    getInitialState: function() {
        return {
            src: this.props.src
        };
    },
    resetImage: function() {
        this.setState({
            src: 'http://www.avidog.com/wp-content/uploads/2015/01/BellaHead082712_11-50x65.jpg'
        });
    },
    render: function() {
        return <img 
            onError={this.resetImage}
            src={this.state.src}
        />
    }
});
module.exports = UserImg;
