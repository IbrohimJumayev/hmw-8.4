import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

interface AddTodoProps {
  handleTodo: (event:any) => void
  addTodos: (event:any) => void
}



const AddTodo = ({ handleTodo, addTodos }: AddTodoProps) => {
    const todoContext = useContext(TodosContext);

    if (!todoContext) {
      throw new Error(
        "TodosContext should be used Indide of the TodosProvdier"
      );
    }
    const { state } = todoContext;
  return (
    <div>
      <form onSubmit={addTodos} className="flex items-center justify-between gap-3">
        <input
         value={state.newTodo}
          onChange={handleTodo}
          autoFocus
          required
          className="bg-transparent outline-none border-2 w-full  px-3 py-2 rounded-xl border-purple-500 text-lg"
          type="text"
          placeholder="Add new task"
        />
        <button
          className="border-2 border-purple-500 rounded-xl px-3 pt-2 pb-1"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
