import { useState, useEffect } from "react";
import type { Dispatch, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducers";

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
};

const initialState = {
    id: '',
    category: 0,
    name: "",
    calories: "" as string | number, // Valor inicial modificado a string "0" 
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
    }, [state.activeId]);

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
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Servicio:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
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

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Cliente:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Nombre del cliente"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Placas:</label>
                <input
                    id="calories"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Placas del Vehículo"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
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