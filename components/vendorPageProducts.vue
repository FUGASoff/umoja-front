<template>
	<div v-if="items.length == 0" style="height: 100%; min-height: 200px" class="d-flex justify-center flex-column align-center ga-5 mt-10">
		<p>This vendor has not added any product to their store yet. </p>
	</div>
	<div v-else>
		<div style="background-color: " class="d-flex py-6 align-center justify-space-between">
			<p style="font-weight: 600; font-size: 12px; line-height: 15px; text-transform: uppercase; color: #969696">{{items?.length}} products found</p>
			<div>
				<v-btn flat color="transparent" style="font-size: 15px; color: #333333">
					<v-img width="20" height="20" src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1717990511/umoja/view-grid_udnxcc.svg" />
				</v-btn>
				<v-btn
					flat
					rounded="xl"
					size="x-small"
					color="transparent"
					style="font-size: 15px; color: #333333"
					icon="mdi mdi-filter-variant"
					class="mr-2"
				>
					<v-img width="20" height="20" src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1717990443/umoja/filter-icon_hg5ksh.svg" />
				</v-btn>
				<v-btn style="border: 1px solid #e5e5e5; border-radius: 100px !important" variant="outlined" class="textClass text-grey-darken-3">
					<v-img class="mr-2" width="14" height="14" src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1717990443/umoja/filtericon_ri5zov.svg" />
					Filter
				</v-btn>
			</div>
		</div>
		<v-carousel
			style="overflow: visible"
			height="170"
			class="promo promoshort d-none d-md-block"
			:show-arrows="false"
			hide-delimiter-background=""
			cycle
		>
			<v-carousel-item v-for="n in 6" :key="n">
				<v-img
					cover
					height="auto"
					min-height="160px"
					class="bg-black d-flex py-3 align-center rounded-lg"
					:src="getCloudinaryImageUrl('https://res.cloudinary.com/dd26v0ffw/image/upload/v1718893034/umoja-backup2/Rectangle_458_zafbwy_nc48gx.png', 1000)"
				>
					<div>
						<v-row class="d-flex pa-4 px-6 justify-space-between align-center">
							<v-col cols="6" sm="6">
								<h1 style="line-height: 1.2" class="mb-0 text-white font-weight-black">The Waden Cloth</h1>
								<p class="textClass mb-4 text-white">known to be used by the Nawi people</p>
								<div>
									<v-btn flat color="orange"><span class="smallBtn"> See product </span> </v-btn>
									<v-btn flat variant="text" class="ml-2 text-white howit"
										><span style="text-decoration: underline">
											<span class="smallBtn"> Not now </span>
										</span>
									</v-btn>
								</div>
							</v-col>
							<v-col class="d-flex justify-end" cols="6" sm="6">
								<v-card
									width="auto"
									style="
										background-color: rgb(57 57 57 / 60%) !important;

										backdrop-filter: blur(3.1475px);
										border-radius: 12.118px;
										width: auto;
									"
									class="bg-black px-5 py-3"
								>
									<p class="text-white text-overline text-center">auction ends in</p>
									<vue-countdown
										style="font-weight: 700; font-size: 40px"
										class="text-yellow-darken-1"
										:time="timediff"
										v-slot="{ days, hours, minutes, seconds }"
									>
										<div class="d-flex align-center justify-space-between">
											<div v-if="days" class="text-center bg-grey-lighten-3 rounded-lg px-3 py-2">
												<p style="font-weight: 500; font-size: 14px; line-height: 17px; color: #333333">{{ days }}</p>
												<p
													style="
														font-weight: 500;
														font-size: 7px;
														line-height: 9px;
														letter-spacing: 0.03em;

														color: #333333;
													"
												>
													days
												</p>
											</div>
											<p v-if="days" class="text-grey-lighten-3 mb-1 text-h3 mx-1" style="line-height: 1">:</p>
											<div v-if="hours" class="text-center bg-grey-lighten-3 rounded-lg px-3 py-2">
												<p style="font-weight: 500; font-size: 14px; line-height: 17px; color: #333333">{{ hours }}</p>
												<p
													style="
														font-weight: 500;
														font-size: 7px;
														line-height: 9px;
														letter-spacing: 0.03em;

														color: #333333;
													"
												>
													hours
												</p>
											</div>
											<p v-if="hours" class="text-grey-lighten-3 mb-1 text-h3 mx-1" style="line-height: 1">:</p>
											<div class="text-center bg-grey-lighten-3 rounded-lg px-3 py-2">
												<p style="font-weight: 500; font-size: 14px; line-height: 17px; color: #333333">{{ minutes }}</p>
												<p
													style="
														font-weight: 500;
														font-size: 7px;
														line-height: 9px;
														letter-spacing: 0.03em;

														color: #333333;
													"
												>
													mins
												</p>
											</div>
											<p v-if="hours" class="text-grey-lighten-3 mb-1 text-h3 mx-1" style="line-height: 1">:</p>

											<div class="text-center bg-grey-lighten-3 rounded-lg px-3 py-2">
												<p style="font-weight: 500; font-size: 14px; line-height: 17px; color: #333333">{{ seconds }}</p>
												<p
													style="
														font-weight: 500;
														font-size: 7px;
														line-height: 9px;
														letter-spacing: 0.03em;

														color: #333333;
													"
												>
													seconds
												</p>
											</div>
										</div>
									</vue-countdown>
								</v-card>
							</v-col>
						</v-row>
					</div>
				</v-img>
			</v-carousel-item>
		</v-carousel>

		<v-carousel
			style="overflow: visible"
			height="170"
			class="promo promoshort d-block d-md-none"
			:show-arrows="false"
			hide-delimiter-background=""
			cycle
		>
			<v-carousel-item v-for="n in 6" :key="n">
				<v-img
					cover
					height="auto"
					min-height="160px"
					class="bg-black d-flex py-3 align-center rounded-lg"
					src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1717990514/umoja/vendo-slide-banner_ojoipx.png"
				>
					<div>
						<v-row class="d-flex pa-4 px-4 justify-space-between align-center">
							<v-col cols="9" sm="9">
								<h1 style="line-height: 30px; font-size: 24px" class="mb-0 text-white font-weight-black">The Waden Cloth</h1>
								<p style="line-height: 15px; font-size: 12px" class="textClass mb-4 text-white">known to be used by the Nawi people</p>
								<div>
									<v-btn flat to="/product_page" color="orange"><span class="smallBtn"> See product </span> </v-btn>
									<v-btn flat variant="text" class="ml-2 text-white howit"
										><span style="text-decoration: underline">
											<span class="smallBtn"> Not now </span>
										</span>
									</v-btn>
								</div>
							</v-col>
							<v-col class="d-flex justify-end" cols="3" sm="3"> </v-col>
						</v-row>
					</div>
				</v-img>
			</v-carousel-item>
		</v-carousel>
		<v-row style="background-color: #fff" class="mt-8">
			<v-col v-for="(n, i) in items" :key="i" cols="6" lg="4" md="6">
				<product-component :index="i" :item="n" />
			</v-col>
		</v-row>
	</div>
</template>
<style></style>
<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useVendorStore } from "~/stores/vendorStore";
import { useCartStore } from "~/stores/cartStore";
import { useProductStore } from "~/stores/productStore.js";
import {useVendorProductStore} from '~/stores/vendorProducts'
import { getCloudinaryImageUrl } from "~/utils/cloudinary";
import {ref, computed} from 'vue'

const props = defineProps({
            items: {
                type: Array,
                required: true
            }
        })

function filt(text) {
			var newText = text.length > 40 ? text.slice(0, 40) + "..." : text;
			return newText;
		}


const timediff = computed(() => {
			var startDate = new Date();
			// Do your operations
			var endDate = new Date("2023-12-21");
			var seconds = endDate.getTime() - startDate.getTime();
			return seconds;
})



</script>
