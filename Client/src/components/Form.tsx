import { useState, useEffect } from "react";
import type { Dispatch, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducers";

// Animación simple con Tailwind
const inputAnim = "transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:scale-105";

const initialState = {
    id: '',
    category: 0,
    name: "",
    calories: "" as string | number,
};

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
};

export default function Form({ dispatch, state }: FormProps) {
    const [activity, setActivity] = useState(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.find(
                activity => activity.id === state.activeId
            ) || initialState;
            setActivity(selectedActivity);
        }
    }, [state.activeId, state.activities]);

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = e.target;
        setActivity({ ...activity, [id]: id === "category" ? +value : value });
    };

    const isValidActivity = () => {
        return activity.category !== 0 && 
               activity.name.trim() !== "" && 
               activity.calories.toString().trim() !== "";
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: "save-activity",
            payload: { newActivity: { ...activity, calories: activity.calories.toString() } },
        });
        setActivity(initialState);
    };

    return (
        <form 
            className="space-y-8 bg-gradient-to-br from-cyan-50 to-cyan-200 shadow-2xl p-10 rounded-2xl animate-fade-in"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="category" className="font-bold text-blue-900">
                    Servicio:
                </label>
                <select
                    id="category"
                    className={`border border-blue-300 p-3 rounded-xl w-full bg-white ${inputAnim}`}
                    value={activity.category}
                    onChange={handleChange}
                >
                    <option value={0}>-- Seleccionar --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="name" className="font-bold text-blue-900">
                    Cliente:
                </label>
                <input
                    id="name"
                    type="text"
                    className={`border border-blue-300 p-3 rounded-xl ${inputAnim}`}
                    placeholder="Nombre del cliente"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="calories" className="font-bold text-blue-900">
                    Placas:
                </label>
                <input
                    id="calories"
                    type="text"
                    className={`border border-blue-300 p-3 rounded-xl ${inputAnim}`}
                    placeholder="Placas del Vehículo"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-700 hover:bg-blue-900 w-full p-3 font-bold uppercase text-white cursor-pointer rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-30"
                value={
                    activity.category === 1 ? "Guardar Estacionamiento" :
                    activity.category === 2 ? "Guardar Pensión" :
                    "Guardar Servicio"
                }
                disabled={!isValidActivity()}
            />
        </form>
    );
}