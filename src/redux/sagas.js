import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';

import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import todoSagas, { watchAssignTicket } from './todo/saga'; 

export default function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    watchAssignTicket(),
  ]);
}
