'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


class CleverCloudinaryReact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // empty state, we might add something in future
        };
    }

    static get defaultProps() {
        return {
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        return(
            <div className={ this.props.className }>
                { this.props.children }
            </div>
        )
    }

}

export default CleverCloudinaryReact;
