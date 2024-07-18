import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [next,setNext]=useState(0);
  console.log(next);
  const score = useRef(0);
  const [selectedOnce, setSelectedOnce] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:27001/questions")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  function handleChangeOption(event) {
    const selectedAnswer = event.target.value;
    if (selectedAnswer === questions[next].answer && !selectedOnce) {
      score.current += 10;    
      setSelectedOnce(true);
      console.log(score.current);
    }
  }

  function swipePrev() {
    if (next > 0) {
      setNext(next-1);
      setSelectedOnce(false);
    }
  }

  function swipeNext() {
    if (next < questions.length - 1) {
      setNext(next+1);
      
      setSelectedOnce(false);
    }
    else{
      alert(`Quiz finished ! your score : ${score.current}`);
    }
  }

  return (
    <div style={{ margin: "30px" }}>
      <h1 style={{ display: "inline", color: "deepskyblue" }}>Quiz</h1>
    
      {questions.length > 0 &&
      questions[next].a.length > 0 &&
      questions[next].b.length > 0 &&
      questions[next].c.length>0 &&
      questions[next].d.length>0 ? (
        <div>
          <h2>{questions[next].question}</h2>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="answer"
              value={questions[next].a}
              
              onChange={handleChangeOption}
            />
            A){questions[next].a}
          </label>
          <label>
            <input
              type="radio"
              name="answer"
              value={questions[next].b}
              onChange={handleChangeOption}
            />
            B){questions[next].b}
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="answer"
              value={questions[next].c}
              onChange={handleChangeOption}
            />
            C){questions[next].c}
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="answer"
              value={questions[next].d}
              onChange={handleChangeOption}
            />
            D){questions[next].d}
          </label>
          <section style={{ textAlign: "center", marginTop: "5%" }}>
            <button onClick={swipePrev} style={{ margin: "10px" }}>
              Prev
            </button>
            <button onClick={swipeNext} style={{ margin: "10px" }}>
              Next
            </button>
          </section>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Questions;
