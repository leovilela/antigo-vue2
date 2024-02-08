import { validateCNPJ, validateCPF } from "./validate.utils";

import {
  helpers,
} from "vuelidate/lib/validators";

export const phoneRegexMobile = helpers.regex(
  "cellphone",
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
);

export const phoneRegexFixo = helpers.regex(
  "telefone",
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:[2-6]\d|[0-9])\d{2})\-?(\d{4}))$/,
);

