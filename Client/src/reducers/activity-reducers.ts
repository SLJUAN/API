import type { Activity } from "../types";

export type ActivityActions = 
    | { type: "save-activity"; payload: { newActivity: Activity } }
    | { type: "set-activeId"; payload: { id: Activity['id'] } }
    | { type: "delete-activity"; payload: { id: Activity['id'] } }
    | { type: "load-state"; payload: ActivityState }; 

export type ActivityState = {
    activities: Activity[];
    activeId: Activity['id'];
};

const savedState = typeof window !== 'undefined' ? localStorage.getItem('activitiesState') : null;
const parsedState = savedState ? JSON.parse(savedState) : null;

export const initialState: ActivityState = parsedState || {
    activities: [],
    activeId: '',
};

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {
    let newState;
    
    switch (action.type) {
        case "save-activity": {
            let updatedActivities: Activity[] = [];

            if (state.activeId) {
                updatedActivities = state.activities.map(activity => 
                    activity.id === state.activeId ? action.payload.newActivity : activity
                );
            } else {
                updatedActivities = [...state.activities, {
                    ...action.payload.newActivity,
                    id: uuidv4()
                }];
            }

            newState = {
                ...state,
                activities: updatedActivities,
                activeId: '',
            };
            break;
        }

        case "set-activeId":
            newState = {
                ...state,
                activeId: action.payload.id,
            };
            break;

        case "delete-activity":
            newState = {
                ...state,
                activities: state.activities.filter(
                    activity => activity.id !== action.payload.id
                ),
            };
            break;

        case "load-state":
            newState = action.payload;
            break;

        default:
            return state;
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem('activitiesState', JSON.stringify(newState));
    }

    return newState;
};

function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}