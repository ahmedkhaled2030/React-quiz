import React, { useState } from "react";
import { Link } from "react-router-dom";

const Question = ({ data, setScore, score }) => {
  const [clickedQuestions, setClickedQuestions] = useState([]);

  const answerClicked = (id, answer) => {
    const questionObject = { id, answer, clicked: true };

    setClickedQuestions((prev) => [...prev, questionObject]);

    const checkId = clickedQuestions.some((item) => item.id === id);

    if (answer == true && checkId !== true) {
      setScore(score + 1);
    }
  };

  return (
    <div>
      {data?.length > 0 &&
        data.map((item) => (
          <div className="mb-6 bg-indigo-600 rounded-md py-4 shadow-md relative">
            <h1 className="my-6 text-2xl text-white ">{item.text}</h1>
            <Link
              to={`/edit-form/${item.id}`}
              className="btn-submit absolute top-1 right-1"
            >
              Edit
            </Link>
            <div className="w-full flex flex-col justify-center items-center ">
              {item.answers.length > 0 &&
                item.answers.map((answer) => (
                  <div
                    onClick={() => answerClicked(item.id, answer.is_true)}
                    className={`w-3/4 border-2 border-white  
                    ${
                      clickedQuestions.some((x) => x.id === item.id)
                        ? ""
                        : "bg-white"
                    }
                
                    ${
                      clickedQuestions.some((x) => x.id === item.id) &&
                      answer.is_true
                        ? "bg-green-500"
                        : ""
                    }
                    ${
                      clickedQuestions.some((x) => x.id === item.id) &&
                      !answer.is_true
                        ? "bg-red-500"
                        : ""
                    }
                   
                      rounded-md py-2 my-2 cursor-pointer `}
                  >
                    {answer.text}
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Question;

//
