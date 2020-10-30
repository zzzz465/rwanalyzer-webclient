<style>

</style>

<template lang="pug">
  .root
    .title
      p {{ name }}
    div(v-for="item in entries")
      div {{ item }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    set: {
      type: Set,
      required: true
    }
  },

  computed: {
    entries () {
      const data = [...this.set.values()] as string[]
      return data
    }
  },

  mounted() {
    console.log(this.name)
    console.log(this.set)
  },

  watch: {
    
  }
})
</script>
