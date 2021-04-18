import React from "react";
import styled from "styled-components";
import meenoi1 from "./assets/meenoi.jpg";
import meenoi2 from "./assets/meenoi2.jpg";
import meenoi3 from "./assets/meenoi3.jpg";
import meenoi4 from "./assets/meenoi4.jpg";
import meenoi5 from "./assets/meenoi5.jpg";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const set = [
  {
    imageUrl: meenoi1,
    text: "Mic test",
    color: "#fea3aa",
  },
  {
    imageUrl: meenoi2,
    text: "are you there?",
    color: "#f8b88b ",
  },
  {
    imageUrl: meenoi3,
    text: "this is",
    color: "#faf884 ",
  },
  {
    imageUrl: meenoi4,
    text: "just a test",
    color: "#baed91 ",
  },
  {
    imageUrl: meenoi5,
    text: ":D",
    color: "#b2cefe",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.color};
`;

const AbsDiv = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 99;
`;

const Main = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const imgRef = useRef(null);

  const handleEnter = (n) => {
    setCurrent(n);
  };

  const handleBack = (n) => {
    if (n > 0) {
      setCurrent(n);
    } else {
      setCurrent(0);
    }
  };

  const animateDiv = () => {
    gsap.fromTo(imgRef.current, 2, { opacity: 0 }, { opacity: 1 });
  };

  const animate = () => {
    const animation = (n) => {
      gsap.to(ref.current.children, {
        scrollTrigger: {
          trigger: ref.current.children[n],
          start: "top top",
          onEnter: () => {
            handleEnter(n);
          },
          onEnterBack: () => {
            handleBack(n);
          },
        },
      });
    };

    animation(0);
    animation(1);
    animation(2);
    animation(3);
    animation(4);
  };

  useEffect(() => {
    animate();
  }, []);
  useEffect(() => {
    animateDiv();
  }, [current]);

  return (
    <>
      {" "}
      <Container>
        <div ref={ref}>
          {set.map((item) => {
            return <Section color={item.color}></Section>;
          })}
        </div>
        <AbsDiv ref={imgRef}>
          <img src={set[current].imageUrl}></img>
        </AbsDiv>
      </Container>
    </>
  );
};

export default Main;
