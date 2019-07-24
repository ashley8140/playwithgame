import mutations from "./mutations";
import actions from "./actions"
const state = {
    assess_token:'',
    hasToken: false,
    showLoginBox: false,
    defaultkey: '', //首页第一个游戏英文缩写，大nav的找陪玩跳过去需要传这个参数，不能删
    userInfo: {},
    homeData: {},
    searchInfo: [],
    navList: [{
        "name": "充值",
        "link": "recharge"
    }, {
        "name": "申请入驻",
        "link": "service"
    }, {
        "name": "APP下载",
        "link": "appDownload"
    }, {
        "name": "消息",
        "link": "message"
    }],
    level: {
        "0": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAz1BMVEUAAAC1tbXGxsakpKSUlJS1tbW0tLSlpaWenp6jo6OioqKioqKioqKioqKhoaGqqqqoqKiqqqq0tLSioqK1tbWioqK0tLS0tLS0tLS0tLSioqLFxcWhoaG/v7+goKCioqK1tbWenp6zs7Otra21tbXS0tLc3Nzl5eW6urrZ2dmpqanNzc329vbs7Oz6+vrPz8/W1tazs7P5+fnDw8PAwMDe3t7JycnHx8ewsLD////o6OjLy8umpqbx8fHGxsaqqqq8vLytra319fXR0dG3t7cw38wSAAAAJHRSTlMAYJz9CKmXRCPw2dOqgWNTPBP29Onp6OXXxcWWk4R2cG4yKBl3p14iAAABe0lEQVQoz5WS6W7CMAyAs3UMdt/3vdmQNCVpt15Qbnj/Z5rdUBX4w/YpsmXJn1zLFUTrwF/hoCW2snc0ajOdTpmyo72tyrHUio1ulx2lJxGu8QMV141mabzlWmNplA5qnU+oMURGIWrqlfRiydY+fcK5X2itFRnOoaLwM+x8I/PdxxggGUIaBEaVjhCH8ofAzhLkSvqV0p3xkEDBUEFsUnbORdOLKC/aS3h65I0qpd0rAFIj6dGwPisNIc4G7FhnWDYGMVYKzlTZGgYALsAt7f/KTuyUmI0J1kp7CNJYSGoFBPHsc80GL+gD1koqzcgauTrl0l1mDJCVZwQY5/NamUvoJv0EwAZQ7fLg7v84hYVbfjq16BRFpNxsKMoghNiErLyLkovDHCwvn/sandJjAmo2QyBSE5gEiPvqd2rd5DEtnw8KXKKIQgI5FDjZEae7T1HxcRWFKvIyXMHCJlHjS9Q0vSzz9p92V3jZ2eDsQqxxOh6fin9ycvK3vl+KCWVYnVmaPQAAAABJRU5ErkJggg==',
        "1": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAABC1BMVEUAAADNcPfbkPy9TffDWfi/UPe+T/fNcPi7SvW5SfG1Sue7WM3Ocfe9TPa9S/a7TPbMcPfNcfi9TvbNcvfNcvjOcve9TPbNcfi9TfbNcve8TPbOcffakfy7TPbWh/nMcva7TPXNcfW9TfXMbPLMcPXMZvK8Q/LOcvjkpf/pvfzos//DW/jhoP7////z1//vzP7Rfvj57/7is/v89//YjPvRevnmtPzuyv7enP3ckv3gpPzmvPvMbfn25/7w1v7z3/3iqPzWh/valPrGYfnAUvflrP7puv3XiPrVivnKafnBVvj24//qwf7cn/rbl/rSfvrJavnPdPjNcPjIZvj9+v/pxfzTgPzSffvOc/n3Nd6eAAAAJ3RSTlMAYJzW/vzyl0IjCgXpgXNdPvbp5dfFxa2tqKellpOEbmVNMigZFBPNnEylAAABfUlEQVQoz5XR11bCQBCA4VGKIPbeu86SrBCJCYHQm9Kb7f2fxJkkQOAG/W8ye85+hzMsUNGw6ischaWtBzJxLpl0PpXA+lJy1pcmXU0nEmxM2c+Jud5w0sbxDnBbAylLLKh0PF6ScvBFFxXB1etCDhHfGWhIrcUAIkFLStlgwaZBB0vNCOXZMe22KCOWdA21wgs6BiBgvFKlpFedT4Y6IZ0PgYiFAqb0IhFuByKhHH2NuJdBh1zN/RVO7yBqehdT3ZRHTgG2ayMasq7I0jiqlcWUFIqItnN5QjZ4/xYNZZfwv9P6FjNi0RrFTz9BoC6DNJgsTBqCP2JGMpi3Nb3iJ7tMYicqYo9JD1FtCh8x0M7befSTQ/f9j6pouMtXq9IjDUVRsrx73p4j1+D0FBhjlpcfqyRc4kRvWNQ1PzmIgVt0r1mm5ZstS3gplEUCNRbT19+/h0l34Zxp8oP4kkNc7PwBZkVClUpo7WLV19XKQrePMNe2Wr2Bf7a5CX/qF9fKb7GrZmaeAAAAAElFTkSuQmCC',
        "2": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAABDlBMVEUAAADNcPfbkPy9TffDWfi/UPe+T/fNcPi7SvW5SfG1Sue7WM29TPa9S/a7TPbMcPfNcfjOcve9TvbOcffNcvfNcvjOcve9TPbNcfi9TfbNcve8TPbOcffakfy7TPbWh/nMcva7TPXNcfW9TfXMbPLMcPXMZvK8Q/LOcvjkpf/pvfzos//////DW/jhoP7VivnRfvjz1//vzP789//YjPv25/7alfr57/7w1/7mvPvWh/rRefnuyv7z3/3Kafnjqv3bkf3mtPzhpvvTfvvGYfnOcPjAUvffnf3pxfzLbfnBVvj24//mrP/iov/qwf7el/7ouvzms/vis/vcnvvfqfrMbvjIZvj9+v/quf/Se/rkigZFAAAAKHRSTlMAYJzW/vzyl0IjCgWBc10+9unp6OXXxcWtrainpZaThG5lTTIoGRQT2ZWVKAAAAZdJREFUKM+VkedWwkAQRlcpgth772WWmN1ITJcgRRDsUtT3fxFnNkFAf6D3JGdncr6b3TnLkGxaHyKdZWOZTtzkiUJBLXZieqyyXRVljF5fXpJTFtUmH+EK+ixuzCtjNhSiRAZync+XhAirGNQ48fDABWYlvZKsqRxjmWRDCPFCBjkv2DT0G65dKOf+nvsAHdOQluNYkhzGEp9XSKkQU6Iu0PvK0/sjxlyXHrizAJlnmVQX1yAfE2DTrUe7EOYTgGG2DbMD8OaQssXYXP0Wi0pkVLC8rfv8W3GLAJ6Dcejvskzzt9DxI8VHo1XlA6VtGlC8A8IzbSAYspfE4pWMMhZJ4APlGSzPUFHDdSJjgZTcpg5gk4If9ZAPKQF4lkfnkY5rgGItuv/1GgTR8LXaY6x8aJomaHbLw2CxKKVU0gFTnCd6UKHhe7rgsaKQGDYNEqlz0FjNsYjsUujj8GHrmcdoSEPSEOrfksBq5YT1OU43X8tNvJAhBPxi55QNyKRsOzW1OznE/sQPjs7YCHN67ZD9k5mZv+W+AHDic3ChJes3AAAAAElFTkSuQmCC',
        "3": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAABEVBMVEUAAADNcPfbkPy/UPfNcPi5SfHIYPS7WM2/UPe9TPe9TffOcfe9S/bEXPa7SvWzTebNcfi9TvfOcve9TvbOcffNcvfNcvjOcve9TPbNcfi9Tfa8TPbakfy7TPbWh/m9TPW8TffMcva7TPW7TPS7TffNcfXLcPa9TfXMbPK5RujOcvjkpf/pvfzos//DWvjhoP7Rfvj////vzP7z1//57/789//YjPvVivn25/7mvPvRevnmtPzcn/vWh/rz3/3hpvzMbfnKafnlq/7bkf3gqfvclvvZlPrOcPjEXfjAUvfv1/3uyv3puv3fnf3pxfzSffvHYvnBVvj24//qwf7u0f3is/vPdPjIZvj9+v/fmf7TgPwrpmCAAAAAKnRSTlMAYJz8lyMVBfDZ06dzRT8K9vTp6ejl18XFra2nlpOEg35uZWFaTTsyKAvjaP69AAABoUlEQVQoz5WS6VbiQBBGawYRl1Fnn3Hft2qSjpBIFgIEAQFBwF3f/0GsLwFB/6j3nHRVn1M3qeo0CekZc4KZNL3L8dxZFuRycajPLb2rrPZ0ACOfhxPoXkW94pRH/FxeIPAt0rqczV7kBXGqWkdPUmgoUK0qfcdcYHkKlqxTGaJFs6u17ogBLjqy6ZpnyjiJnasrFTLXHKvg2rZdhEM0658KtdyQKna+OVKuH5SUtdtcumS+dFk4oMVURaKfHeLLptJKvgKca2bLKVqu9HZrQ5kn2mudS1JOjLKk561QvSg3JWYvLrUa7RvE35h/IE6YKKEYg54aK0XHQlNCCbMAEtZNSQIYgSQmq7FSZ9eznAYLaAxn9h1KZqXJXIdSZ25GakLx2XM9V7pCdeEEh/2PwNL/PvvJ8P2+HiodwzA0Znc9rLKIK2xTzPTsPZcx/L0JI1YAXlty0E7RsW0Hs/zNUEL6VxTK8NHgUQE4QheNWGIg1GpI/hzRiMMflSDADxmDq/KW+Wkas5BqNFJTa18n2Pjyhn0IE+w2mzv0SbY26UM8A8PGeVIB9rEoAAAAAElFTkSuQmCC',
        "4": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAA8FBMVEUAAAD0Oor3V5v0HXvxI3nkHGj1Hnv1O4v1OovzMIX0LID1H3z2O4z0HHr0G3j2O4z0Hnv2O4z2PIz1Hnv1HXr0HXr2O4v1HXn1TZf0HHn0Hnv2Oov1HHn0HXn0HHr1PIv1GnroF3T2PIz4aqf5erH4ZaT1J4D8zN7+6/L6ibr6kr//9vn3UZn6qcf6ncD5g7T3Yp73UJX2OYv////94ev3WJ33Tpf3SJP3QpD2Noj1I375d6/5dK34c6f4W5/2M4f8zN38wtj5j7f5hbf4ga/4YKL2L4X1IHz93ur91+T7udP6pcf5cqv4ban2QI/7tc6EDMZEAAAAInRSTlMAYJzWJAny6Jc+FfurgUX26dfFxa2npZOEdnBuZWFaTTILf951OwAAAYJJREFUKM+V0tlWwjAUheEoCOI8z+NOEwO1SLEDZQYZnH3/t/Ec2i6qXqj/TZOLbyWnK4LKF3SmQl782nXOt7hy2eL83NKvZD9UbRaVCpu2CuvyS7dIK66VZuIkUkpa1kOFIvOmVBRmhUK2ZbpCSY+VUi0S3INFm7H25fOzpF4epQzgmg6AmhnOjBC5xi0ly0lvvGtoeXPDpGVXFeAYgJxdBVcSG6t1+r5bSQ3a1Kc+E+5xEAJPDoD+h4nJmhAXTTYqFopFM5ApebFd1OwOndRHQoo0/zGbICYBi1AmhG82hOMBHa+WEgjqUNPilUWbFhpyTrqDPjwHrjdCSjYFt0emy6RLIpIZ0hjZI7pb1TbG2MZhsjMjS7sTvMfDTyYqIXeUAjzvif8wZRyXyamYtZLrQfHwPc2CyT03oLnvh+DSi22nzym/1Qto+F5zLONafEjH5QOQxBsU54/2qhC9tqNp9+tT+dHBipi3ser70+XFbEcL37okkO1c6zPxz9bXxZ/6BOs6ZBPd/XqWAAAAAElFTkSuQmCC',
        "5": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAA6lBMVEUAAAD0Oor3V5viHmv0HXvxI3n1H3z1HnvzMIX0LID1O4z2O4z1Oov0HHr1HHn0G3j1J3/2O4z0Hnv1O4v2O4z2PIz1Hnv1O4v1HXr0HXr1PIv1HXn1TZf0HHn0Hnv2Oov0HHr1PIv1Gnr2PIz4aqf5erH1J4D8zN74ZaT6ibr+6/L6kr/5hLX4ZqX3Yp73UZn3UJX/9vn91+T8wtf5j7f2OYv////94ev6qcf5c633WJ33Tpf1In33SJP3QpD2Noj4ga/5d6/4c6j4W5/2M4f4YKL2L4X93ur8zN37udP7tc76pcf6nMD2QI9JtK/eAAAAI3RSTlMAYJwI1iT88j4V6aeWgWNF+/bp5dfFxa2tp5qThHZwblpNMpCnSFEAAAGHSURBVCjPldLXdoJAEIDhTazpvffMsllRiBSlidi77/86mWH1SJILk+8G9pz9DzsAQ4WSyCgV2Fa5fKiRSkUjYT63NbmLZUBFtUpNIOMG/+YT1vZvyow8J1JyTatVETZcyiTOFhKy7vEI5dOhlLKLBalpuBiKkE+nHM3HnEdQ13uujmxAh4zl25+IV1Y4rdqCf3xQ0rUWEsDXwXdM06wDKbOTYgOvS22ljYtGK6SEjJ0YwPbBcWDtgLHXFjWGKoy0iPg6mVt1MK0eOLan2yaQfZz/iZpIJREVMU8TdTIXfA8fNOmZM12djKEHgTcBFQHeCOCbpO9MwPMB0s26C+iMkVts+pT0sUiMTWK0O1bHwv2uSckC0JX6/tcjWKrhRyMqKKkhA8Dz6N3aM8ywRS8stZcfgEHDD4TkKmkSB8Bv0nFMT9etDqDLHFMK54MIhx+IIVe6NdSr025IdVxawMXmp30vJUGQtPo8w4BfDvbYxkkxDIuHu1mPOz+8YZB1LMQx+6ejI/YnX9hLZqnDKNoDAAAAAElFTkSuQmCC',
        "6": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAA6lBMVEUAAAD0Oor3V5vxI3nkHGj1HnvzJn/0LID0H3z1O4z0HXr0HXv1HXr1Oov0HHr1HHn1LYL0KoP1J3/2O4z0Hnv1O4v2O4z2PIz1Hnv1O4v2O4z2O4v1PIv3V5v1HXn1TZf0HHn0Hnv2Oov0HHroF3T2PIz4aqf5erH4ZaT1J4D8zN7+6/L6ibr6kr//9vn6qcf5hLX3UJX3UZn4Wp74c6f3QZD2OYv1IX3////94ev3Tpf91+T6ncD5j7f3SJP2Noj8wtf4ga/5d6/5dK33Yp72M4f4YKL2L4X93ur7udP6pcf5cqz4ban3V5zkTbszAAAAJXRSTlMAYJwkCflAFfDp2dOqloFjSjb79unl18XFrailmpaThHZwbloLvHJYKQAAAY1JREFUKM+V0tl2gjAQgOG0Vrvv+75OSIgSKaAFFdx33/91OhP0iO2F7X8h5Bw+zBzCsNyOzLSTY2v72J9ZVLFoLt7+1lpyEIsOiVKJTEfEFb7SJyzavS0Y8ZoIwS2rXMLQTIVI4qwQYHK7QD3gFgpnfSFEGwVVtnDRlx4fjTg2HnIegat80I6jWmQOGdsLPjFenDelVSC5bRNpO3UBoBX4yne145I5ZYV8Ba+BNS/ARaU6I0INmzFATYOtAaAO1B1j71UyIhXCiIgvyBjf3HV8ULqmauk0uzj/C5koJRGJmBuS7qwBOgRQYd1vKhcohj1JvJmQ6OCNBL4kXtOGUCOhjakGifP0y6DxiHgoEp4hQctp0dRhnYgZ5tqQrZsBBOnwg4GYkzIm8OGwBgAafxposTdm2t7rgaDhe5IEkS+qiQ9/me3YSjnmu1wtjlPuohfh8D3Z52ntMubTa7tg8hvmPy6Xh/Y0n0w6SdVbPSq/ut9my07ynlc9fNzM9LzxoxME2Y6lPGb/7OiI/alvnT9qtE03paQAAAAASUVORK5CYII=',
        "7": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAA81BMVEUAAAD/cDL/hFD/Uw7/XRv/XRj/cDT/aCn/ZCj/XRj/cDX/WhT/WhT/WhP/WhP/WRL/cTX/WxX/cDT/cTT/cTT/WxX/cDT/WhX/cDT/WhT/cTX/WhX/fkf/WhP/WRT/bzP/WxT/cTX/VxT/cTX/lGf/oHf/YyD/j1//spH/8u7/+Pb/vKf/q4f/bS//w67/gk3/fUv/Xhn/7+v/kmP/hlL/fkf/dTv/5+H/qIP/m3D/spr/iFX/aCj/ZSP/qI3/pYH/nn7/jVz/cDP/39b/1sv/lW//eUD/7OX/5t3/zr//xbT/nnX/lmn/iV7/4Nf/0cL/tJhf4lqCAAAAI3RSTlMAYJwIJPKXPhX76dnTc2NF9unl18XFra2op6WThIN+blpNMhM80MAAAAF8SURBVCjPlZLZVsIwEECjgrjv+64TG2gIULpAS4vssqr//zXONHBa9AG9L5k5Z2460wxDMlkjRTbDVrKx57wSxWJ8OHsbK5XrgfCxtJ7P1/HwxUDxJcqwYOcix4h9JQSPjdiZCqHctCEgzSa2kIvaQogJGeRMMGkbDpdDTryXuAsge7JKNMlhbNcrI7w4Z0qZZ/BSgROfwzaW1WQ/CAJpkgI5drit8PRe53iYKMtZKF9mA6BlzgAJakBcMfZkdTCwtWFj2LFcToruTAKMu0B0pf4HND85rlZcMgY8USReXQ0A6FsViGHIrYGBT4aPgQE8URoVs9/UtaOeNo4YcRkBNEjBxiNlJ4rtQXfcGwFSMVtaOdPvfx6Cp4cPQ5snigPQrOpa7FDzyGK2dkOwafjQEFwrZgH5oNt1bU1q43SxTplj5eLwymrzOW9Iv0Id6aln2jhJlvYlq3xfWY3lVfnFzRZLONx2HGtzPc3d2g+eUUhzEEUH7J883LM/8Q0F4GZoqPaHZwAAAABJRU5ErkJggg==',
        "8": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAA+VBMVEUAAAD/cDL/hFD/Uw7/XRv/XRj/cDT/aCn/ZCj/XRj/WhT/WhT/cDT/bzP/WRP/WhP/WRL/YyH/cTX/WxX/cTT/cTT/WxX/cDT/WhX/WhT/cTX/hVD/WhX/fkf/WxP/WRT/bzP/WxT/cTX/VxT/cTX/lGf/oHf/YyD/j1//spH/+Pb/8u7/7+v/q4f/w67/gk3/5+D/4Nb/vKj/iV7/Xhn/z8D/fUv/fkf/dTv/ZiX/qIP/m3D/lW//spr/nn7/kWP/iFX/bS//pYH/jVz/hlP/ayz/1sv/xbT/qI3/hVH/eUD/czf/bjH/7OX/nnX/lmn/////vKP/tJhVHOPFAAAAJHRSTlMAYJwIJPLoPhX72dOnloFjRfv26dfFxa2tp5qWk4R2cG5aTTI59uEXAAABk0lEQVQoz5XS6XLaMBSGYbVAyZ503/dPsaKIxPsSG7ALJEBI0vb+L6bnyDC4/Eny/JE1w2tzNBKk3XEaOm1xr9bu7Jj1enYZ77buTd7PVU4/vTg5uaAlV/OF/M85Vp697Qr2tVJK2sI2d0pVSbNQ17ACsA/0F7rPR0qpWy64uaXNyBnLP65kN2cyAfxL+Oa38UH2hdhJz4nsLd3xLnXk2alkkTsC4PpTUwQDPQDpiqPtBa3p8VJKm0U4WyV/dQkMdBBFXPZB9oT4HoIM62IIEiaSE+vGB648FGYQ9HVgz4Dm/8JNUicJF3O5TnwXMPR2TxsdwRLkk0MPORc5PTjXcp2UsS6mOkbkxQg8H+SFYO8yoOSkBLJKNpIU3tVlVH8I9EXyWrDWmwxpPXyWDRvJDJgaPijOqAb5JqytnQmGPPzEUbJO9CnxgFjzuwPXGOPx+K9W16n9cpLQ8JNwJJd+kSIGNTFY0S/sea0v7c9OledVWG5clU17W2LtaHs8Dvc/Pm34/GTDDwqaDrPsUDzSwYF4kH90ZmrteBd0GgAAAABJRU5ErkJggg==',
    },
    base64: {
        zs: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAqCAMAAADGZPh1AAABXFBMVEUAAACL3+SP4ua+7fCo6ey/7vG/7vGY5OmK4OaZ5ei+6+++7Owwws6V4+eX5OlP0NcyxtC77fC97PC+7vE7ydOz6+667fCI4OWL4eWM4eVV0dik5+u/6/GV5Oi/7fCt6u6/7vGN4ea/7vKz7O+y6+6m6euf5uqW5Okvxc677u657fC77PCY5egyxs+r6ewyx88yx8+Y5Om97fCS4+aQ4ucyxs+b5uqs6u1g1NuS4ui+7vAuxc0txswuv8h/3uOZ5em07O+36/C36/Axx9C97vC47O+h5+sxxs+F3uS97PC87fC97vG97e8yxs0iu8yH3+Wh5uvo+fqE4OSl6OuW4+ni+PnL8PKp6Oyd5OiM4uWt6e1w2N6J3+Q4yNGn6eq+7e+36u6t5uu/7vEyx9CZ5emK4OaV5Oi07O9/3uOq6e3////8/v/Z9vfF8PO37fCc5urr+vvk+PnR8/VGzNWe2R89AAAAYnRSTlMAyMvyzvr27+rpTjcV9/Le02pC/ffz8O/u5NTKW/Py7uvr6Ojhz87ONy379/f28/Hr5eTj3tza0M/MeEItHP378Ovo5uHb08m0iGNZPSQP/fnz8/Lx8O7p4trTysfHiHFKMpJQxnwAAAHfSURBVEjHxc5nUxpBAMbxFRBBExIlgSSYoiIkaooxUUxVY4uaHnvfPeQO7H7/GR+O4dnZZRjhjf5fXJm73zwrrr2Pd24fsLGQfl7f/llHvFTahAoFmnf31ByNJRQMBQyFUnO3asVzCBqIcv1Vge7SULxWigaCZgSCxhY0EDQUNFroNu9rks4pZphPb5Qu5z6k6fvrPrJMrbjIuS5NXxIvpqHQrbgIhsI07z8L9OOb0o0Uj2kg/L6YxhJrpWLJq5iJiUhF1Jr5lmqBmT/Fcssz2UAgkMWFbbXo5sV+UFY7P/XJYeHEcdp6Im1OtWGpe/ZCiA5tZC8Odox/IPJ5bTZMYZiBgeKRg6IQNByhMMzs4UlZPADQZswWaCnMmd8UNFGKYIdgXTT9vmA9YY5Q2GZwCIIdnJUSUVvQtMpKKV/QHCVDtmDtFfN29VfeKPK01/8QXhI6bSBeeeMmyXowEF2CGQbC+2eIpOfBUNgtTkN45sy4VzbTFHYLwSdo6n8sFnuMcBtOBFFiT9StOy5RxmEpiVrbha7WSDRJMTRIUb9OYyZFcZWZ4gjFlWaWI/FF0UC7UqZ98TUh492ioT5IOeqPUDRi0v4IRUMGMxm5IJroO2YmO5sRMKMZiObagbjJLgEZOmctWHCF9wAAAABJRU5ErkJggg==',
        ax: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAqCAMAAADGZPh1AAABd1BMVEUAAADwVzZVAAD9hW75hG70bFHwalPgVTj/TjD/RSX/Rij+WDr/TS7/SCf5YkrpUzzbSTr9iXL9gGj+ZEn+eF7/Siz+aEz+dFv9hm//RCX+cVf9gmr+XUH8gmz/QSH/UDP/Ryj8fWX9XD//SCr7e2L8hnD/QiT9hm/7bFP7f2j/Siv/PSD5cFX3ZU3/UjT9f2j+a0/9h3H/UjP+dl3/Syz/SCj+blX+Wz/8iXL8fGT+d1/+aE3+XED8h2//RCT9bVT8inX/Siv9X0H9a1P9aEz8YEL8hm7/RCb8ZUn8gGr8a0//SSr/RSb/Ryj/Sy39g2v/SSr9iXL/QSH/TzH/TS/9gWn/QyP9hW/9fWX9emL9hm/9hG39f2f/RCT9h3H9inT+Zkv9gGj9fGT+YUX+ZEn+VDf/UTP+d17+bVL+Vjn9h3D+dFv+a1D+XkL+XED+Wz7+WDv+blT+aU7+aE3+c1n+Y0f+eWD+dl3+cVj+cFb/UzX/Uzb+cVdi9v7BAAAATHRSTlMADgHyKxULBvvx7MlsJhsIBPvq6eXi3dza2NXT0MTBuaOdmoeCgXx0Qzk1MCof+vn06tvNzMu8u7i1tKyrqqihl5SJfmxlYV5bUlFJ56eUlAAAAj5JREFUSMfF01d7EkEYhuEBQg0G0nuvxsTee680aYvUVYIQJGJQCUZ/vO8UZ3ZZrgRP9Dn+7uudg13yz3M9vzflGL40vz5AROdWF3wh7/T9F7aeILDuyNbrxeJbdBMIYCGdThcKhVAo5N0IWMXAlJbNZkGYGd602zfScUFo02e6xVmHpsH8mSmVHi7F45QIEQ57t7s2HLkcM5KU4kgJ5DPtBGdzCIQZQcwj6FrQQDaj0ag0iphFLOZXwj0SlUbMKKJEbNwtySsAo1HEKNAbSZZTKY64wQwnfEQAFHkkyWwKKVMXBCNKAEQiVyW5AIFMhhMpAJBPkvdIGTyNEz6iBJIknzchNiOIACKPJCN5JBQ3jDChQDKZHJdkPs/jSBiMMCHv0aIkaxkkGUVaHSQkQFLml2QnI2MKSCvGC2EAdZ9IJDxDRHYrY4oqLR7m9wnVkvFv+WAtYclj+vqX35lqV486enO/8vP4o6FVYsw5ps7b1erRp05NP2h+2a9UwI45vOwiprbEOe4BvnUOG3r5MwwQFGXnt0lXa21+DwDxo9bSvx/ACATmJ93Zb7N7ACoOGyBlYZhaIdZcVwDoBBW1xld9DwSGo8Ug6ZFzEoALQZhhaNBGejY0xgUdaYHgZcJIYWl3EuIXhCBipjmnhHVnhgqMSELNoJOckHMGgo4wws0NFzkx23VGIPQ9PnPXTU7J/QBCkfJjOzk1+xMjeUb66vXFliCjW6TPdiY4mdslfWe7Q8lKgPxF9qejEy/J/+w3xlePSk5CJxsAAAAASUVORK5CYII=',
        hg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAMAAACknt2MAAAAqFBMVEUAAAD/2i//8UL/yCH/0yz/8EH/1y7/3TH/8kL/8EL/7zv/yyT/8UL/zif/8UL/8UL/zib/8UL/0Cj/1Cv/8kL/8UH/8UL/8UL/3jP/2zT/2y7/5jP/8UL/8UL/1Sz/8UP/1Cv/8UL/8UL/1i7/0Cj/8UP/1Sz/8UL/3zT/8kP/1iz/8kL/3zP/8kH/8EP/8kH/2i3/8kT/80D/8UL/xB//2zD/xiD/3TMdX4axAAAAM3RSTlMAV3D+rzCrQyUgD/n49u/q6uTj1cCijX1kJxgK+trXz8/OycO9uJ6Tj4aEdG9iVE4+PCync3DaAAAAvklEQVQoz3XO1xKCMBCF4UUNIPYKiL33tgHe/82EExDE4b9J+WY2oVyncEMltf1qGY39bRldfJ1+etsmISsa6BLSBtd46fAqmce+XBJqSLza4wWO9WZEgYF9V1F91LvH64gjkv1o5+nVvkEw5p1JgkHSIaclpUaqGXPTHibUmgcS49CBEUg1SOnxR+eUrGmBggmlDQvUpW+VAukZmQV6Utatgo41tKdclhDiJYShITdPndxAfDBrrShU1PBw+QFibShsugl1JQAAAABJRU5ErkJggg==',
        super: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAMAAACknt2MAAABBVBMVEUAAAD5tBz50xj/wAD/wAD/wAD/vwT/uBXtRSr/tibsRCr/vwDxyAb/qSfrRCv/wADrRCrwyAbrRCjrRCj/zg//tBDtRiryyQbyyQbsRSv/wQH/vwHyaSn9pyfsRirsRSr/2CD/qSj/1yD/qin/uhz70xj7sh75wBr/2CD9sA7/qij0hif0cSn/wAD/vwD/1x//1h//1SD/qin/1iH/pyj/vwD/vQDhPB7fQCD/qgD/qin/2CHtRivyyQf8nij/wADvUivxXyrwWCr1dl/5hir4gCr3lyX5pyT9t6j2hHD0d1PwXUX0fUHzdj3tSSvtSCv3fCr1dCr0bCr1hyf0fyf3myX9xSJYfkS3AAAAOnRSTlMAuLj62dSkDe3IhHh1a2VcWFVLMhII+fn49vLy6+fm5d3Z1M/KtLOqqKelpaONi3NqSEU+OigjERAGFE7RzgAAAONJREFUKM9tz9V2wzAMgGFtgXZlWMfMzGhrdZLSqAzv/yiNorh08t9YPt+NBDPZhg3RvSql3qKpZCrzE6JbPYlFQzFzvXuTKcJi74k9xEa5irif+ABd0spCIY6IniwLx3/jBchaSSJDWTmkGj5VgylnKoPodsteo/9A+iR6NG5ebt8B9Sjrbsury4BEx2l7NfEU7iy5UbPiElL6igOm/+8fdFkOIeyC6bfyhw7TlaZ7pj4idpnSmp4lN9ypCe5FU0yGrYiwEuiOFugYJj2cLgedLwWdpaeU+povNaX8+pxs5IEaA+iyO5duaxYtAAAAAElFTkSuQmCC',
        zk: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABACAMAAAB4KUSAAAAAV1BMVEUAAAD/Sy7/Sy3/Syz/Sy3/TC3/Sy7/SS3/Siv/SS3/Syv/Sy3/Sy3/TC7/////2dX/iXv/rqX/bVn/9vX/xL7/o5j/fGv/7Ov/lor/4+D/XUb/z8r/ubLtp4tzAAAADXRSTlMA8MlA0cC4UEg2WLBVq/1YSgAAAUZJREFUSMft1stuwjAQhWEXQoC2OeNrnADv/5wdY1EjaBWPF8CCfxOB5pNtEqSoj8bU0NgbSmAw4a85Oy1BAt2p0cyAlUE9GXJI+VoYiGZcir5+qwY5R6eQtimBJmidPwhh7e0glPRDYDBcREwXW6DwjE+BN9EDoDnnAZ+uoQJqf3U7NKDrzjgR0AJTbhxOcDWw/GO5GPLSlXA8OpwZj8lgUnO8zDv42q1iNvZ3oQNgpL/qZXxqggawTfCIOIhhPqJvgoGP2AQJbhDDPOybIAG2Hh60HSYkOKUF66EFd35gIpwVwMElRwd+bB1rARy11jYPX39LNL7kO8Abvijstp+dHDJTHFMZXDHLfXcCuNqpq7ZdBSxsiapFlulqAW7W6p92N1Tdszqqqlih97Bnttx6cwP7veIkVBUmo6owAe0ZfjGTt+9/AOb+pHum7T8rAAAAAElFTkSuQmCC',
        female: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAsVBMVEUAAAD/Rin/Sy3/Sy3/Sy3/TC3/TCz/QiH/Mxr/JQD/Sy7/Sy3/Sy3/Sy3/Syz/Sy7/Sy7/Sy3/Sy3/Sy7/Sy3/Ryv/TC3/Sy3/TC7/TC7/////4Nr/emP/X0T/497/08z/sKP/nIv/c1v/UjX/+fj/opP/kX//alH/TjD/8O7/7uv/5uH/vbL/gWv/7+z/2NH/19D/zcX/zMT/x77/taj/rJ7/lYP/k4H/kH7/WT7/VzsI6o/CAAAAGXRSTlMAGvi98dGEDwoD/OXBfHbfyceTi2Yk26moZDrhiQAAAMtJREFUGNNtkNcWgkAMRFdEsWCvySLSQRR7//8Pc5MVfPE+JXMmJ8kIZtYcdY1uvV8TJa1xBzRGs62lWgPAieMiI7VusasBqzUq3JRFck4glJh7ty1uViT21aQBCco3QHhCjzTTEj2AHSbUOHgAYips0h5aO7K2FANQs+5Lza71LAyFqToX91ePdxBz8n1viQJwUvbZQAS+X+SXM8aqXtBegs0y4L10H+NHrpQZ30d/MM49SyNfFT39b8kz4H91Lj9s639+Vc5mp8r5A4AWHgcFDPjiAAAAAElFTkSuQmCC',
        male: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAmVBMVEUAAAARev8jgv8igv8ig/8igv8ig/8jgv8igv8ig/8ggP8hff8Yef8jg/8jgv8igv8jgv8hgv8igf8jg/////8lhP9ImP8siP/4+//u9f/j7/+Kvf96tf9co//z+P+s0P+Vw/9WoP8+kv/o8v/m8f/f7f/a6v/M4/+52P+w0/91sv9PnP81jv/T5v/R5f+92v+eyf9rrP9lqP+mm3zdAAAAE3RSTlMACPvIw4/mzoF3IB4V+vnt5ZGQcBXW/wAAANhJREFUGNM1kFeSgzAQREU0YOOw0xIZA85h4/0Pt6Jl94dq5lVrkqKWabhdb8N0qd7yolyc8shzaLV4kaIRWazoChyZhgqdSDA7I5LxG+VXaY0S2fI+2W/dTIdrbSM/U4lQWktzeJadDRMVOmTMs2rldrNxoOIZdUegr7Q8Rpts1Nq+pkR9Alpxom+PvUiLviDasN4Jxr4X/JEF7HvGg273OeF8P7hqKWqMwvm4x9TjMnzirGf28dq3qwAcDat577sU9+HOrrzL7Nz54uTv6KKyNIzzOEwzZv/Doxf+CvtQUwAAAABJRU5ErkJggg==',
        last: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAZlBMVEUAAAD29vb29vb19fX29vb29vb19fX19fX19fX19fX19fXz8/Py8vLOzs719fXz8/P09PT29vb19fX29vb19fX19fX29vb29vb29vb29vb09PT29vaZmZnGxsbY2Nibm5vo6OjIyMjAnQ4gAAAAG3RSTlMA8/yPGvfvz8y3dycTBZRYFnFO22lmcFDZ2FsA4/eaAAABHklEQVRIx6WW2W6EMAxFrwmEhH2G2T3d/v8ni4pUREOGXPU8RseCCHxtBAy98XdbFPbuTT9gh+bgdIU7NIiTG9EA6fKI3laim0jVbvl1qVHKOvSPVl8g17/+OdOXZOe1f9JdTqv3yXSX7Lj4tWgC8nvzttQkyhYzlSZSzX4umojM37zTZDpMNIVu8/YVHBUNgEvMf358BocXAC7qv2uAAwbCn8jRU74+YChfDfym/4z46jFSvo4QylcB5U+A9AsIV2Axco8Y4blLeBilKgx6pSoeGLhfIwccU+F+GoioOCwtGqsIWxRdeot2S8wkhYDkdJDxUTlTWyKMqbjnBwo/shauxFBkx+4y2ItIH1ctuTr8ezkJ15+bzTJ721x/vgF5bbv3UNRHYwAAAABJRU5ErkJggg==',
        next: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAflBMVEUAAAD29vb29vb19fX29vb29vb19fX19fX19fX29vby8vL19fX09PTz8/P09PTLy8v29vb29vb29vb19fX19fX19fXz8/Py8vL29vb19fX19fX19fX09PTV1dX29vaZmZny8vKkpKTu7u7s7OyoqKiwsLCsrKzo6Oja2tq1tbVdc6NpAAAAHnRSTlMA8/mPGvbvz8xPE5R1WBYEcdvZt2lmKSVwuLZ6WwYgjMbVAAABO0lEQVRIx52W2XLCMAxFr+1sZCUESNhEIUDb///BMpNOabBFLM77mVEi60qwKAvTLCKto0VjihITpPOERiTzFDyBUWQRZgHcVLkiJyqv4KCNiSVew2IW0QvUDE+sNL1ErzBiSZMsR/XoaUH/q2qtyAP19+VVTF7EFQZy8iT/7a/yFdTQ84wsPhgjw500pGe+Tp9uIUwBdGTxfeSMDkDiqOjKGQlQErmN3mkEKMhp3BhjD0OccTmTjUFDbs4Xp7FFTbxxs40afJv7u2F1UIF4+tPxahkgmaGhZEKEWlZSjUb20VsY2W81KGSN26OUPY0ASCSPLwHQSZ73/DGi1gCxI4rMf0SzR8zYIcDHDHLfmMnfjUq0EXmgWmncSxeKdGVJl6J87docdiGT2buD/HR4/zhxnj+b4fzZuM6fHxaG0YNZ9/20AAAAAElFTkSuQmCC'
        
    },
    v_level: {
        0: null,
        1: ['ax'],
        2: ['ax', 'ax'],
        3: ['ax', 'ax', 'ax'],
        4: ['ax', 'ax', 'ax', 'ax'],
        5: ['ax', 'ax', 'ax', 'ax', 'ax'],
        6: ['zs'],
        7: ['zs', 'zs'],
        8: ['zs', 'zs', 'zs'],
        9: ['zs', 'zs', 'zs', 'zs'],
        10: ['zs', 'zs', 'zs', 'zs', 'zs'],
        11: ['hg'],
        12: ['hg', 'hg'],
        13: ['hg', 'hg', 'hg'],
        14: ['hg', 'hg', 'hg', 'hg'],
        15: ['hg', 'hg', 'hg', 'hg', 'hg'],
        16: ['super']
    },
    /* end */
    hunterUserCenterNav: [{
        name: "订单中心",
        link: "/userCenter/order"
    }, {
        name: "领取工资",
        link: "/userCenter/getMoney"
    }, {
        name: "我的相册",
        link: "/userCenter/album"
    }, {
        name: "自我推广",
        link: "/userCenter/popularize"
    }, {
        name: "服务管理",
        link: "/userCenter/service"
    }, {
        name: "我的钱包",
        link: "/userCenter/purse"
    }, {
        name: "编辑资料",
        link: "/userCenter/editInfo"
    }, {
        name: "我的礼物",
        link: "/userCenter/gift"
    }, {
        name: "关注/粉丝",
        link: "/userCenter/fans"
    }],
    UserCenterNav: [{
        name: "订单中心",
        link: "/userCenter/order"
    }, {
        name: "成为陪玩",
        link: "/userCenter/service"
    }, {
        name: "我的钱包",
        link: "/userCenter/purse"
    }, {
        name: "编辑资料",
        link: "/userCenter/editInfo"
    }, {
        name: "我的礼物",
        link: "/userCenter/gift"
    }, {
        name: "关注/粉丝",
        link: "/userCenter/fans"
    }, ],

}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
