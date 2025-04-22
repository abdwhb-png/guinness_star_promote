<script setup lang="ts">
import CustomDataTable from '@/components/admin/CustomDataTable.vue';
import ActionButtons from '@/components/admin/Users/ActionButtons.vue';
import CreateUser from '@/components/admin/Users/CreateUser.vue';
import ManageAdmins from '@/components/admin/Users/ManageAdmins.vue';
import NewTransaction from '@/components/admin/Users/NewTransaction.vue';
import CopyBtn from '@/components/shared/CopyBtn.vue';
import ShowKeyValue from '@/components/shared/ShowKeyValue.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Deferred, usePage } from '@inertiajs/vue3';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

const page = usePage();
</script>

<template>
    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <ToastError :errors="page.props.errors" />

        <Toolbar>
            <template #end>
                <div class="flex space-x-3">
                    <CreateUser v-if="page.props.can.create_user" :roles="page.props.roles" />
                    <Deferred data="admins">
                        <template #fallback>
                            <div>Loading...</div>
                        </template>
                        <ManageAdmins :can="page.props.can.manage_admins" :admins="page.props.admins" />
                    </Deferred>
                </div>
            </template>
        </Toolbar>

        <CustomDataTable title="Users list" :paginated="page.props.users" :data-filters="page.props.filters" :show-creation-date="true">
            <Column header="Informations">
                <template #body="{ data }">
                    <!-- action toolbar -->
                    <Toolbar class="mb-2 bg-gray-100">
                        <template #start>
                            <div class="me-4 flex items-center gap-2">
                                <Avatar shape="circle" :image="data.profile_photo_url" style="width: 32px; height: 32px" />
                                <CopyBtn :text="data.call_name" class="font-bold uppercase text-blue-500" />
                            </div>

                            <div class="flex space-x-2">
                                <NewTransaction :user="data" />

                                <Button
                                    as="a"
                                    label="Transacs. List"
                                    :href="
                                        route(page.props.routePrefix + 'transactions.index', {
                                            search: data.call_name,
                                        })
                                    "
                                    severity="secondary"
                                    icon="pi pi-arrow-right-arrow-left"
                                    size="small"
                                />
                            </div>
                        </template>

                        <template #end>
                            <ActionButtons :data="data" />
                        </template>
                    </Toolbar>

                    <!-- user overview -->
                    <div class="grid grid-cols-3 gap-2">
                        <!-- details -->
                        <ul class="list-group text-sm">
                            <li class="list-group-item text-center">
                                <span class="font-bold">Details</span>
                            </li>
                            <li v-for="(item, index) in data.details" :key="index" class="list-group-item">
                                <div class="flex justify-between">
                                    <ShowKeyValue :index="index" :value="item">
                                        <CopyBtn v-if="index == 'phone' || index == 'email'" :text="item" class="text-blue-500" />
                                        <span v-else>{{ item || '--' }}</span>
                                    </ShowKeyValue>
                                </div>
                            </li>
                        </ul>

                        <!-- deal details -->
                        <ul class="list-group text-sm">
                            <li class="list-group-item text-center">
                                <span class="font-bold">Deals Details</span>
                            </li>
                            <li v-for="(item, index) in data.deals_details" :key="index" class="list-group-item">
                                <div class="flex justify-between space-x-4">
                                    <ShowKeyValue :index="index" :value="item">
                                        <Link
                                            v-if="index == 'current_deal' && item"
                                            :href="route(page.props.routePrefix + 'deals', { search: item })"
                                            class="link max-w-xs truncate"
                                        >
                                            {{ item }}
                                        </Link>
                                        <div v-else class="flex flex-col">
                                            <div class="flex justify-between space-x-2" v-for="(value, key) in item" :key="key">
                                                <ShowKeyValue :index="key" :value="value" />
                                            </div>
                                        </div>
                                    </ShowKeyValue>
                                </div>
                            </li>
                            <li v-if="data.isFrozed" class="list-group-item text-center">
                                <Tag severity="danger">Is Frozen</Tag>
                            </li>
                        </ul>

                        <!-- more infos -->
                        <ul class="list-group text-sm">
                            <li class="list-group-item text-center">
                                <span class="font-bold">More Infos</span>
                            </li>
                            <li v-for="(item, index) in data.more_infos" :key="index" class="list-group-item">
                                <div class="flex justify-between">
                                    <ShowKeyValue :index="index" :value="item || '--'">
                                        <Link
                                            v-if="index == 'invited_by' && item"
                                            :href="route(page.props.routePrefix + 'users', { search: item })"
                                            class="link max-w-xs truncate"
                                        >
                                            {{ item }}
                                        </Link>
                                        <span v-else>{{ item || '--' }}</span>
                                    </ShowKeyValue>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- end user overview -->
                </template>
            </Column>
        </CustomDataTable>
    </AppLayout>
</template>
