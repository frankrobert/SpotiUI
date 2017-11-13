import actionTyper from 'actiontyper';
import { getData, updateState } from '../configure-store';

const {
  MODAL_OPENED,
  MODAL_CLOSED
} = actionTyper('/APP/');

const initialState = {
  isActive: false,
  modal: ''
};

const modalOpened = (activeState, modalType) => {
  return {
    type: MODAL_OPENED,
    payload: {
      isActive: activeState,
      modal: modalType
    }
  };
};

const modalClosed = (activeState) => {
  return {
    type: MODAL_CLOSED,
    payload: {
      isActive: activeState,
      modal: ''
    }
  };
};

export const toggleModal = (activeState, modalType) => {
  if (activeState) return modalOpened(activeState, modalType);

  return modalClosed(activeState);
}

const setModal = (state, action) => updateState(state, action.payload);

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
      case MODAL_OPENED: return setModal(state, action);
      case MODAL_CLOSED: return setModal(state, action);
      default: return state;
  }
}