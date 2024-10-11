<template>
	<div ref="mapContainer" class="map-container" id="map"></div>
</template>

<script setup>
	const props = defineProps({
		lat: Number,
		long: Number,
	});

	const map = ref(null);
	const mapContainer = ref(null);

	// Computed property to check readiness
	const isReady = computed(
		() => props.lat !== undefined && props.long !== undefined
	);

	// Watch for changes in readiness or props and reinitialize if necessary
	watch(
		[isReady, () => props.lat, () => props.long],
		() => {
			if (isReady.value && mapContainer.value) {
				initializeMap();
			}
		},
		{ immediate: true }
	);

	function initializeMap() {
		if (map.value) {
			map.value.remove(); // Clean up the previous map instance if exists
		}
		map.value = L.map(mapContainer.value).setView([props.lat, props.long], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map.value);
		L.marker(
			[props.lat, props.long],
			{ draggable: true }			
		).addTo(map.value);

	}
</script>

<style lang="scss" scoped>
	.map-container {
		height: 600px;
	}
</style>
