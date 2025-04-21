<script setup>
import { copyToClipboard } from '@/utils';
import { useForm } from '@inertiajs/vue3';
import { showNotify } from 'vant';
import { ref } from 'vue';

import AskForPassword from '@/components/user/AskForPassword.vue';
import PaymentMethods from '@/components/user/PaymentMethods.vue';
import RightModal from '@/components/user/RightModal.vue';

const showPopup = ref(false);
const showPMethod = ref(false);
const showKeyboard = ref(false);
const pMethodSection = ref('choose');

const form = useForm({
    type: '',
    method: null,
    amount: null,
});

const success = ref(null);
const selectedPMethod = ref(null);

const start = (type) => {
    form.reset();
    form.type = type;

    if (type === 'recharge') {
        pMethodSection.value = 'list';
        showPMethod.value = true;
    }

    if (type === 'withdrawal') {
        pMethodSection.value = 'choose';
        showPopup.value = true;
    }
};

const handleSelectedPMethod = (item) => {
    form.method = item.type == 'crpto' ? item.method.symbol : item.method.name;
    selectedPMethod.value = item;
    showPMethod.value = false;
};

const onClosePopup = () => {
    showKeyboard.value = false;
    form.defaults('amount');
    form.clearErrors();
    success.value = null;
};

const submit = () => {
    if (success.value) {
        success.value = null;
        form.reset();
        return;
    }

    form.post(route('transaction.store'), {
        onStart: () => {
            form.clearErrors();
        },
        onSuccess: (page) => {
            showNotify({
                message: 'Transaction request sent.',
                type: 'success',
                duration: 1000,
            });
            success.value = 'We have received your request.';
        },
        onError: (errors) => {
            showNotify({
                message: 'Something went wrong, please check.',
                type: 'danger',
                duration: 1000,
            });
        },
        onFinish: () => {
            form.reset('amount');
        },
    });
};
</script>

<template>
    <div class="flex w-full items-center justify-between gap-2">
        <button @click="start('recharge')" class="primaryButton flex w-full items-center justify-center !text-sm">
            <i class="ph ph-hand-withdraw me-0.5 text-lg"></i> Recharge
        </button>
        <AskForPassword
            class="w-full"
            pwd-type="withdrawal"
            title="Withdrawal Password"
            content="For your security, please enter your withdrawal password to continue."
            @confirmed="start('withdrawal')"
        >
            <button class="primaryButtonOutline mt-4 flex w-full items-center justify-center !text-sm">
                <i class="ph ph-hand-deposit me-0.5 text-lg"></i> Withdrawal
            </button>
        </AskForPassword>
    </div>

    <van-number-keyboard
        z-index="9999"
        :show="showKeyboard"
        v-model="form.amount"
        theme="custom"
        :extra-key="['00', '.']"
        close-button-text="Close"
        @blur="showKeyboard = false"
    />

    <van-popup v-model:show="showPopup" round @closed="onClosePopup" teleport="body">
        <BottomModal :title="`New ${form.type}`" @close="showPopup = false">
            <template #content>
                <div v-if="success" class="">
                    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" :text="success" />

                    <div v-if="form.type === 'recharge'">
                        <p>Please send the recharge money to the following address.</p>
                        <p class="text-g50 flex items-center justify-start gap-1 pt-3 text-xs" style="overflow-x: auto">
                            <i class="ph ph-wallet"></i>{{ selectedPMethod?.method?.address }}
                        </p>
                        <button
                            @click="copyToClipboard(selectedPMethod?.method?.address)"
                            class="text-g50 bg-g20 border-g30 mt-2 rounded-md border px-1 py-0.5 text-xs"
                        >
                            Copy Address
                        </button>
                    </div>
                    <p v-else>We will proceed with your request shortly.</p>
                </div>
                <div v-else class="flex flex-col gap-4 px-6">
                    <div class="">
                        <p class="text-g60 pb-2 text-sm font-semibold">Method</p>
                        <a
                            href="javascript:void(0);"
                            @click="showPMethod = true"
                            class="bg-g20 border-g30 flex items-center justify-between rounded-md border p-4"
                        >
                            <p class="text-g50 text-sm">
                                {{ form.method ? form.method : 'Select Method' }}
                            </p>
                            <i class="ph ph-caret-right"></i>
                        </a>
                        <InputError class="mt-2" :message="form.errors.method" />
                    </div>

                    <div class="">
                        <p class="text-g60 pb-2 text-sm font-semibold">Amount</p>
                        <div class="bg-g20 border-g30 rounded-xl border p-4">
                            <input
                                v-model="form.amount"
                                type="text"
                                class="placeholder:text-g50 text-g60 bg-transparent text-sm outline-none placeholder:text-sm"
                                placeholder="Please enter amount"
                            />
                        </div>
                        <InputError class="mt-2" :message="form.errors.amount" />
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-start gap-3">
                    <Button
                        @click="submit"
                        :label="success ? '' : 'Confirm'"
                        :icon="success ? 'pi pi-refresh' : ''"
                        :loading="form.processing"
                        unstyled
                        class="w-full"
                        :class="success ? 'primaryButtonOutline' : 'primaryButton'"
                    />
                </div>
            </template>
        </BottomModal>
    </van-popup>

    <van-popup v-model:show="showPMethod" position="right" :style="{ width: '100%', height: '100%' }">
        <RightModal title="Payment Methods" @close="showPMethod = false">
            <template #content>
                <h2 class="text-g60 pb-2 text-center text-lg font-semibold">Choose your preferred method.</h2>
                <PaymentMethods :section="pMethodSection" @selected="handleSelectedPMethod" />
            </template>
        </RightModal>
    </van-popup>
</template>
