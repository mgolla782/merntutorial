import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listofFriends, setListofFriends] = useState([]);

  const addFriend = () => {
    axios.post('https://merntutorial-app.herokuapp.com/addfriend', { "name": name, "age": age }).then((result) => {
      setListofFriends([...listofFriends, { _id: result.data._id, name: name, age: age }]);
      console.log(result.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const updateFriend =(id) => {
    const newAge = prompt("enter new age");

    axios.put('https://merntutorial-app.herokuapp.com/update',{newAge: newAge, id: id}).then(() => {
      setListofFriends(listofFriends.map((val) => {
        return val._id === id ? {_id: id, name: name, age: newAge} : val;
      }));
    });  
  }

  const deleteFriend = (id) => {

    axios.delete(`https://merntutorial-app.herokuapp.com/delete/${id}`).then(() => {
      setListofFriends(listofFriends.filter((val) => {
        return val._id !== id;
      }));
    });  
  }

  useEffect(() => {
    axios.get('https://merntutorial-app.herokuapp.com/read').then((response) => {
      console.log(response.data);
      setListofFriends(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);


  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder='friend name..' value={name} onChange={(e) => { setName(e.target.value) }} />
        <input type="number" placeholder='friend age..' value={age} onChange={(e) => { setAge(e.target.value) }} />
        <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className="listOfFriends">
        {listofFriends.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3> Age: {val.age}</h3>
              </div>
              <button onClick={()=> {
                updateFriend(val._id)
              }}>Update</button>
              <button id="removeBtn" onClick={()=> {
                deleteFriend(val._id)
              }}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
