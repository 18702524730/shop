var rootConfig = {
    path: '//cart.ipsebe.com',
    indexUrl: '//www.ipsebe.com',
    cartUrl:'//cart.ipsebe.com',
    czUrl: '//cz.ipsebe.com',
    userUrl: '//user.ipsebe.com',
    wxUrl:'//wechat.ipsebe.com',
    payUrl: '//iprp.ipsebe.com',
    spUrl: '//sp.ipsebe.com',
    toolsUrl: '//tools.ipsebe.com',
    trademarkUrl:'//market.ipsebe.com'
};
if (location.host.indexOf('localhost') === 0) {
	rootConfig = {
	    path: '//localhost:8083/portalsite-cnsebe',
	    indexUrl: '//localhost:8083',
	    cartUrl: '//localhost:8083/portalsite-cnsebe',
	    czUrl: '//localhost:8083/cz',
	    userUrl: '//localhost:8083/iprp_portal',
	    payUrl: '//localhost:8083/pay',
	    spUrl: '//localhost:9002',
	    wxUrl:'//localhost:8083',
	    toolsUrl: '//localhost:8083/tools',
        trademarkUrl:'//localhost:8082/premarket'
	};
}
if (location.host.indexOf('test') === 0) {
	rootConfig = {
        path: '//testcart.ipsebe.com',
        indexUrl: '//testwww.ipsebe.com',
        cartUrl:'//testcart.ipsebe.com',
        czUrl: '//testcz.ipsebe.com',
        userUrl: '//testuser.ipsebe.com',
        wxUrl:'//testwechat.ipsebe.com',
        payUrl: '//testiprp.ipsebe.com',
        spUrl: '//testsp.ipsebe.com',
        toolsUrl: '//testtools.ipsebe.com',
        trademarkUrl:'//testmarket.ipsebe.com'
    };
}
if (location.host.indexOf('pre') === 0) {
	rootConfig = {
        path: '//precart.ipsebe.com',
        indexUrl: '//prewww.ipsebe.com',
        cartUrl:'//precart.ipsebe.com',
        czUrl: '//precz.ipsebe.com',
        userUrl: '//preuser.ipsebe.com',
        wxUrl:'//prewechat.ipsebe.com',
        payUrl: '//preiprp.ipsebe.com',
        spUrl: '//presp.ipsebe.com',
        toolsUrl: '//pretools.ipsebe.com',
        trademarkUrl:'//premarket.ipsebe.com'
    };
}

window.CONFIG = rootConfig;


















































