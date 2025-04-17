import {collection, get, doc, getDoc, getDocs, query, where, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "../firebase/firebaseConfig";
import {useEffect, useState} from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { provideGlobalGridOptions } from 'ag-grid-community';
import OpenEditor from "../components/OpenEditor";
import {CSVLink} from "react-csv";

// provide localeText to all grids via global options

provideGlobalGridOptions({
    suppressFieldDotNotation: true,
    defaultColDef: {
        resizable: true,
    },
});

const testImagesData = [
    {
        "id": "09iTLGDbrN3Yt3jmUuJ2",
        "category": "Tastes of the world",
        "num": 17,
        "url": "https://drive.google.com/thumbnail?id=1QCETa_CjIM50diLumj-rSLf3IWYavXNn&sz=w595",
        "createDate": {
            "seconds": 1716632078,
            "nanoseconds": 523000000
        }
    },
    {
        "id": "0AuNqFnFLk3UZaJKxZEb",
        "createDate": {
            "seconds": 1716629597,
            "nanoseconds": 540000000
        },
        "num": 1,
        "category": "Tastes of the world",
        "url": "https://drive.google.com/thumbnail?id=1RaF1sy-u7odmTQ6aATx2GYD3-GCcqacB&sz=w595"
    },
    {
        "id": "0QyTBfNoBXJGR2XUXwOH",
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1G84iKSLxTPeelJQxieBeCtSY9FDmna5r&sz=w595",
        "num": 304,
        "createDate": {
            "seconds": 1716634312,
            "nanoseconds": 694000000
        }
    },
    {
        "id": "0mL7O8jh0agkow4tU4qQ",
        "num": 621,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636476,
            "nanoseconds": 225000000
        },
        "url": "https://drive.google.com/thumbnail?id=1JLITuaOis3i4xlLsqCPHnxt6x3u1kXEh&sz=w595"
    },
    {
        "id": "19pnIt28fYvxUEpkbLW9",
        "num": 337,
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1D2tS1zKyceKfW2xEm_mwuTdrsgjS_Pos&sz=w595",
        "createDate": {
            "seconds": 1716634889,
            "nanoseconds": 535000000
        }
    },
    {
        "id": "1pjFrBdKBf3dSVpca3XZ",
        "url": "https://drive.google.com/thumbnail?id=1CqJoo1K4DPZtKi3YwuP1B4xFEDZqozuP&sz=w595",
        "category": "The inner light",
        "num": 227,
        "createDate": {
            "seconds": 1716634023,
            "nanoseconds": 377000000
        }
    },
    {
        "id": "2UfUZO73cvg3yZXoKuL7",
        "createDate": {
            "seconds": 1716633404,
            "nanoseconds": 346000000
        },
        "num": 206,
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1qOaUByf_3CzdSb2ZPe3ZI5spYwARp5am&sz=w595"
    },
    {
        "id": "4EXmyZ9K9Jl8bPD6HZCd",
        "url": "https://drive.google.com/thumbnail?id=1HFWEJkp_Sy_GcFvA-eHOT-BUJ8vrUK-H&sz=w595",
        "num": 202,
        "createDate": {
            "seconds": 1716633309,
            "nanoseconds": 535000000
        },
        "category": "The inner light"
    },
    {
        "id": "4kvpdTfk9l42l32hUNAz",
        "category": "Breathe",
        "num": 415,
        "createDate": {
            "seconds": 1716635336,
            "nanoseconds": 818000000
        },
        "url": "https://drive.google.com/thumbnail?id=1UDwBZIyi8h5CoryJZxihvXngx3ca5s_6&sz=w595"
    },
    {
        "id": "5CEK2vpL77WiGWu8tyjg",
        "createDate": {
            "seconds": 1716636251,
            "nanoseconds": 942000000
        },
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1YUvlAeCE6SqCEtVP9MkOPqMjAHYhUjJa&sz=w595",
        "num": 609
    },
    {
        "id": "5Pjj3bmdOVXx6FBlmN9d",
        "createDate": {
            "seconds": 1716634092,
            "nanoseconds": 430000000
        },
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1GFefvyxagPV8JF_Kjs27Xc0RqETiazb4&sz=w595",
        "num": 229
    },
    {
        "id": "5a13n4Occx5nM5HQEi9u",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "createDate": {
            "seconds": 1716635797,
            "nanoseconds": 197000000
        },
        "url": "https://drive.google.com/thumbnail?id=11fQJ4uFjxqXlnTj19jlij9Ha4g1x9Eqx&sz=w595",
        "num": 518
    },
    {
        "id": "5wi21TPqMUn0LdiMSHY2",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "url": "https://drive.google.com/thumbnail?id=1vdLHzzyWPsTh24swnHPZIi658cz6aELs&sz=w595",
        "num": 508,
        "createDate": {
            "seconds": 1716635677,
            "nanoseconds": 438000000
        }
    },
    {
        "id": "5xljtcplchtideVKswSr",
        "num": 16,
        "category": "Tastes of the world",
        "url": "https://drive.google.com/thumbnail?id=1ywXDAJpmFNRoXPVMiXGROM4fhnPPWBxg&sz=w595",
        "createDate": {
            "seconds": 1716632053,
            "nanoseconds": 933000000
        }
    },
    {
        "id": "67UjI42FrNcnUjzOapuk",
        "url": "https://drive.google.com/thumbnail?id=17AUfHxlKBeGG6qMjy92pDF445WBcixfT&sz=w595",
        "num": 413,
        "category": "Breathe",
        "createDate": {
            "seconds": 1716635306,
            "nanoseconds": 356000000
        }
    },
    {
        "id": "7ABqqBCPSiXHJZipytFg",
        "url": "https://drive.google.com/thumbnail?id=1jBIiT-wB1zisfiNesiG4ikwofP7qyJF-&sz=w595",
        "num": 341,
        "createDate": {
            "seconds": 1716634934,
            "nanoseconds": 704000000
        },
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "7imj0LZ18vpIdlsF8huy",
        "num": 218,
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1R8I9WjWtgkQW_c0IwQqTEA0VFOxe3uH7&sz=w595",
        "createDate": {
            "seconds": 1716633775,
            "nanoseconds": 968000000
        }
    },
    {
        "id": "7kXdpHjNEyi93DuWwSuJ",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 501,
        "createDate": {
            "seconds": 1716635566,
            "nanoseconds": 222000000
        },
        "url": "https://drive.google.com/thumbnail?id=1HDVdp8FKZdZUKEdxBXLV3HsVZcCz2pya&sz=w595"
    },
    {
        "id": "7lo6GGoyhXB3RJQs2KJW",
        "url": "https://drive.google.com/thumbnail?id=1HvL86ATT7Icd82C3_cU8501t6POebnGB&sz=w595",
        "createDate": {
            "seconds": 1716635626,
            "nanoseconds": 850000000
        },
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 505
    },
    {
        "id": "7mkb9I0jt7L075onlm0M",
        "createDate": {
            "seconds": 1716632029,
            "nanoseconds": 894000000
        },
        "url": "https://drive.google.com/thumbnail?id=1LmpEcup9IoVPoQVz1STct-d2wCNwgPXh&sz=w595",
        "num": 15,
        "category": "Tastes of the world"
    },
    {
        "id": "8UKoR6WD6zThOtuo5IOL",
        "num": 614,
        "createDate": {
            "seconds": 1716636351,
            "nanoseconds": 727000000
        },
        "url": "https://drive.google.com/thumbnail?id=1X6oSbr2e_-gndYks2B8FoqeWKtpwfL4u&sz=w595",
        "category": "Eat, drink and love"
    },
    {
        "id": "92DoCvEEOj4HMp2Wea0e",
        "createDate": {
            "seconds": 1716634596,
            "nanoseconds": 559000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Gyt9jQWRP1zFE9hYyuQtQq8uRl7gG9xf&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 319
    },
    {
        "id": "9xJFbvrhFzrfgDIFyisn",
        "url": "https://drive.google.com/thumbnail?id=16i9EY_CXj3jiqMNVy34lIi1slrMYozo9&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 313,
        "createDate": {
            "seconds": 1716634491,
            "nanoseconds": 34000000
        }
    },
    {
        "id": "A1h5Q1a1YfhloZvu65J2",
        "createDate": {
            "seconds": 1716635619,
            "nanoseconds": 261000000
        },
        "num": 504,
        "url": "https://drive.google.com/thumbnail?id=1-x_z09pNevybAxBVCGNnK5nSUj5A9p8s&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "ASgymhXUJDfLqovcmFUU",
        "url": "https://drive.google.com/thumbnail?id=1ujp8MqQFzxVrEfet4ipKfBiqktsybqz6&sz=w595",
        "createDate": {
            "seconds": 1716634828,
            "nanoseconds": 606000000
        },
        "category": "The world around us through the eyes of an optimist ",
        "num": 332
    },
    {
        "id": "AdBQ7JE8zOBDMUM5VGOi",
        "createDate": {
            "seconds": 1716634001,
            "nanoseconds": 248000000
        },
        "num": 226,
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=176JJyGnVi8Otrl1SF7wqn13bnZAqfHDt&sz=w595"
    },
    {
        "id": "Aw9VlwJRmVmZEiHbqOYK",
        "url": "https://drive.google.com/thumbnail?id=1Z-iAbVMDxUdm69N17bkKVl-QS17lJ972&sz=w595",
        "num": 507,
        "createDate": {
            "seconds": 1716635658,
            "nanoseconds": 15000000
        },
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "AyhPG5Gh7xFLwi34Gu4G",
        "createDate": {
            "seconds": 1716632436,
            "nanoseconds": 609000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Z6vwa8mA_SAvXfrv9DlvXntrvVaNwudn&sz=w595",
        "num": 25,
        "category": "Tastes of the world"
    },
    {
        "id": "BC5SZz2UYuXdsQ9BkDIr",
        "createDate": {
            "seconds": 1716632507,
            "nanoseconds": 288000000
        },
        "num": 27,
        "category": "Tastes of the world",
        "url": "https://drive.google.com/thumbnail?id=1Y65LfcKXc24Rt1SW_bTWgbH2muj-KfI6&sz=w595"
    },
    {
        "id": "BJg5xWTMhwlH6xwEYJsy",
        "createDate": {
            "seconds": 1716632152,
            "nanoseconds": 837000000
        },
        "url": "https://drive.google.com/thumbnail?id=1EAvoOiqWRBvpgfZSYpbZJG6jZc2XpimQ&sz=w595",
        "category": "Tastes of the world",
        "num": 19
    },
    {
        "id": "BeTjSYrmI5jTMN8ix1F6",
        "num": 419,
        "category": "Breathe",
        "url": "https://drive.google.com/thumbnail?id=1Xmr9FTo4BMfZOy23jNE6R21YAdwCgWQ1&sz=w595",
        "createDate": {
            "seconds": 1716635396,
            "nanoseconds": 906000000
        }
    },
    {
        "id": "BkUwme5sIb9DmcAXF2h9",
        "url": "https://drive.google.com/thumbnail?id=1u6TNnNV53Zb33ic8uC_tOkI8_FDF6kTt&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "createDate": {
            "seconds": 1716635901,
            "nanoseconds": 683000000
        },
        "num": 527
    },
    {
        "id": "Byk4uEFJ68690f9sl5rM",
        "url": "https://drive.google.com/thumbnail?id=1Z4IxvZPsZuE1f_ydRj8h3ofsrfPP1Tjg&sz=w595",
        "category": "Breathe",
        "createDate": {
            "seconds": 1716635297,
            "nanoseconds": 128000000
        },
        "num": 412
    },
    {
        "id": "CC7zLWrhSOJMsu2YJbtO",
        "url": "https://drive.google.com/thumbnail?id=1va8mNSi3gcJfpsw7eawi0sReEsxbhE8N&sz=w595",
        "createDate": {
            "seconds": 1716634775,
            "nanoseconds": 460000000
        },
        "num": 328,
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "CcagmD8OSJ2GPG7zAVwW",
        "num": 418,
        "createDate": {
            "seconds": 1716635380,
            "nanoseconds": 571000000
        },
        "category": "Breathe",
        "url": "https://drive.google.com/thumbnail?id=1CQP9ZHS4QsyZRMgR-J3KipcUVMjNjmja&sz=w595"
    },
    {
        "id": "CuCqbKGWWMKAMoDmnRFM",
        "createDate": {
            "seconds": 1716635882,
            "nanoseconds": 407000000
        },
        "url": "https://drive.google.com/thumbnail?id=1cxLyRsG0GTF8BN-PjC1ee5eMoapZ7VB-&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 525
    },
    {
        "id": "E8Moi4PtFlFjFa1Ey9o0",
        "num": 515,
        "createDate": {
            "seconds": 1716635751,
            "nanoseconds": 171000000
        },
        "url": "https://drive.google.com/thumbnail?id=1FG9Yob1RXkyP7dmEhhJ_n2c6eSQ3uSXZ&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "EsfOsY0E3vY1ZDHwDc83",
        "createDate": {
            "seconds": 1716634363,
            "nanoseconds": 60000000
        },
        "url": "https://drive.google.com/thumbnail?id=1KX5DaKzgxidfd2A9wH6fJwlgRbuhiZq3&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 306
    },
    {
        "id": "F2czaLMPFFayK2SKXxOg",
        "num": 526,
        "createDate": {
            "seconds": 1716635892,
            "nanoseconds": 158000000
        },
        "url": "https://drive.google.com/thumbnail?id=1FVsiwY1Brx9YSAak2X5HoH0DvZwiZpIc&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "FODKJFurAhNK5XCgWBL8",
        "num": 509,
        "createDate": {
            "seconds": 1716635685,
            "nanoseconds": 267000000
        },
        "url": "https://drive.google.com/thumbnail?id=1D_j66MUUU0uLIlvntXptveNzNjHH2mUk&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "FwxvvuvdAJaFikQHASxQ",
        "num": 411,
        "createDate": {
            "seconds": 1716635290,
            "nanoseconds": 343000000
        },
        "category": "Breathe",
        "url": "https://drive.google.com/thumbnail?id=1ly3XPa_u2bZ4V7Rdif65EQq7pjKY6odd&sz=w595"
    },
    {
        "id": "G2Ds2RV8eiJzeaM0hvUP",
        "url": "https://drive.google.com/thumbnail?id=1kIP3IERRrcvz3aDjJTt7Eseq_RGpXYXz&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 335,
        "createDate": {
            "seconds": 1716634867,
            "nanoseconds": 641000000
        }
    },
    {
        "id": "G90CLdEE3WJhhdEbB97Q",
        "url": "https://drive.google.com/thumbnail?id=1Q-qpW6HAWGiDkGqTvYrvQDnvqnzkD_Z6&sz=w595",
        "createDate": {
            "seconds": 1716634809,
            "nanoseconds": 563000000
        },
        "num": 330,
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "GDMbbgY7Y6SHObPDDZ6A",
        "num": 107,
        "category": "Bread and sour cream",
        "createDate": {
            "seconds": 1716633023,
            "nanoseconds": 429000000
        },
        "url": "https://drive.google.com/thumbnail?id=1P65Opoo2t371AQdb14zi83NfJhlUCCTb&sz=w595"
    },
    {
        "id": "GN42N1VKgwlzTfk6zNnS",
        "createDate": {
            "seconds": 1716635803,
            "nanoseconds": 942000000
        },
        "num": 519,
        "url": "https://drive.google.com/thumbnail?id=1j_YxqIvK-Y-kxqAhfnXK3nlW1sFrKcDA&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "GZt63m5OUCdJEGF3rcHp",
        "num": 626,
        "url": "https://drive.google.com/thumbnail?id=1VT0M0w59F0h0emQeEIqcqjPpn4RzxDvB&sz=w595",
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636533,
            "nanoseconds": 87000000
        }
    },
    {
        "id": "H1XKFilxdXokwjBOIDBT",
        "url": "https://drive.google.com/thumbnail?id=1dE2CIYRVXMd5Cw9OTvBlPAHB8t0VKGio&sz=w595",
        "num": 338,
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634901,
            "nanoseconds": 692000000
        }
    },
    {
        "id": "H2VkQzgZ0Zro6HxdKvkG",
        "createDate": {
            "seconds": 1716633803,
            "nanoseconds": 10000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Sx1xdDpCkVsOjFgKD4a8BewKvEQJriwp&sz=w595",
        "category": "The inner light",
        "num": 219
    },
    {
        "id": "HWRb3NvT3GdUBzEWW9U1",
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636417,
            "nanoseconds": 363000000
        },
        "num": 618,
        "url": "https://drive.google.com/thumbnail?id=1oyy2B-zo8CjFH78ZnL_cv8fA3TLT39Ys&sz=w595"
    },
    {
        "id": "HXKypHtg8NHP6Uu3MswP",
        "num": 209,
        "createDate": {
            "seconds": 1716633481,
            "nanoseconds": 550000000
        },
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1pVbI508EbDvwis4POJlQScdQf5_qMuJ8&sz=w595"
    },
    {
        "id": "HoIY03zKYdbMNpNREW4H",
        "category": "Breathe",
        "num": 414,
        "url": "https://drive.google.com/thumbnail?id=1tDGHG6t1sGCMMMTyARvsGAOhvsv0wftn&sz=w595",
        "createDate": {
            "seconds": 1716635329,
            "nanoseconds": 806000000
        }
    },
    {
        "id": "I0rYMzostnGSl5slXiv8",
        "url": "https://drive.google.com/thumbnail?id=1AmDynpsbSQkzs7J_vZJuegp6ZcgiZcNV&sz=w595",
        "category": "Breathe",
        "num": 410,
        "createDate": {
            "seconds": 1716635283,
            "nanoseconds": 437000000
        }
    },
    {
        "id": "IFXzzoqEnR4Svr49f8bC",
        "url": "https://drive.google.com/thumbnail?id=1T3IdJhAYEmCrZ9-SxWQfPy3ZJVIehZMK&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 502,
        "createDate": {
            "seconds": 1716635589,
            "nanoseconds": 552000000
        }
    },
    {
        "id": "IUqfNJAU9HCxai3hJhI9",
        "createDate": {
            "seconds": 1716636226,
            "nanoseconds": 414000000
        },
        "url": "https://drive.google.com/thumbnail?id=1hoGIotIYDJ60udLU_agKbKf7xSxx7YiJ&sz=w595",
        "category": "Eat, drink and love",
        "num": 606
    },
    {
        "id": "IYbbABtUjnDNzEf9jmlQ",
        "url": "https://drive.google.com/thumbnail?id=1Od7Y_ug6TotTKJngqP-8s6Jxwtv3Dslj&sz=w595",
        "num": 204,
        "createDate": {
            "seconds": 1716633357,
            "nanoseconds": 185000000
        },
        "category": "The inner light"
    },
    {
        "id": "IcDVssm0klRNedIt8lPx",
        "url": "https://drive.google.com/thumbnail?id=1vFNsBZOSMbtMyR45FQc5mSzot3fm-EAV&sz=w595",
        "createDate": {
            "seconds": 1716635694,
            "nanoseconds": 634000000
        },
        "num": 510,
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "JEEaqIe5mySB100yUjoq",
        "url": "https://drive.google.com/thumbnail?id=1rTZceblaxxtqYXWHm3NZmRdhmsk85nlu&sz=w595",
        "category": "Eat, drink and love",
        "num": 624,
        "createDate": {
            "seconds": 1716636520,
            "nanoseconds": 40000000
        }
    },
    {
        "id": "JWxK0PvQ7hWTqhYjJxvw",
        "num": 320,
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1menExqvcghSLvHdK0HJ9imw76DD38Fo5&sz=w595",
        "createDate": {
            "seconds": 1716634617,
            "nanoseconds": 151000000
        }
    },
    {
        "id": "JhxG6FyG7omRluj0MBiJ",
        "url": "https://drive.google.com/thumbnail?id=1KNlZO6aUi23GA7rI04Zti8m3rMlF7fcr&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634848,
            "nanoseconds": 447000000
        },
        "num": 334
    },
    {
        "id": "JlaNczncVy6k0z70Bso7",
        "num": 628,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636549,
            "nanoseconds": 682000000
        },
        "url": "https://drive.google.com/thumbnail?id=1ELDO82Ue4qYKyMpO_3T_JlX8nK6KRhOT&sz=w595"
    },
    {
        "id": "JzlgzwJgzPg5ySzH16zO",
        "num": 311,
        "url": "https://drive.google.com/thumbnail?id=1Y_ozOo-YQEFxtB2tusBjYxFSAVo9pqg3&sz=w595",
        "createDate": {
            "seconds": 1716634440,
            "nanoseconds": 150000000
        },
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "K6gn1Fkooln7KY9khvLP",
        "category": "Breathe",
        "createDate": {
            "seconds": 1716635245,
            "nanoseconds": 262000000
        },
        "url": "https://drive.google.com/thumbnail?id=1p3WncstisYJiSLm1LrXYRMa-DuuoLZgF&sz=w595",
        "num": 407
    },
    {
        "id": "KLatMQc0tcNI8NsZlGoP",
        "category": "The inner light",
        "num": 213,
        "url": "https://drive.google.com/thumbnail?id=1zXfoiBwB0h42fBNQrp0GaTIb7Ryu_g4Y&sz=w595",
        "createDate": {
            "seconds": 1716633586,
            "nanoseconds": 821000000
        }
    },
    {
        "id": "KUuGMfIfnFWpWp3HrGQS",
        "url": "https://drive.google.com/thumbnail?id=1KDKMeZ-8Rk7nuEjL2vszercWYLEsKIl0&sz=w595",
        "category": "The inner light",
        "createDate": {
            "seconds": 1716633688,
            "nanoseconds": 738000000
        },
        "num": 216
    },
    {
        "id": "KkQY0g4875zxCfLlLF9B",
        "num": 214,
        "createDate": {
            "seconds": 1716633601,
            "nanoseconds": 596000000
        },
        "url": "https://drive.google.com/thumbnail?id=1lG_-g_04Wr1LSh-slqH0w_yug7t5It1S&sz=w595",
        "category": "The inner light"
    },
    {
        "id": "LQpsLs2axXFsN46nIpcW",
        "url": "https://drive.google.com/thumbnail?id=1J72yWm9q8tswqd3ew107OQIaQsQGPm9d&sz=w595",
        "num": 24,
        "createDate": {
            "seconds": 1716632409,
            "nanoseconds": 525000000
        },
        "category": "Tastes of the world"
    },
    {
        "id": "LVnheYwMrjS90O8Z3dmp",
        "url": "https://drive.google.com/thumbnail?id=1w55pb5PLqUjXZBvaChaBcOC0-oL9_yYj&sz=w595",
        "category": "Tastes of the world",
        "num": 22,
        "createDate": {
            "seconds": 1716632342,
            "nanoseconds": 683000000
        }
    },
    {
        "id": "Lr8WI9NDTlcjVkbcrdhj",
        "url": "https://drive.google.com/thumbnail?id=16sOXYrBgLSChr5YiK9Jpde9FrspCJKU6&sz=w595",
        "category": "Tastes of the world",
        "createDate": {
            "seconds": 1716631076,
            "nanoseconds": 159000000
        },
        "num": 7
    },
    {
        "id": "MdupFLIMRND0P8BfuaeL",
        "createDate": {
            "seconds": 1716635205,
            "nanoseconds": 485000000
        },
        "url": "https://drive.google.com/thumbnail?id=1zcs_n-GOL8FquW3oM6UNTyztNqesx0Lf&sz=w595",
        "num": 405,
        "category": "Breathe"
    },
    {
        "id": "MzvmyqkpoDQTpVKPTCsj",
        "createDate": {
            "seconds": 1716634819,
            "nanoseconds": 34000000
        },
        "url": "https://drive.google.com/thumbnail?id=1bjkb_GaxYkUEQD6jRJynXYN2WXYDgmI1&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 331
    },
    {
        "id": "NDtj0pUH0DMqTkJHsUL5",
        "url": "https://drive.google.com/thumbnail?id=1-cvl35jwSdOt9jZBEEmT7NJu8xl6eYRZ&sz=w595",
        "createDate": {
            "seconds": 1716635365,
            "nanoseconds": 891000000
        },
        "category": "Breathe",
        "num": 417
    },
    {
        "id": "NeWhtbOdVNS8yi9sitdE",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634264,
            "nanoseconds": 828000000
        },
        "num": 301,
        "url": "https://drive.google.com/thumbnail?id=1emeKpNMHAy5pPxAK-fVR4vZu9ZE-BhrX&sz=w595"
    },
    {
        "id": "O5fiER1NiwqLn7mKWOYO",
        "url": "https://drive.google.com/thumbnail?id=1Wsj_f19Z9h0G9qEhyXYJoViamJXpa6CJ&sz=w595",
        "num": 422,
        "createDate": {
            "seconds": 1716635438,
            "nanoseconds": 900000000
        },
        "category": "Breathe"
    },
    {
        "id": "O7TXVjO9XY5Wc52YxyYk",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634956,
            "nanoseconds": 626000000
        },
        "num": 342,
        "url": "https://drive.google.com/thumbnail?id=1Z-_SLyAJk-ijPCzV05x5lQn1_6nNth0f&sz=w595"
    },
    {
        "id": "OA68Y4GjKPU0x6LGiTuu",
        "url": "https://drive.google.com/thumbnail?id=14SyZ5qCCSC7UOX22Fv1aM0SDqwCU6pUV&sz=w595",
        "createDate": {
            "seconds": 1716636261,
            "nanoseconds": 169000000
        },
        "num": 610,
        "category": "Eat, drink and love"
    },
    {
        "id": "OH1OHiseVfkrq2PF3ZqH",
        "num": 629,
        "url": "https://drive.google.com/thumbnail?id=1mvabYJrNpxe0s305YqepqrsoIhbCt0KD&sz=w595",
        "createDate": {
            "seconds": 1716636558,
            "nanoseconds": 365000000
        },
        "category": "Eat, drink and love"
    },
    {
        "id": "OUfxC5PvpKi2hisZ3Zyh",
        "url": "https://drive.google.com/thumbnail?id=1RstEvE3S34DjmOqZo8Mbay9tzliXu2pF&sz=w595",
        "num": 604,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636071,
            "nanoseconds": 763000000
        }
    },
    {
        "id": "OVq82GbI7gRiN2pPv4zF",
        "url": "https://drive.google.com/thumbnail?id=1CEathxJEGON_CS0sCdqfZncCTEiMNL2F&sz=w595",
        "num": 522,
        "createDate": {
            "seconds": 1716635832,
            "nanoseconds": 645000000
        },
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)"
    },
    {
        "id": "OW4PKeqkqM2AeHDETgZy",
        "num": 620,
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1x6-UMMrkDLra8oS0cDSs2Dko88rBtuI1&sz=w595",
        "createDate": {
            "seconds": 1716636444,
            "nanoseconds": 342000000
        }
    },
    {
        "id": "OcsukHmul3vWarcmHwoY",
        "num": 307,
        "createDate": {
            "seconds": 1716634374,
            "nanoseconds": 954000000
        },
        "url": "https://drive.google.com/thumbnail?id=19V2JhuNokOkP0gMTwcAcKyehQ4JDi66a&sz=w595",
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "Ou68pnsiUA4xYuLXx5wr",
        "url": "https://drive.google.com/thumbnail?id=1oqq9ZOTCzWcOaUfeA_gStHm9VdVxls3r&sz=w595",
        "num": 6,
        "category": "Tastes of the world",
        "createDate": {
            "seconds": 1716630961,
            "nanoseconds": 287000000
        }
    },
    {
        "id": "P3t6cCz0zQ6UCqDoR3Ho",
        "category": "The world around us through the eyes of an optimist ",
        "num": 302,
        "url": "https://drive.google.com/thumbnail?id=1AOR1pfBtfex4cPRAsuLSytH1w1SGdj8X&sz=w595",
        "createDate": {
            "seconds": 1716634292,
            "nanoseconds": 12000000
        }
    },
    {
        "id": "PbDBRPLJGnh8BAC6wEe2",
        "url": "https://drive.google.com/thumbnail?id=1jzaZFdTvcDtcUWNQZlWVxgfBH-HvlOur&sz=w595",
        "category": "Tastes of the world",
        "num": 2,
        "createDate": {
            "seconds": 1716630701,
            "nanoseconds": 829000000
        }
    },
    {
        "id": "Q4Fa8YqT8bsGQMe3fmc7",
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=161waQnPr1zjvs3M9Bpm-UO-r2oRpESbZ&sz=w595",
        "num": 601,
        "createDate": {
            "seconds": 1716635974,
            "nanoseconds": 609000000
        }
    },
    {
        "id": "QBnnOw9X4vwegIP3cGk6",
        "createDate": {
            "seconds": 1716634919,
            "nanoseconds": 654000000
        },
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1nla9-v_2L7BoB7XOHe6TWTII2Ji2yOPo&sz=w595",
        "num": 340
    },
    {
        "id": "QIld9r2Zzy0YvFq1fYBS",
        "url": "https://drive.google.com/thumbnail?id=1to6aZfyk2BxQjErS2G9y-Sm5m5g6Po7P&sz=w595",
        "createDate": {
            "seconds": 1716634517,
            "nanoseconds": 251000000
        },
        "category": "The world around us through the eyes of an optimist ",
        "num": 315
    },
    {
        "id": "RX5osf4eaqFWFBq3o455",
        "category": "The inner light",
        "num": 217,
        "url": "https://drive.google.com/thumbnail?id=1hh5zJbQVXwiSqfhdS24FKD8MgJCGWCiV&sz=w595",
        "createDate": {
            "seconds": 1716633751,
            "nanoseconds": 422000000
        }
    },
    {
        "id": "Rb9NuGkm91ZVdU1goVv2",
        "createDate": {
            "seconds": 1716633943,
            "nanoseconds": 394000000
        },
        "num": 223,
        "url": "https://drive.google.com/thumbnail?id=1wFeF-2JWP1HJNoEwgz3Ec6lO-tWC872t&sz=w595",
        "category": "The inner light"
    },
    {
        "id": "RjqQT910kw7aqf9e0WzQ",
        "url": "https://drive.google.com/thumbnail?id=1uBoToxqzEjE7dIMcTzuPxhDs_S5cIQdO&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "createDate": {
            "seconds": 1716635733,
            "nanoseconds": 992000000
        },
        "num": 513
    },
    {
        "id": "S0h36b675i2DLTUrr3Mg",
        "createDate": {
            "seconds": 1716636044,
            "nanoseconds": 69000000
        },
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1HiFGYQopvQSUWo56Lh_4fGEQbMClfnNb&sz=w595",
        "num": 602
    },
    {
        "id": "S3Lqui0gEGQWP3WdSwi0",
        "url": "https://drive.google.com/thumbnail?id=196yHomhaueXmPIXntOkEz0guN5hf9iEQ&sz=w595",
        "createDate": {
            "seconds": 1716631458,
            "nanoseconds": 377000000
        },
        "num": 8,
        "category": "Tastes of the world"
    },
    {
        "id": "SyiW5OXbQDKqWMl3g8UY",
        "createDate": {
            "seconds": 1716634505,
            "nanoseconds": 182000000
        },
        "url": "https://drive.google.com/thumbnail?id=11fHH4_srtd8QMIFctEG_QKiIf0bB8DI7&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 314
    },
    {
        "id": "T0mHrZyM0eVNbd4Dd0q5",
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1z5yPwZLNRgA7IMgOeyLoVcj3AwK3KU6s&sz=w595",
        "createDate": {
            "seconds": 1716633961,
            "nanoseconds": 626000000
        },
        "num": 224
    },
    {
        "id": "TiQEQ2TDsSuakHwNZI3Q",
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1xaSDLvLbIpjnrsPWLUv3R4xeh1KvzQR-&sz=w595",
        "num": 613,
        "createDate": {
            "seconds": 1716636340,
            "nanoseconds": 456000000
        }
    },
    {
        "id": "TqlIcbrtkrBluDYDSgjS",
        "url": "https://drive.google.com/thumbnail?id=19zliRpJa9GNDQ2t8NxBHDjjCjxV8IRmB&sz=w595",
        "createDate": {
            "seconds": 1716635758,
            "nanoseconds": 242000000
        },
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 516
    },
    {
        "id": "Ty1xbR1xWc1KmuuQpAzP",
        "url": "https://drive.google.com/thumbnail?id=1wqxgrZ0AloUYNkm63XDa8ZFJ8FXmb-0_&sz=w595",
        "createDate": {
            "seconds": 1716635810,
            "nanoseconds": 755000000
        },
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 520
    },
    {
        "id": "UHZTugJdH9KRbQfdtfz1",
        "createDate": {
            "seconds": 1716633846,
            "nanoseconds": 4000000
        },
        "category": "The inner light",
        "num": 221,
        "url": "https://drive.google.com/thumbnail?id=1CHazsZLK_ziNbV4GMnY0Qv43Re-yMpfu&sz=w595"
    },
    {
        "id": "URrXlxG3L0qdZMhiSgwK",
        "num": 310,
        "createDate": {
            "seconds": 1716634421,
            "nanoseconds": 244000000
        },
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1FVbW73z7DVk3-XBAcAa8cYsG6oEZz7jf&sz=w595"
    },
    {
        "id": "UrlC35wHVYpUK0wEa3Hy",
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1yKaI0Ix1bz8frnwxsxPZA-WAHgp-yPje&sz=w595",
        "num": 312,
        "createDate": {
            "seconds": 1716634466,
            "nanoseconds": 270000000
        }
    },
    {
        "id": "VC0ojOsgiiCCkSRurxfd",
        "num": 402,
        "createDate": {
            "seconds": 1716635146,
            "nanoseconds": 38000000
        },
        "url": "https://drive.google.com/thumbnail?id=1as2BOIUXqwpYHRz83OukJpUyQVEwIExu&sz=w595",
        "category": "Breathe"
    },
    {
        "id": "W7Y3ZZfTebOSAx9sJbG6",
        "createDate": {
            "seconds": 1716636430,
            "nanoseconds": 910000000
        },
        "category": "Eat, drink and love",
        "num": 619,
        "url": "https://drive.google.com/thumbnail?id=1YBKNMOPf-XjLGHhESAJVX_gVCxYV68nS&sz=w595"
    },
    {
        "id": "WYTe8CrbHTCvmkRSAs0p",
        "category": "Tastes of the world",
        "num": 3,
        "url": "https://drive.google.com/thumbnail?id=1ZYLYAJCITqBKff6lakYxcpGz7vTsL2nS&sz=w595",
        "createDate": {
            "seconds": 1716630861,
            "nanoseconds": 663000000
        }
    },
    {
        "id": "Wohkj7KxEpqpjHwB2bQN",
        "createDate": {
            "seconds": 1716632483,
            "nanoseconds": 258000000
        },
        "num": 26,
        "category": "Tastes of the world",
        "url": "https://drive.google.com/thumbnail?id=1nhIdcjGYu_F992v9utfQjndVUE2_AWUP&sz=w595"
    },
    {
        "id": "WtbnRp5XpFlb5TD9GEie",
        "createDate": {
            "seconds": 1716633453,
            "nanoseconds": 658000000
        },
        "category": "The inner light",
        "num": 208,
        "url": "https://drive.google.com/thumbnail?id=1wcI08A4UTpbzycPQ1IZ7MHdHRTS9YbFR&sz=w595"
    },
    {
        "id": "Xhzf7W0NmYZM9BvsnTNB",
        "createDate": {
            "seconds": 1716633664,
            "nanoseconds": 626000000
        },
        "category": "The inner light",
        "num": 215,
        "url": "https://drive.google.com/thumbnail?id=1TGFjgXgJ7JmN1BgOl6NZVeYTWO3KCuY-&sz=w595"
    },
    {
        "id": "XxIjLsr1fOAwmFtZngR6",
        "createDate": {
            "seconds": 1716632896,
            "nanoseconds": 653000000
        },
        "num": 103,
        "url": "https://drive.google.com/thumbnail?id=1IxFAhfn-O6FAAKd_cENEUpWk2KYa3OO9&sz=w595",
        "category": "Bread and sour cream"
    },
    {
        "id": "Xxhm0wdaxPWLxqWslGCD",
        "num": 420,
        "createDate": {
            "seconds": 1716635412,
            "nanoseconds": 657000000
        },
        "category": "Breathe",
        "url": "https://drive.google.com/thumbnail?id=1_pXGNFfb-puG_m53ogWkurv01Jt8wi8-&sz=w595"
    },
    {
        "id": "YFLTNvJRS0seLskdfzZE",
        "createDate": {
            "seconds": 1716635171,
            "nanoseconds": 302000000
        },
        "url": "https://drive.google.com/thumbnail?id=18ozsCrklwbM176z2qbieqz1BM5LxVt3t&sz=w595",
        "num": 403,
        "category": "Breathe"
    },
    {
        "id": "Z8qTQxbn0Q4aKlD6uKD1",
        "num": 511,
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "url": "https://drive.google.com/thumbnail?id=1GV_mEgT8Z0I0DUhFHue4gYE1Wm7BTF19&sz=w595",
        "createDate": {
            "seconds": 1716635717,
            "nanoseconds": 94000000
        }
    },
    {
        "id": "Z99yPaJjDdQSQQ1AjW3G",
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1q0CpLXr7iDt5fzwEc1oBr9A1Ziy2NG0-&sz=w595",
        "createDate": {
            "seconds": 1716636267,
            "nanoseconds": 580000000
        },
        "num": 611
    },
    {
        "id": "ZVkPhVS2MP6lJgJWZvzZ",
        "createDate": {
            "seconds": 1716634134,
            "nanoseconds": 615000000
        },
        "url": "https://drive.google.com/thumbnail?id=1w4QzmsLQfG2NMoLf6179jHITbKUj6CDp&sz=w595",
        "num": 231,
        "category": "The inner light"
    },
    {
        "id": "ZeMRnupAe7O228pET3QC",
        "num": 336,
        "createDate": {
            "seconds": 1716634878,
            "nanoseconds": 709000000
        },
        "url": "https://drive.google.com/thumbnail?id=1YVKffPHx9Jbt-DvBTrSW1Gq2iuc6ZdnB&sz=w595",
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "aF2FC08RPrXZd39eAN73",
        "url": "https://drive.google.com/thumbnail?id=1zLL7fijJEdQe1uHz8JMMe5_vSBUUj_xJ&sz=w595",
        "createDate": {
            "seconds": 1716631786,
            "nanoseconds": 561000000
        },
        "category": "Tastes of the world",
        "num": 9
    },
    {
        "id": "bGIQd2hOp4GJPCC8Qr7y",
        "num": 4,
        "url": "https://drive.google.com/thumbnail?id=1wLhRVX1w7kXoBgnIkMLC_0MgrMFSz77b&sz=w595",
        "createDate": {
            "seconds": 1716630897,
            "nanoseconds": 69000000
        },
        "category": "Tastes of the world"
    },
    {
        "id": "bRqElvJkdayBUCWtyPM6",
        "url": "https://drive.google.com/thumbnail?id=1g-VHRXdpk98Bxd-Vbol9442lukh3oFno&sz=w595",
        "num": 228,
        "category": "The inner light",
        "createDate": {
            "seconds": 1716634070,
            "nanoseconds": 205000000
        }
    },
    {
        "id": "bn2Xi1JQYa8QACYPhMzQ",
        "url": "https://drive.google.com/thumbnail?id=13v4ohyqCMwdOuwNvRqbeblqaAMSkI8up&sz=w595",
        "category": "Breathe",
        "createDate": {
            "seconds": 1716635256,
            "nanoseconds": 580000000
        },
        "num": 408
    },
    {
        "id": "btPNR1AEogFoj15BWYtb",
        "category": "The world around us through the eyes of an optimist ",
        "num": 339,
        "url": "https://drive.google.com/thumbnail?id=1t5-lUGnwT-1rWQFqP30LQTNffa4ENucf&sz=w595",
        "createDate": {
            "seconds": 1716634909,
            "nanoseconds": 508000000
        }
    },
    {
        "id": "cHn4GxgBw7a6WZMStNj1",
        "category": "Tastes of the world",
        "num": 23,
        "createDate": {
            "seconds": 1716632379,
            "nanoseconds": 411000000
        },
        "url": "https://drive.google.com/thumbnail?id=1vsi5UlF37RGTHG8KY3evxB6Wq16fasSV&sz=w595"
    },
    {
        "id": "cSeZNYXV0N7r8mBxXCZU",
        "num": 109,
        "category": "Bread and sour cream",
        "url": "https://drive.google.com/thumbnail?id=1c_lng62zei7qZf3sp4DWFeuVdT20-62y&sz=w595",
        "createDate": {
            "seconds": 1716633082,
            "nanoseconds": 493000000
        }
    },
    {
        "id": "cTBAzeNChcuB3mPEOaVy",
        "url": "https://drive.google.com/thumbnail?id=1sod7pg0thubo8mvHU1YMCawBmzQiXJPw&sz=w595",
        "num": 20,
        "category": "Tastes of the world",
        "createDate": {
            "seconds": 1716632273,
            "nanoseconds": 995000000
        }
    },
    {
        "id": "culVZxzP3aTTCTQtVpw5",
        "createDate": {
            "seconds": 1716632972,
            "nanoseconds": 754000000
        },
        "url": "https://drive.google.com/thumbnail?id=1TWZYwQ9UBI5j9a2fDfWYq3XjuUY_YKzA&sz=w595",
        "category": "Bread and sour cream",
        "num": 105
    },
    {
        "id": "d4otVMlbM9t6Trc0DJD0",
        "category": "The inner light",
        "createDate": {
            "seconds": 1716633388,
            "nanoseconds": 776000000
        },
        "num": 205,
        "url": "https://drive.google.com/thumbnail?id=11vvQ_r9kezBrrxRU1QNzomxP15Sx_qch&sz=w595"
    },
    {
        "id": "d4wNONtHvwheXWN1cZMq",
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1KTOSBnwF7VlfWfJ8MVXD8N8CAYg5zwGM&sz=w595",
        "num": 308,
        "createDate": {
            "seconds": 1716634400,
            "nanoseconds": 688000000
        }
    },
    {
        "id": "duFFnIxY9VjjFa9BmWiy",
        "url": "https://drive.google.com/thumbnail?id=1f0Aeicl0czKAKMQbHTMyZzOnG82ELabB&sz=w595",
        "createDate": {
            "seconds": 1716633826,
            "nanoseconds": 368000000
        },
        "num": 220,
        "category": "The inner light"
    },
    {
        "id": "eCwuLlBq5eKbDhB7fyas",
        "createDate": {
            "seconds": 1716636314,
            "nanoseconds": 475000000
        },
        "category": "Eat, drink and love",
        "num": 612,
        "url": "https://drive.google.com/thumbnail?id=16qTFYJng9qAWp8p02eK2oR_UPBsES_CA&sz=w595"
    },
    {
        "id": "eDoAA6gTycrbvrd1osSA",
        "createDate": {
            "seconds": 1716635596,
            "nanoseconds": 844000000
        },
        "url": "https://drive.google.com/thumbnail?id=1CE-RS4McSsFDAR-WqRdc0esdqdUCCg1h&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 503
    },
    {
        "id": "ex0yskFl4ft8uRY6NYkF",
        "createDate": {
            "seconds": 1716635491,
            "nanoseconds": 538000000
        },
        "url": "https://drive.google.com/thumbnail?id=175i97DGXcxcWQmbUSCfYnpoK_PZOrymE&sz=w595",
        "num": 425,
        "category": "Breathe"
    },
    {
        "id": "f7byrkZvfDSoiPiTZirr",
        "num": 13,
        "url": "https://drive.google.com/thumbnail?id=1S-oQaXU6QtWAJh60_S_jbcMaEgHkCTog&sz=w595",
        "category": "Tastes of the world",
        "createDate": {
            "seconds": 1716631973,
            "nanoseconds": 122000000
        }
    },
    {
        "id": "fWmgJj7xSkHr9hrZEuBU",
        "url": "https://drive.google.com/thumbnail?id=1rkUJH2aTjjBtNfNQcJsTnLBI6pTvlhUm&sz=w595",
        "num": 631,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636580,
            "nanoseconds": 907000000
        }
    },
    {
        "id": "fZ890oI8FOn1CzRylpN8",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "url": "https://drive.google.com/thumbnail?id=1gazvfZ2CLwCyk31MRmWDglJxTEdGPrmM&sz=w595",
        "num": 506,
        "createDate": {
            "seconds": 1716635646,
            "nanoseconds": 923000000
        }
    },
    {
        "id": "g41jWNQYUVdDmuAmNzNo",
        "url": "https://drive.google.com/thumbnail?id=114uJ9eiGpidDU65u6NQj59EsH95rx2cS&sz=w595",
        "num": 517,
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "createDate": {
            "seconds": 1716635765,
            "nanoseconds": 522000000
        }
    },
    {
        "id": "g55SMZN94q0rut4K65g5",
        "category": "The inner light",
        "num": 212,
        "url": "https://drive.google.com/thumbnail?id=1XBOn0fjilPzWaF04IgGZgsKpMtiOeiUo&sz=w595",
        "createDate": {
            "seconds": 1716633564,
            "nanoseconds": 593000000
        }
    },
    {
        "id": "gJ9grrXXznDYJHwz96rL",
        "category": "Eat, drink and love",
        "num": 622,
        "createDate": {
            "seconds": 1716636486,
            "nanoseconds": 495000000
        },
        "url": "https://drive.google.com/thumbnail?id=1WZnghVDorZr6G2nFjwx7f4hG25wUKLNM&sz=w595"
    },
    {
        "id": "ga2LJhgxyvNRq9bUwZ0y",
        "url": "https://drive.google.com/thumbnail?id=1PfEabzEa-4BgRciCJ7w4SpYYUXXRdgSd&sz=w595",
        "num": 627,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636542,
            "nanoseconds": 775000000
        }
    },
    {
        "id": "gmAbaiRz4ZTjTWq0uzWN",
        "url": "https://drive.google.com/thumbnail?id=1QA_tyVF6GgYRXMUG13CDBUiZBT1b5TIe&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634838,
            "nanoseconds": 231000000
        },
        "num": 333
    },
    {
        "id": "hLtIogaVZmLZExjOBJn1",
        "createDate": {
            "seconds": 1716632104,
            "nanoseconds": 805000000
        },
        "url": "https://drive.google.com/thumbnail?id=196i85sD-eCRAWNuS8QucWPhkeiLVcowe&sz=w595",
        "category": "Tastes of the world",
        "num": 18
    },
    {
        "id": "hXfToFrqPNuomHPX804q",
        "createDate": {
            "seconds": 1716632879,
            "nanoseconds": 728000000
        },
        "num": 102,
        "url": "https://drive.google.com/thumbnail?id=1oAH0eag3o-LmP2cmtpAfIyX6jNIlyUms&sz=w595",
        "category": "Bread and sour cream"
    },
    {
        "id": "hc5LVHnQ0FQPGCCxwCNJ",
        "num": 106,
        "createDate": {
            "seconds": 1716633001,
            "nanoseconds": 268000000
        },
        "category": "Bread and sour cream",
        "url": "https://drive.google.com/thumbnail?id=1zf-ukxN7FWTy76YToLvCtsb-PjRTQuOv&sz=w595"
    },
    {
        "id": "hd8Y1J2448ErwT7Nsrkq",
        "createDate": {
            "seconds": 1716635841,
            "nanoseconds": 623000000
        },
        "num": 523,
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "url": "https://drive.google.com/thumbnail?id=1wIIvtOpDzGqUPUZfSqb69efzyJyrgYtA&sz=w595"
    },
    {
        "id": "i0kf8kKzMXAumyUYAmHg",
        "url": "https://drive.google.com/thumbnail?id=1J4CRbNx2QSc_K2hLzQJkyc8NaDCRFXCn&sz=w595",
        "num": 326,
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634738,
            "nanoseconds": 319000000
        }
    },
    {
        "id": "i2D7DPa0UqYhMCv2B3KT",
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1Vvqo88kxCoDnhZIwG4PcWYGl3f0rnpM2&sz=w595",
        "createDate": {
            "seconds": 1716636526,
            "nanoseconds": 343000000
        },
        "num": 625
    },
    {
        "id": "i84UBp7PAkRFUkTO34as",
        "createDate": {
            "seconds": 1716636232,
            "nanoseconds": 807000000
        },
        "num": 607,
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1tVTeg766Jq3fmZTlvt-oyT_C01b3dzvF&sz=w595"
    },
    {
        "id": "iNJn6rNhhEaFEGAFe2s7",
        "num": 404,
        "createDate": {
            "seconds": 1716635191,
            "nanoseconds": 597000000
        },
        "url": "https://drive.google.com/thumbnail?id=1WZjrgjlvi7_NbRVIdWonRBeIqbdG0D3o&sz=w595",
        "category": "Breathe"
    },
    {
        "id": "iRSW3phvVlbGIINbMl4q",
        "category": "The inner light",
        "createDate": {
            "seconds": 1716633538,
            "nanoseconds": 207000000
        },
        "num": 211,
        "url": "https://drive.google.com/thumbnail?id=1aDKejQ98LpOW57210b-rfX7YLfDgBymm&sz=w595"
    },
    {
        "id": "its6RfSjPb2XIg7cyZBe",
        "url": "https://drive.google.com/thumbnail?id=1WyQURWoJ6jJqbuH8l3N_hfp5t45Yfxya&sz=w595",
        "num": 406,
        "createDate": {
            "seconds": 1716635222,
            "nanoseconds": 552000000
        },
        "category": "Breathe"
    },
    {
        "id": "iuaET0I4ic9lZv9ubirg",
        "num": 210,
        "createDate": {
            "seconds": 1716633491,
            "nanoseconds": 737000000
        },
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1QkB1wvy7-XWTgJ8ZzWqGjDJqAKe9qXQJ&sz=w595"
    },
    {
        "id": "jCOFRlOz3ucuoxjzImz9",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 524,
        "createDate": {
            "seconds": 1716635871,
            "nanoseconds": 191000000
        },
        "url": "https://drive.google.com/thumbnail?id=1kucyPx305Le02hCLL-UWmN21rywWntSO&sz=w595"
    },
    {
        "id": "jDZIm3OlRaJom0jUXc8U",
        "createDate": {
            "seconds": 1716632945,
            "nanoseconds": 942000000
        },
        "url": "https://drive.google.com/thumbnail?id=18_-_zlw-_wuzQ60s0gvYTDh82YkkJsgZ&sz=w595",
        "category": "Bread and sour cream",
        "num": 104
    },
    {
        "id": "jKJj3DzTO7HCzbrudBpt",
        "createDate": {
            "seconds": 1716634115,
            "nanoseconds": 468000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Sf6UF_eFRglSFQVAaNiSE_crvOF7SfTT&sz=w595",
        "num": 230,
        "category": "The inner light"
    },
    {
        "id": "jVPXuG2L7PrFNgZ3MfCE",
        "url": "https://drive.google.com/thumbnail?id=1eu7pZiK6YFc28cKvN7PANe_ABN2oP4Ci&sz=w595",
        "createDate": {
            "seconds": 1716634300,
            "nanoseconds": 646000000
        },
        "category": "The world around us through the eyes of an optimist ",
        "num": 303
    },
    {
        "id": "jygwvKQalcHbkYSeKwOl",
        "createDate": {
            "seconds": 1716632703,
            "nanoseconds": 957000000
        },
        "category": "Bread and sour cream",
        "url": "https://drive.google.com/thumbnail?id=1b9xA1aTjRgC93-zasRCxLJhM5uqVvC8b&sz=w595",
        "num": 101
    },
    {
        "id": "k6vfcAHFHyngOvVQ2fTl",
        "num": 327,
        "createDate": {
            "seconds": 1716634765,
            "nanoseconds": 553000000
        },
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1dYYpeU9SS4SO199lEihnTD3X6X-Jy5U1&sz=w595"
    },
    {
        "id": "kElZeK8RNLamq1VVtm8U",
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1PG3HBLHZdOSgEsY9koP8k4_zbkARQf4e&sz=w595",
        "createDate": {
            "seconds": 1716634727,
            "nanoseconds": 740000000
        },
        "num": 325
    },
    {
        "id": "kfYTlqzdmYKZBtFzNKh2",
        "url": "https://drive.google.com/thumbnail?id=1otLQescpFg1FP7kyFoWpauht3Sofl2i-&sz=w595",
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "num": 514,
        "createDate": {
            "seconds": 1716635742,
            "nanoseconds": 992000000
        }
    },
    {
        "id": "kteS2nyiZNGOP0bf9YSK",
        "url": "https://drive.google.com/thumbnail?id=1DDsWA8_ttPVbsezdcTsvDJ7ojy0giqB6&sz=w595",
        "createDate": {
            "seconds": 1716634637,
            "nanoseconds": 431000000
        },
        "num": 321,
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "l3CdoTVa9sxvmhdhBETV",
        "num": 401,
        "url": "https://drive.google.com/thumbnail?id=1Du6Wr1bzcRZr8-fntCRbVT8d4YLa35ti&sz=w595",
        "createDate": {
            "seconds": 1716635070,
            "nanoseconds": 459000000
        },
        "category": "Breathe"
    },
    {
        "id": "lASvN8fRVMLNoPKjAR9s",
        "createDate": {
            "seconds": 1716631892,
            "nanoseconds": 932000000
        },
        "category": "Tastes of the world",
        "num": 11,
        "url": "https://drive.google.com/thumbnail?id=1NQfaaE7M6Sisw7q6UDqqOh9MeE_IEDTp&sz=w595"
    },
    {
        "id": "lpv0XJ0JPnhoSaJrMKss",
        "category": "Tastes of the world",
        "num": 14,
        "createDate": {
            "seconds": 1716631993,
            "nanoseconds": 182000000
        },
        "url": "https://drive.google.com/thumbnail?id=1PmkIXSxABTHzt7xu1blLWw2se4F6vYsu&sz=w595"
    },
    {
        "id": "mDwuHm3xO0pjY1KYJ0fP",
        "num": 421,
        "category": "Breathe",
        "url": "https://drive.google.com/thumbnail?id=1aOKUW_Nb7UHC9AVdm2i6wQ3-8_CO3Uki&sz=w595",
        "createDate": {
            "seconds": 1716635421,
            "nanoseconds": 89000000
        }
    },
    {
        "id": "mdfcSrWEGipKLWA0a7IF",
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636206,
            "nanoseconds": 866000000
        },
        "num": 605,
        "url": "https://drive.google.com/thumbnail?id=1K2ufYcnXzOuGPJB5FppURWxCXm9A_kgI&sz=w595"
    },
    {
        "id": "mjRSYm7Glka1R7Jd5zsN",
        "num": 322,
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634653,
            "nanoseconds": 922000000
        },
        "url": "https://drive.google.com/thumbnail?id=1ykfi_ItunrObexXkRnHRWmwm6_hdvTsh&sz=w595"
    },
    {
        "id": "moAfVuPZZEHXwW6eOnNt",
        "createDate": {
            "seconds": 1716633982,
            "nanoseconds": 951000000
        },
        "url": "https://drive.google.com/thumbnail?id=11Amw5N_iJz3D9d1h4sU0cCpHIHGJ7V0m&sz=w595",
        "num": 225,
        "category": "The inner light"
    },
    {
        "id": "nDhu8WGieBWnp1sOc1aN",
        "num": 603,
        "url": "https://drive.google.com/thumbnail?id=1QYkTfr9Swug0bnBEfWrSGeP4pvzGsvQ9&sz=w595",
        "createDate": {
            "seconds": 1716636056,
            "nanoseconds": 698000000
        },
        "category": "Eat, drink and love"
    },
    {
        "id": "nKI1ia4QokC5gkEHCqKx",
        "url": "https://drive.google.com/thumbnail?id=11vt97X7iqH9boYliXaOdloyza8JjVa8I&sz=w595",
        "category": "Tastes of the world",
        "num": 12,
        "createDate": {
            "seconds": 1716631954,
            "nanoseconds": 529000000
        }
    },
    {
        "id": "nkKzFOThcQ15BpWibRN9",
        "num": 623,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636510,
            "nanoseconds": 90000000
        },
        "url": "https://drive.google.com/thumbnail?id=152zI8HfubzLBNUsorpaDjwZ6xFkxiNj6&sz=w595"
    },
    {
        "id": "nlNwx5GNLtAR2UTNEUhx",
        "createDate": {
            "seconds": 1716635724,
            "nanoseconds": 345000000
        },
        "num": 512,
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "url": "https://drive.google.com/thumbnail?id=1qA7zPyP2JBaZijI7KqA9fKOkoeEiGvc5&sz=w595"
    },
    {
        "id": "oNkRdf24DGaEZ9SotF1U",
        "category": "The inner light",
        "num": 203,
        "createDate": {
            "seconds": 1716633341,
            "nanoseconds": 548000000
        },
        "url": "https://drive.google.com/thumbnail?id=15TxzYLenELUhK1fQcyxOw-KeXMVVeAio&sz=w595"
    },
    {
        "id": "ouaSejzYFVP5wSJsqTHh",
        "num": 207,
        "url": "https://drive.google.com/thumbnail?id=1EabwAMX9ZHqNgFZJW3nlu-LJ66osZOjO&sz=w595",
        "createDate": {
            "seconds": 1716633429,
            "nanoseconds": 854000000
        },
        "category": "The inner light"
    },
    {
        "id": "p2lHxZbHHMck3AO2XP61",
        "createDate": {
            "seconds": 1716633282,
            "nanoseconds": 209000000
        },
        "num": 201,
        "category": "The inner light",
        "url": "https://drive.google.com/thumbnail?id=1iYDi0pJTN6WViBUgkqX3dqP3RIe6sqy-&sz=w595"
    },
    {
        "id": "paL72rPlERl5rR5D7IBb",
        "category": "The world around us through the eyes of an optimist ",
        "num": 318,
        "createDate": {
            "seconds": 1716634586,
            "nanoseconds": 859000000
        },
        "url": "https://drive.google.com/thumbnail?id=1-Z8fWKsTpdvYQHoCULR2EvRKBa4nv4Vr&sz=w595"
    },
    {
        "id": "qMuUfX0e7s12r8Ne5FEn",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634663,
            "nanoseconds": 98000000
        },
        "num": 323,
        "url": "https://drive.google.com/thumbnail?id=1M3ZJkPGnlhw3aTh32mMTX7OaCqNYl1tW&sz=w595"
    },
    {
        "id": "r1vZfjg4cNQlZPekjbcl",
        "createDate": {
            "seconds": 1716636360,
            "nanoseconds": 604000000
        },
        "num": 615,
        "url": "https://drive.google.com/thumbnail?id=1SxMGJaA-Osx_8maUaW05fG1AKrqPvi0b&sz=w595",
        "category": "Eat, drink and love"
    },
    {
        "id": "rBzFhCi3TSCPXF2vAo7e",
        "url": "https://drive.google.com/thumbnail?id=19QYI_7ycjRHgljopkFXAnOXitHBWB9rl&sz=w595",
        "num": 608,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636240,
            "nanoseconds": 645000000
        }
    },
    {
        "id": "srJdGuDRQgaAinhHqr2L",
        "num": 329,
        "url": "https://drive.google.com/thumbnail?id=1EpZkwdqNijAOCjS5VXOCpioPun5wYoIG&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634789,
            "nanoseconds": 932000000
        }
    },
    {
        "id": "tLNPl0IbQ7dU3ikNqiQj",
        "category": "The world around us through the eyes of an optimist ",
        "url": "https://drive.google.com/thumbnail?id=1NLqhjn6yA1OOMkz5eeHZm5K9NAeY0koa&sz=w595",
        "createDate": {
            "seconds": 1716634346,
            "nanoseconds": 85000000
        },
        "num": 305
    },
    {
        "id": "uFSUmuck1lPRXi4kGYEx",
        "num": 617,
        "createDate": {
            "seconds": 1716636385,
            "nanoseconds": 810000000
        },
        "url": "https://drive.google.com/thumbnail?id=1SluxjD9_LRP7iJHCi5RYxfx_jVrC5hWa&sz=w595",
        "category": "Eat, drink and love"
    },
    {
        "id": "v1tgHNH78ZM3344XcTYR",
        "num": 630,
        "category": "Eat, drink and love",
        "createDate": {
            "seconds": 1716636569,
            "nanoseconds": 584000000
        },
        "url": "https://drive.google.com/thumbnail?id=15rop_wzMxsQaXOIcNQpCEQznaMVaZAeA&sz=w595"
    },
    {
        "id": "v5GehgIXgbuGvWrIXoHM",
        "num": 21,
        "category": "Tastes of the world",
        "url": "https://drive.google.com/thumbnail?id=1aYbNvymKdOWvQOqznZC4UeyLwY9EGHEf&sz=w595",
        "createDate": {
            "seconds": 1716632311,
            "nanoseconds": 463000000
        }
    },
    {
        "id": "vfOwhb9STWudcAbIGfNq",
        "category": "Tastes of the world",
        "url": "https://drive.google.com/thumbnail?id=16HiNe-_fxjP5Ag57VMMpX9HA_BxOJYi1&sz=w595",
        "createDate": {
            "seconds": 1716630934,
            "nanoseconds": 32000000
        },
        "num": 5
    },
    {
        "id": "vtsaUMGOgHUG70acW8c1",
        "url": "https://drive.google.com/thumbnail?id=1VBNUCJaGb6vzPAxf6hEbDDU5qQUrORpe&sz=w595",
        "num": 423,
        "createDate": {
            "seconds": 1716635446,
            "nanoseconds": 875000000
        },
        "category": "Breathe"
    },
    {
        "id": "vv3vpzbSFreUYlRUPPBS",
        "url": "https://drive.google.com/thumbnail?id=19pa6CXJ2M297SlqglH1yxuu0r1XJd5qp&sz=w595",
        "num": 521,
        "category": "My inner monster (sour, sad, spicy, bitter, cheerful or sweet)",
        "createDate": {
            "seconds": 1716635818,
            "nanoseconds": 433000000
        }
    },
    {
        "id": "w5uTHMtHQSETR3lj7QNo",
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634413,
            "nanoseconds": 117000000
        },
        "url": "https://drive.google.com/thumbnail?id=1GnKfwOrdSX36Sg9IPeSz3LzMLh8pO8p1&sz=w595",
        "num": 309
    },
    {
        "id": "wWNEM8QJFbCU9LctbUs6",
        "url": "https://drive.google.com/thumbnail?id=1DpCX5IhWeYzvB6HZt4v42GWUXU861EAb&sz=w595",
        "category": "Breathe",
        "num": 416,
        "createDate": {
            "seconds": 1716635344,
            "nanoseconds": 897000000
        }
    },
    {
        "id": "wfQRWKR3P2gO4K2P50v7",
        "createDate": {
            "seconds": 1716634541,
            "nanoseconds": 179000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Dvm7Ne8hHiKWl3OInbJOZsqnEMzFuVaZ&sz=w595",
        "category": "The world around us through the eyes of an optimist ",
        "num": 316
    },
    {
        "id": "xHW4KqsIjBmbzK6vyPU7",
        "num": 324,
        "category": "The world around us through the eyes of an optimist ",
        "createDate": {
            "seconds": 1716634702,
            "nanoseconds": 6000000
        },
        "url": "https://drive.google.com/thumbnail?id=10RPh5sPw_zB7kDbH-Yi9q37SflL3hDhr&sz=w595"
    },
    {
        "id": "xemNhNHMHsRL4b3mmWYV",
        "url": "https://drive.google.com/thumbnail?id=1vTZwCyzlTa24LyH6_1do8uMJW_eFRlq0&sz=w595",
        "category": "Breathe",
        "num": 409,
        "createDate": {
            "seconds": 1716635277,
            "nanoseconds": 0
        }
    },
    {
        "id": "yAFMXAy5zkXjv72QvLGi",
        "num": 10,
        "url": "https://drive.google.com/thumbnail?id=12jwgA9P66zP5etoofo-0mQfCQ1ElgMK1&sz=w595",
        "createDate": {
            "seconds": 1716631835,
            "nanoseconds": 474000000
        },
        "category": "Tastes of the world"
    },
    {
        "id": "ykoD3qPtJ8fJr9QjO9Vl",
        "category": "Eat, drink and love",
        "url": "https://drive.google.com/thumbnail?id=1awKCF2vF9rbwGiEmjy-zCbl74p3Cq1d4&sz=w595",
        "createDate": {
            "seconds": 1716636377,
            "nanoseconds": 608000000
        },
        "num": 616
    },
    {
        "id": "yuwsaIEFCZmlPkDIfbf9",
        "category": "The inner light",
        "createDate": {
            "seconds": 1716633864,
            "nanoseconds": 678000000
        },
        "num": 222,
        "url": "https://drive.google.com/thumbnail?id=1JHsxSfSnjrbk0LCLWeuR38Py4C7d8V2I&sz=w595"
    },
    {
        "id": "zLziAX0Tu089pEaOUoFa",
        "createDate": {
            "seconds": 1716633050,
            "nanoseconds": 747000000
        },
        "num": 108,
        "url": "https://drive.google.com/thumbnail?id=1MRKsqSY4hO8IQng8QXxhPbmoNHSxg_fn&sz=w595",
        "category": "Bread and sour cream"
    },
    {
        "id": "zRigUYoZeZG7hLcxRiRz",
        "createDate": {
            "seconds": 1716634566,
            "nanoseconds": 918000000
        },
        "num": 317,
        "url": "https://drive.google.com/thumbnail?id=1LIng9S3AW1mO-1NMcR6Jq2OT7etYSo0f&sz=w595",
        "category": "The world around us through the eyes of an optimist "
    },
    {
        "id": "zZzL7zYRL0toyrxeRxFL",
        "num": 424,
        "createDate": {
            "seconds": 1716635457,
            "nanoseconds": 847000000
        },
        "url": "https://drive.google.com/thumbnail?id=1c5bFSxgiwnpktmmqqCNgJOtIqXbLDuk9&sz=w595",
        "category": "Breathe"
    }
];

