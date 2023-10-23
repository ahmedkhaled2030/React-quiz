import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Center from '../components/Center';
import Question from '../components/Question';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        await axios.get("http://localhost:4000/data").then((res) => {
          setData(res.data);
        });
      };
    
  return (
    <div className="flex flex-col items-center justify-center ">
          <Header score={score} title={data?.title} />
      <Center>
        <Question
          data={data?.questions_answers}
          setScore={setScore}
          score={score}
        />
      </Center>
    </div>
  )
}

export default Home