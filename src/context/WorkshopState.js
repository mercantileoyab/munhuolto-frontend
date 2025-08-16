import { useReducer } from "react";
import workshopReducer from "./workshopReducer";
import workshopContext from "./workshopContext";

export default function WorkshopState({ children }) {
 
    const [state, dispatch] = useReducer(workshopReducer, {
        workshops: []
    });

    const setWorkshops = (workshops) => {
        dispatch({ type: "SET_WORKSHOPS", payload: workshops });
    };

    const emptySelectedWorkshops = () => {
        dispatch({ type: "EMPTY_WORKSHOPS" });
    };

    return (
        <workshopContext.Provider value={{ state, setWorkshops, emptySelectedWorkshops }}>
        {children}
        </workshopContext.Provider>
    );
}