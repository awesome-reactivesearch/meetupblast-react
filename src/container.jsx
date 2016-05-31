var React = require('react');
var FilterContainer = require('./filterContainer.jsx');
var User = require('./User.jsx');

var Container = React.createClass({
    getInitialState: function() {
        return {
            users: []
        };
    },
    componentDidMount: function() {
        var $this = this;
        this.make_responsive();
        $('.meetup-record-holder').on('scroll', function() {
            if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
                var stream_on = REQUEST.PAGINATION();
                stream_on.done(function(res) {
                    $this.on_get_data(res, true);
                }).fail('error', function(err) {});
            }
        });
    },
    make_responsive: function() {
        function size_set() {
            var window_height = $(window).height() - 15;
            $('.meetup-record-holder').css('height', window_height);
        };
        size_set();
        $(window).resize(function() {
            size_set();
        });
    },
    on_get_data: function(res, append) {
        var $this = this;
        //responseStream.stop();
        if (res.hasOwnProperty('hits')) {
            var record_array = res.hits.hits;
            if (append) {
                var arr = $this.state.users;
                var new_array = $.merge(arr, record_array);
                $this.setState({
                    users: new_array
                });
            } else {
                record_array = record_array.reverse();
                $this.setState({
                    users: record_array
                });
            }
        } else {
            var arr = $this.state.users;
            arr.unshift(res);
            $this.setState({
                users: arr
            });
        }
    },
    render: function() {
        var $this = this;
        return (
                <div className="row meetup-container">
                    <FilterContainer key='1' on_get_data={this.on_get_data}></FilterContainer>
                    <div className="meetup-record-holder" id="meetup-record-holder">
                        <div className="container full_row" id="record-container">
                            {this.state.users.map(function(single_user1, i){
                                var single_user = single_user1._source;
                                return (
                                    <User
                                        key={i}
                                        index={i}
                                        name={single_user.member.member_name}
                                        img={single_user.member.photo}
                                        event_name={single_user.event.event_name}
                                        group_city={single_user.group.group_city}
                                        group_topics={single_user.group.group_topics}
                                        event_url={single_user.event.event_url}
                                     ></User>
                                );
                            })}
                        </div>        
                    </div>
                </div>
        );
    }
});

module.exports = Container;
