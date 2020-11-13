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
    border: 3px solid;
    padding: 8px;
    display: block;
  }
  .entry {
    padding-left: 24px;
    padding-bottom: 6px;
    padding-right: 24px;
    display: block;
    cursor: pointer;
  }
  .entry::after {
    content: " ";
    display: block;
    width: 100%;
    height: 1px;
    background: RGB(80, 80, 80);
  }
</style>

<template lang="pug">
  .root.text
    .title
      h2 {{ name }}
    .scroll
      div.entry(v-for="item in entries" @click="entrySelected(item)")
        button.selected(v-if="item === currentEntry" block) {{ item }}
        button(v-else block) {{ item }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  model: {
    prop: 'currentEntry',
    event: 'currentEntryChanged'
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
    console.log(this.name)
    console.log(this.set)
  },

  methods: {
    entrySelected (key: string) {
      this.$emit('currentEntryChanged', key)
    }
  }
})
</script>
