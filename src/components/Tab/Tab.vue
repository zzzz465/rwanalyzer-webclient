<style scoped>
  .selected {
    border: 3px solid;
    padding: 8px;
    border-color: red;
  }
</style>

<template lang="pug">
  .root
    .title
      h2 {{ name }}
    .scroll
      div.entries(v-for="item in entries")
        v-btn.selected(v-if="item === currentEntry" block) {{ item }}
        v-btn(v-else block) {{ item }}
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

  watch: {
    
  }
})
</script>
