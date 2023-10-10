import React, { useState, useEffect } from 'react';

import {
  Card,
  CardBody,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import IntlMessages from 'helpers/IntlMessages';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { createNotification } from 'containers/ui/NotificationExamples';
import { assignTicketRequest } from 'redux/todo/saga';

import { Colxx } from '../common/CustomBootstrap';

const TodoListItem = ({ item, handleCheckChange, isSelected }) => {
  const [categoryName, setCategoryName] = useState('');
  const [modalBasic, setModalBasic] = useState(false);
  const [selectedOptionLO, setSelectedOptionLO] = useState('');

  const [modalLong, setModalLong] = useState(false);

  //
  const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/supports/findAll')
      .then((response) => response.json())
      .then((data) => {
        const newSelectData = data.map((items, index) => ({
          label: items.name,
          value: items.name,
          key: items.id,
        }));
        setSelectData(newSelectData);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/categories/${item.category_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryName(data.data.name);
      })
      .catch((error) => console.error(error));
  }, [item.category_id]);

  const assignTicket = async () => {
    try {
      const ticketId = item.id; // l'ID du ticket sur lequel vous avez cliqué
      const supportId = selectedOptionLO.key; // l'ID du support sélectionné

      // Call the assignTicketRequest function
      await assignTicketRequest(ticketId, supportId);

      // You can add any additional logic here, such as updating UI state
      // or displaying a success message.
    } catch (error) {
      createNotification('error', 'filled', 'Faild to assign');
    }

    createNotification('success', 'filled', 'Ticket Assign successful');

    setModalBasic(false);
  };

  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to="#"
              location={{}}
              id={`toggler${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <span className="align-middle d-inline-block">
                {item.subject}
              </span>
            </NavLink>
            {/*nom de la categories*/}
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {categoryName}
            </p>

            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.create_date}
            </p>

            <div className="w-15 w-xs-100">
              <Badge color={item.labelColor} pill>
                {item.status}
              </Badge>
            </div>

            <div className="w-15 w-xs-100">
              <Button
                color="primary"
                outline
                onClick={() => setModalLong(true)}
              >
                <IntlMessages id="View Description" />
              </Button>
              <Modal isOpen={modalLong} toggle={() => setModalLong(!modalLong)}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>{item.description}</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => setModalLong(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>

            <div className="w-15 w-xs-100 d-flex align-items-center">
              <Button
                color="primary"
                outline
                onClick={() => setModalBasic(true)}
                style={{
                  display: item.status === 'UNASSIGN' ? 'block' : 'none',
                }}
              >
                <IntlMessages id="Assign" />
              </Button>

              <Modal
                isOpen={modalBasic}
                toggle={() => setModalBasic(!modalBasic)}
              >
                <ModalHeader>
                  <IntlMessages id="support" />
                </ModalHeader>
                <ModalBody>
                  <div className="form-group has-float-label">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={selectedOptionLO}
                      onChange={(val) => setSelectedOptionLO(val)}
                      options={selectData}
                      placeholder=""
                    />
                    <span>
                      <IntlMessages id="Choose a support" />
                    </span>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={assignTicket}>
                    Assign
                  </Button>{' '}
                  <Button
                    color="secondary"
                    onClick={() => setModalBasic(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </CardBody>

          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item.id}`}
              checked={isSelected}
              onChange={(event) => handleCheckChange(event, item.id)}
              label=""
            />
          </div>
        </div>
        <div className="card-body pt-1">
          <p className="mb-0">{item.detail}</p>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(TodoListItem);
