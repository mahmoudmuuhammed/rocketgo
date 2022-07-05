import { validateRequest } from "./validate-request.middleware";
import { errorHandler } from "./error-handler.middleware";

export default {
  errorHandler,
  validateRequest,
};
