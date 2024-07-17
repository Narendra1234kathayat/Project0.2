import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../Store/Slices/todoSlice";

const watchHistory = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  // useselector
  const todoo = useSelector((state) => state.todo.todos);

  const handletodo = (e) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
  };
 

  return (
    <>
    <div className="pt-36 2xl:container mx-auto">
      <div className="grid sm:grid-cols-2 mx-auto md:grid-cols-3 ">
        <video className="h-full w-full rounded-lg" controls loop >
          <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <form onSubmit={handletodo}>
        <label className="text-2xl self-center">User Name</label>
        <textarea
          type="text"
          className="p-2 rounded-md border border-gray-300"
          placeholder="Username"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input type="submit" />
      </form>

      <div className="todoooo">
        {todoo.map((todo) => (
          <li key={todo.id}>
            {todo.id}
            {todo.text}
            <button
              className="border-2 border-black rounded-md mx-4 px-2 py-1"
              onClick={() => {
                dispatch(removeTodo(todo.id));
              }}
            >
              delete
            </button>
          </li>
        ))}
      </div>
    </div>
    </>
  );
};

export default watchHistory;
