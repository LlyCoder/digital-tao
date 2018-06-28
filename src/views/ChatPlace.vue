<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>水吧</span>
    </nav-bread>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import axios from 'axios'
export default {
    data() {
        return {

        }
    },
    components: {
       NavHeader,
       NavFooter,
       NavBread
  }
}
</script>