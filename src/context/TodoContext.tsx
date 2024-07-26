import { createContext, useReducer } from "react";

export const TodosContext = createContext<ContextValue | null>(null);

interface Todo {
  title: string;
  id: string;
  done: boolean;
}

interface State {
  todos: Todo[];
  newTodo: string;
}

type Action =
  | { type: "ADDTODO"; payload: Todo }
  | { type: "SETTODO"; payload: string }
  | { type: "DELETETODO"; payload: string }

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export default function TodosProvider({ children }: { children: JSX.Element }) {
  const initialState: State = {
    todos: [
      { title: "Meet with friend", id: "1", done: false },
      { title: "Go to gym", id: "2", done: false },
      { title: "Clean home", id: "3", done: false },
    ],
    newTodo: "",
  };

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "ADDTODO":
        return {
          ...state,
          todos: [...state.todos, action.payload],
          newTodo: "",
        };
      case "SETTODO":
        return {
          ...state,
          newTodo: action.payload,
        };
    case "DELETETODO": 
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload),
    };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
}
