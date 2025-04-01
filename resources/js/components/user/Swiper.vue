<template>
    <div data-slider ref="slider" class="relative">
        <div class="swiper-wrapper" ref="wrapper" data-slider-wrapper data-current-page="0"
            :style="{ '--items': showCount }">
            <slot />
        </div>

        <!-- pagination indicator -->
        <div v-if="withPagination" class="absolute bottom-20 right-0 left-0 flex justify-center items-center z-30">
            <div class="bg-g60 text-g30 py-1 px-4 rounded-full text-sm">
                <span class="curentSlideIndex">{{ `${currentPage + 1} ` }}</span>/
                <span id="productSliderLength">{{ totalItems }}</span>
            </div>
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>

        <!-- pagination buttons -->
        <UiButton class="rooms_navigation shadow-2" :disabled="!stop" data-slider-prev>
            <i class="ph ph-arrow-circle-left"></i>
        </UiButton>
        <UiButton :disabled="!stop" class="rooms_navigation shadow-2" data-slider-next>
            <i class="ph ph-arrow-circle-right"></i>
        </UiButton>
    </div>
</template>

<script>
import { debounce } from "lodash";

export default {
    name: "Swiper",
    props: {
        showCount: {
            type: Number,
            default: 1,
        },
        totalItems: {
            type: Number,
            required: true,
        },
        withPagination: {
            type: Boolean,
            default: false,
        },
        isInfinite: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            slider: null,
            nextButton: null,
            prevButton: null,
            wrapper: null,
            currentPage: 0,
            stop: true,
            autoInterval: null,
        };
    },
    mounted() {
        const el = this.$refs.slider;

        if (!el) {
            console.error("Slider element not found!");
            return;
        }

        this.handleHover(this.$refs.slider, "add");

        this.nextButton = el.querySelector("[data-slider-next]");
        this.prevButton = el.querySelector("[data-slider-prev]");
        this.wrapper = el.querySelector("[data-slider-wrapper]");

        if (this.isInfinite) {
            this.cloneSlides();
        }

        this.nextButton.addEventListener("click", () => this.move(1));
        this.prevButton.addEventListener("click", () => this.move(-1));

        // this.wrapper.addEventListener("scrollend", () => this.updateUI());
        this.wrapper.addEventListener(
            "scroll",
            debounce(() => {
                this.currentPage = this.page();

                if (this.isInfinite) {
                    this.handleInfiniteScroll();
                }
                this.updateUI();
            }, 150) // Limitez la fréquence des mises à jour
        );

        this.updateUI();

        setTimeout(() => {
            this.startAutoScroll();
        }, 3000);
    },
    unmounted() {
        clearInterval(this.autoInterval);
        this.handleHover(this.$refs.slider, "remove");
    },
    methods: {
        handleHover(el, action) {
            if (el) {
                if (action === "add") {
                    // Ajouter des écouteurs pour stopper/reprendre le défilement automatique
                    el.addEventListener("mouseenter", this.stopAutoScroll);
                    el.addEventListener("mouseleave", this.startAutoScroll);
                    el.addEventListener("touchstart", this.stopAutoScroll);
                    el.addEventListener("touchend", this.startAutoScroll);
                }

                if (action === "remove") {
                    // Retirer les écouteurs pour éviter les fuites mémoire
                    el.removeEventListener("mouseenter", this.stopAutoScroll);
                    el.removeEventListener("mouseleave", this.startAutoScroll);
                    el.removeEventListener("touchstart", this.stopAutoScroll);
                    el.removeEventListener("touchend", this.startAutoScroll);
                }
            }
        },

        itemsToScroll() {
            return parseInt(
                window
                    .getComputedStyle(this.wrapper)
                    .getPropertyValue("--items"),
                10
            );
        },

        pages() {
            return Math.ceil(
                this.wrapper.children.length / this.itemsToScroll()
            );
        },

        page() {
            return Math.floor(
                this.wrapper.scrollLeft / this.wrapper.offsetWidth
            );
        },

        updateUI() {
            this.wrapper.setAttribute("data-current-page", this.page());

            if (this.page() === 0) {
                this.prevButton.setAttribute("hidden", "hidden");
                this.prevButton.classList.add("hidden");
            } else {
                this.prevButton.removeAttribute("hidden");
                this.prevButton.classList.remove("hidden");
            }

            if (this.page() === this.pages() - 1) {
                this.nextButton.setAttribute("hidden", "hidden");
                this.nextButton.classList.add("hidden");
            } else {
                this.nextButton.removeAttribute("hidden");
                this.nextButton.classList.remove("hidden");
            }
        },

        move(n) {
            if (this.isInfinite) {
                this.moveInfinite(n);
                return;
            }

            let newPage = this.page() + n;

            if (newPage < 0) {
                newPage = 0;
            }

            if (newPage >= this.pages()) {
                newPage = this.pages() - 1;
            }

            this.wrapper.scrollTo({
                left: this.wrapper.children[newPage * this.itemsToScroll()]
                    .offsetLeft,
                behavior: "smooth",
            });
        },

        moveInfinite(n) {
            const slideWidth = this.wrapper.offsetWidth;
            this.wrapper.scrollBy({
                left: slideWidth * n,
                behavior: "smooth",
            });
        },

        autoScroll() {
            if (this.stop) return;

            clearInterval(this.autoInterval);

            if (this.isInfinite) {
                this.autoScrollInfinite();
                return;
            }

            this.autoInterval = setInterval(() => {
                const nextPage = this.page() + 1;

                if (nextPage >= this.pages()) {
                    // Revenir au début lorsque la dernière page est atteinte
                    this.move(-this.pages() + 1);
                } else {
                    // Passer à la page suivante
                    this.move(1);
                }
            }, 2000);
        },

        autoScrollInfinite() {
            this.autoInterval = setInterval(() => {
                this.move(1);
            }, 3000); // Intervalle de 3 secondes
        },

        cloneSlides() {
            const slides = Array.from(this.wrapper.children);

            // Clone les slides au début et à la fin
            slides.forEach((slide) => {
                const cloneStart = slide.cloneNode(true);
                const cloneEnd = slide.cloneNode(true);

                this.wrapper.appendChild(cloneEnd); // Ajout en fin
                this.wrapper.insertBefore(cloneStart, this.wrapper.firstChild); // Ajout au début
            });

            // Ajuste le défilement initial pour être centré sur les slides originaux
            this.wrapper.scrollLeft = slides.length * this.wrapper.offsetWidth;
        },

        handleInfiniteScroll() {
            const slidesCount = this.wrapper.children.length / 3; // Nombre réel de slides
            const scrollWidth = this.wrapper.offsetWidth;

            // Si on dépasse les limites visibles
            if (this.wrapper.scrollLeft <= 0) {
                // Retour à la fin des slides originaux
                this.wrapper.scrollLeft = slidesCount * scrollWidth;
            } else if (
                this.wrapper.scrollLeft >=
                slidesCount * 2 * scrollWidth
            ) {
                // Retour au début des slides originaux
                this.wrapper.scrollLeft = slidesCount * scrollWidth;
            }
        },

        startAutoScroll() {
            this.stop = false;
            this.autoScroll();
        },

        stopAutoScroll() {
            this.stop = true;
            clearInterval(this.autoInterval);
        },
    },
};
</script>

