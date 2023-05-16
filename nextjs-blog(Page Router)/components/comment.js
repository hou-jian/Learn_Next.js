import { useEffect, useState } from "react"

export default function Comment() {
  const [comment, setComment] = useState('加载中')
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setComment(data.text))    
  }, [])

  return <section>
    <h2>评论</h2>
    {comment}
  </section>
}