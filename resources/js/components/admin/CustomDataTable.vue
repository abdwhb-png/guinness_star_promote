<template>
    <Card>
        <template #header>
            <div class="p-3 flex justify-between">
                <SearchFilter v-if="showSearch" class="mr-4 w-full max-w-md" v-model="form.search" :loading="loading"
                    :filter-key="filterKey" :data-filters="dataFilters" @reset="reset">
                    <template #filterContent>
                        <DropdownMenuRadioGroup v-model="form[filterKey]">
                            <slot name="filterContent" />
                        </DropdownMenuRadioGroup>
                    </template>
                </SearchFilter>
                <Pagination v-model="form.per_page" :paginated="paginated" :show-items-selection="false" />
            </div>
        </template>

        <template #title>
            {{ title }}
            <span class="text-sm font-normal">{{ `${paginated?.total || "0"} total records` }}</span>
        </template>


        <template #content>
            <DataTable class="w-full" v-bind="$attrs" ref="dt" :value="data" v-model:filters="filters" scrollable
                :scrollHeight="scrollHeight" showGridlines @sort="onSort" @filter="onFilter">
                <template #empty>
                    <slot name="empty">
                        <div
                            class="flex items-center grow rounded-xl border border-dashed gap-4 p-4 border-primary bg-secondary-light">
                            <Info />
                            <div class="flex flex-col gap-0.5">
                                <p class="text text-2sm font-normal">
                                    No records found
                                </p>
                            </div>
                        </div>
                    </slot>
                </template>

                <template #loading>
                    <slot name="loading">
                        <Loader2 class="animate-spin" />
                    </slot>
                </template>

                <!-- ID -->
                <Column v-if="showId" field="id" header="ID" sortable>
                    <template #body="{ data, field }">
                        {{ `#${data[field]}` }}
                    </template>
                </Column>

                <!-- Content -->
                <slot></slot>
                <!-- End Content -->

                <!-- Creation Date -->
                <Column v-if="showCreationDate" field="created_at" header="Creation date" sortable
                    style="max-width: 11rem">
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText style="min-width: 5rem; max-width: 7rem" size="small" v-model="filterModel.value"
                            @input="filterCallback()" placeholder="dd/mm/yyyy" />
                    </template>
                </Column>
                <!-- End Creation Date -->

                <!-- Update Date -->
                <Column v-if="showUpdateDate" field="updated_at" header="Last update" style="max-width: 11rem" sortable>
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText style="min-width: 5rem; max-width: 7rem" size="small" v-model="filterModel.value"
                            @input="filterCallback()" placeholder="dd/mm/yyyy" />
                    </template>
                </Column>
                <!-- End Update Date -->

                <template #footer>
                    <slot name="footer"> </slot>
                </template>
            </DataTable>
        </template>

        <template #footer>
            <div v-if="showPagination" class="card-footer justify-center md:justify-end">
                <Pagination v-model="form.per_page" :paginated="paginated" />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { scrollHeight } from "@/utils/dataTable";
import { LaravelPagination } from "@/types";
import { FilterMatchMode } from "@primevue/core/api";
import { router } from "@inertiajs/vue3";
import throttle from 'lodash/throttle';
import pickBy from 'lodash/pickBy';
import mapValues from 'lodash/mapValues';
import dayjs from "dayjs";
import { Info, Loader2 } from "lucide-vue-next";
import SearchFilter from "./SearchFilter.vue";
import Pagination from "./Pagination.vue";
import {
    DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu'

defineOptions({
    inheritAttrs: false,
});

const emits = defineEmits(["searched"]);

const props = defineProps({
    title: {
        type: String,
        default: "Liste",
    },
    paginated: {
        type: Object as () => LaravelPagination<any>,
        required: false,
        default: () => { },
    },
    dataFilters: Object,
    filters: {
        type: Object,
        required: false,
        default: () => { },
    },
    filterKey: String,
    showSearch: {
        type: Boolean,
        default: true,
    },
    showPagination: {
        type: Boolean,
        default: true,
    },
    showId: {
        type: Boolean,
        default: true,
    },
    showCreationDate: {
        type: Boolean,
        default: false,
    },
    showUpdateDate: {
        type: Boolean,
        default: false,
    },
});

const data = ref<any[]>([]);
const loading = ref(false);
const form = reactive({
    search: props.dataFilters.search,
    per_page: props.paginated.per_page,
    sort: props.dataFilters.sort,
    [props.filterKey]: props.dataFilters[props.filterKey],
});

const filters = ref<Record<string, any>>(props.filters ?? {});

const initFilters = () => {
    filters.value = {
        ...props.filters,
        created_at: { value: null, matchMode: FilterMatchMode.CONTAINS },
        updated_at: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};
initFilters();

const onSort = (event) => {
    form.sort = {
        field: event.sortField,
        order: event.sortOrder === 1 ? 'asc' : 'desc'
    };
};


const onFilter = (event) => {
    // console.log(event.filters);
};

const reset = () => {
    Object.assign(form, mapValues(form, () => null));
};

watch(() => props.paginated?.data, (newData) => {
    data.value = Array.isArray(newData)
        ? newData.map((item) => ({
            ...item,
            created_at: parseDate(item.created_at),
            updated_at: parseDate(item.updated_at, 'humanReadable'),
        }))
        : [];
}, { immediate: true });

watch(form,
    throttle(() => {
        const url = route(route().current());
        router.get(url, pickBy(form), {
            preserveState: true,
            onStart: () => (loading.value = true),
            onFinish: () => (loading.value = false),
        })
        // emits('searched', pickBy(form.value, (value) => value !== null && value !== ''));
    }, 150),
    { deep: true });

function parseDate(date: string, format = 'default') {
    if (!date) return "--";
    if (format == 'humanReadable') {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    }
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
</script>
