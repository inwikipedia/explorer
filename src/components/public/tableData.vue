<template>
	<div></div>
</template>

<style>

</style>

<script>
export default {
	name: 'tableData',
	props: ['tableData'],
	data () {
		return {}
	},
	created () {
		this.$parent.thead.push(this.tableData)
	}
}
</script>
