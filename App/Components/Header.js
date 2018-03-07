import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Svg, {
  Path,
  G,
} from 'react-native-svg';

const styles = StyleSheet.create({
  header: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#2c333abb',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 85,
		paddingTop: 20,
		zIndex: 1,
		flex: 1,
	},
	backButtonContainer: {
		position: 'absolute',
		bottom: 15,
		left: 20,
	},
	backButton: {
		width: 13,
		height: 13,
		borderBottomColor: '#fff',
		borderBottomWidth: 3,
		borderLeftColor: '#fff',
		borderLeftWidth: 3,
		transform: [{rotate: '45deg'}],
	},
	title: {
		fontFamily: 'Avenir',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 14,
		marginTop: 25,
		letterSpacing: 3,
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'absolute',
		bottom: 6,
		right: 20,
	},
	iconContent: {
    width: 25,
    height: 33,
		top: 8,
		position: 'relative',
	},
  icon: {
    width: 32,
    height: 32,
	},
});

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <View style={styles.header}>
        {this.props.goBackToPreviousScreen &&
          <TouchableHighlight
            style={styles.backButtonContainer}
            onPress={this.props.goBackToPreviousScreen}
          >
            <View style={styles.backButton} />
          </TouchableHighlight>
        }
        <Text style={styles.title}>{this.props.title}</Text>
				<View style={styles.iconContainer}>
					<Svg style={styles.iconContent} viewbox='0 0 32 32'>
						<G style={styles.icon}>
							<Path
								scale='0.6'
								fill='#fff'
								strokeWidth='1'
								d='M0,31.1693288 C0,28.5189372 2.04779636,25.7059768 4.5474598,24.8270535 C4.5474598,24.8270535 12.5714286,22.5237413 12.5714286,20.2666667 C12.5714286,19.1149016 10.4223113,16.9791348 10.4223113,16.9791348 C8.76679472,15.073235 7.54821268,11.4882426 7.9215642,8.99057804 C7.9215642,8.99057804 7.40407672,0 16,0 C24.5959233,0 24.1044116,9.1694218 24.1044116,9.1694218 C24.3758659,11.6738908 23.2111676,15.206281 21.5489703,17.1095085 C21.5489703,17.1095085 19.4285714,19.1452076 19.4285714,20.2666667 C19.4285714,22.5492368 27.4525402,24.8345604 27.4525402,24.8345604 C29.9640329,25.6827648 32,28.5227891 32,31.1693288 L32,32 L0,32 L0,31.1693288 Z'
							/>
						</G>
					</Svg>
				</View>
      </View>
		)
	}
}

export default Header;
