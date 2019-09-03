import { COURSE_SELECTED, GROUP_SELECTED, GROUPS_RESET } from '../constants/Action-types';

export function selectCourse(payload) {
    return { type: COURSE_SELECTED, payload }
};

export function selectGroup(payload) {
    return { type: GROUP_SELECTED, payload }
};

export function resetGroups(payload) {
    return { type: GROUPS_RESET, payload: '' }
};