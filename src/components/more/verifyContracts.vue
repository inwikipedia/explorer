<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Verify Contract Code (version 2.0)</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item>Verify Contracts</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		
			<div class="broadCast_box bgbox">
				<aside class="broadCast_title">
					<h3>Verify and Publish your Solidity Source Code </h3>
				</aside>
				<div class="broadCast_tip">
					Step 1 : Enter your Contract Source Code below.
					<br />Step 2 : If the Bytecode generated matches the existing Creation Address Bytecode, the contract is then Verified.
					<br />Step 3 : Contract Source Code is published online and publicably verifiable by anyone.
					<br />
					<br />NOTES 
					<br />1. To verify Contracts that accept Constructor arguments, please enter the ABI-encoded Arguments in the last box below. 
					<br />2. For debugging purposes if it compiles correctly at Browser Solidity, it should also compile correctly here. 
					<br />3. Contracts that use "imports" will need to have the code concatenated into one file as we do not support "imports" in separate files. You can try using the 	     Blockcat solidity-flattener or SolidityFlattery
					<br />4. We do not support contract verification for contracts created by another contract
					<br />5. There is a timeout of up to 45 seconds for each contract compiled. If your contract takes longer than this we will not be able to verify it.
				</div>
				<div class="broadCast_formBox">
					<div class="broadCast_form">
						<el-form :inline="true" class="demo-form-inline">
							<el-row :gutter="10">
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item label="Contract Address:">
										<el-input
											placeholder="Contract Address"
										></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item label="Contract Name:">
										<el-input
											placeholder="Contract Name"
										></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item label="Compiler:">
										<el-select v-model="optimizationVal" placeholder="Please Select">
											<el-option
												v-for="item in optimization"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item label="Optimization:">
										<el-select v-model="optimizationVal" placeholder="Please Select">
											<el-option
												v-for="item in optimization"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
					
					<div class="broadCast_cont broadCast_textarea">
						<div class="flex-bc mb-20 broadCast_top">
							<h3 class="title">Enter the Solidity Contract Code below</h3>
							<button class="btn-primary cursorP">Fetch From Gist</button>
						</div>
						<el-input
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 6}"
							placeholder="">
						</el-input>
					</div>
					<div class="broadCast_cont broadCast_textarea">
						<p class="info font14 mb-40">The following are optional Parameters which you might need to provide depending your contract</p>
						<ul class="broadCast_ul">
							<li class="flex-sc">
								<p class="p1">1) Runs (Optimizer) : </p>
								<el-input placeholder=""></el-input>
							</li>
							<li>
								<p class="p1">2) Constructor Arguments ABI-encoded (For contracts that accept constructor parameters):</p>
								<span class="blue">Fetch From Gist     For additional information on Constructor Arguments see Our KB Entry </span>
							</li>
						</ul>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 6}"
							placeholder=""
						>
						</el-input>
						<p class="info font14 mb-20">3) Contract Library Address (For contracts that use libraries, supports up to 5 libraries):</p>
						<ul class="broadCast_input">
							<li>
								<el-form :inline="true" class="demo-form-inline">
									<el-row :gutter="10">
										<el-col :span="8">
											<el-form-item label="Library_1 Name:">
												<el-input
													placeholder=""
												></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="1"><i class="el-icon-caret-right H40 font16" style="color:#3bad4b"></i></el-col>
										<el-col :span="11">
											<el-form-item label="Library Contract Address:">
												<el-input
													placeholder=""
												></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</li>
						</ul>
						<button class="btn-primary cursorP" @click="">Send Transaction</button>
						<button class="btn-primary cursorP gray ml-10" @click="">Resset</button>
					</div>
					
				</div>
				
			</div>
		</div>
	</div>
</template>

<style>

</style>

<script>
export default {
	name: '',
	data () {
		return {
			optimization: [{
				label: 'Yes',
				value: '1'
			}, {
				label: 'No',
				value: '0'
			}],
			optimizationVal: 'Yes'
		}
	}
}
</script>
