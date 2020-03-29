import { INCREASE_OFFSET, REDUCE_OFFSET, CHANGE_OFFSET } from '../constants';

export const increaseOffset = () => {
    return {
        type:INCREASE_OFFSET
    }
}

export const reduceOffset = () => {
    return {
        type:REDUCE_OFFSET
    }
}

export const changeOffset = (num) => {
    return {
        type:CHANGE_OFFSET,
        num
    }
}

