import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getDateWithFormat } from 'helpers/Utils';

import todoData from 'data/todos.json';
import { TODO_GET_LIST, TODO_ADD_ITEM, ASSIGN_TICKET } from '../contants';

import {
  getTodoListSuccess,
  getTodoListError,
  getTodoList ,
  addTodoItemSuccess,
  addTodoItemError,
  assignTicketSuccess,
  assignTicketError,
} from './actions';

// Fonction asynchrone pour effectuer l'assignation du ticket
export const assignTicketRequest = async (ticketId, supportId) => {
  const response = await fetch(
    'http://localhost:8080/api/TicketAssign/assign-ticket',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticketId, supportId }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }


  return response.json();
};

// Fonction de gestionnaire d'action pour l'assignation de ticket
function* assignTicket(action) {
  try {
    const { ticketId, supportId } = action.payload;
    yield call(assignTicketRequest, ticketId, supportId);
    yield put(assignTicketSuccess());
    // Vous pouvez également déclencher une action pour récupérer la liste des tickets après l'assignation.
    yield put(getTodoList());
  } catch (error) {
    yield put(assignTicketError(error));
  }
}

// Fonction de surveillance pour l'action ASSIGN_TICKET
export function* watchAssignTicket() {
  yield takeEvery(ASSIGN_TICKET, assignTicket);
}

export const getTodoListRequest = async () => {
  const response = await fetch('http://localhost:8080/api/tickets/findAll');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
export function* getTodoListItems() {
  try {
    const response = yield call(getTodoListRequest);
    yield put(getTodoListSuccess(response));
    
  } catch (error) {
    yield put(getTodoListError(error));
  }
}

const addTodoItemRequest = async (item) => {
  const items = todoData.data;
  // eslint-disable-next-line no-param-reassign
  item.id = items.length + 1;
  // eslint-disable-next-line no-param-reassign
  item.createDate = getDateWithFormat();
  items.splice(0, 0, item);
  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {
    setTimeout(() => {
      success(items);
    }, 1000);
  })
    .then((response) => response)
    .catch((error) => error);
};

function* addTodoItem({ payload }) {
  try {
    const response = yield call(addTodoItemRequest, payload);
    yield put(addTodoItemSuccess(response));
  } catch (error) {
    yield put(addTodoItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(TODO_GET_LIST, getTodoListItems);
}

export function* wathcAddItem() {
  yield takeEvery(TODO_ADD_ITEM, addTodoItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}