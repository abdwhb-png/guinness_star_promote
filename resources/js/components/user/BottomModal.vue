<template>
    <div class="px-4 pt-2 pb-6 rounded-t-2xl bg-white w-full">
        <div
            class="flex justify-center items-center flex-col border-b border-dashed border-g30 py-3"
        >
            <div class="w-14 h-1 bg-g30 rounded-lg"></div>
            <div class="flex justify-between items-center w-full">
                <h2 class="text-xl font-semibold text-g60 text-center pt-2">
                    {{ title }}
                </h2>
                <button class="myQrCodeCloseButton" @click="emits('close')">
                    <i class="ph ph-x text-g60 text-2xl"></i>
                </button>
            </div>
        </div>
        <div class="pt-4">
            <slot name="content" />
        </div>
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
