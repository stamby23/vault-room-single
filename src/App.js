import React from "react";
import './App.css';
import { Input, Button } from "@material-tailwind/react";
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

  function onSubmitButton() {
    if(stage === 0) {
      if(password.replace(/ /g,'').toLowerCase() === "test") {
        setAnimation(2);
        playOpen();
        setStage(1);
      }
      else {
        setAnimation(1);
        playWobble();
      }
    }

    if(stage === 1) {
      if(password === "reward") {
        setAnimation(3);
        playOpen();
        setStage(2);
      }
      else {
        setAnimation(1);
        playWobble();
      }
    }
  }

  return (
    <div className="App">
        <div className="First-clue First-clue-text">
          <p className="First-clue-text-p" stage={stage}>To unveil the magic hidden within, you must rewind the spell. Shift each letter back by three steps in the alphabet, and the secrets will be revealed.</p>
        </div>
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
        <div className="Second-clue Second-clue-text">
          <p className="Second-clue-text-p" stage={stage}>Open the drawer!</p>
        </div>
        <div className="Second-clue Second-clue-letters">
          <div class="flex justify-center">
            <div class="letter A" stage={stage}>A</div>
            <div class="letter B" stage={stage}>B</div>
            <div class="letter C" stage={stage}>C</div>
            <div class="letter D" stage={stage}>D</div>
            <div class="letter E" stage={stage}>E</div>
            <div class="letter F" stage={stage}>F</div>
            <div class="letter G" stage={stage}>G</div>
            <div class="letter H" stage={stage}>H</div>
            <div class="letter I" stage={stage}>I</div>
            <div class="letter J" stage={stage}>J</div>
            <div class="letter K" stage={stage}>K</div>
            <div class="letter L" stage={stage}>L</div>
          </div>
        </div>
        <div className="relative flex w-full max-w-[24rem] vault-container">
          <div>
            <img 
              className="Vault-icon" 
              src={VaultIcon}
              alt="A vault door!"
              onClick={() => {setAnimation(1); playWobble()}}
              onAnimationEnd={() => setAnimation(0)}
              animation={animation}
              stage={stage}
            />
          </div>
        </div>
        <div className="relative flex w-full max-w-[24rem] mt-7">
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
    </div>
  );
}

export default App;
