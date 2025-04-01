<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { ref } from "vue";
import Configuration from "@/components/admin/Dashboard/Configuration.vue";
import TermsOfUse from "@/components/admin/Dashboard/TermsOfUse.vue";
import CustomerServices from "@/components/admin/Dashboard/CustomerServices.vue";
import PaymentMethods from "@/components/admin/Dashboard/PaymentMethods.vue";
import CoLogs from "@/components/admin/Dashboard/CoLogs.vue";
import Memberships from "@/components/admin/Dashboard/Memberships.vue";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const activeTab = ref(localStorage.getItem("dashboardActiveTab") ?? "pMethods");

const changeTab = (tab: string) => {
    localStorage.setItem("dashboardActiveTab", tab);
    activeTab.value = tab;
};
</script>

<template>

    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <ToastError :errors="$page.props.errors" />
        <Card>
            <template #content>
                <Tabs :value="activeTab" @update:value="changeTab" scrollable>
                    <TabList>
                        <Tab value="configuration">Configuration</Tab>
                        <Tab value="termsOfUse">Terms of use</Tab>
                        <Tab value="pMethods">Payment Methods</Tab>
                        <Tab value="cServices">Customer Services</Tab>
                        <Tab value="memberships" v-if="$page.props.config.enableVip">Memberships</Tab>
                        <Tab value="coLogs">Connection Logs</Tab>
                    </TabList>
                    <TabPanels>
                        <BlockUI :blocked="!$page.props.canEdit">
                            <!-- configuration -->
                            <TabPanel value="configuration">
                                <Configuration :datas="$page.props.setting" />
                            </TabPanel>

                            <!-- terms of use -->
                            <TabPanel value="termsOfUse">
                                <TermsOfUse :datas="$page.props.setting" />
                            </TabPanel>

                            <!-- payment methods -->
                            <TabPanel value="pMethods">
                                <PaymentMethods :datas="$page.props.pMethods" />
                            </TabPanel>

                            <!-- customer services -->
                            <TabPanel value="cServices">
                                <CustomerServices :datas="$page.props.cServices" />
                            </TabPanel>

                            <!-- memberships -->
                            <TabPanel value="memberships">
                                <Memberships :datas="$page.props.memberships" />
                            </TabPanel>

                            <!-- co logs -->
                            <TabPanel value="coLogs">
                                <CoLogs :datas="$page.props.coLogs" />
                            </TabPanel>
                        </BlockUI>
                    </TabPanels>
                </Tabs>
            </template>
        </Card>
    </AppLayout>
</template>
