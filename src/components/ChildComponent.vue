<template>
  <div class="p-4 bg-gray-100 rounded-md shadow-md">
    <!-- Sử dụng Props -->
    <p class="text-lg font-semibold mb-2">Prop message: {{ message }}</p>
    <slot name="content"></slot>
    <!-- Sử dụng Reactive References -->
    <p class="text-gray-700">Reactive Count: {{ count }}</p>
    <button @click="incrementCount" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
      Increment Count
    </button>
    <!-- Sử dụng Computed Properties -->
    <p class="mt-4 text-gray-700">Double Count: {{ doubleCount }}</p>
    <!-- Sử dụng Template Refs -->
    <div ref="myDiv" class="mt-4 p-2 border rounded border-gray-300">
      Div này được tham chiếu bằng template ref
    </div>
    <!-- Sử dụng Emitting Events -->
    <button @click="emitEvent" class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
      Emit Event
    </button>
    <!-- Sử dụng Dynamic Components -->
    <component :is="currentComponent"></component>

    <!-- Sử dụng CSS Transitions -->
    <div class="mt-4 p-2 border rounded border-gray-300 transition-all" :class="{ 'bg-blue-200': isTransitionActive }">
      Element with Transition
    </div>
    <!-- Sử dụng CSS Animations -->
    <div class="mt-4 p-2 border rounded border-gray-300 animate-spin" v-if="showAnimation">
      Element with Animation
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default {
  name: 'ChildComponent',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Reactive References
    const count = ref(0);

    // Reactive Function
    const state = reactive({
      count: 0,
    });

    // Computed Properties
    const doubleCount = computed(() => count.value * 2);

    // Watcher
    watch(count, (newVal, oldVal) => {
      Swal.fire({
        title: 'Count Changed',
        text: `Số lượng thay đổi từ ${oldVal} sang ${newVal}`,
        icon: 'info',
      });
    });

    // Template Refs
    const myDiv = ref(null);

    // Dynamic Components
    const currentComponent = ref('ComponentA');

    // CSS Transitions
    const isTransitionActive = ref(false);

    // CSS Animations
    const showAnimation = ref(false);

    // Lifecycle Functions
    onMounted(() => {
      Swal.fire({
        title: 'Component Mounted',
        text: 'Component đã được gắn kết',
        icon: 'success',
      });
    });

    // Methods
    const incrementCount = () => {
      count.value++;
      state.count++;
    };

    const emitEvent = () => {
      emit('custom-event', 'Hello from child component');
      Swal.fire({
        title: 'Event Emitted',
        text: 'Hello from child component',
        icon: 'success',
      });
    };

    return {
      count,
      state,
      doubleCount,
      myDiv,
      currentComponent,
      isTransitionActive,
      showAnimation,
      incrementCount,
      emitEvent,
    };
  },
};
</script>

<style>
/* CSS cho component */
</style>