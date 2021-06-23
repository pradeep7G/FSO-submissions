
const filterReducer=(state='',action)=>{
    switch(action.type){
      case 'SET_FILTER':
        return action.filter
      default :
        return state
    }
}

//action creators

export const setFilter=(filter)=>{
  return {
    type:'SET_FILTER',
    filter:filter
  }
}

export default filterReducer