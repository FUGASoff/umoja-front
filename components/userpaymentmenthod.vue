<template>
	<!-- <div class="px-6 py-10 pb-6"> -->
	<div class="px-4 px-md-6 py-5 my-4 my-md-0 py-md-10 bg-white">
		<p style="color: #000; font-size: 24px; font-weight: 600">Payment Method</p>
		<p style="color: var(--carbon-3, #969696); font-family: Faktum; font-size: 14px; font-style: normal; font-weight: 500">
			Here you can manage your payment methods
		</p>
	</div>

	<div class="mx-4 mx-md-6 mb-6 cardStyle bg-white">
		<template v-if="paymentMethods.length >= 1">
			<v-card flat class="pa-4 cardStyle rounded-lg justify-space-between align-center mb-4 d-flex" v-for="(n, i) in paymentMethods" :key="i">
				<input
					type="radio"
					:id="'payment_' + i"
					:value="n.id"
					v-model="paymentMethodId"
					class="mr-2"
					style="accent-color: #2c6e63; transform: scale(1.5)"
				/>
				<div class="align-center d-flex">
					<div class="ml-4" style="border-radius: 4.536px; border: 0.588px solid var(--carbon-1, #ededed)">
						<v-img
							v-if="n.last_card_brand == 'visa'"
							width="54"
							src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1718893044/umoja-backup2/logo_shmb54_bdqder.png"
						></v-img>
						<v-img
							v-if="n.last_card_brand == 'mastercard'"
							width="54"
							src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1718893048/umoja-backup2/logo2_jpei5o_b1rtj8.png"
						></v-img>
						<v-img
							v-if="n.last_card_brand == 'verve'"
							width="54"
							src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1717990514/umoja/234-2342510_aerocontractors-the-reliable-way-to-fly-verve-card_i7s2un_azzrtw.jpg"
						></v-img>
					</div>
					<div class="text-capitalize px-4">
						<p style="color: #1e1e1e; font-size: 16px; font-weight: 600" class="  ">**** **** **** {{ n.last_card_digits }}</p>
						<p style="color: var(--carbon-4, #333); font-size: 14px; font-weight: 500">Expiry {{ n.expiry_month }}/{{ n.expiry_year }}</p>
					</div>
				</div>
				<v-spacer></v-spacer>
				<v-btn size="small" class="smallText" variant="text" @click="showDeleteModal(n.id)">Delete</v-btn>
				<v-dialog v-model="showDeleteConfirmation" max-width="700" persistent>
					<v-card>
						<v-card-title>Are you sure you want to delete this payment method?</v-card-title>
						<v-card-actions style="display: flex; justify-content: flex-end">
							<v-btn color="red" @click="deleteMethod()">Delete</v-btn>
							<v-btn @click="showDeleteConfirmation = false">Cancel</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card>
		</template>
		<div class="d-flex justify-center justify-md-start">
			<v-btn @click="addPayment" size="large" width="" flat style="border: 1px solid var(--carbon-2, #cecece)" class="px-7" rounded="xl">
				<span style="color: #333; font-size: 14px; font-weight: 600" class="d-flex align-center">
					<v-icon class="mr-1" icon="mdi mdi-plus"></v-icon>
					New Payment Method
				</span>
			</v-btn>
		</div>
	</div>
	<v-dialog v-model="dialog" max-width="1000px" persistent>
		<v-card flat class="mb-4 cardStyle">
			<div class="d-flex align-center justify-space-between mb-4">
				<p style="color: var(--carbon-4, #333); font-size: 20px; font-weight: 600">Select Payment Method</p>
				<div>
					<v-img
						class="d-block d-md-none"
						width="21"
						height="21"
						@click="dialog = false"
						src="https://res.cloudinary.com/dd26v0ffw/image/upload/v1718888896/umoja-backup/close-icon_yomzpz.svg"
					/>
				</div>
			</div>
			<div class="align-center justify-space-between d-flex">
				<div class="d-flex align-center">
					<v-icon color="green" icon="mdi mdi-circle-slice-8" size="30"></v-icon>
					<div class="text-capitalize px-4">
						<p style="font-weight: 500; font-size: 14px; line-height: 24px; color: #333333" class="">Credit Card</p>
					</div>
				</div>
			</div>
			<v-divider class="my-4 mb-8"></v-divider>
			<div class="mb-6">
				<p class="inputLabel">Credit Card Information</p>
				<div style="padding: 18px; border-radius: 10px; background-color: #f6f6f6" id="payment-element"></div>
			</div>
			<div>
				<p class="inputLabel">Full Name</p>
				<v-text-field v-model="fullName" :disabled="paymentProcessing" placeholder="Enter the name on your card" density="comfortable">
				</v-text-field>
			</div>
			<v-row>
				<v-col cols="12" md="6">
					<p class="inputLabel">Email Address</p>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						:disabled="paymentProcessing"
						placeholder="Enter your email address"
						density="comfortable"
					>
					</v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<p class="inputLabel">Phone Number*</p>
					<v-text-field
						:rules="phoneRules"
						:disabled="paymentProcessing"
						v-model="phoneNo"
						placeholder="Enter your phone number"
						density="comfortable"
					>
					</v-text-field>
				</v-col>
			</v-row>
			<v-row class="mt-0">
				<v-col cols="12" md="6">
					<p class="inputLabel">Country</p>
					<v-select
						:items="allCountries"
						:rules="inputRules"
						append-inner-icon="mdi mdi-chevron-down"
						placeholder="Select country"
						v-model="billingCountry"
						:disabled="paymentProcessing"
						density="comfortable"
					>
					</v-select>
				</v-col>
				<v-col cols="12" md="6">
					<p class="inputLabel">State</p>
					<v-select
						@input="fetchStates(billingCountry)"
						:loading="loadingStates"
						color="green"
						:items="states"
						:rules="inputRules"
						:disabled="paymentProcessing"
						append-inner-icon="mdi mdi-chevron-down"
						placeholder="Enter your state"
						v-model="billingState"
						density="comfortable"
					>
					</v-select>
				</v-col>
			</v-row>
			<v-row class="mt-0">
				<v-col cols="12" md="6">
					<p class="inputLabel">City</p>
					<v-select
						@input="fetchCities(billingCountry, billingState)"
						:disabled="paymentProcessing"
						append-inner-icon="mdi mdi-chevron-down"
						placeholder="Select City"
						v-model="billingCity"
						:items="cities"
						:loading="loadingCities"
						:rules="inputRules"
						density="comfortable"
					>
					</v-select>
				</v-col>
				<v-col cols="12" md="6">
					<p class="inputLabel">Zip Code</p>
					<v-text-field :rules="numRules" :disabled="paymentProcessing" v-model="zipcode" placeholder="Enter your zipcode" density="comfortable">
					</v-text-field>
				</v-col>
			</v-row>
			<div>
				<p class="inputLabel">Street Name and House Number*</p>
				<v-text-field
					v-model="streetName"
					:disabled="paymentProcessing"
					:rules="inputRules"
					placeholder="Enter your street address"
					density="comfortable"
				>
				</v-text-field>
			</div>
			<p v-if="paymentError" style="color: red; font-size: 16px; margin-top: 10px; margin-bottom: 10px">{{ paymentError }}</p>
			<div style="display: flex; align-items: center; gap: 20px">
				<v-btn
					class="textClass px-8"
					size="large"
					@click="addPaymentMethod"
					:disabled="paymentProcessing"
					style="margin-top: 20px; flex: 1"
					rounded="xl"
					color="green"
					flat
				>
					{{ paymentProcessing ? "Adding" : "Add Payment Method" }}
				</v-btn>
				<v-btn
					class="textClass px-8 d-none d-md-block"
					size="large"
					@click="dialog = false"
					:disabled="paymentProcessing"
					style="margin-top: 20px; border: 1px solid #2c6e63; flex: 1"
					rounded="xl"
					flat
				>
					Cancel
				</v-btn>
			</div>

			<v-card
				flat
				:color="n.cost == '0.00' ? '#EDF3F0' : ''"
				class="pa-4 cardStyle rounded-lg justify-space-between align-center my-4 d-flex"
				v-for="n in paymenthods"
				:key="n"
			>
				<div class="align-center d-flex">
					<v-icon
						size="20"
						:color="n.cost == '0.00' ? '#2C6E63' : ''"
						:icon="n.cost == '0.00' ? 'mdi mdi-radiobox-marked' : 'mdi mdi-circle-outline'"
					></v-icon>
					<div class="text-capitalize px-4">
						<p style="font-weight: 500; font-size: 14px; line-height: 24px; color: #333333" class="">{{ n.name }}</p>
					</div>
				</div>
				<v-spacer></v-spacer>
				<v-avatar style="width: 100px; max-height: 20px" rounded="0" size="40">
					<v-img :src="n.image"></v-img>
				</v-avatar>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";
