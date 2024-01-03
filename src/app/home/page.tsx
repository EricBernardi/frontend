"use client";
import { Fragment, useEffect, useState } from "react";
import "./style.css";
import {
  Navbar,
  Modal,
  InputGroup,
  Form,
  Button,
  Container,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Stack from "react-bootstrap/Stack";
import {
  API_URL_BASE,
  ENDPOINT_EMPRESA,
  ENDPOINT_EMPRESAS,
  ENDPOINT_LICENCA,
  ENDPOINT_LICENCAS,
} from "../../utils/apiConfig";
import { Empresa, Licenca } from "@/app/home/interfaces/home";
import { ModalEmpresa } from "./components/ModalEmpresa";
import { ModalLicenca } from "./components/ModalLicenca";

export default function Home() {
  const [empresas, setEmpresas] = useState<Empresa[]>();
  const [licencas, setLicencas] = useState<Licenca[]>();
  const [formData, setFormData] = useState<Empresa>({} as Empresa);
  const [formDataLicense, setFormDataLicense] = useState<Licenca | {}>({});
  const [show, setShow] = useState(false);
  const [showModalLicenca, setShowModalLicence] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessLicence, setShowSuccessLicence] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorLicence, setShowErrorLicence] = useState(false);
  
  const handleShow = () => setShow(true);
  const handleCloseModalLicence = () => setShowModalLicence(false);
  const handleShowModalLicence = () => setShowModalLicence(true);
  
  const handleClose = () => {
    setFormData({} as Empresa);
    setFormDataLicense([]);
    setShow(false);
  };

  const updatedCompany = async () => {
    const updatedEmpresasResponse = await fetch(
      `${API_URL_BASE}${ENDPOINT_EMPRESAS}`
    );
    const updatedEmpresas = await updatedEmpresasResponse.json();
    return updatedEmpresas;
  }

  const updatedLicences = async () => {
    const updatedLicencasResponse = await fetch(
      `${API_URL_BASE}${ENDPOINT_LICENCAS}`
    );
    const updatedLicencas = await updatedLicencasResponse.json();
    return updatedLicencas;
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL_BASE}/delete-empresa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Empresa excluída com sucesso");
        const data = await updatedCompany();
        setEmpresas(data);
      } else {
        console.error(
          "Falha ao excluir a empresa. Código de resposta:",
          response.status
        );
      }
    } catch (error) {
      console.error("Ocorreu um erro ao excluir a empresa: ", error);
    }
  };

  const handleDeleteLicence = async (id: number) => {
    try {
      const response = await fetch(`${API_URL_BASE}/delete-licenca/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Licença excluída com sucesso");
        const data = await updatedLicences();
        setLicencas(data);
      } else {
        console.error(
          "Falha ao excluir a licença. Código de resposta:",
          response.status
        );
      }
    } catch (error) {
      console.error("Ocorreu um erro ao excluir a licença: ", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeLicence = (e: any) => {
    const { name, value } = e.target;
    setFormDataLicense({
      ...formDataLicense,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    if (
      !formData.razaoSocial ||
      !formData.cnpj ||
      !formData.cep ||
      !formData.cidade ||
      !formData.estado ||
      !formData.bairro
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2500);
      return;
    }

    var methodType = "POST";
    let url = "";
    try {
      if (formData.id) {
        methodType = "PUT";
        url = `/${formData.id}`;
      }
      const response = await fetch(`${API_URL_BASE}${ENDPOINT_EMPRESA}${url}`, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Empresa registrada com sucesso!");
        setShowSuccess(true);
        const updatedData = await updatedCompany();
        setEmpresas(updatedData);
        handleClose();
        setTimeout(() => {
          setShowSuccess(false);
        }, 2500);
      } else {
        console.error("Erro ao registrar empresa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao registrar empresa:", error);
    }
  };

  const alterLicences = (novasLicencas: Licenca[]) => {
    setLicencas([...novasLicencas]);
  };

  const handleRegisterLicence = async () => {
    var methodType = "POST";
    let url = "";
    const licence = formDataLicense as Licenca;
    if (
      (licence.empresaId ? !licence.empresaId : !licence.empresa) ||
      !licence.numero ||
      !licence.orgaoAmbiental ||
      !licence.emissao ||
      !licence.validade
    ) {
      setShowErrorLicence(true);
      setTimeout(() => {
        setShowErrorLicence(false);
      }, 2500);
      return;
    }
    try {
      if (licence?.id) {
        methodType = "PUT";
        url = `/${licence?.id}`;
      }
      const response = await fetch(`${API_URL_BASE}${ENDPOINT_LICENCA}${url}`, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataLicense),
      });
      if (response.ok) {
        setShowSuccessLicence(true);

        const result = await updatedLicences();
        setLicencas(result);
        handleCloseModalLicence();
        setFormDataLicense([]);
      } else {
        console.error("Erro ao registrar licença:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao registrar licença:", error);
    }
    setTimeout(() => {
      setShowSuccessLicence(false);
    }, 2500);
  };

  const handleEditCompany = (id: number) => {
    const empresa = empresas?.find((value) => value.id === id);
    if (empresa) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: empresa.id,
        razaoSocial: empresa.razaoSocial,
        cnpj: empresa.cnpj,
        cep: empresa.cep,
        cidade: empresa.cidade,
        estado: empresa.estado,
        bairro: empresa.bairro,
        complemento: empresa.complemento,
        licencas: empresa.licencas,
      }));
    }

    setShow(true);
  };

  const handleEditLicence = (id: number) => {
    const licenca = licencas?.find((value) => value.id === id);
    if (licenca) {
      setFormDataLicense((prevFormData) => ({
        ...(prevFormData as Licenca),
        id: licenca.id,
        empresa: licenca.empresa,
        numero: licenca.numero,
        orgaoAmbiental: licenca.orgaoAmbiental,
        emissao: licenca.emissao,
        validade: licenca.validade,
        empresaId: licenca.empresaId,
      }));
    }

    setShowModalLicence(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await updatedCompany();
        setEmpresas(data);
      } catch (error) {
        console.error("Erro ao obter dados das empresas:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await updatedLicences();
        setLicencas(data);
      } catch (error) {
        console.error("Erro ao obter dados das licencas:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShow}>
            Adicionar empresa
          </Button>
        </Container>
      </Navbar>
      <Alert
        show={showSuccess}
        variant="success"
        onClose={() => setShowSuccess(false)}
        dismissible
      >
        Empresa salva com sucesso.
      </Alert>
      <ModalEmpresa
        show={show}
        handleClose={handleClose}
        showModalLicenca={showModalLicenca}
        titleTypeModal="Empresa"
        showError={showError}
        setShowError={setShowError}
        showSuccessLicence={showSuccessLicence}
        setShowSuccessLicence={setShowSuccessLicence}
        handleInputChange={handleInputChange}
        formData={formData}
        licencas={licencas}
        empresas={empresas}
        handleEditLicence={handleEditLicence}
        handleDeleteLicence={handleDeleteLicence}
        handleShowModalLicence={handleShowModalLicence}
        handleRegister={handleRegister}
        alterLicences={alterLicences}
      />
      <ul className="list-group">
        {empresas ? (
          empresas.map((value) => {
            return (
              <ListGroup key={value.id}>
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {value.razaoSocial}{" "}
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      onClick={() => handleEditCompany(value.id)}
                      className="mr-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button onClick={() => handleDelete(value.id)}>
                      <FaTrash />
                    </Button>
                  </Stack>
                </ListGroup.Item>
              </ListGroup>
            );
          })
        ) : (
          <Container className="d-flex justify-content-center">
            Não há empresas cadastradas
          </Container>
        )}
      </ul>
      <ModalLicenca
        show={showModalLicenca}
        handleClose={handleCloseModalLicence}
        titleTypeModal="Licença"
        showError={showErrorLicence}
        setShowError={setShowErrorLicence}
        handleInputChange={handleInputChangeLicence}
        formData={formDataLicense}
        empresas={empresas}
        handleCloseModal={handleCloseModalLicence}
        handleRegister={handleRegisterLicence}
      />
    </Fragment>
  );
}
