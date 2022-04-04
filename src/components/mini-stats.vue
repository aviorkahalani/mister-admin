<template>
  <section class="mini-stats">
    <article v-for="(status, key, idx) in stats" :key="idx">
      There are {{ status }} leads with status {{ key }}
    </article>
  </section>
</template>

<script>
export default {
  name: 'mini-stats',
  props: {
    stats: Object,
  },
}
</script>
