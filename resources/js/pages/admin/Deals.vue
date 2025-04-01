<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from "vue";
import { useConfirm, useToast } from 'primevue';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/AppLayout.vue';
import CustomDataTable from '@/components/admin/CustomDataTable.vue';
import CopyBtn from '@/components/shared/CopyBtn.vue';
import ShowKeyValue from '@/components/shared/ShowKeyValue.vue';
import {
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import DealForm from '@/components/admin/Deals/DealForm.vue';
import DeleteDeals from '@/components/admin/Deals/Delete.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Deals',
        href: '/deals',
    },
];

const confirm = useConfirm();
const toast = useToast();
const currentDeal = ref(null);
const show = ref(false);


const onEdit = (deal: any) => {
    currentDeal.value = deal;
    show.value = true;
}

const onDelete = (deal: any) => {
    confirm.require({
        message: "Do you want to delete " + deal.name + " deal ?",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "Cancel",
        rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Delete",
            severity: "danger",
        },
        accept: () => {
            router.delete(route("deal.destroy", deal.id), {
                preserveScroll: true,
                onStart: () => deal.loading = true,
                onSuccess: (page) => {
                    toast.add({
                        severity: "success",
                        summary:
                            "Deletion performed successfully for " + deal.name,
                        detail: (page.props.flash as any).status,
                        life: 5000,
                    });
                },
                onFinish: () => deal.loading = false,
            });
        },
        reject: () => { },
    });
}
</script>

<template>

    <Head title="Deals" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <ToastError :errors="$page.props.errors" />
        <ConfirmDialog />
        <!-- edit deal -->
        <Dialog @hide="currentDeal = null" v-model:visible="show" modal
            :header="currentDeal ? 'Edit Deal' : 'Create Deal'" :dismissable-mask="true" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <DealForm :item="currentDeal" :categories="$page.props.categories" @created="show = false"
                @updated="show = false" />
        </Dialog>

        <Toolbar>
            <template #end>
                <div class="flex space-x-3">
                    <Button type="button" icon="pi pi-plus" label="Create Deal" size="small" severity="info"
                        @click="show = true" :disabled="!$page.props.can.create_deal" />
                    <DeleteDeals :can="$page.props.can.delete_deal || !$page.props.deals.total" />
                </div>
            </template>
        </Toolbar>

        <CustomDataTable title="Deals list" :paginated="$page.props.deals" :data-filters="$page.props.filters"
            filter-key="category" :show-creation-date="true" :show-update-date="true">
            <template #filterContent>
                <DropdownMenuRadioItem v-for="(category, index) in $page.props.categories" :key="index"
                    :value="category">
                    <span class="capitalize">{{ category }}</span>
                </DropdownMenuRadioItem>
            </template>

            <!-- Image & Category -->
            <Column field="image" header="Image" style="width: 30%; min-width: 200px">
                <template #body="{ data, field }">
                    <div class="flex flex-col gap-3">
                        <Tag :value="data.category" severity="secondary" />
                        <div class="card flex items-center justify-center">
                            <Image :src="data[field]" alt="Image" preview />
                        </div>
                    </div>
                </template>
            </Column>

            <!-- Informations -->
            <Column header="Informations">
                <template #body="{ data }">
                    <!-- action toolbar -->
                    <Toolbar class="mb-2 bg-gray-100">
                        <template #start>
                            <div class="flex items-center gap-2">
                                <CopyBtn :text="data.name" class="text-blue-500 font-bold" />
                            </div>
                        </template>

                        <template #end>
                            <div class="flex gap-2">
                                <Button @click="onEdit(data)" :disabled="!$page.props.can.edit_deal" label="Edit"
                                    icon="pi pi-pencil" size="small" />
                                <Button v-if="!data.users.length" @click="onDelete(data)"
                                    :disabled="!$page.props.can.delete_deal" label="Delete" icon="pi pi-trash"
                                    size="small" severity="danger" :loading="data.loading" />
                            </div>
                        </template>
                    </Toolbar>
                    <div class="flex justify-around gap-2">
                        <!-- details -->
                        <ul class="list-group text-sm">
                            <li class="list-group-item text-center">
                                <span class="font-bold">Details</span>
                            </li>
                            <li v-for="(item, index) in data.details" :key="index" class="list-group-item">
                                <div class="flex justify-between">
                                    <ShowKeyValue :index="index" :value="item">
                                        <a :href="data.details.spotify_url" target="_blank" rel="noreferrer"
                                            v-if="index == 'spotify_url'" class="link ml-2">{{ item
                                            }}</a>
                                        <span v-else class="max-w-80 truncate" v-tooltip.bottom="item">{{ item
                                        }}</span>
                                    </ShowKeyValue>
                                </div>
                            </li>
                        </ul>
                        <!-- details -->
                        <ul class="list-group text-sm">
                            <li class="list-group-item text-center">
                                <span class="font-bold">Users</span>
                            </li>
                            <li class="list-group-item flex flex-wrap max-w-xs">
                                <Link v-for="(
item, index
                                                    ) in data.users" :key="index" :href="route(
                                                        $page.props
                                                            .routePrefix +
                                                        'users',
                                                        { search: item }
                                                    )
                                                        " class="link ml-2">{{ item }}</Link>
                            </li>
                        </ul>
                    </div>
                </template>
            </Column>
        </CustomDataTable>
    </AppLayout>
</template>
