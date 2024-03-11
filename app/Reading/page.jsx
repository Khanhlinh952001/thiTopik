"use client";

import React, { useState, useEffect } from "react";
import Reading from "../../json/Reading.json";
import Link from "next/link";
function isImage(url) {
  // Check if the URL ends with specific patterns indicating it's an image
  return (
    /\.(jpeg|jpg|gif|png)$/.test(url) ||
    /\?q=tbn:/.test(url) ||
    url.startsWith("http")
  );
}

const SetSelection = ({ onSelectSet }) => {
  const [selectedSet, setSelectedSet] = useState(1);

  return (

    <div>
<div className="lg:flex lg:items-center lg:justify-center h-screen bg-[#e1e8f0] text-center">
        <div className="p-8">
          <h1 className="text-gray-800 text-lg mb-10">Trang web hiện chưa cập nhật trên di động</h1>
          <Link href="/">
            <button className="bg-[#b61e3b] hover:bg-[#b61e3b] text-white font-bold py-2 px-4 rounded">
              Trở lại
            </button>
          </Link>
        </div>
      </div>
   
    <div className="bg-[#e1e8f0] h-screen lg:block text-align">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded">
          <h1 className="text-3xl font-bold mb-4 text-black mx-4">
            Chọn Bộ Đề Trước Khi Thi
          </h1>
          <div className="flex justify-around">
            <select
              className="border rounded-md text-gray-700 h-10 mt-8 bg-slate-300 p-2"
              onChange={(e) => onSelectSet(Number(e.target.value))}
            >
              <option value={1}>Bộ đề 83</option>
              <option value={2}>Bộ đề 1</option>
              <option value={3}>Bộ đề 2</option>
              <option value={4}>Bộ đề 3</option>
              {/* Add more options if needed */}
            </select>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded mt-4 ml-8"
              onClick={() => onSelectSet(selectedSet)}
            >
              Bắt đầu Thi
            </button>
          </div>
        </div>
      </div>
    </div> </div>
  );
};

  const TestPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionsSet, setQuestionsSet] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showTracking, setShowTracking] = useState(true);
  const [score, setScore] = useState();

  const handleClick = () => {
    // Đảo ngược giá trị của trạng thái expanded khi click
    setExpanded(!expanded);
  };

  // Countdown timer for 20 minutes
  useEffect(() => {
    let timer;

    if (showResults || elapsedTime >= 1200) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);

        // Check if there is 1 minute remaining (60 seconds)
        if (1200 - elapsedTime === 60) {
          // Display a notification to the user
          // You can use a custom notification component or a library for a better user experience
          alert("Còn lại 1 phút, hãy kiểm tra lại đáp án!");
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showResults, elapsedTime]);

  useEffect(() => {
    // Select the corresponding question set
    switch (selectedSet) {
      case 1:
        setQuestionsSet(Reading.Reading83);
        break;
      case 2:
        setQuestionsSet(Reading.De1); // Change this to the correct data source
        break;
      case 3:
        setQuestionsSet(Reading.De2); // Change this to the correct data source
        break;
      case 4:
        setQuestionsSet(Reading.De3); // Change this to the correct data source
        break;
      default:
        setQuestionsSet(Reading.Reading83);
    }
  }, [selectedSet]);

  useEffect(() => {
    // Set questions based on the selected set
    setQuestions(questionsSet);
  }, [questionsSet]);

  // Hàm tính điểm
  const calculateScore = () => {
    const scorePerQuestion = 2; // Số điểm cho mỗi câu trả lời đúng
    return answeredQuestions.reduce((totalScore, questionNumber) => {
      const userAnswer = answers[questionNumber];
      const correctAnswer = questions.find(
        (q) => q.id === questionNumber
      )?.correctAnswer;
      const isCorrect = userAnswer === correctAnswer;

      return totalScore + (isCorrect ? scorePerQuestion : 0);
    }, 0);
  };

  const handleAnswerChange = (questionNumber, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: selectedAnswer,
    }));

    if (!answeredQuestions.includes(questionNumber)) {
      setAnsweredQuestions((prevQuestions) => [
        ...prevQuestions,
        questionNumber,
      ]);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setShowTracking(false); // Ẩn phần theo dõi

    const incorrectQuestions = answeredQuestions.filter((questionNumber) => {
      const userAnswer = answers[questionNumber];
      const correctAnswer = questions.find(
        (q) => q.id === questionNumber
      )?.correctAnswer;
      return userAnswer !== correctAnswer;
    });

    const scores = calculateScore(); // Tính điểm
    alert(scores);
    setScore(scores);
    setIsCorrect(incorrectQuestions.length === 0);
  };

  const handleJumpToQuestion = (questionNumber) => {
    const element = document.getElementById(`question${questionNumber}`);
    element.scrollIntoView({ behavior: "smooth" });
  };

  if (!selectedSet) {
    return <SetSelection onSelectSet={setSelectedSet} />;
  }

  return (
    <div>
      

      <div className="bg-[#e1e8f0] h-full text-align ">
        <div className="flex">
          <div className="bg-white w-screen ml-[280px] mb-8 mr-4 text-center rounded">
            <h1 className="text-3xl font-bold mb-4 text-black pt-8">
              한국어 능력시험
            </h1>

            <div className="mb-4 ">
              <h3 className="block text-2xl font-medium mt-1 mr-2 text-gray-700 ">
                {selectedSet === 1 ? "83" : selectedSet - 1} 제회
              </h3>
            </div>

            <div className="mt-4 text-center mb-2">
              <p className="text-xl font-medium text-red-600">
                Thời gian còn lại:{" "}
                <span className="text-xl text-red ">
                  {String(Math.floor((3660 - elapsedTime) / 60)).padStart(
                    2,
                    "0"
                  )}
                  :{String((1200 - elapsedTime) % 60).padStart(2, "0")} phút
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex  ">
            <div className="w-[280px]  h-full fixed top-4 overflow-y-auto  ">
              <div className=" bg-slate-100 pb-10 mx-2 rounded-md mr-2">
                {showTracking && (
                  <div className="text-center">
                    <h5 className="text-[18px] font-medium mb-2 text-gray-800">
                      Bảng theo dõi:
                    </h5>
                    <ul className="list-none p-0">
                      {questionsSet.map((question) => (
                        <li key={question.id} className="mb-2">
                          <button
                            className={"text-black px-4 py-2 rounded "}
                            onClick={() => handleJumpToQuestion(question.id)}
                          >
                            Câu {question.id} : Bạn chọn
                            {answers[question.id] ? (
                              <span className="font-bold ml-2 bg-green-500 text-white py-2 px-3 rounded-full">
                                {answers[question.id]}
                              </span>
                            ) : (
                              <span className="font-bold ml-2 bg-yellow-500 text-white py-2 px-3 rounded-full">
                                ?
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showResults && (
                  <div className="mr-1  text-center pb-10">
                    <h1 className=" text-xl mb-8 pt-4 text-gray-500">
                      Chúc mừng bạn :
                      <span className="text-2xl font-bold text-green-600">
                        {score}
                      </span>
                      Điểm
                    </h1>
                    <h5 className="text-gray-900">Kiểm Tra đáp án</h5>
                    <ul className="list-none p-0" id="2">
                      {answeredQuestions.map((questionNumber) => (
                        <li key={questionNumber} className="mb-2 ">
                          <div className=" border-b pb-2">
                            <div className="flex ">
                              <button
                                className={`${
                                  answers[questionNumber] ===
                                  questions.find((q) => q.id === questionNumber)
                                    ?.correctAnswer
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                } text-white p-2 ml-2 w-16 rounded`}
                                onClick={() =>
                                  handleJumpToQuestion(questionNumber)
                                }
                              >
                                Câu {questionNumber}
                              </button>
                              {answers[questionNumber] && (
                                <span className="ml-1 mt-1 w-[180px] mr-1 text-gray-600">
                                  {answers[questionNumber] ===
                                  questions.find((q) => q.id === questionNumber)
                                    ?.correctAnswer
                                    ? "True"
                                    : "False"}
                                  - Đáp án là:{" "}
                                  <span className="mt-4 bg-green-500 rounded-full py-2 px-3">
                                    {
                                      questions.find(
                                        (q) => q.id === questionNumber
                                      )?.correctAnswer
                                    }
                                  </span>
                                </span>
                              )}
                              <div></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="questions-list flex-1 ml-[280px] mx-4 pl-8 pt-4 pr-8 rounded-md">
              {questionsSet.map((question) => {
                const questionNumber = question.id;
                const userAnswer = answers[questionNumber];
                const isIncorrect =
                  userAnswer && userAnswer !== question.correctAnswer;

                return (
                  <div
                    key={questionNumber}
                    id={`question${questionNumber}`}
                    className="mb-6 bg-slate-100 pl-6 pr-6 pb-6 pt-1  rounded-xl "
                  >
                    <h1 className="mb-2 text-black text-2xl mt-4">
                      {question.type}
                    </h1>
                    {isImage(question.content) ? (
                      <div className="container">
                        <div>
                          <p className="mb-2 text-gray-800 text-xl mt-4">
                            {" "}
                            {question.id}.{" "}
                          </p>
                          <img
                            src={question.content}
                            alt={`Câu hỏi ${questionNumber}`}
                            className={`mb-2 ml-10 p-4 bg-white rounded-xl w-6/12 ${
                              expanded ? "w-8/12" : ""
                            }`}
                            onClick={handleClick}
                          />
                          <h2 className="mb-2 text-black text-xl mt-4">
                            {question.type1}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <p className="mb-2 text-black text-xl mt-4 pl-4 py-2 rounded-2xl flex">
                          {question.id}.
                          {question.content ? (
                            question.content
                          ) : (
                            <h2 className="mb-2 text-black text-xl ">
                              {question.type1}
                            </h2>
                          )}
                        </p>
                      </div>
                    )}
                    <div className="mb-8 flex">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="block mb-2 pl-12 text-gray-700 text-xl "
                        >
                          <input
                            type="checkbox"
                            name={`q${questionNumber}`}
                            value={(optionIndex + 1).toString()} // Use (optionIndex + 1) as the value
                            onChange={() =>
                              handleAnswerChange(
                                questionNumber,
                                (optionIndex + 1).toString()
                              )
                            }
                            checked={
                              userAnswer === (optionIndex + 1).toString()
                            }
                            className="mr-2 h-4 w-4 border-gray-300 focus:ring-indigo-500 text-indigo-600"
                            disabled={showResults} // Disable radio buttons after submitting
                          />
                          {`${optionIndex + 1}. ${option}`}{" "}
                          {/* Display option number */}
                        </label>
                      ))}
                    </div>

                    {showResults && isIncorrect && (
                      <div>
                        <p className="text-red-500">
                          Đáp án đúng:{" "}
                          <span className="text-xl text-blue-500">
                            {question.correctAnswer}
                          </span>
                        </p>
                        <p className="text-green-400">{question.solution}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {showResults && (
            <div className="mt-4">
              <p className="text-xl font-medium text-black ml-20">
                Thời gian làm bài: {elapsedTime} giây
              </p>
            </div>
          )}
        </div>
        <div className="w-screen flex justify-end ">
          <button
            className={`bg-blue-500 text-white px-6 py-3 rounded mt-4 mr-10 ${
              elapsedTime >= 3660 ? "disabled" : ""
            }`}
            onClick={elapsedTime >= 3660 ? null : handleSubmit}
            disabled={elapsedTime >= 3660}
          >
            Kiểm Tra Đáp Án
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
