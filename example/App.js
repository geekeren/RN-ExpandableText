/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';

import ExpandableText from 'rn-expandable-text';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView
        style={styles.container}
      >
        <View style={styles.item}>
          <ExpandableText
            numberOfLines={4}
            unexpandView={() => (<View style={styles.arrow_up} />)}
            expandView={() =>
              (<View style={styles.arrow_down} />)
            }
          >
            RN-ExpandableText is an component of React Native
          </ExpandableText>
        </View>
        <View style={styles.item}>
          <ExpandableText
            numberOfLines={4}
            unexpandView={() => (<View style={styles.arrow_up} />)}
            expandView={() =>
              (<View style={styles.arrow_down} />)
            }
          >
            RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
          </ExpandableText>
        </View>
        <View style={styles.item}>
          <ExpandableText
            numberOfLines={4}
            unexpandView={() => (<View style={styles.arrow_up} />)}
            expandView={() =>
              (<View style={styles.arrow_down} />)
            }
          >RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
            RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
            RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
          </ExpandableText>
        </View>
        <View style={styles.item}>
          <ExpandableText
            numberOfLines={4}
            unexpandView={() =>
              (<Text style={styles.readMeExpandText}>收起</Text>)
            }
            expandView={() =>
              (<Text style={styles.readMeExpandText}>阅读更多</Text>)
            }
          >RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
            RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
            RN-ExpandableText is an component of React Native, all the usages of ExpandableText is the same as the native Text component, but it will collapse text when its content exceeds specified number of lines.
          </ExpandableText>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
  },
  item: {
    marginVertical: 6,
    marginHorizontal: 6,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  expandText: {
    color: '#014c92',
    textAlign: 'center',
  },
  readMeExpandText: {
    color: '#014c92',
    textAlign: 'right',
    marginTop: 12,
  },
  arrow_down: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#014c92',
    transform: [{ rotate: '45deg' }],
  },
  arrow_up: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#014c92',
    transform: [{ rotate: '-135deg' }],
  },
});
