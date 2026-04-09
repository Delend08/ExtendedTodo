import '../styles/App.css'
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";

export default function App() {
  
  return (
    <div className="container">
      <h1 className="title">Extended Todo</h1>
      <TodoInput />
      <TodoList />
    </div>
  )
}