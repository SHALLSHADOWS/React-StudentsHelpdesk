import React, { useState, useEffect } from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
  const [categoryName, setCategoryName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/categories/${product.category_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Affiche les données retournées par l'API
        setCategoryName(data.data.name);
      })
      .catch((error) => console.error(error));
  }, [product.category_id]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/byId/${product.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Affiche les données retournées par l'API
        setUserName(data.data.name);
      })
      .catch((error) => console.error(error));
  }, [product.user_id]);

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.subject}
                </p>
              </NavLink>

              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {userName}
              </p>

              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {categoryName}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {new Date(product.create_date).toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>

              <div className="w-15 w-sm-100">
                <p>{product.number}</p>
              </div>

              <div className="w-15 w-sm-100">
                <p>
                  Pièce jointe{' '}
                  <Badge pill>
                    {product.attachmentsPath
                      ? product.attachmentsPath.length
                      : 0}
                  </Badge>
                </p>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
