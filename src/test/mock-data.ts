import {PlacesAPIResultItem, PlacesDetailAPIResponse} from "@/schema/placesApi";

export const mockPlace1 : PlacesAPIResultItem = {
    "fsq_id": "531fb9f5498e91cfd7bde06f",
    "categories": [
        {
            "id": 13236,
            "name": "Italian Restaurant",
        }
    ],
    "geocodes": {
        "main": {
            "latitude": 35.665772,
            "longitude": 139.739432
        }
    },
    "name": "Place 1",
    "price": 2,
    "rating": 5.0,
    distance: 0,
    link: "",
}

export const mockPlace2 : PlacesAPIResultItem = {
    "fsq_id": "531fb9f5498e91cfd7bde06f",
    "categories": [
        {
            "id": 13383,
            "name": "Steakhouse",
        }
    ],
    "geocodes": {
        "main": {
            "latitude": 35.665772,
            "longitude": 139.739432
        }
    },
    "name": "Place 2",
    "price": 4,
    "rating": 8.5,
    distance: 0,
    link: "",
}


export const mockPlaceDetails : PlacesDetailAPIResponse = {
    "fsq_id": "531fb9f5498e91cfd7bde06f",
    "categories": [
        {
            "id": 13236,
            "name": "Italian Restaurant",
        },
        {
            "id": 13383,
            "name": "Steakhouse",
        }
    ],
    "geocodes": {
        "main": {
            "latitude": 35.665772,
            "longitude": 139.739432
        }
    },
    "hours": {
        "display": "Mon 11:00-24:00; Tue-Sun 0:00-2:00",
        "open_now": true
    },
    "location": {
        "formatted_address": "六本木1丁目4-5 (アークヒルズサウスタワー 2F), 港区, 東京都, 106-0032",
    },
    "name": "Place details 1",
    "photos": [
        {
            "id": "579c51bc498e8263b8030e82",
            "created_at": "2016-07-30T07:05:32.000Z",
            "prefix": "https://fastly.4sqi.net/img/general/",
            "suffix": "/350314_2-nF8l304PQ2538u7CCbv9dJl69YDlE5MnzdRzahQfU.jpg",
            "width": 1919,
            "height": 1440
        },
        {
            "id": "578c4502498e0fd0577b70ea",
            "created_at": "2016-07-18T02:54:58.000Z",
            "prefix": "https://fastly.4sqi.net/img/general/",
            "suffix": "/1104799_4o7GsQo8YVaOxo0KRo3nz0mA6T9QeWd99EfB9xFLDho.jpg",
            "width": 1080,
            "height": 1080,
        },
        {
            "id": "579c4a2c498e51784d9bf36e",
            "created_at": "2016-07-30T06:33:16.000Z",
            "prefix": "https://fastly.4sqi.net/img/general/",
            "suffix": "/350314_FBhQi53384VZD_-r0g9HTcSgC26R_UYFLIXyCoqBfo4.jpg",
            "width": 1440,
            "height": 1920,
        },
        {
            "id": "57f6f7d1498e8ced17af1f1e",
            "created_at": "2016-10-07T01:18:09.000Z",
            "prefix": "https://fastly.4sqi.net/img/general/",
            "suffix": "/133303281_SV0k9JRdX5DoFB2HJa6mLeXRPQr6rDywVLTaSpIxsFs.jpg",
            "width": 1440,
            "height": 1920
        },
        {
            "id": "5821af321094cb2037e318a5",
            "created_at": "2016-11-08T10:55:46.000Z",
            "prefix": "https://fastly.4sqi.net/img/general/",
            "suffix": "/22787273_tuIIzxMbWiEA2xSqcZ8gwDPvbpvHOZdurRjoSiOIOzA.jpg",
            "width": 1440,
            "height": 1920,
        }
    ],
    "price": 4,
    "rating": 8.5,
    "tel": "03-5544-8222",
    "tips": [
        {
            "created_at": "2022-09-05T04:40:08.000Z",
            "text": "Steak-heavy menu as one would expect"
        },
        {
            "created_at": "2021-09-28T10:19:09.000Z",
            "text": "Every Tuesday, T-Bone is half price ! Yummy"
        },
        {
            "created_at": "2019-06-29T17:11:10.000Z",
            "text": "29日はステーキが50%のディスカウント。ブランチセットのブラックアンガスを+3,850円でリブアイにアップグレード。シーザーサラダはロメインレタスでなくサラダ菜。ステーキは同じものでも焼き加減バラバラ。チェックにも来なかった。アップグレードの意味がなかったかも。味もぼやけていて、肉自体うまみが少ない。ほぼ生の目玉焼きが2個も乗ってくるが、黄身に熱が入っていないのでうまみなし。卵いりません。"
        },
        {
            "created_at": "2019-03-21T14:52:27.000Z",
            "text": "Very impressive service, steaks and cocktails. However, the burger is not that good and the fruit assortment on ice really only includes a couple of bites.. something for special nights!"
        },
        {
            "created_at": "2017-12-31T11:35:18.000Z",
            "text": "Service and presentation are well worth the price."
        }
    ],
    "website": "https://rubyjacks.jp",
    description: "",
    distance: 0,
    email: "",
    link: "",
    menu: "",
    verified: false,
}