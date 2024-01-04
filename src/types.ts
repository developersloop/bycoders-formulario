export type TPayload = {
  "step-one": {
    email?: string | null,
    typePessoa?: string | null,
  },
  "step-two_pessoa_fisica": {
    nome?: string | null,
    cpf?: string | null,
    data_nascimento?: Data | string | null,
    phone?: string | null,
  },
  "step-two_pessoa_juridica": {
    razao_social?: string | null,
    cnpj?: string | null,
    data_abertura?: Date | string | null,
    phone?: string | null,
  },
  "step-three": {
    password: string | null,
  },
}