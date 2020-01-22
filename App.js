import React, { Component } from 'react';
import {StyleSheet,Text,TextInput,TouchableOpacity,ScrollView,View,Button,Animated,Image,Easing,FlatList,} from 'react-native';
var score = 0,play=0,i=1;
var presentState={};

export default class App extends Component {
  constructor() {
    super();
    this.state = { text: '',jsonData: '',guess: '',definition: '',synonim: '',antonym: '',jumble: '',len: 0,first: '',last: '',jshow: true,wlshow: true,fshow: true,lshow: true, col1:'#edf0f2',col2:'#edf0f2',col3:'#edf0f2',col4:'#edf0f2',d1:'',d2:'',d3:'',d4:'',d5:'',d6:'',d7:'',d8:'',d9:'',ds1:true,ds2:true,ds3:true,ds4:true,ds5:true,ds6:true,ds7:true,ds8:true,ds9:true,dc1:'#edf0f2',dc2:'#edf0f2',dc3:'#edf0f2',dc4:'#edf0f2',dc5:'#edf0f2',dc6:'#edf0f2',dc7:'#edf0f2',dc8:'#edf0f2',dc9:'#edf0f2',s1:'',s2:'',s3:'',s4:'',s5:'',s6:'',s7:'',s8:'',s9:'',s10:'',ss1:true,ss2:true,ss3:true,ss4:true,ss5:true,ss6:true,ss7:true,ss8:true,ss9:true,ss10:true,sc1:'#edf0f2',sc2:'#edf0f2',sc3:'#edf0f2',sc4:'#edf0f2',sc5:'#edf0f2',sc6:'#edf0f2',sc7:'#edf0f2',sc8:'#edf0f2',sc9:'#edf0f2',sc10:'#edf0f2',a1:'',a2:'',a3:'',a4:'',a5:'',as1:true,as2:true,as3:true,as4:true,as5:true,ac1:'#edf0f2',ac2:'#edf0f2',ac3:'#edf0f2',ac4:'#edf0f2',ac5:'#edf0f2',History: [],Guesses:[],gtitle:false,
    };
    this.RotateValueHolder = new Animated.Value(0);
  }


  componentDidMount() {
    this.StartImageRotateFunction();
    this.func1();
  }

//func1() will fetch the random word and its definitions, synonims and antonyms

