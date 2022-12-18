import produce  from 'immer';
const INITIAL_STATE = {
    user:false
    
}

function user(state = INITIAL_STATE, action){
    switch(action.type){
        case '@user/SET_USER':{
            return produce(state,(draft)=>{
                draft.user = action.user;
            })

        }
        default:
            return state;
    }

}

export default user