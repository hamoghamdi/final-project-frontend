import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

class AlertDismissible extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true,
      };
    }
  
    render() {
      const handleDismiss = () => this.setState({ show: false });
      if (this.state.show) {
        return (
            <Alert key={this.props.index} dismissible variant={this.props.variant} onClose={handleDismiss}>
                <Alert.Heading>
                    {this.props.message}
                </Alert.Heading>
            </Alert>
        )
      } else {
        return <React.Fragment/>
      }
    }
  }
  
export default AlertDismissible
