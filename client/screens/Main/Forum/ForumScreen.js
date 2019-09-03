import React, { Component } from 'react';
import Text from 'react-native';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';
import * as SecureStore from 'expo-secure-store';

import { Button } from '../../../components/Button';
import { ButtonTopic } from '../../../components/ButtonTopic';
import { ButtonAdd } from '../../../components/ButtonAdd';
import { getTopics } from '../../../actions/apiActions';

mapDispatchToProps = dispatch => {
  return {
    getTopics: params => dispatch(getTopics(params))
  };
}

mapStateToProps = state => {
  return { 
    loggedInAccountUser: state.loggedInAccountUser,
  };
};

class connectedForumScreen extends Component {

  state = { 
    token : {} , 
    data_topics: []
  }
  constructor(props){
    super(props);
    this.navigate  = props.navigation;
  }
  componentDidMount () {
    SecureStore.getItemAsync('userToken').then((res)=>{
      this.setState({ token: res });
      this.DisplayTopics();
    })
    // const headers = {
    //   'Authorization': 'Bearer ' + userToken
    // };
  }

  DisplayTopics = () => {
    const headers = {
      'Authorization': 'Bearer ' + this.state.token
    };
    ListTopic = this.props.getTopics(headers);
    let that = this;
    setTimeout(function(){
      that.setState({data_topics: ListTopic["_55"]});
    },500);
     
  };

  

  render() {
    let {navigate} = this.props.navigation;
    const ListTopic = this.state.data_topics.map(function(t, i){
      return(
        <ButtonTopic key={i}
          title={t.topic} 
          action={() => navigate('Topic',{ nom_topic : t.topic})}
        />
      );
    })
        return (
          <View style={{flex: 1}}>
             <ScrollView style={{alignContent:"center"}}>
              {ListTopic}
            </ScrollView>
            <View>
              <ButtonAdd
                title={"+"}
                style={styles.buttonTopic}
                action={()=>{ navigate('CreateTopic')}}
              />
            </View>
          </View>
         
            // <Text>{this.DisplayTopics}</Text>
        );
    }
}
connectedForumScreen.navigationOptions = {
  title: 'Topics',
};
const styles = StyleSheet.create({
  buttonTopic: {
    backgroundColor: '#2f95dc',
  }
});

const ForumScreen = connect(mapStateToProps, mapDispatchToProps)(connectedForumScreen);

export default ForumScreen;