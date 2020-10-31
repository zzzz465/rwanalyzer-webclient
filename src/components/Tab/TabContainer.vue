<style>
  .tabs {
    background-color: RGB(200, 200, 200);
    overflow: scroll;
  }
</style>

<template lang="pug">
  .tabs
    div(v-for="[key, set] in items.entries()")
      Tab(
        :name="key"
        :set="set"
        :currentEntry="currentEntry"
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
    },
    currentEntry: {
      type: String,
      required: true
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
