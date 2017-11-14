import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from 'containers'
import Home from 'containers/Home'

// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home} />
                </Route>
            </Router>
        )
    }
}

export default RouterMap