import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { RefreshControl, ScrollView, View, StyleSheet, UIManager, LayoutAnimation, TextInput } from 'react-native';
import { connect } from "react-redux";
import t from 'tcomb-form-native';
import * as SecureStore from 'expo-secure-store';
import sortBy from 'lodash.sortby';
import { getComments, setComments } from '../../../actions/apiActions';
import Comment from './Comment';
import { Button } from '../../../components/Button';
import { ButtonPostCom } from '../../../components/ButtonTopic';


const mapDispatchToProps = dispatch => {
  return {
    getComments: params => dispatch(getComments(params)),
    setComments: params => dispatch(setComments(params))
  };
}

const mapStateToProps = state => {
  return { socket: state.socket }
};

class connectedTopicScreen extends Component {
  
  state = { 
    messages: [],
    token: {},
    refresh : true,
    data_comments: [],
    text: '',
    refreshing:false,
  }
  constructor(props){
    super(props);
    this.navigate  = props.navigation;
  }
 
  _onRefresh = () => {
    this.setState({refreshing: true});
    SecureStore.getItemAsync('userToken').then((res)=>{
      this.setState({ token: res });
      this.DisplayComments();
    });
    this.setState({refreshing: false});
  }

  forceRender = () => {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState( prevState =>{
      return {
        comments: sortBy(prevState.comments, 'likes').reverse(),
        refresh: !this.state.refresh
      }
    })
  }
  componentDidMount () {
    SecureStore.getItemAsync('userToken').then((res)=>{
      this.setState({ token: res });
      this.DisplayComments();
      this.props.socket.on('commentAdd', () => this.SendComment());
    })
  }

  DisplayComments = () => {
    const headers = {
      'Authorization': 'Bearer ' + this.state.token,
    };
    const top = encodeURIComponent(this.props.navigation.state.params.nom_topic);
    ListComments = this.props.getComments({headers, top});
    let that = this;
    setTimeout(function(){
      that.setState({data_comments: ListComments["_55"]});
      const sortedData = sortBy(that.state.data_comments, 'likes').reverse();
      that.setState({
        comments: sortedData
      });
    },500);
     
  };

  SendComment = () => {
    const headers = {
      'Authorization': 'Bearer ' + this.state.token,
    };
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var com = this.state.text;
    var today = date+'/'+ month +'/'+year;
    var topic = this.props.navigation.state.params.nom_topic;
    this.props.setComments({ headers, com, today, topic });
    SecureStore.getItemAsync('userToken').then((res)=>{
      this.setState({ token: res });
      this.setState({ text: ''});
      this.DisplayComments();
      this.props.socket.emit('commentAdd', topic+' : '+com);
    });
  }

  render() {
    return (
      // <View>
      //   {ListComment}
      // </View>
        <View style={{flex: 1}}>

        <ScrollView
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          <FlatList
            style={styles.listContainer}
            data={this.state.data_comments}
            extraData={this.state.refresh}
            renderItem={(item) => (
                <Comment
                comment={item}
                refresh={this.forceRender}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <View>
          <ButtonPostCom
            title={"Post comment"}
            action={() => this.SendComment()}
          />
        </View>
        </View>
        
      </View>
      
     );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    marginTop: 5
  }
})



const TopicScreen = connect(mapStateToProps, mapDispatchToProps)(connectedTopicScreen);

export default TopicScreen;