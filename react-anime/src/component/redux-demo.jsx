import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, toggleTask } from '../store/toDoList'
import './redux-demo.css'

export default function ReduxDemo(){
  const tasks = useSelector((state) => state.toDoList.tasks)
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const timer = useSelector((state) => state.timer)

  React.useEffect(() => {
    let id = null
    if (timer.running) {
      id = setInterval(() => {
        dispatch({ type: 'timer/tick', payload: 1 })
      }, 1000)
    }
    return () => {
      if (id) clearInterval(id)
    }
  }, [timer.running, dispatch])

  const add = () => {
    const t = text.trim()
    if (!t) return
    const task = { id: Date.now().toString(), text: t, completed: false }
    dispatch(addTask(task))
    setText('')
  }

  return (
    <div className="redux-demo">
      <h3 className="title">每日计划</h3>
      <div className="timer">
        <div className="time-display">{String(Math.floor(timer.elapsed/60)).padStart(2,'0')}:{String(timer.elapsed%60).padStart(2,'0')}</div>
        <div className="timer-controls">
          {!timer.running ? (
            <button onClick={()=>dispatch({type:'timer/start'})} className="start">开始</button>
          ) : (
            <button onClick={()=>dispatch({type:'timer/stop'})} className="stop">停止</button>
          )}
          <button onClick={()=>dispatch({type:'timer/reset'})} className="reset">重置</button>
        </div>
      </div>
      <div className="add-row">
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="添加今日任务，例如：阅读 30 分钟" />
        <button className="add-btn" onClick={add}>添加</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && <li className="empty">暂无任务，添加一条开始今天吧</li>}
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
            <label>
              <input type="checkbox" checked={task.completed} onChange={()=>dispatch(toggleTask(task.id))} />
              <span className="task-text">{task.text}</span>
            </label>
            <button className="del" onClick={()=>dispatch(removeTask(task.id))}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
