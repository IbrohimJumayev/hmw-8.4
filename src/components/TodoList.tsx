import { useContext } from "react";
import AddTodo from "./AddTodo";
import { TodosContext } from "../context/TodoContext";

function TodoList() {
  const todoContext = useContext(TodosContext);

  if (!todoContext) {
    throw new Error("TodosContext should be used Inside of the TodosProvider");
  }
  const { state, dispatch } = todoContext;

  const addTodos = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: "ADDTODO",
      payload: { id: String(Date.now()), title: state.newTodo, done: false },
    });
  };


  const handleTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SETTODO",
      payload: event.target.value,
    });
  };

  const deleteTodo = (id: string) => {
    dispatch({
      type: "DELETETODO",
      payload: id,
    });
  };

  console.log(state.todos);
  return (
    <div className="text-white mx-5">
      <div className="max-w-xl m-auto bg-purple-900 mt-28 rounded-2xl max-sm:mt-10">
        <div className="px-16 py-12 max-sm:px-5 max-sm:py-3">
          <div>
            <AddTodo addTodos={addTodos} handleTodo={handleTodo} />
          </div>
          <div className=" mt-10 flex-col gap-8">
            <h2 className="mb-5 text-2xl font-bold">
              Tasks to do - {state.todos.length}
            </h2>
            {state.todos.map((todo) => (
              <li className="list-none flex justify-between" key={todo.id}>
                <p className={`text-xl font-bold ${todo.done ? 'line-through text-green-500': ''}`}>{todo.title}</p>
                <div className="flex items-center gap-5">
                  <button>
                    <button onClick={() => dispatch({type:"DONETODOS", payload: todo.id})}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
