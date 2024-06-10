<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Dynamic Components</h1>
        <button @click="toggleComponent" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Component</button>
        <component :is="currentComponent"></component>

        <h1 class="text-2xl font-bold mt-8">Animate with CSS Transitions</h1>
        <button @click="toggleTransition" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Transition</button>
        <div :class="{ 'transition-active': isTransitionActive }" class="py-4 bg-gray-200 rounded">Element with Transition</div>

        <h1 class="text-2xl font-bold mt-8">Fine-tune Transitions</h1>
        <button @click="toggleTransitionFineTuned" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Transition</button>
        <div :class="{ 'transition-active': isTransitionActiveFineTuned }" class="py-4 bg-gray-200 rounded">Element with Fine-tuned Transition</div>

        <h1 class="text-2xl font-bold mt-8">Animate with CSS Animations</h1>
        <button @click="toggleAnimation" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Animation</button>
        <div :class="{ 'animate-spin': showAnimation }" class="py-4 bg-gray-200 rounded">Element with Animation</div>

        <h1 class="text-2xl font-bold mt-8">Animate with JavaScript</h1>
        <button @click="animateElement" class="py-2 px-4 bg-blue-500 text-white rounded">Animate Element</button>
        <div ref="animatedElement" class="py-4 bg-gray-200 rounded">Element for JavaScript Animation</div>

        <h1 class="text-2xl font-bold mt-8">JavaScript Zoom Animation</h1>
        <button @click="zoomIn" class="py-2 px-4 bg-blue-500 text-white rounded">Zoom In</button>
        <div ref="zoomElement" class="py-4 bg-gray-200 rounded">Element for Zoom Animation</div>

        <h1 class="text-2xl font-bold mt-8">CSS and JavaScript Transitions</h1>
        <button @click="toggleTransitionCombined" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Transition</button>
        <div :class="{ 'transition-active': isTransitionActiveCombined }" @click="animateElement" class="py-4 bg-gray-200 rounded">Element with CSS and JavaScript Transition</div>

        <h1 class="text-2xl font-bold mt-8">Animate a List</h1>
        <ul class="list-disc list-inside">
            <li v-for="(item, index) in items" :key="index" :style="{ 'animation-delay': index * 0.1 + 's' }" class="py-2">{{ item }}</li>
        </ul>

        <h1 class="text-2xl font-bold mt-8">Fix the Animation</h1>
        <button @click="toggleAnimationFixed" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Animation</button>
        <div :class="{ 'animate-slide': showAnimationFixed }" class="py-4 bg-gray-200 rounded">Element with Fixed Animation</div>

        <h1 class="text-2xl font-bold mt-8">Transition CSS Class Names</h1>
        <button @click="toggleTransitionClassNames" class="py-2 px-4 bg-blue-500 text-white rounded">Toggle Transition</button>
        <div :class="{ 'fade-in': isTransitionActiveClassNames }" class="py-4 bg-gray-200 rounded">Element with Transition Class Names</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentComponent: null,
            isTransitionActive: false,
            isTransitionActiveFineTuned: false,
            showAnimation: false,
            showAnimationFixed: false,
            isTransitionActiveCombined: false,
            isTransitionActiveClassNames: false,
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
        };
    },
    methods: {
        toggleComponent() {
            // Hãy thay đổi logic toggleComponent tùy thuộc vào cách bạn muốn thực hiện
        },
        toggleTransition() {
            this.isTransitionActive = !this.isTransitionActive;
        },
        toggleTransitionFineTuned() {
            this.isTransitionActiveFineTuned = !this.isTransitionActiveFineTuned;
        },
        toggleAnimation() {
            this.showAnimation = !this.showAnimation;
        },
        animateElement() {
            const element = this.$refs.animatedElement;
            element.style.transform = 'translateX(200px)';
        },
        zoomIn() {
            const element = this.$refs.zoomElement;
            element.style.transform = 'scale(1.2)';
        },
        toggleTransitionCombined() {
            this.isTransitionActiveCombined = !this.isTransitionActiveCombined;
        },
        toggleAnimationFixed() {
            this.showAnimationFixed = !this.showAnimationFixed;
        },
        toggleTransitionClassNames() {
            this.isTransitionActiveClassNames = !this.isTransitionActiveClassNames;
        },
    },
};
</script>
