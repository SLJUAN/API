import { useMemo } from "react";
import type { Dispatch } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { ActivityActions } from "../reducers/activity-reducers";

type ActivityListProps = {
    activities: Activity[];
    dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
    const categoryName = useMemo(() => 
        (category: Activity['category']) => 
            categories.find(cat => cat.id === category)?.name || '',
        [activities]
    );

    return (
        <> 
            <h2 className="text-4xl font-bold text-slate-600 text-center my-10">
                Clientes y Servicios
            </h2>

            {activities.length === 0 ? (
                <p className="text-center my-5 text-gray-500">No hay registros aún...</p>
            ) : (
                activities.map(activity => (
                    <div 
                        key={activity.id} 
                        className="px-5 py-10 bg-white mt-5 flex justify-between shadow rounded-lg"
                    >
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                                ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}
                            >
                                {categoryName(activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500">
                                Placas del Vehículo {/* Texto fijo agregado */}
                                <span className="text-sm text-gray-500">{activity.calories || '0'}</span>
                            </p>
                        </div>
                        
                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({
                                    type: "set-activeId",
                                    payload: { id: activity.id }
                                })}
                            >
                                <PencilSquareIcon className="h-6 w-6 text-gray-800" />
                            </button>
                            
                            <button
                                onClick={() => dispatch({
                                    type: "delete-activity",
                                    payload: { id: activity.id }
                                })}
                            >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}