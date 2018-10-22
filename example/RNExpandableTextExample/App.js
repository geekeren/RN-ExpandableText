/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import NavigationBar from 'react-native-navbar';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import ExpandableText from './expandableText';

const content = "ElasticSearch作为一款开源的全文搜索引擎在如今的软件开发得到了越来越广泛的应用，在业务功能开发方面，可以选用ElasticSearch提供比数据库查询更强大的搜索方式，同时基于搜索结果评分（权重）和高亮让我们很轻易地通过它实现一个站内的搜索引擎。 ElasticSearch VS 数据库 刚接触ElasticSearch（ES）时我们经常将它与数据库类比起来学习，从结构上： Indic";
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <NavigationBar
          containerStyle={{backgroundColor: "#014c92", paddingTop: 10}}
          leftButton={
            { title: 'RNExpandableText Example',
              tintColor: "#ffffff"
            }
          }
        />
        <ScrollView
          style={styles.container}
        >
          <View style={styles.section}>
            <ExpandableText
              style={styles.content}
              animationDuration={0}
            >{content}
            </ExpandableText>
          </View>
          <View style={styles.section}>
            <ExpandableText
              style={styles.content}
              animationDuration={100}
            >{content}
            </ExpandableText>
          </View>
          <View style={styles.section}>
            <ExpandableText
              style={styles.content}
              animationDuration={200}
            >{content}
            </ExpandableText>
          </View>
          <View style={styles.section}>
            <ExpandableText
              style={styles.content}
              animationDuration={200}
            >{content}
            </ExpandableText>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  section: {
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 6,
    backgroundColor: "#fff",
  },
  content: {
    color: '#444',
  }
});
