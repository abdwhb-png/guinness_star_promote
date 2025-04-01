<style scoped>
.the-item {
    --image: url(/app/assets/images/slider/home/1.jpg);
    background-image: var(--image);
    background-size: cover;
    background-position: center;
    min-height: 190px;
    border-radius: 15px;
}
</style>

<script setup>
import Swiper from "@/components/user/Swiper.vue";
</script>

<template>
    <div class="swiper home-slider swiper-initialized swiper-horizontal swiper-backface-hidden">
        <Swiper :total-items="4">
            <div v-for="(item, index) in Array.from(
                { length: 4 },
                (_, i) => i + 1
            )" :key="index" class="swiper-slide" :class="index == 0 ? 'swiper-slide-active' : ''" role="group"
                :aria-label="`${index} / 4`">
                <div class="the-item" :style="{
                    '--image': `url(/app/assets/images/slider/home/${index + 1
                        }-minified.jpg)`,
                }"></div>
            </div>

            <div v-if="false" v-for="(item, index) in Array.from(
                { length: 4 },
                (_, i) => i + 1
            )" :key="index" class="swiper-slide" :class="index == 0 ? 'swiper-slide-active' : ''" role="group"
                :aria-label="`${index} / 5`">
                <div class="flex justify-between items-center liner-bg-1 rounded-xl">
                    <div class="pl-5 hidden">
                        <p class="display-3 font-bold text-g60">50%offer</p>
                        <p class="text-sm text-g50 pb-5">On everything today</p>
                        <a href="" class="text-sm font-semibold text-white bg-g60 rounded-lg py-2 px-6">{{ "Link " +
                            index }}</a>
                    </div>
                    <div class="">
                        <img :src="`/app/assets/images/slider/home/${index + 1
                            }.jpg`" :alt="`slider image ${index + 1}`" style="max-height: 100px" />
                    </div>
                </div>
            </div>
        </Swiper>
    </div>
</template>
