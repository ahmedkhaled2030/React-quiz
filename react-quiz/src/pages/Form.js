import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Center from "../components/Center";
import "../styles/global.css"; // Import your global CSS file

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [feedbackTrue, setFeedbackTrue] = useState("");
  const [feedbackFalse, setFeedbackFalse] = useState("");
  const [answers, setAnswers] = useState([]);
  const [db, setDb] = useState([]);
  const [editedAnswers, setEditedAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuestionById();
  }, []);

  const getQuestionById = async () => {
    setIsLoading(true);
    await axios.get("http://localhost:4000/data").then((res) => {
      setDb(res.data.questions_answers);
      const desiredId = res.data.questions_answers.find(
        (item) => item.id == id
      );
      setText(desiredId?.text);
      setFeedbackTrue(desiredId?.feedback_true);
      setFeedbackFalse(desiredId?.feedback_false);
      setEditedAnswers(desiredId?.answers);
    });
    setIsLoading(false);
  };

  const saveQuestion = async (ev) => {
    ev.preventDefault();
    const quesObj = {
      id: Math.floor(Math.random() * 100) + 1,
      answer_id: null,
      text,
      feedback_true: feedbackTrue,
      feedback_false: feedbackFalse,
      answers: answers.map((p) => ({
        id: Math.floor(Math.random() * 100) + 2,
        text: p.text,
        is_true: p.is_true,
      })),
    };

    if (editedAnswers) {
      console.log('edit')
      const quesObj = {
        id: parseInt(id),
        answer_id: null,
        text,
        feedback_true: feedbackTrue,
        feedback_false: feedbackFalse,
        answers: editedAnswers.map((p) => ({
          id: Math.floor(Math.random() * 100) + 1,
          text: p.text,
          is_true: p.is_true,
        })),
      };
      await axios.patch("http://localhost:4000/data", {
        questions_answers: [...db, quesObj],
      });
    } else {
      console.log('create')
      await axios.patch("http://localhost:4000/data", {
        questions_answers: [...db, quesObj],
      });
    }

    setText("");
    setFeedbackTrue("");
    setFeedbackFalse("");
    setAnswers([]);
    navigate("/");
  };

  const addAnswer = () => {
    if (editedAnswers) {
      setEditedAnswers((prev) => {
        return [...prev, { text: "", is_true: "" }];
      });
    } else {
      setAnswers((prev) => {
        return [...prev, { text: "", is_true: "" }];
      });
    }
  };

  const handleAnswerTextChange = (index, answer, newText) => {
    if (editedAnswers) {
      setEditedAnswers((prev) => {
        const editedAnswers = [...prev];
        editedAnswers[index].text = newText;

        return editedAnswers;
      });
    } else {
      setAnswers((prev) => {
        const answers = [...prev];
        answers[index].text = newText;

        return answers;
      });
    }
  };

  const handleAnswerStatusChange = (index, answer, newstatus) => {
    if (editedAnswers) { 
      setEditedAnswers((prev) => {
        const editedAnswers = [...prev];
        editedAnswers[index].is_true = JSON.parse(newstatus);
        return editedAnswers;
      });
    } else {
      setAnswers((prev) => {
        const answers = [...prev];
        answers[index].is_true = JSON.parse(newstatus);
        return answers;
      });
    }
    
  };

  const removeAnswer = (indexToRemove) => {
    if (editedAnswers) { 
      setEditedAnswers((prev) => {
        return prev.filter((p, pIndex) => {
          return pIndex !== indexToRemove;
        });
      });
    } else {
      setAnswers((prev) => {
        return prev.filter((p, pIndex) => {
          return pIndex !== indexToRemove;
        });
      });
    }
  
  };

  return (
    <div className="flex flex-col items-center ">
      <Link
        to="/"
        className="text-2xl px-4 py-2 bg-green-500 w-60 rounded-md my-4"
      >
       Let's Go Home
      </Link>
      {isLoading ? (
        <div>Is Loading ...</div>
      ) : (
        <form
          onSubmit={saveQuestion}
          className="bg-indigo-600 rounded-md py-4 shadow-md px-10 text-white text-xl w-2/5"
        >
          <div className="flex flex-col gap-2 items-center mb-10  w-full">
            <label>Text</label>
            <input
              type="text"
              placeholder="Text"
              onChange={(ev) => setText(ev.target.value)}
              value={text}
            />
          </div>
          <div className="flex flex-col gap-2 items-center mb-10 w-full">
            <label>feedback_true</label>
            <input
              type="text"
              placeholder="feedback_true"
              onChange={(ev) => setFeedbackTrue(ev.target.value)}
              value={feedbackTrue}
            />
          </div>
          <div className="flex flex-col gap-2 items-center mb-10 w-full">
            <label>feedback_false</label>
            <input
              type="text"
              placeholder="feedback_false"
              onChange={(ev) => setFeedbackFalse(ev.target.value)}
              value={feedbackFalse}
            />
          </div>

          {/* answers */}
          <div className="mb-2">
            <label className="block">Answers</label>
            <button
              onClick={addAnswer}
              type="button"
              className="btn-submit text-md my-2"
            >
              Add new answer
            </button>
            {!editedAnswers &&
              answers?.length > 0 &&
              answers.map((answer, index) => (
                <div key={answer._id} className="flex gap-1 mb-2">
                  <input
                    type="text"
                    value={answer.name}
                    className="mb-0"
                    onChange={(ev) =>
                      handleAnswerTextChange(index, answer, ev.target.value)
                    }
                    placeholder="Answer Text"
                  />
                  <select
                    className="text-black"
                    onChange={(ev) =>
                      handleAnswerStatusChange(index, answer, ev.target.value)
                    }
                    value={answer.values}
                    placeholder="Answer Status"
                  >
                    <option value="" className="option" >-- Select --</option>
                    <option value="true" className="option" >true</option>
                    <option value="false" className="option" >false</option>
                  </select>
                  <button
                    onClick={() => removeAnswer(index)}
                    type="button"
                    className="btn-submit"
                  >
                    Remove
                  </button>
                </div>
              ))}
            {editedAnswers?.length > 0 &&
              editedAnswers.map((answer, index) => (
                <div key={answer._id} className="flex gap-1 mb-2">
                  <input
                    type="text"
                    value={answer.text}
                    className="mb-0"
                    onChange={(ev) =>
                      handleAnswerTextChange(index, answer, ev.target.value)
                    }
                    placeholder="Answer Text"
                  />
                  <select
                    className="text-black"
                    onChange={(ev) =>
                      handleAnswerStatusChange(index, answer, ev.target.value)
                    }
                    value={answer.is_true}
                    placeholder="Answer Status"
                  >
                    <option value="">-- Select --</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <button
                    onClick={() => removeAnswer(index)}
                    type="button"
                    className="btn-submit"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>

          <button type="submit" className="btn-submit py-1  mt-4">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
