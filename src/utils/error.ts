import { AxiosError } from "axios";

export const getErrorMessage = (error?: any): string => {
  if (!error) return "Motivo desconhecido";
  if (error.isAxiosError) return getAxiosErrorMessage(error);
  if (error instanceof Error) return error.message;
  return "Motivo desconhecido";
};

const getAxiosErrorMessage = (error: AxiosError<any>): string => {
  if (error.response) {
    const status = error.response.status;
    const statusText = error.response.statusText;

    switch (status) {
      case 400: // Bad request
        return statusText
          ? `([${status}] Requisição inválida): ${statusText}`
          : `Requisição inválida`;
      case 401: // Unauthorized
        return statusText
          ? `([${status}] Não autorizado): ${statusText}`
          : `Não autorizado`;
      case 403: // Forbidden
        return statusText
          ? `([${status}] Acesso negado): ${statusText}`
          : `Acesso negado`;
      case 404: // Not found
        return statusText
          ? `([${status}] Recurso não encontrado): ${statusText}`
          : `Recurso não encontrado`;
      case 409: // Conflict
        return statusText
          ? `([${status}] Conflito de dados): ${statusText}`
          : `Conflito de dados`;
      case 422: // Unprocessable entity
        return statusText
          ? `([${status}] Dados de validação inválidos): ${statusText}`
          : `Dados de validação inválidos`;
      case 500: // Internal server error
        return statusText
          ? `([${status}] Erro interno do servidor): ${statusText}`
          : `Erro interno do servidor`;
      case 502: // Bad gateway
        return statusText
          ? `([${status}] Erro de gateway ruim): ${statusText}`
          : `Erro de gateway ruim`;
      case 503: // Service unavailable
        return statusText
          ? `([${status}] Serviço indisponível): ${statusText}`
          : `Serviço indisponível na API`;
      default:
        return statusText
          ? `(${status}): ${statusText}`
          : `Erro código HTTP ${status}`;
    }
  }

  if (error.request) return "Conexão falhou ao enviar requisição";
  if (error.code === "ECONNABORTED") return "Conexão abortada";
  if (error.code === "ECONNREFUSED") return "Conexão recusada";
  if (error.code === "ETIMEDOUT") return "Tempo limite da requisição atingido";
  if (error.code === "ENOTFOUND") return "Host não encontrado";
  return "Motivo desconhecido";
};
