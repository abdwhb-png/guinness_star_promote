<template>
    <div v-for="(item, index) in paymentMethods" :key="item.id"
        class="p-4 border border-g30 rounded-xl flex justify-between items-center w-full cursor-pointer"
        @click="editPaymentMethod(item)">
        <div class="flex justify-start items-center gap-3">
            <div class="bg-white size-8 rounded-full flex justify-center items-center shadow-3">
                <img :src="item.method.image_url || `/app/assets/images/coins/${item.method.symbol}.jpg`"
                    :alt="`${item.method.symbol}image`" />
            </div>
            <p class="text-sm font-medium text-g60">
                {{ item.method.name }}
            </p>
        </div>
        <p class="text-sm" :class="item.address ? 'text-b50' : 'text-g50 underline'">
            Click to edit
        </p>
    </div>

    <van-popup v-model:show="showEdit" position="bottom" round>
        <BottomModal :title="`${item.method.name}`" @close="showEdit = false">
            <template #content>
                <form @submit.prevent="submit" class="pt-8 flex flex-col gap-4 px-6">
                    <div v-if="item.method.type == 'crypto'" class="">
                        <p class="text-g60 font-semibold text-sm pb-2">
                            Wallet Address
                        </p>
                        <div class="p-4 rounded-xl bg-g20 border border-g30">
                            <input v-model="form.address" type="text" required
                                class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                                placeholder="Enter wallet address" />
                        </div>
                        <InputError class="mt-2" :message="form.errors.address" />
                    </div>
                    <div v-else class="space-y-4">
                        <div class="">
                            <p class="text-g60 font-semibold text-sm pb-2">
                                Full Name
                            </p>
                            <div class="p-4 rounded-xl bg-g20 border border-g30">
                                <input v-model="form.owner" type="text" required
                                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                                    placeholder="Enter full name" />
                            </div>
                            <InputError class="mt-2" :message="form.errors.owner" />
                        </div>
                        <div class="">
                            <p class="text-g60 font-semibold text-sm pb-2">
                                Phone Number
                            </p>
                            <div class="p-4 rounded-xl bg-g20 border border-g30">
                                <input v-model="form.phone_number" type="text" required
                                    class="bg-transparent placeholder:text-g50 text-g60 outline-none text-sm placeholder:text-sm"
                                    placeholder="Enter phone number" />
                            </div>
                            <InputError class="mt-2" :message="form.errors.phone_number" />
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <Button type="submit" label="Save" unstyled class="primaryButton w-1/2"
                            :loading="form.processing" />
                    </div>
                </form>
            </template>
        </BottomModal>
    </van-popup>
</template>

<script setup>
import { ref } from "vue";
import { useForm, router } from "@inertiajs/vue3";
import { showSuccessToast, showFailToast } from "vant";

defineProps({
    paymentMethods: {
        type: Array,
        default: () => [],
    },
});

const showEdit = ref(false);
const item = ref(null);

const form = useForm({
    id: null,
    address: null,
    phone_number: null,
    owner: null,
});

const editPaymentMethod = (record) => {
    item.value = record;
    form.id = record.id;
    form.address = record.address;
    form.phone_number = record.phone_number;
    form.owner = record.owner;
    showEdit.value = true;
};

const submit = () => {
    form.put(route("user.payment-method.update"), {
        onSuccess: (page) => {
            showSuccessToast(page.props.flash.status || 'Payment method updated successfully');
            // router.reload();
        },
        onError: (errors) => {
            showFailToast("Something went wrong, please check.");
        },
        onFinish: () => {
            showEdit.value = false;
        },
    });
};
</script>