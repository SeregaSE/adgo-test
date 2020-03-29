import { INCREASE_OFFSET, REDUCE_OFFSET, CHANGE_OFFSET } from '../../constants';

let OFFSET = {
    offset:[0]
}

export const offset = (state = OFFSET.offset, { type, num }) => {
    switch (type){
        case INCREASE_OFFSET:
            return [
                Number(state)+1
            ];
        case REDUCE_OFFSET:
            return [
                Number(state)-1
            ];
        case CHANGE_OFFSET:
            return [num];
        default:
            return state;
    }
}