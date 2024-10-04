import React from "react";
import './App.css';
import { Input, Button, Dialog,DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import VaultIcon from "./vault.png";
import useSound from "use-sound";
import openSfx from "./vault_door_open.mp3";
import wobbleSfx from "./metal_swing.mp3";

function App() {
  const [password, setPassword] = React.useState("");
  const [animation, setAnimation] = React.useState(0);
  const [stage, setStage] = React.useState(0);
  const onChange = ({ target }) => setPassword(target.value);
  const [playOpen] = useSound(openSfx, { volume: 0.10 });
  const [playWobble] = useSound(wobbleSfx, { volume: 0.10 });
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  function onSubmitButton() {
    if(stage === 0) {
      if(password.replace(/ /g,'').toLowerCase() === "ethicalaiisthefuture") {
        setAnimation(2);
        playOpen();
        setStage(1);
      }
      else {
        setAnimation(1);
        playWobble();
      }
    }
  }

  return (
    <div className="App">
        <div className="First-clue First-clue-triangles">
          <div class="mt-10">
            <div class="flex justify-center">
                <div class="triangle triangle-1 before:content-['▲']" stage={stage}></div>
                <div class="triangle triangle-3 before:content-['▼']" stage={stage}></div>
                <div class="triangle triangle-1 before:content-['▲']" stage={stage}></div>
            </div>
            <div class="flex justify-center">
                <div class="triangle triangle-2 before:content-['▲']" stage={stage}></div>
                <div class="triangle triangle-3 before:content-['▼']" stage={stage}></div>
                <div class="triangle triangle-4 before:content-['▲']" stage={stage}></div>
                <div class="triangle triangle-2 before:content-['▼']" stage={stage}></div>
                <div class="triangle triangle-4 before:content-['▲']" stage={stage}></div>
            </div>
            <div class="flex justify-center">
                <div class="triangle triangle-1 before:content-['▼']" stage={stage}></div>
                <div class="triangle triangle-2 before:content-['▲']" stage={stage}></div>
                <div class="triangle triangle-4 before:content-['▼']" stage={stage}></div>
                <div class="triangle triangle-1 before:content-['▲']" stage={stage}></div>
                <div class="triangle triangle-3 before:content-['▼']" stage={stage}></div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full max-w-[24rem] vault-container" stage={stage} onClick={() => {if(stage === 1) handleOpen()}}>
          <div>
            <img 
              className="Vault-icon" 
              src={VaultIcon}
              alt="A vault door!"
              onClick={() => {if(stage !== 1) {setAnimation(1); playWobble()}}}
              onAnimationEnd={() => setAnimation(0)}
              animation={animation}
              stage={stage}
            />
          </div>
        </div>
        <div className="relative flex w-full max-w-[24rem] mt-7 input" stage={stage}>
          <Input
            label="Password"
            value={password}
            onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={password ? "gray" : "blue-gray"}
            disabled={!password}
            className="!absolute right-1 top-1 rounded"
            onClick={onSubmitButton}
          >
            Submit
          </Button>
        </div>
        <Dialog open={open} handler={handleOpen} stage={stage}>
          <DialogHeader>Congratulations!</DialogHeader>
          <DialogBody>
            You managed to solve the riddle by mastering the knowledge of the library and becoming an expert on SAP Ethics!
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick = {() => {handleOpen(); window.location.reload();}}
              className="mr-1"
            >
              <span>Replay</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={handleOpen}>
              <span>Leave the room</span>
            </Button>
          </DialogFooter>
        </Dialog>
    </div>
  );
}

export default App;
