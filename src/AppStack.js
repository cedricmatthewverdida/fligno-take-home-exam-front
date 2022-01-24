import React, { useContext, useState, useEffect, useRef  } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from "./AuthProvider";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import {
  Button,
  Title,
  Paragraph,
  Card,
  Appbar,
  FAB,
  TextInput
} from 'react-native-paper';

import axios from 'axios';


const Stack = createNativeStackNavigator();
let toEdit = []


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function DashboardScreen({ navigation }) {


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetchPost()
  }, [refreshing]);


  const { user, logout } = useContext(AuthContext)
  const [name, setName] = useState(null);
  const [currentuser, setUser] = useState([]);
  const [post, setPost] = useState([]);

  function deletePost (id){
    axios.delete('http://10.0.2.2:8000/api/post/'+id)
    .then(response => {
      alert("Post Deleted!")
      fetchPost()
    })
    .catch(error => {
      alert('Failed to delete')
    })
  }

  function fetchPost (){
    axios.get('http://10.0.2.2:8000/api/post')
    .then(response => {
      setPost(response.data.data);
      console.log(response.data.data);
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  useEffect(() => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('http://10.0.2.2:8000/api/user')
    .then(response => {
        setName(response.data.auth.name);
        setUser(response.data.auth)

    })
    .catch(error => {
      console.log(error.response);
    })


    fetchPost()

  }, []);

  return (

    <SafeAreaView style={styles.container}>

      <Appbar.Header
      style={{backgroundColor:'white'}}
      >
        <Appbar.Content title="Welcome" subtitle={name} />

        <Appbar.Action icon="logout" onPress={() => logout()} />

      </Appbar.Header>
      


      <ScrollView
      style={styles.scrollView}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

      >
        <View style={{padding:5}}>
          {
            post.map((prop, key) => {
                return (
                  <Card key={key} style={{marginTop:20, borderRadius: 20, elevation: 2}}>
                    <Card.Content>
                      <Title>{prop.title}</Title>
                      <Paragraph>{prop.body}</Paragraph>
                    </Card.Content>
                    <Card.Actions>

                    {
                    currentuser.role == 'admin' && 
                    <Button
                    onPress={() => {
                    navigation.navigate('Admin');
                    toEdit = prop;
                    }}
                    >
                    Edit
                    </Button>
                    }

                    {
                    currentuser.role == 'admin' && 
                    <Button
                    onPress={() =>
                    Alert.alert('Deleting this post','Do you want to delete',[
                      {
                      text:'Confirm', onPress: () =>  deletePost(prop.id)
                      },
                      {text:'No'}
                    ])
                    }
                    >
                    Delete</Button>
                    }

                  </Card.Actions>
                  </Card>
                );
            })
          }
        </View>

      </ScrollView>


      {
        currentuser.role == 'admin' && 
        <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Admin')}
        />
      }
      



    </SafeAreaView>
    

    
  );
}


function Admin({ navigation }) {

  
  const { user, logout } = useContext(AuthContext)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  
  return (

    <KeyboardAvoidingView
        style={styles.containeradmin}
        behavior={Platform.OS === "ios" ? "padding" : null}
    >
        <View style={styles.inputContainer}>
            
            <TextInput
                label="Title"
                placeholder="Policy Title"
                style={styles.input}
                mode="outlined"
                value={title}
                onChangeText={text => setTitle(text)}
            ></TextInput>

            

            <TextInput
                label="Description"
                placeholder="Policy Description"
                style={styles.input}
                multiline
                mode="outlined"
                value={description}
                onChangeText={text => setDescription(text)}
            ></TextInput>

            <View style={styles.buttonContainer}>


                <Button
                mode="contained"
                style={styles.button}
                onPress={() => postOption(title, description)}
                >
                    {toEdit.length == 0 ? "Create" : "Update"}
                </Button>

                {
                  toEdit.length != 0 &&

                  <TouchableOpacity
                      onPress={() => {
                      navigation.navigate('Dashboard');
                      toEdit = [];
                      }}
                      style={{backgroundColor:'white',marginTop:30}}
                  >
                      <Text style={styles.buttonOutlineText}>Cancel Update</Text>
                  </TouchableOpacity>
                }
            
                
            </View>


        </View>

    </KeyboardAvoidingView>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={ {headerShown : false}} name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  fab2 : {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
  },

  containeradmin:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    textTitle:{
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center'
    },

    inputContainer:{
        marginTop: 5,
        width: '80%'
    },

    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop:5,
        backgroundColor: '#f3f3f3'
    },

    buttonContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    button:{
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },

    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderRightColor: '#0782F9',
        borderWidth: 2,
    },

    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },

    buttonOutlineText:{
        color: 'black',
        fontWeight: '700',
        fontSize: 16
    }

});

function postOption(title,description){
  if(toEdit.length == 0){
    createPost(title,description)
  }else{
    updatePost(toEdit.id,title,description)
  }

}


function createPost (title,description){
  if(title.trim() != '' && description.trim() != ''){
    axios.post('http://10.0.2.2:8000/api/post',{
      title: title,
      body: description
    })
      .then(response => {
        alert("Policy Created")
      })
      .catch(error => {
        alert("Failed to Create")
    })
  }else{
    alert("Empty Fields")
  }
}

function updatePost (id,title,description){
  if(title.trim() != '' && description.trim() != ''){
    console.log(id);
    axios.put('http://10.0.2.2:8000/api/post/'+id,{
      title: title,
      body: description
    })
      .then(response => {
        alert("Policy Updated")
      })
      .catch(error => {
        alert(error)
        console.log(error);
    })
  }else{
    alert("Empty Fields")
  }
}