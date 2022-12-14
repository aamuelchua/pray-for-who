import React,{useState} from 'react';
import './App.css';

function App() {
  const [namelist, setNamelist] = useState("")
  const [newNames, setNewNames] = useState([])
  const [showingState, setShowingState] = useState('input')

  const submitButton = () =>{
    var newNameList = namelist.split("\n")
    //shuffle newNameList
    for(var i = 0; i < newNameList.length; i++){
      var randomIndex = Math.floor(Math.random() * newNameList.length)
      var temp = newNameList[i]
      newNameList[i] = newNameList[randomIndex]
      newNameList[randomIndex] = temp
    }

    setNewNames(newNameList)
    localStorage.setItem('history', newNameList)
    setShowingState('list')
  }

  const copyToClipboard = () =>{
    var copyText = document.getElementById("final");

    /* Select the text field */
    copyText.select(); 
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.innerText);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.innerText);
  }

  const handleHistory = () =>{
    var history = localStorage.getItem('history').replaceAll(',', '\n')
    setNamelist(history)
  }

  return (
    <>
    {showingState === 'input' ?
      <div className='App'>
        <h1 style={{fontSize:45}}>Pray for Who?</h1>
        <p>Input the names for those who are present!</p>
        <textarea className="textarea" value={namelist} onChange={(value)=>setNamelist(value.target.value)} placeholder={"e.g. \nJohn\nJasper\nJames\nJuly\nJune"}></textarea>
        <button clasName="button" onClick={submitButton}>Generate List!</button>

        {localStorage.getItem('history')?<>
        <h2 style={{width:"100%",textAlign:"center",marginBottom:"0px",marginTop:"50px"}}>Recent Prayer List</h2>
        <div className="history">
          {localStorage.getItem('history') ? 
          <div className="historyItem">
            <button className={'historyItemButton'} onClick={()=>handleHistory()}>
              <p>{localStorage.getItem('history').replaceAll(','," -> ")}</p>
            </button>
          </div>
           :null}
        </div>
        </>:null}
      </div>
      
    :
      <div className='App'>
        <h1>Pray for Who?</h1>
        <a onClick={copyToClipboard}><h2 id='final'>{newNames.join(' -> ')} {' -> '} {newNames[0]} </h2></a>
        <p>*click the names to copy*</p>
        <button className="button" onClick={()=>setShowingState('input')}>Generate New List!</button>
      </div>
    }
    
    </>
  )
}

export default App;
