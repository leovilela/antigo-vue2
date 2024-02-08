import Form from "~/interfaces/Form";
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('loan')
const { mapState: affiliateState } = createNamespacedHelpers('affiliate')

const form = new Form()

export default {
  data() {
    return { ...form.build() }
  },
  computed: {
    ...mapGetters(['getBlock']),
    ...mapState(['registerFormId', 'blocks']),
    ...affiliateState(['affiliate'])
  },
  async beforeDestroy() {
    if (!this.skipFormNow) {
      await this.setRegisterStep(this.hasToUpdateStep)
    }
  },
  methods: {
    async loadModel() {
      await this.getBlockWithName(this.name)
      this.$nextTick(() => {
        this.fillModel()
      })
    },

    fillModel() {
      const formBlock = this.blocks.find(block => block.name === this.name)
      if (!formBlock) {
        return
      }
      this.model = formBlock.model
      this.formKey += 1
    },
    ...mapActions(['getBlockWithName', 'createOrUpdateBlockWithName', 'setRegisterStep', 'getRegisterStatus']),
    validateSelf() {
      if (!this.$refs.form) {
        this.isFormValid = true
        return
      }
      if (Array.isArray(this.$refs.form)) {
        this.$refs.form.forEach(form => {
          this.isFormValid = form.validate()
        });
        return
      }
      this.isFormValid = this.$refs.form.validate()
    },

    async createOrUpdateSelf() {
      await this.createOrUpdateBlockWithName({ name: this.name, blockData: this.sendModel, hasToUpdate: this.hasToUpdate })
    }
  }
}
