<style scoped>
  .tabs {
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }
</style>

<template lang="pug">
  .tabs
    div(v-for="[key, set] in items.entries()")
      Tab.tab(
        :name="key"
        :set="set"
        v-model="currentEntry"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Tab from './Tab.vue'

export default Vue.extend({
  components: {
    Tab
  },
  model: {
    prop: 'currentEntry',
    event: 'entrySelected'
  },
  props: {
    items: {
      type: Map,
      required: true,
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
