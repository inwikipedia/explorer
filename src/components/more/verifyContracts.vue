<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.MORE.VERIFY_CONTRACT_CODE}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.MORE.VERIFY_CONTRACTS}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		
			<div class="broadCast_box bgbox">
				<aside class="broadCast_title">
					<h3>{{LANG.MORE.VERIFY_TITLE}}</h3>
				</aside>
				<div class="broadCast_tip">
					{{LANG.MORE.VERIFY_STEP_1}}
					<br />{{LANG.MORE.VERIFY_STEP_2}}
					<br />{{LANG.MORE.VERIFY_STEP_3}}
					<br />
					<br />NOTES
					<br />{{LANG.MORE.VERIFY_STEP_NOTES_1}}
					<br />{{LANG.MORE.VERIFY_STEP_NOTES_2}}
					<br />{{LANG.MORE.VERIFY_STEP_NOTES_3}}
					<br />{{LANG.MORE.VERIFY_STEP_NOTES_4}}
					<br />{{LANG.MORE.VERIFY_STEP_NOTES_5}}
				</div>
				<div class="broadCast_formBox">
					<div class="broadCast_form">
						<el-form :inline="true" class="demo-form-inline">
							<el-row :gutter="10">
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item :label="LANG.MORE.CONTRACT_ADDRESS + ':'">
										<el-input
											:placeholder="LANG.MORE.CONTRACT_ADDRESS"
										></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item :label="LANG.MORE.CONTRACT_NAME + ':'">
										<el-input
											:placeholder="LANG.MORE.CONTRACT_NAME"
										></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
									<el-form-item :label="LANG.MORE.COMPILER + ':'">
										<el-select v-model="optimizationVal" :placeholder="LANG.PH.PLEASE_SELECT">
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
									<el-form-item :label="LANG.MORE.OPTIMIZATION + ':'">
										<el-select v-model="optimizationVal" :placeholder="LANG.PH.PLEASE_SELECT">
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
							<h3 class="title">{{LANG.MORE.ENTER_CONTRACT}}</h3>
							<button class="btn-primary cursorP">{{LANG.BTN.FETCH_FROM_GIST}}</button>
						</div>
						<el-input
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 6}"
							placeholder="">
						</el-input>
					</div>
					<div class="broadCast_cont broadCast_textarea">
						<p class="info font14 mb-40">{{LANG.MORE.PARAMS_TIP}}</p>
						<ul class="broadCast_ul">
							<li class="flex-sc">
								<p class="p1">1) {{LANG.MORE.RUN_OPTIMIZER}} : </p>
								<el-input placeholder=""></el-input>
							</li>
							<li>
								<p class="p1">2) {{LANG.MORE.CONSTRUCTOR_ARGUMENT_1}}:</p>
								<span class="blue">{{LANG.MORE.CONSTRUCTOR_ARGUMENT_2}}</span>
							</li>
						</ul>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 6}"
							placeholder=""
						>
						</el-input>
						<p class="info font14 mb-20">3) {{LANG.MORE.LIBRARY_ADDRESS_TIP}}:</p>
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
											<el-form-item :label="LANG.MORE.CONTRACT_LIBRARY_ADDRESS + ':'">
												<el-input
													placeholder=""
												></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</li>
						</ul>
						<button class="btn-primary cursorP">{{LANG.BTN.SEND_TRANSACTION}}</button>
						<button class="btn-primary cursorP gray ml-10">{{LANG.BTN.RESET}}</button>
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
