<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
</script>

<template>
    <div class="flex aspect-square size-10 items-center justify-center rounded-md bg-gray-200 px-0.5 text-sidebar-primary-foreground">
        <AppLogoIcon class="size-8 fill-current text-white dark:text-black" />
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate font-semibold leading-none">{{ $page.props.name }}</span>
    </div>
</template>
