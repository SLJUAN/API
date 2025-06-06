import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer } from "./reducers/activity-reducers";
import ActivityList from "./components/ActivityList";

import { initialState } from "./reducers/activity-reducers";

function App() {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    return (
        <>
            <header className="bg-blue-900 py-3 flex items-center justify-center gap-2">
                <span className="text-2xl">🅿️</span>
                <h1 className="text-center text-2xl font-bold text-yellow-300 uppercase tracking-wider drop-shadow">
                    Web Parking
                </h1>
                <span className="text-2xl">🚗</span>
            </header>
            
            <section className="bg-blue-700 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form 
                        dispatch={dispatch} 
                        state={state}
                    />
                </div>
            </section>
            
            <section className="py-10 px-5 mx-auto max-w-4xl">
                <ActivityList
                    activities={state.activities}
                    dispatch={dispatch}
                /> 
            </section>
        </>
    );
}

export default App;