<script setup>
import { ref, onMounted, computed } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import { useToast } from "primevue/usetoast";
import { useAdminStore } from "@/stores/admin";
import EditAccount from "@/components/admin/Users/EditAccount.vue";
import EditInfo from "@/components/admin/Users/EditInfo.vue";
import PaymentMethodForm from "@/components/admin/PaymentMethodForm.vue";

const emits = defineEmits(["hide", "updated"]);

const page = usePage();
const toast = useToast();
const adminStore = useAdminStore();

const data = ref(adminStore.currentUser);

const profitTypes = computed(() =>
    Object.keys(page.props.config.profitTypes).map((key) => {
        return {
            value: key,
            name: profitTypes[key],
        };
    })
);
const profitType = ref(null);

const paymentMethodForm = useForm({
    section: "payment_method",
    id: null,
    address: null,
});

const pwdForm = useForm({
    section: "password",
    password: null,
    password_confirmation: null,
});

const withdPwdForm = useForm({
    section: "withdrawal_password",
    withdrawal_password: null,
    withdrawal_password_confirmation: null,
});

const submit = (form) => {
    const url = route("user.update", data.value?.id)
    toast.removeGroup("editUser");

    form.put(url, {
        onSuccess: (page) => {
            toast.add({
                severity: "success",
                summary: "Action performed successfully ",
                detail:
                    page.props.flash.status ||
                    "The " +
                    form.section +
                    " has been upated for " +
                    data.value?.call_name +
                    " (frontend)",
                life: 1000 * 3,
                group: "editUser",
            });
        },
        onFinish: () => {
            form.reset();
            pwdForm.password = null;
            pwdForm.password_confirmation = null;
        },
    });
};

onMounted(() => {
    profitType.value = data.value
        ? {
            value: data.value.account.profit_type,
            name: profitTypes[data.value.account.profit_type],
        }
        : null;
});
</script>

<template>
    <Toast group="editUser" />
    <div>
        <form action="" @submit="updateUser">
            <Accordion value="">
                <!-- info -->
                <AccordionPanel value="info">
                    <AccordionHeader>
                        <span><i class="pi pi-id-card"></i> User Informations</span>
                    </AccordionHeader>
                    <AccordionContent>
                        <EditInfo :user="data" @sended="submit" />
                    </AccordionContent>
                </AccordionPanel>

                <!-- account -->
                <AccordionPanel value="account">
                    <AccordionHeader>
                        <span><i class="pi pi-user"></i> Account Details</span>
                    </AccordionHeader>
                    <AccordionContent>
                        <EditAccount :user="data" @sended="submit" />
                    </AccordionContent>
                </AccordionPanel>

                <!-- wallet addresses -->
                <AccordionPanel value="wallet_addresses">
                    <AccordionHeader>
                        <span><i class="pi pi-wallet"></i> Payment Methods</span>
                    </AccordionHeader>

                    <AccordionContent>
                        <div class="mb-5" v-for="(item, index) in data.payment_methods" :key="index">
                            <PaymentMethodForm :data="item" />
                            <div class="flex justify-end">
                                <Button icon="pi pi-save" label="Save" size="small"
                                    :loading="paymentMethodForm.processing" @click="
                                        paymentMethodForm.transform((data) => ({ ...data, ...item }));
                                    submit(paymentMethodForm);
                                    " />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionPanel>

                <!-- password -->
                <AccordionPanel value="password">
                    <AccordionHeader>
                        <span><i class="pi pi-key"></i> Password</span>
                    </AccordionHeader>

                    <AccordionContent>
                        <div class="md:flex justify-around gap-4">
                            <FloatLabel variant="on" class="mb-4 md:w-1/2">
                                <Password id="password" v-model="pwdForm.password" toggleMask fluid />
                                <label for="password">New Password</label>
                            </FloatLabel>

                            <FloatLabel variant="on" class="mb-4 md:w-1/2">
                                <Password fluid id="password_confirmation" v-model="pwdForm.password_confirmation"
                                    toggleMask />
                                <label for="password_confirmation">Confirm New Password</label>
                            </FloatLabel>
                        </div>
                        <div class="flex justify-end">
                            <Button label="Save" icon="pi pi-save" size="small" :loading="pwdForm.processing" @click="
                                submit(pwdForm)" />
                        </div>
                    </AccordionContent>
                </AccordionPanel>

                <!-- withdrawal password -->
                <AccordionPanel value="withdrawal_password">
                    <AccordionHeader>
                        <span><i class="pi pi-key"></i> Withdrawal Password</span>
                    </AccordionHeader>

                    <AccordionContent>
                        <div class="md:flex justify-around gap-4">
                            <FloatLabel variant="on" class="mb-4 md:w-1/2">
                                <Password id="withdrawal_password" v-model="withdPwdForm.withdrawal_password" toggleMask
                                    fluid />
                                <label for="withdrawal_password">New Password</label>
                            </FloatLabel>

                            <FloatLabel variant="on" class="mb-4 md:w-1/2">
                                <Password fluid id="withdrawal_password_confirmation" v-model="withdPwdForm.withdrawal_password_confirmation
                                    " toggleMask />
                                <label for="withdrawal_password_confirmation">Confirm New Password</label>
                            </FloatLabel>
                        </div>
                        <div class="flex justify-end">
                            <Button label="Save" icon="pi pi-save" size="small" :loading="withdPwdForm.processing"
                                @click="submit(withdPwdForm)" />
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </form>
    </div>
</template>