import { numRules, emailRules, phoneRules, inputRules } from "~/utils/formrules";
import { useCartStore } from "~/stores/cartStore";
import { usePaymentMethods, deletPaymentMethod } from "~/composables/usePayment";
import { watchEffect, ref } from "vue";
import { useApi } from "~/composables/useApi";
import { allCountries, fetchStates, fetchCities, states, cities, loadingStates, loadingCities } from "~/utils/countryapi";
export default {
	setup() {
		const billingCountry = ref("");
		const billingState = ref("");
		const billingCity = ref("");
		const cartStore = useCartStore();

		watch(
			() => billingCountry.value,
			() => {
				fetchStates(billingCountry.value);
			}
		);
		watch(
			() => billingState.value,
			() => {
				fetchCities(billingCountry.value, billingState.value);
			}
		);

		return {
			billingCountry,
			billingCity,
			billingState,
			cartStore,
		};
	},
	data() {
		return {
			dialog: false,
			paymentMethodId: "",
			fullName: "",
			paymentError: "",
			paymentElement: "",
			email: "",
			paymentProcessing: false,
			showDeleteConfirmation: false,
			deleteID: "",
			stripe: {},
			phoneNo: "",
			zipcode: "",
			streetName: "",
			paymenthods: [
				{
					name: "Paypal",
					image: "https://res.cloudinary.com/dd26v0ffw/image/upload/v1718893024/umoja-backup2/pay-pal-1_dtxv1k_rfupnd.png",
				},
				{
					name: "Neteller",
					image: "https://res.cloudinary.com/dd26v0ffw/image/upload/v1718890483/umoja-backup/neteller-1_mjjfeu_rygqr2.png",
				},
			],
			paymentMethods: [],
		};
	},
	async mounted() {
		this.paymentMethods = await usePaymentMethods();
	},
	methods: {
		showDeleteModal(id) {
			(this.deleteID = id), (this.showDeleteConfirmation = true);
		},
		async deleteMethod() {
			const response = await deletPaymentMethod(this.deleteID);
			if (response) {
				this.paymentMethods = await usePaymentMethods();
				this.showDeleteConfirmation = false;
				this.deleteID = "";
			}
		},
		async addPayment() {
			this.dialog = true;
			const config = useRuntimeConfig();

			this.stripe = await loadStripe(config.public.stripePK);
			const elements = this.stripe.elements();

			this.paymentElement = elements.create("card", {});
			this.paymentElement.mount("#payment-element");
		},
		async addPaymentMethod() {
			this.paymentError = "";
			this.paymentProcessing = true;
			if (
				!this.fullName ||
				!this.email ||
				!this.phoneNo ||
				!this.billingCountry ||
				!this.billingState ||
				!this.billingCity ||
				!this.zipcode ||
				!this.streetName
			) {
				this.paymentError = "Please provide all required informations!!";
				this.paymentProcessing = false;
				return;
			}
			const { paymentMethod, error } = await this.stripe.createPaymentMethod("card", this.paymentElement, {
				billing_details: {
					name: this.fullName,
					email: this.email,
					address: {
						line1: this.streetName,
						city: this.billingCity,
						state: this.billingState,
						postal_code: this.zipcode,
					},
				},
			});

			if (error) {
				this.paymentProcessing = false;
				this.paymentError = error.message;
			} else if (paymentMethod) {
				const api = useApi();
				this.paymentError = "";
				this.dialog = false;
				const data = {
					last_card_brand: paymentMethod.card.brand,
					last_card_digits: paymentMethod.card.last4,
					expiry_month: paymentMethod.card.exp_month,
					expiry_year: paymentMethod.card.exp_year,
					payment_method: paymentMethod.id,
					email: this.email,
				};
				try {
					this.paymentError = "";
					const response = await api({
						url: "customer/paymentMethods",
						method: "POST",
						data: data,
					});
					this.paymentMethods = await usePaymentMethods();
				} catch (error) {
					if (error.response) {
						this.paymentError = error.response.data.message || "An error occurred while adding payment method.";
					} else if (error.request) {
						this.paymentError = "No response received from server. Please try again later.";
					} else {
						this.paymentError = "An error occurred. Please try again later.";
					}
					return false;
				} finally {
					this.paymentProcessing = false;
					this.billingCountry = "";
					this.fullName = "";
					this.email = "";
					this.zipcode = "";
					this.phoneNo = "";
					this.streetName = "";
					this.billingState = "";
					this.billingCity = "";
				}
			}
		},
	},
};
</script>
