<style scoped>
  .root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .text {
    color: white;
  }
  .title {
    color: RGB(240, 240, 240);
    padding-top: 12px;
    padding-left: 12px;
    padding-bottom: 6px;
  }
  .selected {
    /* border: 3px solid; */
    /* padding: 8px; */
    display: block;
  }
  .entries {
    margin-left: 24px;
    margin-right: 24px;
  }
  .entry {
    margin-bottom: 6px;
    display: block;
    cursor: pointer;
  }
  .divider {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 1px;
    background: RGB(80, 80, 80);
  }
  button {
    outline: none;
  }
</style>

<template lang="pug">
  .root.text
    .title
      h2 {{ name }}
    .scroll
      div.entries(
        v-for="item in entries"
        @click="entrySelected(item)")
        .entry(v-bind:class="{ selected: currentEntry === item }")
          button(block) {{ item }}
        .divider
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  model: {
    prop: 'currentEntry',
    event: 'entrySelected'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    set: {
      type: Set,
      required: true
    },
    currentEntry: {
      type: String,
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
  },

  methods: {
    entrySelected (key: string) {
      this.$emit('entrySelected', key)
    }
  }
})
</script>
