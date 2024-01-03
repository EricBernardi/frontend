import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Stack,
} from "react-bootstrap";
import { ModalEmpresaDTO } from "../interfaces/home";
import { FaEdit, FaTrash } from "react-icons/fa";

export const ModalEmpresa: React.FC<ModalEmpresaDTO> = ({
  show,
  handleClose,
  showModalLicenca,
  titleTypeModal,
  showError,
  setShowError,
  showSuccessLicence,
  setShowSuccessLicence,
  handleInputChange,
  formData,
  licencas,
  empresas,
  handleEditLicence,
  handleDeleteLicence,
  handleShowModalLicence,
  handleRegister,
  alterLicences,
}) => {
  useEffect(() => {
    if (licencas) alterLicences(licencas);
  }, []);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={showModalLicenca ? "hidden" : "visible"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{titleTypeModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          show={showError}
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          Por favor, preencha todos os campos.
        </Alert>
        <Alert
          show={showSuccessLicence && !showError}
          variant="success"
          onClose={() => setShowSuccessLicence(false)}
          dismissible
        >
          Licença salva com sucesso.
        </Alert>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            Razão social
          </InputGroup.Text>
          <Form.Control
            aria-label="razaoSocial"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="razaoSocial"
            value={formData?.razaoSocial}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">CNPJ</InputGroup.Text>
          <Form.Control
            aria-label="cnpj"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="cnpj"
            value={formData?.cnpj}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">CEP</InputGroup.Text>
          <Form.Control
            aria-label="cep"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="cep"
            value={formData?.cep}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Cidade</InputGroup.Text>
          <Form.Control
            aria-label="cidade"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="cidade"
            value={formData?.cidade}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Estado</InputGroup.Text>
          <Form.Control
            aria-label="estado"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="estado"
            value={formData?.estado}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Bairro</InputGroup.Text>
          <Form.Control
            aria-label="bairro"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="bairro"
            value={formData?.bairro}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            Complemento
          </InputGroup.Text>
          <Form.Control
            aria-label="complemento"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
            name="complemento"
            value={formData?.complemento}
          />
        </InputGroup>
        {licencas ? (
          licencas.map((value: any) => {
            if (value?.empresaId === formData?.id)
              return (
                <ListGroup key={value.empresa} className="mb-3">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <Stack direction="horizontal">
                      Licença número: {value.numero}
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        size="sm"
                        onClick={() => handleEditLicence(value.id)}
                        className="mr-2"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteLicence(value.id)}
                      >
                        <FaTrash />
                      </Button>
                    </Stack>
                  </ListGroup.Item>
                </ListGroup>
              );
          })
        ) : (
          <Container className="d-flex justify-content-center mb-3">
            Não existem licenças para essa empresa
          </Container>
        )}
        {empresas && (
          <Container className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleShowModalLicence}>
              Adicionar licença
            </Button>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
