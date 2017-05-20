import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// dependencies
import {
  View,
  Modal,
  StyleSheet
} from 'react-native';

// Component
import LoadingIcon from './loading-icon';

// dispatch actions
import { fetchInitialAppData } from '../../redux/actions/blob';

class LoadingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // Fetch Data on character using character ID sent as props on navigate
    setTimeout(() => {
      return this.props.dispatch(fetchInitialAppData());
    }, 1000);
  }

  componentDidUpdate() {
    // if blob has finished fetching data
    if (this.props.blob.characterData && this.state.loading) {
      this.setState({loading: false});
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'characterSelect'})
        ]
      });
      setTimeout(() => this.props.navigation.dispatch(resetAction));
    }
  }

  render() {
    return (
      <View style={style.container}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.loading}
          onRequestClose={() => {}}
        >
          <View style={style.container}>
            <LoadingIcon />
          </View>
        </Modal>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
});

/** MAPPING STATE **/
const mapStateToProps = function(state) {
  return {
    blob: state.blob
  }
};

export default connect(mapStateToProps)(LoadingScreen);
