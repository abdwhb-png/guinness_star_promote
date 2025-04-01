<template>
    <div class="bg-white p-4 fixed left-0 right-0 bottom-0 max-w-[430px] mx-auto" style="z-index: 5">
        <div v-if="!showLoader" v-animateonscroll="{
            enterClass: 'animate-scalein',
            leaveClass: 'animate-fadeout',
        }" class="animate-duration-1000 animate-ease-in-out">
            <ProgressBar v-if="form.processing" mode="indeterminate" />

            <Message v-if="$page.props.auth.user.account.isFrozed" severity="error" icon="pi pi-exclamation-circle"
                class="mt-2">
                Your account is currently frozen.
                <a href="#help_center" class="text-sm font-medium text-g60 underline"
                    @click="siteStore.showHelpCenter = true">
                    Contact Support
                </a>
            </Message>
            <div class="flex justify-between items-center gap-3 buyNowModalOpen">
                <div class="w-full">
                    <Link :href="route('dashboard')" class="primaryButtonOutline flex justify-center items-center">
                    <i class="ph ph-house text-lg me-0.5"></i>
                    Back to Home
                    </Link>
                </div>
                <div class="w-full" v-if="deal">
                    <Button :disabled="!deal || $page.props.auth.user.account.isFrozed"
                        class="w-full primaryButton flex justify-center items-center" unstyled
                        @click="showModal = true">
                        Evaluate
                        <i class="ph ph-star text-lg ml-0.5"></i>
                    </Button>
                </div>
            </div>
        </div>
        <div v-else class="">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
    </div>

    <van-popup v-model:show="showModal" round position="bottom" :style="{ height: '60%' }">
        <BottomModal title="Start rating" @close="showModal = false">
            <template #content>
                <div class="flex flex-col space-y-4" v-if="deal">
                    <div class="">
                        <div class="flex justify-center items-center text-lg">
                            <span class="font-bold">Rating:</span>
                            &nbsp;
                            <Rating v-model="form.rating" />
                        </div>
                        <InputError class="mt-1" :message="form.errors.rating || form.errors.error" />
                    </div>
                    <div>
                        <FloatLabel variant="in">
                            <Textarea id="comment" v-model="form.comment" class="w-full" rows="3"
                                placeholder="Write your comment" />
                            <label for="comment">What do you thing about this {{ deal?.category }} ?</label>
                        </FloatLabel>
                        <InputError class="mt-1" :message="form.errors.comment || form.errors.error" />
                    </div>
                </div>
                <div class="w-full text-center" v-if="deal">
                    <Button :disabled="!deal || $page.props.auth.user.account.isFrozed" label="Submit"
                        class="w-1/2 primaryButton" @click="submit" :loading="form.processing" />
                </div>
            </template>
        </BottomModal>
    </van-popup>
</template>

<script setup>
import { useForm } from "@inertiajs/vue3";
import { showNotify } from "vant";
import { ref } from "vue";
import BottomModal from "./BottomModal.vue";

const emits = defineEmits(['submited']);
const props = defineProps({
    showLoader: {
        type: Boolean,
        default: false,
    },
    deal: {
        type: Object,
        default: null,
    },
});

const showModal = ref(false);

const form = useForm({
    rating: null,
    comment: '',
    pivot_id: null,
});

const submit = () => {
    if (form.rating <= 0 || form.rating > 5) {
        form.setError("rating", "Please rate this deal before submitting!");
        return;
    }

    form.transform((data) => ({
        ...data,
        pivot_id: props.deal.pivot.id,
    })).put(route("user.deal.perform"), {
        onStart: () => {
            form.clearErrors();
        },

        onSuccess: (page) => {
            if (page.props.flash.status) {
                showNotify({
                    message:
                        page.props.flash.status ||
                        "Deal completed successfully. Your commission has been sent to your wallet.",
                    type: "primary",
                });
            }

            if (page.props.flash.fail) {
                const notify = showNotify({
                    message:
                        page.props.flash.fail ||
                        "Something went wrong while submitting deal.",
                    type: "danger",
                    duration: 5000,
                });
                form.setError("error", notify.message);
            }

            form.reset();
            showModal.value = false;
            emits('submited');
        },

        onError: () => {
            showNotify({
                message: "Something went wrong while submitting deal.",
                type: "danger",
                duration: 1000,
            });
        },
    });
};
</script>