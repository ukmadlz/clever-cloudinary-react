'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

class CleverCloudinaryReact extends React.Component {

    constructor(props) {
        super(props);
        // states
        this.state= {
          progressive: true
        }
        // defaults
        this.progressiveThreshold = 200;
    }

    static get defaultProps() {
        return {
          cloudName: 'demo',
          publicId: '',
          progressive: false,
          privateCdn: '',
          secureDistribution: '',
          cname: '',
          cdnSubdomain: ''
        }
    }

    componentWillMount() {
      this.setState({
        progressive: (this.props.progressive || (this.maxWidth() > this.progressiveThreshold))
      });
    }

    componentDidUpdate(prevProps, prevState) {
    }

    maxWidth() {
      var widths = React.Children.map(
        this.props.children,
        function(child) {
          return (parseInt(child.props.width)) ? parseInt(child.props.width) : 0;
        }
      );
      return widths[widths.length-1];
    }

    render() {

        let progressiveTag = (this.state.progressive) ? <Transformation flags="progressive" /> : <Transformation flags="any_format" />;

        return(
            <CloudinaryContext
              cloudName={ this.props.cloudName }
              privateCdn={ this.props.privateCdn }
              secureDistribution={ this.props.secureDistribution }
              cname={ this.props.cname }
              cdnSubdomain={ this.props.cdnSubdomain } >
              <Image publicId={ this.props.publicId }>
                { progressiveTag }
                { this.props.children }
              </Image>
            </CloudinaryContext>
        )
    }

}

export { CleverCloudinaryReact, Transformation };
