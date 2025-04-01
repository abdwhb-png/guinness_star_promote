<style>
.p-image img {
    border-radius: 10px;
    width: 200px;
    height: 150px;
}
</style>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { usePage, router } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";
import { useAdminStore } from "@/stores/admin";
import { getSeverity, getFilters, parseStatuses, itemsPerPage } from "@/utils/dataTable";

import EditDeal from "@/components/admin/Users/Deals/Edit.vue";
import CopyBtn from "@/components/shared/CopyBtn.vue";

defineProps({
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

const statuses = parseStatuses(page.props.config.statuses.user_deal);
const types = ref(page.props.config.dataTypes.deal);
const globalFilterFields = page.props.config.globalFilterFields.user_deal;
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

const processNow = (data) => {
    if (checkCurrentUser()) {
        router.post(route(page.props.routePrefix + "process-deal"), {
            user_id: adminStore.currentUser.id,
            pivot_id: data.pivot_id
        }, {
            preserveScroll: true,
            preserveState: true,
            onStart: () => data.loading = true,
            onSuccess: (page) => {
                toast.add({
                    severity: "success",
                    summary: page.props.flash.status,
                    life: 5000,
                });
                refetch();
            },
            onFinish: () => data.loading = false,
        });
    }
};

const setNegative = (data) => {
    if (data.state.status !== "pending") {
        alert("You can only set negative balance for pending deals");
        return;
    }
    deal.value = data;
};

const refetch = async () => {
    if (checkCurrentUser()) {
        await adminStore.fetchCurrentUser(adminStore.currentUser.id, true);
    }
};

watch(() => adminStore.currentUser, () => {
    deals.value = adminStore.getUserDeals;
}, { immediate: true, deep: true });

function checkCurrentUser() {
    if (!adminStore.currentUser) {
        toast.add({
            severity: "error",
            detail: "User not found. Try again.",
            life: 5000,
        });
        return false;
    }
    return true;
}

function searchCurrent() {
    deals.value?.filter((item) => {
        if (item.is_current) {
            filters.value["index"].value = item.index;
        }
    });
};
</script>

<template>
    <!-- Contenu principal -->
    <div class="">
        <EditDeal :item="deal" @hide="deal = null" @updated="refetch" />

        <CustomToolbar :statuses :data="deals" :data-name="dataName" @filtered="filters = $event">
            <template #start>
                <Button label="Show Current Deal" size="small" severity="contrast" outlined filter-type="current"
                    filter-value="is" @click="searchCurrent" />
            </template>
        </CustomToolbar>

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <DataTable :loading="loading" :value="deals" :limit="null" v-model:filters="filters"
                :globalFilterFields="globalFilterFields" filterDisplay="row" dataKey="id" :showClearFilterButton="true"
                :paginator="true" paginatorPosition="both"
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
                                <Button label="Process Now" size="small"
                                    :disabled="data.status.toLowerCase() !== 'processing'" :loading="data.loading"
                                    @click="processNow(data)" />
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
