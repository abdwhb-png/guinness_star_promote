<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { showFailToast } from "vant";
import { Message } from "primevue";
import UserLayout from "@/layouts/UserLayout.vue";
import StartLoader from "@/components/user/StartLoader.vue";
import StartBottom from "@/components/user/StartBottom.vue";

const userStore = useUserStore();
const showLoader = ref(true);
const deal = ref(null);
const errorMsg = ref('');

const getDeal = async () => {
    showLoader.value = true;
    axios
        .get(route("user.deal"))
        .then((response) => {
            setTimeout(() => {
                deal.value = response.data.deal || null;
            }, 1000);
        })
        .catch((err) => {
            console.error(err);
            if (err.response.status === 403) {
                errorMsg.value = err.response.data.error || err.message;
            } else {
                showFailToast('Something went wrong. Please try again.');
            }
        })
        .finally(() => {
            setTimeout(() => {
                showLoader.value = false;
            }, 1000);
        });
};

onMounted(async () => {
    await getDeal();
});
</script>

<template>
    <UserLayout title="Start">
        <template #bottom>
            <StartBottom :show-loader="showLoader" :deal="deal" @submited="getDeal()" />
        </template>

        <div v-if="showLoader && !deal" class="loader-container">
            <StartLoader />
        </div>
        <div v-else-if="showLoader && deal" class="loader-container">
            <van-loading type="spinner" color="#1989fa" />
        </div>

        <div v-if="!showLoader && !deal" class="loader-container">
            <Message severity="error" icon="pi pi-exclamation-circle">
                <div v-html="errorMsg || 'Something went wrong. Please try again.'"></div>
                <Link href="/more" class="link">Contact support</Link> or <button type="button"
                    class="underline text-black" onclick="reloadPage()">reload
                    page
                </button>.
            </Message>
        </div>

        <div v-if="!showLoader && deal">
            <!-- deal images -->
            <div class="pt-8 px-4">
                <div class="flex flex-col items-center gap-2">
                    <span class="text-xl font-medium">Scroll Down</span>
                    <span
                        class="slidedown-icon h-8 w-8 bg-primary text-white rounded-full inline-flex items-center justify-center">
                        <i class="pi pi-arrow-down" />
                    </span>
                </div>
                <div class="flex justify-center items-center rounded-lg">
                    <div v-lazy-container="{
                        selector: 'img',
                        loading: '/app/assets/images/load.gif',
                    }">
                        <Image :src="deal.image" :data-src="deal.image" alt="Deal Image" width="350" height="550"
                            preview />
                    </div>
                </div>
            </div>
            <!-- end deal images -->

            <div class="bg-white px-4 pt-6 rounded-t-3xl pb-28">
                <!-- deal details -->
                <div class="border-b border-dashed border-g30 pb-4">
                    <div class="flex justify-between items-center">
                        <div class="">
                            <p class="text-xl font-bold text-g60">
                                {{ deal.name }}
                            </p>
                            <div class="flex justify-between items-center mt-2">
                                <p class="text-g60 font-semibold text-xs" style="text-transform: capitalize">
                                    {{ deal.category }}
                                    <span class="font-normal text-g40 hidden">Available</span>
                                </p>
                                <div class="leading-none h-1.5 w-1.5 rounded-full bg-g60 mx-2"></div>
                                <div class="flex justify-start items-center gap-2">
                                    <i class="ph-fill ph-star text-g30"></i>
                                    <p class="text-g60 font-semibold text-xs">
                                        {{ deal.average_rating }}
                                        <span class="font-normal text-g40">({{ deal.total_reviews + ' reviews'
                                        }})</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div @click="userStore.toggleDealFavourite(deal)"
                            class="size-8 border border-g60 rounded-full flex justify-center items-center !leading-none cursor-pointer favouriteButton">
                            <i class="ph-heart-straight" :class="deal.isLiked ? 'ph-fill' : 'ph'"></i>
                        </div>
                    </div>

                    <div v-if="deal.display_price" class="flex justify-start items-center gap-3 pt-4">
                        <p class="text-xl font-semibold text-g30">
                            {{ $page.props.auth.user.account.currency }}
                        </p>
                        <p class="text-xl font-semibold text-g60">
                            {{ `${deal.display_price}` }}
                        </p>
                    </div>
                </div>
                <!-- end deal details -->

                <!-- deal description -->
                <div class="pt-3">
                    <p class="text-g60 font-semibold">Description</p>
                    <p class="text-slate-500">
                        Click on continue to start rating.
                    </p>
                    <div v-show="deal.description" class="text-sm text-g50 pt-4">
                        <div v-html="deal.description"></div>
                    </div>
                </div>
                <!-- end deal description -->
            </div>
        </div>
    </UserLayout>
</template>

<style>
:root {
    --p-rating-icon-size: 20px !important;
}

.p-image img {
    border-radius: 10px;
    max-height: 550px !important;
}
</style>

<style scoped>
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}

@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
</style>
