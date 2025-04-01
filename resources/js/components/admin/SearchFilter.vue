<template>
    <div class="flex flex-col space-y-0 5">
        <div class="flex items-center">
            <div class="flex w-full bg-white rounded shadow pl-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button raised outlined size="small" :severity="dataFilters[filterKey] ? 'info' : 'secondary'">
                            {{ dataFilters[filterKey] ? 'Filtered' : 'Filter' }}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Filter by : {{ filterKey }}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <slot name="filterContent" />
                    </DropdownMenuContent>
                </DropdownMenu>
                <input class="relative px-6 py-3 w-full rounded-r focus:shadow-outline" autocomplete="off" type="text"
                    name="search" placeholder="Search…" :value="modelValue" ref="searchInput"
                    @input="$emit('update:modelValue', $event.target.value)" />
            </div>
            <UiButton variant="outline" class="ml-3" type="button" @click="emits('reset')">
                <i class="pi pi-times"></i>
                <span :class="{ 'underline': modelValue }">Reset</span>
            </UiButton>
        </div>
        <ProgressBar v-if="loading" mode="indeterminate" style="height: 5px" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const emits = defineEmits(['update:modelValue', 'reset']);
const props = defineProps({
    modelValue: String,
    maxWidth: {
        type: Number,
        default: 300,
    },
    loading: Boolean,
    filterKey: String,
    dataFilters: Object,
});

const searchInput = ref();

const reset = () => {
    searchInput.value.value = null;
    emits('update:modelValue', null);
};
</script>