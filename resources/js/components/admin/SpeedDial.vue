<style>
#speeddial {
    position: fixed;
    right: 20px;
    top: calc(30% - 2rem);
    z-index: 9999;
}
</style>

<template>
    <div>
        <SpeedDial id="speeddial" :model="items" :radius="80" direction="up"
            :buttonProps="{ severity: 'contrast', rounded: true }" :tooltipOptions="{ position: 'left' }" />

        <!-- about me dialog -->
        <Dialog v-model:visible="aboutMe" modal header="Check out your information" :style="{ width: '25rem' }">
            <div class="flex justify-end mb-4">
                <Link class="link" :href="route('profile.edit')">Edit profile</Link>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Username</label>
                <InputText id="username" class="flex-auto" autocomplete="off" disabled="" v-model="user.username" />
            </div>
            <div class="flex items-center gap-4 mb-2">
                <label for="email" class="font-semibold w-24">Email</label>
                <InputText id="email" class="flex-auto" autocomplete="off" disabled="" v-model="user.email" />
            </div>
            <div class="flex items-center gap-4 mb-2">
                <label for="email" class="font-semibold w-24">Invitation code</label>
                <CopyBtn :text="user.account.account_no" />
            </div>
            <div class="hidden items-center justify-between gap-4 mb-4">
                <span class="font-semibold w-auto">Mail Notification</span>
                <ToggleButton v-model="mailNotification" :disabled="loading" size="small" onLabel="Enabled"
                    offLabel="Disabled" onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Do you confirm"
                    @change="changeMailNotif" />
            </div>

            <Divider />

            <div class="flex gap-4 mb-4 mt-2">
                <h6 class="font-semibold w-24">Roles</h6>
                <div class="flex flex-wrap justify-around items-center gap-2">
                    <Tag v-for="item in user.roles" :key="'role_' + item.id" severity="secondary" :value="item.name">
                    </Tag>
                </div>
            </div>

            <div class="flex gap-4">
                <h6 class="font-semibold w-24">Permissions</h6>
                <div class="flex flex-wrap justify-around items-center gap-2">
                    <Tag v-for="item in user.permissions" :key="'role_' + item.id" severity="secondary"
                        :value="item.name"></Tag>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { router, usePage } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import SpeedDial from "primevue/speeddial";
import CopyBtn from "../shared/CopyBtn.vue";

const page = usePage();
const user = page.props.auth.user;
const userStore = useUserStore();
const toast = useToast();
const loading = ref(false);

const mailNotification = ref(user.account.mail == 1 ? true : false);

const aboutMe = ref(false);
const isMobile = ref(false);

onMounted(() => {
    isMobile.value = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
});

async function changeMailNotif() {
    loading.value = true;
    await userStore
        .setMailNotif()
        .then(() => {
            toast.add({
                severity: "success",
                summary: "Success",
                detail:
                    "Mail Notification" +
                    (mailNotification.value ? " Enabled" : " Disabled"),
                life: 3000,
            });
        })
        .finally(() => {
            loading.value = false;
        });
}

const items = ref([
    {
        label: "Reload",
        icon: "pi pi-refresh",
        command: () => {
            window.location.reload();
        },
    },
    {
        label: "About Me",
        icon: "pi pi-user",
        command: () => {
            aboutMe.value = true;
        },
    },
]);
</script>
