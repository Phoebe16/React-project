import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <div>hhhhhhhhhhhhhhhhhhhhhh</div>
            </div>
        )
    }
}

export default Home