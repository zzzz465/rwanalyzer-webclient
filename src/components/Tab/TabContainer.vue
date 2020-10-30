<style>
  .tabs {
    background-color: yellow;
  }
</style>

<template lang="pug">
  .tabs
    div(v-for="[key, set] in items.entries()")
      Tab(
        :name="key"
        :set="set"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Tab from './Tab.vue'

export default Vue.extend({
  components: {
    Tab
  },
  props: {
    items: {
      type: Map,
      required: true,
      default: () => new Map<string, Set<string>>()
    }
  },

  watch: {
    items () {
      console.log('watched')
    }
  },

  mounted () {

  },

  methods: {

  }
})
</script>
