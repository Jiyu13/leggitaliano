import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

function TypingSearchBar({userText, setUserText}) {

    const FULL_TEXT = "Ciao, come stai?";

    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(true);

    const [userEditing, setUserEditing] = useState(false);

    const indexRef = useRef(0);        // current character index
    const deletingRef = useRef(false); // are we deleting?

    useEffect(() => {
        if (!isAnimating || userEditing) return;

        const typingSpeed = 120;        // ms per char when typing
        const deletingSpeed = 80;       // ms per char when deleting
        const pauseAfterTyping = 1000;  // ms when fully typed
        const pauseAfterDeleting = 500; // ms when fully deleted

        let timer;

        const step = () => {
            const i = indexRef.current;
            const deleting = deletingRef.current;

            if (!deleting) {
                // typing forward
                if (i < FULL_TEXT.length) {
                    indexRef.current = i + 1;
                    setDisplayText(FULL_TEXT.slice(0, i + 1));
                    timer = setTimeout(step, typingSpeed);
                } else {
                    // finished typing → start deleting after a pause
                    deletingRef.current = true;
                    timer = setTimeout(step, pauseAfterTyping);
                }
            } else {
                // deleting backward
                if (i > 0) {
                  indexRef.current = i - 1;
                  setDisplayText(FULL_TEXT.slice(0, i - 1));
                  timer = setTimeout(step, deletingSpeed);
                } else {
                  // finished deleting → start typing again after a pause
                  deletingRef.current = false;
                  timer = setTimeout(step, pauseAfterDeleting);
                }
            }
        };

        timer = setTimeout(step, typingSpeed);

        return () => clearTimeout(timer);
    }, [FULL_TEXT, isAnimating, userEditing]);

    function handleFocus() {
        setUserEditing(true);
        setIsAnimating(false); // stop animation when user types
    }

    function handleChange(e) {
        setUserEditing(true);
        setIsAnimating(false);
        setUserText(e.target.value);
    }

    function handleBlur() {
        // If user left it empty → resume animation
        if (userText.trim() === "") {
            setUserEditing(false);
            setIsAnimating(true);
            setDisplayText("");
            indexRef.current = 0;
            deletingRef.current = false;
        }
    }

    const inputValue = userEditing ? userText : displayText;

    return (
        <GreetingInputContainer>
            <GreetingInputArea
                type="text"
                value={inputValue}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                $isAnimating={isAnimating && !userEditing}
            />
        </GreetingInputContainer>
    )
}
const GreetingInputContainer = styled.div`
  margin: 3rem 0;
  padding: 20px 30px;
  font-size: 35px;
  font-family: monospace;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
`

const GreetingInputArea = styled.input`
  background: none;
  color: #fff;
  border: none;
  font-size: 4rem;
  text-align: center;
  font-weight: bolder;

  /* real caret for user typing */
  caret-color: #fff;

  /* fake cursor for animation mode */
  border-right: ${({ $isAnimating }) => $isAnimating ? "3px solid #fff" : "none"};

  ${({ $isAnimating }) => $isAnimating ? "animation: blink .75s step-end infinite;" : "animation: none;"}

  @keyframes blink {
    0%, 100% {
      border-color: #fff;
    }
    50% {
      border-color: transparent;
    }
  }
  /* remove focus outline & border on all browsers */
  &:focus {
    outline: none;
    border: none;
  }
`

export default TypingSearchBar