import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal2IsOpen, setIsOpen2] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(1);
  const [frequencyArray, setFrequencyArray] = useState([]);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    if (currentPlaying < 5) {
      setCurrentPlaying(currentPlaying + 1);
    }

    if (currentPlaying === 5) {
      setIsOpen2(true);
    }
  }
  function closeModa2l() {
    setIsOpen2(false);
  }
  function SetArrayData(id) {
    console.log(
      `current song playing: ${currentPlaying}-----------button-id:  ${id}`
    );
    frequencyArray.push({
      song: currentPlaying,
      id: id,
    });
    setFrequencyArray(frequencyArray);
  }

  function func() {
    closeModal();
    SetArrayData(window.event.target.id);
  }
  function frequencyCalculator() {
    let freq1 = 0;
    let freq2 = 20000;
    let zeroCount = 0;
    for (let i = 0; i < frequencyArray.length; i++) {
      if (frequencyArray[i].id === "1" && i === 0) {
        freq1 = 200;
      }
      if (frequencyArray[i].id === "1" && i !== 0 && freq1 === 0) {
        freq1 = 4000 * i;
      }

      if (frequencyArray[i].id === "1") {
        freq2 = i * 4000 + 4000;
      }
      if (frequencyArray[i].id === "0") {
        zeroCount++;
      }
    }
    if (zeroCount === frequencyArray.length) {
      return "0 Hz";
    }
    const text1 = ` ${freq1} Hz to ${freq2} Hz`;
    return text1;
  }
  return (
    <div className="App service-card">
      <header className="App-header">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h3>Did you hear the sound?</h3>
            <div>
              <button id="1" className="Action action1" onClick={func}>
                Yes
              </button>
              <button id="0" className="Action action2" onClick={func}>
                No
              </button>
            </div>
          </div>
        </Modal>
        <ReactAudioPlayer
          src={`./mp3/${currentPlaying}.mp3`}
          controls
          autoPlay
          onEnded={() => {
            openModal();
          }}
        />
        <Modal
          isOpen={modal2IsOpen}
          onRequestClose={closeModa2l}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h3>You were able to hear sound between</h3>
            <h3 className="result-card">{frequencyCalculator()}</h3>
          </div>
        </Modal>
      </header>
    </div>
  );
}

export default App;
