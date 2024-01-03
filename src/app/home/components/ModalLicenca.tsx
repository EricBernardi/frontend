import {
  Alert,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { Empresa, Licenca, ModalLicencaDTO } from "../interfaces/home";

export const ModalLicenca: React.FC<ModalLicencaDTO> = ({
  show,
  handleClose,
  titleTypeModal,
  showError,
  setShowError,
  handleInputChange,
  formData,
  empresas,
  handleCloseModal,
  handleRegister,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Empresa</InputGroup.Text>
          <Form.Select
            aria-label="empresa"
            aria-describedby="inputGroup-sizing-sm"
            name="empresa"
            onChange={handleInputChange}
            defaultValue={0}
            value={(formData as Licenca)?.empresaId}
          >
            <option value={0} disabled>
              Selecione
            </option>
            {empresas &&
              empresas.map((value) => {
                return (
                  <>
                    <option value={value.id}>{value.razaoSocial}</option>
                  </>
                );
              })}
          </Form.Select>
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Número</InputGroup.Text>
          <Form.Control
            aria-label="numero"
            aria-describedby="inputGroup-sizing-sm"
            name="numero"
            value={(formData as Licenca)?.numero}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            Órgão ambiental
          </InputGroup.Text>
          <Form.Control
            aria-label="orgaoAmbiental"
            aria-describedby="inputGroup-sizing-sm"
            name="orgaoAmbiental"
            value={(formData as Licenca)?.orgaoAmbiental}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Emissão</InputGroup.Text>
          <Form.Control
            type="date"
            aria-label="emissao"
            aria-describedby="inputGroup-sizing-sm"
            name="emissao"
            value={(formData as Licenca)?.emissao}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Validade</InputGroup.Text>
          <Form.Control
            type="date"
            aria-label="validade"
            aria-describedby="inputGroup-sizing-sm"
            name="validade"
            value={(formData as Licenca)?.validade}
            onChange={handleInputChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Registrar licença
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
