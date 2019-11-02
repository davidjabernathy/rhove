/**
 * Rhove React Native Code Challenge
 */

import React from 'react';
import { SafeAreaView } from 'react-native';

import Comics from './components/Comics';

class App extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<Comics />
			</SafeAreaView>
		);
	}
}

export default App;
