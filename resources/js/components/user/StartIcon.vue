<style scoped>
.my-pulse {
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -ms-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    -ms-animation-delay: 1s;
    -o-animation-delay: 1s;
    animation-delay: 1s;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -ms-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
    box-shadow: 0 0 0 0 var(--shadow-color);
    transform: scale(1);
    animation: pulseEffect 2s infinite;
}

.pulse-container {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hexagon-shadow {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background: var(--shadow-color, rgba(52, 172, 224, 0.6));
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    animation: hexPulse 2s infinite;
    z-index: -1;
}

@keyframes hexPulse {
    0% {
        transform: scale(0.8);
        opacity: 0.7;
    }

    50% {
        transform: scale(1.5);
        opacity: 0;
    }

    100% {
        transform: scale(0.8);
        opacity: 0;
    }
}

@keyframes pulseEffect {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 var(--shadow-color);
    }

    50% {
        transform: scale(1);
        box-shadow: 0 0 0 15px rgba(52, 172, 224, 0);
        /* Ne peut pas être dynamique, mais devient transparent */
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
    }
}
</style>


<script setup>
import { ref, computed } from "vue";

const color = ref("3, 3, 55"); // Format RGB sans alpha

const shadowColor = computed(() => `rgba(${color.value}, 0.7)`);
</script>

<template>
    <div class="relative size-[55px] shrink-0" :style="{ '--shadow-color': shadowColor }">
        <!-- Ombre pulsante hexagonale -->
        <div class="hexagon-shadow"></div>
        <svg class="w-full h-full stroke-gray-300 fill-gray-100" fill="none" height="48" viewBox="0 0 44 48" width="44"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506
                18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937
                39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                fill=""></path>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center animate-pulse">
            <svg role="presentation" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                viewBox="0 0 32 32">
                <path :fill="'rgb(' + color + ')'"
                    d="M10.959 31.651c-0.093 0-0.191-0.019-0.28-0.060-0.299-0.139-0.451-0.472-0.361-0.789l3.628-12.745-8.113 1.695c-0.217 0.039-0.437-0.024-0.596-0.169-0.159-0.151-0.233-0.369-0.199-0.588l2.456-15.415c0.044-0.268 0.248-0.481 0.512-0.544l11.433-2.667c0.237-0.060 0.492 0.025 0.653 0.211 0.164 0.188 0.208 0.448 0.12 0.677l-3.319 8.601 9.243-2.399c0.268-0.075 0.552 0.031 0.713 0.257 0.159 0.225 0.164 0.528 0.008 0.752l-15.341 22.881c-0.129 0.195-0.341 0.301-0.557 0.301z">
                </path>
            </svg>
        </div>
    </div>
</template>
