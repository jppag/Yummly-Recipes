import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import Svg, {
  Path,
  G,
} from 'react-native-svg';

import api from '../Constants/api';
import API from '../Constants/yummly';

import Food from './Food';
import Header from './Header';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#2c333a99',
    paddingTop: 85,
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
    height: 250,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#2c333a99',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  itemContent: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10,
    maxWidth: '60%',
    fontFamily: 'Georgia',
  },
  itemDescription: {
    color: '#f9f9f9c7',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Avenir',
    letterSpacing: 1.5,
  },
  durationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 15,
  },
  duration: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  iconContainer: {
    width: 16,
    height: 16,
    marginRight: 7,
  },
  icon: {
    width: 16,
    height: 16,
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    this.animatedShowValue = new Animated.Value(20);
    this.animatedOpacityValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${API.url}/recipes?${API.key}&${API.id}&q=popular`).then(res => {
      const data = JSON.parse(res['_bodyInit']).matches;
      this.setState({
        data,
      });

      setTimeout(() => {
        this.setState({loading: false});
      }, 400);

      Animated.stagger(70, [
        Animated.timing(this.animatedShowValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
        }),
        Animated.timing(this.animatedOpacityValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
        }),
      ]).start();
    }).catch(err => console.log(err));
  }

  checkItemInfoHandler(item) {
    this.props.navigator.push({
      component: Food,
      title: 'RECIPE',
      passProps: { 
        recipeId: item.id,
        headerTitle: (
          item.attributes &&
          item.attributes.course &&
          item.attributes.course[0]
        ) || 'RECIPE',
      },
      translucent: true,
      navigationBarHidden: true,
    });
  }

	render() {
    const animatedShow = {
      transform: [{
        translateY: this.animatedShowValue,
      }],
      opacity: this.animatedOpacityValue,
    };

    if(!this.state.data) {
      return (
        <ActivityIndicator color='#fff' size='large' animating={this.state.loading}></ActivityIndicator>
      )
    }

    return (
      <View style={styles.main}>
        <Header
          title='RECIPES'
        />
        <ScrollView
          style={styles.container}
          automaticallyAdjustContentInsets={false}
        >
          {this.state.data.map(item => (
            <TouchableHighlight
              style={styles.item}
              underlayColor='#12161999'
              onPress={() => this.checkItemInfoHandler(item)}
              key={item.recipeName}
              >
              <View>
                <Image
                  source={{uri: item.imageUrlsBySize['90']}}
                  style={styles.image}
                />
                <View
                  style={styles.overlay}
                >
                  <Animated.View style={[styles.durationContent, animatedShow]}>
                    {item.totalTimeInSeconds &&
                      <View style={styles.timeContainer}>
                        <Svg style={styles.iconContainer} viewbox='0 0 32 32'>
                          <G style={styles.icon}>
                            <Path
                              scale='0.5'
                              fill='#fff'
                              d='M16,0 C7.177658,0 0,7.177652 0,16 C0,24.82232 7.177658,32 16,32 C24.822342,32 32,24.82232 32,16 C32,7.177652 24.822342,0 16,0 Z M16,2.4 C23.525286,2.4 29.6,8.474708 29.6,16 C29.6,23.52528 23.525286,29.6 16,29.6 C8.4747144,29.6 2.4,23.52528 2.4,16 C2.4,8.474708 8.4747144,2.4 16,2.4 Z M15.9875,3.575 C15.6670444,3.57830074 15.36122,3.70963219 15.138161,3.93973514 C14.915102,4.16983809 14.7933392,4.47959664 14.8,4.8 L14.8,14.8 L7.2,14.8 C6.7672369,14.7938797 6.36470236,15.0212504 6.14653473,15.3950474 C5.92836711,15.7688445 5.92836711,16.2311555 6.14653473,16.6049526 C6.36470236,16.9787496 6.7672369,17.2061203 7.2,17.2 L16,17.2 C16.6627143,17.1999337 17.1999337,16.6627143 17.2,16 L17.2,4.8 C17.2067517,4.47526094 17.0815869,4.16165301 16.8530929,3.93080341 C16.624599,3.69995381 16.3122912,3.57157921 15.9875,3.575 Z'
                            />
                          </G>
                        </Svg>
                        <Text style={styles.duration}>{(item.totalTimeInSeconds / 60)} Minutes</Text>
                      </View>
                    }
                  </Animated.View>
                  <Animated.View style={[styles.itemContent, animatedShow]}>
                    <Text style={styles.itemDescription}>{item.sourceDisplayName.toUpperCase()}</Text>
                    <Text style={styles.itemTitle}>{item.recipeName}</Text>
                  </Animated.View>
                </View>
              </View>
            </TouchableHighlight>
          ))
          }
        </ScrollView>
      </View>
    )
	}
}

export default Main;
