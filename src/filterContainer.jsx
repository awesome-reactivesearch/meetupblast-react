var React = require('react');
var Tag = require('./tag.jsx');

var FilterContainer = React.createClass({
    componentWillMount: function() {
        this.fire_response();
    },
    fire_response: function() {
        var $this = this;
        streamingClient = REQUEST.GET_STREAMING_CLIENT();
        var stream_on = REQUEST.FIRE_FILTER();
        stream_on.on('data', function(res) {
            $this.props.on_get_data(res);
            $this.stream_start();
        }).on('error', function(err) {});
    },
    stream_start: function() {
        var $this = this;
        streamingClient = REQUEST.GET_STREAMING_CLIENT();
        var stream_on = REQUEST.STREAM_START();
        stream_on.on('data', function(res) {
            $this.props.on_get_data(res, true);
        }).on('error', function(err) {});
    },
    render: function() {
        return (
                <div className="meetup-filter-container">
                    <Tag key="0" type="city" fire_response={this.fire_response}></Tag>
                    <Tag key="1" type="topic" fire_response={this.fire_response}></Tag>
                </div>
        )
    }
});


module.exports = FilterContainer;
