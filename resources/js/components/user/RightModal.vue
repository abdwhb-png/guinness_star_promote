<template>
    <div class="pb-28">
        <div
            class="flex justify-start items-center gap-4 px-4 w-full py-8 sticky top-0 bg-white"
        >
            <a
                href="javascript:void(0);"
                @click="emits('close')"
                class="cursor-pointer rounded-full border border-g60 !leading-none size-8 flex justify-center items-center"
            >
                <i class="ph ph-caret-left text-g60 text-xl"></i>
            </a>
            <div class="text-2xl font-bold text-g60">{{ title }}</div>
        </div>

        <slot name="content" />
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(["close"]);
</script>
