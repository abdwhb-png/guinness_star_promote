<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import ApplicationLogo from './shared/ApplicationLogo.vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
    <ApplicationLogo :class="className" v-bind="$attrs"/>
</template>
