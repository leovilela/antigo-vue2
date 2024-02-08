<template>
  <component :is="component" @skipFormNow="$emit('skipFormNow')" />
</template>

<script>

import loanForms from './forms'
import {upperFirstLetter} from '~/utils/string.utils'

const UpperFirstLetter = upperFirstLetter

export default {
  props: {
    form: {
      type: String,
      validator(value) {
        return loanForms.includes(value)
      }
    }
  },
  computed: {
    activeForm() {
      return this.$children[0]
    },
     component() {
       if(!this.form){
         return
        }

        return () => import(`../Forms/Base${UpperFirstLetter(this.form)}Form`)
    }
  }
}
</script>
