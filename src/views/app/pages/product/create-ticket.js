import React, { useState, useEffect } from 'react';
import DropzoneExample from 'containers/forms/DropzoneExample';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  Button,
  FormText,
  Form,
} from 'reactstrap';

import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const HelloWorld = () => {
  const [selectData, setSelectData] = useState([]);
  const [formValues, setFormValues] = useState({
    email: '',
    subject: '',
    category_id: null, // You can set the initial value to null or an appropriate value
    description: '',
    attachments: [],
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/categories/findAll')
      .then((response) => response.json())
      .then((data) => {
        const newSelectData = data.map((item, index) => ({
          label: item.name,
          value: item.name,
          key: item.id,
        }));
        setSelectData(newSelectData);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (e.value) {
      const selectedOption = selectData.find(
        (option) => option.value === e.value
      );
      if (selectedOption) {
        setFormValues((prevState) => ({
          ...prevState,
          category_id: selectedOption.key,
        }));
      }
    }
  };

  const handleFileUpload = (uploadedFiles) => {
    setFormValues((prevState) => ({
      ...prevState,
      attachments: [...prevState.attachments, ...uploadedFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileLinks = []; // Définissez fileLinks ici

    try {
      // Étape 1 : Téléchargez les fichiers et obtenez les liens
      const attachments = new FormData();
      formValues.attachments.forEach((file, index) => {
        attachments.append(`file${index}`, file);
      });

      // Affichez le nombre de fichiers et leurs noms
      console.log(`Envoi de ${formValues.attachments.length} fichiers :`);

      formValues.attachments.forEach((file) => {
        attachments.append('attachments', file);
      });

      const fileResponse = await fetch(
        'http://localhost:8080/api/ticketsAttachments/upload',
        {
          method: 'POST',
          body: attachments,
        }
      );

      if (!fileResponse.ok) {
        console.log(`HTTP error! status: ${fileResponse.status}`);
      }

      fileLinks = await fileResponse.json();

      // Reste du code...
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du téléchargement des fichiers :",
        error
      );
    }

    const formData = {
      user_id: 3,
      create_date: new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      description: formValues.description,
      category_id: formValues.category_id,
      priorityLevel: 'Medium',
      subject: formValues.subject,
      attachmentsPath: fileLinks,
      email: formValues.email,
    };

    const response = await fetch('http://localhost:8080/api/tickets/create', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Ticket creation successful', formData);
    } else {
      console.log('Ticket creation failed', formData);
    }
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="Create a new ticket" />
            </CardTitle>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">
                  <IntlMessages id="forms.email" />
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  onChange={handleChange}
                />

                <FormText color="muted">
                  <IntlMessages id="forms.email-muted" />
                </FormText>
              </FormGroup>

              <Label>
                <IntlMessages id="Subject" />
              </Label>
              <Input
                type="text"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
              />

              <Label className="mt-4">
                <IntlMessages id="pages.category" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="category_id"
                options={selectData}
                onChange={handleChange}
              />
              <Label className="mt-4">
                <IntlMessages id="pages.description" />
              </Label>
              <Input
                type="textarea"
                name="description"
                id="exampleText"
                onChange={handleChange}
              />

              <Label className="mt-4">Attachment</Label>

              <DropzoneExample onFilesUpload={handleFileUpload} />
              <Button color="primary" className="mt-4">
                <IntlMessages id="forms.submit" />
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default HelloWorld;
