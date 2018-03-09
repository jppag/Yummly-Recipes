import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	TouchableHighlight,
	ScrollView,
	Animated,
	Easing,
	ActivityIndicator,
} from 'react-native';
import Svg, {
  Path,
  G,
} from 'react-native-svg';

import Header from './Header';
import API from '../Constants/yummly';

const {height, width} = Dimensions.get('window');

const styles = {
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: width,
		height: height,
		backgroundColor: '#2c333a77',
		flex: 1,
		zIndex: 1,
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
		height: height,
	},
	innerContent: {
		justifyContent: 'flex-end', 
		flex: 1,
		height: height,
		width: '85%',
		padding: 20,
		paddingBottom: 50,
	},
	title: {
		fontSize: 40,
		lineHeight: 50,
		letterSpacing: 0.0025,
		paddingTop: 20,
		color: '#fff',
		fontWeight: 'bold',
		fontFamily: 'Georgia',
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
	},
	infoContainer: {
		backgroundColor: '#fff',
		width: '100%',
		flex: 1,
		padding: 20,
		paddingBottom: 40,
	},
	infoTitle: {
		fontFamily: 'Georgia',
		fontSize: 26,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 10,
	},
	infoDescription: {
		color: '#777',
		fontFamily: 'Avenir',
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0.5,
	},
	infoSection: {
		borderTopColor: '#e9e9e9',
		borderTopWidth: 1,
		marginTop: 20,
	},
	infoSectionTitle: {
		fontFamily: 'Georgia',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 20,
		marginTop: 30,
	},
	iconsContainer: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	iconContent: {
    width: 25,
    height: 33,
		top: 8,
		position: 'relative',
	},
	iconTop: {
		top: 8,
	},
  icon: {
    width: 32,
    height: 32,
	},
	iconText: {
		fontFamily: 'Avenir',
		fontSize: 15,
		color: '#777',
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	listItemText: {
		color: '#777',
		fontFamily: 'Avenir',
		fontSize: 16,
		paddingRight: 15,
		lineHeight: 20,
	},
	listItemBullet: {
		width: 5,
		height: 5,
		backgroundColor: '#777',
		borderRadius: 5,
		marginRight: 10,
		position: 'relative',
		top: 9,
	},
};

