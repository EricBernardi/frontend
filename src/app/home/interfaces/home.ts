export interface Empresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
  licencaId: number;
  licencas: Licenca[];
}

export interface Licenca {
  id: number;
  empresa: number[];
  numero: string;
  orgaoAmbiental: string;
  emissao: any;
  validade: any;
  empresaId: number;
}

export interface ModalEmpresaDTO {
  show: boolean;
  handleClose: () => void;
  showModalLicenca: boolean;
  titleTypeModal: string;
  showError: boolean;
  setShowError: (value: boolean) => void;
  showSuccessLicence: boolean;
  setShowSuccessLicence: (value: boolean) => void;
  handleInputChange: (value: any) => void;
  formData: Empresa;
  licencas?: Licenca[];
  empresas?: Empresa[];
  handleEditLicence: (id: number) => void;
  handleDeleteLicence: (id: number) => void;
  handleShowModalLicence: () => void;
  handleRegister: () => void;
  alterLicences: (licencas: Licenca[]) => void;
}

export interface ModalLicencaDTO {
  show: boolean;
  handleClose: () => void;
  titleTypeModal: string;
  showError: boolean;
  setShowError: (value: boolean) => void;
  handleInputChange: (value: any) => void;
  formData: Licenca | {};
  empresas?: Empresa[];
  handleCloseModal: () => void;
  handleRegister: () => void;
}
