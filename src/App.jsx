import {useState} from "react";


const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

//===================================Button
function Button ({children , onClick}){

    return(
        <button className='button' onClick={onClick}>{children}</button>
    )
}

//====================APP======================
function App() {
    const[friends, setFriends]=useState(initialFriends)
    const [show, setShow] =useState(false)
    const [selectedFriend,setSelectedFriend]=useState(null)


function showHandle () {
    setShow(!show)
}
//push new object from FORM component to initial friend object
function handelAddFriends(friendObj){
        setFriends(friends=>[...friends , friendObj])
        setShow(false)
    }

    function handleSelection (friend) {
        // setSelectedFriend(friend);
        setSelectedFriend((cur)=>cur?.id === friend.id ? null : friend)
    setShow(false)

    }


  return (
    <>
      <div className='app'>
          <div className='sidebar'>

        <FriendList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelection={handleSelection}

        />
              {show &&
                  <FormAddFriend onAddFriend={handelAddFriends}  />
              }

              <Button onClick={showHandle}>{show ? 'Close' : 'Add Friend' }</Button>
          </div>
          {selectedFriend &&

          <FormSplitBill selectedFriend={selectedFriend}/>
          }


          </div>
    </>
  )
}
export default App

//=======================friend list
function FriendList ({friends ,onSelection , selectedFriend}) {

    return(
        <ul>
            {friends.map((friend)=> (
                <Friend
                    onSelection={onSelection}
                    selectedFriends={selectedFriend}
                    friend={friend}
                    key={friend.id}/>
            ))}
        </ul>
    )
}
//==========================friend
function Friend ({friend , onSelection , selectedFriends}) {

     const isSelected = selectedFriends?.id === friend.id;


    return (
        <li className={isSelected ? 'selected' : ''}>

            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}$</p>
            )}


            {friend.balance > 0 && (
                <p className='green'>{friend.name} owes you {friend.balance}$</p>
            )}

            {friend.balance === 0 && (
                <p>You and {friend.name} are even.</p>
            )}
      <Button onClick={()=> onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
        </li>
            )

}

//=============================================*********------------------FormAddFriend
function FormAddFriend ({onAddFriend}) {

    const [name, setName] =useState('')
    const [image,setImage] = useState('https://i.pravatar.cc/48')
    function handleSubmit(e) {
        e.preventDefault()
        if (!name || !image)return;
        const id= crypto.randomUUID();

        const newFriend={
            id,
            name,
            image:`${image}?=${id}`,
            balance:0,

        }
        onAddFriend(newFriend)
        setName('')
        setImage('https://i.pravatar.cc/48')

    }

    return(
        <form className='form-add-friend' onSubmit={handleSubmit}>
            <label> Friend name:</label>
            <input type="text"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   />
            <label> Image URL:</label>
            <input type="text"
                   value={image}
                   onChange={(e)=>setImage(e.target.value)}/>

            <Button>Add</Button>

        </form>
    )
}

//======================================Form split bill

function FormSplitBill ({selectedFriend}) {

    const [bill, setBill] =useState('')
    const [payByUser, setPayByUser] =useState('')
    const paidByFriend= bill ?  bill - payByUser :'';

    const [whoIsPaying, setWhoIsPaying] =useState('user')


    return(
        <form className='form-split-bill'>
            <h2>Split a bill with{selectedFriend.name}</h2>


            <label>bill value</label>
            <input type="text"
            value={bill}
                   onChange={(e)=>setBill(Number(e.target.value))}
            />

            <label>Your expense</label>
            <input type="text"
            value={payByUser}
                   onChange={(e)=>setPayByUser(
                       Number(e.target.value) > bill ? payByUser :
                                Number(e.target.value)
                   )}
            />

            <label>☕{selectedFriend.name}expense</label>
            <input disabled type="text" value={paidByFriend}/>

            <label>🙄who is paying the bill</label>
            <select
            value={whoIsPaying}
            onChange={(e)=>setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>


            <Button>Split bill</Button>
        </form>
    )
}



























