import React from 'react'
import PropTypes from 'prop-types'

import { Animated, Platform, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const IS_IOS = (Platform.OS === 'ios');

export default class ExpandableText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      numberOfLines: null,
      maxHeight: null,
      showExpandView: false,
      contentHeight: null,
      expandText: 'Expand',
      resizing: false,
      viewOverflow: 'scroll',
    }
    this.measureFlag = true
    this.needExpand = false

  }


  onTextLayout(event) {
    if (this.measureFlag) {
      if (this.state.expanded) {
        this.maxHeight = event.nativeEvent.layout.height
        this.setState({ expanded: false, numberOfLines: this.props.numberOfLines, maxHeight: this.props.maxHeight})
      } else {
        this.mixHeight = event.nativeEvent.layout.height
        this.needExpand = this.mixHeight !== this.maxHeight || this.maxHeight > this.props.maxHeight
        this.measureFlag = false
        this.setState({
          contentHeight: new Animated.Value(event.nativeEvent.layout.height)
        })
      }
    }
    this.setState({ showExpandView: true})
  }

  onPressExpand() {
    if (!this.state.expanded) {
      this.setState({
        numberOfLines: null,
        maxHeight: null,
        expandText: 'Collapse',
        expanded: true,
        resizing: true,
        viewOverflow: IS_IOS ? 'scroll' : 'hidden'
      })
      Animated.timing(this.state.contentHeight, {
          toValue: this.maxHeight,
          duration: this.props.animationDuration,
        }
      ).start(() => {
        this.setState({ resizing: false, viewOverflow: 'hidden' })
        if (this.props.onExpand) {
          this.props.onExpand()
        }
      });
    } else {
      this.setState({
        expandText: 'Expand',
        expanded: false, resizing: true,
        viewOverflow: IS_IOS ? 'scroll' : 'hidden'
      })
      Animated.timing(this.state.contentHeight, {
          toValue: this.mixHeight,
          duration: this.props.animationDuration,
        }
      ).start(() => {
        this.setState({
          numberOfLines: this.props.numberOfLines,
          maxHeight: this.props.maxHeight,
          resizing: false,
          viewOverflow: 'hidden'
        })
        if (this.props.onCollapse) {
          this.props.onCollapse()
        }
      });
    }
  }

  render() {
    const { numberOfLines, maxHeight, ...rest } = this.props
    let renderExpandView = null
    const {expandView, collapseView} = this.props
    if (!this.state.expanded && expandView) {
      renderExpandView = expandView()
    }
    if (this.state.expanded && collapseView) {
      renderExpandView = collapseView()
    }
    if (!this.needExpand) renderExpandView  = null;

    renderExpandView = this.state.showExpandView ? renderExpandView : null
    return (
      <View style={{
        height: !!this.state.contentHeight ? 'auto' : 0,
        opacity: !!this.state.contentHeight ? 1 : 0,
        overflow: 'hidden'}}>
        <Animated.View
          scrollEnabled={false}
          style={{height: this.state.contentHeight || 0, overflow: this.state.viewOverflow}}
        >
          <Text
            scrollEnabled={false}
            style={{overflow: 'hidden', height: this.state.maxHeight}}
            numberOfLines={this.state.numberOfLines}
            onLayout={this.onTextLayout.bind(this)}
            {...rest}
          >
            {this.props.children}
          </Text>
        </Animated.View>
        <TouchableOpacity onPress={this.onPressExpand.bind(this)} disabled={this.state.resizing}>
          {renderExpandView}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  expandText: {
    color: '#014c92',
    marginTop: 0,
    textAlign: 'center',
  },
})

const defaultExpandView = () => <Text style={styles.expandText}>Read More</Text>
const defaultCollapseView = () => <Text style={styles.expandText}>Collapse</Text>

ExpandableText.propTypes = {
  children: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number,
  maxHeight: PropTypes.number,
  expandView: PropTypes.func,
  collapseView: PropTypes.func,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func,
  duration: PropTypes.number,
}

ExpandableText.defaultProps = {
  numberOfLines: 5,
  animationDuration: 100,
  expandView: defaultExpandView,
  collapseView: defaultCollapseView,
}
