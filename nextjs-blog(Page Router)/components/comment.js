import { useEffect, useState } from "react"

export default function Comment() {
  const [comment, setComment] = useState('加载中')
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setComment(data.text))
  }, [])

  return <section>
    <button onClick={() => {
      const array1 = [5, 12, 8, 130, 44];
      const found = array1.find(element => element > 10);
      console.log(found)
    }}>测试 array/find</button>
    
    <button onClick={() => {
      const array = [1,2,3,4,5,6]
      console.log(array.at(-1))
      console.log(array.at(-2))
    }}>测试 array/at</button>
    <h2>评论</h2>
    {comment}
  </section>
}