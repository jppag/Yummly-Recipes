import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	TouchableHighlight,
	ScrollView,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = {
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'red',
		flexDirection: 'row',
		width: 80,
		height: 80,
		padding: 20,
		paddingTop: 80,
		zIndex: 1,
	},
	backButton: {
		width: 18,
		height: 18,
		backgroundColor: 'transparent',
		borderBottomColor: '#fff',
		borderBottomWidth: 3,
		borderLeftColor: '#fff',
		borderLeftWidth: 3,
		transform: [{rotate: '45deg'}],
	},
	cuisineTitle: {
		fontFamily: 'Avenir',
		color: '#fff',
		fontWeight: 'bold',
		marginTop: 20,
		marginLeft: 20,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: width,
		height: height,
		backgroundColor: '#2c333a77',
		flex: 1,
		zIndex: 2,
	},
	imageContainer: {
		flex: 1,
		height: height,
		width: width,
		position: 'absolute',
	},
	image: {
		flex: 1,
	},
	mainContent: {
		flex: 1,
		minHeight: height,
	},
	innerContent: {
		justifyContent: 'flex-end', 
		flex: 1,
		height: height,
		width: '100%',
		padding: 20,
		paddingBottom: 100,
	},
	title: {
		fontSize: 50,
		lineHeight: 45,
		letterSpacing: 0.0025,
		paddingTop: 20,
		color: '#fff',
		fontWeight: 'bold',
		fontFamily: 'Avenir',
	},
	descriptionItem: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	description: {
		fontFamily: 'Avenir',
		fontSize: 16,
		color: '#ddd',
		fontWeight: 'bold',
	}
};

class Food extends React.Component {
	constructor(props) {
		super(props);
	}

	goBackToPreviousScreen() {
		this.props.navigator.pop({n: 1});
	}

	render() {
		const food = this.props.food;
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableHighlight
						style={styles.backButtonContainer}
						onPress={this.goBackToPreviousScreen.bind(this)}
					>
						<View style={styles.backButton} />
					</TouchableHighlight>
					<Text style={styles.cuisineTitle}>{food.cuisine.toUpperCase()}</Text>
				</View>
				<View style={styles.imageContainer}>
					<View style={styles.overlay} />
					<Image
						source={{uri: food.image}}
						style={styles.image}
					/>
				</View>
				<ScrollView
					automaticallyAdjustContentInsets={false}
				>
					<View style={styles.mainContent}>
						<View style={styles.innerContent}>
							<Text style={styles.title}>{food.title}</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		) 
	}
}

export default Food;
