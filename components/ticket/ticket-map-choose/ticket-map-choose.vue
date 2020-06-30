<template>
	<view>
		<tui-bottom-popup :show="value" @close="onClose">
			<view class="uni-common-mt">
				<view><map :latitude="latitude" scale="5" :longitude="longitude" :markers="covers" @controltap="onMapTap" @regionchange="mapRegionChange"></map></view>
			</view>
		</tui-bottom-popup>
	</view>
</template>
<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		latitudeProp: {
			type: Number
		},
		longitudeProp: {
			type: Number
		}
	},
	data() {
		return {
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [
				{
					id: '1',
					latitude: 39.908692,
					longitude: 116.397477,
					title: '天安门',
					zIndex: '1',
					iconPath: '/static/gps.png',
					width: 20,
					height: 20,
					anchor: {
						x: 0.5,
						y: 1
					},
					callout: {
						content: '首都北京\n天安门',
						color: '#00BFFF',
						fontSize: 12,
						borderRadius: 2,
						borderWidth: 0,
						borderColor: '#333300',
						bgColor: '#CCFF11',
						padding: '1',
						display: 'ALWAYS'
					}
				}
			],
			showPopup: false
		};
	},
	watch: {
		value(val) {
			this.showPopup = val;
		},
		latitudeProp(val) {
			this.latitude = val;
			this.covers[0].latitude = val;
		},
		longitudeProp(val) {
			this.longitudeProp = val;
			this.covers[0].longitude = val;
		}
	},
	methods: {
		onClose() {
			this.showPopup = false;
			this.$emit('close', {});
		},
		onMapTap(event) {
			console.log(event);
			console.log(this.covers);
			let mapContext = uni.createMapContext();
		},
		mapRegionChange(a, b) {
			console.log(a);
			console.log(b);
		}
	}
};
</script>
<style>
map {
	width: 100%;
	height: 600rpx;
}
</style>
