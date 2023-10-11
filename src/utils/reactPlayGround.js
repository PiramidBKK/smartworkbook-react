import Popup from "reactjs-popup";

export default function Modal(){
    return(
      <Popup 
      trigger={<button>Open</button>}
      modal
      nested
      >
        {close =>{
          <button onClick={close}>&times;</button>
        }}
        <div className="hello">
          Hello
        </div>
      </Popup>

    )
}