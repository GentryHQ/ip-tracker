<template>
	<section class="IP">
		<div class="IP-search container">
			<h1>IP Address Tracker</h1>
			<FormInput @valid-ip="getIpData" />
		</div>

		<div class="IP-info">
			<div class="address box">
				<h2>IP Address</h2>

				<template v-if="!IpApiData.ip">
					<div class="animation">
						<span></span>
					</div>
				</template>

				<template v-else>
					<p>{{ IpApiData?.ip || '-' }}</p>
				</template>
				
			</div>

			<div class="location box">
				<h2>Location</h2>
				<template v-if="!IpApiData.location.country">
					<div class="animation">
						<span></span>
					</div>
				</template>
				<template v-else>
					<p>
						{{ IpApiData.location.region }} {{ IpApiData.location.city }}
						{{ IpApiData.location.postalCode }}
					</p>
				</template>
			</div>

			<div class="timezone box">
				<h2>Timezone</h2>

				<template v-if="!IpApiData.location.timezone">
					<div class="animation">
						<span></span>
					</div>
				</template>

				<template v-else>
					<p>
						UTC {{ IpApiData.location.timezone }}
					</p>
				</template>				
			</div>

			<div class="isp box">
				<h2>ISP</h2>

				<template v-if="!IpApiData.isp">
					<div class="animation">
						<span></span>
					</div>
				</template>

				<template v-else>
					<p>{{ IpApiData.isp }}</p>
				</template>	
				
			</div>
		</div>
	</section>

	<section class="map">
		<MapComp :lat="IpApiData.location.lat" :long="IpApiData.location.lng" />
	</section>
</template>

<script setup>
	const IpApiData = ref({
		ip: '',
		location: {
			city: '',
			region: '',
			country: '',
			postalCode: '',
			timezone: '',
		},
		isp: '',
	});
	const userIpAddress = ref('');

	onMounted(async () => {
		const url = 'https://api.ipify.org/?format=json';

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Can't User IP Address" + response.status);
			}

			const data = await response.json();
			userIpAddress.value = data.ip;
			getIpData(userIpAddress.value);
		} catch (error) {
			console.error(error);
		}
	});

	const getIpData = async (ipSearch) => {
		try {
			const response = await fetch('/api/ipfy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ipSearch }),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			IpApiData.value = await response.json();
		} catch (err) {
			throw err;
		}
	};

</script>

<style lang="scss" scoped>
	@use '~/assets/css/variables.scss' as v;

	.IP {
		background: url('./public/images/pattern-bg-desktop.png') center center;
		background-repeat: no-repeat;
		background-size: cover;
		z-index: 5;
		position: relative;
		// margin-inline: auto;
		// max-inline-size: 400px;

		display: flex;
		flex-direction: column;
		align-items: center;

		&-search {
			padding-block: 2.5rem;

			h1 {
				font-size: 2.5rem;
				font-weight: v.$fw-2;
				color: v.$white;
				text-align: center;
			}
		}

		&-info {
			background-color: v.$white;
			padding: 40px;
			border-radius: 1rem;
			margin-inline: 20px;
			box-shadow: -1px 8px 20px 8px #00000030;
			margin-block-end: -50px;
			max-inline-size: 62.5rem;

			display: flex;
			gap: 2.5rem;
			flex-direction: row;
			justify-content: space-between;

			.box:not(:first-child) {
				border-left: 1px solid v.$DarkGray;
				padding-inline-start: 40px;
			}

			h2 {
				font: {
					size: 14px;
					weight: v.$fw-3;
				}
				letter-spacing: 2px;
				text-transform: uppercase;
				color: v.$DarkGray;
			}

			p {
				padding-block-start: 8px;
				font: {
					size: 1.5rem;
					weight: v.$fw-2;
				}
				color: v.$VeryDarkGray;
			}
		}
	}

	@media screen and (max-width: 768px) {
		.IP {
			background: url('./public/images/pattern-bg-mobile.png') center right;
			background-repeat: no-repeat;
			background-size: cover;

			&-info {
				margin-block-end: -150px;
				padding: 2.5rem 5rem;
				gap: 24px;
				flex-direction: column;
				text-align: center;
				width: 85%;

				.box:not(:first-child) {
					border-left: none;
					border-top: 1px solid v.$DarkGray;
					padding-inline-start: 0px;
					padding-block-start: 1.25rem;
				}
			}
		}
	}

	.map {
		z-index: 2;
		position: relative;
	}

	.animation {
		display: flex;
		justify-content: center;
		margin-block-start: 0.625rem;

		span {
			height: 40px;
			width: 100%;
			// background-color: red;
			display: block;
			animation: flash .5s ease-in infinite;
		}
	}

	@keyframes flash {
		0% {
			background: linear-gradient(to right, rgb(226, 226, 226), rgb(237, 237, 237));
		}
		50% {
			background: linear-gradient(to right, rgb(237, 237, 237), rgb(226, 226, 226));
		}
		100% {
			background: linear-gradient(to right, rgb(226, 226, 226), rgb(237, 237, 237));
		}
	}
</style>
