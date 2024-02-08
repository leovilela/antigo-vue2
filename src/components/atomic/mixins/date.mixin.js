import { dateI18n } from '~/utils/date.utils';
import DatePicker from "vue2-datepicker";
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      lang: dateI18n
    }
  },
}
