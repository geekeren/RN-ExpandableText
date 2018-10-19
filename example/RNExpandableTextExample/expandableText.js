import React from 'react'
import PropTypes from 'prop-types'

import { Animated, Easing, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class ExpandableText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      numberOfLines: null,
      showExpandView: false,
      containerHeight: 0,
      contentHeight: 'auto',
      expandText: 'Expand',
    }
    this.numberOfLines = props.numberOfLines
    this.needExpand = true
    this.measureFlag = true
  }


  onTextLayout(event) {
    if (this.measureFlag) {
      if (this.state.expanded) {
        this.maxHeight = event.nativeEvent.layout.height
        this.setState({ expanded: false, numberOfLines: this.numberOfLines })
      } else {
        this.mixHeight = event.nativeEvent.layout.height
        if (this.mixHeight === this.maxHeight) {
          this.needExpand = false
        } else {
          this.needExpand = true
        }
        this.measureFlag = false
      }
      this.setState({
        contentHeight: new Animated.Value(event.nativeEvent.layout.height)
      })
    }
    this.setState({ showExpandView: true, containerHeight: 'auto' })
  }

  onPressExpand() {
    if (!this.state.expanded) {
      this.setState({ numberOfLines: null, expandText: 'Collapse', expanded: true })
      Animated.timing(this.state.contentHeight, {
          toValue: this.maxHeight,
          duration: this.props.duration,
        }
      ).start(() => {
        if (this.props.onExpand) {
          this.props.onExpand()
        }
      });
    } else {
      this.setState({ expandText: 'Expand', expanded: false })
      Animated.timing(this.state.contentHeight, {
          toValue: this.mixHeight,
          duration: this.props.duration,
        }
      ).start(() => {
        this.setState({
          numberOfLines: this.numberOfLines
        })
        if (this.props.onCollapse) {
          this.props.onCollapse()
        }
      });
    }
  }

  render() {
    const { numberOfLines, expandTextStyle, ...rest } = this.props
    let renderExpandView = <Text style={[this.props.style, styles.expandText, expandTextStyle]}>
      {this.state.expandText}
    </Text>
    const {expandView, unexpandView} = this.props
    if (!this.state.expanded && expandView) {
      renderExpandView = expandView()
    }
    if (this.state.expanded && unexpandView) {
      renderExpandView = unexpandView()
    }
    renderExpandView = this.state.showExpandView ? renderExpandView : null
    return (
      <View style={{height: this.state.containerHeight, overflow: 'scroll'}}>
        <Animated.View
          style={{height: this.state.contentHeight, overflow: 'hidden'}}
        >
          <Text
            numberOfLines={this.state.numberOfLines}
            onLayout={this.onTextLayout.bind(this)}
            {...rest}
          >
            {this.props.children}
          </Text>
        </Animated.View>
        <TouchableOpacity onPress={this.onPressExpand.bind(this)}>
          {renderExpandView}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  expandText: {
    color: 'gray',
    marginTop: 0,
    textAlign: 'center',
  },
})

ExpandableText.propTypes = {
  children: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number,
  expandView: PropTypes.func,
  unexpandView: PropTypes.func,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func,
  duration: PropTypes.number,
}

ExpandableText.defaultProps = {
  numberOfLines: 5,
  duration: 100,
}
