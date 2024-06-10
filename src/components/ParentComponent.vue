<template>
  <h1 class="text-2xl font-semibold mb-4">Parent Component</h1>
  <ChildComponent :message="parentMessage">
    <template v-slot:content>
        <!-- Nội dung được chèn vào slot "content" -->
        <p class="text-lg font-semibold mb-2">Đây là nội dung được chèn thông qua Named Slot</p>
      </template>
  </ChildComponent>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Đây là thông báo từ Component cha!'
    };
  }
};
</script>

<style>
/* CSS cho parent component */
</style>