
import globalConfig from '@/config'
import configService from '@/api/config.service'
/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

 // http://vue1.fenrunbao.cn/api/User/login?userName=admin666&password=123456&UUID=ceaee97c-244d-4988-a834-a59aa983c8d0&verificationCode=v6wN
/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof(value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

// 移除空字符串，null, undefined
export const delEmptyQueryNodes = (obj = {}) => {
  const params = Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .reduce((acc, key) => ({
      ...acc,
      [key]: obj[key]
    }), {});
  // console.log('过滤后参数=', params)
  return params
};


export const checkUpdate = () => {
	// #ifdef APP-PLUS
	var osname = plus.os.name;
	var apptype = osname == 'iOS' ? 2 : 1;
	console.log(osname, apptype)
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		// console.log(widgetInfo.version,apptype)
		uni.request({
			url: configService.apiUrl + '/api_getVersion.ashx',
			data: {
				fid: globalConfig.api.fid,
				fkey: globalConfig.api.fkey,
				apiname: 'ysh.getVersion', 
			},
			method: 'GET',
			success: (result) => {
				var res = result.data;
				console.log(res)
				if (res.code == '00') {
					let resData = res.appver;
					console.log(resData)
					// if (widgetInfo.version < resData.apkver && resData.apkurl) {
					// 	console.log(11111111111111)
					// }	// 大包更新

					if (osname == 'Android') {
						if (widgetInfo.version < resData.apkver && resData.apkurl) {
							uni.showModal({
								title: '更新提示',
								// showCancel:false,
								content: '是否选择整包更新?',
								success: (showResult) => {
									if (showResult.confirm) {
										uni.showLoading({
											title: 'APP整包更新中'
										})
										// plus.runtime.openURL(openUrl);
										uni.downloadFile({
											url: decodeURIComponent(
												resData
												.apkurl),
											success: (
												downloadResult) => {
												console.log(
													decodeURIComponent(
														resData
														.apkurl
													));
												console.log(
													downloadResult
												);
												if (downloadResult
													.statusCode ===
													200) {
													plus.runtime
														.install(
															downloadResult
															.tempFilePath, {
																force: true
															},
															function() {
																uni
																	.hideLoading();
																plus.runtime
																	.restart();
															},
															function(
																e
															) {
																uni
																	.hideLoading();
																uni.showToast({
																	title: '整包更新失败',
																	duration: 2000
																});
															});
												}
											}
										});
									}
								}
							})
						}
					} else {
						if (widgetInfo.version < resData.iosver && resData.iosurl) {
							console.log(11111111111111)

							uni.showModal({
								title: 'IOS更新提示',
								content: 'APP变动，请及时更新',
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(resData.iosurl);
									}
								}
							})
						}
					}


				}

			}
		});
	});
	// #endif   
}