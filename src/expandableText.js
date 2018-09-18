import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text } from 'react-native'

export default class ExpandableText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      numberOfLines: null,
      showExpandText: false,
      expandText: '展开',
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
          this.setState({ showExpandText: true })
        }
        this.measureFlag = false
      }
    }
  }

  onPressExpand() {
    if (!this.state.expanded) {
      this.setState({ numberOfLines: null, expandText: '收起', expanded: true })
    } else {
      this.setState({ numberOfLines: this.numberOfLines, expandText: '展开', expanded: false })
    }
  }

  render() {
    const { numberOfLines, expandTextStyle, ...rest } = this.props
    const expandText = this.state.showExpandText ? (
      <Text
        style={[this.props.style, styles.expandText, expandTextStyle]}
        onPress={this.onPressExpand.bind(this)}
      >
        {this.state.expandText}
      </Text>
    ) : null
    return (
      <View>
        <Text
          numberOfLines={this.state.numberOfLines}
          onLayout={this.onTextLayout.bind(this)}
          {...rest}
        >
          {this.props.children}
        </Text>
        {expandText}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  expandText: {
    color: 'blue',
    marginTop: 0,
    textAlign: 'center',
  },
})

ExpandableText.propTypes = {
  children: PropTypes.element.isRequired,
  numberOfLines: PropTypes.number,
}

ExpandableText.defaultProps = {
  numberOfLines: 5,
}
