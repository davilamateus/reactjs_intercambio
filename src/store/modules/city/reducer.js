import produce  from 'immer';
const INITIAL_STATE = {city:false};

function user(state = INITIAL_STATE, action){
    switch(action.type){
        case '@user/SET_CITY':{
            return produce(state,(draft)=>{
                draft.city = action.city;
            })

        }
        default:
            return state;
    }

}

export default user