const result = [
    {
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 17,
        "url": "https://drive.google.com/thumbnail?id=1QCETa_CjIM50diLumj-rSLf3IWYavXNn&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 1,
        "2": 3,
        "3": 2,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 1,
        "url": "https://drive.google.com/thumbnail?id=1RaF1sy-u7odmTQ6aATx2GYD3-GCcqacB&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 1,
        "5": 3,
        "6": 2,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 3,
        "11": 3,
        "imageNum": 304,
        "url": "https://drive.google.com/thumbnail?id=1G84iKSLxTPeelJQxieBeCtSY9FDmna5r&sz=w595",
        "middleK": "2.455"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 621,
        "url": "https://drive.google.com/thumbnail?id=1JLITuaOis3i4xlLsqCPHnxt6x3u1kXEh&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 3,
        "2": 2,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 2,
        "7": 2,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 337,
        "url": "https://drive.google.com/thumbnail?id=1D2tS1zKyceKfW2xEm_mwuTdrsgjS_Pos&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 227,
        "url": "https://drive.google.com/thumbnail?id=1CqJoo1K4DPZtKi3YwuP1B4xFEDZqozuP&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 2,
        "2": 2,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 1,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 206,
        "url": "https://drive.google.com/thumbnail?id=1qOaUByf_3CzdSb2ZPe3ZI5spYwARp5am&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 2,
        "7": 3,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 202,
        "url": "https://drive.google.com/thumbnail?id=1HFWEJkp_Sy_GcFvA-eHOT-BUJ8vrUK-H&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 1,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 415,
        "url": "https://drive.google.com/thumbnail?id=1UDwBZIyi8h5CoryJZxihvXngx3ca5s_6&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 3,
        "2": 3,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 609,
        "url": "https://drive.google.com/thumbnail?id=1YUvlAeCE6SqCEtVP9MkOPqMjAHYhUjJa&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 1,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 2,
        "imageNum": 229,
        "url": "https://drive.google.com/thumbnail?id=1GFefvyxagPV8JF_Kjs27Xc0RqETiazb4&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 518,
        "url": "https://drive.google.com/thumbnail?id=11fQJ4uFjxqXlnTj19jlij9Ha4g1x9Eqx&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 508,
        "url": "https://drive.google.com/thumbnail?id=1vdLHzzyWPsTh24swnHPZIi658cz6aELs&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 16,
        "url": "https://drive.google.com/thumbnail?id=1ywXDAJpmFNRoXPVMiXGROM4fhnPPWBxg&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 413,
        "url": "https://drive.google.com/thumbnail?id=17AUfHxlKBeGG6qMjy92pDF445WBcixfT&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 1,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 3,
        "11": 3,
        "imageNum": 341,
        "url": "https://drive.google.com/thumbnail?id=1jBIiT-wB1zisfiNesiG4ikwofP7qyJF-&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 3,
        "11": 0,
        "imageNum": 218,
        "url": "https://drive.google.com/thumbnail?id=1R8I9WjWtgkQW_c0IwQqTEA0VFOxe3uH7&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 501,
        "url": "https://drive.google.com/thumbnail?id=1HDVdp8FKZdZUKEdxBXLV3HsVZcCz2pya&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 2,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 505,
        "url": "https://drive.google.com/thumbnail?id=1HvL86ATT7Icd82C3_cU8501t6POebnGB&sz=w595",
        "middleK": "2.273"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 0,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 15,
        "url": "https://drive.google.com/thumbnail?id=1LmpEcup9IoVPoQVz1STct-d2wCNwgPXh&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 614,
        "url": "https://drive.google.com/thumbnail?id=1X6oSbr2e_-gndYks2B8FoqeWKtpwfL4u&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 2,
        "11": 2,
        "imageNum": 319,
        "url": "https://drive.google.com/thumbnail?id=1Gyt9jQWRP1zFE9hYyuQtQq8uRl7gG9xf&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 1,
        "2": 2,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 2,
        "7": 1,
        "8": 3,
        "9": 2,
        "10": 3,
        "11": 2,
        "imageNum": 313,
        "url": "https://drive.google.com/thumbnail?id=16i9EY_CXj3jiqMNVy34lIi1slrMYozo9&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 2,
        "imageNum": 504,
        "url": "https://drive.google.com/thumbnail?id=1-x_z09pNevybAxBVCGNnK5nSUj5A9p8s&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 2,
        "11": 0,
        "imageNum": 332,
        "url": "https://drive.google.com/thumbnail?id=1ujp8MqQFzxVrEfet4ipKfBiqktsybqz6&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 1,
        "7": 1,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 226,
        "url": "https://drive.google.com/thumbnail?id=176JJyGnVi8Otrl1SF7wqn13bnZAqfHDt&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 507,
        "url": "https://drive.google.com/thumbnail?id=1Z-iAbVMDxUdm69N17bkKVl-QS17lJ972&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 25,
        "url": "https://drive.google.com/thumbnail?id=1Z6vwa8mA_SAvXfrv9DlvXntrvVaNwudn&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 27,
        "url": "https://drive.google.com/thumbnail?id=1Y65LfcKXc24Rt1SW_bTWgbH2muj-KfI6&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 3,
        "10": 3,
        "11": 2,
        "imageNum": 19,
        "url": "https://drive.google.com/thumbnail?id=1EAvoOiqWRBvpgfZSYpbZJG6jZc2XpimQ&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 0,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 419,
        "url": "https://drive.google.com/thumbnail?id=1Xmr9FTo4BMfZOy23jNE6R21YAdwCgWQ1&sz=w595",
        "middleK": "0.545"
    },
    {
        "1": 0,
        "2": 3,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 527,
        "url": "https://drive.google.com/thumbnail?id=1u6TNnNV53Zb33ic8uC_tOkI8_FDF6kTt&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 2,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 0,
        "6": 2,
        "7": 1,
        "8": 3,
        "9": 2,
        "10": 3,
        "11": 2,
        "imageNum": 412,
        "url": "https://drive.google.com/thumbnail?id=1Z4IxvZPsZuE1f_ydRj8h3ofsrfPP1Tjg&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 328,
        "url": "https://drive.google.com/thumbnail?id=1va8mNSi3gcJfpsw7eawi0sReEsxbhE8N&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 418,
        "url": "https://drive.google.com/thumbnail?id=1CQP9ZHS4QsyZRMgR-J3KipcUVMjNjmja&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 2,
        "6": 1,
        "7": 2,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 525,
        "url": "https://drive.google.com/thumbnail?id=1cxLyRsG0GTF8BN-PjC1ee5eMoapZ7VB-&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 1,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 515,
        "url": "https://drive.google.com/thumbnail?id=1FG9Yob1RXkyP7dmEhhJ_n2c6eSQ3uSXZ&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 306,
        "url": "https://drive.google.com/thumbnail?id=1KX5DaKzgxidfd2A9wH6fJwlgRbuhiZq3&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 0,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 526,
        "url": "https://drive.google.com/thumbnail?id=1FVsiwY1Brx9YSAak2X5HoH0DvZwiZpIc&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 1,
        "2": 3,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 3,
        "imageNum": 509,
        "url": "https://drive.google.com/thumbnail?id=1D_j66MUUU0uLIlvntXptveNzNjHH2mUk&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 2,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 2,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 411,
        "url": "https://drive.google.com/thumbnail?id=1ly3XPa_u2bZ4V7Rdif65EQq7pjKY6odd&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 3,
        "11": 0,
        "imageNum": 335,
        "url": "https://drive.google.com/thumbnail?id=1kIP3IERRrcvz3aDjJTt7Eseq_RGpXYXz&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 3,
        "11": 0,
        "imageNum": 330,
        "url": "https://drive.google.com/thumbnail?id=1Q-qpW6HAWGiDkGqTvYrvQDnvqnzkD_Z6&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 107,
        "url": "https://drive.google.com/thumbnail?id=1P65Opoo2t371AQdb14zi83NfJhlUCCTb&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 519,
        "url": "https://drive.google.com/thumbnail?id=1j_YxqIvK-Y-kxqAhfnXK3nlW1sFrKcDA&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 626,
        "url": "https://drive.google.com/thumbnail?id=1VT0M0w59F0h0emQeEIqcqjPpn4RzxDvB&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 338,
        "url": "https://drive.google.com/thumbnail?id=1dE2CIYRVXMd5Cw9OTvBlPAHB8t0VKGio&sz=w595",
        "middleK": "2.273"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 219,
        "url": "https://drive.google.com/thumbnail?id=1Sx1xdDpCkVsOjFgKD4a8BewKvEQJriwp&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 618,
        "url": "https://drive.google.com/thumbnail?id=1oyy2B-zo8CjFH78ZnL_cv8fA3TLT39Ys&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 0,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 1,
        "6": 1,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 3,
        "11": 0,
        "imageNum": 209,
        "url": "https://drive.google.com/thumbnail?id=1pVbI508EbDvwis4POJlQScdQf5_qMuJ8&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 2,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 414,
        "url": "https://drive.google.com/thumbnail?id=1tDGHG6t1sGCMMMTyARvsGAOhvsv0wftn&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 2,
        "10": 2,
        "11": 0,
        "imageNum": 410,
        "url": "https://drive.google.com/thumbnail?id=1AmDynpsbSQkzs7J_vZJuegp6ZcgiZcNV&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 502,
        "url": "https://drive.google.com/thumbnail?id=1T3IdJhAYEmCrZ9-SxWQfPy3ZJVIehZMK&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 1,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 1,
        "8": 3,
        "9": 2,
        "10": 1,
        "11": 2,
        "imageNum": 606,
        "url": "https://drive.google.com/thumbnail?id=1hoGIotIYDJ60udLU_agKbKf7xSxx7YiJ&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 204,
        "url": "https://drive.google.com/thumbnail?id=1Od7Y_ug6TotTKJngqP-8s6Jxwtv3Dslj&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 510,
        "url": "https://drive.google.com/thumbnail?id=1vFNsBZOSMbtMyR45FQc5mSzot3fm-EAV&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 3,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 624,
        "url": "https://drive.google.com/thumbnail?id=1rTZceblaxxtqYXWHm3NZmRdhmsk85nlu&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 1,
        "8": 3,
        "9": 2,
        "10": 3,
        "11": 3,
        "imageNum": 320,
        "url": "https://drive.google.com/thumbnail?id=1menExqvcghSLvHdK0HJ9imw76DD38Fo5&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 334,
        "url": "https://drive.google.com/thumbnail?id=1KNlZO6aUi23GA7rI04Zti8m3rMlF7fcr&sz=w595",
        "middleK": "0.636"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 628,
        "url": "https://drive.google.com/thumbnail?id=1ELDO82Ue4qYKyMpO_3T_JlX8nK6KRhOT&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 1,
        "2": 3,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 311,
        "url": "https://drive.google.com/thumbnail?id=1Y_ozOo-YQEFxtB2tusBjYxFSAVo9pqg3&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 407,
        "url": "https://drive.google.com/thumbnail?id=1p3WncstisYJiSLm1LrXYRMa-DuuoLZgF&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 1,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 1,
        "imageNum": 213,
        "url": "https://drive.google.com/thumbnail?id=1zXfoiBwB0h42fBNQrp0GaTIb7Ryu_g4Y&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 0,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 216,
        "url": "https://drive.google.com/thumbnail?id=1KDKMeZ-8Rk7nuEjL2vszercWYLEsKIl0&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 214,
        "url": "https://drive.google.com/thumbnail?id=1lG_-g_04Wr1LSh-slqH0w_yug7t5It1S&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 1,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 1,
        "7": 1,
        "8": 3,
        "9": 1,
        "10": 0,
        "11": 2,
        "imageNum": 24,
        "url": "https://drive.google.com/thumbnail?id=1J72yWm9q8tswqd3ew107OQIaQsQGPm9d&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 1,
        "10": 3,
        "11": 1,
        "imageNum": 22,
        "url": "https://drive.google.com/thumbnail?id=1w55pb5PLqUjXZBvaChaBcOC0-oL9_yYj&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 2,
        "6": 2,
        "7": 2,
        "8": 1,
        "9": 2,
        "10": 3,
        "11": 1,
        "imageNum": 7,
        "url": "https://drive.google.com/thumbnail?id=16sOXYrBgLSChr5YiK9Jpde9FrspCJKU6&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 2,
        "9": 1,
        "10": 3,
        "11": 0,
        "imageNum": 405,
        "url": "https://drive.google.com/thumbnail?id=1zcs_n-GOL8FquW3oM6UNTyztNqesx0Lf&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 1,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 331,
        "url": "https://drive.google.com/thumbnail?id=1bjkb_GaxYkUEQD6jRJynXYN2WXYDgmI1&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 1,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 417,
        "url": "https://drive.google.com/thumbnail?id=1-cvl35jwSdOt9jZBEEmT7NJu8xl6eYRZ&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 301,
        "url": "https://drive.google.com/thumbnail?id=1emeKpNMHAy5pPxAK-fVR4vZu9ZE-BhrX&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 0,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 2,
        "imageNum": 422,
        "url": "https://drive.google.com/thumbnail?id=1Wsj_f19Z9h0G9qEhyXYJoViamJXpa6CJ&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 1,
        "5": 0,
        "6": 1,
        "7": 2,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 342,
        "url": "https://drive.google.com/thumbnail?id=1Z-_SLyAJk-ijPCzV05x5lQn1_6nNth0f&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 1,
        "2": 3,
        "3": 3,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "8": 3,
        "9": 3,
        "10": 3,
        "11": 2,
        "imageNum": 610,
        "url": "https://drive.google.com/thumbnail?id=14SyZ5qCCSC7UOX22Fv1aM0SDqwCU6pUV&sz=w595",
        "middleK": "2.273"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 629,
        "url": "https://drive.google.com/thumbnail?id=1mvabYJrNpxe0s305YqepqrsoIhbCt0KD&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 604,
        "url": "https://drive.google.com/thumbnail?id=1RstEvE3S34DjmOqZo8Mbay9tzliXu2pF&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 1,
        "5": 0,
        "6": 2,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 522,
        "url": "https://drive.google.com/thumbnail?id=1CEathxJEGON_CS0sCdqfZncCTEiMNL2F&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 620,
        "url": "https://drive.google.com/thumbnail?id=1x6-UMMrkDLra8oS0cDSs2Dko88rBtuI1&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 3,
        "2": 3,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 1,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 2,
        "imageNum": 307,
        "url": "https://drive.google.com/thumbnail?id=19V2JhuNokOkP0gMTwcAcKyehQ4JDi66a&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 2,
        "2": 3,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 1,
        "10": 3,
        "11": 3,
        "imageNum": 6,
        "url": "https://drive.google.com/thumbnail?id=1oqq9ZOTCzWcOaUfeA_gStHm9VdVxls3r&sz=w595",
        "middleK": "2.273"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 302,
        "url": "https://drive.google.com/thumbnail?id=1AOR1pfBtfex4cPRAsuLSytH1w1SGdj8X&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 0,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 2,
        "url": "https://drive.google.com/thumbnail?id=1jzaZFdTvcDtcUWNQZlWVxgfBH-HvlOur&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 601,
        "url": "https://drive.google.com/thumbnail?id=161waQnPr1zjvs3M9Bpm-UO-r2oRpESbZ&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 1,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 340,
        "url": "https://drive.google.com/thumbnail?id=1nla9-v_2L7BoB7XOHe6TWTII2Ji2yOPo&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 1,
        "7": 2,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 315,
        "url": "https://drive.google.com/thumbnail?id=1to6aZfyk2BxQjErS2G9y-Sm5m5g6Po7P&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 3,
        "6": 1,
        "7": 1,
        "8": 0,
        "9": 3,
        "10": 3,
        "11": 0,
        "imageNum": 217,
        "url": "https://drive.google.com/thumbnail?id=1hh5zJbQVXwiSqfhdS24FKD8MgJCGWCiV&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 3,
        "6": 1,
        "7": 2,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 2,
        "imageNum": 223,
        "url": "https://drive.google.com/thumbnail?id=1wFeF-2JWP1HJNoEwgz3Ec6lO-tWC872t&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 3,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 513,
        "url": "https://drive.google.com/thumbnail?id=1uBoToxqzEjE7dIMcTzuPxhDs_S5cIQdO&sz=w595",
        "middleK": "0.727"
    },
    {
        "1": 1,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 1,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 602,
        "url": "https://drive.google.com/thumbnail?id=1HiFGYQopvQSUWo56Lh_4fGEQbMClfnNb&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 2,
        "9": 1,
        "10": 2,
        "11": 1,
        "imageNum": 8,
        "url": "https://drive.google.com/thumbnail?id=196yHomhaueXmPIXntOkEz0guN5hf9iEQ&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 314,
        "url": "https://drive.google.com/thumbnail?id=11fHH4_srtd8QMIFctEG_QKiIf0bB8DI7&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 224,
        "url": "https://drive.google.com/thumbnail?id=1z5yPwZLNRgA7IMgOeyLoVcj3AwK3KU6s&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 3,
        "2": 3,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 1,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 613,
        "url": "https://drive.google.com/thumbnail?id=1xaSDLvLbIpjnrsPWLUv3R4xeh1KvzQR-&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 3,
        "11": 2,
        "imageNum": 516,
        "url": "https://drive.google.com/thumbnail?id=19zliRpJa9GNDQ2t8NxBHDjjCjxV8IRmB&sz=w595",
        "middleK": "2.545"
    },
    {
        "1": 3,
        "2": 1,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 2,
        "7": 2,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 2,
        "imageNum": 520,
        "url": "https://drive.google.com/thumbnail?id=1wqxgrZ0AloUYNkm63XDa8ZFJ8FXmb-0_&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 221,
        "url": "https://drive.google.com/thumbnail?id=1CHazsZLK_ziNbV4GMnY0Qv43Re-yMpfu&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "8": 0,
        "9": 2,
        "10": 3,
        "11": 0,
        "imageNum": 310,
        "url": "https://drive.google.com/thumbnail?id=1FVbW73z7DVk3-XBAcAa8cYsG6oEZz7jf&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 1,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 312,
        "url": "https://drive.google.com/thumbnail?id=1yKaI0Ix1bz8frnwxsxPZA-WAHgp-yPje&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 3,
        "11": 0,
        "imageNum": 402,
        "url": "https://drive.google.com/thumbnail?id=1as2BOIUXqwpYHRz83OukJpUyQVEwIExu&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 619,
        "url": "https://drive.google.com/thumbnail?id=1YBKNMOPf-XjLGHhESAJVX_gVCxYV68nS&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 3,
        "url": "https://drive.google.com/thumbnail?id=1ZYLYAJCITqBKff6lakYxcpGz7vTsL2nS&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 26,
        "url": "https://drive.google.com/thumbnail?id=1nhIdcjGYu_F992v9utfQjndVUE2_AWUP&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 208,
        "url": "https://drive.google.com/thumbnail?id=1wcI08A4UTpbzycPQ1IZ7MHdHRTS9YbFR&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 215,
        "url": "https://drive.google.com/thumbnail?id=1TGFjgXgJ7JmN1BgOl6NZVeYTWO3KCuY-&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 103,
        "url": "https://drive.google.com/thumbnail?id=1IxFAhfn-O6FAAKd_cENEUpWk2KYa3OO9&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 420,
        "url": "https://drive.google.com/thumbnail?id=1_pXGNFfb-puG_m53ogWkurv01Jt8wi8-&sz=w595",
        "middleK": "0.545"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 403,
        "url": "https://drive.google.com/thumbnail?id=18ozsCrklwbM176z2qbieqz1BM5LxVt3t&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 511,
        "url": "https://drive.google.com/thumbnail?id=1GV_mEgT8Z0I0DUhFHue4gYE1Wm7BTF19&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 2,
        "imageNum": 611,
        "url": "https://drive.google.com/thumbnail?id=1q0CpLXr7iDt5fzwEc1oBr9A1Ziy2NG0-&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 1,
        "7": 2,
        "8": 1,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 231,
        "url": "https://drive.google.com/thumbnail?id=1w4QzmsLQfG2NMoLf6179jHITbKUj6CDp&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 1,
        "7": 1,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 336,
        "url": "https://drive.google.com/thumbnail?id=1YVKffPHx9Jbt-DvBTrSW1Gq2iuc6ZdnB&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 2,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 9,
        "url": "https://drive.google.com/thumbnail?id=1zLL7fijJEdQe1uHz8JMMe5_vSBUUj_xJ&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 4,
        "url": "https://drive.google.com/thumbnail?id=1wLhRVX1w7kXoBgnIkMLC_0MgrMFSz77b&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 228,
        "url": "https://drive.google.com/thumbnail?id=1g-VHRXdpk98Bxd-Vbol9442lukh3oFno&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 408,
        "url": "https://drive.google.com/thumbnail?id=13v4ohyqCMwdOuwNvRqbeblqaAMSkI8up&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 339,
        "url": "https://drive.google.com/thumbnail?id=1t5-lUGnwT-1rWQFqP30LQTNffa4ENucf&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 23,
        "url": "https://drive.google.com/thumbnail?id=1vsi5UlF37RGTHG8KY3evxB6Wq16fasSV&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 1,
        "imageNum": 109,
        "url": "https://drive.google.com/thumbnail?id=1c_lng62zei7qZf3sp4DWFeuVdT20-62y&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 1,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 2,
        "imageNum": 20,
        "url": "https://drive.google.com/thumbnail?id=1sod7pg0thubo8mvHU1YMCawBmzQiXJPw&sz=w595",
        "middleK": "2.091"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 0,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 105,
        "url": "https://drive.google.com/thumbnail?id=1TWZYwQ9UBI5j9a2fDfWYq3XjuUY_YKzA&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 205,
        "url": "https://drive.google.com/thumbnail?id=11vvQ_r9kezBrrxRU1QNzomxP15Sx_qch&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 2,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 3,
        "imageNum": 308,
        "url": "https://drive.google.com/thumbnail?id=1KTOSBnwF7VlfWfJ8MVXD8N8CAYg5zwGM&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 220,
        "url": "https://drive.google.com/thumbnail?id=1f0Aeicl0czKAKMQbHTMyZzOnG82ELabB&sz=w595",
        "middleK": "2.273"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 612,
        "url": "https://drive.google.com/thumbnail?id=16qTFYJng9qAWp8p02eK2oR_UPBsES_CA&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 503,
        "url": "https://drive.google.com/thumbnail?id=1CE-RS4McSsFDAR-WqRdc0esdqdUCCg1h&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 2,
        "6": 2,
        "7": 1,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 425,
        "url": "https://drive.google.com/thumbnail?id=175i97DGXcxcWQmbUSCfYnpoK_PZOrymE&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 13,
        "url": "https://drive.google.com/thumbnail?id=1S-oQaXU6QtWAJh60_S_jbcMaEgHkCTog&sz=w595",
        "middleK": "0.727"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 2,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 631,
        "url": "https://drive.google.com/thumbnail?id=1rkUJH2aTjjBtNfNQcJsTnLBI6pTvlhUm&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 0,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 506,
        "url": "https://drive.google.com/thumbnail?id=1gazvfZ2CLwCyk31MRmWDglJxTEdGPrmM&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 517,
        "url": "https://drive.google.com/thumbnail?id=114uJ9eiGpidDU65u6NQj59EsH95rx2cS&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 212,
        "url": "https://drive.google.com/thumbnail?id=1XBOn0fjilPzWaF04IgGZgsKpMtiOeiUo&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 622,
        "url": "https://drive.google.com/thumbnail?id=1WZnghVDorZr6G2nFjwx7f4hG25wUKLNM&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 3,
        "11": 3,
        "imageNum": 627,
        "url": "https://drive.google.com/thumbnail?id=1PfEabzEa-4BgRciCJ7w4SpYYUXXRdgSd&sz=w595",
        "middleK": "2.091"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 1,
        "10": 3,
        "11": 2,
        "imageNum": 333,
        "url": "https://drive.google.com/thumbnail?id=1QA_tyVF6GgYRXMUG13CDBUiZBT1b5TIe&sz=w595",
        "middleK": "2.455"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 1,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 18,
        "url": "https://drive.google.com/thumbnail?id=196i85sD-eCRAWNuS8QucWPhkeiLVcowe&sz=w595",
        "middleK": "2.091"
    },
    {
        "1": 0,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 2,
        "9": 1,
        "10": 3,
        "11": 0,
        "imageNum": 102,
        "url": "https://drive.google.com/thumbnail?id=1oAH0eag3o-LmP2cmtpAfIyX6jNIlyUms&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 106,
        "url": "https://drive.google.com/thumbnail?id=1zf-ukxN7FWTy76YToLvCtsb-PjRTQuOv&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 523,
        "url": "https://drive.google.com/thumbnail?id=1wIIvtOpDzGqUPUZfSqb69efzyJyrgYtA&sz=w595",
        "middleK": "1.273"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 1,
        "8": 1,
        "9": 2,
        "10": 3,
        "11": 1,
        "imageNum": 326,
        "url": "https://drive.google.com/thumbnail?id=1J4CRbNx2QSc_K2hLzQJkyc8NaDCRFXCn&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 3,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 625,
        "url": "https://drive.google.com/thumbnail?id=1Vvqo88kxCoDnhZIwG4PcWYGl3f0rnpM2&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 3,
        "11": 2,
        "imageNum": 607,
        "url": "https://drive.google.com/thumbnail?id=1tVTeg766Jq3fmZTlvt-oyT_C01b3dzvF&sz=w595",
        "middleK": "2.364"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 404,
        "url": "https://drive.google.com/thumbnail?id=1WZjrgjlvi7_NbRVIdWonRBeIqbdG0D3o&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 1,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 211,
        "url": "https://drive.google.com/thumbnail?id=1aDKejQ98LpOW57210b-rfX7YLfDgBymm&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 406,
        "url": "https://drive.google.com/thumbnail?id=1WyQURWoJ6jJqbuH8l3N_hfp5t45Yfxya&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 2,
        "3": 0,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 2,
        "11": 0,
        "imageNum": 210,
        "url": "https://drive.google.com/thumbnail?id=1QkB1wvy7-XWTgJ8ZzWqGjDJqAKe9qXQJ&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 0,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 524,
        "url": "https://drive.google.com/thumbnail?id=1kucyPx305Le02hCLL-UWmN21rywWntSO&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 0,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 104,
        "url": "https://drive.google.com/thumbnail?id=18_-_zlw-_wuzQ60s0gvYTDh82YkkJsgZ&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 230,
        "url": "https://drive.google.com/thumbnail?id=1Sf6UF_eFRglSFQVAaNiSE_crvOF7SfTT&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 3,
        "2": 3,
        "3": 2,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 2,
        "imageNum": 303,
        "url": "https://drive.google.com/thumbnail?id=1eu7pZiK6YFc28cKvN7PANe_ABN2oP4Ci&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 101,
        "url": "https://drive.google.com/thumbnail?id=1b9xA1aTjRgC93-zasRCxLJhM5uqVvC8b&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 327,
        "url": "https://drive.google.com/thumbnail?id=1dYYpeU9SS4SO199lEihnTD3X6X-Jy5U1&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 325,
        "url": "https://drive.google.com/thumbnail?id=1PG3HBLHZdOSgEsY9koP8k4_zbkARQf4e&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 514,
        "url": "https://drive.google.com/thumbnail?id=1otLQescpFg1FP7kyFoWpauht3Sofl2i-&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 2,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 1,
        "8": 0,
        "9": 2,
        "10": 2,
        "11": 3,
        "imageNum": 321,
        "url": "https://drive.google.com/thumbnail?id=1DDsWA8_ttPVbsezdcTsvDJ7ojy0giqB6&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 401,
        "url": "https://drive.google.com/thumbnail?id=1Du6Wr1bzcRZr8-fntCRbVT8d4YLa35ti&sz=w595",
        "middleK": "2.091"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 11,
        "url": "https://drive.google.com/thumbnail?id=1NQfaaE7M6Sisw7q6UDqqOh9MeE_IEDTp&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 2,
        "2": 1,
        "3": 2,
        "4": 2,
        "5": 0,
        "6": 2,
        "7": 2,
        "8": 1,
        "9": 2,
        "10": 0,
        "11": 2,
        "imageNum": 14,
        "url": "https://drive.google.com/thumbnail?id=1PmkIXSxABTHzt7xu1blLWw2se4F6vYsu&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 421,
        "url": "https://drive.google.com/thumbnail?id=1aOKUW_Nb7UHC9AVdm2i6wQ3-8_CO3Uki&sz=w595",
        "middleK": "1.364"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 605,
        "url": "https://drive.google.com/thumbnail?id=1K2ufYcnXzOuGPJB5FppURWxCXm9A_kgI&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 1,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 322,
        "url": "https://drive.google.com/thumbnail?id=1ykfi_ItunrObexXkRnHRWmwm6_hdvTsh&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 1,
        "7": 3,
        "8": 1,
        "9": 1,
        "10": 0,
        "11": 0,
        "imageNum": 225,
        "url": "https://drive.google.com/thumbnail?id=11Amw5N_iJz3D9d1h4sU0cCpHIHGJ7V0m&sz=w595",
        "middleK": "0.727"
    },
    {
        "1": 3,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 603,
        "url": "https://drive.google.com/thumbnail?id=1QYkTfr9Swug0bnBEfWrSGeP4pvzGsvQ9&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 0,
        "8": 3,
        "9": 1,
        "10": 3,
        "11": 2,
        "imageNum": 12,
        "url": "https://drive.google.com/thumbnail?id=11vt97X7iqH9boYliXaOdloyza8JjVa8I&sz=w595",
        "middleK": "1.727"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 623,
        "url": "https://drive.google.com/thumbnail?id=152zI8HfubzLBNUsorpaDjwZ6xFkxiNj6&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 1,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 512,
        "url": "https://drive.google.com/thumbnail?id=1qA7zPyP2JBaZijI7KqA9fKOkoeEiGvc5&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 2,
        "7": 2,
        "8": 0,
        "9": 2,
        "10": 3,
        "11": 0,
        "imageNum": 203,
        "url": "https://drive.google.com/thumbnail?id=15TxzYLenELUhK1fQcyxOw-KeXMVVeAio&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 207,
        "url": "https://drive.google.com/thumbnail?id=1EabwAMX9ZHqNgFZJW3nlu-LJ66osZOjO&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 201,
        "url": "https://drive.google.com/thumbnail?id=1iYDi0pJTN6WViBUgkqX3dqP3RIe6sqy-&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 1,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 2,
        "6": 0,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 2,
        "11": 2,
        "imageNum": 318,
        "url": "https://drive.google.com/thumbnail?id=1-Z8fWKsTpdvYQHoCULR2EvRKBa4nv4Vr&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 3,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 1,
        "6": 3,
        "7": 2,
        "8": 0,
        "9": 3,
        "10": 3,
        "11": 0,
        "imageNum": 323,
        "url": "https://drive.google.com/thumbnail?id=1M3ZJkPGnlhw3aTh32mMTX7OaCqNYl1tW&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 1,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 615,
        "url": "https://drive.google.com/thumbnail?id=1SxMGJaA-Osx_8maUaW05fG1AKrqPvi0b&sz=w595",
        "middleK": "1.818"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 608,
        "url": "https://drive.google.com/thumbnail?id=19QYI_7ycjRHgljopkFXAnOXitHBWB9rl&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 2,
        "8": 0,
        "9": 2,
        "10": 3,
        "11": 2,
        "imageNum": 329,
        "url": "https://drive.google.com/thumbnail?id=1EpZkwdqNijAOCjS5VXOCpioPun5wYoIG&sz=w595",
        "middleK": "1.545"
    },
    {
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 1,
        "5": 3,
        "6": 2,
        "7": 3,
        "8": 1,
        "9": 2,
        "10": 3,
        "11": 3,
        "imageNum": 305,
        "url": "https://drive.google.com/thumbnail?id=1NLqhjn6yA1OOMkz5eeHZm5K9NAeY0koa&sz=w595",
        "middleK": "2.182"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 1,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 617,
        "url": "https://drive.google.com/thumbnail?id=1SluxjD9_LRP7iJHCi5RYxfx_jVrC5hWa&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 3,
        "11": 3,
        "imageNum": 630,
        "url": "https://drive.google.com/thumbnail?id=15rop_wzMxsQaXOIcNQpCEQznaMVaZAeA&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 3,
        "8": 1,
        "9": 3,
        "10": 3,
        "11": 3,
        "imageNum": 21,
        "url": "https://drive.google.com/thumbnail?id=1aYbNvymKdOWvQOqznZC4UeyLwY9EGHEf&sz=w595",
        "middleK": "2.273"
    },
    {
        "1": 2,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 1,
        "9": 1,
        "10": 3,
        "11": 1,
        "imageNum": 5,
        "url": "https://drive.google.com/thumbnail?id=16HiNe-_fxjP5Ag57VMMpX9HA_BxOJYi1&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 3,
        "imageNum": 423,
        "url": "https://drive.google.com/thumbnail?id=1VBNUCJaGb6vzPAxf6hEbDDU5qQUrORpe&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 521,
        "url": "https://drive.google.com/thumbnail?id=19pa6CXJ2M297SlqglH1yxuu0r1XJd5qp&sz=w595",
        "middleK": "1.091"
    },
    {
        "1": 2,
        "2": 3,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 309,
        "url": "https://drive.google.com/thumbnail?id=1GnKfwOrdSX36Sg9IPeSz3LzMLh8pO8p1&sz=w595",
        "middleK": "1.455"
    },
    {
        "1": 2,
        "2": 2,
        "3": 0,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 2,
        "10": 0,
        "11": 3,
        "imageNum": 416,
        "url": "https://drive.google.com/thumbnail?id=1DpCX5IhWeYzvB6HZt4v42GWUXU861EAb&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 1,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 3,
        "11": 0,
        "imageNum": 316,
        "url": "https://drive.google.com/thumbnail?id=1Dvm7Ne8hHiKWl3OInbJOZsqnEMzFuVaZ&sz=w595",
        "middleK": "2.091"
    },
    {
        "1": 0,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 324,
        "url": "https://drive.google.com/thumbnail?id=10RPh5sPw_zB7kDbH-Yi9q37SflL3hDhr&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 3,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 409,
        "url": "https://drive.google.com/thumbnail?id=1vTZwCyzlTa24LyH6_1do8uMJW_eFRlq0&sz=w595",
        "middleK": "0.818"
    },
    {
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 1,
        "8": 2,
        "9": 1,
        "10": 0,
        "11": 2,
        "imageNum": 10,
        "url": "https://drive.google.com/thumbnail?id=12jwgA9P66zP5etoofo-0mQfCQ1ElgMK1&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 1,
        "6": 3,
        "7": 2,
        "8": 3,
        "9": 1,
        "10": 3,
        "11": 0,
        "imageNum": 616,
        "url": "https://drive.google.com/thumbnail?id=1awKCF2vF9rbwGiEmjy-zCbl74p3Cq1d4&sz=w595",
        "middleK": "1.909"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 3,
        "8": 3,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 222,
        "url": "https://drive.google.com/thumbnail?id=1JHsxSfSnjrbk0LCLWeuR38Py4C7d8V2I&sz=w595",
        "middleK": "2.091"
    },
    {
        "1": 2,
        "2": 3,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 0,
        "9": 2,
        "10": 0,
        "11": 0,
        "imageNum": 108,
        "url": "https://drive.google.com/thumbnail?id=1MRKsqSY4hO8IQng8QXxhPbmoNHSxg_fn&sz=w595",
        "middleK": "1.182"
    },
    {
        "1": 2,
        "2": 3,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 2,
        "7": 1,
        "8": 1,
        "9": 1,
        "10": 0,
        "11": 2,
        "imageNum": 317,
        "url": "https://drive.google.com/thumbnail?id=1LIng9S3AW1mO-1NMcR6Jq2OT7etYSo0f&sz=w595",
        "middleK": "1.636"
    },
    {
        "1": 3,
        "2": 3,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 3,
        "8": 2,
        "9": 3,
        "10": 0,
        "11": 0,
        "imageNum": 424,
        "url": "https://drive.google.com/thumbnail?id=1c5bFSxgiwnpktmmqqCNgJOtIqXbLDuk9&sz=w595",
        "middleK": "1.455"
    }
];

