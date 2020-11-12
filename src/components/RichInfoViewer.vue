<style scoped>
  .root-RichInfoViewer {
    width: 100%;
    height: 100%;
    color: white;
  }
  .names {
    margin-top: 30px;
  }
  .modName {

  }
  .typeName {

  }
  .methodName {

  }
  .assemblyName {

  }
  .patchType {

  }
  .patches {

  }
</style>

<template lang="pug">
  .root-RichInfoViewer
    h1.names.modName {{ modName }}
    h4.names.typeName {{ typeName }}
    h2.names.methodName {{ methodName }}
    h5.names.assemblyName {{ assemblyName }}
    h5.names.patchType {{ patchType }}
    .patches
</template>

<script lang="ts">
import { GeneralInformation } from '@/Logs/LogDataReceiver'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    richInfo: {
      type: Object as PropType<GeneralInformation>,
      required: true
    }
  },

  computed: {
    modName (): string {
      return this.richInfo.modName
    },

    typeName (): string {
      return this.richInfo.typeName
    },

    methodName (): string {
      return this.richInfo.methodName
    },

    assemblyName (): string {
      return this.richInfo.assemblyName
    },

    patchType (): string {
      return this.richInfo.patchType
    }
  },

  methods: {

  }
})
</script>
