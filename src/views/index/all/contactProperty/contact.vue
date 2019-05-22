<template>
  <div>
    <p class="village">{{village}}</p>
    <panel></panel>
  </div>
</template>
<script>
import panel from '@/components/panel'
export default {
  name: 'contact',
  data () {
    return {
      village: '康馨苑小区'
    }
  },
  props: {},
  components: {
    panel
  }
}
</script>