class Food extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			loading: false,
		};

		this.goBackToPreviousScreen = this.goBackToPreviousScreen.bind(this);
	}

	componentWillMount() {
		this.animatedShowValue = new Animated.Value(20);
		this.animatedOpacityValue = new Animated.Value(0);
	}

	componentDidMount() {
		this.setState({loading: true});
		fetch(`${API.url}/recipe/${this.props.recipeId}?${API.key}&${API.id}`).then(res => {
			this.setState({
				data: JSON.parse(res['_bodyInit']),
				loading: false,
			});
			Animated.stagger(70, [
				Animated.timing(this.animatedShowValue, {
					toValue: 0,
					duration: 600,
					easing: Easing.ease,
				}),
				Animated.timing(this.animatedOpacityValue, {
					toValue: 1,
					duration: 400,
					easing: Easing.ease,
				}),
			]).start();
		});
	}

	goBackToPreviousScreen() {
		this.props.navigator.pop({n: 1});
	}

	render() {
		const growAnimation = {
			transform: [{scale: this.animatedBackgroundGrowValue}],
		};
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
		const data = this.state.data;
		console.log(data);
		return(
			<View style={styles.container}>
				<Header
					title={'Recipe'}
					goBackToPreviousScreen={this.goBackToPreviousScreen}
				/>
				<View style={styles.imageContainer}>
					<View style={styles.overlay} />
					<Image
						source={{uri: data.images[0].hostedLargeUrl}}
						style={styles.image}
					/>
				</View>
				<ScrollView
					automaticallyAdjustContentInsets={false}
				>
					<View style={styles.mainContent}>
						<Animated.View style={[styles.innerContent, animatedShow]}>
							<Text style={styles.title}>{data.name}</Text>
						</Animated.View>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.infoTitle}>About</Text>
						<View style={styles.iconsContainer}>
							<View style={styles.iconContainer}>
								<Svg style={[styles.iconContent, styles.iconTop]} viewbox='0 0 32 26'>
									<G style={styles.icon}>
										<Path
											scale='0.5'
											fill='#777'
											strokeWidth='4'
											d='M16,0 C7.177658,0 0,7.177652 0,16 C0,24.82232 7.177658,32 16,32 C24.822342,32 32,24.82232 32,16 C32,7.177652 24.822342,0 16,0 Z M16,2.4 C23.525286,2.4 29.6,8.474708 29.6,16 C29.6,23.52528 23.525286,29.6 16,29.6 C8.4747144,29.6 2.4,23.52528 2.4,16 C2.4,8.474708 8.4747144,2.4 16,2.4 Z M15.9875,3.575 C15.6670444,3.57830074 15.36122,3.70963219 15.138161,3.93973514 C14.915102,4.16983809 14.7933392,4.47959664 14.8,4.8 L14.8,14.8 L7.2,14.8 C6.7672369,14.7938797 6.36470236,15.0212504 6.14653473,15.3950474 C5.92836711,15.7688445 5.92836711,16.2311555 6.14653473,16.6049526 C6.36470236,16.9787496 6.7672369,17.2061203 7.2,17.2 L16,17.2 C16.6627143,17.1999337 17.1999337,16.6627143 17.2,16 L17.2,4.8 C17.2067517,4.47526094 17.0815869,4.16165301 16.8530929,3.93080341 C16.624599,3.69995381 16.3122912,3.57157921 15.9875,3.575 Z'
										/>
									</G>
								</Svg>
								<Text style={styles.iconText}>
									{data.totalTime ?  data.totalTime : 'Not Provided'}
								</Text>
							</View>
							<View style={styles.iconContainer}>
								<Svg style={styles.iconContent} viewbox='0 0 31 33'>
									<G style={styles.icon}>
										<Path
											scale='0.5'
											fill='#777'
											strokeWidth='4'
											d='M15.1482248,25.2659372 L11.5956101,30.6716545 C11.1251928,31.3816142 10.3908177,31.8744027 9.55552777,32.0406132 C9.35764354,32.0802775 9.15634157,32.1004077 8.95452152,32.1007138 C8.35925214,32.102671 7.77730114,31.924594 7.28505971,31.5898585 C6.58984605,31.119375 6.11969159,30.3827664 5.98568603,29.5540811 C5.85168048,28.7253958 6.06571179,27.8781485 6.5772079,27.2125296 L11.468731,20.8685748 C11.6906071,20.5834758 12.0477276,20.4384031 12.4055686,20.488004 C12.7634096,20.5376049 13.0676066,20.7743439 13.2035714,21.1090438 C13.3395362,21.4437436 13.2866127,21.8255554 13.0647365,22.1106543 L8.17321339,28.4546092 C7.99926614,28.682843 7.92717008,28.972723 7.97393668,29.2558505 C8.02070328,29.538978 8.1821902,29.7902752 8.42029374,29.950447 C8.64186428,30.0957913 8.91199944,30.1474171 9.17155155,30.0940207 C9.47892689,30.0322486 9.74916754,29.8508871 9.92280936,29.5898432 L13.4754241,24.1640924 C13.6589595,23.8375254 14.0093766,23.6406612 14.3837545,23.6537924 C14.7581324,23.6669237 15.0938952,23.8878557 15.2540992,24.2264793 C15.4143031,24.5651028 15.3721707,24.9648183 15.1448859,25.2625982 L15.1482248,25.2659372 Z M29.1082645,0.891794764 C27.772695,-0.0664763136 25.9563206,-0.14661048 24.0230838,0.671425805 C22.0933687,1.55311103 20.4395413,2.9426492 19.2384063,4.69148984 C17.498827,7.132243 16.6874686,9.94027776 17.0681059,12.204068 C17.1394595,12.6520981 17.0993224,13.1108076 16.9512436,13.5396374 C16.7853608,14.0597 17.0664326,14.61683 17.5832878,14.7924515 C18.100143,14.9680731 18.6624538,14.6975151 18.8477522,14.1840497 C19.1031133,13.4407813 19.1707859,12.6459151 19.0447487,11.8701756 C18.7542623,10.1439521 19.4554363,7.84009481 20.8711399,5.8601131 C21.8588632,4.41050822 23.2218149,3.25644242 24.8144087,2.52118949 C25.5489719,2.21066959 26.9346252,1.79998199 27.9563358,2.52118949 C28.9780464,3.24239699 29.041486,4.69482876 28.9880632,5.48949258 C28.8098833,7.2362456 28.1600996,8.90167707 27.1082492,10.3075594 C25.6925456,12.3109135 23.7392753,13.7099225 22.0130518,13.99707 C21.2477302,14.1232042 20.5246222,14.4337625 19.906191,14.9019183 C19.7400212,15.0291398 19.5816903,15.1662856 19.4320638,15.3126059 C19.0583389,15.7027286 19.061319,16.3189354 19.4387997,16.7054251 C19.8162804,17.0919149 20.4322455,17.1094253 20.8310728,16.7450041 C20.9226493,16.6556253 21.019663,16.5719928 21.1215592,16.4945848 C21.4746394,16.2229878 21.8881865,16.0408438 22.3269106,15.963696 C24.580684,15.5863976 26.988048,13.9035801 28.7276272,11.459488 C29.9942035,9.74991763 30.7710558,7.72756214 30.9747228,5.60969383 C31.1149576,3.51618873 30.4505118,1.83671015 29.1082645,0.87843907 L29.1082645,0.891794764 Z M14.6774366,13.1756947 C15.281472,11.7434561 15.0994738,10.100417 14.1966316,8.83509405 L8.23999186,0.521174243 C7.91550304,0.0790998947 7.29586138,-0.0198723414 6.84981002,0.299127509 C6.40375865,0.618127359 6.297135,1.23649835 6.61059714,1.68645858 L12.560559,10.0070562 C13.0649272,10.7132032 13.1612829,11.6323856 12.8143172,12.4277759 C12.5343721,13.0444122 12.615139,13.7649045 13.0246694,14.3042509 L24.0431173,28.5547769 C24.2538671,28.8303823 24.2979161,29.1988458 24.158073,29.5163638 C24.0182298,29.8338818 23.7166604,30.050126 23.3710609,30.0807008 C23.0254615,30.1112755 22.6906114,29.9513346 22.4971957,29.6632996 L12.5138141,14.6715325 C12.1330251,14.1108132 11.4752009,13.8043416 10.8009463,13.8735298 C9.93371397,13.9568184 9.08696099,13.5759699 8.57388422,12.8718527 L2.62058342,4.55125505 C2.29609459,4.1091807 1.67645294,4.01020846 1.23040157,4.32920831 C0.784350206,4.64820816 0.677726555,5.26657915 0.991188693,5.71653939 L6.95116735,14.037137 C7.86131667,15.2980773 9.36016817,15.9969516 10.9111308,15.8835618 L20.8310728,30.7918557 C21.2733662,31.4613365 21.9710059,31.9199924 22.7609707,32.0606467 C22.9393908,32.0936371 23.1204321,32.1104002 23.3018763,32.1107306 C24.4284557,32.1102362 25.4567342,31.4691992 25.9531668,30.457895 C26.4495994,29.4465909 26.3278004,28.2409998 25.6391228,27.3494255 L14.6774366,13.1756947 Z M10.0797388,11.8401253 C10.4550164,11.839288 10.7983455,11.6287535 10.9692628,11.2946558 C11.1401802,10.9605581 11.1100107,10.5589495 10.8910972,10.2541366 L5.45866849,2.48112241 C5.14149419,2.02748942 4.51663143,1.91686779 4.06299843,2.23404207 C3.60936544,2.55121636 3.49874379,3.17607913 3.81591807,3.62971213 L9.25836357,11.4027263 C9.44593333,11.6707731 9.75258215,11.8303302 10.0797388,11.8301085 L10.0797388,11.8401253 Z'
										/>
									</G>
								</Svg>
								<Text style={styles.iconText}>
									{data.numberOfServings} {data.numberOfServings === 1 ? 'person': 'people'}
								</Text>
							</View>
							<View style={styles.iconContainer}>
								<Svg style={styles.iconContent} viewbox='0 0 32 32'>
									<G style={styles.icon}>
										<Path
											scale='0.5'
											fill='#777'
											strokeWidth='4'
											d='M31.945999,11.6258186 C31.8411092,11.3036822 31.4951504,10.7518549 30.3523842,10.6828765 L20.956386,10.1154046 C20.9197634,10.1086489 20.8514961,10.0581596 20.8362071,10.0332705 L17.3904862,1.26554469 C16.9712823,0.199934808 16.3398098,0.041 16.0006067,0.041 C15.6614035,0.041 15.029931,0.199934808 14.6110827,1.26554469 L11.1678507,10.0265148 C11.1497172,10.0585151 11.0810944,10.1086489 11.0526497,10.115049 L1.64918467,10.683232 C0.506418514,10.7522105 0.160104191,11.3040378 0.0552143291,11.6261741 C-0.0493199738,11.948666 -0.0930537128,12.598272 0.790510038,13.3257454 L8.05919968,19.3080232 C8.08373324,19.3343345 8.10968904,19.4150464 8.10720013,19.4442022 L5.74202263,28.5635757 C5.52406505,29.4041168 5.71748907,29.8905213 5.91873538,30.1504348 C6.33971706,30.6940843 7.13581334,30.7420848 7.99022126,30.197013 L15.9245171,25.1331439 C15.9366061,25.1274549 16.0638961,25.1295883 16.0695851,25.1295883 C16.0695851,25.1295883 16.0695851,25.1295883 16.0695851,25.1288771 L24.0109921,30.197013 C24.4198848,30.4579932 24.8042439,30.5899056 25.1534027,30.5899056 C25.5331395,30.5899056 25.8630982,30.4338152 26.082478,30.1504348 C26.2833687,29.8905213 26.4767927,29.4041168 26.2588352,28.5635757 L23.8954355,19.4516689 C23.8915243,19.4146908 23.9174801,19.3350456 23.9366803,19.3126454 L31.2103478,13.3253899 C32.0946226,12.5979165 32.0508889,11.9483104 31.945999,11.6258186 Z M30.3452731,12.2747135 L23.0723167,18.2612579 C22.6460016,18.6111278 22.436933,19.2529115 22.5759566,19.7862498 L24.9407785,28.9049122 C24.9706454,29.0197577 24.9852233,29.1114919 24.9912678,29.181537 C24.9283339,29.1552256 24.8458443,29.1139808 24.7437989,29.0485579 L16.8016808,23.980422 C16.5780343,23.8385541 16.2935872,23.75962 16.0006067,23.75962 C15.7076262,23.75962 15.4231791,23.8385541 15.1988215,23.9811332 L7.25777002,29.0485579 C7.15536907,29.1143363 7.07323498,29.1555812 7.0099455,29.1818925 C7.01599,29.1118474 7.03021236,29.0201132 7.0600793,28.9052677 L9.4252568,19.7866054 C9.56392475,19.252556 9.3552117,18.6111278 8.92960775,18.2616134 L1.65558473,12.2743579 C1.56456166,12.1989794 1.49878327,12.133201 1.45291618,12.0798672 C1.52118348,12.0642226 1.61327323,12.0496447 1.73167432,12.042178 L11.136206,11.4743505 C11.6851889,11.440928 12.2313273,11.0444798 12.4325736,10.531764 L15.87865,1.7640382 C15.9220282,1.6534594 15.9643397,1.57096975 16.0009622,1.51052474 C16.0375848,1.57096975 16.0798963,1.6534594 16.1232745,1.7640382 L19.5693509,10.531764 C19.7705972,11.0444798 20.3167356,11.4405724 20.8657185,11.4743505 L30.2691835,12.0425335 C30.3875846,12.0496447 30.4796743,12.0642226 30.5479416,12.0802228 C30.5024301,12.1339122 30.4370072,12.1996906 30.3452731,12.2747135 Z'
										/>
									</G>
								</Svg>
								<Text style={styles.iconText}>
									{data.numberOfServings} {data.numberOfServings === 1 ? 'person': 'people'}
								</Text>
							</View>
						</View>
						<View style={styles.infoSection}>
							<Text style={styles.infoSectionTitle}>Ingredients</Text>
							<View style={styles.list}>
								{data.ingredientLines &&
								data.ingredientLines.map((item, index) => (
									<View key={`${item}-${index}`} style={styles.listItem}>
										<View style={styles.listItemBullet}/>
										<Text style={styles.listItemText}>{item}</Text>
									</View>
								))}
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		) 
	}
}

export default Food;
