import { useEffect, useRef, useState } from "react";

function App() {
  const [min, setMin] = useState(20);
  const [sec, setSec] = useState(0)
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const time = useRef(1200);
  const timerId = useRef(null)


  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60))
      setSec(time.current % 60)
      time.current -= 1
    }, 1000)

    return () => clearInterval(timerId.current)
  }, [])

  const test = () => {
    if (time.current % 60 < 40) {
      setB(time.current % 60 + 60 - 40)
      setA(parseInt(time.current / 60) - 2)
    } else {
      setA(parseInt(time.current / 60) - 1)
      setB(time.current % 60 - 40)
    }
  }


  useEffect(() => {
    if (time.current <= 0) {
      console.log("타임 아웃")
      clearInterval(timerId.current)
    }
  }, [sec])

  return (
    <div>
      {min}분 {sec}초
      <button onClick={() => {
        test()

      }}>체크</button>
      <div>{a}분{b}초</div>
    </div>
  );
}

export default App;
