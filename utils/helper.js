//常用方法集合
export default {
	/**
	 * toast提示
	 */
	toast(title, duration = 3000, mask = false, icon = 'none') {
		if (Boolean(title) === false) {
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	},
	getFormalDate(time) {
		//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
		return time.replace(/\-/g, "/");

	},
	/**
	 * 返回登录页面
	 */
	async backToLogin() {
		// 存当前页面的地址
		const currentPage = getCurrentPages()[getCurrentPages().length - 1];
		const params = {};
		// #ifdef H5
		params.route = `/${currentPage.$vm.route}`;
		params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
		// #endif
		// #ifdef MP
		params.route = `/${currentPage.$vm.__route__}`;
		params.query = currentPage.$vm.$mp && currentPage.$vm.$mp.query;
		// #endif
		// #ifdef APP-PLUS
		params.route = `/${currentPage.route}`;
		params.query = currentPage.options;
		// #endif
		uni.setStorageSync('backToPage', JSON.stringify(params));
		uni.removeTabBarBadge({
			index: mConstDataConfig.cartIndex
		});
		uni.removeTabBarBadge({
			index: mConstDataConfig.notifyIndex
		});
		await mStore.commit('logout');
		mRouter.push({
			route: '/pages/public/logintype'
		});
	},
	/**
	 * 返回上一页携带参数
	 */
	prePage(index) {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - (index || 2)];
		// #ifdef H5
		return prePage;
		// #endif
		return prePage.$vm;
	},

	/**
	 * 获取一个随机数
	 * @param {Object} min
	 * @param {Object} max
	 */
	random(min, max) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * min + 1, 10);
				break;
			case 2:
				return parseInt(Math.random() * (max - min + 1) + min, 10);
				break;
			default:
				return 0;
				break;
		}
	},
	/*
	 * obj 转 params字符串参数
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = '';
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},
	/*
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || '/';
		let paramsStr = '';
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += '?');
		url += paramsStr;
		return url;
	},
	/*
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || '';
		let theRequest = new Object();
		let str = href.split('?')[1];
		if (str != undefined) {
			let strs = str.split('&');
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
			}
		}
		return theRequest;
	},
	/**
	 * 加密字符串
	 */
	strEncode(str) {
		const key = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let l = key.length;
		let a = key.split('');
		let s = '',
			b,
			b1,
			b2,
			b3;
		for (let i = 0; i < str.length; i++) {
			b = str.charCodeAt(i);
			b1 = b % l;
			b = (b - b1) / l;
			b2 = b % l;
			b = (b - b2) / l;
			b3 = b % l;
			s += a[b3] + a[b2] + a[b1];
		}
		return s;
	},
	/**
	 * 解密字符串
	 */
	strDecode(str) {
		const key = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let l = key.length;
		let b,
			b1,
			b2,
			b3,
			d = 0,
			s;
		s = new Array(Math.floor(str.length / 3));
		b = s.length;
		for (let i = 0; i < b; i++) {
			b1 = key.indexOf(str.charAt(d));
			d++;
			b2 = key.indexOf(str.charAt(d));
			d++;
			b3 = key.indexOf(str.charAt(d));
			d++;
			s[i] = b1 * l * l + b2 * l + b3;
		}
		b = eval('String.fromCharCode(' + s.join(',') + ')');
		return b;
	},
	/*
	 * H5复制
	 */
	h5Copy(content) {

		let textarea = document.createElement('textarea');
		textarea.value = content;
		textarea.readOnly = 'readOnly';
		document.body.appendChild(textarea);
		textarea.select(); // 选择对象
		textarea.setSelectionRange(0, content.length); //核心
		let result = document.execCommand('Copy'); // 执行浏览器复制命令
		textarea.remove();
		const msg = result ? '复制成功' : '复制失败';
		uni.showToast({
			title: msg,
			icon: result ? 'success' : 'error'
		});
		// this.toast({msg: msg, icon: result ? 'success' : 'error'});
	},
	goBack() {  
	  let canNavBack = getCurrentPages();  //获取路由栈
	  if(canNavBack && canNavBack.length>1) {    //判断是否刷新了浏览器，如果刷新了浏览器，路由栈只有当前一个
	    uni.navigateBack({  
	      delta: 1  
	    });  
	  } else {  
	    history.back();  
	  }  
	},
	navTo() {
		
	},
	// 去掉字符串中的空格
	trim(str) {
		if (!str) {
			return '';
		}
		return str.replace(/\s*/g, '');
	},
	/*
	 * 只允许输入小数点和数字
	 */
	checkMoney(val, len) {
		val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
		val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
		val = val.replace(/^0+\./g, '0.');
		val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
		val = (val.match(/^\d*(\.?\d{0,8})/g)[0]) || ''
		return val
	},
	/**
	 * 返回每4位加一空格
	 * @param str
	 */

	/**
	 * 返回格式化好的省略字符串
	 * @param str 字符串(账号、地址省略)
	 * @param number (保留的位数(前后))
	 * @param omitStr (中间省略代替的字符串串)
	 */
	// tslint:disable-next-line: variable-name
	formatOmitStr(str, number, omitStr) {
		if (!str) {
			return "";
		}

		function fourStrFormat(str) {
			return str;
		}
		// const phoneOmit = str.length - number * 2;
		if (number > 4) {
			return (
				fourStrFormat(str.substr(0, number)) +
				omitStr +
				" " +
				fourStrFormat(str.substr(str.length - number, str.length))
			)
		}
		return (
			str.substr(0, number) +
			omitStr +
			str.substr(str.length - number, str.length)
		)
	},
	numFilter(value, point) {
		let zoro = '.';
		for (var i = 0; i < point; i++) {
			zoro = zoro + '0'
		}
		if (!value) {
			return 0 + zoro;
		}
		if (!point) {

			point = 3;
		} else {
			point = point + 1;
		}
		// 截取当前数据到小数点后三位
		var arrayNum = value.toString().split(".");
		if (arrayNum.length == 1) {
			return value.toStrng() + zoro;
		}
		if (arrayNum.length > 1) {
			//小数点右侧 如果小于两位 则补一个0
			if (arrayNum[1].length < point) {
				let po = '.'
				for (var i = 0; i < point - arrayNum[1].length; i++) {
					po = po + '0'
				}
				return value.toString() + po;
			}
			return value;
		}

		
		let tempVal = parseFloat(value).toFixed(point);
		let realVal = tempVal.substring(0, tempVal.length - 1);

		return realVal;
	},
	formatTimeSecond(value) {
		let seconds = new Date(value)
	}
};