
// 对函数进行 节流
export function throttle(fn, interval = 500) {
    let timer = null;
    let firstTime = true;

    return function (...args) {
        if (firstTime) {
            // 第一次加载
            fn.apply(this, args);
            return firstTime = false;
        }
        if (timer) {
            // 定时器正在执行中，跳过
            return;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, args);
        }, interval);
    };
}
//解析链接
export function parseLink(that) {
    let obj = {};
    let path = that.$route.hash;
    let arr = path.split('&');
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i].split('=')[0]] = arr[i].split('=')[1]
    }
    return obj['#access_token']
}

//校验手机号
export function validateMobilePhone(value) {
    if (value === '') {
        // Toast('手机号不可为空');
        return false;
    } else {
        if (value !== '') {
            var reg = /^1[3456789]\d{9}$/;
            if (!reg.test(value)) {
                // Toast('请输入有效的手机号码');
                return false;
            }
        }
        return true;
    }
};

export function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
    };

}
//校验短信验证码
export function validateMessageCode(val) {
    if (val === "") {
        // Toast('验证码不可为空');
        return false;
    } else {
        if (val !== "") {
            var reg = /^[0-9a-zA-Z]+$/;
            if (!reg.test(val)) {
                // Toast('请输入有效的验证码');
                return false;
            }
            return true;
        }
    }
}
//获取地址栏参数
export function getinfo(name) {
    let tstr = window.location.href;
    let index = tstr.indexOf("?");
    let str = ""
    str = tstr.substring(index + 1);
    if (str.indexOf("#") > -1) {
        str = str.split("#")[0];
    }
    let arr = str.split("&");
    let result = {};
    arr.forEach(item => {
        let a = item.split("=");
        result[a[0]] = a[1];
    });
    return result[name] ? result[name] : "";
}

//判断是否是微信浏览器的函数
export function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


/**
 * 全局方法 搜索高亮
 */
export function brightenKeyword(val, keyword) {
    val = val + '';
    if (val.indexOf(keyword) !== -1 && keyword !== '') {
      return val.replace(keyword, '<font color="#FF7834">' + keyword + '</font>')
    } else {
      return val
    }
}
