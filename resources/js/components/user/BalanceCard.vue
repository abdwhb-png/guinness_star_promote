<template>
    <div class="flex space-x-4">
        <div v-for="item in items" :key="item.id"
            class="bg-slate-50 hover:bg-slate-100 hover:animate-pulse transition-all duration-300 shadow rounded-lg p-6 py-2 w-1/2 cursor-pointer">
            <div class="flex items-center justify-center">
                <div class="flex-shrink-0 bg-blue-100 p-3 rounded-full hidden">
                    <i :class="item.icon"></i>
                </div>
                <div class="ml-0">
                    <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                </div>
            </div>
            <p class="text-2xl text-center font-semibold text-gray-900">{{ item.value }} {{ currency }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    deposit: {
        type: Number,
        default: 0
    },
    profit: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: ''
    }
});

const items = [
    {
        id: 1,
        name: 'Deposit',
        value: props.deposit,
        icon: 'ph ph-wallet'
    },
    {
        id: 2,
        name: 'Profit',
        value: props.profit,
        icon: 'ph ph-plus'
    }
];
</script>