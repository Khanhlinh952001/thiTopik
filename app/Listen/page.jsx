"use client"
import React, { useState, useEffect } from "react";
import Listen from "../../json/Listen.json";
import Link from "next/link";
function isImage(url) {
  return (
    (url && /\.(jpeg|jpg|gif|png)$/.test(url.toLowerCase())) ||
    (url && /\?q=tbn:/.test(url)) ||
    (url && url.startsWith("http"))
  );
}

const SetSelection = ({ onSelectSet }) => {
  const [selectedSet, setSelectedSet] = useState(1);

  return (
    <div>
  <div className="lg:items-center lg:justify-center h-screen lg:hidden bg-[#e1e8f0] text-center">
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
      <div className="flex justify-center  items-center h-full ">
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
    </div></div>
  );
};

const TestPage = () => {
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionsSet, setQuestionsSet] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  
  const [questions, setQuestions] = useState([]);
  const [showTracking, setShowTracking] = useState(true);
  const [audio, setAudio] = useState();
  const [score, setScore] = useState();

  useEffect(() => {
    let timer;

    if (showResults || elapsedTime >= 1200) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showResults, elapsedTime]);

  useEffect(() => {
    switch (selectedSet) {
      case 1:
        setQuestionsSet(Listen.Listen83);
        setAudio(
          "https://firebasestorage.googleapis.com/v0/b/upload-9ece2.appspot.com/o/Listen83%2F%5BLISTENING%20TOPIK%2083%5D%20TOPIK%20%E1%84%83%E1%85%B3%E1%86%AE%E1%84%80%E1%85%B5%2083%E1%84%92%E1%85%AC%20_%20%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%A5%E1%84%82%E1%85%B3%E1%86%BC%E1%84%85%E1%85%A7%E1%86%A8%E1%84%89%E1%85%B5%E1%84%92%E1%85%A5%E1%86%B7%20%E1%84%83%E1%85%B3%E1%86%AE%E1%84%80%E1%85%B5%20%E1%84%8C%E1%85%B5%E1%84%86%E1%85%AE%E1%86%AB%20-%20BA%CC%80I%20NGHE%20TOPIK%20II%20ke%CC%80m%20phu%CC%A3%20%C4%91e%CC%82%CC%80.mp3?alt=media&token=0f332054-0c96-42ed-ba28-7bd54b68d23b"
        );
        break;
      case 2:
        setQuestionsSet(Listen.Listen1);
        setAudio(
          "https://firebasestorage.googleapis.com/v0/b/upload-9ece2.appspot.com/o/Listen1%2FListen1.mp3?alt=media&token=6f84d7bd-dd08-4742-9fb4-01b89f04efc7"
        );
        break;
      case 3:
        setQuestionsSet(Listen.Listen2);
        setAudio("https://firebasestorage.googleapis.com/v0/b/upload-9ece2.appspot.com/o/Listen2%2FListen2.mp3?alt=media&token=33c06ab8-fd9e-4b66-bafc-7772c28680ed");
        break;
      case 4:
        setQuestionsSet(Listen.Listen3);
        setAudio("https://firebasestorage.googleapis.com/v0/b/upload-9ece2.appspot.com/o/Listen3%2FListen3.mp3?alt=media&token=42619370-76c5-424c-bab8-cdb34616c30d");
        break;
      default:
        break;
    }
  }, [selectedSet]);

  useEffect(() => {
    setQuestions(questionsSet);
  }, [questionsSet]);

  const calculateScore = () => {
    const scorePerQuestion = 2;
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
    setShowTracking(false);

    const incorrectQuestions = answeredQuestions.filter((questionNumber) => {
      const userAnswer = answers[questionNumber];
      const correctAnswer = questions.find(
        (q) => q.id === questionNumber
      )?.correctAnswer;
      return userAnswer !== correctAnswer;
    });

    const scores = calculateScore();
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

  console.log(audio)

  return (

    
    <div className="bg-[#e1e8f0] h-full text-align sm:hidden">
      <div className="flex">
        <div className="bg-white w-screen ml-[280px] mb-8 mr-4 text-center rounded">
          <h1 className="text-3xl font-bold mb-4 text-black pt-8">
            한국어 능력시험
          </h1>

          <div className="mb-4 ">
            <label className="block text-2xl font-medium mt-1 mr-2 text-gray-700 ">
             {selectedSet === 1 ? "83" : selectedSet - 1} 제회
            </label>
          </div>

          <div className="mt-4 text-center mb-2">
            <p className="text-xl font-medium text-red-600">
              Thời gian còn lại:{" "}
              <span className="text-xl text-red ">
                {Math.floor((3660 - elapsedTime) / 60)} phút{" "}
                {(1200 - elapsedTime) % 60} giây
              </span>
            </p>
          </div>
          <div className="w-full">
          {audio ? (
              <audio controls autoPlay>
                <source src={audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>No audio available</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex  ">
          <div className="w-[280px]  h-full fixed top-4 overflow-y-auto  ">
            <div className="bg-white pb-10 mx-2 rounded-md mr-2">
              {showTracking && (
                <div className="text-center">
                  <h5 className="text-[18px] font-medium mb-2 text-gray-800">
                    Bảng theo dõi:
                  </h5>
                  <ul className="list-none p-0">
                    {questionsSet &&
                      questionsSet.map((question) => (
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

          <div className="questions-list flex-1 ml-[280px] mx-4 pl-8 pt-4 pr-8 rounded-md  bg-slate-100">
            {questionsSet &&
              questionsSet.map((question) => {
                const questionNumber = question.id;
                const userAnswer = answers[questionNumber];
                const isIncorrect =
                  userAnswer && userAnswer !== question.correctAnswer;

                return (
                  <div
                    key={questionNumber}
                    id={`question${questionNumber}`}
                    className="mb-6 bg-white pl-6 pr-6 pb-6 pt-1  rounded-xl"
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
                            style={{ width: "700px" }}
                            src={question.content}
                            alt={`Câu hỏi ${questionNumber}`}
                            className="mb-2 ml-10"
                          />
                          <h2 className="mb-2 text-black text-xl mt-4">
                            {question.type1}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className="">
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
                    <div className="mb-8">
                      {question.options && (
                        <div className="flex space-x-8 ml-40">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                name={`q${questionNumber}`}
                                value={(optionIndex + 1).toString()}
                                onChange={() =>
                                  handleAnswerChange(
                                    questionNumber,
                                    (optionIndex + 1).toString()
                                  )
                                }
                                checked={
                                  userAnswer === (optionIndex + 1).toString()
                                }
                                className="h-5 w-5 border-gray-300 focus:ring-indigo-500 text-indigo-600"
                                disabled={showResults}
                              />
                              <label className="text-gray-700 text-xl ml-2">
                                {`  ${optionIndex + 1}   ${option}`}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
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
            elapsedTime >= 1200 ? "disabled" : ""
          }`}
          onClick={elapsedTime >= 4500 ? null : handleSubmit}
          disabled={elapsedTime >= 4500}
        >
          Kiểm Tra Đáp Án
        </button>
      </div>
    </div> 
  )
};

export default TestPage;
