'use strict';

import React from 'react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

class CleverCloudinaryReact extends React.Component {

    constructor(props) {
        super(props);
        // states
        this.state= {
          progressive: true,
          width: false,
          quality: false
        }
        // defaults
        this.progressiveThreshold = 200;
        this.defaultQuality = 'auto';
        this.unitConvert = {
          em: 16,
          rem: 16,
          px: 1
        };
    }

    static get defaultProps() {
        return {
          cloudName: 'demo',
          publicId: '',
          progressive: false,
          privateCdn: '',
          secureDistribution: '',
          cname: '',
          cdnSubdomain: '',
          width: '',
        }
    }

    componentWillMount() {
      const maxWidth = this.maxWidth();

      // Should the image be progressive
      this.setState({
        progressive: (this.props.progressive || (maxWidth > this.progressiveThreshold))
      });
      // Set width if set as a prop
      if(this.props.width) {
        // Check if it has _any_ extra information
        let widthMeasure = this.props.width.match(/([0-9]+)/g);
        let widthSuffix = this.props.width.match(/([^0-9]+)/g);
        if(widthSuffix != '%') {
          for(let key in this.unitConvert) {
            if (key == widthSuffix) {
              widthMeasure = parseInt(widthMeasure) * parseInt(this.unitConvert[key]);
            }
          }
          if ((widthMeasure < maxWidth) || maxWidth == 0) {
            this.setState({
              width: widthMeasure
            });
          }
        }
      }
      // Set default quality
      const quality = this.qualityAssigned();
      if (quality) {
        this.setState({
          quality: this.defaultQuality
        })
      }
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
      return (widths) ? widths[widths.length-1] : 0;
    }

    qualityAssigned() {
      var quality = React.Children.map(
        this.props.children,
        function(child) {
          return (child.props.quality) ? 1 : 0;
        }
      );
      return (quality) ? (quality.indexOf(1)>=0) : false;
    }

    render() {

        let progressiveTag = (this.state.progressive) ? <Transformation flags="progressive" /> : <Transformation/>;
        let children = (this.props.children) ? this.props.children : <Transformation/>
        let widthTag = (this.state.width) ? <Transformation width={ this.state.width } crop="scale"/> : <Transformation/>
        let qualityTag = (this.state.quality) ? <Transformation quality={ this.state.quality }/> : <Transformation/>
        return(
            <CloudinaryContext
              cloudName={ this.props.cloudName }
              privateCdn={ this.props.privateCdn }
              secureDistribution={ this.props.secureDistribution }
              cname={ this.props.cname }
              cdnSubdomain={ this.props.cdnSubdomain } >
              <Image publicId={ this.props.publicId } width={ this.props.width }>
                <Transformation dpr="auto" />
                { children }
                { progressiveTag }
                { widthTag }
                { qualityTag }
              </Image>
            </CloudinaryContext>
        )
    }

}

export { CleverCloudinaryReact, Transformation };
