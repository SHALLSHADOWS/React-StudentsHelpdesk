/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { NavItem, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from 'helpers/IntlMessages';
import ApplicationMenu from 'components/common/ApplicationMenu';
import { getTodoListWithFilter } from 'redux/actions';

const TodoApplicationMenu = ({
  todoItems,
  filter,
  allTodoItems,
  loaded,
  labels,
  categories,
  getTodoListWithFilterAction,
}) => {
  const addFilter = (column, value) => {
    getTodoListWithFilterAction(column, value);
  };
console.log(allTodoItems)
  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <IntlMessages id="todo.status" />
          </p>
          
          <ul className="list-unstyled mb-5">
            <NavItem className={classnames({ active: !filter })}>
              <NavLink to="#" onClick={() => addFilter('', '')} location={{}}>
                <i className="simple-icon-reload" />
                <IntlMessages id="all tickets" />
                <span className="float-right">
                  {loaded && allTodoItems.length}
                </span>
              </NavLink>
            </NavItem>


            <NavItem
              className={classnames({
                active:
                  filter 
              })}
            >
              <NavLink
                location={{}}
                to="#"
                onClick={() => addFilter('status', 'UNASSIGN')}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="Unassign tickets" />
                <span className="float-right">
                  {loaded &&
                    todoItems.filter((x) => x.status === 'UNASSIGN').length}
                </span>
              </NavLink>
            </NavItem>




            <NavItem
              className={classnames({
                active:
                  filter 
              })}
            >
              <NavLink
                location={{}}
                to="#"
                onClick={() => addFilter('status', 'ASSIGN')}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="Assign tickets" />
                <span className="float-right">
                  {loaded &&
                    todoItems.filter((x) => x.status === 'ASSIGN').length}
                </span>
              </NavLink>
            </NavItem>









          </ul>

         
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const { todoItems, filter, allTodoItems, loaded, labels, categories } =
    todoApp;

  return {
    todoItems,
    filter,
    allTodoItems,
    loaded,
    labels,
    categories,
  };
};
export default connect(mapStateToProps, {
  getTodoListWithFilterAction: getTodoListWithFilter,
})(TodoApplicationMenu);