<style>
.swiper-wrapper {
    display: flex;
    --items: 1;
    --gap: 1rem;
    gap: var(--gap);
    overflow-x: auto;
    scroll-snap-type: x proximity;
    /* Pour ne pas couper les éléments visuellement, on utilise un padding */
    padding: calc(var(--gap) * 0.5);
    margin: calc(var(--gap) * -0.5);
    scroll-padding-inline: calc(var(--gap) * 0.5);
    transition: scroll-left 0.3s ease-in-out;
}

.swiper-slide {
    width: 80%;
    margin-right: 16px;
    min-width: calc((100% - (var(--items) - 1) * var(--gap)) / var(--items));
    scroll-snap-align: start;
}

.rooms_navigation {
    position: absolute;
    top: 10%;
    z-index: 10;
}

.rooms_navigation[data-slider-prev] {
    left: 3px;
}

.rooms_navigation[data-slider-next] {
    right: 3px;
}

/* On masque les scrollbars quand une souris est utilisée pour n'utiliser que les boutons de navigation */
@media (min-width: 400px) and (pointer: fine) {
    .swiper-wrapper {
        overflow: hidden;
    }
}

@media (max-width: 400px) {
    .swiper-wrapper {
        padding: 1rem;
        margin: -1rem;
        scroll-padding-inline: 0;
    }

    .swiper-slide {
        scroll-snap-align: center;
        margin-right: 0;
        min-width: 250px;
    }

    .rooms_navigation {
        display: none;
    }
}
</style>
