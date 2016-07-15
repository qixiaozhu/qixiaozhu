/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	(function() {
	    var isProduction = location.hostname == 'www.zero.frontend.ucloudadmin.com' ? 0 : 1,
	        linkToOLApi = 1,
	        // baseUrl = isProduction ? '' : 'http://api.pre.ucloud.cn',
	        //baseUrl = (isProduction||linkToOLApi) ? '/api/' : '/apitest/',
	        baseUrl = (isProduction||linkToOLApi) ? '//api.ucloud.cn/':'//api.pre.ucloudadmin.com/',
	        page = 1;
	    // base mixin
	    var baseMixin = {
	        getUrlParam: function (name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if (r != null) return unescape(r[2]); return null;
	        },
	        confirm: function (msg) {
	            this.setState({
	                confirmMsg: msg
	            });
	        },
	        baseAjax: function (action, data, success, error) {
	            return $.ajax({
	                url: baseUrl + '?Action=' + action,
	                data: data,
	                cache: false,
	                xhrFields: {
	                    withCredentials: true
	                },
	                crossDomain: true,
	                success: function(data) {
	                    if (data.RetCode == 0) {
	                        success && success(data);
	                    } else {
	                        error && error(data);
	                    };
	                }.bind(this),
	                error: function(xhr, status, err) {
	                    error && error(xhr, status, err);
	                    console && console.error(xhr, status, err.toString());
	                }.bind(this)
	            });
	        },
	        getFilterListDataMap: function (filterListData) {
	            var filterListDataMap = {};
	            (function () {
	                for (var i = 0; i < filterListData.length; i++) {
	                    filterListDataMap[filterListData[i].TypeId] = filterListData[i].TypeDesc;
	                };
	            }.bind(this))();
	            return filterListDataMap;
	        },
	        defaultAjaxErrorHandle: function (error) {
	            this.confirm('页面部分内容加载出错!');
	        },
	        goUmarketList: function () {
	            location.href = isProduction ?  '/site/umarket/list.html' : '/umarket/list.html';
	        },
	        goUmarketDetail: function (appId) {
	            location.href = isProduction ? '/site/umarket/detail.html?appId=' + data.AppId : '/umarket/detail.html?appId=' + data.AppId;
	        },
	        goUmarketConsole: function (appId) {
	            location.href = (isProduction ? 'https://consolev3.ucloud.cn/umarket' : 'http://console-open.zero.frontend.ucloudadmin.com/umarket') + (baseMixin.getUrlParam('isPreviewMode') != null ? '?isPreviewMode=' + baseMixin.getUrlParam('isPreviewMode') : '');
	        },
	        goLogin: function () {
	            window.location.href = (isProduction||linkToOLApi) ? 'https://account.ucloud.cn/cas/login?service=' + encodeURIComponent(location.href) : 'https://account.pre.ucloudadmin.com/cas/login?service=' + encodeURIComponent(location.href) ;
	        },
	        goHomePage: function () {
	            window.location.href = 'http://www.ucloud.cn';
	        },
	        getTimeString: function (timestamp) {
	            var t = new Date(timestamp);
	            return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
	        }
	    };
	    // confirm 组件
	    var ReactConfirm = React.createClass({displayName: "ReactConfirm",
	        getInitialState: function() {
	            return {
	                message: this.props.message
	            };
	        },
	        componentWillReceiveProps: function(props) {
	            if (this.state.message !== props.message) {
	                this.setState({
	                    message: props.message
	                });
	            };
	        },
	        onDismiss: function () {
	            this.setState({
	                message: null
	            });
	        },
	        onReload: function () {
	            location.reload();
	        },
	        render: function() {
	            if(this.state.message == null) {
	                return null;
	            } else {
	                return (
	                    React.createElement("div", {className: "modal-laywer"}, 
	                        React.createElement("div", {className: "web-modal small"}, 
	                            React.createElement("div", {className: "authorize-logo"}, 
	                                React.createElement("div", {className: "fail-red"}), 
	                                React.createElement("p", null, this.state.message)
	                            ), 
	                            React.createElement("div", {className: "modal-footer"}, 
	                                React.createElement("button", {className: "button cancle", onClick: this.onDismiss}, "取消"), 
	                                React.createElement("button", {className: "button submit", onClick: this.onReload}, "重试")
	                            )
	                        )
	                    )
	                );
	            };
	        }
	    });
	    var ReactConfirmHomePage = React.createClass({displayName: "ReactConfirmHomePage",
	        mixins: [baseMixin],
	        getInitialState: function() {
	            return {
	                message: this.props.message
	            };
	        },
	        componentWillReceiveProps: function(props) {
	            if (this.state.message !== props.message) {
	                this.setState({
	                    message: props.message
	                });
	            };
	        },
	        onDismiss: function () {
	            this.goUmarketList();
	        },
	        onReload: function () {
	            location.reload();
	        },
	        render: function() {
	            if(this.state.message == null) {
	                return null;
	            } else {
	                return (
	                    React.createElement("div", {className: "modal-laywer"}, 
	                        React.createElement("div", {className: "web-modal small"}, 
	                            React.createElement("div", {className: "authorize-logo"}, 
	                                React.createElement("div", {className: "fail-red"}), 
	                                React.createElement("p", null, this.state.message)
	                            ), 
	                            React.createElement("div", {className: "modal-footer"}, 
	                                React.createElement("button", {className: "button cancle", onClick: this.onDismiss}, "取消"), 
	                                React.createElement("button", {className: "button submit", onClick: this.onReload}, "重试")
	                            )
	                        )
	                    )
	                );
	            };
	        }
	    });
	    // detail页面
	    var UmarketDetail = React.createClass({displayName: "UmarketDetail",
	        mixins: [baseMixin],
	        getInitialState: function() {
	            return {
	                appData: {},
	                cooInfo: {},
	                loaded: 0,
	                confirmState: 0,
	                confirmMsg: null,
	                similarAppInfo: [],
	                installed: 0,
	                btnState: 1, //0 loading 1 点击加载 3 加载失败
	                filterListData: [{
	                    TypeId: '-1',
	                    TypeDesc: '全部'
	                }, {
	                    TypeId: '1',
	                    TypeDesc: '应用服务'
	                }, {
	                    TypeId: '2',
	                    TypeDesc: '系统环境'
	                }, {
	                    TypeId: '3',
	                    TypeDesc: '数据备份'
	                }, {
	                    TypeId: '4',
	                    TypeDesc: '性能监控'
	                }, {
	                    TypeId: '5',
	                    TypeDesc: '安全管理'
	                }/*, {
	                    TypeId: '6',
	                    TypeDesc: '网络存储'
	                }*/]
	            };
	        },
	        componentDidMount: function () {
	            this.loadTypeList();
	            this.loadAppData(function () {
	                this.loadCooperatorInfo();
	                this.state.appData.SimilarAppId.trim().length && this.loadSimilarAppInfo();
	            }.bind(this));
	            this.updateAppVisitOrUseCount();
	        },
	        loadTypeList: function () {
	            this._loadTypeListAjax(function (data) {
	                data.TypeSet = [{
	                    TypeId: -1,
	                    TypeName: "ALL",
	                    TypeDesc: "全部"
	                }].concat(data.TypeSet);
	                this.setState({
	                    filterListData: data.TypeSet
	                });
	            }.bind(this), this.defaultAjaxErrorHandle);
	        },
	        loadAppData: function (success) {
	            this._loadAppListAjax(function (data) {
	                if (data.RetCode == 0) {
	                    if(data.AppSet && data.AppSet.length > 0) {
	                        this.setState({
	                            appData: data.AppSet[0],
	                            loaded: 1
	                        });
	                        success && success();
	                    } else {
	                        this.setState({
	                            confirmHomeMsg: '该应用不存在!'
	                        });
	                    }
	                } else {
	                    alert(data.Message);
	                }
	            }.bind(this), this.defaultAjaxErrorHandle);
	        },
	        getAppInstallStatus: function () {
	            this._getAppInstallStatusAjax(function (data) {
	                if(data.Status == 'YES') {
	                    this.setState({
	                        installed: 1
	                    });
	                } else {
	                    this.setState({
	                        installed: 0
	                    });
	                };
	            }.bind(this), this.defaultAjaxErrorHandle);
	        },
	        loadCooperatorInfo: function () {
	            this._loadCooperatorInfoAjax(function (data) {
	                this.setState({
	                    cooInfo: data.CooInfo || {}
	                });
	            }.bind(this), this.defaultAjaxErrorHandle);
	        },
	        updateAppVisitOrUseCount: function () {
	            this._updateAppVisitOrUseCount();
	        },
	        loadSimilarAppInfo: function () {
	            this._loadSimilarAppInfoAjax(function (data) {
	                this.setState({
	                    similarAppInfo: (data.AppSet&&data.AppSet.length) ? data.AppSet : []
	                });
	            }.bind(this), this.defaultAjaxErrorHandle);
	        },
	        setAuthoConfirmState: function (authoConfirmState) {
	            this.setState({
	                confirmState: authoConfirmState
	            });
	            if (authoConfirmState=='2') {
	                this._authoAjax(function (data) {
	                    this.setState({
	                        confirmState: 3
	                    });
	                }.bind(this), function (data) {
	                    this.setState({
	                        confirmState: 4
	                    });
	                }.bind(this));
	            };
	        },
	        installHandle: function () {
	            if (!this.state.btnState) {
	                return;
	            };
	            this.setState({
	                btnState: 0
	            });
	            this._getUserLoginStatusAjax(function (data) {
	                if(data.RetCode == 0) {
	                    this._getAppInstallStatusAjax(function (data) {
	                        if(data.Status == 'NO') {
	                            this.setAuthoConfirmState(1);
	                        } else {
	                            this.goUmarketConsole(this.props.appId);
	                        };
	                        this.setState({
	                            btnState: 1
	                        });
	                    }.bind(this), function () {
	                        this.setState({
	                            btnState: 2
	                        });
	                    }.bind(this));
	                } else {
	                    this.goLogin();
	                }
	            }.bind(this), function (data) {
	                if(data.RetCode) {
	                    this.goLogin();
	                } else {
	                    this.setState({
	                        btnState: 2
	                    });
	                }
	            }.bind(this));
	        },
	        // ajaxs
	        _loadTypeListAjax: function (success, error) {
	            return this.baseAjax('GetAppTypeList', {}, success, error);
	        },
	        _loadAppListAjax: function (success, error) {
	            var request = {
	                'AppId.0': this.props.appId,
	            }, url = 'GetAppList';
	            if(baseMixin.getUrlParam('isPreviewMode') != null) {
	                request.IsPreviewMode = baseMixin.getUrlParam('isPreviewMode');
	                url = 'DevGetPreview';
	            }
	            return this.baseAjax(url, request, success, error);
	        },
	        _loadCooperatorInfoAjax: function (success, error) {
	            return this.baseAjax('GetCooperatorInfo', {
	                CooId: this.state.appData.CooId
	            }, success, error);
	        },
	        _loadSimilarAppInfoAjax: function (success, error) {
	            var data = {};
	            for (var i = 0; i < this.state.appData.SimilarAppId.split(',').length; i++) {
	                data['AppId.' + i] = this.state.appData.SimilarAppId.split(',')[i].trim();
	            };
	            return this.baseAjax('GetAppList', data, success, error);
	        },
	        _updateAppVisitOrUseCount: function (success, error) {
	            return this.baseAjax('UpdateAppVisitOrUseCount', {
	                AppId: this.props.appId,
	                Type: 'VISIT',
	            }, success, error);
	        },
	        _getAppInstallStatusAjax: function (success, error) {
	            return this.baseAjax('GetAppInstallStatus', {
	                'AppId': this.props.appId
	            }, success, error);
	        },
	        _getUserLoginStatusAjax: function (success, error) {
	            return this.baseAjax('GetUserInfo', {}, success, error);
	        },
	        _authoAjax: function (success, error) {
	            return this.baseAjax('InstallApp', {
	                'AppId': this.props.appId
	            }, success, error);
	        },
	        _slideNext: function () {
	            var i = 2; //每版放2个图片
	            var content = $(".content");
	            var content_list = $(".content-list");
	            var v_width = content.width();
	            var len = content.find("li").length;
	            var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
	            if( !content_list.is(":animated") ){    //判断“内容展示区域”是否正在处于动画
	                if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
	                    content_list.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
	                    page = 1;
	                }else{
	                    content_list.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
	                    page++;
	                }
	            }
	        },
	        _slidePre: function () {
	            var i = 2; //每版放2个图片
	            var content = $(".content");
	            var content_list = $(".content-list");
	            var v_width = content.width();
	            var len = content.find("li").length;
	            var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
	            if( !content_list.is(":animated") ){    //判断“内容展示区域”是否正在处于动画
	                if( page == 1 ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
	                    content_list.animate({ left : '-='+v_width*(page_count-1) }, "slow");
	                    page = page_count;
	                }else{
	                    content_list.animate({ left : '+='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
	                    page--;
	                }
	            }
	        },
	        render: function() {
	            var data = this.state.appData,
	                cooInfo = this.state.cooInfo,
	                hidden = {display: 'none'},
	                map = {
	                    'MIRROR': '镜像',
	                    'WEB': 'WEB应用',
	                    'DOWNLOAD': '下载'
	                },
	                filterListDataMap = this.getFilterListDataMap(this.state.filterListData);
	            if(!this.state.loaded) {
	                return (
	                    React.createElement("div", null, 
	                        React.createElement(ReactConfirm, {message: this.state.confirmMsg}), 
	                        React.createElement(ReactConfirmHomePage, {message: this.state.confirmHomeMsg})
	                    )
	                );
	            } else {
	                return (
	                    React.createElement("div", {className: "main index-padding"}, 
	                        React.createElement("div", {className: "appliance-left"}, 
	                            React.createElement("div", {className: "appliance-name"}, 
	                                React.createElement("img", {src: data.AppThumbUrl}), 
	                                React.createElement("ul", {className: "appliance-des"}, 
	                                    React.createElement("li", {className: "title1"}, data.AppName), 
	                                    React.createElement("li", {className: "title2"}, "(", data.AppSubName, ")"), 
	                                    React.createElement("li", null, React.createElement("a", {href: cooInfo.CooUrl, target: "_blank", style: cooInfo.CooName ? {} : hidden}, "供应商：", cooInfo.CooName))
	                                )
	                            ), 
	                            React.createElement("button", {className: "button appliance-use", onClick: this.installHandle}, (function () {
	                                    switch(this.state.btnState) {
	                                        case 0:
	                                            return React.createElement("i", {className: "btn-loading"});
	                                        case 1:
	                                            return '立即使用';
	                                        case 2:
	                                            return '加载失败';
	                                    };
	                                }.bind(this))()), 
	                            React.createElement("div", {className: "clear"}), 
	                            React.createElement("div", {className: "appshow-wrap"}, 
	                                React.createElement("a", {className: "left", style: data.AppPictureUrl.split(',').length > 2 ? {} : hidden}, React.createElement("i", {className: "pre", onClick: this._slidePre})), 
	                                React.createElement("a", {className: "right", style: data.AppPictureUrl.split(',').length > 2 ? {} : hidden}, React.createElement("i", {className: "next", onClick: this._slideNext})), 
	                                React.createElement("div", {className: "content"}, 
	                                    React.createElement("ul", {className: "content-list"}, 
	                                        data.AppPictureUrl.split(',').map(function (url, i) {
	                                            return (
	                                                React.createElement("li", {key: i}, React.createElement("img", {src: url}))
	                                            );
	                                        })
	                                    )
	                                )
	                            ), 
	                            React.createElement("div", {className: "clear"}), 
	                            React.createElement("div", {className: "app-infor-title"}, "应用详情"), 
	                            React.createElement("div", {className: "app-infor-text", dangerouslySetInnerHTML: {
	                                __html: data.AppDetail
	                            }}), 
	                            React.createElement("div", {className: "app-infor-title"}, "使用说明"), 
	                            React.createElement("div", {className: "app-infor-text", dangerouslySetInnerHTML: {
	                                __html: data.AppGuide
	                            }})
	                        ), 
	                        React.createElement("div", {className: "appliance-right"}, 
	                            React.createElement("div", {className: "title"}, "基本信息"), 
	                            React.createElement("ul", {className: "right-list"}, 
	                                React.createElement("li", null, "版本号 : ", data.AppVersion), 
	                                React.createElement("li", null, "更新时间 : ", this.getTimeString(data.Updated*1000)), 
	                                React.createElement("li", null, "交付方式 : ", map[data.DeliveryType]), 
	                                React.createElement("li", {className: "border-blue-top"}, "应用类型 : ", React.createElement("p", null, 
	                                    data.AppType.split(',').map(function (type, i, arr) {
	                                        return React.createElement("a", {key: i, href: isProduction ? '/site/umarket/list.html?appType=' + type.trim() : '/umarket/list.html?appType=' + type.trim()}, filterListDataMap[type.trim()], i < arr.length - 1 ? '、' : '')
	                                    })
	                                )), 
	                                React.createElement("li", {className: "border-blue-top"}, "需求：", React.createElement("p", null, data.AppOperation)), 
	                                React.createElement("li", {className: "border-blue-top", style: data.AppIntegration ? {} : hidden}, "集成软件：", React.createElement("p", null, data.AppIntegration))
	                            ), 
	                            cooInfo.CooName ?  [React.createElement("div", {className: "title"}, "售后服务"), React.createElement("ul", {className: "right-list"}, 
	                                React.createElement("li", {style: cooInfo.CooQQ ? {} : hidden}, "QQ : ", cooInfo.CooQQ), 
	                                React.createElement("li", {style: cooInfo.CooEmail ? {} : hidden}, "邮箱 : ", React.createElement("a", {href: 'mailTo:'+cooInfo.CooEmail}, cooInfo.CooEmail)), 
	                                React.createElement("li", {style: cooInfo.CooPhone ? {} : hidden}, "电话 : ", cooInfo.CooPhone), 
	                                React.createElement("li", {className: "border-blue-top"}, "时间段：", React.createElement("p", null, cooInfo.CooServiceTime))
	                            )] : null, 
	                            this.state.similarAppInfo.length ? [React.createElement("div", {className: "title"}, "相关应用"), React.createElement("ul", {className: "right-list"}, 
	                                this.state.similarAppInfo.map(function (info, i) {
	                                    return (
	                                        React.createElement("li", {key: i}, React.createElement("a", {href: isProduction ? "/site/umarket/detail.html?appId=" + info.AppId : "/umarket/detail.html?appId=" + info.AppId}, React.createElement("img", {src: info.AppThumbUrl})))
	                                    );
	                                })
	                            )] : null
	                        ), 
	                        React.createElement(UmarketDetailAuthoConfirm, {title: this.state.appData.AppName, titleUrl: this.state.cooInfo.CooUrl, confirmState: this.state.confirmState, setConfirmState: this.setAuthoConfirmState}), 
	                        React.createElement(ReactConfirm, {message: this.state.confirmMsg}), 
	                        React.createElement(ReactConfirmHomePage, {message: this.state.confirmHomeMsg})
	                    )
	                );
	            }
	        }
	    });
	    var UmarketDetailAuthoConfirm = React.createClass({displayName: "UmarketDetailAuthoConfirm",
	        mixins: [baseMixin],
	        setConfirmState: function (confirmState) {
	            this.props.setConfirmState(confirmState);
	        },
	        render: function() {
	            switch(this.props.confirmState+'') {
	                case '0': {
	                    return null;
	                }
	                case '1': {
	                    return (
	                        React.createElement("div", {className: "modal-laywer"}, 
	                            React.createElement("div", {className: "web-modal"}, 
	                                React.createElement("div", {className: "authorize-title"}, 
	                                    React.createElement("p", null, React.createElement("a", {href: this.props.titleUrl, target: "_blank"}, this.props.title)), 
	                                    React.createElement("p", null, "申请获得以下权限")
	                                ), 
	                                React.createElement("ul", {className: "author-list"}, 
	                                    React.createElement("li", null, React.createElement("i", {className: "kuang"}, "√"), "查看我的用户资料，如用户名、手机、公司等"), 
	                                    React.createElement("li", null, React.createElement("i", {className: "kuang"}, "√"), "已阅读并同意", React.createElement("a", {href: "http://help2img.ufile.ucloud.com.cn/UCloud-U%E5%B8%82%E5%9C%BA%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf", target: "_blank"}, " 《使用须知》"))
	                                ), 
	                                React.createElement("div", {className: "modal-footer"}, 
	                                    React.createElement("button", {className: "button cancle", onClick: function () {
	                                        this.setConfirmState(0);
	                                    }.bind(this)}, "取消"), 
	                                    React.createElement("button", {className: "button submit", onClick: function () {
	                                        this.setConfirmState(2);
	                                    }.bind(this)}, "授权")
	                                )
	                            )
	                        )
	                    );
	                    break;
	                }
	                case '2': {
	                    return (
	                        React.createElement("div", {className: "modal-laywer"}, 
	                            React.createElement("div", {className: "web-modal small"}, 
	                                React.createElement("div", {className: "authorize-logo ing"}, 
	                                    React.createElement("img", {src: "/static/style/images/umk/umk.gif"}), 
	                                    React.createElement("p", null, "授权中...")
	                                )
	                            )
	                        )
	                    );
	                    break;
	                }
	                case '3': {
	                    return (
	                        React.createElement("div", {className: "modal-laywer"}, 
	                            React.createElement("div", {className: "web-modal small"}, 
	                                React.createElement("div", {className: "authorize-logo"}, 
	                                    React.createElement("div", {className: "succes-green"}), 
	                                    React.createElement("p", null, "授权成功")
	                                ), 
	                                React.createElement("div", {className: "modal-footer"}, 
	                                    React.createElement("button", {className: "button cancle", onClick: function () {
	                                        this.setConfirmState(0);
	                                    }.bind(this)}, "接着逛U市场"), 
	                                    React.createElement("button", {className: "button submit", onClick: function () {
	                                        this.goUmarketConsole(this.props.appId);
	                                    }.bind(this)}, "立即使用")
	                                )
	                            )
	                        )
	                    );
	                    break;
	                }
	                case '4': {
	                    return (
	                        React.createElement("div", {className: "modal-laywer"}, 
	                            React.createElement("div", {className: "web-modal small"}, 
	                                React.createElement("div", {className: "authorize-logo"}, 
	                                    React.createElement("div", {className: "fail-red"}), 
	                                    React.createElement("p", null, "授权失败")
	                                ), 
	                                React.createElement("div", {className: "modal-footer"}, 
	                                    React.createElement("button", {className: "button cancle", onClick: function () {
	                                        this.setConfirmState(0);
	                                    }.bind(this)}, "取消"), 
	                                    React.createElement("button", {className: "button submit", onClick: function () {
	                                        this.setConfirmState(2);
	                                    }.bind(this)}, "重试")
	                                )
	                            )
	                        )
	                    );
	                    break;
	                }
	                default: {
	                    return null;
	                }
	            }
	        }
	    });
	    $('.reactDetailContainer').length && React.render(React.createElement(UmarketDetail, {appId: baseMixin.getUrlParam('appId')}), $('.reactDetailContainer')[0]);

	    // list页面
	    var UmarketList = React.createClass({displayName: "UmarketList",
	        mixins: [baseMixin],
	        getInitialState: function () {
	            return {
	                listData: [],
	                total: 1,
	                loadBtnState: 'LOADENABLE', // LOADENABLE, LOADDISABLE, LOADING
	                appType: this.getUrlParam('appType') || '-1',
	                filterListData: [{
	                    TypeId: '-1',
	                    TypeDesc: '全部'
	                }, {
	                    TypeId: '1',
	                    TypeDesc: '应用服务'
	                }, {
	                    TypeId: '2',
	                    TypeDesc: '系统环境'
	                }, {
	                    TypeId: '3',
	                    TypeDesc: '数据备份'
	                }, {
	                    TypeId: '4',
	                    TypeDesc: '性能监控'
	                }, {
	                    TypeId: '5',
	                    TypeDesc: '安全管理'
	                }/*, {
	                    TypeId: '6',
	                    TypeDesc: '网络存储'
	                }*/],
	                confirmMsg: null
	            };
	        },
	        componentDidMount: function () {
	            this.loadTypeList();
	            this.reload();
	        },
	        onTabSwitch: function (appType) {
	            if(appType!=this.state.appType) {
	                this.setState({
	                    appType: appType
	                });
	                this.state.appType = appType;
	                this.reload();
	            };
	        },
	        reload: function () {
	            this.setState({
	                listData: [],
	                total: 1,
	                loadBtnState: 'LOADING'
	            });
	            this.state.total = 1;
	            this.state.listData = [];
	            this.state.loadBtnState = 'LOADING';
	            this._loadAppListAjax(function (data) {
	                this.setState({
	                    listData: data.TotalCount == 0 ? [] : data.AppSet,
	                    total: data.TotalCount
	                });
	                this.setState({
	                    loadBtnState: 'LOADENABLE'
	                });
	            }.bind(this), function (xhr, status, err) {
	                if(status=='abort') {
	                    return;
	                }
	                this.defaultAjaxErrorHandle();
	            }.bind(this));
	        },
	        load: function() {
	            if(this.state.loadBtnState == 'LOADENABLE') {
	                this.setState({
	                    loadBtnState: 'LOADING'
	                });
	                this._loadAppListAjax(function (data) {
	                    if(data.AppSet&&data.AppSet.length>0) {
	                        this.setState({
	                            listData: this.state.listData.concat(data.AppSet),
	                            total: data.TotalCount
	                        });
	                    };
	                    this.setState({
	                        loadBtnState: 'LOADENABLE'
	                    });
	                }.bind(this), function (xhr, status, err) {
	                    if(status=='abort') {
	                        return;
	                    }
	                    this.defaultAjaxErrorHandle();
	                }.bind(this));
	            };
	        },
	        loadTypeList: function () {
	            this._loadTypeListAjax(function (data) {
	                data.TypeSet = [{
	                    TypeId: -1,
	                    TypeName: "ALL",
	                    TypeDesc: "全部"
	                }].concat(data.TypeSet);
	                this.setState({
	                    filterListData: data.TypeSet
	                });
	            }.bind(this), this.defaultAjaxErrorHandle);
	        },
	        _loadAppListAjax: function (success, error) {
	            this.appAjax && this.appAjax.abort();
	            this.appAjax = this.baseAjax('GetAppList', {
	                AppType: this.state.appType != '-1' ? this.state.appType : undefined,
	                Limit: this.props.pageLimit,
	                Offset: this.state.listData.length
	            }, function (data) {
	                this.appAjax = null;
	                success && success(data);
	            }.bind(this), function (xhr, status, err) {
	                this.appAjax = null;
	                error && error(xhr, status, err);
	            }.bind(this));
	        },
	        _loadTypeListAjax: function (success, error) {
	            this.baseAjax('GetAppTypeList', {}, success, error);
	        },
	        render: function() {
	            var state = this.state;
	            return (
	                React.createElement("div", {className: "main index-padding"}, 
	                    React.createElement("div", {className: "appliance-title"}, "应用类别"), 
	                    React.createElement(UmarketListFilterBar, {filterListData: state.filterListData, appType: state.appType, onTabSwitch: this.onTabSwitch}), 
	                    React.createElement(UmarketListAppList, {onListLoad: this.onListLoad, onListLoadEnd: this.ononListLoadEnd, appType: state.appType, filterListData: state.filterListData, data: state.listData, total: state.total}), 
	                    React.createElement(UmarketListLoadBtn, {enable: state.total!=0&&state.total>state.listData.length, load: this.load, loadBtnState: state.loadBtnState}), 
	                    React.createElement(ReactConfirm, {message: this.state.confirmMsg})
	                )
	            );
	        }
	    });
	    var UmarketListFilterBar = React.createClass({displayName: "UmarketListFilterBar",
	        tabSwitch: function (e) {
	            this.props.onTabSwitch(e.currentTarget.attributes['data-id'].value);
	        },
	        render: function () {
	            var self = this,
	                createItem = function (data, i) {
	                    return (
	                        React.createElement("li", {"data-id": data.TypeId, key: i, onClick: self.tabSwitch, className: self.props.appType == data.TypeId ? 'active' : ''}, 
	                            React.createElement("a", {className: "appliance-btn button"}, data.TypeDesc)
	                        )
	                    );
	                };
	            return (
	                React.createElement("ul", {className: "appliance-type"}, 
	                    this.props.filterListData.map(createItem)
	                )
	            );
	        }
	    });
	    var UmarketListAppList = React.createClass({displayName: "UmarketListAppList",
	        mixins: [baseMixin],
	        render: function () {
	            if(this.props.data.length==0&&this.props.total==0) {
	                return (
	                    React.createElement("div", {className: "appliance-content"}, 
	                        React.createElement("div", {className: "no-result"}, 
	                            React.createElement("h4", null, "没有查到符合条件的应用"), 
	                            React.createElement("p", null, "请尝试更换筛选条件，或反馈您希望使用的应用，我们将尽快上线。", React.createElement("a", {href: "https://accountv2.ucloud.cn/work_ticket", target: "_blank"}, "提交工单"))
	                        )
	                    )
	                );
	            } else {
	                var filterListDataMap = this.getFilterListDataMap(this.props.filterListData);
	                var createItem = function (data, i) {
	                    return (
	                        React.createElement(UmarketListAppDiv, {key: i, data: data, filterListDataMap: filterListDataMap})
	                    );
	                };
	                return (
	                    React.createElement("div", {className: "appliance-content"}, 
	                        React.createElement("div", {className: "appliance-wear"}, 
	                            this.props.data.map(createItem)
	                        )
	                    )
	                );
	            };
	        }
	    });
	    var UmarketListAppDiv = React.createClass({displayName: "UmarketListAppDiv",
	        render: function() {
	            var data = this.props.data,
	                filterListDataMap = this.props.filterListDataMap;
	            return (
	                React.createElement("a", {className: "appliance-list", target: "_blank", href: isProduction ? "/site/umarket/detail.html?appId=" + data.AppId : "/umarket/detail.html?appId=" + data.AppId}, 
	                    React.createElement("div", {className: "appliance-logo"}, 
	                        React.createElement("img", {src: data.AppThumbUrl})
	                    ), 
	                    React.createElement("ul", {className: "appliance-des"}, 
	                        React.createElement("li", {className: "title1"}, data.AppName), 
	                        React.createElement("li", {className: "title2"}, "(", data.AppSubName, ")"), 
	                        React.createElement("li", {className: "appliance-tag"}, data.AppType.split(',').map(function(appType) {
	                            return filterListDataMap[appType.trim()];
	                        }).join('／')), 
	                        React.createElement("li", {className: "appliance-text"}, data.AppDesc)
	                    )
	                )
	            );
	        }
	    });
	    var UmarketListLoadBtn = React.createClass({displayName: "UmarketListLoadBtn",
	        render: function () {
	            if(this.props.loadBtnState == 'LOADENABLE' && this.props.enable) {
	                return (
	                    React.createElement("div", {className: "button moring clear", onClick: this.props.load}, 
	                        "点击加载"
	                    )
	                );
	            } else if(this.props.loadBtnState == 'LOADING') {
	                return (
	                    React.createElement("div", {className: "more-loading"}, 
	                        React.createElement("div", {className: "umk-loading dib vm"}), 
	                        "加载中..."
	                    )
	                );
	            } else {
	                return null;
	            };
	        }
	    });
	    $('.reactListContainer').length && React.render(React.createElement(UmarketList, {pageLimit: "9"}), $('.reactListContainer')[0]);
	})();


/***/ }
/******/ ]);