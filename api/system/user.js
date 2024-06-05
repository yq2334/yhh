import request from '@/utils/request'
import {
	getToken
} from '@/utils/auth';
import globalConfig from '@/config'

export function getHomeData(data) {
	return request({
		'url': '/api_Default.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: data,
		loading: '加载中...'
	})
}
export function getHomeDataUnlogin(data) {
	return request({
		'url': '/api_Default_home.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: data,
		loading: '加载中...'
	})
}
export function getNewList(data) {
	return request({
		'url': '/api_newslist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: data,
		loading: '加载中...'
	})
}

export function getNewListDetail(data) {
	return request({
		'url': '/api_newsdetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: data,
		loading: '加载中...'
	})
}
export function getWalletData(data) {
	return request({
		'url': '/api_money.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		'method': 'post',
		
		data: data,
		loading: '加载中...'
	})
}
export function getYejiData(data) {
	return request({
		'url': '/api_yeji.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.yeji',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getYejiMonth(data) {
	return request({
		'url': '/api_data_yejimonth.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.data_yejimonth',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getFriendList(data) {
	return request({
		'url': '/api_friendlist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.friendlist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMemberCenter(data) {
	return request({
		'url': '/api_memcenter.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.memcenter',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getContactus(data) {
	return request({
		'url': '/api_contactus.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.shcontactus',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getUse(data) {
	return request({
		'url': '/api_getUse.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getUse',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function tousu(data) {
	return request({
		'url': '/api_tousu.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.tousu',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function getBank(data) {
	return request({
		'url': '/api_getbank.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function setBank(data) {
	return request({
		'url': '/api_mybank_set.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.mybank_set',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function getCardBank(data) {
	return request({
		'url': '/api_mybank.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.mybank',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getDirectMerchantList(data) {
	return request({
		'url': '/api_myshanghu.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myshanghu',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getTeamMerchantList(data) {
	return request({
		'url': '/api_myshanghu_td.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myshanghu_td',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getJiaoyiList(data) {
	return request({
		'url': '/api_jiaoyilist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.jiaoyilist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getJiesuanList(data) {
	return request({
		'url': '/api_jiesuanlist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.jiesuanlist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMerchantInfo(data) {
	return request({
		'url': '/api_myshanghu_info.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myshanghu_info',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getMerchantRptdayList(data) {
	return request({
		'url': '/api_myshanghu_rptday.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myshanghu_rptday',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMerchantRptMonthList(data) {
	return request({
		'url': '/api_myshanghu_rptmonth.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myshanghu_rptmonth',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getBandList(data) {
	return request({
		'url': '/api_myzhengce_pinpai.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myzhengce_pinpai',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getPoliceList(data) {
	return request({
		'url': '/api_myzhengce_zhengce.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myzhengce_zhengce',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getPoliceDetail(data) {
	return request({
		'url': '/api_myzhengce_zhengceDetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myzhengce_zhengceDetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getCardIdInfo(data) {
	return request({
		'url': '/api_getCardId.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getCardId',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getCardIdInfo_feifaren(data) {
	return request({
		'url': '/api_getCardId_feifaren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getCardId_feifaren',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getCardIdInfo_faren(data) {
	return request({
		'url': '/api_getCardId_faren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getCardId_faren',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getBnakIdInfo(data) {
	return request({
		'url': '/api_getBank.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getBank',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getCardIdDateInfo(data) {
	return request({
		'url': '/api_getCardDate.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getCardDate',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getCardIdDateInfo_faren(data) {
	return request({
		'url': '/api_getCardDate_faren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getCardDate_faren',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getCardIdDateInfo_feifaren(data) {
	return request({
		'url': '/api_getCardDate_feifaren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getCardDate_feifaren',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getMcc(data) {
	return request({
		'url': '/api_getMcc.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getMcc',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMccExt(data) {
	return request({
		'url': '/api_getMccExt.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getMccExt',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getZhiZhaoInfo(data) {
	return request({
		'url': '/api_getZhiZhao.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getZhiZhao',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function ruWang_One(data) {
	return request({
		'url': '/api_RuWang_One.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_One',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function ruWang_Two(data) {
	return request({
		'url': '/api_RuWang_Two.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Two',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Two_faren(data) {
	return request({
		'url': '/api_RuWang_Two_faren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Two_faren',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Two_feifaren(data) {
	return request({
		'url': '/api_RuWang_Two_feifaren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Two_feifaren',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Three(data) {
	return request({
		'url': '/api_RuWang_Three.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Three',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Three_faren(data) {
	return request({
		'url': '/api_RuWang_Three_faren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Three_faren',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Three_feifaren(data) {
	return request({
		'url': '/api_RuWang_Three_feifaren.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Three_feifaren',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Two_ZhiZhao(data) {
	return request({
		'url': '/api_RuWang_Two_ZhiZhao.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Two_ZhiZhao',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function uploadComIng(data) {
	return request({
		'url': '/api_UploadComIng.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.UploadComIng',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function uploadComIng_mentou(data) {
	return request({
		'url': '/api_UploadComIng_mentou.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.UploadComIng_mentou',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function ruWang_Four(data) {
	return request({
		'url': '/api_RuWang_Four.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWang_Four',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function get_qalist(data) {
	return request({
		'url': '/api_qalist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.qalist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getqaListDetail(data) {
	return request({
		'url': '/api_qadetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.qadetail',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getMyInfo(data) {
	return request({
		'url': '/api_myInfo.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myInfo',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getPoslist(data) {
	return request({
		'url': '/api_poslist.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.poslist',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function posSubmit(data) {
	return request({
		'url': '/api_posSubmit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.posSubmit',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getFaceUrl(data) {
	return request({
		'url': '/api_getFaceUrl.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getFaceUrl',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getRenLianResult(data) {
	return request({
		'url': '/api_getRenLianResult.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		headers: {
			hideErrorMsg: true
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getRenLianResult',
			token: getToken()
		}, data),
		loading: '结果查询中...'
	})
}

export function ruWangSubmit(data) {
	return request({
		'url': '/api_RuWangSubmit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWangSubmit',
			token: getToken()
		}, data),
		loading: '入网中...'
	})
}

export function ruWangSubmitGeTi(data) {
	return request({
		'url': '/api_RuWangSubmit_GeTi.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.RuWangSubmit_GeTi',
			token: getToken()
		}, data),
		loading: '入网中...'
	})
}

export function setTongZhi(data) {
	return request({
		'url': '/api_setTongZhi.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.setTongZhi',
			token: getToken()
		}, data),
		loading: '确认中...'
	})
}

export function getXieyidetail(data) {
	return request({
		'url': '/api_xieyidetail.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.xieyidetail',
			token: getToken()
		}, data),
		loading: '确认中...'
	})
}

export function uploadQianMing(data) {
	return request({
		'url': '/api_UploadQianMing.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.UploadQianMing',
			token: getToken()
		}, data),
		loading: '确认中...'
	})
}

export function getbank_zh(data) {
	return request({
		'url': '/api_getbank_zh.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_zh',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getEdu_info(data) {
	return request({
		'url': '/api_getEdu_info.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getEdu_info',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getbank_citiaoka(data) {
	return request({
		'url': '/api_getbank_citiaoka.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_citiaoka',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getbank_tier(data) {
	return request({
		'url': '/api_getbank_tier.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_tier',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getbank_citiaoka_submit(data) {
	return request({
		'url': '/api_getbank_citiaoka_submit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_citiaoka_submit',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function getbank_tier_submit(data) {
	return request({
		'url': '/api_getbank_tier_submit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_tier_submit',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}
export function get_myInfo_jiju(data) {
	return request({
		'url': '/api_myInfo_jiju.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.myInfo_jiju',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}
export function getDaoZhangEd(data) {
	return request({
		'url': '/api_getDaoZhangEd.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getDaoZhangEd',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function submitDaoZhangEd(data) {
	return request({
		'url': '/api_SubmitDaoZhangEd.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.SubmitDaoZhangEd',
			token: getToken()
		}, data),
		loading: '提交中...'
	})
}

export function getbank_BianGengList(data) {
	return request({
		'url': '/api_getbank_BianGengList.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_BianGengList',
			token: getToken()
		}, data),
		loading: '加载中...'
	})
}

export function getbank_BianGeng(data) {
	return request({
		'url': '/api_getbank_BianGeng.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_BianGeng',
			token: getToken()
		}, data),

		loading: '识别中...'
	})
}
export function getbank_BianGengAdd(data) {
	return request({
		'url': '/api_getbank_BianGengAdd.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_BianGengAdd',
			token: getToken()
		}, data),

		loading: '提交中...'
	})
}
export function getbank_BianGengSubmit(data) {
	return request({
		'url': '/api_getbank_BianGengSubmit.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getbank_BianGengSubmit',
			token: getToken()
		}, data),

		loading: '提交中...'
	})
}


export function getWx_SaoMa(data) {
	return request({
		'url': '/api_getWx_SaoMa.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getWx_SaoMa',
			token: getToken()
		}, data),

		loading: '准备中...'
	})
}

export function getImg_RenZheng(data) {
	return request({
		'url': '/api_getImg_RenZheng.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getImg_RenZheng',
			token: getToken()
		}, data),

		loading: '加载中...'
	})
}

export function getImg_TiEr(data) {
	return request({
		'url': '/api_getImg_TiEr.ashx',
		'method': 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
		data: Object.assign({
			fid: globalConfig.api.fid,
			fkey: globalConfig.api.fkey,
			apiname: 'ysh.getImg_TiEr',
			token: getToken()
		}, data),

		loading: '加载中...'
	})
}