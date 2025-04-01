<style>
.p-image img {
    border-radius: 10px;
    width: 200px;
    height: 150px;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";
import { useAdminStore } from "@/stores/admin";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CustomToolbarButton, DataTableStatus } from "@/types";
import { getSeverity, getFilters, parseStatuses, itemsPerPage } from "@/utils/dataTable";

import Edit from "@/components/admin/Users/Deals/Edit.vue";
import CopyBtn from "@/components/shared/CopyBtn.vue";

dayjs.extend(relativeTime);

const props = defineProps({
    showIdColumn: {
        type: Boolean,
        default: false,
    },
});

const page = usePage();
const toast = useToast();
const adminStore = useAdminStore();
const dataName = "user_deals";

const deals = ref([]);
const loading = ref(false);
const deal = ref(null);

const statuses: Array<DataTableStatus> = parseStatuses(
    (page.props.config as any).statuses.user_deal
);

const types = ref((page.props.config as any).dataTypes.deal);

const globalFilterFields = (page.props.config as any).globalFilterFields
    .user_deal;

const filters = ref(getFilters(dataName));

const initFilters = () => {
    filters.value = getFilters(dataName);
};

const indexes = computed(() =>
    Array.from({ length: deals.value.length }, (_, i) => ({
        label: (i + 1).toString(),
        value: i + 1,
    }))
);
const detailFilters = computed(() => [
    {
        label:
            filters.value["state.negative_balance"].matchMode +
            " without negative",
        value: "none",
    },
]);

const isCurrentClick = () => {
    deals.value?.filter((item) => {
        if (item.is_current) {
            filters.value["index"].value = item.index;
        }
    });
};

const setNegative = (data: any) => {
    if (data.state.status !== "pending") {
        toast.add({
            severity: "error",
            detail: "You can only set negative balance for pending deals",
            life: 5000,
        });
        return;
    }

    deal.value = data;
};

const handleEditUpdated = (amount: number) => {
    deals.value.forEach((item) => {
        if (item.id === deal.value.id) {
            item.state.negative_balance = amount == null ? "none" : amount;
            item.pivot.frozen = amount * -1;
            item.dates.updated = dayjs(new Date()).fromNow();
        }
    });
};

onMounted(() => {
    deals.value = adminStore.getUserDeals;
});

const toolbarButtons: Array<CustomToolbarButton> = [
    {
        label: "Has Negative",
        severity: "danger",
        filterType: "neg_balance",
        filterValue: "has",
        countSearchKeys: ["state", "negative_balance"],
    },
];
</script>

