import {useRef, useState} from 'react';
import send from '../public/send.svg';
import axios from "axios";
import './App.css'

const YOU = "you";
const AI = "ai";
function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState([false]);

  const updateQna = (from, value) => {
      setQna((qna) => [...qna, {from, value}]);
  }
  const handleSend = () => {
      const question = inputRef.current.value;
      updateQna(YOU, question);
      setLoading(true);
      axios.post("http://localhost:3080/chat", {
          question,
      }).then((response) => {
         updateQna(AI, response.data.answer);
      }).finally(() => {
          setLoading(false);
      });
  };

  const renderContext = (qna) => {
      const value = qna.value;
      if (Array.isArray(value)){
          return value.map((v) => <p className="message-text">{v}</p>)
      }
      return <p className="message-text">{value}</p>;
  }

  return (
      <main className="container">
        <div className="chats">
            {
                qna.map(qna => {
                    if(qna.from === YOU){
                        return (
                            <div className="send chat">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                                    alt=""
                                    className="avtar"
                                />
                                <p>{renderContext(qna)}</p>
                            </div>
                        )
                    }
                    return (
                    <div className="recieve chat">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                            alt=""
                            className="avtar"
                        />
                        <p>{renderContext(qna)}</p>
                    </div>
                    );
                })}
            {loading && (
                <div className="recieve chat">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                        alt=""
                        className="avtar"
                    />
                    <p>Waiting For Response......</p>
                </div>
            )}
        </div>

        <div className="chat-input">
          <input
              type="text"
              ref={inputRef}
              className="form-control col"
              placeholder="Ask us anything......"
          />
            <button className="btn btn-success" onClick={handleSend}>
                <img className="sendbutton" src={send} alt=""/>
            </button>
        </div>
      </main>
  )
}

export default App