const headers = [
    { label: "Image Num", key: "imageNum" },
    { label: "Url", key: "url" },
    { label: "1", key: "1" },
    { label: "2", key: "2" },
    { label: "3", key: "3" },
    { label: "4", key: "4" },
    { label: "5", key: "5" },
    { label: "6", key: "6" },
    { label: "7", key: "7" },
    { label: "8", key: "8" },
    { label: "9", key: "9" },
    { label: "10", key: "10" },
    { label: "11", key: "11" },
    { label: "Middle K", key: "middleK" },

];

const test = [
    {
        "label": "Документы, удостоверяющие личность физического лица",
        "value": "008001000000",
        "selectable": false,
        "children": [
            {
                "label": "Свидетельство о рождении",
                "value": "008001011000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Свидетельство о рассмотрении ходатайства о признании беженцем на территории Российской Федерации по существу",
                "value": "008001012000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Паспорт гражданина Российской Федерации",
                "value": "008001001000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Вид на жительство иностранного гражданина или лица без гражданства",
                "value": "008001013000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Паспорт гражданина СССР",
                "value": "008001002000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Справка об освобождении из мест лишения свободы",
                "value": "008001014000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Паспорт гражданина иностранного государства",
                "value": "008001003000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Временное удостоверение личности гражданина Российской Федерации",
                "value": "008001015000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Общегражданский заграничный паспорт",
                "value": "008001004000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение вынужденного переселенца",
                "value": "008001016000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Заграничный паспорт Министерства морского флота",
                "value": "008001005000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Разрешение на временное проживание в Российской Федерации",
                "value": "008001017000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Дипломатический паспорт",
                "value": "008001006000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение беженца в Российской Федерации",
                "value": "008001018000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Паспорт моряка (удостоверение личности моряка)",
                "value": "008001007000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Свидетельство о рассмотрении ходатайства о признании лица вынужденным переселенцем",
                "value": "008001019000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Свидетельство о предоставлении временного убежища на территории Российской Федерации",
                "value": "008001020000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Военный билет военнослужащего",
                "value": "008001008000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Временное удостоверение, выданное взамен военного билета",
                "value": "008001009000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Иные документы, предусмотренные законодательством Российской Федерации или признаваемые в соответствии с международным договором Российской Федерации в качестве документов, удостоверяющих личность",
                "value": "008001099000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение личности офицера Министерства обороны Российской Федерации, Министерства внутренних дел Российской Федерации и других воинских формирований с приложением справки о прописке (регистрации) Ф-33",
                "value": "008001010000",
                "parentValue": "008001000000",
                "selectable": true,
                "children": []
            }
        ]
    },
    {
        "label": "Документы, идентифицирующие юридическое лицо",
        "value": "008002000000",
        "selectable": false,
        "children": [
            {
                "label": "Свидетельство о внесении записей в ЕГРЮЛ",
                "value": "008002002000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Свидетельство о государственной регистрации юридического лица",
                "value": "008002001000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Положение (общее положение об организации)",
                "value": "008002006000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Учредительный договор",
                "value": "008002005000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Устав",
                "value": "008002004000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Выписка из ЕГРЮЛ",
                "value": "008002008000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Свидетельство (или уведомление) о постановке на учёт в налоговом органе с указанием ИНН",
                "value": "008002007000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Иной документ",
                "value": "008002099000",
                "parentValue": "008002000000",
                "selectable": true,
                "children": []
            }
        ]
    },
    {
        "label": "Квитанция",
        "value": "555001000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "Платёжное поручение",
        "value": "555002000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "Чек",
        "value": "555003000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "Подтверждение электронного платежа",
        "value": "555004000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "Документ, подтверждающий право заявителя на безвозмездное получение сведений",
        "value": "555005000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "ЗАЯВЛЕНИЯ",
        "value": "558100000000",
        "selectable": false,
        "children": [
            {
                "label": "Заявление о возврате платежа",
                "value": "558104000000",
                "parentValue": "558100000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Иное заявление",
                "value": "558199000000",
                "parentValue": "558100000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Заявления и запросы, связанные с государственным кадастровым учётом",
                "value": "558101000000",
                "parentValue": "558100000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Заявление об исправлении технической ошибки в сведениях государственного кадастра недвижимости",
                        "value": "558101090000",
                        "parentValue": "558101000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Заявление об исправлении технической ошибки в сведениях государственного кадастра недвижимости о прохождении участка Государственной границы Российской Федерации; о границах между субъектами Российской Федерации; о границах муниципальных образований; о границах населённых пунктов; о территориальных зонах и зонах с особыми условиями использования территорий; о картографической и геодезической основах государственного кадастра недвижимости",
                                "value": "558101090200",
                                "parentValue": "558101090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Заявление об исправлении технической ошибки в сведениях государственного кадастра недвижимости об объекте недвижимости",
                                "value": "558101090100",
                                "parentValue": "558101090000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Заявление о постановке на государственный кадастровый учёт объекта недвижимости",
                        "value": "558101020000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о представлении дополнительных документов на государственный кадастровый учёт",
                        "value": "558101100000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос документов о ранее учтённом объекте недвижимости в органах государственной власти, органах местного самоуправления или органах и организациях по государственному техническому учёту и (или) технической инвентаризации",
                        "value": "558101170000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Внутриведомственный запрос информации государственного кадастра недвижимости",
                        "value": "558101110000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений, внесённых в государственный кадастр недвижимости, в виде кадастровой выписки об объекте недвижимости, территориальной зоне, зоне с особыми условиями использования территории, территории объекта культурного наследия, включенного в единый государственный реестр объектов культурного наследия (памятников истории и культуры) народов Российской Федерации, границах между субъектами Российской Федерации, границах муниципальных образований и границах населённых пунктов, кадастрового паспорта объекта недвижимости и кадастрового плана территории, кадастровой справки о кадастровой стоимости объекта недвижимости",
                        "value": "558101010000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Межведомственный запрос документов в органах государственной власти и органах местного самоуправления",
                        "value": "558101160000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении в Единый государственный реестр объектов капитального строительства (ЕГРОКС) сведений об объекте капитального строительства (ОКС)",
                        "value": "558101040000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос об уточнении данных, представленных органом государственной власти или органом местного самоуправления в порядке информационного взаимодействия",
                        "value": "558101180000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о государственном кадастровом учёте изменений объекта недвижимости",
                        "value": "558101030000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений, внесённых в государственный кадастр недвижимости, посредством обеспечения доступа к информационному ресурсу, содержащему сведения государственного кадастра недвижимости",
                        "value": "558101130000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о снятии с государственного кадастрового учёта объекта недвижимости",
                        "value": "558101060000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении копии документа, на основании которого сведения об объекте недвижимости внесены в государственный кадастр недвижимости, или копий документов, помещённых в кадастровое дело",
                        "value": "558101120000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений об ОКС",
                        "value": "558101050000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении в государственный кадастр недвижимости сведений о ранее учтённом объекте недвижимости",
                        "value": "558101070000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о прекращении осуществления кадастрового учёта",
                        "value": "558101150000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении перечня объектов недвижимости, подлежащих государственной кадастровой оценке",
                        "value": "558101140000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об исправлении кадастровой ошибки",
                        "value": "558101080000",
                        "parentValue": "558101000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Заявления и запросы, связанные с регистрацией прав",
                "value": "558102000000",
                "parentValue": "558100000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Заявление о приостановлении государственной регистрации прав на недвижимое имущество и сделок с ним",
                        "value": "558102060000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении изменений в запись Единого государственного реестра прав на недвижимое имущество и сделок с ним, погашении регистрационной записи об ипотеке",
                        "value": "558102220000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о представлении дополнительных документов для государственной регистрации прав",
                        "value": "558102050000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об исправлении технической ошибки",
                        "value": "558102040000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о скреплении добавочного листа (добавочных листов) с закладной",
                        "value": "558102190000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении изменений в ЕГРП",
                        "value": "558102030000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об исправлении технической ошибки в записях Единого государственного реестра прав на недвижимое имущество и сделок с ним, о наличии возражения в отношении зарегистрированного права на объект недвижимости, о погашении записи в Едином государственном реестре прав на недвижимое имущество и сделок с ним о наличии возражения в отношении зарегистрированного права на объект недвижимости, о невозможности государственной регистрации перехода, ограничения (обременения), прекращения права на объект недвижимости без личного участия собственника (его законного представителя), об отзыве ранее представленного заявления о невозможности государственной регистрации перехода, ограничения (обременения), прекращения права на объект недвижимости без личного участия собственника (его законного представителя)",
                        "value": "558102180000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений, содержащихся в Едином государственном реестре прав на недвижимое имущество и сделок с ним",
                        "value": "558102100000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о повторной выдаче свидетельства о государственной регистрации права",
                        "value": "558102090000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении в Единый государственный реестр прав на недвижимое имущество и сделок с ним отметки о наличии судебного спора в отношении зарегистрированного права",
                        "value": "558102170000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о государственной регистрации прекращения права (ограничения (обременения) права)",
                        "value": "558102020000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о постановке на учёт бесхозяйных недвижимых вещей",
                        "value": "558102110000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о принятии объекта недвижимого имущества вновь во владение, пользование и распоряжение (в собственность)",
                        "value": "558102160000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о государственной регистрации права на недвижимое имущество, сделки с ним, ограничения (обременения), перехода, прекращения права на недвижимое имущество",
                        "value": "558102010000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений, содержащихся в Едином государственном реестре прав на недвижимое имущество и сделок с ним, посредством обеспечения доступа к информационному ресурсу, содержащему сведения Единого государственного реестра прав на недвижимое имущество и сделок с ним",
                        "value": "558102200000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о выдаче закладной (новой закладной, дубликата закладной, аннулированной закладной)",
                        "value": "558102120000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о возобновлении государственной регистрации",
                        "value": "558102070000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о повторной выдаче нового свидетельства о государственной регистрации права, выдаче закладной, внесении изменений в запись Единого государственного реестра прав на недвижимое имущество и сделок с ним, погашении регистрационной записи об ипотеке",
                        "value": "558102150000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о государственной регистрации законного владельца закладной",
                        "value": "558102210000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о выдаче копий договоров и иных документов, выражающих содержание односторонних сделок, совершенных в простой письменной форме",
                        "value": "558102130000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о прекращении государственной регистрации",
                        "value": "558102080000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о приостановлении государственной регистрации, возврате документов без проведения государственной регистрации, представлении дополнительных документов, о возобновлении государственной регистрации, ранее приостановленной по заявлению правообладателя, стороны (сторон) сделки, лица, чьё право ограничивается (обременяется), лица, в пользу которого право ограничивается (обременяется), законного владельца закладной (их представителя)",
                        "value": "558102140000",
                        "parentValue": "558102000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Заявления о государственном учёте зданий, сооружений, помещений, объектов незавершённого строительства (объектов учёта) и запросы о предоставлении сведений, внесённых в Единый государственный реестр",
                "value": "558103000000",
                "parentValue": "558100000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Заявление о государственном учёте изменений объекта учёта",
                        "value": "558103030000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении в ЕГРОКС сведений о ранее учтённом объекте капитального строительства",
                        "value": "558103020000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об исправлении технической ошибки",
                        "value": "558103050000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о снятии с государственного учёта объекта учёта",
                        "value": "558103040000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении копии документа, на основании которого сведения об объекте внесены в Единый государственный реестр",
                        "value": "558103070000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об исключении сведений из ЕГРОКС, носящих временный характер",
                        "value": "558103060000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о постановке на государственный учёт объекта учёта",
                        "value": "558103010000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о представлении дополнительных документов на государственный учёт",
                        "value": "558103090000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений, внесенных в Единый государственный реестр",
                        "value": "558103080000",
                        "parentValue": "558103000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "label": "ДОКУМЕНТЫ, СОДЕРЖАЩИЕ ОПИСАНИЕ ОБЪЕКТА",
        "value": "558200000000",
        "selectable": false,
        "children": [
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в решении об отнесении жилого помещения к определенному виду жилых помещений специализированного жилищного фонда, к жилым помещениям наемного дома социального использования или наемного дома коммерческого использования",
                "value": "558288000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение о включении объекта недвижимости в перечень выявленных объектов культурного наследия",
                "value": "558275000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, подтверждающий изменение назначения здания",
                "value": "558235000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий содержащиеся в государственном лесном реестре сведения в отношении лесного участка",
                "value": "558248000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ (копия), подтверждающий принадлежность земельного участка к определенной категории земель",
                "value": "558208000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в международном договоре Российской Федерации, в соответствии с которым установлено или изменено прохождение государственной границы Российской Федерации, а также сведения о федеральном законе, которым ратифицирован международный договор Российской Федерации, и об официальном опубликовании такого федерального закона",
                "value": "558222000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Проектная документация сооружения",
                "value": "558262000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение о переводе жилого помещения в нежилое помещение, нежилого помещения в жилое помещение",
                "value": "558230000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение об отнесении земельного участка к определенной категории земель",
                "value": "558270000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Описание земельных участков",
                "value": "558201000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Соглашение о создании особой экономической зоны",
                "value": "558281000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Перечень объектов недвижимости, подлежащих государственной кадастровой оценке",
                "value": "558291000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Выписка из технического паспорта",
                "value": "558206000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документы, определяющие (определявшие) в соответствии с законодательством Российской Федерации местоположение границ земельного участка (земельных участков)",
                "value": "558254000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Проект границ земельных участков",
                        "value": "558254070000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документ, свидетельствующий о снятии возражений заинтересованных лиц по поводу местоположения границ земельного участка",
                        "value": "558254140000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Схема расположения земельных участков на кадастровых планах или кадастровых картах соответствующих территорий",
                        "value": "558254150000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Землеустроительная документация",
                        "value": "558254010000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Карта - план территории",
                        "value": "558254160000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Лесоустроительная документация",
                        "value": "558254020000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Копия решения общего собрания участников долевой собственности на земельный участок из земель сельскохозяйственного назначения об утверждении проекта межевания земельных участков",
                        "value": "558254110000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документы градостроительного зонирования (Правила землепользования и застройки)",
                        "value": "558254030000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение о предварительном согласовании мест размещения объектов",
                        "value": "558254100000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Проект (копии отдельных составных частей) перераспределения сельскохозяйственных угодий и иных земель сельскохозяйственного назначения",
                        "value": "558254090000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документация по планировке территории (проекты межевания территорий), в т.ч. документ по планировке территории в планируемых границах искусственного земельного участка",
                        "value": "558254040000",
                        "parentValue": "558254000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Проект межевания территории",
                                "value": "558254040100",
                                "parentValue": "558254040000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Прочие документы, определяющие (определявшие) в соответствии с законодательством Российской Федерации местоположение границ земельного участка (земельных участков)",
                                "value": "558254990000",
                                "parentValue": "558254040000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об утверждении проекта межевания территории",
                                "value": "558254040200",
                                "parentValue": "558254040000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Документ, воспроизводящий сведения, содержащиеся в решении об утверждении проекта межевания территории",
                                "value": "558254040300",
                                "parentValue": "558254040000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Возражения заинтересованных лиц по поводу местоположения границ земельного участка",
                        "value": "558254130000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Проект (копии отдельных составных частей) организации и застройки территорий садоводческих, огороднических или дачных некоммерческих объединений граждан",
                        "value": "558254080000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Копия проекта межевания земельных участков",
                        "value": "558254050000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Копия документа, подтверждающего согласование проекта межевания земельного участка",
                        "value": "558254120000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Акт отвода земельных участков в натуре",
                        "value": "558254060000",
                        "parentValue": "558254000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Планы иных объектов недвижимости",
                "value": "558211000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Технический план здания, сооружения, помещения либо объекта незавершённого строительства",
                        "value": "558211010000",
                        "parentValue": "558211000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "План участка лесного фонда",
                        "value": "558211020000",
                        "parentValue": "558211000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "План объекта недвижимости",
                        "value": "558211030000",
                        "parentValue": "558211000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Экспликация к поэтажному плану",
                        "value": "558211040000",
                        "parentValue": "558211000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Документ, подтверждающий изменение назначения помещения",
                "value": "558229000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение о включении выявленного объекта культурного наследия в единый государственный реестр объектов культурного наследия (памятников истории и культуры) народов Российской Федерации",
                "value": "558277000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в решении об увеличении площади особой экономической зоны",
                "value": "558283000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Межевой план",
                "value": "558203000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Чертеж (абрис) помещения",
                "value": "558260000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Материалы картографо-геодезического фонда",
                "value": "558256000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в решении о переводе жилого помещения в нежилое помещение, нежилого помещения в жилое помещение",
                "value": "558233000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документы, воспроизводящие сведения об изменении назначения помещения",
                "value": "558232000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение об установлении или изменении границ зон с особыми условиями использования территорий",
                "value": "558227000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения о реквизитах акта или договора органа государственной власти или органа местного самоуправления, предусматривающих предоставление земельного участка для строительства либо освоения территории с целью строительства и эксплуатации наемного дома",
                "value": "558285000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение органа охраны объектов культурного наследия об отказе включить объект недвижимости в единый государственный реестр объектов культурного наследия (памятников истории и культуры) народов Российской Федерации",
                "value": "558245000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение об определении (изменении) вида разрешенного использования",
                "value": "558238000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в решении о присвоении, изменении адреса",
                "value": "558240000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Описание местоположения границ особой экономической зоны",
                "value": "558286000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Декларация заинтересованного лица о выбранном виде разрешенного использования земельного участка",
                "value": "558253000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Иной документ, содержащий описание объекта",
                "value": "558299000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Карта (план) объекта землеустройства",
                "value": "558252000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в правовом акте, которым утверждены или изменены правила землепользования и застройки, включая сведения о территориальных зонах",
                "value": "558251000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий содержащиеся в разрешении на ввод объекта капитального строительства в эксплуатацию сведения",
                "value": "558241000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения о результатах проверки, осуществленной в рамках государственного земельного надзора о выявленном нарушении земельного законодательства Российской Федерации",
                "value": "558289000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение Правительства Российской Федерации об исключении объекта культурного наследия из единого государственного реестра объектов культурного наследия (памятников истории и культуры) народов Российской Федерации",
                "value": "558246000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение о предоставлении разрешения на условно разрешенный вид использования",
                "value": "558237000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в решении об установлении или изменении границ зон с особыми условиями использования территорий",
                "value": "558250000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в акте Правительства Российской Федерации об исключении объекта недвижимости из единого государственного реестра объектов культурного наследия (памятников истории и культуры) народов Российской Федерации",
                "value": "558243000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, содержащий сведения о дате поступления документов, предусмотренных статьей 17 Федерального закона \"Об объектах культурного наследия (памятниках истории и культуры) народов Российской Федерации\", в отношении объекта недвижимости",
                "value": "558244000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ (копия), воспроизводящий сведения о предоставлении разрешения на условно разрешенный вид использования, об определении (изменении) вида разрешенного использования",
                "value": "558239000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Картографические материалы",
                "value": "558255000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Правовой акт, которым утверждены или изменены правила землепользования и застройки",
                "value": "558228000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в правовом акте, которым утвержден или изменен генеральный план",
                "value": "558268000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в соглашении о создании особой экономической зоны или в решении об увеличении площади особой экономической зоны",
                "value": "558282000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Декларация об объектах недвижимости, в том числе о земельных участках, относящихся к имуществу Вооруженных Сил Российской Федерации и подведомственных Министерству обороны Российской Федерации организаций, имуществу органов федеральной службы безопасности",
                "value": "558290000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Землеустроительное дело",
                "value": "558202000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ об установлении (изменении) границ территории объекта культурного наследия или зон его охраны",
                "value": "558272000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в реестре объектов культурного наследия (памятников истории и культуры) народов Российской Федерации",
                "value": "558242000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение об отказе во включении объекта в перечень выявленных объектов культурного наследия",
                "value": "558276000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Соглашение об изменении границ между субъектами Российской Федерации",
                "value": "558223000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение комиссии по рассмотрению споров о результатах определения кадастровой стоимости",
                "value": "558263000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, подтверждающий изменение назначения сооружения",
                "value": "558236000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ (копия), подтверждающий разрешение земельного спора о согласовании местоположения границ земельного участка",
                "value": "558207000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения о наименовании водного объекта и установленных параметрах водоохранных зон и прибрежных защитных полос, зон затопления, подтопления и других зон с особыми условиями их использования",
                "value": "558247000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документы, направляемые для внесения сведений в Единый государственный реестр недвижимости, в порядке межведомственного информационного взаимодействия",
                "value": "558287000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Документ, воспроизводящий сведения, содержащиеся в решении об установлении или изменении границ зоны территориального развития",
                        "value": "558287000114",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документ, воспроизводящий сведения, содержащиеся в решении об установлении или изменении границ территории опережающего социально-экономического развития",
                        "value": "558287000115",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документ, воспроизводящий сведения, содержащиеся в решении об установлении или изменении границ игорной зоны",
                        "value": "558287000112",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документ, воспроизводящий сведения, содержащиеся в решении об определении границ игорной зоны",
                        "value": "558287000113",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской о досрочном прекращении существования зоны территориального развития в Российской Федерации",
                        "value": "558287000110",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской о досрочном прекращении существования игорной зоны",
                        "value": "558287000111",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской Федерации о создании игорной зоны",
                        "value": "558287000105",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской об увеличении площади территории опережающего социально-экономического развития",
                        "value": "558287000106",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской Федерации о создании территории опережающего социально-экономического развития",
                        "value": "558287000103",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской Федерации о создании зоны территориального развития в Российской Федерации",
                        "value": "558287000104",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской о досрочном прекращении существования территории опережающего социально-экономического развития",
                        "value": "558287000109",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской об увеличении площади зоны территориального развития в Российской Федерации",
                        "value": "558287000107",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение Правительства Российской об увеличении площади игорной зоны",
                        "value": "558287000108",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Соглашение о создании территории опережающего социально-экономического развития",
                        "value": "558287000101",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Соглашение о создании зоны территориального развития в Российской Федерации",
                        "value": "558287000102",
                        "parentValue": "558287000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Проектная документация здания",
                "value": "558261000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий необходимые для внесения в государственный кадастр недвижимости сведения о границах между субъектами Российской Федерации, границах муниципального образования, границах населённого пункта, содержащиеся в утверждённых органами власти документах",
                "value": "558226000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в акте приемочной комиссии, подтверждающем завершение переустройства и (или) перепланировки и (или) иных работ",
                "value": "558234000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся во вступившем в силу акте об утверждении результатов определения кадастровой стоимости",
                "value": "558249000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Акт приемочной комиссии, подтверждающий завершение переустройства и (или) перепланировки и (или) иных работ",
                "value": "558231000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документы, устанавливающие предельные минимальные и максимальные размеры, соответствующие виду разрешенного использования земельного участка",
                "value": "558257000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Нормативный правовой акт органа местного самоуправления",
                        "value": "558257030000",
                        "parentValue": "558257000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Закон субъекта Российской Федерации",
                        "value": "558257020000",
                        "parentValue": "558257000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Федеральный закон",
                        "value": "558257010000",
                        "parentValue": "558257000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Кадастровый план земельного участка (выписка из государственного земельного кадастра)",
                "value": "558210000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение Правительства Российской Федерации об увеличении площади такой особой экономической зоны",
                "value": "558279000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Уведомление о досрочном прекращении существования особой экономической зоны",
                "value": "558284000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ (копия), на основании которого сведения об объекте недвижимости внесены в ГКН",
                "value": "558204000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Технический паспорт объекта учёта",
                "value": "558205000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Технический паспорт здания (строения)",
                        "value": "558205020000",
                        "parentValue": "558205000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Технический паспорт домовладения",
                        "value": "558205010000",
                        "parentValue": "558205000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Технический паспорт объекта индивидуального жилищного строительства",
                        "value": "558205040000",
                        "parentValue": "558205000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Технический паспорт жилого помещения (квартиры)",
                        "value": "558205030000",
                        "parentValue": "558205000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Технический паспорт объекта незавершённого строительства",
                        "value": "558205060000",
                        "parentValue": "558205000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Технический паспорт сооружения",
                        "value": "558205050000",
                        "parentValue": "558205000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Акт уполномоченного органа об установлении или изменении границ населённых пунктов",
                "value": "558225000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ о редакционно-контрольном просмотре правильности отображения линии государственной границы Российской Федерации на картографических материалах, предназначенных для размещения на Публичной кадастровой карте",
                "value": "558265000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Кадастровая справка о кадастровой стоимости объекта недвижимости",
                "value": "558218000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, содержащий информацию о ранее присвоенных государственных учетных номерах объекта недвижимости",
                "value": "558258000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение Правительства Российской Федерации о создании особой экономической зоны",
                "value": "558278000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение Правительства Российской Федерации о досрочном прекращении особой экономической зоны",
                "value": "558280000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Кадастровый паспорт объекта недвижимости",
                "value": "558213000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Кадастровый паспорт помещения (выписка из ГКН)",
                        "value": "558213020000",
                        "parentValue": "558213000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Кадастровый паспорт земельного участка",
                        "value": "558213010000",
                        "parentValue": "558213000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Кадастровый паспорт здания, сооружения, объекта незавершённого строительства",
                        "value": "558213030000",
                        "parentValue": "558213000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Закон субъекта Российской Федерации об установлении или изменении границ муниципальных образований либо о преобразовании муниципальных образований",
                "value": "558224000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение суда",
                "value": "558264000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Протокол образования земельных участков",
                "value": "558259000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Акт обследования, подтверждающий прекращение существования объекта недвижимости",
                "value": "558219000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Декларация об объекте недвижимости",
                "value": "558212000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения, содержащиеся в решении об отнесении земельного участка к определенной категории земель или о переводе земельного участка из одной категории земель в другую",
                "value": "558271000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, воспроизводящий сведения о присвоении адресов объектам адресации, об изменении или аннулировании адресов объектов адресации",
                "value": "558274000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Решение о переводе земельного участка из одной категории земель",
                "value": "558269000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ (копия), подтверждающий установленное разрешенное использование земельного участка",
                "value": "558209000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Кадастровая выписка",
                "value": "558214000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Кадастровая выписка о границах между субъектами Российской Федерации, границах муниципальных образований и границах населенных пунктов",
                        "value": "558214040000",
                        "parentValue": "558214000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Кадастровая выписка о территориальной зоне, зоне с особыми условиями использования территории, территории объекта культурного наследия, включенного в единый государственный реестр объектов культурного наследия (памятников истории и культуры) народов Российской Федерации",
                        "value": "558214030000",
                        "parentValue": "558214000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Кадастровая выписка о здании, сооружении, объекте незавершённого строительства",
                        "value": "558214020000",
                        "parentValue": "558214000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Кадастровая выписка о земельном участке",
                        "value": "558214010000",
                        "parentValue": "558214000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Правовой акт, которым утвержден или изменен генеральный план",
                "value": "558267000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Кадастровый план территории",
                "value": "558217000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Текстовое и графическое описание местоположения границ территории объекта культурного наследия или зон его охраны с перечнем координат характерных точек этих границ",
                "value": "558273000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документы, в виде которых предоставляются сведения Единого государственного реестра",
                "value": "558220000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Выписка из Реестра, подтверждающая факт отсутствия в Реестре сведений об объекте учета",
                        "value": "558220030000",
                        "parentValue": "558220000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Справка, содержащая, внесённые в Единый государственный реестр сведения о прекращении существования объекта учёта",
                        "value": "558220020000",
                        "parentValue": "558220000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из Реестра, содержащая относящиеся к информации ограниченного доступа сведения об объекте учета",
                        "value": "558220010000",
                        "parentValue": "558220000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Документ, содержащий сведения о лесах, водных объектах и об иных природных объектах",
                "value": "558266000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документ, подтверждающий изменение назначения здания, помещения или сооружения, наименования сооружения",
                "value": "558216000000",
                "parentValue": "558200000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "ПРОЧИЕ",
                "value": "558221000000",
                "parentValue": "558200000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Документ, содержащий необходимые для внесения в государственный кадастр недвижимости сведения о границах между субъектами Российской Федерации, границах муниципального образования, границах населённого пункта",
                        "value": "558221030000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Международный договор Российской Федерации, в соответствии с которым установлено или изменено прохождение государственной границы Российской Федерации",
                        "value": "558221020000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документ, содержащий необходимые для внесения в государственный кадастр недвижимости сведения об установлении или изменении территориальной зоны или зоны с особыми условиями использования территорий, либо об отмене установления такой зоны",
                        "value": "558221040000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение о присвоении, изменении адреса",
                        "value": "558221050000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документы органов, осуществляющих ведение лесного и водного кадастра, содержащие сведения о природных объектах",
                        "value": "558221060000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Иной документ, содержащий описание объекта",
                        "value": "558221990000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документ, содержащий сведения об адресе объекта недвижимости",
                        "value": "558221070000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение о необходимости устранения кадастровой ошибки",
                        "value": "558221010000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Акт об утверждении результатов определения кадастровой стоимости",
                        "value": "558221080000",
                        "parentValue": "558221000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документы – основания внесения отметки, предусмотренной пунктом 14.1 части 2 статьи 7 221-ФЗ «О государственном кадастре недвижимости»",
                        "value": "558221090000",
                        "parentValue": "558221000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Акт о предоставлении участка для строительства наемного дома",
                                "value": "558221090300",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение собственника земельного участка, находящегося в частной собственности, о строительстве наемного дома либо договор, заключенный для создания, эксплуатации наемного дома",
                                "value": "558221090200",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Договор о предоставлении участка для строительства наемного дома",
                                "value": "558221090500",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Акт о предоставлении участка для освоения территории в целях строительства и эксплуатации наемного дома",
                                "value": "558221090400",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение собственника земельного участка, находящегося в частной собственности, о строительстве наемного дома",
                                "value": "558221090700",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Договор о предоставлении участка для освоения территории в целях строительства и эксплуатации наемного дома",
                                "value": "558221090600",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Договор о предоставлении поддержки для создания и эксплуатации наемного дома социального использования",
                                "value": "558221090800",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Акт и (или) договор о предоставлении находящегося в государственной или муниципальной собственности участка под наемный дом",
                                "value": "558221090100",
                                "parentValue": "558221090000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "ДОКУМЕНТЫ, СОДЕРЖАЩИЕ ОПИСАНИЕ ЗАЯВИТЕЛЯ ИЛИ ЕГО ПРЕДСТАВИТЕЛЯ",
        "value": "558300000000",
        "selectable": false,
        "children": [
            {
                "label": "Документы, подтверждающие полномочия представителя",
                "value": "558301000000",
                "parentValue": "558300000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Постановление судебного пристава-исполнителя",
                        "value": "558301120000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Протокол общего собрания",
                        "value": "558301130000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Иной документ",
                        "value": "558301990000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Акт органа государственной власти или органа местного самоуправления, подтверждающий полномочия представителя заявителя",
                        "value": "558301140000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение органов опеки и попечительства",
                        "value": "558301090000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Приказ о назначении (руководителя или иного уполномоченного лица)",
                        "value": "558301080000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Доверенность",
                        "value": "558301010000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из протокола об избрании (единоличного исполнительного органа юридического лица)",
                        "value": "558301070000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Свидетельство о рождении",
                        "value": "558301020000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Протокол об избрании (единоличного исполнительного органа юридического лица)",
                        "value": "558301060000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Свидетельство об усыновлении",
                        "value": "558301030000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Определение суда",
                        "value": "558301050000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Договор доверительного управления",
                        "value": "558301110000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Договор коммерческого представительства",
                        "value": "558301100000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение суда",
                        "value": "558301040000",
                        "parentValue": "558301000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "label": "ДОКУМЕНТЫ О ПРАВАХ, СДЕЛКАХ, ОГРАНИЧЕНИЯХ (ОБРЕМЕНЕНИЯХ)",
        "value": "558400000000",
        "selectable": false,
        "children": [
            {
                "label": "Соглашения и согласия об образовании земельных участков",
                "value": "558404000000",
                "parentValue": "558400000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Соглашение о разделе, об объединении, о перераспределении земельных участков или о выделе из земельных участков",
                        "value": "558404010000",
                        "parentValue": "558404000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Соглашение об образовании общей совместной собственности на земельный участок, образуемый при выделе его в счет земельной доли или земельных долей",
                        "value": "558404040000",
                        "parentValue": "558404000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Согласие на образование земельных участков",
                        "value": "558404020000",
                        "parentValue": "558404000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Соглашение об образовании общей долевой собственности на земельный участок, образуемый при выделе его в счет земельной доли или земельных долей",
                        "value": "558404030000",
                        "parentValue": "558404000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "СОПУТСТВУЮЩИЕ И ДОПОЛНИТЕЛЬНЫЕ ДОКУМЕНТЫ",
                "value": "558402000000",
                "parentValue": "558400000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Решение о создании юридического лица",
                        "value": "558402140000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Справка о стоимости (справка о соотношении стоимости отчуждаемого объекта и балансовой стоимости имущества или активов хозяйственного общества)",
                        "value": "558402060000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из реестра муниципальной собственности",
                        "value": "558402230000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение о реорганизации юридического лица",
                        "value": "558402150000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Добавочный лист к закладной",
                        "value": "558402220000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение об одобрении (о совершении) сделки",
                        "value": "558402050000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из домовой книги (сведения о лицах, сохраняющих право проживания в жилом помещении после перехода права на него)",
                        "value": "558402080000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Проектная декларация",
                        "value": "558402120000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Отчет о проведении независимой оценки (акт оценки)",
                        "value": "558402280000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Охранное обязательство собственника объекта культурного наследия",
                        "value": "558402400000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Закладная",
                        "value": "558402210000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Свидетельство о смерти",
                        "value": "558402410000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Справка о заинтересованных лицах в сделке",
                        "value": "558402070000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Отказ от преимущественного права покупки (для участников долевой собственности, для субъекта Российской Федерации при продаже земельного участка из состава земель сельскохозяйственного назначения)",
                        "value": "558402130000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Иной документ",
                        "value": "558402990000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Бухгалтерский баланс",
                        "value": "558402200000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Исполнительный лист",
                        "value": "558402180000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Жилищный сертификат",
                        "value": "558402260000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Согласие органов опеки и попечительства",
                        "value": "558402020000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Протокол о результатах торгов",
                        "value": "558402100000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение об утверждении оценки имущества (решение об утверждении оценки неденежных вкладов в уставный капитал общества)",
                        "value": "558402170000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из лицевого счета (сведения о лицах, сохраняющих право проживания в жилом помещении после перехода права на него)",
                        "value": "558402090000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Аудиторское заключение",
                        "value": "558402270000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Лицензия (лицензия на осуществление определенных видов деятельности)",
                        "value": "558402110000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение о ликвидации юридического лица",
                        "value": "558402160000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из реестра собственности субъекта Российской Федерации",
                        "value": "558402240000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Согласие супруга на совершение сделки",
                        "value": "558402010000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Акт инвентаризации",
                        "value": "558402390000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Свидетельство о расторжении брака",
                        "value": "558402040000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из реестра федерального имущества",
                        "value": "558402250000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Договор поручения",
                        "value": "558402190000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Свидетельство о заключении брака",
                        "value": "558402030000",
                        "parentValue": "558402000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Правоустанавливающие и правоудостоверяющие документы",
                "value": "558401000000",
                "parentValue": "558400000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Акты органов государственной власти или органов местного самоуправления",
                        "value": "558401020000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Иные акты органов государственной власти или органов местного самоуправления",
                                "value": "558401029900",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Федеральный конституционный закон",
                                "value": "558401020900",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Акт об установлении ограничения (обременения)",
                                "value": "558401020800",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Акт об установлении сервитута",
                                "value": "558401020700",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об образовании земельных участков",
                                "value": "558401020600",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Документ о предоставлении земельных участков",
                                "value": "558401020500",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Закон (законы Российской Федерации, субъекта Российской Федерации)",
                                "value": "558401020400",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Постановление Правительства Российской Федерации",
                                "value": "558401020300",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Указ Президента Российской Федерации",
                                "value": "558401020200",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Федеральный закон",
                                "value": "558401020100",
                                "parentValue": "558401020000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Договоры / соглашения",
                        "value": "558401010000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Другие сделки",
                                "value": "558401010200",
                                "parentValue": "558401010000",
                                "selectable": false,
                                "children": [
                                    {
                                        "label": "Брачный договор",
                                        "value": "558401010203",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение об отступном",
                                        "value": "558401010204",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор участия в долевом строительстве",
                                        "value": "558401010201",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение об определении (перераспределении) долей в праве общей долевой собственности",
                                        "value": "558401010202",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор об ипотеке",
                                        "value": "558401010210",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор безвозмездного срочного пользования земельным участком",
                                        "value": "558401010211",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение об установлении сервитута",
                                        "value": "558401010214",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение об изменении содержания закладной",
                                        "value": "558401010215",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Кредитный договор",
                                        "value": "558401010212",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор займа",
                                        "value": "558401010213",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Инвестиционный договор (договор об инвестировании)",
                                        "value": "558401010207",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Мировое соглашение",
                                        "value": "558401010208",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение о разделе имущества",
                                        "value": "558401010205",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение о выделе доли",
                                        "value": "558401010206",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор аренды (субаренды)",
                                        "value": "558401010209",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор социального найма",
                                        "value": "558401010221",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Государственный контракт",
                                        "value": "558401010220",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение об уступке прав требования по договору (договор о передаче прав и обязанностей)",
                                        "value": "558401010218",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор простого товарищества (договор о совместной деятельности)",
                                        "value": "558401010219",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Дополнительное соглашение (соглашение об изменении условий договора) к договору",
                                        "value": "558401010216",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Соглашение о расторжении договора",
                                        "value": "558401010217",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Иная сделка",
                                        "value": "558401010299",
                                        "parentValue": "558401010200",
                                        "selectable": true,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "label": "Сделки об отчуждении",
                                "value": "558401010100",
                                "parentValue": "558401010000",
                                "selectable": false,
                                "children": [
                                    {
                                        "label": "Договор купли-продажи",
                                        "value": "558401010101",
                                        "parentValue": "558401010100",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор ренты",
                                        "value": "558401010104",
                                        "parentValue": "558401010100",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор пожизненного содержания с иждивением",
                                        "value": "558401010105",
                                        "parentValue": "558401010100",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор мены",
                                        "value": "558401010102",
                                        "parentValue": "558401010100",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор дарения",
                                        "value": "558401010103",
                                        "parentValue": "558401010100",
                                        "selectable": true,
                                        "children": []
                                    },
                                    {
                                        "label": "Договор приватизации (договор передачи объекта недвижимости в собственность)",
                                        "value": "558401010106",
                                        "parentValue": "558401010100",
                                        "selectable": true,
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "label": "Прочие правоустанавливающие документы",
                        "value": "558401080000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "План приватизации",
                                "value": "558401080300",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Правила доверительного управления",
                                "value": "558401080400",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Передаточный акт",
                                "value": "558401080100",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Разделительный баланс",
                                "value": "558401080200",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Соглашение о разделе наследственного имущества",
                                "value": "558401081000",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Соглашение об уплате алиментов",
                                "value": "558401081100",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Документ, подтверждающий наличие, возникновение, переход ограничения (обременения) вещного права на объект недвижимости в пользу заявителя",
                                "value": "558401081200",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Иной документ",
                                "value": "558401089900",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Соглашение о новации",
                                "value": "558401080900",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол общего собрания собственников помещений в многоквартирном доме",
                                "value": "558401080700",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Отказ одаряемого принять дар (отказ от дара)",
                                "value": "558401080800",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Акт описи и ареста имущества",
                                "value": "558401080500",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол о выделе земельного участка в счет земельной доли",
                                "value": "558401080600",
                                "parentValue": "558401080000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Документы при упрощенном порядке оформления прав граждан на отдельные объекты недвижимого имущества",
                        "value": "558401070000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Декларация об объекте недвижимого имущества",
                                "value": "558401070300",
                                "parentValue": "558401070000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Выписка из похозяйственной книги о наличии у гражданина права на земельный участок",
                                "value": "558401070100",
                                "parentValue": "558401070000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Кадастровый паспорт объекта недвижимости",
                                "value": "558401070200",
                                "parentValue": "558401070000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Документы на вновь возведенный (реконструированный) объект",
                        "value": "558401060000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Акт ввода в эксплуатацию",
                                "value": "558401060300",
                                "parentValue": "558401060000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Копия решения о создании искусственного земельного участка",
                                "value": "558401060400",
                                "parentValue": "558401060000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Разрешение на ввод объекта в эксплуатацию",
                                "value": "558401060100",
                                "parentValue": "558401060000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Разрешение на строительство",
                                "value": "558401060200",
                                "parentValue": "558401060000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Акты (свидетельства) о правах на объекты недвижимости",
                        "value": "558401050000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Государственный акт о праве на землю",
                                "value": "558401050300",
                                "parentValue": "558401050000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Свидетельство о праве собственности",
                                "value": "558401050400",
                                "parentValue": "558401050000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Регистрационное удостоверение",
                                "value": "558401050100",
                                "parentValue": "558401050000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Свидетельство о праве на землю",
                                "value": "558401050200",
                                "parentValue": "558401050000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Иные акты, свидетельства о правах на объекты недвижимости",
                                "value": "558401059900",
                                "parentValue": "558401050000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Вступившие в силу судебные акты",
                        "value": "558401040000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Иные предусмотренные законодательством судебные акты",
                                "value": "558401049900",
                                "parentValue": "558401040000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Судебный акт об установлении обременения (ограничении) в использовании объекта недвижимости (части объекта недвижимости)",
                                "value": "558401040300",
                                "parentValue": "558401040000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Судебный акт о восстановлении аннулированных и исключенных из государственного кадастра недвижимости сведений об объекте недвижимости",
                                "value": "558401040200",
                                "parentValue": "558401040000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Судебный акт, устанавливающий запрет на совершение действий в сфере государственного кадастрового учета в отношении объекта недвижимости",
                                "value": "558401040100",
                                "parentValue": "558401040000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Свидетельство о праве на наследство",
                        "value": "558401030000",
                        "parentValue": "558401000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Свидетельство о праве на наследство по завещанию",
                                "value": "558401030200",
                                "parentValue": "558401030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Свидетельство о праве на наследство по закону",
                                "value": "558401030100",
                                "parentValue": "558401030000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "label": "Документы, подтверждающие возникновение права собственности в отношении земельного участка в силу федерального закона вне зависимости от момента государственной регистрации этого права в ЕГРП",
                "value": "558405000000",
                "parentValue": "558400000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Иные документы, подтверждающие возникновение права собственности в отношении земельного участка в силу федерального закона вне зависимости от момента государственной регистрации этого права в ЕГРП",
                        "value": "558405990000",
                        "parentValue": "558405000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Копия решения о безвозмездной передаче военного недвижимого имущества из федеральной собственности в собственность субъекта Российской Федерации - города федерального значения Москвы или Санкт-Петербурга либо муниципальную собственность",
                        "value": "558405010000",
                        "parentValue": "558405000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Подлинник или копия письма органа исполнительной власти субъекта Российской Федерации - города федерального значения Москвы или Санкт-Петербурга либо органа местного самоуправления муниципального образования о согласовании границ образуемого земельного участка с приложением согласованного проекта границ земельного участка в случае, если акт согласования границ земельного участка не заверен подписью уполномоченного должностного лица соответствующего органа",
                        "value": "558405020000",
                        "parentValue": "558405000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Решение об изъятии земельных участков и (или) расположенных на них иных объектов недвижимого имущества в целях размещения олимпийских объектов",
                        "value": "558405030000",
                        "parentValue": "558405000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Копия акта приема-передачи объектов недвижимого имущества, в отношении которых принято решение об изъятии в целях размещения олимпийских объектов",
                        "value": "558405040000",
                        "parentValue": "558405000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "ДОКУМЕНТЫ, СОДЕРЖАЩИЕ СВЕДЕНИЯ ЕГРП",
                "value": "558403000000",
                "parentValue": "558400000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Выписка из ЕГРП о бесхозяйном объекте недвижимого имущества, принятом на учёт",
                        "value": "558403110000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из единого государственного реестра прав на недвижимое имущество и сделок с ним, удостоверяющая проведение государственной регистрации возникновения и (или) перехода прав на недвижимое имущество",
                        "value": "558403120000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Иной документ",
                        "value": "558403990000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из ЕГРП о принятии на учёт бесхозяйного объекта недвижимого имущества",
                        "value": "558403090000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Копии договоров и иных документов, выражающих содержание односторонних сделок, совершенных в простой письменной форме",
                        "value": "558403080000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Справка о лицах, получивших сведения об объекте недвижимого имущества",
                        "value": "558403070000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Справка о содержании правоустанавливающих документов на объект недвижимого имущества",
                        "value": "558403060000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Свидетельство о государственной регистрации права",
                        "value": "558403010000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка о признании правообладателя недееспособным или ограниченно дееспособным",
                        "value": "558403050000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка о правах на объект недвижимого имущества",
                        "value": "558403020000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка о правах отдельного лица на имеющиеся у него объекты недвижимого имущества",
                        "value": "558403040000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка из ЕГРП о принятии на учёт бесхозяйного объекта недвижимого имущества, от права собственности на который собственник отказался",
                        "value": "558403100000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Выписка о переходе прав на объект недвижимого имущества",
                        "value": "558403030000",
                        "parentValue": "558403000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "label": "Решения, уведомления, расписки",
        "value": "558500000000",
        "selectable": false,
        "children": [
            {
                "label": "Расписка в получении документов на государственный кадастровый учет и (или) государственную регистрацию прав",
                "value": "558503000100",
                "parentValue": "558500000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Документы о результатах государственного кадастрового учёта",
                "value": "558501000000",
                "parentValue": "558500000000",
                "selectable": false,
                "children": [
                    {
                        "label": "ПРОЧИЕ",
                        "value": "558501030000",
                        "parentValue": "558501000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Протокол проверок сведений о зданиях, сооружениях, помещениях, объектах незавершенного строительства (верификация)",
                                "value": "558501030900",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Документ, содержащий сведения о расчете среднего (взвешенного по площади) значения УПКС помещений",
                                "value": "558501030700",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол проверок сведений о земельных участках (верификация)",
                                "value": "558501030800",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Акт определения кадастровой стоимости объектов недвижимости",
                                "value": "558501030500",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол выявления кадастровой ошибки",
                                "value": "558501030600",
                                "parentValue": "558501030000",
                                "selectable": false,
                                "children": [
                                    {
                                        "label": "Протокол выявления кадастровой ошибки в сведениях ГКН о местоположении границ земельного участка",
                                        "value": "558501030601",
                                        "parentValue": "558501030600",
                                        "selectable": true,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "label": "Акт определения кадастровой стоимости земельных участков",
                                "value": "558501030300",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол выявления технической ошибки",
                                "value": "558501030400",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Расписка в получении соответствующих документов для проведения государственного кадастрового учёта",
                                "value": "558501030100",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол проверки документов",
                                "value": "558501030200",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Протокол проверок пространственных данных кадастра (верификация)",
                                "value": "558501031000",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Иные документы",
                                "value": "558501039900",
                                "parentValue": "558501030000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "УВЕДОМЛЕНИЯ ГКН",
                        "value": "558501020000",
                        "parentValue": "558501000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Уведомление о регистрации права",
                                "value": "558501020900",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о приостановлении осуществления кадастровой процедуры",
                                "value": "558501020700",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отказе в осуществлении кадастровой процедуры",
                                "value": "558501020800",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об устранении технической ошибки в сведениях ГКН",
                                "value": "558501020500",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отказе в выдаче сведений об ОКС",
                                "value": "558501020600",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о неполучении и нерассмотрении запроса о предоставлении сведений ГКН",
                                "value": "558501021400",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отказе в приеме документов для внесения в Единый государственный реестр объектов капитального строительства (далее - Единый государственный реестр) сведений об ОКС",
                                "value": "558501020300",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отказе в приеме документов для предоставления из Единого государственного реестра сведений об ОКС",
                                "value": "558501020400",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о снятии с учёта имущества в качестве бесхозяйного",
                                "value": "558501021200",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отсутствии в ГКН запрашиваемых сведений",
                                "value": "558501020100",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о возврате заявления о наличии возражения в отношении зарегистрированного права на объект недвижимости без рассмотрения",
                                "value": "558501021300",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об осуществлённом кадастровом учёте",
                                "value": "558501020200",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о приостановлении принятия на учёт имущества в качестве бесхозяйного",
                                "value": "558501021000",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Сообщение об отказе в принятии на учёт имущества в качестве бесхозяйного",
                                "value": "558501021100",
                                "parentValue": "558501020000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "РЕШЕНИЯ",
                        "value": "558501010000",
                        "parentValue": "558501000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Решение об отказе в выдаче кадастрового паспорта",
                                "value": "558501010900",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об отказе в снятии приостановления",
                                "value": "558501010700",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о снятии с кадастрового учёта земельных участков со статусом «временные» по заявлению заинтересованного лица",
                                "value": "558501010800",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об отказе в осуществлении кадастровой процедуры",
                                "value": "558501010500",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о необходимости устранения кадастровой ошибки в сведениях ГКН о местоположении границ земельного участка",
                                "value": "558501011701",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о необходимости устранения кадастровой ошибки в сведениях ГКН",
                                "value": "558501011700",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о погашении записи о заявлении о невозможности государственной регистрации",
                                "value": "558501011600",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о приостановлении осуществления кадастровой процедуры",
                                "value": "558501010600",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об отказе в исправлении технической ошибки",
                                "value": "558501010300",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о погашении записи о наличии возражения",
                                "value": "558501011400",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об исправлении технической и кадастровой ошибок",
                                "value": "558501010400",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о внесении записи о заявлении о невозможности государственной регистрации",
                                "value": "558501011500",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об отказе в предоставлении запрашиваемых сведений",
                                "value": "558501010100",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об отклонении заявления об исправлении технической ошибки",
                                "value": "558501011200",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об отказе в исправлении кадастровой ошибки",
                                "value": "558501010200",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение о внесении записи о наличии возражения",
                                "value": "558501011300",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об осуществлении кадастровой процедуры",
                                "value": "558501011000",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Решение об аннулировании кадастровых сведений",
                                "value": "558501011100",
                                "parentValue": "558501010000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "label": "ДОКУМЕНТЫ О РЕЗУЛЬТАТАХ РЕГИСТРАЦИИ ПРАВ",
                "value": "558502000000",
                "parentValue": "558500000000",
                "selectable": false,
                "children": [
                    {
                        "label": "ПРОЧИЕ",
                        "value": "558502020000",
                        "parentValue": "558502000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Иной документ",
                                "value": "558502029900",
                                "parentValue": "558502020000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Расписка в получении документов на государственную регистрацию прав",
                                "value": "558502020100",
                                "parentValue": "558502020000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "УВЕДОМЛЕНИЯ, СООБЩЕНИЯ",
                        "value": "558502010000",
                        "parentValue": "558502000000",
                        "selectable": false,
                        "children": [
                            {
                                "label": "Сообщение об отказе в предоставлении сведений из ЕГРП",
                                "value": "558502010700",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о непринятии заявления и документов, необходимых для государственной регистрации прав, к рассмотрению.",
                                "value": "558502011900",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Сообщение об отказе в государственной регистрации прав",
                                "value": "558502010600",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о неполучении и нерассмотрении запроса о предоставлении сведений ЕГРП",
                                "value": "558502011800",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об исправлении технической ошибки в записях единого государственного реестра прав на недвижимое имущество и сделок с ним",
                                "value": "558502010500",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о возврате документов без рассмотрения при отказе в осуществлении государственного кадастрового учета",
                                "value": "558502011700",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о поступлении решения суда, вступившего в законную силу, с указанием срока окончания осуществления государственной регистрации прав, в случае если отказ в государственной регистрации прав признан судом необоснованным",
                                "value": "558502011500",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о внесении изменений в ЕГРП",
                                "value": "558502010400",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о внесении изменений в единый государственный реестр прав на недвижимое имущество и сделок с ним в связи с изменением содержащихся в базовых государственных информационных ресурсах сведений о правообладателе (правообладателях)",
                                "value": "558502011600",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Сообщение о приёме заявления о государственной регистрации права, ограничения (обременения) права на предприятие, сделки с ним",
                                "value": "558502010900",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отсутствии в ЕГРП запрашиваемых сведений",
                                "value": "558502010800",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Сообщение о поступлении документов на государственную регистрацию договоров мены и (или) перехода права",
                                "value": "558502011000",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о государственной регистрации права собственности субъекта Российской Федерации или муниципального образования на земельный участок или земельную долю вследствие отказа от соответствующего права правообладателем",
                                "value": "558502011400",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о зарегистрированных ограничениях (обременениях) прав",
                                "value": "558502010300",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление об отсутствии сведений о лицах, получивших сведения об объектах недвижимого имущества",
                                "value": "558502011300",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о прекращении государственной регистрации прав",
                                "value": "558502010200",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о государственной регистрации прекращения ограничения (обременения)",
                                "value": "558502011200",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о приостановлении государственной регистрации прав",
                                "value": "558502010100",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            },
                            {
                                "label": "Уведомление о возврате приложенных к заявлению документов без рассмотрения",
                                "value": "558502011100",
                                "parentValue": "558502010000",
                                "selectable": true,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "Заявления и запросы ЕГРН",
        "value": "558600000000",
        "selectable": false,
        "children": [
            {
                "label": "Запросы, связанные с выдачей сведений из ЕГРН",
                "value": "558630000000",
                "parentValue": "558600000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Запрос на предоставление сведений, содержащихся в ЕГРН, посредством обеспечения доступа к ФГИС ЕГРН",
                        "value": "558630300000",
                        "parentValue": "558630000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос на предоставление сведений, содержащихся в ЕГРН, об объектах недвижимости и (или) их правообладателях",
                        "value": "558630200000",
                        "parentValue": "558630000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении перечня объектов недвижимости",
                        "value": "558630500000",
                        "parentValue": "558630000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос о предоставлении сведений, содержащихся в ЕГРН, о территории кадастрового квартала, о зоне с особыми условиями использования территорий, территориальной зоне, территории объекта культурного наследия, территории опережающего социально-экономического развития, зоне территориального развития в Российской Федерации, об игорной зоне, о лесничестве, лесопарке, об особо охраняемой природной территории, особой экономической зоне, охотничьих угодьях, об административно-территориальном делении, о береговой линии (границе водного объекта)",
                        "value": "558630400000",
                        "parentValue": "558630000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Запрос на предоставление копии документа, на основании которого внесены сведения в ЕГРН или копий документов, помещенных в реестрвое дело",
                        "value": "558630100000",
                        "parentValue": "558630000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Иные документы, свидетельствующие о соблюдении установленного порядка извещения заинтересованных лиц о проведении собрания о согласовании местоположения границ земельного участка",
                "value": "558699000000",
                "parentValue": "558600000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Заявления на внесение сведений в ЕГРН",
                "value": "558620000000",
                "parentValue": "558600000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Заявление о наличии возражения в отношении зарегистрированного права на объект недвижимости (статья 35 Закона)",
                        "value": "558620200000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о том, что собственник объекта недвижимости не совершал действий, направленные на отказ от права собственности",
                        "value": "558621000000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Документы, направляемые для внесения сведений в ЕГРН в порядке межведомственного информационного взаимодействия (статья 32 Закона)",
                        "value": "558620600000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о принятии вновь имущества во владение, пользование или распоряжение",
                        "value": "558620900000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об исправлении технических ошибок в записях ЕГРН (статья 61 Закона)",
                        "value": "558620400000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Иные заявления и документы, на основании которых в ЕГРН должны быть внесены соответствующие сведения (статьи 33, 35, 36, 37, 38, 69 Закона)",
                        "value": "558620700000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении изменений в ЕГРН (статьи 33, 39, 40, 41, 43, 47, 53 Закона)",
                        "value": "558620100000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о постановке на учет (снятии с учета) бесхозяйных недвижимых вещей (статья 3 Закона);",
                        "value": "558620500000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о внесении изменений в записи реестра прав, ограничений прав и обременений недвижимого имущества Единого государственного реестра недвижимости",
                        "value": "558621100000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Иные документы, принимаемые (представляемые, поступающие) в целях осуществления государственного кадастрового учета и (или) государственной регистрации прав на соответствующие объекты недвижимости, внесения сведений в реестр границ и для внесения в ЕГРН иных предусмотренных Законом сведений",
                        "value": "558620800000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о невозможности государственной регистрации права без личного участия правообладателя (статья 36 Закона);",
                        "value": "558620300000",
                        "parentValue": "558620000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Уведомление о вручении извещения о проведении собрания о согласовании местоположения границ",
                "value": "558602000000",
                "parentValue": "558600000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Заявления о государственном кадастровом учете и (или) государственной регистрации прав",
                "value": "558610000000",
                "parentValue": "558600000000",
                "selectable": false,
                "children": [
                    {
                        "label": "Заявления о государственном кадастровом учете и (или) государственной регистрации прав, ограничений прав, обременений объектов недвижимости, сделок с прилагаемыми документами (статьи 15, 19 Закона)",
                        "value": "558610100000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Дополнительные документы, представляемые заявителем, в том числе с целью устранения причин, приведших к приостановлению государственного кадастрового учета и (или) государственной регистрации прав (статья 29 Закона)",
                        "value": "558610800000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о возобновлении государственного кадастрового учета и (или) государственной регистрации, ранее приостановленных в заявительном порядке",
                        "value": "558610900000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о прекращении осуществления государственного кадастрового учета и государственной регистрации прав (статья 31 Закона)",
                        "value": "558610400000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о государственной регистрации законного владельца закладной, выдаче закладной (статья 16 Закона об ипотеке)",
                        "value": "558610600000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о приостановлении государственного кадастрового учета и (или) государственной регистрации прав (ст. 30 Закона)",
                        "value": "558610300000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление об отказе от права собственности на земельный участок или долю в праве общей собственности на земельный участок из земель сельскохозяйственного назначения (далее - земельная доля) (статья 56 Закона)",
                        "value": "558610700000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Требование судебных приставов-исполнителей о государственном кадастровом учете и (или) государственной регистрации прав на основании судебного акта или осуществляемых в предусмотренных Федеральным законом от 2 октября 2007 г. N 229-ФЗ",
                        "value": "558610200000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    },
                    {
                        "label": "Заявление о погашении регистрационной записи об ипотеке (статья 53 Закона, статья 25 Федерального закона от 16 июля 1998 г. N 102-ФЗ \"Об ипотеке (залоге недвижимости)\"",
                        "value": "558610500000",
                        "parentValue": "558610000000",
                        "selectable": true,
                        "children": []
                    }
                ]
            },
            {
                "label": "Расписка в получении извещений о проведении собрания о согласовании местоположения границ",
                "value": "558601000000",
                "parentValue": "558600000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Копия страницы печатного издания, содержащей извещение о проведении собрания о согласовании местоположения границ земельного участка, включая первый лист, содержащего реквизиты такого печатного издания",
                "value": "558603000000",
                "parentValue": "558600000000",
                "selectable": true,
                "children": []
            }
        ]
    },
    {
        "label": "УВЕДОМЛЕНИЯ ЕГРОН",
        "value": "558700000000",
        "selectable": false,
        "children": [
            {
                "label": "о приостановлении государственного кадастрового учета и (или) государственной регистрации прав",
                "value": "558701000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о государственной регистрации права собственности субъекта РФ или муниципального образования на земельный участок или земельную долю",
                "value": "558709000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о внесении в ЕГРОН сведений в порядке межведомственного информационного взаимодействия по заявлению заинтересованного лица",
                "value": "558704000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "об исправлении технической/ реестровой ошибки в сведениях ЕГРОН",
                "value": "558710000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Уведомление о невозможности внесения в Единый государственный реестр недвижимости сведений в порядке межведомственного информационного взаимодействия",
                "value": "558717000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "об отказе в государственном кадастровом учете и (или) государственной регистрации прав",
                "value": "558702000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о прекращении осуществления государственного кадастрового учета и (или) государственной регистрации прав",
                "value": "558703000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "об исправлении реестровой ошибки в случае, указанном в части 7 статьи 61 ФЗ-218",
                "value": "558711000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Уведомление о представлении заявления о внесении в ЕГРН сведений о расторжении или прекращении договора участия в долевом строительстве",
                "value": "558719000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "об отказе в изменении сведений ЕГРОН",
                "value": "558713000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о внесении в ЕГРН сведений, поступивших в порядке межведомственного информационного взаимодействия",
                "value": "558706000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Уведомление о погашении в ЕГРН записи о государственной регистрации договора участия в долевом строительстве",
                "value": "558720000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Уведомление правообладателей земельных участков, включенных в границы зоны с особыми условиями использования территории, об ограничениях использования земельных участков в границах такой зоны",
                "value": "558718000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "об отказе во внесении в ЕГРОН сведений в порядке межведомственного информационного взаимодействия по заявлению заинтересованного лица",
                "value": "558705000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о внесении в ЕГРН сведений в уведомительном порядке",
                "value": "558707000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о возврате прилагаемых к заявлению о государственном кадастровом учете и (или) государственной регистрации прав документов без рассмотрения",
                "value": "558712000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "об отказе во включении сведений о ранее учтенном объекте недвижимости в ЕГРН",
                "value": "558715000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "о принятии на учет бесхозяйного объекта недвижимого имущества",
                "value": "558714000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "участникам общей долевой собственности о внесенных в ЕГРОН изменениях в части размеров, принадлежащих им земельных долей",
                "value": "558708000000",
                "parentValue": "558700000000",
                "selectable": true,
                "children": []
            }
        ]
    },
    {
        "label": "о внесении в Единый государственный реестр недвижимости сведений о кадастровой стоимости на основании решения комиссии по рассмотрению споров о результатах определения кадастровой стоимости или на основании решения суда",
        "value": "558728000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "о невозможности внесения в Единый государственный реестр недвижимости сведений о кадастровой стоимости на основании решения комиссии по рассмотрению споров о результатах определения кадастровой стоимости или на основании решения суда",
        "value": "558729000000",
        "selectable": true,
        "children": []
    },
    {
        "label": "Документы, подтверждающие право на льготу",
        "value": "558800000000",
        "selectable": false,
        "children": [
            {
                "label": "Удостоверение инвалида Отечественной войны, выданное в соответствии с Постановлением Совета Министров СССР от 23 февраля 1981 г. N 209 инвалидам Великой Отечественной войны из числа лиц, указанных в статье 4 Федерального закона «О ветеранах»",
                "value": "558801000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Иной документ, подтверждающий право на льготу",
                "value": "558808000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение о праве на льготы, выданное в соответствии с Постановлением ЦК КПСС и Совета Министров СССР от 14 мая 1985 г. N 416 участникам Великой Отечественной войны из числа лиц, указанных в подпункте «и», подпункта 1 пункта 1 статьи 2 Федерального закона «О ветеранах»",
                "value": "558806000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение участника войны, выданное в соответствии с Постановлением ЦК КПСС и Совета Министров СССР от 10 ноября 1978 г. N 907, удостоверение о праве на льготы, выданного в соответствии с Постановлением ЦК КПСС и Совета Министров СССР от 27 февраля 1981 г. N 220 участникам Великой Отечественной войны из числа лиц, указанных в подпункте «е» подпункта 1 пункта 1 статьи 2 Федерального закона «О ветеранах»",
                "value": "558804000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение о праве на льготы, выданное в соответствии с Постановлением ЦК КПСС и Совета Министров СССР от 27 февраля 1981 г. N 220 участникам Великой Отечественной войны из числа лиц, указанным в подпункте «в», «д» подпункта 1 пункта 1 статьи 2 Федерального закона «О ветеранах»",
                "value": "558803000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение участника войны, выданное в соответствии с Постановлением ЦК КПСС и Совета Министров СССР от 10 ноября 1987 г. N 907 участникам Великой Отечественной войны из числа лиц, указанных в подпунктах «а», «б», «г», «ж» подпункта 1 пункта 1 статьи 2 Федерального закона «О ветеранах»",
                "value": "558802000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение о праве на льготы, выданное в соответствии с Постановлением Совета Министров СССР от 12 мая 1988 г. N 621 участникам Великой Отечественной войны из числа лиц, указанных в подпункте «з», подпункта 1 пункта 1 статьи 2 Федерального закона «О ветеранах»",
                "value": "558805000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            },
            {
                "label": "Удостоверение ветерана Великой Отечественной войны, выданное в соответствии с Постановлением Правительства Российской Федерации от 5 октября 1999 г. N 1122 участникам Великой Отечественной войны из числа лиц, указанных в подпункте 1 пункта 1 статье 2 Федерального закона «О ветеранах»",
                "value": "558807000000",
                "parentValue": "558800000000",
                "selectable": true,
                "children": []
            }
        ]
    }
];

const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

const testResponceDraftRRBefore = {
    "createdDate": 1718290678156,
    "lastModifiedDate": 1718290732128,
    "uid": "d34a23fc-e512-42a4-8137-ef1be5c6a7d5",
    "data": {
        "serviceName": "realEstateObjectOrItsRightholder",
        "superPackageGuid": "8f976bc8-a935-4a34-b296-ef6354381a2d",
        "currentParticipant": 0,
        "participants": [
            {
                "role": "DRAFT_OWNER",
                "snils": "20047111389",
                "type": "BUYER",
                "statementGuid": "ecf892bb-ef26-4cb1-84a2-851bc685eda0",
                "state": "PREVIEW",
                "widgetsData": {
                    "applicant-information": {
                        "ownRole": "declarant",
                        "subjectRole": "person",
                        "fullNameDocumentAndAdditionalInformationArray": [
                            {
                                "surname": "Петров",
                                "name": "Алексей",
                                "patronymic": "Никифорович",
                                "citizenship": {
                                    "label": "РОССИЯ",
                                    "value": "RUS",
                                    "selectable": true,
                                    "children": []
                                },
                                "statelessPerson": false,
                                "documentType": {
                                    "label": "Паспорт гражданина Российской Федерации",
                                    "value": "008001001000",
                                    "parentValue": "008001000000",
                                    "selectable": true,
                                    "children": []
                                },
                                "documentSeries": "0002",
                                "documentNumber": "000006",
                                "documentIssueDate": "01.01.2001",
                                "issuingAuthority": "УВД ФМС",
                                "snils": "200-471-113 89",
                                "phone": "+79017607536",
                                "email": "m.gaynetdinova@gmail.com",
                                "fiasAddress": {
                                    "aoid": "f4bd3df5-b90c-40a4-8527-b7100f3691fc",
                                    "fullName": "Московская область обл., г. Одинцово, д. Барвиха, ул. Кленовая, д.5А",
                                    "okato": "46455000065",
                                    "oktmo": "46755000165",
                                    "details": [
                                        {
                                            "regioncode": "50",
                                            "autocode": "0",
                                            "areacode": "000",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "000",
                                            "streetcode": "0000",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "обл",
                                            "code": "5000000000000",
                                            "aolevel": 1,
                                            "aoguid": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
                                            "okato": "46000000000",
                                            "oktmo": "46000000",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "d286798f-0849-4a7c-8e78-33c88dc964c6",
                                            "name": "region",
                                            "input": {
                                                "defaultValue": "Московская область",
                                                "disabled": true
                                            },
                                            "label": "Область"
                                        },
                                        {
                                            "regioncode": "50",
                                            "autocode": "0",
                                            "areacode": "042",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "000",
                                            "streetcode": "0000",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "г",
                                            "code": "5004200000000",
                                            "aolevel": 3,
                                            "aoguid": "6ae8ad9e-aa6c-4849-92d8-8e637059c9b0",
                                            "okato": "46455000000",
                                            "oktmo": "46755000001",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "0d97cd48-417f-4a36-97b2-ac7d4bc7a9b6",
                                            "name": "area",
                                            "input": {
                                                "defaultValue": "Одинцово",
                                                "disabled": true
                                            },
                                            "label": "Район"
                                        },
                                        {
                                            "regioncode": "50",
                                            "autocode": "0",
                                            "areacode": "042",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "102",
                                            "streetcode": "0000",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "д",
                                            "code": "5004200010200",
                                            "aolevel": 6,
                                            "aoguid": "882aff63-9d2d-4f93-9b3b-67e1c3295747",
                                            "okato": "46455000065",
                                            "oktmo": "46755000165",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "7ba098b7-db23-418c-9c73-dd060132e2f1",
                                            "name": "place",
                                            "input": {
                                                "defaultValue": "Барвиха",
                                                "disabled": true
                                            },
                                            "label": "Деревня"
                                        },
                                        {
                                            "regioncode": "50",
                                            "autocode": "0",
                                            "areacode": "042",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "102",
                                            "streetcode": "0026",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "ул",
                                            "code": "50042000102002600",
                                            "aolevel": 7,
                                            "aoguid": "e4028244-84bb-4f46-9224-bcee374cd164",
                                            "okato": "46455000065",
                                            "oktmo": "46755000165",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "2859f3e6-bafc-41e8-9a47-bba587382c15",
                                            "name": "street",
                                            "input": {
                                                "defaultValue": "Кленовая",
                                                "disabled": true
                                            },
                                            "label": "Улица"
                                        },
                                        {
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "code": null,
                                            "aolevel": 8,
                                            "aoguid": "4b71f33d-b9df-4e84-a579-944a1683f4c8",
                                            "okato": "46455000065",
                                            "oktmo": "46755000165",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "f4bd3df5-b90c-40a4-8527-b7100f3691fchousenum",
                                            "name": "house",
                                            "input": {
                                                "defaultValue": "5А",
                                                "disabled": true
                                            },
                                            "label": "Дом"
                                        },
                                        {
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "code": null,
                                            "aolevel": 8,
                                            "aoguid": "4b71f33d-b9df-4e84-a579-944a1683f4c8",
                                            "okato": "46455000065",
                                            "oktmo": "46755000165",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "f4bd3df5-b90c-40a4-8527-b7100f3691fcbuildnum",
                                            "name": "building1",
                                            "input": {
                                                "defaultValue": "",
                                                "disabled": true
                                            },
                                            "label": "Корпус"
                                        },
                                        {
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "code": null,
                                            "aolevel": 8,
                                            "aoguid": "4b71f33d-b9df-4e84-a579-944a1683f4c8",
                                            "okato": "46455000065",
                                            "oktmo": "46755000165",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "f4bd3df5-b90c-40a4-8527-b7100f3691fcstructnum",
                                            "name": "building2",
                                            "input": {
                                                "defaultValue": "",
                                                "disabled": true
                                            },
                                            "label": "Строение"
                                        },
                                        {
                                            "key": "14",
                                            "name": "apartment",
                                            "input": {},
                                            "useUserData": true,
                                            "aolevel": 14,
                                            "code": null,
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "aoguid": null,
                                            "okato": null,
                                            "oktmo": null,
                                            "showDropdown": true,
                                            "defaultOption": {
                                                "shortName": "кв.",
                                                "label": "Квартира",
                                                "value": "кв"
                                            }
                                        },
                                        {
                                            "key": "15",
                                            "name": "other",
                                            "input": {},
                                            "useUserData": true,
                                            "aolevel": 15,
                                            "code": null,
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "aoguid": null,
                                            "okato": null,
                                            "oktmo": null,
                                            "label": "Иное",
                                            "showDropdown": false
                                        },
                                        {
                                            "key": "postcode",
                                            "name": "postcode",
                                            "input": {
                                                "defaultValue": "143082"
                                            },
                                            "label": "Почтовый индекс",
                                            "useUserData": true,
                                            "showDropdown": false,
                                            "code": null,
                                            "aolevel": null,
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "aoguid": null,
                                            "okato": null,
                                            "oktmo": null
                                        }
                                    ]
                                },
                                "residenceAddress": true
                            }
                        ],
                        "groundsForDataFurnishing": "",
                        "applicantCategory": {
                            "label": "Кадастровый инженер",
                            "value": "357041000000"
                        }
                    },
                    "real-estate-object-or-its-rightholder": {
                        "requestServiceMode": "object",
                        "csvFiles": [],
                        "csvData": null,
                        "realEstateItems": [
                            {
                                "selectedRealEstateItem": {
                                    "value": "59:40:0220102:1",
                                    "label": "59:40:0220102:1; Российская Федерация, Пермский край, г.о. Чернушинский, с. Сульмаш, ул. Нагорная, д. 3; 64.7 кв.м",
                                    "details": {
                                        "objectType": "002001002000",
                                        "objectTypeDesc": "Здание",
                                        "cadNumber": "59:40:0220102:1",
                                        "address": "Российская Федерация, Пермский край, г.о. Чернушинский, с. Сульмаш, ул. Нагорная, д. 3",
                                        "cadPrice": null,
                                        "cadPriceDate": null,
                                        "regDate": 1621285200000,
                                        "assignationBuilding": "204002000000",
                                        "assignationRoom": null,
                                        "mainCharacters": [
                                            {
                                                "code": "05",
                                                "description": "Площадь",
                                                "value": 64.7,
                                                "unitCode": "012002001000",
                                                "unitDescription": "кв.м"
                                            }
                                        ],
                                        "rights": [
                                            {
                                                "code": "001001000000",
                                                "description": "Собственность",
                                                "number": "59:40:0220102:1-59/080/2021-1",
                                                "regDate": 1621285200000,
                                                "part": null
                                            }
                                        ],
                                        "restrictions": [],
                                        "permittedUse": [],
                                        "permittedUseByDoc": null,
                                        "shareSellNotificationAvail": false,
                                        "fiasAddress": {
                                            "aoid": "400e48bf-b61c-4f70-869b-b371190858c2",
                                            "fullName": "Пермский край край., Чернушинский р-н., с. Сульмаш, ул. Нагорная, д.3",
                                            "okato": "57257000077",
                                            "oktmo": "57757000191",
                                            "details": [
                                                {
                                                    "regioncode": "59",
                                                    "autocode": "0",
                                                    "areacode": "000",
                                                    "citycode": "000",
                                                    "ctarcode": "000",
                                                    "placecode": "000",
                                                    "streetcode": "0000",
                                                    "extrcode": "0000",
                                                    "sextcode": "000",
                                                    "shortname": "край",
                                                    "code": "5900000000000",
                                                    "aolevel": 1,
                                                    "aoguid": "4f8b1a21-e4bb-422f-9087-d3cbf4bebc14",
                                                    "okato": "57000000000",
                                                    "oktmo": "57000000",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "c685f6ca-d7e1-4938-8b21-7c20035652d2",
                                                    "name": "region",
                                                    "input": {
                                                        "defaultValue": "Пермский край",
                                                        "disabled": true
                                                    },
                                                    "label": "Край"
                                                },
                                                {
                                                    "regioncode": "59",
                                                    "autocode": "0",
                                                    "areacode": "028",
                                                    "citycode": "000",
                                                    "ctarcode": "000",
                                                    "placecode": "000",
                                                    "streetcode": "0000",
                                                    "extrcode": "0000",
                                                    "sextcode": "000",
                                                    "shortname": "р-н",
                                                    "code": "5902800000000",
                                                    "aolevel": 3,
                                                    "aoguid": "75550fdb-56e3-44d5-a4c4-75ab2cb53e83",
                                                    "okato": "57257000000",
                                                    "oktmo": "57657000",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "e9ba0deb-d018-4721-b9b4-722db34bd0d1",
                                                    "name": "area",
                                                    "input": {
                                                        "defaultValue": "Чернушинский",
                                                        "disabled": true
                                                    },
                                                    "label": "Район"
                                                },
                                                {
                                                    "regioncode": "59",
                                                    "autocode": "0",
                                                    "areacode": "028",
                                                    "citycode": "000",
                                                    "ctarcode": "000",
                                                    "placecode": "014",
                                                    "streetcode": "0000",
                                                    "extrcode": "0000",
                                                    "sextcode": "000",
                                                    "shortname": "с",
                                                    "code": "5902800001400",
                                                    "aolevel": 6,
                                                    "aoguid": "0d6e1527-562a-4c9c-b0bb-bb5ecb0a7b4a",
                                                    "okato": "57257000077",
                                                    "oktmo": "57757000191",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "a0156787-3a8f-40df-9513-915e8a801147",
                                                    "name": "place",
                                                    "input": {
                                                        "defaultValue": "Сульмаш",
                                                        "disabled": true
                                                    },
                                                    "label": "Село"
                                                },
                                                {
                                                    "regioncode": "59",
                                                    "autocode": "0",
                                                    "areacode": "028",
                                                    "citycode": "000",
                                                    "ctarcode": "000",
                                                    "placecode": "014",
                                                    "streetcode": "0033",
                                                    "extrcode": "0000",
                                                    "sextcode": "000",
                                                    "shortname": "ул",
                                                    "code": "59028000014003300",
                                                    "aolevel": 7,
                                                    "aoguid": "4590afed-a569-4b19-8de3-123b0544e500",
                                                    "okato": "57257000077",
                                                    "oktmo": "57757000191",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "f9ce5033-8ada-467e-95b6-af4752e1db60",
                                                    "name": "street",
                                                    "input": {
                                                        "defaultValue": "Нагорная",
                                                        "disabled": true
                                                    },
                                                    "label": "Улица"
                                                },
                                                {
                                                    "regioncode": null,
                                                    "autocode": null,
                                                    "areacode": null,
                                                    "citycode": null,
                                                    "ctarcode": null,
                                                    "placecode": null,
                                                    "streetcode": null,
                                                    "extrcode": null,
                                                    "sextcode": null,
                                                    "shortname": null,
                                                    "code": null,
                                                    "aolevel": 8,
                                                    "aoguid": "4dd2fe9e-465c-4e44-8df9-676320f324dc",
                                                    "okato": "57257000077",
                                                    "oktmo": "57757000191",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "400e48bf-b61c-4f70-869b-b371190858c2housenum",
                                                    "name": "house",
                                                    "input": {
                                                        "defaultValue": "3",
                                                        "disabled": true
                                                    },
                                                    "label": "Дом"
                                                },
                                                {
                                                    "regioncode": null,
                                                    "autocode": null,
                                                    "areacode": null,
                                                    "citycode": null,
                                                    "ctarcode": null,
                                                    "placecode": null,
                                                    "streetcode": null,
                                                    "extrcode": null,
                                                    "sextcode": null,
                                                    "shortname": null,
                                                    "code": null,
                                                    "aolevel": 8,
                                                    "aoguid": "4dd2fe9e-465c-4e44-8df9-676320f324dc",
                                                    "okato": "57257000077",
                                                    "oktmo": "57757000191",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "400e48bf-b61c-4f70-869b-b371190858c2buildnum",
                                                    "name": "building1",
                                                    "input": {
                                                        "defaultValue": "",
                                                        "disabled": true
                                                    },
                                                    "label": "Корпус"
                                                },
                                                {
                                                    "regioncode": null,
                                                    "autocode": null,
                                                    "areacode": null,
                                                    "citycode": null,
                                                    "ctarcode": null,
                                                    "placecode": null,
                                                    "streetcode": null,
                                                    "extrcode": null,
                                                    "sextcode": null,
                                                    "shortname": null,
                                                    "code": null,
                                                    "aolevel": 8,
                                                    "aoguid": "4dd2fe9e-465c-4e44-8df9-676320f324dc",
                                                    "okato": "57257000077",
                                                    "oktmo": "57757000191",
                                                    "useUserData": false,
                                                    "showDropdown": false,
                                                    "key": "400e48bf-b61c-4f70-869b-b371190858c2structnum",
                                                    "name": "building2",
                                                    "input": {
                                                        "defaultValue": "",
                                                        "disabled": true
                                                    },
                                                    "label": "Строение"
                                                },
                                                {
                                                    "key": "14",
                                                    "name": "apartment",
                                                    "input": {},
                                                    "useUserData": true,
                                                    "aolevel": 14,
                                                    "code": null,
                                                    "regioncode": null,
                                                    "autocode": null,
                                                    "areacode": null,
                                                    "citycode": null,
                                                    "ctarcode": null,
                                                    "placecode": null,
                                                    "streetcode": null,
                                                    "extrcode": null,
                                                    "sextcode": null,
                                                    "shortname": null,
                                                    "aoguid": null,
                                                    "okato": null,
                                                    "oktmo": null,
                                                    "showDropdown": true,
                                                    "defaultOption": {
                                                        "shortName": "кв.",
                                                        "label": "Квартира",
                                                        "value": "кв"
                                                    }
                                                },
                                                {
                                                    "key": "15",
                                                    "name": "other",
                                                    "input": {},
                                                    "useUserData": true,
                                                    "aolevel": 15,
                                                    "code": null,
                                                    "regioncode": null,
                                                    "autocode": null,
                                                    "areacode": null,
                                                    "citycode": null,
                                                    "ctarcode": null,
                                                    "placecode": null,
                                                    "streetcode": null,
                                                    "extrcode": null,
                                                    "sextcode": null,
                                                    "shortname": null,
                                                    "aoguid": null,
                                                    "okato": null,
                                                    "oktmo": null,
                                                    "label": "Иное",
                                                    "showDropdown": false
                                                },
                                                {
                                                    "key": "postcode",
                                                    "name": "postcode",
                                                    "input": {
                                                        "defaultValue": "617811"
                                                    },
                                                    "label": "Почтовый индекс",
                                                    "useUserData": true,
                                                    "showDropdown": false,
                                                    "code": null,
                                                    "aolevel": null,
                                                    "regioncode": null,
                                                    "autocode": null,
                                                    "areacode": null,
                                                    "citycode": null,
                                                    "ctarcode": null,
                                                    "placecode": null,
                                                    "streetcode": null,
                                                    "extrcode": null,
                                                    "sextcode": null,
                                                    "shortname": null,
                                                    "aoguid": null,
                                                    "okato": null,
                                                    "oktmo": null
                                                }
                                            ]
                                        }
                                    }
                                },
                                "realEstateItemType": {
                                    "label": "Здание",
                                    "value": "002001002000"
                                },
                                "fiasAddress": {
                                    "aoid": "400e48bf-b61c-4f70-869b-b371190858c2",
                                    "fullName": "Пермский край край., Чернушинский р-н., с. Сульмаш, ул. Нагорная, д.3",
                                    "okato": "57257000077",
                                    "oktmo": "57757000191",
                                    "details": [
                                        {
                                            "regioncode": "59",
                                            "autocode": "0",
                                            "areacode": "000",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "000",
                                            "streetcode": "0000",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "край",
                                            "code": "5900000000000",
                                            "aolevel": 1,
                                            "aoguid": "4f8b1a21-e4bb-422f-9087-d3cbf4bebc14",
                                            "okato": "57000000000",
                                            "oktmo": "57000000",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "c685f6ca-d7e1-4938-8b21-7c20035652d2",
                                            "name": "region",
                                            "input": {
                                                "defaultValue": "Пермский край",
                                                "disabled": true
                                            },
                                            "label": "Край"
                                        },
                                        {
                                            "regioncode": "59",
                                            "autocode": "0",
                                            "areacode": "028",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "000",
                                            "streetcode": "0000",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "р-н",
                                            "code": "5902800000000",
                                            "aolevel": 3,
                                            "aoguid": "75550fdb-56e3-44d5-a4c4-75ab2cb53e83",
                                            "okato": "57257000000",
                                            "oktmo": "57657000",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "e9ba0deb-d018-4721-b9b4-722db34bd0d1",
                                            "name": "area",
                                            "input": {
                                                "defaultValue": "Чернушинский",
                                                "disabled": true
                                            },
                                            "label": "Район"
                                        },
                                        {
                                            "regioncode": "59",
                                            "autocode": "0",
                                            "areacode": "028",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "014",
                                            "streetcode": "0000",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "с",
                                            "code": "5902800001400",
                                            "aolevel": 6,
                                            "aoguid": "0d6e1527-562a-4c9c-b0bb-bb5ecb0a7b4a",
                                            "okato": "57257000077",
                                            "oktmo": "57757000191",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "a0156787-3a8f-40df-9513-915e8a801147",
                                            "name": "place",
                                            "input": {
                                                "defaultValue": "Сульмаш",
                                                "disabled": true
                                            },
                                            "label": "Село"
                                        },
                                        {
                                            "regioncode": "59",
                                            "autocode": "0",
                                            "areacode": "028",
                                            "citycode": "000",
                                            "ctarcode": "000",
                                            "placecode": "014",
                                            "streetcode": "0033",
                                            "extrcode": "0000",
                                            "sextcode": "000",
                                            "shortname": "ул",
                                            "code": "59028000014003300",
                                            "aolevel": 7,
                                            "aoguid": "4590afed-a569-4b19-8de3-123b0544e500",
                                            "okato": "57257000077",
                                            "oktmo": "57757000191",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "f9ce5033-8ada-467e-95b6-af4752e1db60",
                                            "name": "street",
                                            "input": {
                                                "defaultValue": "Нагорная",
                                                "disabled": true
                                            },
                                            "label": "Улица"
                                        },
                                        {
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "code": null,
                                            "aolevel": 8,
                                            "aoguid": "4dd2fe9e-465c-4e44-8df9-676320f324dc",
                                            "okato": "57257000077",
                                            "oktmo": "57757000191",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "400e48bf-b61c-4f70-869b-b371190858c2housenum",
                                            "name": "house",
                                            "input": {
                                                "defaultValue": "3",
                                                "disabled": true
                                            },
                                            "label": "Дом"
                                        },
                                        {
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "code": null,
                                            "aolevel": 8,
                                            "aoguid": "4dd2fe9e-465c-4e44-8df9-676320f324dc",
                                            "okato": "57257000077",
                                            "oktmo": "57757000191",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "400e48bf-b61c-4f70-869b-b371190858c2buildnum",
                                            "name": "building1",
                                            "input": {
                                                "defaultValue": "",
                                                "disabled": true
                                            },
                                            "label": "Корпус"
                                        },
                                        {
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "code": null,
                                            "aolevel": 8,
                                            "aoguid": "4dd2fe9e-465c-4e44-8df9-676320f324dc",
                                            "okato": "57257000077",
                                            "oktmo": "57757000191",
                                            "useUserData": false,
                                            "showDropdown": false,
                                            "key": "400e48bf-b61c-4f70-869b-b371190858c2structnum",
                                            "name": "building2",
                                            "input": {
                                                "defaultValue": "",
                                                "disabled": true
                                            },
                                            "label": "Строение"
                                        },
                                        {
                                            "key": "14",
                                            "name": "apartment",
                                            "input": {},
                                            "useUserData": true,
                                            "aolevel": 14,
                                            "code": null,
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "aoguid": null,
                                            "okato": null,
                                            "oktmo": null,
                                            "showDropdown": true,
                                            "defaultOption": {
                                                "shortName": "кв.",
                                                "label": "Квартира",
                                                "value": "кв"
                                            }
                                        },
                                        {
                                            "key": "15",
                                            "name": "other",
                                            "input": {},
                                            "useUserData": true,
                                            "aolevel": 15,
                                            "code": null,
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "aoguid": null,
                                            "okato": null,
                                            "oktmo": null,
                                            "label": "Иное",
                                            "showDropdown": false
                                        },
                                        {
                                            "key": "postcode",
                                            "name": "postcode",
                                            "input": {
                                                "defaultValue": "617811"
                                            },
                                            "label": "Почтовый индекс",
                                            "useUserData": true,
                                            "showDropdown": false,
                                            "code": null,
                                            "aolevel": null,
                                            "regioncode": null,
                                            "autocode": null,
                                            "areacode": null,
                                            "citycode": null,
                                            "ctarcode": null,
                                            "placecode": null,
                                            "streetcode": null,
                                            "extrcode": null,
                                            "sextcode": null,
                                            "shortname": null,
                                            "aoguid": null,
                                            "okato": null,
                                            "oktmo": null
                                        }
                                    ]
                                },
                                "cadastralNumber": "59:40:0220102:1",
                                "area": "64.7"
                            }
                        ],
                        "requestAboutObject": {
                            "extractDescription": {
                                "extractDataRequestType1": {
                                    "value": "103",
                                    "label": "Выписка из Единого государственного реестра недвижимости о кадастровой стоимости объекта недвижимости"
                                },
                                "onDate": "03.06.2024"
                            },
                            "deliveryActionEmail": "eliseevan1986@gmail.com"
                        }
                    }
                },
                "widgetsStatus": {
                    "applicant-information": true,
                    "real-estate-object-or-its-rightholder": true,
                    "additional-information": true
                },
                "attachments": {}
            }
        ],
        "commonData": {},
        "computedActionCode": "659511111112",
        "hasSiblingStatements": false,
        "realEstateItems": [
            {
                "cadastralNumber": "59:40:0220102:1",
                "objectKindName": "Здание"
            }
        ]
    },
    "updateDate": 1718290732127,
    "requestType": "Предоставление сведений об объектах недвижимости и (или) их правообладателях",
    "cadastralNumber": "59:40:0220102:1",
    "emptyCadastralNumber": false,
    "conditionalNumber": "8f976bc8-a935-4a34-b296-ef6354381a2d",
    "currentStep": "0:PREVIEW:1",
    "currentStepOrder": "Заполнение",
    "format": "REACT",
    "ppozSending": false,
    "version": 3,
    "cleaned": false,
    "system": "9671f274-2e7f-4731-b370-222988f30212",
    "profile": {
        "createdDate": 1613464464369,
        "lastModifiedDate": 1613464464369,
        "id": 4761,
        "user": {
            "createdDate": null,
            "lastModifiedDate": 1701505340844,
            "id": 1000475728,
            "snils": "20047111389",
            "phone": "+7(901)7607536",
            "email": "m.gaynetdinova@gmail.com",
            "agreementConfirmed": true
        }
    }
}

const constants = {
    "annaganna.design@gmail.com": 1,
    "cghronotop@gmail.com": 2,
    "emilyhamilton12345@gmail.com": 3,
    "estorde@gmail.com": 4,
    "hello@lychkovskiy.com": 5,
    "i.goryacheva@gmail.com": 6,
    "iul.ratnikova@gmail.com": 7,
    "jilkina@gmail.com": 8,
    "rslone@uark.edu": 9,
    "svishnakov@gmail.com": 10,
    "th.a.tmrk@gmail.com": 11,
}

function TotalPage() {

    const [images, setImages] = useState(testImagesData);
    const [rowData, setRowData] = useState(result);

// Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            field: "imageNum",
            width: 150,
        },
        {
            field: "url",
            width: 700,
            cellRenderer: OpenEditor,
        },
        { field: "1", width: 40, },
        { field: "2", width: 40, },
        { field: "3", width: 40, },
        { field: "4", width: 40, },
        { field: "5", width: 40, },
        { field: "6", width: 40, },
        { field: "7", width: 40, },
        { field: "8", width: 40, },
        { field: "9", width: 40, },
        { field: "10", width: 50, },
        { field: "11", width: 50, },
        { field: "middleK", width: 150 },
    ]);

    const likesRef = collection(db, "likes");

    const getImages = async () => {
        // console.log('url', url);
        const docRef = await collection(db, "images");
        // console.log("docs", docs);
        const docSnapshot = await getDocs(docRef);
        // console.log('docSnapshot', docSnapshot);

        let array = [];
        docSnapshot.forEach((doc) => {
            // console.log(doc.data());
            array.push({ id: doc.id, ...doc.data() })
        })

        setImages(array);

    }

    const getStyle = (num) => {
        // console.log("getStyle num", num);
        if (num > 0 && num < 100) {
            return { background: 'lightcoral' };
        } else if (num >= 100 && num < 200) {
            return { background: 'lightgreen' };
        } else if (num >= 200 && num < 300) {
            return { background: 'lightyellow' };
        } else if (num >= 300 && num < 400) {
            return { background: 'lightseagreen' };
        } else if (num >= 400 && num < 500) {
            return { background: 'lightblue' };
        } else if (num >= 500 && num < 600) {
            return { background: 'lightsalmon' };
        } else if (num >= 600 && num < 700) {
            return { background: 'lightskyblue' };
        } else {
            return {}
        }
    }

    useEffect(() => {
        // getImages();
    }, [])

    useEffect(() => {
        if (images.length > 0) {
            return;
            // console.log("images[0].num", images[0].num);
            let arrayRows = [];

            // console.log("started arrayRows", arrayRows);

            images.forEach((img, index) => {
                // if (index > 0) {
                //     return;
                // }
                let obj = { imageNum: img.num, url: img.url };

                const q = query(likesRef, where('imageNum', '==', img.num), orderBy("createBy", 'desc'));
                onSnapshot(q, (snap) => {
                    console.log('======> onSnapshot images', snap);
                    snap.forEach((doc) => {

                        const likeInfo = doc.data();
                        // console.log("likeInfo", likeInfo.email);
                        // console.log("obj in", obj);
                        if (!obj.hasOwnProperty(constants[likeInfo.email])) {
                            obj[constants[likeInfo.email]] = likeInfo.value;
                        }

                        // obj[likeInfo.email] = likeInfo.value;
                        // array.push({ id: doc.id, ...doc.data() })
                    })
                    const middleK = (obj[1] + obj[2] + obj[3] + obj[4] + obj[5] + obj[6] + obj[7] + obj[8] + obj[9] + obj[10] + obj[11]) / 11;

                    arrayRows.push({ ...obj, middleK: middleK.toFixed(3) });
                    // console.log("after arrayRows", arrayRows);
                    // setRowData(arrayRows);
                    // if (images.length === 0) {
                    //     getALlUrls(snap);
                    // }
                    if (index === 191) {
                        // console.log(arrayRows);
                        setRowData(arrayRows);
                    }
                })
            });

            // console.log("after arrayRows", arrayRows);

            // const q = query(likesRef, where('imageNum', '==', images[0].num), orderBy("createBy", 'desc'));
            // const q2 = query(likesRef, where('imageNum', '==', images[191].num), orderBy("createBy", 'desc'));
            // let obj = { imageNum: images[0].num };
            // let obj2 = { imageNum: images[191].num };
            //
            // console.log("before obj", obj);
            //
            // onSnapshot(q, (snap) => {
            //     console.log('onSnapshot 1 images', snap);
            //     snap.forEach((doc) => {
            //
            //         const likeInfo = doc.data();
            //         console.log("likeInfo", likeInfo.email);
            //         console.log("obj in", obj);
            //         if (!obj.hasOwnProperty(likeInfo.email)) {
            //
            //             obj[likeInfo.email] = likeInfo.value;
            //         }
            //
            //         // obj[likeInfo.email] = likeInfo.value;
            //         // array.push({ id: doc.id, ...doc.data() })
            //     })
            //     console.log("after obj", obj);
            //     // if (images.length === 0) {
            //     //     getALlUrls(snap);
            //     // }
            // })
            //
            // onSnapshot(q2, (snap) => {
            //     console.log('onSnapshot 2 images', snap);
            //     snap.forEach((doc) => {
            //
            //         const likeInfo = doc.data();
            //         console.log("likeInfo", likeInfo.email);
            //         console.log("obj in", obj2);
            //         if (!obj2.hasOwnProperty(likeInfo.email)) {
            //
            //             obj2[likeInfo.email] = likeInfo.value;
            //         }
            //
            //         // obj[likeInfo.email] = likeInfo.value;
            //         // array.push({ id: doc.id, ...doc.data() })
            //     })
            //     console.log("after obj", obj2);
            //     // if (images.length === 0) {
            //     //     getALlUrls(snap);
            //     // }
            // })

            // images.forEach((img) => {
            //     console.log("img.id", img.id);
            // })
            // const q = query(collectionRef, where('name', '==', lindId), orderBy("createDate"));
            // onSnapshot(q, (snap) => {
            //     // console.log('onSnapshot images', images);
            //     if (snaps.length === 0) {
            //         // console.log('snap', snap)
            //         setSnaps(snap.docs);
            //     }
            //     // if (images.length === 0) {
            //     //     getALlUrls(snap);
            //     // }
            // })
        }
    }, [images])

    // console.log("after arrayRows", arrayRows);
    // console.log("images", images);

    return <div style={{color: 'rgb(0, 203, 95)', fontSize: 19}}>
        <h1>
            Total
        </h1>
        <br/>
        <span style={{fontWeight: "bold"}}>Participant:</span> {images?.length} images
        <br/>
        <br/>
        <span style={{fontWeight: "bold"}}>Categories:</span>
        <br/>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>Tastes of the world</div>
            <div> images nums: 1-99</div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>Bread and sour cream</div>
            <div> images nums: 100-199</div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>The inner light</div>
            <div> images nums: 200-299</div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>The world around us through the eyes of an optimist</div>
            <div> images nums: 300-399</div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>Breathe</div>
            <div> images nums: 400-499</div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>My inner monster (sour, sad, spicy, bitter, cheerful or sweet)</div>
            <div> images nums: 500-599</div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "400px"}}>Eat, drink and love</div>
            <div> images nums: 600-699</div>
        </div>
        <br/>
        <span style={{fontWeight: "bold"}}>Juri:</span>
        <br/>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> annaganna.design@gmail.com</div>
            <div> {constants["annaganna.design@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> cghronotop@gmail.com</div>
            <div> {constants["cghronotop@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> emilyhamilton12345@gmail.com</div>
            <div> {constants["emilyhamilton12345@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> estorde@gmail.com</div>
            <div> {constants["estorde@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> hello@lychkovskiy.com</div>
            <div> {constants["hello@lychkovskiy.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> i.goryacheva@gmail.com</div>
            <div> {constants["i.goryacheva@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> iul.ratnikova@gmail.com</div>
            <div> {constants["iul.ratnikova@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> jilkina@gmail.com</div>
            <div> {constants["jilkina@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> rslone@uark.edu</div>
            <div> {constants["rslone@uark.edu"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> svishnakov@gmail.com</div>
            <div> {constants["svishnakov@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> th.a.tmrk@gmail.com</div>
            <div> {constants["th.a.tmrk@gmail.com"]} </div>
        </div>
        <br/>
            <CSVLink data={result} headers={headers}>
                Download me
            </CSVLink>;
        <br/>
        <div
            className="ag-theme-quartz"
            style={{height: 500}}
        >
            <AgGridReact
                containerStyle={{width: 1450}}
                rowData={rowData}
                columnDefs={colDefs}
                domLayout="autoHeight"
                getRowStyle={(params) => {
                    return getStyle(params.data.imageNum);
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
            />
        </div>


    </div>
}

export default TotalPage;