<template>
    <!-- Contenu principal -->
    <div class="">
        <Edit :item="deal" :id="deal?.id" @hide="deal = null" @updated="handleEditUpdated" />

        <CustomToolbar :statuses :data="deals" :data-name="dataName" @filtered="filters = $event">
            <template #start>
                <Button label="Show Current Deal" size="small" outlined filter-type="current" filter-value="is"
                    @click="isCurrentClick" />
            </template>
        </CustomToolbar>

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <DataTable :loading="loading" :value="deals" :limit="null" v-model:filters="filters" :globalFilterFields
                filterDisplay="row" dataKey="id" :showClearFilterButton="true" :paginator="true"
                paginatorPosition="both"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}" :rowsPerPageOptions="itemsPerPage"
                :rows="itemsPerPage[0]" @clear-filter="initFilters()">
                <!-- Index -->
                <Column field="index" header="#Index" :showFilterMenu="false"
                    style="width: 5%; text-align: center; min-width: 12rem">
                    <template #body="{ data, field }">
                        <Avatar :label="data[field].toString()" shape="circle" />
                    </template>

                    <template #filter="{ filterModel, filterCallback }">
                        <Select v-model="filterModel.value" @change="filterCallback()" editable :options="indexes"
                            optionLabel="label" optionValue="value" placeholder="Search index" :showClear="true">
                            <template #option="slotProps">
                                <Tag :value="slotProps.option.value" />
                            </template>
                        </Select>
                    </template>
                </Column>

                <!-- Image & Category -->
                <Column field="image" header="Image" :showFilterMenu="false" filter-field="category"
                    style="width: 20%; min-width: 200px">
                    <template #body="{ data, field }">
                        <div class="flex flex-col gap-3">
                            <Tag :value="data.category" severity="secondary" />
                            <div class="card flex items-center justify-center">
                                <Image :src="data[field]" alt="Image" preview />
                            </div>
                        </div>
                    </template>

                    <template #filter="{ filterModel, filterCallback }">
                        <Select v-model="filterModel.value" @change="filterCallback()" :options="types"
                            placeholder="Filter deal category" :showClear="true">
                            <template #option="slotProps">
                                <Tag :value="slotProps.option" severity="secondary" />
                            </template>
                        </Select>
                    </template>
                </Column>

                <!-- Details -->
                <Column field="state" header="Details" filterField="name" style="width: 70%">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search" />
                    </template>

                    <template #body="{ data, field }">
                        <!-- action toolbar -->
                        <Toolbar class="mb-2 bg-gray-100">
                            <template #start>
                                <div class="flex items-center gap-2">
                                    <CopyBtn :text="data.name" class="text-blue-500 font-bold uppercase" />
                                    <Tag v-if="data.is_current" value="IS CURRENT" rounded />
                                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                                </div>
                            </template>

                            <template #end>
                                <div v-if="page.props.dealHasNegative" class="flex flex-wrap gap-3">
                                    <Tag v-if="
                                        data.state.negative_balance !== 'none'
                                    " value="HAS NEGATIVE" rounded severity="danger" />
                                    <div class="flex gap-2">
                                        <Button v-if="data.state.status === 'pending'
                                        " @click="setNegative(data)" :disabled="!page.props.auth.user
                                            .isSuperAdmin
                                            " label="Set Negative" icon="pi pi-dollar" size="small" severity="warn" />
                                        <Tag v-else value="Can't have negative" icon="pi pi-times" severity="danger" />
                                    </div>
                                </div>
                            </template>
                        </Toolbar>
                        <div class="flex justify-around gap-2">
                            <!-- deal state -->
                            <ul class="list-group">
                                <li class="list-group-item text-center">
                                    <span class="font-bold">Deal State</span>
                                </li>
                                <li v-for="(item, index) in data[field]" :key="index" class="list-group-item">
                                    <div class="flex justify-between">
                                        <span class="text-gray-400">
                                            {{ index + ":" }}
                                        </span>
                                        <Link v-if="index == 'user'" :href="route(
                                            $page.props
                                                .routePrefix +
                                            'users',
                                            { search: item }
                                        )
                                            " class="link ml-2">{{ item }}</Link>
                                        <span v-else class="ml-2 max-w-xs truncate">
                                            {{ item }}
                                        </span>
                                    </div>
                                </li>
                                <!-- users -->
                                <li class="list-group-item flex flex-wrap max-w-xs">
                                    <Link v-for="(item, index) in data.users" :key="index" :href="route(
                                        $page.props.routePrefix +
                                        'users',
                                        { search: item }
                                    )
                                        " class="link ml-2">{{ item }}</Link>
                                </li>
                            </ul>

                            <!-- dates -->
                            <ul class="list-group">
                                <li class="list-group-item text-center">
                                    <span class="font-bold">Dates</span>
                                </li>
                                <li v-for="(item, index) in data.dates" :key="index" class="list-group-item">
                                    <div class="flex justify-between">
                                        <span class="text-gray-400">
                                            {{ index + ":" }}
                                        </span>
                                        <span class="ml-2">
                                            {{ item }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </template>
                </Column>

                <!-- ID Column -->
                <Column v-if="showIdColumn" field="id" header="ID" sortable>
                    <template #body="{ data }">
                        {{ `#${data.id}` }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
