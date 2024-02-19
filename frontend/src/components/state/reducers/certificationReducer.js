const certificationReducer = (list=[], action) => {
    switch(action.type){
        case "ADD_CERTIFICATION":
            return [ ...list, action.payload];
        case "EDIT_CERTIFICATION":
            let newArr = [...list]
            newArr[action.payload.id] = action.payload;
            return newArr;
        case "REMOVE_CERTIFICATION":
            let arr = [...list]
            arr.splice(action.payload, 1);
            return arr;
        default:
            return list;
    }
}
export default certificationReducer