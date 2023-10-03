/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';



const ListPageHeading = ({
  intl,
  displayMode,
  changeDisplayMode,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,

  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,

 
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;
  const [selectedItems, setSelectedItems] = useState([]);


  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id="Wellcome" />
          </h1>

          <div className="text-zero top-right-button-container">
           

            <NavLink to="/app/pages/product/create-ticket"> 
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
             
            >
              <IntlMessages id="pages.add-new" />
            </Button></NavLink>
            
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="pages.another-action" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
         
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.display-options" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
           

            <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="pages.orderby" />
                  {selectedOrderOption.label}
                </DropdownToggle>
                <DropdownMenu>
                  {orderOptions.map((order, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changeOrderBy(order.column)}
                      >
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={messages['menu.search']}
                  onKeyPress={(e) => onSearchKey(e)}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">
                <IntlMessages id="pages.viewing" />
                {startIndex + 1}-
                {totalItemCount >= endIndex ? endIndex : totalItemCount}
                {` | `}
                <IntlMessages id="pages.total" />
                {totalItemCount}
              </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
