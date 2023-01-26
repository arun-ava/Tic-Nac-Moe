import { environment } from "src/environments/environment";

export function facebookSDKInitializer() {
    return () => new Promise(res => {
        // wait for facebook sdk to initialize before starting the angular app
        window['fbAsyncInit'] = function () { //TODO: How does this work
            FB.init({
                appId: environment.facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            (js as any).src = "https://connect.facebook.net/en_US/sdk.js";
            (fjs as any).parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    

        res(undefined); //TODO - IS this resolve working asynchronously or resolving only after fb sdk is loaded?
    });
}