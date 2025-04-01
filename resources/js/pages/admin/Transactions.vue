<script setup lang="ts">
import { ref } from "vue";
import { usePage, useForm } from '@inertiajs/vue3';
import { getSeverity, parseStatuses } from "@/utils/dataTable";
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import CustomDataTable from '@/components/admin/CustomDataTable.vue';
import DeleteTransactions from "@/components/admin/Transactions/Delete.vue";
import ShowKeyValue from '@/components/shared/ShowKeyValue.vue';
import {
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { useToast } from "primevue";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

const page = usePage();
const toast = useToast();
const statuses = parseStatuses(page.props.config.statuses.transaction);

const editingRows = ref([]);
const form = useForm({
    status: null,
});

const onRowEditSave = (event) => {
    let { data, newData } = event;

    if (newData.status == data.status || data.type == "swap") {
        return;
    }

    if (data.status != "pending") {
        toast.add({
            severity: "warn",
            summary: "This transaction status is not pending",
            detail: "You cannot change the status of a non pending transaction",
            life: 5000,
        });
        return;
    }

    form.status = newData.status;

    form.put(route("transaction.update", newData.id), {
        preserveScroll: true,
        onSuccess: (page) => {
            toast.add({
                severity: "success",
                summary: "Transaction updated",
                detail:
                    page.props.flash.status ||
                    "Transaction " + newData.ref_id + " has been updated",
                life: 3000,
            });
            editingRows.value = [];
            adminStore.fetchTransactions(toast);
        },
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>

    <Head title="Transactions" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <ToastError :errors="$page.props.errors" />

        <Toolbar>
            <template #end>
                <DeleteTransactions :can="$page.props.can.delete_transaction || !$page.props.transactions.total" />
            </template>
        </Toolbar>
        <CustomDataTable title="Transactions list" :paginated="$page.props.transactions"
            :data-filters="$page.props.filters" filter-key="type" v-model:editingRows="editingRows" editMode="row"
            :show-creation-date="true" :show-update-date="true" @row-edit-save="onRowEditSave">
            <template #filterContent>
                <DropdownMenuRadioItem v-for="(type, index) in $page.props.types" :key="index" :value="type">
                    <Tag :value="type" :severity="getSeverity(type)" />
                </DropdownMenuRadioItem>
            </template>

            <!-- Edit -->
            <Column :rowEditor="$page.props.can.edit_transaction" style="width: 5%" header="Edit"
                bodyStyle="text-align:center">
            </Column>

            <!-- Status -->
            <Column field="status" header="Status" sortable style="width: 5%">
                <template #editor="{ data, field }">
                    <Select :disabled="$page.props.shouldNotEdit.includes(data.status)" v-model="data[field]"
                        :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getSeverity(
                                slotProps.option.value
                            )
                                " />
                        </template>
                    </Select>
                </template>
                <template #body="{ data }">
                    <div class="flex flex-col space-y-2">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                        <Tag :value="data.type" :severity="getSeverity(data.type)" />
                    </div>
                </template>
            </Column>

            <!-- Informations -->
            <Column header="Informations">
                <template #body="{ data }">
                    <div class="flex justify-around gap-2">
                        <!-- details -->
                        <ul class="list-group text-sm">
                            <li class="list-group-item text-center">
                                <span class="font-bold">Details</span>
                            </li>
                            <li v-for="(item, index) in data.details" :key="index" class="list-group-item">
                                <div class="flex justify-between">
                                    <ShowKeyValue :index="index" :value="item">
                                        <Link :href="route($page.props.routePrefix + 'users', { search: item })"
                                            v-if="index == 'user'" class="link ml-2">
                                        {{ item
                                        }}
                                        </Link>
                                        <span v-else class="ml-2">
                                            {{ item }}
                                        </span>
                                    </ShowKeyValue>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </Column>
        </CustomDataTable>
    </AppLayout>
</template>
