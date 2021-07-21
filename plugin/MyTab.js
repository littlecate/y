(window["MyApplication"] = window["MyApplication"] || []).push([
    ["MyTab"], {
        "MyTab_start": function(A, e, t) {
            //t("MyTab_drawBackGroundImage");
        },
        "MyTab_drawBackGroundImage": function(A, e, t) {
            var tt = t("MyTab_getBackgroundImage");
            t.drawImage(tt, {
                "click": function(event, pos) {
                    alert("OK");
                },
                "mouseover": function(event, pos) {
                    console.log("xxxxxxxx");
                }
            });
        },
        "MyTab_getBackgroundImage": function(A, e, t) {
            var imageData = t("MyTab_getBackgroundImageData");
            var image = new Image();
            image.src = imageData;
            A.exports = image;
        },
        "MyTab_getBackgroundImageData": function(A, e, t) {
            A.exports = "data:image/gif;base64,R0lGODlhGAAYAPf/ANPFuahcCfi4KP7lS/a5KOltA4lJDrWBRv/8i/7pUfncm//2asqplf/89rZ4Uv3XPf3ZPvHu7OybFf3cQtulQ9mXIaJCBfzQNsmGGPaFANqGD//3bv/+z//+xbhXBP3SONjTzvjOnP/+q/eRB61wK/u+JtF4Cv/yX/mlFf/9kP7gRfV6AJ07APaNBchjBfTp4rJ8S/vBKf7lTtRqB//+s8dgBfaBAPW1KNxpA/mpGPq7KMOXfPvDKveWC+PGtKlbI/ifEMFcAv3eRumCAa9lD/mqGP7hSvidD69nPPrz5+W2Mf7cQ//1ZuOUFf/yYPfLZ/vPN/bGWPXCS9SADffCRe7DUvnEMfOdEufFQfW6M8J8FPq3Jcmqhu+0MPKlGeSmIuGhIfaKA8yMIrmJU7FzKspvB7d8Mvu7JriFSbl0SrdMAOuzcIczAP/rU10jAP/6e/zKMNfRzPu8Jfq0H/mvHP/9luDJf+Pf3NfSzd3Y1Orn5Pv6+tzX09qymvPesPzw1siQPv346/fIW+uFA/W3J/HIWN2cH//+/O3HU97Z1c2sg/79/OTg3enIkfe9KPzlr+65NuDDTIpMF+fQWOWmJvvhpcKKPruRZYI6A+rj3O2FAqxtJfq/K+DBRvbYmfO0JapjE65sFvayI+24S/zROvjKX///1/e8N/38/PedELNvGvmvHubi3+ro5fTy8fRxAOp/AfeUCfzGL8iwlv3bQvmjF+HAjN/a1vzKMvigEeuHBvaWDPvQOt94BMWebdq3oqdgD/FwAb13FOfe0OCgJJpGBOXDavGPCvqwHPzJMOjl4vR1AP7rU9KWM9ixa+yIB+aHDr2ALvCCBMCYZ/eVCveeD//pUfvGL/vJMPiWCvmvG/Ln4b1/LvmrGfmwG6dgELd2S/qvHMCXZ/3dQvBvAfzJMvmjGOG/jPvPOuB4BP7qU//qU7BcEqZPC+2SDsqfgN6JEcOIZMFmCeiVFLNtQvjx7duved20gdd1B9t1BMalkNGiXr13L7RqK////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAD/ACwAAAAAGAAYAAAI/wD/CRxIsKDBgwgTKvz3qBQVQlmkPFGwcGClU1bQkSp3jZOAG4X8LBREwMiSBxAefEhWwpsoSFUSRiEgY8kAa+sSDBh3IUa4VBIQHVRASIWKNk4WbFjgRJ2KCyWK9KjAz2AXKKHYRHqDIAWCN0zaTEg2Bwg+e+8Ievr0YEAnNmzs0BBR582JAR/kXAkSoh/BUY4mWFuAwA4bGB1EIFiQQAmbH2tC3NsxkBIPCMw2pKDBwRQHGikmwf1iIrI9ygLBxHgwGIGIDhwSk2CD5UGMeTOCECFo6MyHASfe1BExt+7dvChGrNBCsMIcOBMMuJku6av06ZiAtFgmjCAFLyUuHJtNuvREGyFQc/TIUIAbwUZNtMW4MGFAAmY6ecZAVq3Fihm+FCTGFTqUgM0HKKkERwnIADGCDQWYYdA5GlSzxRxnxMBDDHLMkUM1I2TwChHiHATIFNmsgkIO3eSAAhA9tGADOS6gkZAlJuhizggjDKJJGBmsgAMoYyykiCplpDOEP/7AgkMNJMxSkUBcHEBGAN9scsAlU3bpZZcBAQAh+QQFCAD/ACwRAAYABgAGAAAIJwD/Uftn4Z/Bai5+gft3RgILfywMIvHhzweSfx4oWvwHzwOLdv8CAgAh+QQJFAD/ACwDAAIAFAAUAAAIjAD/CRwokADBgwgF8vqHS1bChwfh/KMDUeA4gW2sEaSYUIjAEwNPtBmYY1dFhOMkAjnJUiCtihr/sejzr48DjCxZ+Pvnj0VLgTr99ZTTsoQHH/58ILHIUoMaFu0QgiSo4iC5aAI5XrSWceMRiBIR0smF0Na/r/+IHkQrcNrBHhWDVaz1E2GvugmBVQwIACH5BAUUAP8ALAAAAAAYABgAAAj/AP8JHEiwoMGDCBMq/PeoFBUCWaQ8UbBwYKVTVniRwiWLk4AbhfwsFETAyJIHEB58gFOCjihIVRJGISBj3ABrbawNGHchBp1UEhAdVEBIiIo2JxZsWHCijYoLJXLsImbMYBcoodhEeoMgBYI3TNqMgzMHyDEKBj89GNCJDRs7NETUeXNiwAc5KHRZ2FfQES1rCxDYYQOjgwgEC6wpYVPMxS92BXlAaLMhBQ0OpjjQSDHJ7RcJLPyxKBjjAWAEIjpwMEyCDZYHMeT18dfHAUE5HwaceFNHRNy5de+G9iea4Bw44wy4WS7pq/LlmIYXH+ilxIWjSZc2fRrVgw9/PpAQhGxCJ8YFmzh18vR5JJ8aFj8KirmiowScDyhVsqSTa4SNAmYYZIsGR2wxhxwx8BCDHHPkcMQIGbxCxDQHATJFD6ugkEM3OaAARA8t2BCMC2gkZIkJutQywgiDaBJGBivgAMoYCymiShm9DEEcLDjUQMIsFQnExQFkBADMJgdcEuSSTC4ZEAAh+QQJFAD/ACwRAAgABgALAAAIQQD//RsBzZnAf7GkNRPYjZoNDAJzPLOgRSAKF7/aCXTH4l/HIkH6/OvjwKO/kx1ZnPTXUY0Pfz7S/PPQjgW9fwEBACH5BAkUAP8ALAAAAAAYABgAAAh5AP8JHEiwoMGDCBMqXMiwocOHECNKnDhRDooR0JxNZFMslrRmE790o2YDw8QYOWKVrHhxhZaJmIC0WCZsYo4eGQpEm3ikxYoZviaOsFHADMUMr0BZoBjMxY9fDigeYOGPBUUHffz1iTeRqr+qXb+ClZjGhz8faf4FBAAh+QQFFAD/ACwAAAAAGAAYAAAI/wD/CRxIsKDBgwgTKvz3qBQVAlmkPFGwcGClU1Z4kcIli5OAG4X8LBREwMiSBxAefIBTgo4oSFUSRiEgY9wAa22sDRh3IQadVBIQHVRASIiKNicWbFhwoo2KCyVy7CJmzGAXKKHYRHqDIAWCN0zajIMzB8gxCgU9fXowoBMbNnZoiKjz5sSAD3JQjIDmjOAoR7SsLUBghw2MDiIQLLCmhE2xWNKaEaTEA0KbDSlocDDFgUaKSW+/dKNmAwNBMDEeCEYgogMHxCTYYHkQI0es0gQNyfkw4MSbOiLk0rWLV+8KLQQrzIEzzoCb55K+On+OCUiLZcIIUvBS4sLRpEubPo6N2iNDgWgEGzWhE+OCTZw6efo80mLFDF8FxVzRUQLOB5QqsURHLiPYUIAZBtmiwRFbzCFHDDzEIMccORwxQgavEDHNQYBM0cMqKOTQTQ4oANFDCzYE4wIaCVligi61jDDCIJqEkcEKOIAyxkKKqFJGL0P44w8sONRAwiwVCcTFAWQEAMwmB1yS5JRUThkQADs=";
        }
    },
    [
        ["MyTab_start"]
    ]
]);