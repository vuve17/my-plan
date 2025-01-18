import { Backdrop, Box, Paper, Typography } from "@mui/material";
import TutorialCharacter from "./tutorial-character";
import { useRef, useState } from "react";
import {
  instuctionsArrayText,
  instuctionsArrayHeading,
} from "./tutorial-instructions";
import TutorialBackdropBackground from "./tutorial-backdrop-background";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface TutorialProps {
  closeTutorial: () => void
}

const Tutorial: React.FC<TutorialProps> = ({closeTutorial}) => {
  
  sessionStorage.removeItem('cameFromRegister');
  const divRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);
  const [isAnimatingToRightSide, setIsAnimatingToRightSide] =
    useState<boolean>(false);
    const [areInstuctionsVisible, setAreInstuctionsVisible] =
    useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationSpeed = 15;
  const animationEndPosition = isMobile ? 20 : 100;
  let charactersLeftPoistion = isMobile ? 20 : 100


  // const [animationId, setAnimationId] = useState<number | null>(null)
  const animationId = useRef<number | null>(null);

  const cancelAnimation = () => {
    if (animationId.current !== null) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
      setIsAnimating(false); 
    }
  };

  const moveToRight = () => {
    if (!divRef.current) return;
    setAreInstuctionsVisible(false);
    setIsAnimating(true);
  
    const screenWidth = window.innerWidth;
    const divWidth = divRef.current.offsetWidth || 0;
    const targetPosition = screenWidth - divWidth - animationEndPosition - charactersLeftPoistion; // Target position offset by `animationEndPosition`
  
    const currentTransform = divRef.current.style.transform;
    let currentPosition = currentTransform.includes("translateX")
      ? parseFloat(currentTransform.replace(/translateX\((-?\d+)px\)/, "$1"))
      : 0;
  
    const animate = () => {
      if (currentPosition < targetPosition) {
        currentPosition += animationSpeed;
        if (currentPosition >= targetPosition) {
          currentPosition = targetPosition; 
          setIsAnimating(false);
          setAreInstuctionsVisible(true); // Trigger function when animation ends
          return; // Exit the animation loop
        }
        if (divRef.current) {
          divRef.current.style.transform = `translateX(${currentPosition}px)`;
        }
        animationId.current = requestAnimationFrame(animate);
      }
    };
  
    animationId.current = requestAnimationFrame(animate);
  };
  
  const moveToLeft = () => {
    if (!divRef.current) return;
    setAreInstuctionsVisible(false);
    setIsAnimating(true);
  
    const targetPosition = animationEndPosition;
  
    const currentTransform = divRef.current.style.transform;
    let currentPosition = currentTransform.includes("translateX")
      ? parseFloat(currentTransform.replace(/translateX\((-?\d+)px\)/, "$1"))
      : 0;
  
    const animate = () => {
      if (currentPosition > targetPosition) {
        currentPosition -= animationSpeed;
        if (currentPosition <= targetPosition) {
          currentPosition = targetPosition;
          setIsAnimating(false);
          setAreInstuctionsVisible(true);
          return;
        }
        if (divRef.current) {
          divRef.current.style.transform = `translateX(${currentPosition}px)`;
        }
        animationId.current = requestAnimationFrame(animate);
      }
    };
  
    animationId.current = requestAnimationFrame(animate);
  };

  const handleBackdropClick = () => {
    console.log("click")
    if (isAnimating) return;
    setAreInstuctionsVisible(false)
    cancelAnimation();
    setIsAnimatingToRightSide((prev) => {
      const newValue = !prev;
      if (newValue) {
        moveToRight();
      } else {
        moveToLeft();
      }
      return newValue; // Ensure the new value is returned
    });
    const incrementedCounter = counter + 1;
    if(incrementedCounter === 5) {
      closeTutorial()
    }
    setCounter(incrementedCounter);
  };

  return (
    <Backdrop
      open={true}
      onClick={handleBackdropClick}
      sx={{
        zIndex: 100,
        position: "fixed",
        // top: 0,
        // left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        inset: 0,
        // width: "100vw",
        // height: "100vh",
        backgroundColor: "transparent",
        opacity: 1,      
      }}
    >
      <TutorialBackdropBackground
        counter={counter}
        activate={areInstuctionsVisible}
        isMobile={isMobile}
      />
      {areInstuctionsVisible && 
      <Paper
        square={false}
        elevation={3}
        sx={{
          position: "relative",
          width: {
            lg: "50vw",
            sm: "80vw",
            xs: "70vw",
          },
          maxWidth: "50rem",
          padding: "2em",
          zIndex: "10",
          boxSizing: "border-box",
          paddingRight: isAnimatingToRightSide && isMobile ? "5em" : "auto",
          paddingLeft: !isAnimatingToRightSide && isMobile ? "5em" : "auto"
        }}
      >
        <Typography variant="h4" fontWeight="bold" marginBottom="0.5em">{instuctionsArrayHeading[counter]}</Typography>
        <Typography variant="body1">{instuctionsArrayText[counter]}</Typography>
      </Paper>
    }

        <div
          ref={divRef}
          style={{
            zIndex: 101,
            position: "absolute",
            top: "25%",
            left: charactersLeftPoistion,
            transform: "translateX(0px)",
            transition: "none",
          }}
        >
          <TutorialCharacter />
        </div>
    </Backdrop>
  );
};

export default Tutorial;