  func1() {

    fetch('http://fourtytwowords.herokuapp.com/words/randomWord?api_key=9e6759e60c71e91458f697bb4773fd5f70c151a3ac21a78745ef83c129217037abbf20f9d7c78a87ce47b962ef973ff938ba32676e4e6623d162cd2c35ce47c7e20ab9c12733be141662f80ce5fe3395',{method: 'GET'})
      .then(response => response.json())
      .then(json => {this.setState({jsonData: json.word,});
      
      var url ='http://fourtytwowords.herokuapp.com/word/' +this.state.jsonData +'/definitions?api_key=9e6759e60c71e91458f697bb4773fd5f70c151a3ac21a78745ef83c129217037abbf20f9d7c78a87ce47b962ef973ff938ba32676e4e6623d162cd2c35ce47c7e20ab9c12733be141662f80ce5fe3395';
        fetch(url, { method: 'GET' })
          .then(response => response.json())
          .then(json => {
            var array=json.map(a => a.text);

            //Jumbling the definitions

            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            this.setState({definition:array,});

          //Getting synonims and antonyms
            var url1="http://fourtytwowords.herokuapp.com/word/"+this.state.jsonData+"/relatedWords?api_key=9e6759e60c71e91458f697bb4773fd5f70c151a3ac21a78745ef83c129217037abbf20f9d7c78a87ce47b962ef973ff938ba32676e4e6623d162cd2c35ce47c7e20ab9c12733be141662f80ce5fe3395";

          fetch(url1, { method: 'GET' })
          .then(response => response.json())
          .then(json => {
          if(json.length>1){
              this.setState({synonim: json[1].words});
              this.setState({antonym: json[0].words});
          }else{
              this.setState({synonim: json[0].words});
          }
          })
          .catch(error => {
            console.error(error);
          });


          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {toValue: 1,duration: 10000,easing: Easing.linear,}).start(() => this.StartImageRotateFunction());
  }



  render() {

    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });


    return (
      
      <View style={{ flex: 1,flexDirection: 'column' }}>

      <Text style={{backgroundColor:"black"}}></Text>

        <View style={{height: 15,marginTop:0,alignItems: 'flex-end',backgroundColor: 'black',}}>
          <Text style={{fontStyle: 'normal', color: 'white' }}>Score: <Text>{score}</Text></Text>
        </View>

        <View style={{height: 130,alignItems: 'center',backgroundColor: 'black',}}>

          <Animated.Image style={{width: 50,height: 50,transform: [{ rotate: RotateData }],}}
            source={{uri:'http://www.kiodev.com/wp-content/uploads/2016/03/react-logo.png',}} />


          <Text style={{ fontStyle: 'normal', fontWeight: 'bold', color: 'white' }}>Guess the Word</Text>

          <TextInput style={{height: 35,width: 180,textAlign: 'center',fontSize: 23,backgroundColor: 'white',}}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            autoCapitalize='characters'
            onSubmitEditing={this._submit}/>
          <Text style={{ margin:5,fontStyle: 'normal', fontSize: 13, color: 'white' }}>{this.state.guess}</Text>
        </View>


        <View style={{flex: 3,flexDirection: 'row',backgroundColor: 'white',}}>


          <ScrollView style={{ flex: 1 }}>

            {this.state.gtitle && <View style={{flexDirection: 'row',backgroundColor:"white"}}>

                <Text style={{margin:5}}>Guesses</Text>

                <FlatList horizontal={true} 
                      data={this.state.Guesses}
                      renderItem={this._renderItem1}
                      keyExtractor={this._keyExtractor1} 
                />
                </View>
            }

            <View style={{backgroundColor: '#c6e06e',borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Free</Text>
              </View>
              <Text style={{ margin: 5 }}>{this.state.definition[0]}</Text>
            </View>

            <View style={{backgroundColor: this.state.col1,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Jumbled Letters</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>10 Pts</Text>
              </View>
            
              {this.state.jshow && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1,width: 75, margin: 5 }} onPress={this.jumbler}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.jshow &&(<Text style={{ margin: 5 }}>Jumbled letters of the word are {this.state.jumble}</Text>)}
            </View>

            <View style={{backgroundColor:this.state.col2,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Word Length</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>4 Pts</Text>
              </View>
              {this.state.wlshow && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
                  onPress={this.length}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.wlshow &&<Text style={{ margin: 5 }}>Length of the word is {this.state.len}</Text>}
            </View>

            <View style={{backgroundColor: this.state.col3,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>First Letter</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.fshow && (<TouchableOpacity style={{ backgroundColor: '#b6b8b7',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
                  onPress={this.forstt}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.fshow &&<Text style={{ margin: 5 }}>It starts with {this.state.first}</Text>}
            </View>


            <View style={{backgroundColor:this.state.col4,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Last Letter</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.lshow && (<TouchableOpacity style={{ backgroundColor:'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
                  onPress={this.seccc}><Text>Reveal Hint</Text></TouchableOpacity>)}
             {!this.state.lshow && <Text style={{ margin: 5 }}>It ends with {this.state.last}</Text>}
            </View>


            <View>
                {this.renderDefines()}
            </View>


             <View>
                {this.renderSynonims()}
            </View>


            <View>
                {this.renderAntonims()}
            </View>


          </ScrollView>



          <ScrollView style={{flex:0.8}}>

            <View style={{alignItems: 'center',  margin: 5 }}>
              <TouchableOpacity style={styles.button} onPress={this.get_new_word}>
                <Text style={{ textAlign: 'center' }}>Get New Word(-4 Pts)</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{alignItems: 'center' }}>
            <Text style={{ fontStyle: 'normal', fontSize: 15, color: 'black' }}>History</Text>
            </View>

             <TouchableOpacity style={{alignItems:"center",height:30,margin: 5,padding: 3,borderRadius: 4,borderWidth: 2,borderColor:'black',flexDirection: 'row',justifyContent: 'space-between',backgroundColor: '#edf0f2'}} 
              onPress={()=>{
               this.setState(presentState);
               i=1;

               }}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Playing...</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>{play}</Text>
              </TouchableOpacity>

            <View>

                <FlatList data={this.state.History} renderItem={this._renderItem} keyExtractor={this._keyExtractor}
                style={{  transform: [{ scaleY: -1 }] }} />

            </View>

            <View style={{alignItems:"center"}}>
              <TouchableOpacity style={styles.button} onPress={this.reset}>
                <Text style={{ textAlign: 'center' }}>Reset Game</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>


        </View>
      </View>
    );
  }

//After submitting the entered word.
  _submit = () => {
    if (this.state.text.toLowerCase() === this.state.jsonData) {
      score += 10;
      play=play+10;
      this.setState({
      Guesses:[
          ...this.state.Guesses,
          {id:play,title:this.state.text,gcol:'lightgreen',}
        ],});
      this.setState({
      History: [
        ...this.state.History, 
        {id:play,title:this.state.jsonData,hcol:'lightgreen',state:this.state}
        ],
        gtitle:true
      });

      
      play=0;
      this.setState({ guess: 'You Guessed it Correct. You got 10 points' });
      setTimeout(this.correct, 1000);
      
    } else {
      score = score - 2;
      play=play-2;
      this.setState({ guess: 'You Guessed it wrong. You lost 2 points' });
      this.setState({
        Guesses:[
          ...this.state.Guesses,
          {id:play,title:this.state.text,gcol:'#fca092'}
        ],
        gtitle:true
      });
      setTimeout(this.wrong, 1000);
    }
  };


  //If the guess is correct
  
  correct = () => {
    this.setState({ text: '', guess: 'Loading next word' });
    this.func1();
    this.setState({
      guess:'',synonim: '',antonym: '',jumble: '',len: 0,first: '',last: '',jshow: true,wlshow: true,fshow: true,lshow: true,col1:'#edf0f2',col2:'#edf0f2',col3:'#edf0f2',col4:'#edf0f2',d1:'',d2:'',d3:'',d4:'',d5:'',d6:'',d7:'',d8:'',d9:'',ds1:true,ds2:true,ds3:true,ds4:true,ds5:true,ds6:true,ds7:true,ds8:true,ds9:true,dc1:'#edf0f2',dc2:'#edf0f2',dc3:'#edf0f2',dc4:'#edf0f2',dc5:'#edf0f2',dc6:'#edf0f2',dc7:'#edf0f2',dc8:'#edf0f2',dc9:'#edf0f2',s1:'',s2:'',s3:'',s4:'',s5:'',s6:'',s7:'',s8:'',s9:'',s10:'',ss1:true,ss2:true,ss3:true,ss4:true,ss5:true,ss6:true,ss7:true,ss8:true,ss9:true,ss10:true,sc1:'#edf0f2',sc2:'#edf0f2',sc3:'#edf0f2',sc4:'#edf0f2',sc5:'#edf0f2',sc6:'#edf0f2',sc7:'#edf0f2',sc8:'#edf0f2',sc9:'#edf0f2',sc10:'#edf0f2',a1:'',a2:'',a3:'',a4:'',a5:'',as1:true,as2:true,as3:true,as4:true,as5:true,ac1:'#edf0f2',ac2:'#edf0f2',ac3:'#edf0f2',ac4:'#edf0f2',ac5:'#edf0f2',Guesses:[],gtitle:false,
    });
  };


//If the user wants to reset the game
reset = () => {
    score=0;
    play=0;
    this.setState({ text: '', guess: '' });
    this.func1();
    this.setState({
      synonim: '',antonym: '',jumble: '',len: 0,first: '',last: '',jshow: true,wlshow: true,fshow: true,lshow: true,col1:'#edf0f2',col2:'#edf0f2',col3:'#edf0f2',col4:'#edf0f2',d1:'',d2:'',d3:'',d4:'',d5:'',d6:'',d7:'',d8:'',d9:'',ds1:true,ds2:true,ds3:true,ds4:true,ds5:true,ds6:true,ds7:true,ds8:true,ds9:true,dc1:'#edf0f2',dc2:'#edf0f2',dc3:'#edf0f2',dc4:'#edf0f2',dc5:'#edf0f2',dc6:'#edf0f2',dc7:'#edf0f2',dc8:'#edf0f2',dc9:'#edf0f2',s1:'',s2:'',s3:'',s4:'',s5:'',s6:'',s7:'',s8:'',s9:'',ss1:true,ss2:true,ss3:true,ss4:true,ss5:true,ss6:true,ss7:true,ss8:true,ss9:true,sc1:'#edf0f2',sc2:'#edf0f2',sc3:'#edf0f2',sc4:'#edf0f2',sc5:'#edf0f2',sc6:'#edf0f2',sc7:'#edf0f2',sc8:'#edf0f2',sc9:'#edf0f2',s10:'',ss10:true,sc10:'#edf0f2',a1:'',a2:'',a3:'',a4:'',a5:'',as1:true,as2:true,as3:true,as4:true,as5:true,ac1:'#edf0f2',ac2:'#edf0f2',ac3:'#edf0f2',ac4:'#edf0f2',ac5:'#edf0f2',History:[],Guesses:[],gtitle:false,
    });
    presentState={};
  };

//if user wants to get new word

get_new_word = () => {
    score=score-4;
    play=play-4;
    this.setState({
      History: [
        ...this.state.History, 
        {id:play,title:this.state.jsonData,hcol:'#fca092',state:this.state}
        ]
      });
    play=0;
    this.setState({ text: '', guess: '' });
    this.func1();
    this.setState({
      synonim: '',antonym: '',jumble: '',len: 0,first: '',last: '',jshow: true,wlshow: true,fshow: true,lshow: true,col1:'#edf0f2',col2:'#edf0f2',
col3:'#edf0f2',col4:'#edf0f2',d1:'',d2:'',d3:'',d4:'',d5:'',d6:'',d7:'',d8:'',d9:'',ds1:true,ds2:true,ds3:true,ds4:true,ds5:true,ds6:true,ds7:true,ds8:true,ds9:true,dc1:'#edf0f2',dc2:'#edf0f2',dc3:'#edf0f2',dc4:'#edf0f2',dc5:'#edf0f2',dc6:'#edf0f2',dc7:'#edf0f2',dc8:'#edf0f2',dc9:'#edf0f2',s1:'',s2:'',s3:'',s4:'',s5:'',s6:'',s7:'',s8:'',s9:'',ss1:true,ss2:true,ss3:true,ss4:true,ss5:true,ss6:true,ss7:true,ss8:true,ss9:true,sc1:'#edf0f2',sc2:'#edf0f2',sc3:'#edf0f2',sc4:'#edf0f2',sc5:'#edf0f2',sc6:'#edf0f2',sc7:'#edf0f2',sc8:'#edf0f2',sc9:'#edf0f2',s10:'',ss10:true,sc10:'#edf0f2',a1:'',a2:'',a3:'',a4:'',a5:'',as1:true,as2:true,as3:true,as4:true,as5:true,ac1:'#edf0f2',ac2:'#edf0f2',ac3:'#edf0f2',ac4:'#edf0f2',ac5:'#edf0f2',Guesses:[],gtitle:false,
    });
    
  };


//If the guess is wrong

  wrong = () => {
    this.setState({ text: '', guess: '' });
  };

//Jumbled letters of the word
  jumbler = () => {
    var str = this.state.jsonData;
    var shuffled = str.split('').sort(function() {return 0.5 - Math.random();}).join('-');
    this.setState({ jshow: false });
    score = score - 10;
    play=play-10;
    this.setState({ jumble: "'"+shuffled.toUpperCase()+"'",col1:'#c6e06e'});
  };

//Length of the word

  length = () => {
    this.setState({ wlshow: false });
    score = score - 4;
    play=play-4;
    this.setState({ len: this.state.jsonData.length,col2:'#c6e06e' });
  };

//First letter of the word

  forstt = () => {
    this.setState({ fshow: false });
    score = score - 3;
    play=play-3;
    this.setState({ first: this.state.jsonData[0],col3:'#c6e06e' });
  };

//Last letter of the word

  seccc = () => {
    this.setState({ lshow: false });
    score = score - 2;
    play=play-2;
    this.setState({ last: this.state.jsonData.slice(-1),col4:'#c6e06e' });
  };

//Rendering definitions

  renderDefines = () => {
      const Defines = [];
      for( var i = 1; i < this.state.definition.length; i++) {
        if(i==1){
          Defines.push(
          <View style={{backgroundColor:this.state.dc1,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds1 && (<TouchableOpacity style={{backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.defffie1}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds1 &&<Text style={{ margin: 5 }}>{this.state.d1}</Text>}
            </View>
          
        )
        }
       else if(i==2){
          Defines.push(
          <View style={{backgroundColor:this.state.dc2,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds2 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.defffie2}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds2 &&<Text style={{ margin: 5 }}>{this.state.d2}</Text>}
            </View>
          
        )
        }
        else if(i==3){
          Defines.push(
          <View style={{backgroundColor:this.state.dc3,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds3 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie3}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds3 &&<Text style={{ margin: 5 }}>{this.state.d3}</Text>}
            </View>
          
        )
        }
        else if(i==4){
          Defines.push(
          <View style={{backgroundColor:this.state.dc4,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds4 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie4}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds4 &&<Text style={{ margin: 5 }}>{this.state.d4}</Text>}
            </View>
          
        )
        }
        else if(i==5){
          Defines.push(
          <View style={{backgroundColor:this.state.dc5,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds5 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie5}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds5 &&<Text style={{ margin: 5 }}>{this.state.d5}</Text>}
            </View>
          
        )
        }
        else if(i==6){
          Defines.push(
          <View style={{backgroundColor:this.state.dc6,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds6 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie6}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds6 &&<Text style={{ margin: 5 }}>{this.state.d6}</Text>}
            </View>
          
        )
        }
        else if(i==7){
          Defines.push(
          <View style={{backgroundColor:this.state.dc7,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds7 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie7}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds7 &&<Text style={{ margin: 5 }}>{this.state.d7}</Text>}
            </View>
          
        )
        }
        else if(i==8){
          Defines.push(
          <View style={{backgroundColor:this.state.dc8,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds8 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie8}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds8 &&<Text style={{ margin: 5 }}>{this.state.d8}</Text>}
            </View>
          
        )
        }
        else if(i==9){
          Defines.push(
          <View style={{backgroundColor:this.state.dc9,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Definition</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ds9 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }}
              onPress={this.defffie9}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ds9 &&<Text style={{ margin: 5 }}>{this.state.d9}</Text>}
            </View>
          
        )
        }
        
      }
  return Defines;
}


//Rendering Synonims

 renderSynonims = () => {
      const Syns = [];
      for( var i = 1; i <= this.state.synonim.length; i++) {
        if(i==1){
          Syns.push(
          <View style={{backgroundColor:this.state.sc1,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss1 && (<TouchableOpacity style={{backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni1}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss1 &&<Text style={{ margin: 5 }}>{this.state.s1}</Text>}
            </View>
          
        )
        }
       else if(i==2){
          Syns.push(
          <View style={{backgroundColor:this.state.sc2,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss2 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni2}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss2 &&<Text style={{ margin: 5 }}>{this.state.s2}</Text>}
            </View>
          
        )
        }
        else if(i==3){
          Syns.push(
          <View style={{backgroundColor:this.state.sc3,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss3 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synonim3}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss3 &&<Text style={{ margin: 5 }}>{this.state.s3}</Text>}
            </View>
          
        )
        }
        else if(i==4){
          Syns.push(
          <View style={{backgroundColor:this.state.sc4,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss4 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni4}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss4 &&<Text style={{ margin: 5 }}>{this.state.s4}</Text>}
            </View>
          
        )
        }
        else if(i==5){
          Syns.push(
          <View style={{backgroundColor:this.state.sc5,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss5 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni5}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss5 &&<Text style={{ margin: 5 }}>{this.state.s5}</Text>}
            </View>
          
        )
        }
        else if(i==6){
          Syns.push(
          <View style={{backgroundColor:this.state.sc6,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss6 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni6}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss6 &&<Text style={{ margin: 5 }}>{this.state.s6}</Text>}
            </View>
          
        )
        }
        else if(i==7){
          Syns.push(
          <View style={{backgroundColor:this.state.sc7,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss7 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni7}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss7 &&<Text style={{ margin: 5 }}>{this.state.s7}</Text>}
            </View>
          
        )
        }
        else if(i==8){
          Syns.push(
          <View style={{backgroundColor:this.state.sc8,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.ss8 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni8}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss8 &&<Text style={{ margin: 5 }}>{this.state.s8}</Text>}
            </View>
          
        )
        }
        else if(i==9){
          Syns.push(
          <View style={{backgroundColor:this.state.sc9,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss9 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni9}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss9 &&<Text style={{ margin: 5 }}>{this.state.s9}</Text>}
            </View>
          
        )
        }


        else if(i==10){
          Syns.push(
          <View style={{backgroundColor:this.state.sc10,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Synonim</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>2 Pts</Text>
              </View>
              {this.state.ss10 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.synoni10}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.ss10 &&<Text style={{ margin: 5 }}>{this.state.s10}</Text>}
            </View>
          
        )
        }
        
      }
  return Syns;
}

//Rendering antonyms

 renderAntonims = () => {
      const Antonis = [];
      for( var i = 1; i <= this.state.antonym.length; i++) {
        if(i==1){
          Antonis.push(
          <View style={{backgroundColor:this.state.ac1,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Antonym</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.as1 && (<TouchableOpacity style={{backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.anoni1}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.as1 &&<Text style={{ margin: 5 }}>{this.state.a1}</Text>}
            </View>
          
        )
        }
       else if(i==2){
          Antonis.push(
          <View style={{backgroundColor:this.state.ac2,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Antonym</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.as2 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.anoni2}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.as2 &&<Text style={{ margin: 5 }}>{this.state.a2}</Text>}
            </View>
          
        )
        }
        else if(i==3){
          Antonis.push(
          <View style={{backgroundColor:this.state.ac3,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Antonym</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.as3 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.anoni3}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.as3 &&<Text style={{ margin: 5 }}>{this.state.a3}</Text>}
            </View>
          
        )
        }
        else if(i==4){
         Antonis.push(
          <View style={{backgroundColor:this.state.ac4,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Antonym</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.as4 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.anoni4}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.as4 &&<Text style={{ margin: 5 }}>{this.state.a4}</Text>}
            </View>
          
        )
        }
        else if(i==5){
          Antonis.push(
          <View style={{backgroundColor:this.state.ac5,borderRadius: 6,margin: 6,}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',margin: 5,}}>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>Antonym</Text>
                <Text style={{ fontStyle: 'normal', color: 'black' }}>3 Pts</Text>
              </View>
              {this.state.as5 && (<TouchableOpacity style={{ backgroundColor: 'silver',borderWidth:1,borderColor:'black',borderRadius:1, width: 75, margin: 5 }} onPress={this.anoni5}><Text>Reveal Hint</Text></TouchableOpacity>)}
              {!this.state.as5 &&<Text style={{ margin: 5 }}>{this.state.a5}</Text>}
            </View>
          
        )
        }
        
      }
  return Antonis;
}



//Definitions functions

 defffie1 = () => {
    this.setState({ds1:false});
    score = score - 3;
    play=play-3;
    this.setState({d1:this.state.definition[1],dc1:'#c6e06e'});
  };

  defffie2 = () =>{
    this.setState({ds2:false});
    score = score - 3;
    play=play-3;
    this.setState({d2:this.state.definition[2],dc2:'#c6e06e'});   
  };

  defffie3 = () =>{
    this.setState({ds3:false});
    score = score - 3;
    this.setState({d3:this.state.definition[3],dc3:'#c6e06e'});   
  };

  defffie4 = () =>{
    this.setState({ds4:false});
    score = score - 3;
    play=play-3;
    this.setState({d4:this.state.definition[4],dc4:'#c6e06e'});   
  };
  defffie5 = () =>{
    this.setState({ds5:false});
    score = score - 3;
    this.setState({d5:this.state.definition[5],dc5:'#c6e06e'});   
  };

  defffie6 = () =>{
    this.setState({ds6:false});
    score = score - 3;
    play=play-3;
    this.setState({d6:this.state.definition[6],dc6:'#c6e06e'});   
  };

  defffie7 = () =>{
    this.setState({ds7:false});
    score = score - 3;
    play=play-3;
    this.setState({d7:this.state.definition[7],dc7:'#c6e06e'});   
  };

  defffie8 = () =>{
    this.setState({ds8:false});
    score = score - 3;
    play=play-3;
    this.setState({d8:this.state.definition[8],dc8:'#c6e06e'});   
  };

  defffie9 = () =>{
    this.setState({ds9:false});
    score = score - 3;
    play=play-3;
    this.setState({d9:this.state.definition[9],dc9:'#c6e06e'});   
  };


//Synonims functions

  synoni1 = () => {
    this.setState({ss1:false});
    score = score - 2;
    play=play-2;
    this.setState({s1:this.state.synonim[0],sc1:'#c6e06e'});
  };

  synoni2 = () =>{
    this.setState({ss2:false});
    score = score - 2;
    play=play-2;
    this.setState({s2:this.state.synonim[1],sc2:'#c6e06e'});   
  };

  synonim3 = () =>{
    this.setState({ss3:false});
    score = score - 2;
    play=play-2;
    this.setState({s3:this.state.synonim[2],sc3:'#c6e06e'});   
  };

  synoni4 = () =>{
    this.setState({ss4:false});
    score = score - 2;
    play=play-2;
    this.setState({s4:this.state.synonim[3],sc4:'#c6e06e'});   
  };
  synoni5 = () =>{
    this.setState({ss5:false});
    score = score - 2;
    play=play-2;
    this.setState({s5:this.state.synonim[4],sc5:'#c6e06e'});   
  };

  synoni6 = () =>{
    this.setState({ss6:false});
    score = score - 2;
    play=play-2;
    this.setState({s6:this.state.synonim[5],sc6:'#c6e06e'});   
  };

  synoni7 = () =>{
    this.setState({ss7:false});
    score = score - 2;
    play=play-2;
    this.setState({s7:this.state.synonim[6],sc7:'#c6e06e'});   
  };

  synoni8 = () =>{
    this.setState({ss8:false});
    score = score - 2;
    play=play-2;
    this.setState({s8:this.state.synonim[7],sc8:'#c6e06e'});   
  };

  synoni9 = () =>{
    this.setState({ss9:false});
    score = score - 2;
    play=play-2;
    this.setState({s9:this.state.synonim[8],sc9:'#c6e06e'});   
  };

 synoni10 = () =>{
    this.setState({ss10:false});
    score = score - 2;
    play=play-2;
    this.setState({s10:this.state.synonim[9],sc10:'#c6e06e'});   
  };


//Antonyms functions

  anoni1 = () => {
    this.setState({as1:false});
    score = score - 3;
    play=play-3;
    this.setState({a1:this.state.antonym[0],ac1:'#c6e06e'});
  };

  anoni2 = () =>{
    this.setState({as2:false});
    score = score - 3;
    play=play-3;
    this.setState({a2:this.state.antonym[1],ac2:'#c6e06e'});   
  };

  anoni3 = () =>{
    this.setState({as3:false});
    score = score - 3;
    play=play-3;
    this.setState({a3:this.state.antonym[2],ac3:'#c6e06e'});   
  };

  anoni4 = () =>{
    this.setState({as4:false});
    score = score - 3;
    play=play-3;
    this.setState({a4:this.state.antonym[3],ac4:'#c6e06e'});   
  };
  anoni5 = () =>{
    this.setState({as5:false});
    score = score - 3;
    play=play-3;
    this.setState({a5:this.state.antonym[4],ac5:'#c6e06e'});   
  };



//List View of History

  _renderItem = ({ item }) => (

  <TouchableOpacity style={{alignItems:"center",height:30,margin: 5,padding: 3,borderRadius: 4,flexDirection: 'row',justifyContent: 'space-between',backgroundColor:item.hcol,transform: [{ scaleY: -1 }] }} onPress={() =>{
    if(i==1){
    presentState=this.state;
    i=i+1;
    }
var coll;
var str = item.state.jsonData;
var shuffled = str.split('').sort(function() {return 0.5 - Math.random();}).join('-');
if(item.hcol == "lightgreen"){
  coll="lightgreen";
  

          this.setState({text:item.state.text,jsonData:item.state.jsonData,guess:item.state.guess,definition:item.state.definition,synonim:item.state.synonim,antonym:item.state.antonym,jumble:"'"+shuffled.toUpperCase()+"'",len:item.state.jsonData.length,first:item.state.jsonData[0],last:item.state.jsonData.slice(-1),jshow:false,wlshow:false,fshow:false,lshow:false, col1:item.state.col1,col2:item.state.col2,col3:item.state.col3,col4:item.state.col4,d1:item.state.definition[1],d2:item.state.definition[2],d3:item.state.definition[3],d4:item.state.definition[4],d5:item.state.definition[5],d6:item.state.definition[6],d7:item.state.definition[7],d8:item.state.definition[8],d9:item.state.definition[9],ds1:false,ds2:false,ds3:false,ds4:false,ds5:false,ds6:false,ds7:false,ds8:false,ds9:false,dc1:item.state.dc1,dc2:item.state.dc2,dc3:item.state.dc3,dc4:item.state.dc4,dc5:item.state.dc5,dc6:item.state.dc6,dc7:item.state.dc7,dc8:item.state.dc8,dc9:item.state.dc9,s1:item.state.synonim[0],s2:item.state.synonim[1],s3:item.state.synonim[2],s4:item.state.synonim[3],s5:item.state.synonim[4],s6:item.state.synonim[5],s7:item.state.synonim[6],s8:item.state.synonim[7],s9:item.state.synonim[8],s10:item.state.synonim[9],ss1:false,ss2:false,ss3:false,ss4:false,ss5:false,ss6:false,ss7:false,ss8:false,ss9:false,ss10:false,sc1:item.state.sc1,sc2:item.state.sc2,sc3:item.state.sc3,sc4:item.state.sc4,sc5:item.state.sc5,sc6:item.state.sc6,sc7:item.state.sc7,sc8:item.state.sc8,sc9:item.state.sc9,sc10:item.state.sc10,a1:item.state.antonym[0],a2:item.state.antonym[1],a3:item.state.antonym[2],a4:item.state.antonym[3],a5:item.state.antonym[4],as1:false,as2:false,as3:false,as4:false,as5:false,ac1:item.state.ac1,ac2:item.state.ac2,ac3:item.state.ac3,ac4:item.state.ac4,ac5:item.state.ac5,
                  History: [
                    ...this.state.History,
                  ],
                  Guesses:[
                    ...item.state.Guesses,
                    {id:play,title:item.title,gcol:coll,}
                  ],
                  gtitle:true,
                  });
  

}else{
  coll="#fca092";

          this.setState({text:item.state.text,jsonData:item.state.jsonData,guess:item.state.guess,definition:item.state.definition,synonim:item.state.synonim,antonym:item.state.antonym,jumble:"'"+shuffled.toUpperCase()+"'",len:item.state.jsonData.length,first:item.state.jsonData[0],last:item.state.jsonData.slice(-1),jshow:false,wlshow:false,fshow:false,lshow:false, col1:item.state.col1,col2:item.state.col2,col3:item.state.col3,col4:item.state.col4,d1:item.state.definition[1],d2:item.state.definition[2],d3:item.state.definition[3],d4:item.state.definition[4],d5:item.state.definition[5],d6:item.state.definition[6],d7:item.state.definition[7],d8:item.state.definition[8],d9:item.state.definition[9],ds1:false,ds2:false,ds3:false,ds4:false,ds5:false,ds6:false,ds7:false,ds8:false,ds9:false,dc1:item.state.dc1,dc2:item.state.dc2,dc3:item.state.dc3,dc4:item.state.dc4,dc5:item.state.dc5,dc6:item.state.dc6,dc7:item.state.dc7,dc8:item.state.dc8,dc9:item.state.dc9,s1:item.state.synonim[0],s2:item.state.synonim[1],s3:item.state.synonim[2],s4:item.state.synonim[3],s5:item.state.synonim[4],s6:item.state.synonim[5],s7:item.state.synonim[6],s8:item.state.synonim[7],s9:item.state.synonim[8],s10:item.state.synonim[9],ss1:false,ss2:false,ss3:false,ss4:false,ss5:false,ss6:false,ss7:false,ss8:false,ss9:false,ss10:false,sc1:item.state.sc1,sc2:item.state.sc2,sc3:item.state.sc3,sc4:item.state.sc4,sc5:item.state.sc5,sc6:item.state.sc6,sc7:item.state.sc7,sc8:item.state.sc8,sc9:item.state.sc9,sc10:item.state.sc10,a1:item.state.antonym[0],a2:item.state.antonym[1],a3:item.state.antonym[2],a4:item.state.antonym[3],a5:item.state.antonym[4],as1:false,as2:false,as3:false,as4:false,as5:false,ac1:item.state.ac1,ac2:item.state.ac2,ac3:item.state.ac3,ac4:item.state.ac4,ac5:item.state.ac5,
              History: [
                ...this.state.History,
              ],
              Guesses:[
                ...item.state.Guesses,
              ],
              gtitle:item.state.gtitle,
              });
  }
  }}>
    <Text style={{ fontStyle: 'normal', color: 'black' }}>{item.title}</Text>
    <Text style={{ fontStyle: 'normal', color: 'black' }}>{item.id}</Text>
  </TouchableOpacity>
  );


//List view of Guesses

  _renderItem1 = ({ item }) => (
    <View style={{margin:4,backgroundColor:item.gcol,borderRadius:4}}>
        <Text style={{ fontStyle: 'normal', color: 'black' }}>{item.title}</Text>
    </View>
  );

  _keyExtractor = (item, index) => item.id;
  _keyExtractor1 = (item, index) => item.id;


}

//StyleSheet
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'pink',
    margin: 5,
    borderRadius: 3,
    alignItems: 'center',
  },
});
