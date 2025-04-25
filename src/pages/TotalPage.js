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
        "id": "0C1OHSKH8fl7EyPHUrpm",
        "url": "https://drive.google.com/thumbnail?id=1A9PQLZbESxXMYVm8UeE79OzRXtnzhIOR&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053504,
            "nanoseconds": 140000000
        },
        "num": 549
    },
    {
        "id": "0S8skRJMM6RSOFpMYPSh",
        "num": 9,
        "url": "https://drive.google.com/thumbnail?id=15Ob6zrsYkjIWiut-Ni48U1DTxCTsxkY0&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745044168,
            "nanoseconds": 582000000
        }
    },
    {
        "id": "0VTKvwg3aSVcLyjHSnPH",
        "num": 46,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1uniOKxSPWjJMer0mJFWoCTnDnwNX5xYQ&sz=w595",
        "createDate": {
            "seconds": 1745047017,
            "nanoseconds": 994000000
        }
    },
    {
        "id": "0bIEfKyaII11Fl8kX8QQ",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048744,
            "nanoseconds": 319000000
        },
        "url": "https://drive.google.com/thumbnail?id=1B5bq1p3FUK5hRyVfYBVw2kjVk5yOEnZ4&sz=w595",
        "num": 147
    },
    {
        "id": "13Lzeh8D52v1YRmPSxJ0",
        "category": "The cultural code",
        "num": 544,
        "url": "https://drive.google.com/thumbnail?id=1VKhzuM1V_0RdGcSUUTdtSn97ufHtiQxS&sz=w595",
        "createDate": {
            "seconds": 1745053432,
            "nanoseconds": 79000000
        }
    },
    {
        "id": "13aHZO3Hi3qS0OEiQNDb",
        "num": 146,
        "createDate": {
            "seconds": 1745048735,
            "nanoseconds": 683000000
        },
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1yF3E5ZxQPuaJxbe4rCDnWzqCilBtKd7E&sz=w595"
    },
    {
        "id": "19Z9mGERS36nGUWHcZX1",
        "url": "https://drive.google.com/thumbnail?id=1ZIGVTAeSWGIzvZXpdF6eD_-6wVkp7M1f&sz=w595",
        "num": 130,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048494,
            "nanoseconds": 474000000
        }
    },
    {
        "id": "1G2ag4ZPmBngKgAi6uW9",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048193,
            "nanoseconds": 881000000
        },
        "url": "https://drive.google.com/thumbnail?id=IegtXLXy_UxzlE3arxsesZjkwIOnn5SB &sz=w595",
        "num": 109
    },
    {
        "id": "2IqZGICIyEZcMESk08fy",
        "createDate": {
            "seconds": 1745044589,
            "nanoseconds": 898000000
        },
        "category": "Music Poster",
        "num": 17,
        "url": "https://drive.google.com/thumbnail?id=1-vlk7I9Leok4qOP-LAQAC7LXE7KL0wxY&sz=w595"
    },
    {
        "id": "2fahzHRRcOd7B0ZPbxtg",
        "createDate": {
            "seconds": 1745043526,
            "nanoseconds": 285000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Ssdfkus_7cqxmujkLiySTEgKZY6NdNiA&sz=w595",
        "category": "Music Poster",
        "num": 4
    },
    {
        "id": "3TiO1ElqVNPTkt278LM2",
        "url": "https://drive.google.com/thumbnail?id=1pYZNiYkxjf6f0zm9O6jN7-7b33uh8uPX&sz=w595",
        "num": 125,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048444,
            "nanoseconds": 95000000
        }
    },
    {
        "id": "3lLrkgRIPH1mVqcPzgHG",
        "createDate": {
            "seconds": 1745051660,
            "nanoseconds": 583000000
        },
        "num": 338,
        "url": "https://drive.google.com/thumbnail?id=1UzVXqA1cRz4vWvEkgtOrip9Phavka5UI&sz=w595",
        "category": "Myths and legends"
    },
    {
        "id": "41r5litmKPHGVBx02n3D",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1iK1YLw17ZZP0N6kl0q_RjlWMf-8jGfrh&sz=w595",
        "createDate": {
            "seconds": 1745048476,
            "nanoseconds": 738000000
        },
        "num": 128
    },
    {
        "id": "4H2AwhMwZx0nlJxMr7vj",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048802,
            "nanoseconds": 98000000
        },
        "url": "https://drive.google.com/thumbnail?id=1NLBMp0Fng93Fh3Gphm9uaCbi_Dua0NOC&sz=w595",
        "num": 151
    },
    {
        "id": "4IKZVORPREozppHRfbDi",
        "createDate": {
            "seconds": 1745048160,
            "nanoseconds": 793000000
        },
        "url": "https://drive.google.com/thumbnail?id=1dNphi8YkN9tc__1FjLvYBjS_MlmLohyZ&sz=w595",
        "num": 107,
        "category": "Music Poster"
    },
    {
        "id": "4PaqNHTunCw5b3OCxcjM",
        "createDate": {
            "seconds": 1745053224,
            "nanoseconds": 228000000
        },
        "num": 531,
        "url": "https://drive.google.com/thumbnail?id=1xsLmDocOvDMi54ZpI44QeQW_82sbQJVc&sz=w595",
        "category": "The cultural code"
    },
    {
        "id": "4Zn3m23KrACjGWw4pgVn",
        "createDate": {
            "seconds": 1745054142,
            "nanoseconds": 499000000
        },
        "url": "https://drive.google.com/thumbnail?id=15Ne7yVq91TlGenCKbpxsY2ZimWb9CGG4&sz=w595",
        "category": "The cultural code",
        "num": 578
    },
    {
        "id": "4k4eFHfxktK6q278a1bN",
        "category": "Music Poster",
        "num": 77,
        "url": "https://drive.google.com/thumbnail?id=1zwqvkHgGBsnfxAhN6EgcXNyI53a-v5tS&sz=w595",
        "createDate": {
            "seconds": 1745047683,
            "nanoseconds": 247000000
        }
    },
    {
        "id": "4oKQfBL0H04Y6IYCRnHb",
        "url": "https://drive.google.com/thumbnail?id=1QBJrjf2EvKYhgP7FR3KVRh54km4QBgUD&sz=w595",
        "num": 18,
        "createDate": {
            "seconds": 1745044607,
            "nanoseconds": 989000000
        },
        "category": "Music Poster"
    },
    {
        "id": "4pgl01GTVUI2z2WFlAGV",
        "category": "Music Poster",
        "num": 61,
        "url": "https://drive.google.com/thumbnail?id=15fq1ILPeSvooAihJtQOweY5qvWpM6Fy7&sz=w595",
        "createDate": {
            "seconds": 1745047435,
            "nanoseconds": 357000000
        }
    },
    {
        "id": "50VDYb1OyN2RRaflIqmj",
        "createDate": {
            "seconds": 1745053334,
            "nanoseconds": 166000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1GDJ2d2NDVN94TxG97cC_XBVa336cWZ-t&sz=w595",
        "num": 539
    },
    {
        "id": "51fCYzLj4EJ4Dz9jOAnK",
        "createDate": {
            "seconds": 1745051767,
            "nanoseconds": 773000000
        },
        "url": "https://drive.google.com/thumbnail?id=1fN0b0WUVcce9lusEVAQ4uslElmR0V0pz&sz=w595",
        "num": 348,
        "category": "Myths and legends"
    },
    {
        "id": "5NNKMeqijoCayxeu9N8a",
        "url": "https://drive.google.com/thumbnail?id=1Ww_o_AtRq2x2X0WSoq8R5dEfQRuQVvT3&sz=w595",
        "num": 40,
        "createDate": {
            "seconds": 1745046797,
            "nanoseconds": 940000000
        },
        "category": "Music Poster"
    },
    {
        "id": "5SLdR3LAkpNfaJTXUJ7t",
        "num": 44,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1j9OxQ72VUJ2MmhH752QRCdPmo-jXbEKW&sz=w595",
        "createDate": {
            "seconds": 1745046933,
            "nanoseconds": 40000000
        }
    },
    {
        "id": "5WFn0AK2VzqOeBoXsiWM",
        "url": "https://drive.google.com/thumbnail?id=1YcVeopkz2KOZtlV-0DygVMPG2lyVJQD6&sz=w595",
        "num": 354,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051854,
            "nanoseconds": 476000000
        }
    },
    {
        "id": "5jQp8tq8JXgaS1CUMIe4",
        "num": 16,
        "createDate": {
            "seconds": 1745044575,
            "nanoseconds": 537000000
        },
        "url": "https://drive.google.com/thumbnail?id=1uV9pvGQ7afElqcF1hvx626yPcaVlDILR&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "61eBMN2Gqu1QSacPaomF",
        "url": "https://drive.google.com/thumbnail?id=1cHTczGWk5ZGYdX-7Q4t3nx-uKnq-TRga&sz=w595",
        "category": "Myths and legends",
        "num": 320,
        "createDate": {
            "seconds": 1745051395,
            "nanoseconds": 523000000
        }
    },
    {
        "id": "69INuxHzrMI4rcwf75k6",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1MU0oXU9Ov4V0IQcgGUHLSLCTWZ-vWKAG&sz=w595",
        "num": 94,
        "createDate": {
            "seconds": 1745047967,
            "nanoseconds": 733000000
        }
    },
    {
        "id": "6FYCiqP4atvhb3uULXDD",
        "num": 112,
        "createDate": {
            "seconds": 1745048226,
            "nanoseconds": 703000000
        },
        "url": "https://drive.google.com/thumbnail?id=1PZZcrVCUaOwz8o_bFrLVM5SkKUztb_rZ&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "6HUy9LRexgeBqqTH6aGL",
        "url": "https://drive.google.com/thumbnail?id=1KukR-s5JeAblLrLXJuMNGBYKFIPyAC0m&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053059,
            "nanoseconds": 575000000
        },
        "num": 517
    },
    {
        "id": "6InEhzDp2UdXOUdNPv9r",
        "num": 42,
        "createDate": {
            "seconds": 1745046858,
            "nanoseconds": 886000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Bas5ycu84-Mk9ls9aMOjUKhIHPd-5eZJ&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "6R2l8lVMFhG8GnJ2Xxqg",
        "createDate": {
            "seconds": 1745053468,
            "nanoseconds": 807000000
        },
        "num": 547,
        "url": "https://drive.google.com/thumbnail?id=1keGQ0mxWsZXY6zDZZ_13w-07GUx1c0LU&sz=w595",
        "category": "The cultural code"
    },
    {
        "id": "6fesvaAz6ZaPogTm8jUz",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047304,
            "nanoseconds": 498000000
        },
        "num": 53,
        "url": "https://drive.google.com/thumbnail?id=1ls6A3wpuVKbI3pdx-Ndut7UFa_KszuKO&sz=w595"
    },
    {
        "id": "6lebkGN6FVahz5pWZ9zr",
        "url": "https://drive.google.com/thumbnail?id=1vbWvW_v_6GWoeB62QIf2xl7PciPkyV_R&sz=w595",
        "category": "The cultural code",
        "num": 515,
        "createDate": {
            "seconds": 1745053023,
            "nanoseconds": 321000000
        }
    },
    {
        "id": "6qGs5wfh4Po0pCGlVFCa",
        "url": "https://drive.google.com/thumbnail?id=1NRWSTEHMjHf53LxWwRRMmq9VqqCh6Prb&sz=w595",
        "category": "Music Poster",
        "num": 127,
        "createDate": {
            "seconds": 1745048467,
            "nanoseconds": 1000000
        }
    },
    {
        "id": "765d7FgqKDTQFJ4DiIPg",
        "num": 520,
        "createDate": {
            "seconds": 1745053085,
            "nanoseconds": 632000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Ed2w7JSEkhrDmWNJ7kWcmBEb4oZL1JmL&sz=w595",
        "category": "The cultural code"
    },
    {
        "id": "7IkNZ2TggvD915kSIZ5A",
        "url": "https://drive.google.com/thumbnail?id=1-G65a9B32SdnCaDgoqo3bIvxMKWkPNYq&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745054132,
            "nanoseconds": 956000000
        },
        "num": 577
    },
    {
        "id": "7opJZ2uwNGS7dcU5ggk9",
        "url": "https://drive.google.com/thumbnail?id=1bkWd0xd35NcuuQjXMl5yfnZoihHZ9BZz&sz=w595",
        "createDate": {
            "seconds": 1745045260,
            "nanoseconds": 984000000
        },
        "num": 27,
        "category": "Music Poster"
    },
    {
        "id": "7qVaG0GGPFaKCWrAJXZL",
        "createDate": {
            "seconds": 1745052183,
            "nanoseconds": 13000000
        },
        "url": "https://drive.google.com/thumbnail?id=1vJZFSvPuYTLOQjOpOEMWGf1UBKuN3fuk&sz=w595",
        "category": "Myths and legends",
        "num": 374
    },
    {
        "id": "7s64tbr01g5WbAe9kpCb",
        "num": 366,
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1F9O5le9xLC5CsgOU2bWBCPfF8PndmPLb&sz=w595",
        "createDate": {
            "seconds": 1745052069,
            "nanoseconds": 986000000
        }
    },
    {
        "id": "89f2EGWaOeKA7hRKihrs",
        "createDate": {
            "seconds": 1745051978,
            "nanoseconds": 263000000
        },
        "url": "https://drive.google.com/thumbnail?id=18c0gq_5W_K-12a7qFh58CZ670I_T28Mr&sz=w595",
        "num": 358,
        "category": "Myths and legends"
    },
    {
        "id": "8KeO6Zv26BbYiVEtjIf8",
        "createDate": {
            "seconds": 1745046810,
            "nanoseconds": 922000000
        },
        "url": "https://drive.google.com/thumbnail?id=1EdxQg0IvtOMJS0FskLwCdWN3q_xaWEzD&sz=w595",
        "category": "Music Poster",
        "num": 41
    },
    {
        "id": "8QOonT6mqO3JesbcXmpY",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047461,
            "nanoseconds": 894000000
        },
        "num": 63,
        "url": "https://drive.google.com/thumbnail?id=1FVKQSdoioDcTXSntrAy_ouOov1Uszwqq&sz=w595"
    },
    {
        "id": "8SZ0tUntFQwCRO5JE2j2",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047958,
            "nanoseconds": 916000000
        },
        "url": "https://drive.google.com/thumbnail?id=1siRVxV1TG2xIGYNQXCrAKpw365qyoRXR&sz=w595",
        "num": 93
    },
    {
        "id": "8WoY0aQzXww3V0IWFd7w",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1ShPaPnRppywB7rs6jWxjJJ9acIq-p1wG&sz=w595",
        "createDate": {
            "seconds": 1745048601,
            "nanoseconds": 167000000
        },
        "num": 137
    },
    {
        "id": "8XmmPU7bBSdPol7DxHmX",
        "createDate": {
            "seconds": 1745053142,
            "nanoseconds": 278000000
        },
        "category": "The cultural code",
        "num": 524,
        "url": "https://drive.google.com/thumbnail?id=1SMtem3wmqGysPBoFG5w3gFEro9zvAmEY&sz=w595"
    },
    {
        "id": "8eQseFPrJVR2FNkVyNQt",
        "num": 81,
        "createDate": {
            "seconds": 1745047735,
            "nanoseconds": 750000000
        },
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1wAFAp6E0fUT5a7vGJteamLvlZk5nvmJP&sz=w595"
    },
    {
        "id": "8poMdWbpHhCpVNlMrn3O",
        "createDate": {
            "seconds": 1745052006,
            "nanoseconds": 283000000
        },
        "num": 361,
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1Urr7NTvBb2DjP2ZfEr6ZelTSMwEUC1lL&sz=w595"
    },
    {
        "id": "8usUQPQyD15Dcy1CcV7G",
        "url": "https://drive.google.com/thumbnail?id=1nXbBmBQDHRI4ePRazX1hxosYqhoXG28v&sz=w595",
        "createDate": {
            "seconds": 1745047518,
            "nanoseconds": 776000000
        },
        "category": "Music Poster",
        "num": 67
    },
    {
        "id": "9RdVxUVqKtk8qqEaox3T",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1x1gweSzuB6SidZEBDwPx5fDJSPkjAsjA&sz=w595",
        "createDate": {
            "seconds": 1745047774,
            "nanoseconds": 824000000
        },
        "num": 83
    },
    {
        "id": "9WFc0S8MHZft7CQXzdb3",
        "num": 75,
        "url": "https://drive.google.com/thumbnail?id=1YuBzCLrELRprk8neUVXU5ui1IbXhTAOI&sz=w595",
        "createDate": {
            "seconds": 1745047635,
            "nanoseconds": 578000000
        },
        "category": "Music Poster"
    },
    {
        "id": "9ien1G2vzQp84G3pSItC",
        "category": "Music Poster",
        "num": 72,
        "url": "https://drive.google.com/thumbnail?id=1ErDToQyJ7GnhtliUDTdJZ_vU4WBeGLca&sz=w595",
        "createDate": {
            "seconds": 1745047573,
            "nanoseconds": 584000000
        }
    },
    {
        "id": "9pXyuLSBArBHISkuYnUj",
        "num": 312,
        "url": "https://drive.google.com/thumbnail?id=1YTkEhBlPGKTUmyYNPfDLaLEbBByYbuSq&sz=w595",
        "createDate": {
            "seconds": 1745051299,
            "nanoseconds": 610000000
        },
        "category": "Myths and legends"
    },
    {
        "id": "AQ8kAie5WBseSwEw7gQG",
        "category": "Music Poster",
        "num": 111,
        "url": "https://drive.google.com/thumbnail?id=1iCiD47ACHI-3yBQ49kniEoKxL-ziHa5_&sz=w595",
        "createDate": {
            "seconds": 1745048213,
            "nanoseconds": 817000000
        }
    },
    {
        "id": "Af5FKTDyitS7luyUW1qe",
        "num": 66,
        "url": "https://drive.google.com/thumbnail?id=1kkNg0GwybgI7Md_8MsK53HoyGRz-zHDW&sz=w595",
        "createDate": {
            "seconds": 1745047505,
            "nanoseconds": 922000000
        },
        "category": "Music Poster"
    },
    {
        "id": "Aw4TklJCAC5ThcHcalAY",
        "num": 20,
        "url": "https://drive.google.com/thumbnail?id=1Ksqg3C-DO9DgMF7_OAF8vcjuWTGLHbGL&sz=w595",
        "createDate": {
            "seconds": 1745044659,
            "nanoseconds": 876000000
        },
        "category": "Music Poster"
    },
    {
        "id": "AzCo7BlzvmoKuc08MA3v",
        "createDate": {
            "seconds": 1745048696,
            "nanoseconds": 788000000
        },
        "url": "https://drive.google.com/thumbnail?id=1o3ZTw6oGmYbrUcm0gsODY5iPUryhz22T&sz=w595",
        "category": "Music Poster",
        "num": 142
    },
    {
        "id": "BJ7uZmPjWTFNNr9mUkS2",
        "num": 15,
        "createDate": {
            "seconds": 1745044559,
            "nanoseconds": 602000000
        },
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1qZf9NPh58eRtHuHVtSgVwFVIZoFMaMuN&sz=w595"
    },
    {
        "id": "BJj3bM3zrTeDhbdDFHz0",
        "num": 74,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047611,
            "nanoseconds": 825000000
        },
        "url": "https://drive.google.com/thumbnail?id=1twolYjFR4MbwI9JSO9eJlEnUrCZ0HcxV&sz=w595"
    },
    {
        "id": "BKwnv5K3wJNInlWz4heg",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052089,
            "nanoseconds": 926000000
        },
        "num": 368,
        "url": "https://drive.google.com/thumbnail?id=1Cix-b8ZmHpelSGG6imvjvEXJnacV_t3k&sz=w595"
    },
    {
        "id": "BQoePXsVXTbS1JoDflyo",
        "createDate": {
            "seconds": 1745053170,
            "nanoseconds": 864000000
        },
        "url": "https://drive.google.com/thumbnail?id=1OSPQ2eDv8yVAzKPLWhYWJqSnvgSV5IVK&sz=w595",
        "category": "The cultural code",
        "num": 527
    },
    {
        "id": "BWfElq0xxLGBaQ6pd6mM",
        "num": 28,
        "url": "https://drive.google.com/thumbnail?id=1IhiChI8CWvtojvWFlEuO4dJWCTvdoPH-&sz=w595",
        "createDate": {
            "seconds": 1745045271,
            "nanoseconds": 881000000
        },
        "category": "Music Poster"
    },
    {
        "id": "BXaWcn1bVefZXK9d0RQt",
        "category": "Music Poster",
        "num": 78,
        "url": "https://drive.google.com/thumbnail?id=1qLg2qy-vWNLObQyswEaWLbRHL4jBmsCp&sz=w595",
        "createDate": {
            "seconds": 1745047693,
            "nanoseconds": 25000000
        }
    },
    {
        "id": "Bai7RqEEbQwAZG2iqmbp",
        "category": "The cultural code",
        "num": 518,
        "createDate": {
            "seconds": 1745053068,
            "nanoseconds": 294000000
        },
        "url": "https://drive.google.com/thumbnail?id=1nq2CsAQ059R2_wu47MATvMxgz27Qj_Xd&sz=w595"
    },
    {
        "id": "BlShNyc6YLBtK6TkT0jR",
        "url": "https://drive.google.com/thumbnail?id=1q0mGmspapCwWsFcuWewpXrTA9bAxiOF7&sz=w595",
        "num": 76,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047672,
            "nanoseconds": 55000000
        }
    },
    {
        "id": "C6IbcckxmhEZFZemUiaf",
        "createDate": {
            "seconds": 1745047988,
            "nanoseconds": 122000000
        },
        "num": 96,
        "url": "https://drive.google.com/thumbnail?id=1wAca646gQWlPgaV32nUOcLOWwAP_dMrH&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "C7N5xhtlQWDAQbrg238A",
        "num": 73,
        "url": "https://drive.google.com/thumbnail?id=14gRV3z_ysIObuYqmUk863eQBLNJn2vBV&sz=w595",
        "createDate": {
            "seconds": 1745047583,
            "nanoseconds": 296000000
        },
        "category": "Music Poster"
    },
    {
        "id": "CkPhrFlesrX0Qm7JxXZz",
        "category": "Music Poster",
        "num": 5,
        "url": "https://drive.google.com/thumbnail?id=11gj31Tl6cmeomndI3liIlg7KiSGMUBcy&sz=w595",
        "createDate": {
            "seconds": 1745043613,
            "nanoseconds": 941000000
        }
    },
    {
        "id": "CqgzpZPRlR95FL9uplfL",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=18nq8THB92KFHlEW61VDljtCXYy9pO6mS&sz=w595",
        "num": 115,
        "createDate": {
            "seconds": 1745048279,
            "nanoseconds": 796000000
        }
    },
    {
        "id": "CrtRGvD8v0PwDg9Tgn77",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1Nd90g9oNamp0CCzHP4R1Oc-dBZeaLvgR&sz=w595",
        "num": 47,
        "createDate": {
            "seconds": 1745047073,
            "nanoseconds": 596000000
        }
    },
    {
        "id": "DZ1RfuDHc6wH3FfZRjyV",
        "url": "https://drive.google.com/thumbnail?id=1gpX454mFD8gb0hEsWzpHW44yoNxeRIxH&sz=w595",
        "createDate": {
            "seconds": 1745048559,
            "nanoseconds": 293000000
        },
        "category": "Music Poster",
        "num": 136
    },
    {
        "id": "DjLGTDmTtCdnXZqy6ACk",
        "category": "Myths and legends",
        "num": 349,
        "url": "https://drive.google.com/thumbnail?id=1qUA8xpf8JCj7-PZOgnZS38iyi0ehs2o-&sz=w595",
        "createDate": {
            "seconds": 1745051789,
            "nanoseconds": 155000000
        }
    },
    {
        "id": "DmZ7P3r9YtUVQpB6ifQK",
        "category": "The cultural code",
        "num": 507,
        "createDate": {
            "seconds": 1745052847,
            "nanoseconds": 154000000
        },
        "url": "https://drive.google.com/thumbnail?id=1sbCmJaN98HZ5U4_JRXj7X9zgi-oc7vPJ&sz=w595"
    },
    {
        "id": "DvBG8xu1HZ4Y7tbN3qIV",
        "num": 350,
        "url": "https://drive.google.com/thumbnail?id=1skXwPMTFQfVOyG_qI0c2EEX-dWR3NJuC&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051797,
            "nanoseconds": 810000000
        }
    },
    {
        "id": "DxAnfruB4Wq4yzzP89Vv",
        "num": 68,
        "url": "https://drive.google.com/thumbnail?id=1734zk4XL5TjgaKJlr6J1doqimZiMopMb&sz=w595",
        "createDate": {
            "seconds": 1745047528,
            "nanoseconds": 861000000
        },
        "category": "Music Poster"
    },
    {
        "id": "E8nD1BX4o6WVM7vZFina",
        "createDate": {
            "seconds": 1745047562,
            "nanoseconds": 543000000
        },
        "category": "Music Poster",
        "num": 71,
        "url": "https://drive.google.com/thumbnail?id=1--xNCJTURfB1BawwYzztsAG7v4K-5xf-&sz=w595"
    },
    {
        "id": "ETJpwDOQjDUP6aimxOAm",
        "url": "https://drive.google.com/thumbnail?id=1O5iCX2zuHIYtuYadkzDKqwlHz0Pt2uaa&sz=w595",
        "createDate": {
            "seconds": 1745051511,
            "nanoseconds": 798000000
        },
        "num": 325,
        "category": "Myths and legends"
    },
    {
        "id": "EWcXwSWj2P9DseRUkydY",
        "num": 87,
        "createDate": {
            "seconds": 1745047818,
            "nanoseconds": 641000000
        },
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=10PCfXPyfXmd23Q3DmaMYddWCPSYMB6D5&sz=w595"
    },
    {
        "id": "FAbtl3i7QJjRbq3abx2o",
        "url": "https://drive.google.com/thumbnail?id=1Dh1qNhuIqWhYYNqNkivupkN-yDfc9lAh&sz=w595",
        "createDate": {
            "seconds": 1745046685,
            "nanoseconds": 13000000
        },
        "num": 35,
        "category": "Music Poster"
    },
    {
        "id": "FJ8pWpHkE9l1R4EO8ZbL",
        "url": "https://drive.google.com/thumbnail?id=1QssVBoU55SOyrqYiTkire1-LWv-jXScw&sz=w595",
        "category": "The cultural code",
        "num": 546,
        "createDate": {
            "seconds": 1745053459,
            "nanoseconds": 273000000
        }
    },
    {
        "id": "FSftgdVcztGdb10v7N4x",
        "createDate": {
            "seconds": 1745044878,
            "nanoseconds": 180000000
        },
        "category": "Music Poster",
        "num": 23,
        "url": "https://drive.google.com/thumbnail?id=1N5QBFpFmvoDKcNogz9OMuvjl4szXNrdE&sz=w595"
    },
    {
        "id": "FbjKb9WSTNoNDIinGtzK",
        "url": "https://drive.google.com/thumbnail?id=13bs06H83ASnZoDhlHmZU_KiKx_TNuTrW&sz=w595",
        "createDate": {
            "seconds": 1745042271,
            "nanoseconds": 722000000
        },
        "category": "Music Poster",
        "num": 3
    },
    {
        "id": "FhisGAQaMoxgN0PInSZB",
        "category": "Music Poster",
        "num": 62,
        "url": "https://drive.google.com/thumbnail?id=1JugJQBwIDiti3Wu8ENPBypOj2V7VgEsc&sz=w595",
        "createDate": {
            "seconds": 1745047444,
            "nanoseconds": 907000000
        }
    },
    {
        "id": "G7pa65cPbeoFQhGVDRag",
        "createDate": {
            "seconds": 1745048810,
            "nanoseconds": 580000000
        },
        "url": "https://drive.google.com/thumbnail?id=1kFJW704zDBzA4Uu2Loejdnoyc8e1J945&sz=w595",
        "category": "Music Poster",
        "num": 152
    },
    {
        "id": "GOMIywVCOJZbLtYVzroG",
        "num": 326,
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1sr2E7CpDStUGjXaOQGrXfOTZXDtj5Q4_&sz=w595",
        "createDate": {
            "seconds": 1745051521,
            "nanoseconds": 334000000
        }
    },
    {
        "id": "Gx280WPysGnqb4OaBdq2",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1Jc7Ov5C6iCD_hzYoWlFEA5CcP-FGKsrH&sz=w595",
        "createDate": {
            "seconds": 1745047477,
            "nanoseconds": 784000000
        },
        "num": 64
    },
    {
        "id": "H1fwkSjwMB7OTANRE7xb",
        "url": "https://drive.google.com/thumbnail?id=1fFVH4krFx9mWqfBl90L_9-sv2ch57nqn&sz=w595",
        "createDate": {
            "seconds": 1745048666,
            "nanoseconds": 805000000
        },
        "num": 139,
        "category": "Music Poster"
    },
    {
        "id": "H9fE6xC98de0to8Bwnp2",
        "num": 100,
        "url": "https://drive.google.com/thumbnail?id=137T7UgbcW4UuSGsGHAnYlnYOrFiXLMWi&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048032,
            "nanoseconds": 461000000
        }
    },
    {
        "id": "HQs56xHL1IEwD1zRDrQ1",
        "createDate": {
            "seconds": 1745053534,
            "nanoseconds": 756000000
        },
        "url": "https://drive.google.com/thumbnail?id=1dnSjp5ZO7DeqNBRWLagix3X-9UqD7qi4&sz=w595",
        "num": 552,
        "category": "The cultural code"
    },
    {
        "id": "HbK2UKStHrEKNjmb1jfm",
        "num": 144,
        "url": "https://drive.google.com/thumbnail?id=1tFJgMDmky9d4cKj7h0sF-iYCRKaMlUof&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048718,
            "nanoseconds": 574000000
        }
    },
    {
        "id": "HnkrgxlzSfyVkslHKacm",
        "category": "The cultural code",
        "num": 566,
        "createDate": {
            "seconds": 1745053711,
            "nanoseconds": 178000000
        },
        "url": "https://drive.google.com/thumbnail?id=1S55sHXH7hTwdJJTkRMVF-Jgtwll8esK4&sz=w595"
    },
    {
        "id": "HyQFgrWlmRk73WeobjYq",
        "num": 12,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745044404,
            "nanoseconds": 961000000
        },
        "url": "https://drive.google.com/thumbnail?id=191M2rdL8FKbV1lghYjJJH6CgqAFXVomp&sz=w595"
    },
    {
        "id": "I01f8gvYGbfa78uUKNLy",
        "num": 569,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053742,
            "nanoseconds": 623000000
        },
        "url": "https://drive.google.com/thumbnail?id=1q7FdO0BP4VjGYpJ8IggfcO_5hnC2l9Fu&sz=w595"
    },
    {
        "id": "IAXnu7DUkoltEhSX3vYZ",
        "url": "https://drive.google.com/thumbnail?id=1IiL9rkKbtfZPpvPYQfU6SSofPEj2PwCg&sz=w595",
        "num": 105,
        "createDate": {
            "seconds": 1745048135,
            "nanoseconds": 225000000
        },
        "category": "Music Poster"
    },
    {
        "id": "IDjDArFAXazEn84lzEjB",
        "url": "https://drive.google.com/thumbnail?id=1KT60EV8w3dUwGhW3DhKaqxoIXlfn0klI&sz=w595",
        "num": 134,
        "createDate": {
            "seconds": 1745048539,
            "nanoseconds": 184000000
        },
        "category": "Music Poster"
    },
    {
        "id": "Ifr4jsGl6TOSVXo6JI8r",
        "createDate": {
            "seconds": 1745047375,
            "nanoseconds": 102000000
        },
        "url": "https://drive.google.com/thumbnail?id=1spn7mDMkZovYCR4CDCXFrEcr8M6SOYKB&sz=w595",
        "num": 58,
        "category": "Music Poster"
    },
    {
        "id": "IqrDvc23uwYJE56lTSAI",
        "createDate": {
            "seconds": 1745048203,
            "nanoseconds": 191000000
        },
        "url": "https://drive.google.com/thumbnail?id=1fQ8jjfWWDbwdg1BAnoqabNOH6yLJjC5e&sz=w595",
        "num": 110,
        "category": "Music Poster"
    },
    {
        "id": "IybCVMhwYsqphai2lBC8",
        "num": 536,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053290,
            "nanoseconds": 435000000
        },
        "url": "https://drive.google.com/thumbnail?id=15hko0qAQ0dbUcaQWh80JFj-vO8qWQ1yg&sz=w595"
    },
    {
        "id": "J9MxK8IfQqAgSfstoR4p",
        "category": "The cultural code",
        "num": 526,
        "createDate": {
            "seconds": 1745053160,
            "nanoseconds": 482000000
        },
        "url": "https://drive.google.com/thumbnail?id=1KpVUbFRX_ebVAZWVXhRc84LV5p6DOCqX&sz=w595"
    },
    {
        "id": "JAxuu24ZnI0cjQ44c3Ol",
        "createDate": {
            "seconds": 1745046675,
            "nanoseconds": 206000000
        },
        "num": 34,
        "url": "https://drive.google.com/thumbnail?id=1l5V9EJ3ZZQkczVSDjRKQceqEq7d1AQxe&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "JDKkHpmgWDlr7Qjw5pGs",
        "url": "https://drive.google.com/thumbnail?id=1SqB4cmDzVrQ-_2SfP36eQQogVGihj5st&sz=w595",
        "num": 553,
        "createDate": {
            "seconds": 1745053545,
            "nanoseconds": 753000000
        },
        "category": "The cultural code"
    },
    {
        "id": "JDX8dj1UYpPofRZpi57R",
        "num": 557,
        "createDate": {
            "seconds": 1745053583,
            "nanoseconds": 342000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=15NEzKMoOEwzoBvwbNGBHjlRhe8csRN9M&sz=w595"
    },
    {
        "id": "JQHCCWIahw7bPNGgNZoq",
        "url": "https://drive.google.com/thumbnail?id=1aElLUNIJNXVFmRnwRaShQnY61zBpSRHt&sz=w595",
        "num": 31,
        "createDate": {
            "seconds": 1745046608,
            "nanoseconds": 129000000
        },
        "category": "Music Poster"
    },
    {
        "id": "K8H8v73s4UTd464G74Ke",
        "createDate": {
            "seconds": 1745051669,
            "nanoseconds": 712000000
        },
        "url": "https://drive.google.com/thumbnail?id=18qrtGMAQLqSlrQvvRPg3Fq2G1PKjxg5R&sz=w595",
        "category": "Myths and legends",
        "num": 339
    },
    {
        "id": "KEuvw1i4pILUFUU0HNxJ",
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1QemW3MiLkAx4hKyvSRqUWrvCtcXr_zI1&sz=w595",
        "createDate": {
            "seconds": 1745051085,
            "nanoseconds": 556000000
        },
        "num": 304
    },
    {
        "id": "KcdfhZLDckaTmr0tAdXt",
        "url": "https://drive.google.com/thumbnail?id=1DMA6ypRA4-yOcRu7If7hwX8_O9g5lj-Y&sz=w595",
        "createDate": {
            "seconds": 1745047551,
            "nanoseconds": 795000000
        },
        "num": 70,
        "category": "Music Poster"
    },
    {
        "id": "KxCtcOQ5febs5w8W0r3h",
        "createDate": {
            "seconds": 1745053396,
            "nanoseconds": 36000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1bL4sb8A7yTvVe6KsLJg-uZbesBwnX4i5&sz=w595",
        "num": 541
    },
    {
        "id": "L6iyjT3ShAh5bCDmv5dC",
        "url": "https://drive.google.com/thumbnail?id=1bbVZEq8YPQGB7xXdERfXJ7XgZhP-2CAc&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051612,
            "nanoseconds": 183000000
        },
        "num": 333
    },
    {
        "id": "L9mshavdsQgfBopIfTOw",
        "category": "Music Poster",
        "num": 7,
        "createDate": {
            "seconds": 1745043721,
            "nanoseconds": 242000000
        },
        "url": "https://drive.google.com/thumbnail?id=1n2qo2NuTAx-Pm13XpFKFSE8souNbpJ-H&sz=w595"
    },
    {
        "id": "LHTl0fsFGO8bt8prdN3w",
        "createDate": {
            "seconds": 1745048146,
            "nanoseconds": 438000000
        },
        "num": 106,
        "url": "https://drive.google.com/thumbnail?id=1EtiXcUST0VdRGGL9o2NJ-Xi29oHUZIDL&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "LXzfIeVbt5GLag18HR40",
        "num": 505,
        "createDate": {
            "seconds": 1745052821,
            "nanoseconds": 161000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1wxQRSB6Lx3dCRFWvo0-1va9EU0ute988&sz=w595"
    },
    {
        "id": "Lbf5ZSTMlradGILgZplL",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048301,
            "nanoseconds": 632000000
        },
        "url": "https://drive.google.com/thumbnail?id=1wZaSBsItbQWnn8PNndHctZIpkr8ZKHzD&sz=w595",
        "num": 117
    },
    {
        "id": "Lh78e8REJsbQOIfdWv2k",
        "num": 512,
        "url": "https://drive.google.com/thumbnail?id=15RjM5iB_ZzqAtIM5gyFmIdTFzR0m02jW&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745052950,
            "nanoseconds": 606000000
        }
    },
    {
        "id": "LjG7r3aDXHJvEDwodA1A",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051641,
            "nanoseconds": 317000000
        },
        "num": 336,
        "url": "https://drive.google.com/thumbnail?id=1T14pXI4IT1VMLDmResLZxl0C3csg70Dx&sz=w595"
    },
    {
        "id": "LnqnEbyps71JT6KAsKpa",
        "url": "https://drive.google.com/thumbnail?id=1IECOwm1EfCC20VIJjwwP6wDffUraWeDw&sz=w595",
        "num": 331,
        "createDate": {
            "seconds": 1745051581,
            "nanoseconds": 460000000
        },
        "category": "Myths and legends"
    },
    {
        "id": "LpN6KhvZ6vBYEQYJEgsR",
        "category": "Myths and legends",
        "num": 353,
        "url": "https://drive.google.com/thumbnail?id=1bDoc8VP-E2SSmvZTWh6fqXJM-RHpOTOq&sz=w595",
        "createDate": {
            "seconds": 1745051831,
            "nanoseconds": 381000000
        }
    },
    {
        "id": "Lu3hYQy10cCcIUjI2xrf",
        "url": "https://drive.google.com/thumbnail?id=15LBv4BPO4gRQo6VbipRVgsElQI8KMx9x&sz=w595",
        "category": "The cultural code",
        "num": 523,
        "createDate": {
            "seconds": 1745053124,
            "nanoseconds": 899000000
        }
    },
    {
        "id": "M5Z2ZT4VKisXy6byQA8N",
        "num": 316,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051353,
            "nanoseconds": 878000000
        },
        "url": "https://drive.google.com/thumbnail?id=1gNw2IK7_W6eilQCvmnM7oRWsKzV3LBmy&sz=w595"
    },
    {
        "id": "MQngrK1HbsbZxH0mCJYC",
        "createDate": {
            "seconds": 1745053557,
            "nanoseconds": 335000000
        },
        "num": 554,
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1RCtu4D_e84rxJzBwF_Tn0Mp1sPdfAbeS&sz=w595"
    },
    {
        "id": "MRNziv8WKg3maTnh6Zjr",
        "createDate": {
            "seconds": 1745048753,
            "nanoseconds": 95000000
        },
        "num": 148,
        "url": "https://drive.google.com/thumbnail?id=158NB1BRNuwY8ohu7B7MdjpFw1ZBkehUf&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "MjEIGF9XF8oIvRxjO4nF",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048774,
            "nanoseconds": 248000000
        },
        "url": "https://drive.google.com/thumbnail?id=1rJvTpPp-gPYVxVXoJriG3dty11kD6BkJ&sz=w595",
        "num": 149
    },
    {
        "id": "Mrg9kN82u4QFacodJL2W",
        "createDate": {
            "seconds": 1745053105,
            "nanoseconds": 56000000
        },
        "category": "The cultural code",
        "num": 521,
        "url": "https://drive.google.com/thumbnail?id=1YGfUPwqCBTXowwpiKP7u4NIcq8yj2rTK&sz=w595"
    },
    {
        "id": "Mt28gOaudSOMKiNbwyPA",
        "createDate": {
            "seconds": 1745051022,
            "nanoseconds": 502000000
        },
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1ODzqV5BlAWiF8OL1yIhI4FkvcKpA6e6R&sz=w595",
        "num": 302
    },
    {
        "id": "N3fCn0dTNEcO9DpB3qW2",
        "category": "The cultural code",
        "num": 534,
        "createDate": {
            "seconds": 1745053263,
            "nanoseconds": 497000000
        },
        "url": "https://drive.google.com/thumbnail?id=1yfHssClsRhVjRp0ZY_oIwLhDB6M3iifc&sz=w595"
    },
    {
        "id": "NCTbU8yyYF0u4iZ0ob1k",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051969,
            "nanoseconds": 900000000
        },
        "url": "https://drive.google.com/thumbnail?id=1bX3NsIGq9wcY-8ll5xxl7FddM6hSoYB5&sz=w595",
        "num": 357
    },
    {
        "id": "NIrWlYD3cNNk0HQtQJUo",
        "num": 38,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745046720,
            "nanoseconds": 25000000
        },
        "url": "https://drive.google.com/thumbnail?id=1-9XXflaiXYPXI38-WdlOhrupVXQKm4RB&sz=w595"
    },
    {
        "id": "O4IA2gxhHX1GMlnGyHow",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053797,
            "nanoseconds": 400000000
        },
        "num": 573,
        "url": "https://drive.google.com/thumbnail?id=1PD1c7SllzpZVdUoiBjZtskRm44yP22qt&sz=w595"
    },
    {
        "id": "O5qY53tpf2VjOFNZsllo",
        "url": "https://drive.google.com/thumbnail?id=1EFL2evvLxJHdwgf2IjyThLsn8IFGpgsa&sz=w595",
        "num": 570,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053766,
            "nanoseconds": 162000000
        }
    },
    {
        "id": "OWGN3Ran0lmDpYAG0xlw",
        "category": "The cultural code",
        "num": 556,
        "createDate": {
            "seconds": 1745053574,
            "nanoseconds": 500000000
        },
        "url": "https://drive.google.com/thumbnail?id=1vPZO8OBpkueDvcJKZuTYOsaZynoFWPRI&sz=w595"
    },
    {
        "id": "P31M2k4DmIceavkh6Ddd",
        "num": 545,
        "createDate": {
            "seconds": 1745053440,
            "nanoseconds": 541000000
        },
        "url": "https://drive.google.com/thumbnail?id=1fQkAvFBPROoeas9DAu4h_vYflOpLsDDl&sz=w595",
        "category": "The cultural code"
    },
    {
        "id": "P72lXOpHDFLlI1XA4WjD",
        "createDate": {
            "seconds": 1745053623,
            "nanoseconds": 6000000
        },
        "num": 559,
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1F0s6-_9AiFrt_ihtZIm__PKf4trMsQ9I&sz=w595"
    },
    {
        "id": "P7PttvVAn7EXXVfjnxCt",
        "url": "https://drive.google.com/thumbnail?id=1hLFma8sdHHXF-w_VtXuJItGPyxhiZSpN&sz=w595",
        "num": 317,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051363,
            "nanoseconds": 838000000
        }
    },
    {
        "id": "PMRNuKveKMnJEDFoWYDq",
        "url": "https://drive.google.com/thumbnail?id=1K_JX2CXk4C7gU0XtFD-TtCc0Wz1tnStJ&sz=w595",
        "num": 101,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048045,
            "nanoseconds": 91000000
        }
    },
    {
        "id": "PNrQihg1YahHNbE4uMv0",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047243,
            "nanoseconds": 433000000
        },
        "url": "https://drive.google.com/thumbnail?id=1xYcgNgvPoc4CHbZdkOj9i8EYrxg5mhsM&sz=w595",
        "num": 49
    },
    {
        "id": "QG7F68fWsN1vWvSGZyWx",
        "url": "https://drive.google.com/thumbnail?id=1pUhV0Dkk6JrELjRy0P2RvlBMoftwNKWI&sz=w595",
        "createDate": {
            "seconds": 1745051959,
            "nanoseconds": 534000000
        },
        "num": 356,
        "category": "Myths and legends"
    },
    {
        "id": "QI16LzVd3aC0lMP8MfSH",
        "url": "https://drive.google.com/thumbnail?id=1MTmHZsvS5hHKIX8yYVWQs4kZ-84B-dkQ&sz=w595",
        "num": 308,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051220,
            "nanoseconds": 812000000
        }
    },
    {
        "id": "QOB4TR8MIa7vrnIdgtv2",
        "num": 6,
        "createDate": {
            "seconds": 1745043636,
            "nanoseconds": 918000000
        },
        "url": "https://drive.google.com/thumbnail?id=1jnHT14BET7nmGubuK-pMgdtxF6XNbW8g&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "QOFAyV8w6xC47SQAvyhc",
        "url": "https://drive.google.com/thumbnail?id=1UYXFX3FhZVUMCU97L5If2Hpfjxw__LHr&sz=w595",
        "num": 571,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053776,
            "nanoseconds": 706000000
        }
    },
    {
        "id": "QgsTJcxCnlZ32Lya0EPa",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053252,
            "nanoseconds": 666000000
        },
        "url": "https://drive.google.com/thumbnail?id=1PzI03CeDZuU9S_YqIvX4JpO9VD_0r_wG&sz=w595",
        "num": 533
    },
    {
        "id": "Qqw1u806GFhMSaFrvlWq",
        "url": "https://drive.google.com/thumbnail?id=1xDtZxTjdcThmkpTUHmXOa_tkiWdKrXcB&sz=w595",
        "num": 51,
        "createDate": {
            "seconds": 1745047270,
            "nanoseconds": 393000000
        },
        "category": "Music Poster"
    },
    {
        "id": "QuBGtN7WVLwFYS0pL2oV",
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1zGpdfdPEQx4VE8bSUhgUvE7_Tu3Rois8&sz=w595",
        "createDate": {
            "seconds": 1745051538,
            "nanoseconds": 250000000
        },
        "num": 327
    },
    {
        "id": "RBSU9hQmkxLGXycaUiVq",
        "url": "https://drive.google.com/thumbnail?id=18bVCrf-i3q5cG9aSoB0yrLOoP6FoIZQv&sz=w595",
        "num": 344,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051727,
            "nanoseconds": 254000000
        }
    },
    {
        "id": "RHJdvkAoxapnoUHpDEeV",
        "num": 59,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047398,
            "nanoseconds": 433000000
        },
        "url": "https://drive.google.com/thumbnail?id=1cKE5HsfVgzIvfdc_-VoWrL_zzo9f3jFC&sz=w595"
    },
    {
        "id": "RTG5Is9Ct5AVEBttXa2H",
        "num": 10,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1OliMT2YllOzamSTxMqWrMqr46vLnwH8N&sz=w595",
        "createDate": {
            "seconds": 1745044209,
            "nanoseconds": 495000000
        }
    },
    {
        "id": "RuuFz75n3KFPn2ty7fGu",
        "category": "Myths and legends",
        "num": 352,
        "createDate": {
            "seconds": 1745051824,
            "nanoseconds": 247000000
        },
        "url": "https://drive.google.com/thumbnail?id=1tZVZyTxVqB33-pXEjf7HFDk5Wlo7IqIi&sz=w595"
    },
    {
        "id": "SBjMRZo8BYAQzJnOqEIW",
        "num": 92,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1P1fnc19NGtHVg6sEubmXm75gffrsEHW9&sz=w595",
        "createDate": {
            "seconds": 1745047950,
            "nanoseconds": 268000000
        }
    },
    {
        "id": "SF5c7IYnGRcJcbpBz3hX",
        "category": "Myths and legends",
        "num": 329,
        "createDate": {
            "seconds": 1745051562,
            "nanoseconds": 217000000
        },
        "url": "https://drive.google.com/thumbnail?id=1qy-k-LxOEo8ER0B5tnP1_Wu52nER_fT-&sz=w595"
    },
    {
        "id": "SGmGmc4rBPLMKE0rOxpX",
        "category": "Myths and legends",
        "num": 328,
        "createDate": {
            "seconds": 1745051553,
            "nanoseconds": 15000000
        },
        "url": "https://drive.google.com/thumbnail?id=1bpQevfg-LreTsrfpypwc4p3g9wNuWSRy&sz=w595"
    },
    {
        "id": "SI7kVs3pAXacFNYzEQiR",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053195,
            "nanoseconds": 405000000
        },
        "num": 528,
        "url": "https://drive.google.com/thumbnail?id=1gxbuzt20fkDV-LVBFxPpvoFpQ_TzCdsh&sz=w595"
    },
    {
        "id": "SNEdscQ3thEYZeRaogK2",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053206,
            "nanoseconds": 18000000
        },
        "num": 529,
        "url": "https://drive.google.com/thumbnail?id=11NloI2Msst1YiDKrHDzq5iaWZhwq0zig&sz=w595"
    },
    {
        "id": "SV2yHK2BGHQUdb61pDKW",
        "createDate": {
            "seconds": 1745053830,
            "nanoseconds": 316000000
        },
        "url": "https://drive.google.com/thumbnail?id=13YOAiPkcwSzfhsIwYHSUdGcBAFmhZOG8&sz=w595",
        "category": "The cultural code",
        "num": 576
    },
    {
        "id": "SW8QP5oOiDd3R2QmQyvy",
        "url": "https://drive.google.com/thumbnail?id=1gtkkDdmDHnysnOfp9uOdrXOn53Sn7PVZ&sz=w595",
        "num": 133,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048530,
            "nanoseconds": 11000000
        }
    },
    {
        "id": "SaPXyXtU5xhDwp9jiOHG",
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=13hEzf12mfxefEcyqpwGKnoSN9JEhobbx&sz=w595",
        "createDate": {
            "seconds": 1745051277,
            "nanoseconds": 198000000
        },
        "num": 310
    },
    {
        "id": "SmURg2Q1qZSbVscu32cp",
        "createDate": {
            "seconds": 1745053690,
            "nanoseconds": 473000000
        },
        "num": 564,
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1EGt_BiGqeb_NiUSnI-4HajPJrOS4OTHW&sz=w595"
    },
    {
        "id": "SuM8pDTEDCaRyUFk1Z4r",
        "category": "Myths and legends",
        "num": 315,
        "url": "https://drive.google.com/thumbnail?id=16BqifVkObTSbanSTIhnQxmbSRUzSUOvb&sz=w595",
        "createDate": {
            "seconds": 1745051343,
            "nanoseconds": 437000000
        }
    },
    {
        "id": "T82xVMwh64NIZUGdkrPd",
        "createDate": {
            "seconds": 1745048400,
            "nanoseconds": 582000000
        },
        "category": "Music Poster",
        "num": 121,
        "url": "https://drive.google.com/thumbnail?id=1CVQMLSossyoIOTNxD8RnerZc-MX9s-cq&sz=w595"
    },
    {
        "id": "Tai1p07CjQVcGfwESpdh",
        "url": "https://drive.google.com/thumbnail?id=1rP2PEdbC4XA8eFThU2dkN0YET_jrVIjr&sz=w595",
        "category": "The cultural code",
        "num": 509,
        "createDate": {
            "seconds": 1745052908,
            "nanoseconds": 970000000
        }
    },
    {
        "id": "TfixMzt0St6FYtjHGc8R",
        "num": 530,
        "createDate": {
            "seconds": 1745053214,
            "nanoseconds": 923000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1aC36JtjMqe4NcztS9ObF8s4VBJs4Vywr&sz=w595"
    },
    {
        "id": "TxPT5VoBovc48NrG0YzA",
        "url": "https://drive.google.com/thumbnail?id=1YDTCc7U0A54yRDYRvIA6-rRHG4yiuVrv&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047703,
            "nanoseconds": 491000000
        },
        "num": 79
    },
    {
        "id": "U6mXfwvQWsY3PeNiik6t",
        "url": "https://drive.google.com/thumbnail?id=1vaWAZkzJJbCR0qSy4L_Kt9d2OtKzV4nS&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052042,
            "nanoseconds": 523000000
        },
        "num": 363
    },
    {
        "id": "UkDJbrRk4ioxcETXWutW",
        "url": "https://drive.google.com/thumbnail?id=1-7oYwO4NIc8PlPkGv798iuEWA_yZz7h3&sz=w595",
        "num": 579,
        "createDate": {
            "seconds": 1745054152,
            "nanoseconds": 266000000
        },
        "category": "The cultural code"
    },
    {
        "id": "Ur94rsLoDL2YWut4DyVs",
        "num": 504,
        "createDate": {
            "seconds": 1745052780,
            "nanoseconds": 453000000
        },
        "url": "https://drive.google.com/thumbnail?id=1TvtXj2nUVtYCtvLbkoRTBj9dB7HwRPgp&sz=w595",
        "category": "The cultural code"
    },
    {
        "id": "UuLxJDwbt7eMY0PpNHuk",
        "createDate": {
            "seconds": 1745051809,
            "nanoseconds": 481000000
        },
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1dXzCQNdBqTWYZWxSD1LCqu3XaaqcGwWa&sz=w595",
        "num": 351
    },
    {
        "id": "VAtDtMlZTQfwN9T8tnPk",
        "createDate": {
            "seconds": 1745047315,
            "nanoseconds": 827000000
        },
        "num": 54,
        "url": "https://drive.google.com/thumbnail?id=1LVo44LgPZ-rpTek1DcidGuicMPZ47DnK&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "VQwyMAutshXUqNiKubIj",
        "url": "https://drive.google.com/thumbnail?id=1rLFtSC4u-izh0Htu3Gzn00MMyUdiwXTy&sz=w595",
        "num": 138,
        "createDate": {
            "seconds": 1745048649,
            "nanoseconds": 859000000
        },
        "category": "Music Poster"
    },
    {
        "id": "VVUq7WYmMakSacD5a7b1",
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1nMtFx9Qy6wpKoJjXPsb1UsMyTf0rX3Pz&sz=w595",
        "num": 572,
        "createDate": {
            "seconds": 1745053786,
            "nanoseconds": 510000000
        }
    },
    {
        "id": "VXHQHAfAhKTLdvL9RYR6",
        "num": 319,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051386,
            "nanoseconds": 110000000
        },
        "url": "https://drive.google.com/thumbnail?id=1_MbHbSteUow6nBXk3LopBw3-b5p1FKeG&sz=w595"
    },
    {
        "id": "VofZ2wfMGTjOjCaeVEk0",
        "url": "https://drive.google.com/thumbnail?id=1vRdp5ezW6Mm_PeoJUTeN44ut7WsHb4hk&sz=w595",
        "createDate": {
            "seconds": 1745044928,
            "nanoseconds": 876000000
        },
        "num": 26,
        "category": "Music Poster"
    },
    {
        "id": "VsHV2cvCOThT4BdVoLk9",
        "num": 113,
        "url": "https://drive.google.com/thumbnail?id=1-1aAQ8DmYYq16yUrYflyBT69SSMoip8j&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048252,
            "nanoseconds": 440000000
        }
    },
    {
        "id": "VvkfrhrdLtjmYNU1YnNT",
        "category": "The cultural code",
        "num": 516,
        "createDate": {
            "seconds": 1745053033,
            "nanoseconds": 441000000
        },
        "url": "https://drive.google.com/thumbnail?id=18kNobH32AAfldq50x_sQBCcVOe7x1hDM&sz=w595"
    },
    {
        "id": "Vw8uODdBVzHbB5d3KLZM",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051310,
            "nanoseconds": 333000000
        },
        "num": 313,
        "url": "https://drive.google.com/thumbnail?id=1S1qSWBNcbx3WeMKUYDg1yVB5_tQCFrrG&sz=w595"
    },
    {
        "id": "Vx6oCsvmQIJSdoaiC7Up",
        "createDate": {
            "seconds": 1745051502,
            "nanoseconds": 381000000
        },
        "url": "https://drive.google.com/thumbnail?id=1s2rgEJ0enloYLbLCabYLH8UC1Is2lore&sz=w595",
        "category": "Myths and legends",
        "num": 324
    },
    {
        "id": "WD8QDiSf92watfJi13bD",
        "num": 123,
        "url": "https://drive.google.com/thumbnail?id=1POWd8PkBu6WL9jR3xDShk7teBf4bbNkp&sz=w595",
        "createDate": {
            "seconds": 1745048421,
            "nanoseconds": 82000000
        },
        "category": "Music Poster"
    },
    {
        "id": "WWe9IHXYNgj8vKZlTDCz",
        "createDate": {
            "seconds": 1745051698,
            "nanoseconds": 100000000
        },
        "url": "https://drive.google.com/thumbnail?id=1_-6SFQRnAqPcw0PCSkbAEEjF5dKIsFQy&sz=w595",
        "category": "Myths and legends",
        "num": 342
    },
    {
        "id": "WiHeY2ocDGICMBWWcSA9",
        "createDate": {
            "seconds": 1745048819,
            "nanoseconds": 910000000
        },
        "category": "Music Poster",
        "num": 153,
        "url": "https://drive.google.com/thumbnail?id=1Z_zqoLBA6e3rdtcsd8MGvQJYCMQHzG7n&sz=w595"
    },
    {
        "id": "WluO5KrXXWYCX4Fpf8k0",
        "url": "https://drive.google.com/thumbnail?id=1PVfPJ40S-A2J9SsF7gtXN4_ilji13OdG&sz=w595",
        "category": "The cultural code",
        "num": 551,
        "createDate": {
            "seconds": 1745053525,
            "nanoseconds": 966000000
        }
    },
    {
        "id": "WtSpKfOywtFmSxtu66Y5",
        "num": 129,
        "url": "https://drive.google.com/thumbnail?id=1fZ_E0UPcAn9FdF5Zr96mXLPw7uymsg9_&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048485,
            "nanoseconds": 975000000
        }
    },
    {
        "id": "X3cH84EcSgjoghiqMr7c",
        "num": 367,
        "url": "https://drive.google.com/thumbnail?id=1qzTxn8gCVK0KilIU7ZrbSlf60Bg8zEQ6&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052079,
            "nanoseconds": 947000000
        }
    },
    {
        "id": "XUMek7CIGwUv4n3ZpUuH",
        "createDate": {
            "seconds": 1745046958,
            "nanoseconds": 235000000
        },
        "url": "https://drive.google.com/thumbnail?id=1xaYGiauhMfgCkD6-VxP__AU7AL_JgiyA&sz=w595",
        "category": "Music Poster",
        "num": 45
    },
    {
        "id": "XwcpYYFZwPPhKUbm7kh7",
        "category": "Music Poster",
        "num": 13,
        "url": "https://drive.google.com/thumbnail?id=1D2iLYyxbJm5E83DXwrA3ItLsMTBfRAUG&sz=w595",
        "createDate": {
            "seconds": 1745044446,
            "nanoseconds": 738000000
        }
    },
    {
        "id": "Y7MwHZx6qqRJbT6FWltN",
        "url": "https://drive.google.com/thumbnail?id=1Vmx7JbDYfWWjnZ2Uuv8B223AoC41CSM7&sz=w595",
        "createDate": {
            "seconds": 1745048291,
            "nanoseconds": 149000000
        },
        "category": "Music Poster",
        "num": 116
    },
    {
        "id": "YFJhFt7pvrARSyLTnCbi",
        "url": "https://drive.google.com/thumbnail?id=17bBLpcDfprUQ7NIpz_JRs7Kr1uTLtk-X&sz=w595",
        "createDate": {
            "seconds": 1745053115,
            "nanoseconds": 266000000
        },
        "num": 522,
        "category": "The cultural code"
    },
    {
        "id": "YdM142hXQFHwD9Jqwh1r",
        "num": 154,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=160QVDg7dBjw7JvKCjXmCx4PUDFsW4eLZ&sz=w595",
        "createDate": {
            "seconds": 1745048832,
            "nanoseconds": 743000000
        }
    },
    {
        "id": "YvZdTDnu509hJvqIH6j4",
        "num": 36,
        "url": "https://drive.google.com/thumbnail?id=1i74rnkveQCltFyjejf-E9JKK6jR3pS4Q&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745046695,
            "nanoseconds": 337000000
        }
    },
    {
        "id": "ZYwFNZy7cn7pkyfRagGq",
        "createDate": {
            "seconds": 1745048055,
            "nanoseconds": 398000000
        },
        "url": "https://drive.google.com/thumbnail?id=1QYlYZr1y9e6NbDEi2ZTFQ3qhPO390bF2&sz=w595",
        "category": "Music Poster",
        "num": 102
    },
    {
        "id": "Zc9PFvOh4CD1KlvWIhS4",
        "createDate": {
            "seconds": 1745048321,
            "nanoseconds": 626000000
        },
        "num": 118,
        "url": "https://drive.google.com/thumbnail?id=1SWRvRnBLvw4sP4Yki1jVhuu_FBxCsLJc&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "ZdGO4Itf6PGCyxOMYesJ",
        "url": "https://drive.google.com/thumbnail?id=1JP87L5IDsa-1zDqKsjtKhLXY6ZcVNWsW&sz=w595",
        "createDate": {
            "seconds": 1745048433,
            "nanoseconds": 779000000
        },
        "num": 124,
        "category": "Music Poster"
    },
    {
        "id": "a7aeITjAj0L3HqdbqdZt",
        "url": "https://drive.google.com/thumbnail?id=1oX1tVl3KQIqqCttdasaWcUrULiIt0Ad9&sz=w595",
        "num": 8,
        "createDate": {
            "seconds": 1745043752,
            "nanoseconds": 648000000
        },
        "category": "Music Poster"
    },
    {
        "id": "a81jMa6wq6OSLsJ9w7KK",
        "num": 65,
        "createDate": {
            "seconds": 1745047488,
            "nanoseconds": 543000000
        },
        "url": "https://drive.google.com/thumbnail?id=1hziZxe0Q6ybSGkAp1PF-So2YAOClA_oW&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "aiu68clCVPrbI7jatP9U",
        "num": 32,
        "url": "https://drive.google.com/thumbnail?id=1aT7qsMoJ7-fdYqllCka22jQooSLjOUl1&sz=w595",
        "createDate": {
            "seconds": 1745046622,
            "nanoseconds": 123000000
        },
        "category": "Music Poster"
    },
    {
        "id": "awHNpOCLhQsEhL2qkEQD",
        "createDate": {
            "seconds": 1745046787,
            "nanoseconds": 856000000
        },
        "num": 39,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1o_oskwb9mXuGQGZVxgZZAqRPzkyZzyRU&sz=w595"
    },
    {
        "id": "b6G6rDeoGA9ShhDun5Ao",
        "num": 334,
        "url": "https://drive.google.com/thumbnail?id=1XVNjXNHrxY5oFGCKcHjm12MHKnXoVWHx&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051621,
            "nanoseconds": 383000000
        }
    },
    {
        "id": "bEyO1OtCkVXPYGsNDbs9",
        "url": "https://drive.google.com/thumbnail?id=1n0BHzWp1OlZi4wroqZqPooisn5NDYz_U&sz=w595",
        "num": 502,
        "createDate": {
            "seconds": 1745052712,
            "nanoseconds": 651000000
        },
        "category": "The cultural code"
    },
    {
        "id": "bP3HZmX0mDBTCkKkNg7W",
        "url": "https://drive.google.com/thumbnail?id=1aCTNlpj0rxyKdvJXGEex2VZm0fJxAqHC&sz=w595",
        "num": 2,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745042094,
            "nanoseconds": 919000000
        }
    },
    {
        "id": "bS9qXBvC0qdptlBmq7SR",
        "num": 346,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051747,
            "nanoseconds": 290000000
        },
        "url": "https://drive.google.com/thumbnail?id=1oUcbKWZJOxXJZcyM5ef9IvjnsiFRsnE4&sz=w595"
    },
    {
        "id": "bssZvGZe41hYx0tTqofb",
        "num": 57,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047362,
            "nanoseconds": 523000000
        },
        "url": "https://drive.google.com/thumbnail?id=1shaC8Wbmui8KVJvdNN8nr6dPaXYcRn6B&sz=w595"
    },
    {
        "id": "c8FTcYto0jwxuFuAMiu9",
        "category": "Myths and legends",
        "num": 323,
        "url": "https://drive.google.com/thumbnail?id=1pkWknoELzZ1nC15fMBZTjyov2q56WkAp&sz=w595",
        "createDate": {
            "seconds": 1745051479,
            "nanoseconds": 657000000
        }
    },
    {
        "id": "cc4TgC5aloOaRpniOVNs",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1LPHfzfDkuhFsLdR0elf7noronB10c23E&sz=w595",
        "num": 108,
        "createDate": {
            "seconds": 1745048182,
            "nanoseconds": 653000000
        }
    },
    {
        "id": "ciqNunClQZ4nhtAM2R7O",
        "num": 347,
        "url": "https://drive.google.com/thumbnail?id=1mPLrNUMY-ounSOyf1F_lXmt_dJpoXeKR&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051757,
            "nanoseconds": 843000000
        }
    },
    {
        "id": "cntWzZnEvuFc11wscNmT",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051261,
            "nanoseconds": 8000000
        },
        "url": "https://drive.google.com/thumbnail?id=1a17kRvT9eJvhV3Q4Sh04CSTVTWxXgoQ_&sz=w595",
        "num": 309
    },
    {
        "id": "d06BX5dU3WlXY6IfIL2m",
        "num": 135,
        "createDate": {
            "seconds": 1745048549,
            "nanoseconds": 386000000
        },
        "url": "https://drive.google.com/thumbnail?id=1-IIPgeFyIKmkzFNHnEbiGYa953watls-&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "dCeYjEciiRqFZT9Fyg4h",
        "num": 514,
        "createDate": {
            "seconds": 1745052987,
            "nanoseconds": 988000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1XJAG-KOEusdEdDrZ33Q8Az7_8Cbsf5Qc&sz=w595"
    },
    {
        "id": "dD4ru08FQ4xwD85heSpJ",
        "createDate": {
            "seconds": 1745053413,
            "nanoseconds": 391000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1XROWiKnalE0Fga4kMeyfC5IenQC6w7QY&sz=w595",
        "num": 542
    },
    {
        "id": "dIo6SU5uphLlpePTPL7d",
        "createDate": {
            "seconds": 1745053700,
            "nanoseconds": 501000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1guxboy2tD1rQ1WX4DFDHT_-mZ3vOEAhn&sz=w595",
        "num": 565
    },
    {
        "id": "dM2MDqur1aHjIVgphxak",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745044894,
            "nanoseconds": 884000000
        },
        "url": "https://drive.google.com/thumbnail?id=1NSX0bL_Tm1j4LpB4B1mBdRq5pppBgkeH&sz=w595",
        "num": 24
    },
    {
        "id": "dZWNDO0133TqFuykfjFj",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047763,
            "nanoseconds": 929000000
        },
        "num": 82,
        "url": "https://drive.google.com/thumbnail?id=15XEg0U2p6EBWBJZF2wkZb6cwiUsfkOnn&sz=w595"
    },
    {
        "id": "dwlUXsKHGWD0nlAeQ96Y",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745045319,
            "nanoseconds": 619000000
        },
        "url": "https://drive.google.com/thumbnail?id=124EoWNgES0EnGFHMA_msF6kW2wP-7C-h&sz=w595",
        "num": 30
    },
    {
        "id": "dxYR3ZFqANzBiWTjacjt",
        "category": "Music Poster",
        "num": 131,
        "url": "https://drive.google.com/thumbnail?id=1w5_TGxICuYdWIO056_Ecvw1YNpVl1NLB&sz=w595",
        "createDate": {
            "seconds": 1745048504,
            "nanoseconds": 6000000
        }
    },
    {
        "id": "eyKMorHLAUBnaUCSR4hX",
        "createDate": {
            "seconds": 1745044623,
            "nanoseconds": 229000000
        },
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=15BTInry-j7yxE_Feda39gYwXchI4NTAE&sz=w595",
        "num": 19
    },
    {
        "id": "f9agt1rlPE11fnTqaOwq",
        "createDate": {
            "seconds": 1745053633,
            "nanoseconds": 595000000
        },
        "url": "https://drive.google.com/thumbnail?id=1ViX6oFHuzlsOtXexeXAJTMxQQxkLY08I&sz=w595",
        "category": "The cultural code",
        "num": 560
    },
    {
        "id": "fLmgOLlPqYpTqhpfcEff",
        "createDate": {
            "seconds": 1745048789,
            "nanoseconds": 43000000
        },
        "num": 150,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1YaKL-Mzf0vBLyYiDP04l-okqh_35CMeq&sz=w595"
    },
    {
        "id": "fcGLHkNQvV7JDHFb22eT",
        "category": "Music Poster",
        "num": 48,
        "url": "https://drive.google.com/thumbnail?id=1z1EVfiFVXLLHQYMcpz7_8aW8O3EjhH41&sz=w595",
        "createDate": {
            "seconds": 1745047100,
            "nanoseconds": 624000000
        }
    },
    {
        "id": "fgxVyCWFpiyRTPZSXg2Y",
        "num": 558,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053610,
            "nanoseconds": 964000000
        },
        "url": "https://drive.google.com/thumbnail?id=1aCiYocKSLIFyUW4avITk1wDzTTn98XYW&sz=w595"
    },
    {
        "id": "fpq3XDS0yOodWnBOu2AC",
        "num": 365,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052060,
            "nanoseconds": 744000000
        },
        "url": "https://drive.google.com/thumbnail?id=1SxrRXUMUnnEK_yP2jAyis5cdWFOb29p6&sz=w595"
    },
    {
        "id": "gLQtT4UH0NPo0f8EvHaS",
        "num": 55,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047329,
            "nanoseconds": 42000000
        },
        "url": "https://drive.google.com/thumbnail?id=14RFO-0XsENyVxg9RyEGuTMY454sEKyU2&sz=w595"
    },
    {
        "id": "gLkYSXuwaJlYENxWQ7Fg",
        "num": 548,
        "url": "https://drive.google.com/thumbnail?id=142-zSIdz_1f8fY9Dm21IMwKVk-us6iMH&sz=w595",
        "createDate": {
            "seconds": 1745053481,
            "nanoseconds": 685000000
        },
        "category": "The cultural code"
    },
    {
        "id": "gZPniJoyYYTy914zF80q",
        "url": "https://drive.google.com/thumbnail?id=1tLuEKQBuksy-HZ61jymHSEfzl-DLVEkw&sz=w595",
        "num": 340,
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051678,
            "nanoseconds": 912000000
        }
    },
    {
        "id": "gc6S1ksDLOcZPcBIayQQ",
        "url": "https://drive.google.com/thumbnail?id=19yhALl5n0RcL5qyP8GvJlSiN_2pexgjj&sz=w595",
        "num": 355,
        "createDate": {
            "seconds": 1745051863,
            "nanoseconds": 818000000
        },
        "category": "Myths and legends"
    },
    {
        "id": "gdL4XQ6tp1DLMEHdofFy",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051739,
            "nanoseconds": 43000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Bnp4xWypMCCMY0-kDRZt1M-JzRkx0E89&sz=w595",
        "num": 345
    },
    {
        "id": "ghEiLdQcWlxr7g50tDPg",
        "url": "https://drive.google.com/thumbnail?id=1ltspzuLLmojzOCbJanaLHPt46vomO3U4&sz=w595",
        "num": 140,
        "createDate": {
            "seconds": 1745048675,
            "nanoseconds": 420000000
        },
        "category": "Music Poster"
    },
    {
        "id": "glcM3g3bqcoAYCvW37CO",
        "createDate": {
            "seconds": 1745047722,
            "nanoseconds": 578000000
        },
        "num": 80,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1dvo9SjsVd6ca6a5jVc0TrP6tO2k9Z6hp&sz=w595"
    },
    {
        "id": "gz4x1HBPFkIglZOKCTHw",
        "num": 343,
        "createDate": {
            "seconds": 1745051716,
            "nanoseconds": 349000000
        },
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1ITKsmCL5rA3VYTxKriRa_73m3mbuLYkZ&sz=w595"
    },
    {
        "id": "gz91A6LK1gIuAiATDI17",
        "createDate": {
            "seconds": 1745048107,
            "nanoseconds": 980000000
        },
        "url": "https://drive.google.com/thumbnail?id=1lZ4ny-mRxtXa3pMYKgFwJnVvazeTRk9y&sz=w595",
        "category": "Music Poster",
        "num": 104
    },
    {
        "id": "hJbXq2aq5W4rJgqBrvlb",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047541,
            "nanoseconds": 153000000
        },
        "url": "https://drive.google.com/thumbnail?id=1nXun6asDv5AqG4Xv6GZigc3UrNSBx8Oj&sz=w595",
        "num": 69
    },
    {
        "id": "hxjItmv7wy9BEQ68sFOZ",
        "num": 103,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048098,
            "nanoseconds": 507000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Q2z_DcwWBebMolo9PNUA7OGLOfElErv8&sz=w595"
    },
    {
        "id": "i1cQkvGUzVWh2l7jkisf",
        "url": "https://drive.google.com/thumbnail?id=1zskomwb5u5QOBH9NrlS6evmSXWnIDNDm&sz=w595",
        "category": "Music Poster",
        "num": 84,
        "createDate": {
            "seconds": 1745047784,
            "nanoseconds": 194000000
        }
    },
    {
        "id": "i5XTFScmvWZUf3ZoYIo8",
        "url": "https://drive.google.com/thumbnail?id=1oaZX3kaX6x-WufuAsO1uFq3Ix-be1VTs&sz=w595",
        "createDate": {
            "seconds": 1745053515,
            "nanoseconds": 111000000
        },
        "category": "The cultural code",
        "num": 550
    },
    {
        "id": "iX2HfGv0Sk9PWwBG5Vxa",
        "createDate": {
            "seconds": 1745048019,
            "nanoseconds": 525000000
        },
        "url": "https://drive.google.com/thumbnail?id=1ZLUETYMCfxordcPKgoaYlrlCwqCnV9Wv&sz=w595",
        "category": "Music Poster",
        "num": 99
    },
    {
        "id": "id0kF03uGzjTJUcc6B1z",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745046708,
            "nanoseconds": 832000000
        },
        "url": "https://drive.google.com/thumbnail?id=1jI7qqZGyx-BvMWvzz9rDcPDReuyWOfSM&sz=w595",
        "num": 37
    },
    {
        "id": "ifqDbwqXrQxW7siHLL4n",
        "createDate": {
            "seconds": 1745051631,
            "nanoseconds": 311000000
        },
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1Czm-sscmltVZHaD-ROjHi8VzYL78F4Ce&sz=w595",
        "num": 335
    },
    {
        "id": "ikfReSYu22FZH3JynAdR",
        "category": "Music Poster",
        "num": 88,
        "createDate": {
            "seconds": 1745047837,
            "nanoseconds": 881000000
        },
        "url": "https://drive.google.com/thumbnail?id=1YBVnA1BmhelfoPbcumDv3WrRVlep_hZS&sz=w595"
    },
    {
        "id": "imjEP82MS53J6DfpU2TL",
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1kNXQiKUu3zeEC-H7dPwhIcM3wCoAouKN&sz=w595",
        "num": 369,
        "createDate": {
            "seconds": 1745052099,
            "nanoseconds": 666000000
        }
    },
    {
        "id": "it7DgsEpzUGjTi5V4EJ8",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1OMZpkkK2OnE2U4pF96NU7zfCHRRQhdfl&sz=w595",
        "createDate": {
            "seconds": 1745048391,
            "nanoseconds": 270000000
        },
        "num": 120
    },
    {
        "id": "j5SI50fKjhvdadyRknZ1",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053676,
            "nanoseconds": 639000000
        },
        "num": 563,
        "url": "https://drive.google.com/thumbnail?id=1QgvSZh1OCoEpxCfnyUUXUjvyesUkfmqw&sz=w595"
    },
    {
        "id": "j6AVKIype84X5aYLZJZ6",
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1VXl2vWuFI9ox-njP6oyBaIKxpGua4W3L&sz=w595",
        "num": 501,
        "createDate": {
            "seconds": 1745052666,
            "nanoseconds": 34000000
        }
    },
    {
        "id": "jHKT5jzrQCTZ1c1JQOyC",
        "url": "https://drive.google.com/thumbnail?id=1wcsV1PN4LDaX1va3xCKnRS79Kz8ytlrX&sz=w595",
        "createDate": {
            "seconds": 1745048010,
            "nanoseconds": 1000000
        },
        "category": "Music Poster",
        "num": 98
    },
    {
        "id": "kBzAIIeQoVicVMc29EFU",
        "createDate": {
            "seconds": 1745050993,
            "nanoseconds": 868000000
        },
        "num": 301,
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1rBY8ZbtqM5HTEJcVcV5LbNBwIRSGdY1v&sz=w595"
    },
    {
        "id": "kVTmPa9aCqiuBDEpAlsB",
        "num": 503,
        "url": "https://drive.google.com/thumbnail?id=15WRQbtrA5uHOcOOgqOx4JsShUbtoljxG&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745052765,
            "nanoseconds": 33000000
        }
    },
    {
        "id": "l4KJdppk2nMXqpgX5QkK",
        "num": 341,
        "url": "https://drive.google.com/thumbnail?id=1fFwrBXdAX7rWJXkSVS1kFhFCTSJzy4sH&sz=w595",
        "createDate": {
            "seconds": 1745051688,
            "nanoseconds": 144000000
        },
        "category": "Myths and legends"
    },
    {
        "id": "lBaF8pqaHJg8wid71vd5",
        "category": "Myths and legends",
        "num": 322,
        "url": "https://drive.google.com/thumbnail?id=1sc13B_0CXPMp2RaE4NFE5vZ65fnvO1tJ&sz=w595",
        "createDate": {
            "seconds": 1745051446,
            "nanoseconds": 732000000
        }
    },
    {
        "id": "lER5SJNeYnp0Vfw8QB0y",
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1YDl_y43R0NmH3TuKbk4IhYoi36ymha6I&sz=w595",
        "num": 362,
        "createDate": {
            "seconds": 1745052020,
            "nanoseconds": 117000000
        }
    },
    {
        "id": "lOqJwWZ2bUZDGk8u9Gom",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=13uwXEuYR4ZGwNHkBvGcTxgvBPrEVESek&sz=w595",
        "createDate": {
            "seconds": 1745044751,
            "nanoseconds": 486000000
        },
        "num": 22
    },
    {
        "id": "lYm0PNkJiyXpu6glPjUE",
        "url": "https://drive.google.com/thumbnail?id=1E1f8sF2ogdndmAJsVyWbKMmF0W2vvDmq&sz=w595",
        "category": "The cultural code",
        "num": 508,
        "createDate": {
            "seconds": 1745052878,
            "nanoseconds": 11000000
        }
    },
    {
        "id": "lfWKPrLYBmcPFHzXIgSG",
        "url": "https://drive.google.com/thumbnail?id=1e5DjvDFZDBaZNmLZfrYQb1SL8uemD3zV&sz=w595",
        "num": 132,
        "createDate": {
            "seconds": 1745048520,
            "nanoseconds": 494000000
        },
        "category": "Music Poster"
    },
    {
        "id": "lrmJYK8JAQeCPzXOAtiF",
        "num": 511,
        "createDate": {
            "seconds": 1745052939,
            "nanoseconds": 720000000
        },
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=18uRNcL3xanQX9klQiOkCDuVPapemlEON&sz=w595"
    },
    {
        "id": "m9MFTpUHNBWC1ilJe8Ka",
        "url": "https://drive.google.com/thumbnail?id=1P8W9yoa33qLcy_LOEWobBgfiN5ewHXF9&sz=w595",
        "category": "Myths and legends",
        "num": 359,
        "createDate": {
            "seconds": 1745051987,
            "nanoseconds": 30000000
        }
    },
    {
        "id": "mcwPX1GkQ2gKqgPWFRk5",
        "url": "https://drive.google.com/thumbnail?id=1RrhP8mbp_2jspTADA9n5UsYaSbwRZwjS&sz=w595",
        "createDate": {
            "seconds": 1745051404,
            "nanoseconds": 646000000
        },
        "num": 321,
        "category": "Myths and legends"
    },
    {
        "id": "mmLyG8xjf16iE7OBWQGt",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053243,
            "nanoseconds": 19000000
        },
        "num": 532,
        "url": "https://drive.google.com/thumbnail?id=1ynmHx02VSIej5QK2k6k2Qi3EwCIXNxr_&sz=w595"
    },
    {
        "id": "mwiZr4cgxcMAIvEE1K7L",
        "url": "https://drive.google.com/thumbnail?id=1Uv-PIKc6sjKhOFa3MtqRonaBx9LQMm5t&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047426,
            "nanoseconds": 114000000
        },
        "num": 60
    },
    {
        "id": "n5bylxlC9a7nkaylExMc",
        "url": "https://drive.google.com/thumbnail?id=19XzVReQij_YthHiysr1wKtQPLOwe9PQF&sz=w595",
        "num": 513,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745052978,
            "nanoseconds": 808000000
        }
    },
    {
        "id": "nF9aY9kMYwKQcgclWRkk",
        "url": "https://drive.google.com/thumbnail?id=1XDhuBHY6m43agHb8CuvtarmS2XHpPRYu&sz=w595",
        "createDate": {
            "seconds": 1745047852,
            "nanoseconds": 43000000
        },
        "num": 89,
        "category": "Music Poster"
    },
    {
        "id": "nWri7cPr2ncrM0wFqQpV",
        "createDate": {
            "seconds": 1745051039,
            "nanoseconds": 142000000
        },
        "num": 303,
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1SBlkRQKQXyXUxEYmBRTx1HE85wc9Zq30&sz=w595"
    },
    {
        "id": "nqzYHGr9BA35xuPRVdud",
        "url": "https://drive.google.com/thumbnail?id=138chsFhZaOvEhZGmmMcGHJyH65uR6ar-&sz=w595",
        "num": 305,
        "createDate": {
            "seconds": 1745051112,
            "nanoseconds": 141000000
        },
        "category": "Myths and legends"
    },
    {
        "id": "nvlaD9ViqZKvXmVGleyI",
        "num": 535,
        "url": "https://drive.google.com/thumbnail?id=17MBOGmXhHC4_wOeBgAWJ72Ef3k6wGQyd&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053274,
            "nanoseconds": 307000000
        }
    },
    {
        "id": "oAJ1AOUgkzXvVBSZbdrD",
        "url": "https://drive.google.com/thumbnail?id=10aDWXp3FBX6eR0W5f2mBueK46tVz_QVZ&sz=w595",
        "num": 25,
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745044910,
            "nanoseconds": 699000000
        }
    },
    {
        "id": "oIR8GNYblN6dvRO9673X",
        "num": 373,
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1RGf9iPVpyCIs1bUBomognyDqJnMgmpFl&sz=w595",
        "createDate": {
            "seconds": 1745052168,
            "nanoseconds": 349000000
        }
    },
    {
        "id": "oKVzTkeveMMjR9CIO7xZ",
        "num": 85,
        "createDate": {
            "seconds": 1745047793,
            "nanoseconds": 519000000
        },
        "url": "https://drive.google.com/thumbnail?id=1KW0vM86tlP3uLwVEimJdnaBDWtK1VnuC&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "oLVsKjLM96cEUY93wwiT",
        "url": "https://drive.google.com/thumbnail?id=1OuEY0S-icNkekqKhpZKRVEmIOlGeXjwA&sz=w595",
        "createDate": {
            "seconds": 1745053314,
            "nanoseconds": 54000000
        },
        "num": 538,
        "category": "The cultural code"
    },
    {
        "id": "oLklhef2wM88ATNypsjM",
        "num": 370,
        "url": "https://drive.google.com/thumbnail?id=1CqxBlOJ3auleoLdHN-9O_6waKD8ZdyFl&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052109,
            "nanoseconds": 48000000
        }
    },
    {
        "id": "oNEmxkLfrvvxBHcGzSmU",
        "num": 141,
        "url": "https://drive.google.com/thumbnail?id=1a6fXON6vR_Rgbe2cif_-g7fdKFkxYxZy&sz=w595",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745048685,
            "nanoseconds": 227000000
        }
    },
    {
        "id": "oi0yZCmicyw0IwYCuzOE",
        "num": 311,
        "createDate": {
            "seconds": 1745051286,
            "nanoseconds": 918000000
        },
        "url": "https://drive.google.com/thumbnail?id=1ncMQn7dW2IhBwMfAXd9MLPl04erpR39Z&sz=w595",
        "category": "Myths and legends"
    },
    {
        "id": "pCYV6b26jsl6IColg0Xh",
        "createDate": {
            "seconds": 1745051572,
            "nanoseconds": 591000000
        },
        "num": 330,
        "url": "https://drive.google.com/thumbnail?id=1ESvm9HX7qYHE7UCRNPdsWO41EgyTJg6U&sz=w595",
        "category": "Myths and legends"
    },
    {
        "id": "pHKVzU0Jba7u2mAsF110",
        "url": "https://drive.google.com/thumbnail?id=1Wmw-vKmetbOS9iq5lOYwP2izwXS3_pp4&sz=w595",
        "num": 1,
        "createDate": {
            "seconds": 1745042025,
            "nanoseconds": 308000000
        },
        "category": "Music Poster"
    },
    {
        "id": "pV916dt9vVIMpipiFVlA",
        "num": 364,
        "url": "https://drive.google.com/thumbnail?id=1zc4PX8GE07k5pv52nUUDg5gMv8aGHYYy&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052051,
            "nanoseconds": 606000000
        }
    },
    {
        "id": "pjeosgqvtlHfxFyn2RDG",
        "num": 506,
        "createDate": {
            "seconds": 1745052836,
            "nanoseconds": 529000000
        },
        "url": "https://drive.google.com/thumbnail?id=1YRD7caBCY8gB6-yFPbUdMvY-l8RerOAv&sz=w595",
        "category": "The cultural code"
    },
    {
        "id": "plf6DkY3tvP8yBcm3ucM",
        "num": 540,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053377,
            "nanoseconds": 373000000
        },
        "url": "https://drive.google.com/thumbnail?id=1hl7CBTmhtGn9UNZwze1672ssfrGhIRKd&sz=w595"
    },
    {
        "id": "ptH7WulRZxl54zME7gqH",
        "createDate": {
            "seconds": 1745047998,
            "nanoseconds": 435000000
        },
        "num": 97,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1cJp-LKQv1eoc3K-vhCt7wEWcnOXCgWBF&sz=w595"
    },
    {
        "id": "pwnCRmCxwcngpXpFj1BW",
        "num": 567,
        "url": "https://drive.google.com/thumbnail?id=1jkWUucx_gahQrCGglh3zOlS2TfIKDyQm&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053723,
            "nanoseconds": 35000000
        }
    },
    {
        "id": "q8qjjRuVfuVba9YMsl1A",
        "num": 91,
        "createDate": {
            "seconds": 1745047874,
            "nanoseconds": 185000000
        },
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=16N7eLS0QgiAmb4u5ZzIoRdH1p1RfT6G5&sz=w595"
    },
    {
        "id": "qLqn93PJl7irV0NTG1gg",
        "createDate": {
            "seconds": 1745053821,
            "nanoseconds": 139000000
        },
        "url": "https://drive.google.com/thumbnail?id=1En5nVHDB3AxZXpNgKEFawP8qwHC4s0gL&sz=w595",
        "category": "The cultural code",
        "num": 575
    },
    {
        "id": "qNiZeAroyXQRhtMkhKOv",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053565,
            "nanoseconds": 925000000
        },
        "num": 555,
        "url": "https://drive.google.com/thumbnail?id=1wqiHS3iY7DbABaQq_-W37SBEFubOBCKx&sz=w595"
    },
    {
        "id": "qavvEZRCVjoFhzQxZUxc",
        "url": "https://drive.google.com/thumbnail?id=1xfbM8UZr0-TGffr_wDTGV_e9OfFi9Foc&sz=w595",
        "createDate": {
            "seconds": 1745052928,
            "nanoseconds": 330000000
        },
        "category": "The cultural code",
        "num": 510
    },
    {
        "id": "r1BQb4vMAjzLMl7TworA",
        "num": 314,
        "createDate": {
            "seconds": 1745051326,
            "nanoseconds": 445000000
        },
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1z1HgrqMSvymy4JaWTrtXPwit45HlIInr&sz=w595"
    },
    {
        "id": "rITIALbkP9AWgJBJf6Ha",
        "createDate": {
            "seconds": 1745045283,
            "nanoseconds": 702000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Atou7bH3PZIv6j59l8IVJXf4sbvGKmws&sz=w595",
        "category": "Music Poster",
        "num": 29
    },
    {
        "id": "rc23Jfvul71xFdmyf2mQ",
        "url": "https://drive.google.com/thumbnail?id=1xt1StYC19J0nc2_Xw-u21BcQe2EBb0CX&sz=w595",
        "createDate": {
            "seconds": 1745053810,
            "nanoseconds": 882000000
        },
        "num": 574,
        "category": "The cultural code"
    },
    {
        "id": "sO6WNLY7tbF2MqIKNJLU",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053151,
            "nanoseconds": 518000000
        },
        "num": 525,
        "url": "https://drive.google.com/thumbnail?id=1ENHTvg9YkmlHaLk4Y1p-J0UtcC-ATiVQ&sz=w595"
    },
    {
        "id": "sPKwfgWDruc7AQ3b8y47",
        "category": "The cultural code",
        "num": 543,
        "url": "https://drive.google.com/thumbnail?id=15v5D-cUjnBLeg_vCFJlEwMg-V9EGYcAT&sz=w595",
        "createDate": {
            "seconds": 1745053423,
            "nanoseconds": 260000000
        }
    },
    {
        "id": "sQ2ezmyYf6QHCHLzG22c",
        "category": "Music Poster",
        "createDate": {
            "seconds": 1745047804,
            "nanoseconds": 725000000
        },
        "url": "https://drive.google.com/thumbnail?id=1KRAS59HFdg-ZjwjiOPdDwKb9AGw-hTBo&sz=w595",
        "num": 86
    },
    {
        "id": "sWJGIlZyBzk8FRaH7s5m",
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1jYkKGXI8KDSjBaNgWRubtIK0v7Wi1vy8&sz=w595",
        "createDate": {
            "seconds": 1745051375,
            "nanoseconds": 496000000
        },
        "num": 318
    },
    {
        "id": "sf3wBDTaLER3q1PtNQti",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745052141,
            "nanoseconds": 149000000
        },
        "url": "https://drive.google.com/thumbnail?id=14spW9DmHkZI_nVIoF82fGBWO7JT5ZYm_&sz=w595",
        "num": 372
    },
    {
        "id": "socB9KhY0DndKGpfjsx8",
        "num": 145,
        "createDate": {
            "seconds": 1745048726,
            "nanoseconds": 828000000
        },
        "url": "https://drive.google.com/thumbnail?id=1Huf-SuFPiSWDTTcmbIHEzjzw7B1WjvFi&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "t3ptqDYhLaxbFTUNNUs4",
        "category": "Music Poster",
        "num": 52,
        "createDate": {
            "seconds": 1745047281,
            "nanoseconds": 462000000
        },
        "url": "https://drive.google.com/thumbnail?id=1fTkjWpm_1pjEjs2T7r-T6ZGvVzpOnBj5&sz=w595"
    },
    {
        "id": "tF5WgMrMX4a8gHMTEuKe",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051598,
            "nanoseconds": 954000000
        },
        "url": "https://drive.google.com/thumbnail?id=1OdvjNHeb7G-TnaookORtmgLi5gxGdbTg&sz=w595",
        "num": 332
    },
    {
        "id": "tP8j3ou7kR7k6RfrYHio",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1BCf3ZAfiwN0yF-oh2-95L0L9JWGSAz_r&sz=w595",
        "num": 114,
        "createDate": {
            "seconds": 1745048263,
            "nanoseconds": 700000000
        }
    },
    {
        "id": "tj6mp2x3anCdeFK2sGuC",
        "createDate": {
            "seconds": 1745044541,
            "nanoseconds": 11000000
        },
        "num": 14,
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1Cg3GQNz4hUroQiu1NjwzvYRTc-Nyk4W5&sz=w595"
    },
    {
        "id": "twRScygfJMx67fdjS0Qb",
        "createDate": {
            "seconds": 1745052131,
            "nanoseconds": 265000000
        },
        "category": "Myths and legends",
        "url": "https://drive.google.com/thumbnail?id=1zdyYPkMEVk1zsgJlApH9mQDeArp_pbcU&sz=w595",
        "num": 371
    },
    {
        "id": "uLKxmojJGDr7hOc3Qy2A",
        "url": "https://drive.google.com/thumbnail?id=1BdRlIwwz9299YbowfrYztey9uso5Bx7Y&sz=w595",
        "createDate": {
            "seconds": 1745047258,
            "nanoseconds": 2000000
        },
        "category": "Music Poster",
        "num": 50
    },
    {
        "id": "uO75IsLeckNCCr3oLlvs",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=1u9ri_-ZKdJumag7NoLTjk293RRzN1Y0W&sz=w595",
        "createDate": {
            "seconds": 1745047977,
            "nanoseconds": 729000000
        },
        "num": 95
    },
    {
        "id": "urlxl1PXESvu1f0P99Hj",
        "category": "Music Poster",
        "url": "https://drive.google.com/thumbnail?id=12TfoX7IWV1E3C2DpT81WC9bR_OWlbqV8&sz=w595",
        "createDate": {
            "seconds": 1745048455,
            "nanoseconds": 329000000
        },
        "num": 126
    },
    {
        "id": "uuH38ffeIhIID5oig0bK",
        "url": "https://drive.google.com/thumbnail?id=1jNItQDh6bymXbk253qaZtUi_MDAsAlVu&sz=w595",
        "createDate": {
            "seconds": 1745053665,
            "nanoseconds": 433000000
        },
        "category": "The cultural code",
        "num": 562
    },
    {
        "id": "vuyHOJgWwGqpx93RKUHo",
        "url": "https://drive.google.com/thumbnail?id=1Wue1JemrXljmvLk90ep7Ap-OycCnc0fE&sz=w595",
        "category": "Myths and legends",
        "num": 360,
        "createDate": {
            "seconds": 1745051996,
            "nanoseconds": 184000000
        }
    },
    {
        "id": "vvXgwdOXTCF6gMzIURkj",
        "num": 561,
        "url": "https://drive.google.com/thumbnail?id=18Zsf4ixeqDwlH0sQgYTJZkxMps-ZGyjn&sz=w595",
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053656,
            "nanoseconds": 346000000
        }
    },
    {
        "id": "vw9LH0kepINscj2lhjCD",
        "createDate": {
            "seconds": 1745047865,
            "nanoseconds": 261000000
        },
        "category": "Music Poster",
        "num": 90,
        "url": "https://drive.google.com/thumbnail?id=1YspWHHgRn814ONqMMBZX123YvnF_-AVC&sz=w595"
    },
    {
        "id": "wmLC5w02acKbz5f1W6ra",
        "createDate": {
            "seconds": 1745044726,
            "nanoseconds": 644000000
        },
        "url": "https://drive.google.com/thumbnail?id=170GRMuJNfDlngEle5dotIXsFqObnYSzK&sz=w595",
        "category": "Music Poster",
        "num": 21
    },
    {
        "id": "wovszd64E3lA3hpmWN0M",
        "category": "The cultural code",
        "url": "https://drive.google.com/thumbnail?id=1JycLsy3F7blw5XQUOAdGWRrbyXf9M-IL&sz=w595",
        "createDate": {
            "seconds": 1745053733,
            "nanoseconds": 431000000
        },
        "num": 568
    },
    {
        "id": "wr7RUyASijooBG2E9WhJ",
        "url": "https://drive.google.com/thumbnail?id=1JFQBGS_ZPslhzDWCn-DJJaDZMsZH8qZQ&sz=w595",
        "category": "The cultural code",
        "num": 519,
        "createDate": {
            "seconds": 1745053077,
            "nanoseconds": 217000000
        }
    },
    {
        "id": "wtP81hzms4b2d0TYqUAK",
        "num": 33,
        "createDate": {
            "seconds": 1745046652,
            "nanoseconds": 380000000
        },
        "url": "https://drive.google.com/thumbnail?id=1M5IEDoITCpRYrOMlWNF0TX_qTULXOES5&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "xSQE69WDioq52iasa1zS",
        "category": "Music Poster",
        "num": 119,
        "createDate": {
            "seconds": 1745048369,
            "nanoseconds": 502000000
        },
        "url": "https://drive.google.com/thumbnail?id=1vsMXRZPPeBJQyF9f2N6WBsoHSs69eGBN&sz=w595"
    },
    {
        "id": "xWyAP9zCJCokgPwvNwjU",
        "category": "Myths and legends",
        "num": 306,
        "createDate": {
            "seconds": 1745051162,
            "nanoseconds": 683000000
        },
        "url": "https://drive.google.com/thumbnail?id=1S6OyZS37piE7jTMstyYxAxDkHYivWBij&sz=w595"
    },
    {
        "id": "yHStLkq4ptuaGVzh4s3y",
        "num": 43,
        "createDate": {
            "seconds": 1745046912,
            "nanoseconds": 999000000
        },
        "url": "https://drive.google.com/thumbnail?id=1QHP5siQdRDprCdmII3ZXORAJ9etAtQra&sz=w595",
        "category": "Music Poster"
    },
    {
        "id": "yT5uQ1lX7HRMw46NlLIu",
        "url": "https://drive.google.com/thumbnail?id=1dwOF6X-Z6NzFEt81lp69ZPQPYcyI_uw3&sz=w595",
        "createDate": {
            "seconds": 1745051650,
            "nanoseconds": 876000000
        },
        "num": 337,
        "category": "Myths and legends"
    },
    {
        "id": "yYx4qoqV8xhp7RuyKDog",
        "num": 307,
        "url": "https://drive.google.com/thumbnail?id=1GwRrmV2rqBXemlKF3Plk_f_EbmnHpabz&sz=w595",
        "category": "Myths and legends",
        "createDate": {
            "seconds": 1745051210,
            "nanoseconds": 213000000
        }
    },
    {
        "id": "yiRlpf5j86DJ86VeqO68",
        "category": "Music Poster",
        "num": 122,
        "createDate": {
            "seconds": 1745048411,
            "nanoseconds": 394000000
        },
        "url": "https://drive.google.com/thumbnail?id=1044NwkMJnmBaTasBq4oIwSQUKLImnGF4&sz=w595"
    },
    {
        "id": "yppqAsX5nh5J25ulLsFR",
        "url": "https://drive.google.com/thumbnail?id=1yYOt5c6Wo0JO1_5N0ooNuoEyk5fsxFkp&sz=w595",
        "num": 537,
        "category": "The cultural code",
        "createDate": {
            "seconds": 1745053301,
            "nanoseconds": 650000000
        }
    },
    {
        "id": "zAfNqIAUlM69ghxyImbE",
        "num": 56,
        "url": "https://drive.google.com/thumbnail?id=19SarjNYEh9a0yzV2uBNA2PKF2-trVN1F&sz=w595",
        "createDate": {
            "seconds": 1745047339,
            "nanoseconds": 322000000
        },
        "category": "Music Poster"
    },
    {
        "id": "zVJuCqimx7A7iz77QLh6",
        "url": "https://drive.google.com/thumbnail?id=1NsqqBT8ySsFmujFZS77GrLvUpVTfZvcF&sz=w595",
        "category": "Music Poster",
        "num": 143,
        "createDate": {
            "seconds": 1745048705,
            "nanoseconds": 934000000
        }
    },
    {
        "id": "zWNf2gxWpy1XieNM2kt4",
        "createDate": {
            "seconds": 1745044371,
            "nanoseconds": 50000000
        },
        "url": "https://drive.google.com/thumbnail?id=1yQIz47q2bMc9lu64MfXnRhOsJbHs3fvX&sz=w595",
        "category": "Music Poster",
        "num": 11
    }
];

const result = [
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 549,
        "url": "https://drive.google.com/thumbnail?id=1A9PQLZbESxXMYVm8UeE79OzRXtnzhIOR&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 9,
        "url": "https://drive.google.com/thumbnail?id=15Ob6zrsYkjIWiut-Ni48U1DTxCTsxkY0&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "imageNum": 46,
        "url": "https://drive.google.com/thumbnail?id=1uniOKxSPWjJMer0mJFWoCTnDnwNX5xYQ&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 147,
        "url": "https://drive.google.com/thumbnail?id=1B5bq1p3FUK5hRyVfYBVw2kjVk5yOEnZ4&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "imageNum": 544,
        "url": "https://drive.google.com/thumbnail?id=1VKhzuM1V_0RdGcSUUTdtSn97ufHtiQxS&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 146,
        "url": "https://drive.google.com/thumbnail?id=1yF3E5ZxQPuaJxbe4rCDnWzqCilBtKd7E&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 130,
        "url": "https://drive.google.com/thumbnail?id=1ZIGVTAeSWGIzvZXpdF6eD_-6wVkp7M1f&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 109,
        "url": "https://drive.google.com/thumbnail?id=IegtXLXy_UxzlE3arxsesZjkwIOnn5SB &sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 17,
        "url": "https://drive.google.com/thumbnail?id=1-vlk7I9Leok4qOP-LAQAC7LXE7KL0wxY&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 4,
        "url": "https://drive.google.com/thumbnail?id=1Ssdfkus_7cqxmujkLiySTEgKZY6NdNiA&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 125,
        "url": "https://drive.google.com/thumbnail?id=1pYZNiYkxjf6f0zm9O6jN7-7b33uh8uPX&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 338,
        "url": "https://drive.google.com/thumbnail?id=1UzVXqA1cRz4vWvEkgtOrip9Phavka5UI&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 128,
        "url": "https://drive.google.com/thumbnail?id=1iK1YLw17ZZP0N6kl0q_RjlWMf-8jGfrh&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 151,
        "url": "https://drive.google.com/thumbnail?id=1NLBMp0Fng93Fh3Gphm9uaCbi_Dua0NOC&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 107,
        "url": "https://drive.google.com/thumbnail?id=1dNphi8YkN9tc__1FjLvYBjS_MlmLohyZ&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 3,
        "imageNum": 531,
        "url": "https://drive.google.com/thumbnail?id=1xsLmDocOvDMi54ZpI44QeQW_82sbQJVc&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 2,
        "imageNum": 578,
        "url": "https://drive.google.com/thumbnail?id=15Ne7yVq91TlGenCKbpxsY2ZimWb9CGG4&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 77,
        "url": "https://drive.google.com/thumbnail?id=1zwqvkHgGBsnfxAhN6EgcXNyI53a-v5tS&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 2,
        "imageNum": 18,
        "url": "https://drive.google.com/thumbnail?id=1QBJrjf2EvKYhgP7FR3KVRh54km4QBgUD&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 61,
        "url": "https://drive.google.com/thumbnail?id=15fq1ILPeSvooAihJtQOweY5qvWpM6Fy7&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 539,
        "url": "https://drive.google.com/thumbnail?id=1GDJ2d2NDVN94TxG97cC_XBVa336cWZ-t&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 348,
        "url": "https://drive.google.com/thumbnail?id=1fN0b0WUVcce9lusEVAQ4uslElmR0V0pz&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "imageNum": 40,
        "url": "https://drive.google.com/thumbnail?id=1Ww_o_AtRq2x2X0WSoq8R5dEfQRuQVvT3&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "imageNum": 44,
        "url": "https://drive.google.com/thumbnail?id=1j9OxQ72VUJ2MmhH752QRCdPmo-jXbEKW&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 354,
        "url": "https://drive.google.com/thumbnail?id=1YcVeopkz2KOZtlV-0DygVMPG2lyVJQD6&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 16,
        "url": "https://drive.google.com/thumbnail?id=1uV9pvGQ7afElqcF1hvx626yPcaVlDILR&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 320,
        "url": "https://drive.google.com/thumbnail?id=1cHTczGWk5ZGYdX-7Q4t3nx-uKnq-TRga&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 94,
        "url": "https://drive.google.com/thumbnail?id=1MU0oXU9Ov4V0IQcgGUHLSLCTWZ-vWKAG&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 112,
        "url": "https://drive.google.com/thumbnail?id=1PZZcrVCUaOwz8o_bFrLVM5SkKUztb_rZ&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 517,
        "url": "https://drive.google.com/thumbnail?id=1KukR-s5JeAblLrLXJuMNGBYKFIPyAC0m&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 42,
        "url": "https://drive.google.com/thumbnail?id=1Bas5ycu84-Mk9ls9aMOjUKhIHPd-5eZJ&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 547,
        "url": "https://drive.google.com/thumbnail?id=1keGQ0mxWsZXY6zDZZ_13w-07GUx1c0LU&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 53,
        "url": "https://drive.google.com/thumbnail?id=1ls6A3wpuVKbI3pdx-Ndut7UFa_KszuKO&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 515,
        "url": "https://drive.google.com/thumbnail?id=1vbWvW_v_6GWoeB62QIf2xl7PciPkyV_R&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 127,
        "url": "https://drive.google.com/thumbnail?id=1NRWSTEHMjHf53LxWwRRMmq9VqqCh6Prb&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 520,
        "url": "https://drive.google.com/thumbnail?id=1Ed2w7JSEkhrDmWNJ7kWcmBEb4oZL1JmL&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "imageNum": 577,
        "url": "https://drive.google.com/thumbnail?id=1-G65a9B32SdnCaDgoqo3bIvxMKWkPNYq&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "imageNum": 27,
        "url": "https://drive.google.com/thumbnail?id=1bkWd0xd35NcuuQjXMl5yfnZoihHZ9BZz&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "imageNum": 374,
        "url": "https://drive.google.com/thumbnail?id=1vJZFSvPuYTLOQjOpOEMWGf1UBKuN3fuk&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 0,
        "2": 2,
        "3": 1,
        "4": 3,
        "5": 2,
        "imageNum": 366,
        "url": "https://drive.google.com/thumbnail?id=1F9O5le9xLC5CsgOU2bWBCPfF8PndmPLb&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "imageNum": 358,
        "url": "https://drive.google.com/thumbnail?id=18c0gq_5W_K-12a7qFh58CZ670I_T28Mr&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 0,
        "imageNum": 41,
        "url": "https://drive.google.com/thumbnail?id=1EdxQg0IvtOMJS0FskLwCdWN3q_xaWEzD&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "imageNum": 63,
        "url": "https://drive.google.com/thumbnail?id=1FVKQSdoioDcTXSntrAy_ouOov1Uszwqq&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 93,
        "url": "https://drive.google.com/thumbnail?id=1siRVxV1TG2xIGYNQXCrAKpw365qyoRXR&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "imageNum": 137,
        "url": "https://drive.google.com/thumbnail?id=1ShPaPnRppywB7rs6jWxjJJ9acIq-p1wG&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 524,
        "url": "https://drive.google.com/thumbnail?id=1SMtem3wmqGysPBoFG5w3gFEro9zvAmEY&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 2,
        "imageNum": 81,
        "url": "https://drive.google.com/thumbnail?id=1wAFAp6E0fUT5a7vGJteamLvlZk5nvmJP&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 361,
        "url": "https://drive.google.com/thumbnail?id=1Urr7NTvBb2DjP2ZfEr6ZelTSMwEUC1lL&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 0,
        "imageNum": 67,
        "url": "https://drive.google.com/thumbnail?id=1nXbBmBQDHRI4ePRazX1hxosYqhoXG28v&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 83,
        "url": "https://drive.google.com/thumbnail?id=1x1gweSzuB6SidZEBDwPx5fDJSPkjAsjA&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 75,
        "url": "https://drive.google.com/thumbnail?id=1YuBzCLrELRprk8neUVXU5ui1IbXhTAOI&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 72,
        "url": "https://drive.google.com/thumbnail?id=1ErDToQyJ7GnhtliUDTdJZ_vU4WBeGLca&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 312,
        "url": "https://drive.google.com/thumbnail?id=1YTkEhBlPGKTUmyYNPfDLaLEbBByYbuSq&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 111,
        "url": "https://drive.google.com/thumbnail?id=1iCiD47ACHI-3yBQ49kniEoKxL-ziHa5_&sz=w595",
        "middleK": "2.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 66,
        "url": "https://drive.google.com/thumbnail?id=1kkNg0GwybgI7Md_8MsK53HoyGRz-zHDW&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "imageNum": 20,
        "url": "https://drive.google.com/thumbnail?id=1Ksqg3C-DO9DgMF7_OAF8vcjuWTGLHbGL&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 1,
        "imageNum": 142,
        "url": "https://drive.google.com/thumbnail?id=1o3ZTw6oGmYbrUcm0gsODY5iPUryhz22T&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "imageNum": 15,
        "url": "https://drive.google.com/thumbnail?id=1qZf9NPh58eRtHuHVtSgVwFVIZoFMaMuN&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 74,
        "url": "https://drive.google.com/thumbnail?id=1twolYjFR4MbwI9JSO9eJlEnUrCZ0HcxV&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 368,
        "url": "https://drive.google.com/thumbnail?id=1Cix-b8ZmHpelSGG6imvjvEXJnacV_t3k&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 527,
        "url": "https://drive.google.com/thumbnail?id=1OSPQ2eDv8yVAzKPLWhYWJqSnvgSV5IVK&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "imageNum": 28,
        "url": "https://drive.google.com/thumbnail?id=1IhiChI8CWvtojvWFlEuO4dJWCTvdoPH-&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 78,
        "url": "https://drive.google.com/thumbnail?id=1qLg2qy-vWNLObQyswEaWLbRHL4jBmsCp&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 518,
        "url": "https://drive.google.com/thumbnail?id=1nq2CsAQ059R2_wu47MATvMxgz27Qj_Xd&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 76,
        "url": "https://drive.google.com/thumbnail?id=1q0mGmspapCwWsFcuWewpXrTA9bAxiOF7&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 96,
        "url": "https://drive.google.com/thumbnail?id=1wAca646gQWlPgaV32nUOcLOWwAP_dMrH&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 73,
        "url": "https://drive.google.com/thumbnail?id=14gRV3z_ysIObuYqmUk863eQBLNJn2vBV&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 5,
        "url": "https://drive.google.com/thumbnail?id=11gj31Tl6cmeomndI3liIlg7KiSGMUBcy&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 115,
        "url": "https://drive.google.com/thumbnail?id=18nq8THB92KFHlEW61VDljtCXYy9pO6mS&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 1,
        "imageNum": 47,
        "url": "https://drive.google.com/thumbnail?id=1Nd90g9oNamp0CCzHP4R1Oc-dBZeaLvgR&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 136,
        "url": "https://drive.google.com/thumbnail?id=1gpX454mFD8gb0hEsWzpHW44yoNxeRIxH&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 349,
        "url": "https://drive.google.com/thumbnail?id=1qUA8xpf8JCj7-PZOgnZS38iyi0ehs2o-&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 507,
        "url": "https://drive.google.com/thumbnail?id=1sbCmJaN98HZ5U4_JRXj7X9zgi-oc7vPJ&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 350,
        "url": "https://drive.google.com/thumbnail?id=1skXwPMTFQfVOyG_qI0c2EEX-dWR3NJuC&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 68,
        "url": "https://drive.google.com/thumbnail?id=1734zk4XL5TjgaKJlr6J1doqimZiMopMb&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 71,
        "url": "https://drive.google.com/thumbnail?id=1--xNCJTURfB1BawwYzztsAG7v4K-5xf-&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 325,
        "url": "https://drive.google.com/thumbnail?id=1O5iCX2zuHIYtuYadkzDKqwlHz0Pt2uaa&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 87,
        "url": "https://drive.google.com/thumbnail?id=10PCfXPyfXmd23Q3DmaMYddWCPSYMB6D5&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 35,
        "url": "https://drive.google.com/thumbnail?id=1Dh1qNhuIqWhYYNqNkivupkN-yDfc9lAh&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 2,
        "imageNum": 546,
        "url": "https://drive.google.com/thumbnail?id=1QssVBoU55SOyrqYiTkire1-LWv-jXScw&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 23,
        "url": "https://drive.google.com/thumbnail?id=1N5QBFpFmvoDKcNogz9OMuvjl4szXNrdE&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 3,
        "url": "https://drive.google.com/thumbnail?id=13bs06H83ASnZoDhlHmZU_KiKx_TNuTrW&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 62,
        "url": "https://drive.google.com/thumbnail?id=1JugJQBwIDiti3Wu8ENPBypOj2V7VgEsc&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 152,
        "url": "https://drive.google.com/thumbnail?id=1kFJW704zDBzA4Uu2Loejdnoyc8e1J945&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 326,
        "url": "https://drive.google.com/thumbnail?id=1sr2E7CpDStUGjXaOQGrXfOTZXDtj5Q4_&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 64,
        "url": "https://drive.google.com/thumbnail?id=1Jc7Ov5C6iCD_hzYoWlFEA5CcP-FGKsrH&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 139,
        "url": "https://drive.google.com/thumbnail?id=1fFVH4krFx9mWqfBl90L_9-sv2ch57nqn&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 100,
        "url": "https://drive.google.com/thumbnail?id=137T7UgbcW4UuSGsGHAnYlnYOrFiXLMWi&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 552,
        "url": "https://drive.google.com/thumbnail?id=1dnSjp5ZO7DeqNBRWLagix3X-9UqD7qi4&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 144,
        "url": "https://drive.google.com/thumbnail?id=1tFJgMDmky9d4cKj7h0sF-iYCRKaMlUof&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "imageNum": 566,
        "url": "https://drive.google.com/thumbnail?id=1S55sHXH7hTwdJJTkRMVF-Jgtwll8esK4&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "imageNum": 12,
        "url": "https://drive.google.com/thumbnail?id=191M2rdL8FKbV1lghYjJJH6CgqAFXVomp&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 0,
        "imageNum": 569,
        "url": "https://drive.google.com/thumbnail?id=1q7FdO0BP4VjGYpJ8IggfcO_5hnC2l9Fu&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 105,
        "url": "https://drive.google.com/thumbnail?id=1IiL9rkKbtfZPpvPYQfU6SSofPEj2PwCg&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "imageNum": 134,
        "url": "https://drive.google.com/thumbnail?id=1KT60EV8w3dUwGhW3DhKaqxoIXlfn0klI&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 58,
        "url": "https://drive.google.com/thumbnail?id=1spn7mDMkZovYCR4CDCXFrEcr8M6SOYKB&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 110,
        "url": "https://drive.google.com/thumbnail?id=1fQ8jjfWWDbwdg1BAnoqabNOH6yLJjC5e&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 536,
        "url": "https://drive.google.com/thumbnail?id=15hko0qAQ0dbUcaQWh80JFj-vO8qWQ1yg&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 526,
        "url": "https://drive.google.com/thumbnail?id=1KpVUbFRX_ebVAZWVXhRc84LV5p6DOCqX&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 34,
        "url": "https://drive.google.com/thumbnail?id=1l5V9EJ3ZZQkczVSDjRKQceqEq7d1AQxe&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 553,
        "url": "https://drive.google.com/thumbnail?id=1SqB4cmDzVrQ-_2SfP36eQQogVGihj5st&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "imageNum": 557,
        "url": "https://drive.google.com/thumbnail?id=15NEzKMoOEwzoBvwbNGBHjlRhe8csRN9M&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 3,
        "imageNum": 31,
        "url": "https://drive.google.com/thumbnail?id=1aElLUNIJNXVFmRnwRaShQnY61zBpSRHt&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 2,
        "imageNum": 339,
        "url": "https://drive.google.com/thumbnail?id=18qrtGMAQLqSlrQvvRPg3Fq2G1PKjxg5R&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 304,
        "url": "https://drive.google.com/thumbnail?id=1QemW3MiLkAx4hKyvSRqUWrvCtcXr_zI1&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 70,
        "url": "https://drive.google.com/thumbnail?id=1DMA6ypRA4-yOcRu7If7hwX8_O9g5lj-Y&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 541,
        "url": "https://drive.google.com/thumbnail?id=1bL4sb8A7yTvVe6KsLJg-uZbesBwnX4i5&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 333,
        "url": "https://drive.google.com/thumbnail?id=1bbVZEq8YPQGB7xXdERfXJ7XgZhP-2CAc&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 7,
        "url": "https://drive.google.com/thumbnail?id=1n2qo2NuTAx-Pm13XpFKFSE8souNbpJ-H&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 106,
        "url": "https://drive.google.com/thumbnail?id=1EtiXcUST0VdRGGL9o2NJ-Xi29oHUZIDL&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 505,
        "url": "https://drive.google.com/thumbnail?id=1wxQRSB6Lx3dCRFWvo0-1va9EU0ute988&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 2,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 117,
        "url": "https://drive.google.com/thumbnail?id=1wZaSBsItbQWnn8PNndHctZIpkr8ZKHzD&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 512,
        "url": "https://drive.google.com/thumbnail?id=15RjM5iB_ZzqAtIM5gyFmIdTFzR0m02jW&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 2,
        "imageNum": 336,
        "url": "https://drive.google.com/thumbnail?id=1T14pXI4IT1VMLDmResLZxl0C3csg70Dx&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 331,
        "url": "https://drive.google.com/thumbnail?id=1IECOwm1EfCC20VIJjwwP6wDffUraWeDw&sz=w595",
        "middleK": "2.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "imageNum": 353,
        "url": "https://drive.google.com/thumbnail?id=1bDoc8VP-E2SSmvZTWh6fqXJM-RHpOTOq&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 523,
        "url": "https://drive.google.com/thumbnail?id=15LBv4BPO4gRQo6VbipRVgsElQI8KMx9x&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 3,
        "imageNum": 316,
        "url": "https://drive.google.com/thumbnail?id=1gNw2IK7_W6eilQCvmnM7oRWsKzV3LBmy&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "imageNum": 554,
        "url": "https://drive.google.com/thumbnail?id=1RCtu4D_e84rxJzBwF_Tn0Mp1sPdfAbeS&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "imageNum": 148,
        "url": "https://drive.google.com/thumbnail?id=158NB1BRNuwY8ohu7B7MdjpFw1ZBkehUf&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "imageNum": 149,
        "url": "https://drive.google.com/thumbnail?id=1rJvTpPp-gPYVxVXoJriG3dty11kD6BkJ&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 521,
        "url": "https://drive.google.com/thumbnail?id=1YGfUPwqCBTXowwpiKP7u4NIcq8yj2rTK&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 302,
        "url": "https://drive.google.com/thumbnail?id=1ODzqV5BlAWiF8OL1yIhI4FkvcKpA6e6R&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "imageNum": 534,
        "url": "https://drive.google.com/thumbnail?id=1yfHssClsRhVjRp0ZY_oIwLhDB6M3iifc&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "imageNum": 357,
        "url": "https://drive.google.com/thumbnail?id=1bX3NsIGq9wcY-8ll5xxl7FddM6hSoYB5&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 38,
        "url": "https://drive.google.com/thumbnail?id=1-9XXflaiXYPXI38-WdlOhrupVXQKm4RB&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "imageNum": 573,
        "url": "https://drive.google.com/thumbnail?id=1PD1c7SllzpZVdUoiBjZtskRm44yP22qt&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 570,
        "url": "https://drive.google.com/thumbnail?id=1EFL2evvLxJHdwgf2IjyThLsn8IFGpgsa&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 1,
        "imageNum": 556,
        "url": "https://drive.google.com/thumbnail?id=1vPZO8OBpkueDvcJKZuTYOsaZynoFWPRI&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 545,
        "url": "https://drive.google.com/thumbnail?id=1fQkAvFBPROoeas9DAu4h_vYflOpLsDDl&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 559,
        "url": "https://drive.google.com/thumbnail?id=1F0s6-_9AiFrt_ihtZIm__PKf4trMsQ9I&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 317,
        "url": "https://drive.google.com/thumbnail?id=1hLFma8sdHHXF-w_VtXuJItGPyxhiZSpN&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 1,
        "imageNum": 101,
        "url": "https://drive.google.com/thumbnail?id=1K_JX2CXk4C7gU0XtFD-TtCc0Wz1tnStJ&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 49,
        "url": "https://drive.google.com/thumbnail?id=1xYcgNgvPoc4CHbZdkOj9i8EYrxg5mhsM&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 356,
        "url": "https://drive.google.com/thumbnail?id=1pUhV0Dkk6JrELjRy0P2RvlBMoftwNKWI&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 2,
        "5": 0,
        "imageNum": 308,
        "url": "https://drive.google.com/thumbnail?id=1MTmHZsvS5hHKIX8yYVWQs4kZ-84B-dkQ&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "imageNum": 6,
        "url": "https://drive.google.com/thumbnail?id=1jnHT14BET7nmGubuK-pMgdtxF6XNbW8g&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 0,
        "imageNum": 571,
        "url": "https://drive.google.com/thumbnail?id=1UYXFX3FhZVUMCU97L5If2Hpfjxw__LHr&sz=w595",
        "middleK": "0.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 533,
        "url": "https://drive.google.com/thumbnail?id=1PzI03CeDZuU9S_YqIvX4JpO9VD_0r_wG&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "imageNum": 51,
        "url": "https://drive.google.com/thumbnail?id=1xDtZxTjdcThmkpTUHmXOa_tkiWdKrXcB&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 327,
        "url": "https://drive.google.com/thumbnail?id=1zGpdfdPEQx4VE8bSUhgUvE7_Tu3Rois8&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 344,
        "url": "https://drive.google.com/thumbnail?id=18bVCrf-i3q5cG9aSoB0yrLOoP6FoIZQv&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 1,
        "imageNum": 59,
        "url": "https://drive.google.com/thumbnail?id=1cKE5HsfVgzIvfdc_-VoWrL_zzo9f3jFC&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 10,
        "url": "https://drive.google.com/thumbnail?id=1OliMT2YllOzamSTxMqWrMqr46vLnwH8N&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 2,
        "imageNum": 352,
        "url": "https://drive.google.com/thumbnail?id=1tZVZyTxVqB33-pXEjf7HFDk5Wlo7IqIi&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 92,
        "url": "https://drive.google.com/thumbnail?id=1P1fnc19NGtHVg6sEubmXm75gffrsEHW9&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 329,
        "url": "https://drive.google.com/thumbnail?id=1qy-k-LxOEo8ER0B5tnP1_Wu52nER_fT-&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 328,
        "url": "https://drive.google.com/thumbnail?id=1bpQevfg-LreTsrfpypwc4p3g9wNuWSRy&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 2,
        "imageNum": 528,
        "url": "https://drive.google.com/thumbnail?id=1gxbuzt20fkDV-LVBFxPpvoFpQ_TzCdsh&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 1,
        "imageNum": 529,
        "url": "https://drive.google.com/thumbnail?id=11NloI2Msst1YiDKrHDzq5iaWZhwq0zig&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 576,
        "url": "https://drive.google.com/thumbnail?id=13YOAiPkcwSzfhsIwYHSUdGcBAFmhZOG8&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 1,
        "imageNum": 133,
        "url": "https://drive.google.com/thumbnail?id=1gtkkDdmDHnysnOfp9uOdrXOn53Sn7PVZ&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 0,
        "imageNum": 310,
        "url": "https://drive.google.com/thumbnail?id=13hEzf12mfxefEcyqpwGKnoSN9JEhobbx&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "imageNum": 564,
        "url": "https://drive.google.com/thumbnail?id=1EGt_BiGqeb_NiUSnI-4HajPJrOS4OTHW&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 315,
        "url": "https://drive.google.com/thumbnail?id=16BqifVkObTSbanSTIhnQxmbSRUzSUOvb&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 121,
        "url": "https://drive.google.com/thumbnail?id=1CVQMLSossyoIOTNxD8RnerZc-MX9s-cq&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 509,
        "url": "https://drive.google.com/thumbnail?id=1rP2PEdbC4XA8eFThU2dkN0YET_jrVIjr&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 530,
        "url": "https://drive.google.com/thumbnail?id=1aC36JtjMqe4NcztS9ObF8s4VBJs4Vywr&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 0,
        "imageNum": 79,
        "url": "https://drive.google.com/thumbnail?id=1YDTCc7U0A54yRDYRvIA6-rRHG4yiuVrv&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 3,
        "imageNum": 363,
        "url": "https://drive.google.com/thumbnail?id=1vaWAZkzJJbCR0qSy4L_Kt9d2OtKzV4nS&sz=w595",
        "middleK": "2.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 1,
        "imageNum": 579,
        "url": "https://drive.google.com/thumbnail?id=1-7oYwO4NIc8PlPkGv798iuEWA_yZz7h3&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 504,
        "url": "https://drive.google.com/thumbnail?id=1TvtXj2nUVtYCtvLbkoRTBj9dB7HwRPgp&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 1,
        "imageNum": 351,
        "url": "https://drive.google.com/thumbnail?id=1dXzCQNdBqTWYZWxSD1LCqu3XaaqcGwWa&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 54,
        "url": "https://drive.google.com/thumbnail?id=1LVo44LgPZ-rpTek1DcidGuicMPZ47DnK&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "imageNum": 138,
        "url": "https://drive.google.com/thumbnail?id=1rLFtSC4u-izh0Htu3Gzn00MMyUdiwXTy&sz=w595",
        "middleK": "0.000"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 572,
        "url": "https://drive.google.com/thumbnail?id=1nMtFx9Qy6wpKoJjXPsb1UsMyTf0rX3Pz&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 319,
        "url": "https://drive.google.com/thumbnail?id=1_MbHbSteUow6nBXk3LopBw3-b5p1FKeG&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 26,
        "url": "https://drive.google.com/thumbnail?id=1vRdp5ezW6Mm_PeoJUTeN44ut7WsHb4hk&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 113,
        "url": "https://drive.google.com/thumbnail?id=1-1aAQ8DmYYq16yUrYflyBT69SSMoip8j&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 516,
        "url": "https://drive.google.com/thumbnail?id=18kNobH32AAfldq50x_sQBCcVOe7x1hDM&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 0,
        "imageNum": 313,
        "url": "https://drive.google.com/thumbnail?id=1S1qSWBNcbx3WeMKUYDg1yVB5_tQCFrrG&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "imageNum": 324,
        "url": "https://drive.google.com/thumbnail?id=1s2rgEJ0enloYLbLCabYLH8UC1Is2lore&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "imageNum": 123,
        "url": "https://drive.google.com/thumbnail?id=1POWd8PkBu6WL9jR3xDShk7teBf4bbNkp&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 342,
        "url": "https://drive.google.com/thumbnail?id=1_-6SFQRnAqPcw0PCSkbAEEjF5dKIsFQy&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "imageNum": 153,
        "url": "https://drive.google.com/thumbnail?id=1Z_zqoLBA6e3rdtcsd8MGvQJYCMQHzG7n&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 2,
        "3": 0,
        "4": 3,
        "5": 0,
        "imageNum": 551,
        "url": "https://drive.google.com/thumbnail?id=1PVfPJ40S-A2J9SsF7gtXN4_ilji13OdG&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 0,
        "imageNum": 129,
        "url": "https://drive.google.com/thumbnail?id=1fZ_E0UPcAn9FdF5Zr96mXLPw7uymsg9_&sz=w595",
        "middleK": "0.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "imageNum": 367,
        "url": "https://drive.google.com/thumbnail?id=1qzTxn8gCVK0KilIU7ZrbSlf60Bg8zEQ6&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "imageNum": 45,
        "url": "https://drive.google.com/thumbnail?id=1xaYGiauhMfgCkD6-VxP__AU7AL_JgiyA&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 13,
        "url": "https://drive.google.com/thumbnail?id=1D2iLYyxbJm5E83DXwrA3ItLsMTBfRAUG&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 116,
        "url": "https://drive.google.com/thumbnail?id=1Vmx7JbDYfWWjnZ2Uuv8B223AoC41CSM7&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 522,
        "url": "https://drive.google.com/thumbnail?id=17bBLpcDfprUQ7NIpz_JRs7Kr1uTLtk-X&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 154,
        "url": "https://drive.google.com/thumbnail?id=160QVDg7dBjw7JvKCjXmCx4PUDFsW4eLZ&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 36,
        "url": "https://drive.google.com/thumbnail?id=1i74rnkveQCltFyjejf-E9JKK6jR3pS4Q&sz=w595",
        "middleK": "0.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 102,
        "url": "https://drive.google.com/thumbnail?id=1QYlYZr1y9e6NbDEi2ZTFQ3qhPO390bF2&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 118,
        "url": "https://drive.google.com/thumbnail?id=1SWRvRnBLvw4sP4Yki1jVhuu_FBxCsLJc&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 1,
        "imageNum": 124,
        "url": "https://drive.google.com/thumbnail?id=1JP87L5IDsa-1zDqKsjtKhLXY6ZcVNWsW&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 1,
        "imageNum": 8,
        "url": "https://drive.google.com/thumbnail?id=1oX1tVl3KQIqqCttdasaWcUrULiIt0Ad9&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "imageNum": 65,
        "url": "https://drive.google.com/thumbnail?id=1hziZxe0Q6ybSGkAp1PF-So2YAOClA_oW&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 32,
        "url": "https://drive.google.com/thumbnail?id=1aT7qsMoJ7-fdYqllCka22jQooSLjOUl1&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 0,
        "imageNum": 39,
        "url": "https://drive.google.com/thumbnail?id=1o_oskwb9mXuGQGZVxgZZAqRPzkyZzyRU&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "imageNum": 334,
        "url": "https://drive.google.com/thumbnail?id=1XVNjXNHrxY5oFGCKcHjm12MHKnXoVWHx&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 502,
        "url": "https://drive.google.com/thumbnail?id=1n0BHzWp1OlZi4wroqZqPooisn5NDYz_U&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 2,
        "url": "https://drive.google.com/thumbnail?id=1aCTNlpj0rxyKdvJXGEex2VZm0fJxAqHC&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 346,
        "url": "https://drive.google.com/thumbnail?id=1oUcbKWZJOxXJZcyM5ef9IvjnsiFRsnE4&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 57,
        "url": "https://drive.google.com/thumbnail?id=1shaC8Wbmui8KVJvdNN8nr6dPaXYcRn6B&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 323,
        "url": "https://drive.google.com/thumbnail?id=1pkWknoELzZ1nC15fMBZTjyov2q56WkAp&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 108,
        "url": "https://drive.google.com/thumbnail?id=1LPHfzfDkuhFsLdR0elf7noronB10c23E&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 347,
        "url": "https://drive.google.com/thumbnail?id=1mPLrNUMY-ounSOyf1F_lXmt_dJpoXeKR&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 309,
        "url": "https://drive.google.com/thumbnail?id=1a17kRvT9eJvhV3Q4Sh04CSTVTWxXgoQ_&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 135,
        "url": "https://drive.google.com/thumbnail?id=1-IIPgeFyIKmkzFNHnEbiGYa953watls-&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 514,
        "url": "https://drive.google.com/thumbnail?id=1XJAG-KOEusdEdDrZ33Q8Az7_8Cbsf5Qc&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 542,
        "url": "https://drive.google.com/thumbnail?id=1XROWiKnalE0Fga4kMeyfC5IenQC6w7QY&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "imageNum": 565,
        "url": "https://drive.google.com/thumbnail?id=1guxboy2tD1rQ1WX4DFDHT_-mZ3vOEAhn&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 24,
        "url": "https://drive.google.com/thumbnail?id=1NSX0bL_Tm1j4LpB4B1mBdRq5pppBgkeH&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 82,
        "url": "https://drive.google.com/thumbnail?id=15XEg0U2p6EBWBJZF2wkZb6cwiUsfkOnn&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 30,
        "url": "https://drive.google.com/thumbnail?id=124EoWNgES0EnGFHMA_msF6kW2wP-7C-h&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 131,
        "url": "https://drive.google.com/thumbnail?id=1w5_TGxICuYdWIO056_Ecvw1YNpVl1NLB&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "imageNum": 19,
        "url": "https://drive.google.com/thumbnail?id=15BTInry-j7yxE_Feda39gYwXchI4NTAE&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 560,
        "url": "https://drive.google.com/thumbnail?id=1ViX6oFHuzlsOtXexeXAJTMxQQxkLY08I&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 150,
        "url": "https://drive.google.com/thumbnail?id=1YaKL-Mzf0vBLyYiDP04l-okqh_35CMeq&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 48,
        "url": "https://drive.google.com/thumbnail?id=1z1EVfiFVXLLHQYMcpz7_8aW8O3EjhH41&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "imageNum": 558,
        "url": "https://drive.google.com/thumbnail?id=1aCiYocKSLIFyUW4avITk1wDzTTn98XYW&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 3,
        "imageNum": 365,
        "url": "https://drive.google.com/thumbnail?id=1SxrRXUMUnnEK_yP2jAyis5cdWFOb29p6&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 55,
        "url": "https://drive.google.com/thumbnail?id=14RFO-0XsENyVxg9RyEGuTMY454sEKyU2&sz=w595",
        "middleK": "2.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 548,
        "url": "https://drive.google.com/thumbnail?id=142-zSIdz_1f8fY9Dm21IMwKVk-us6iMH&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 340,
        "url": "https://drive.google.com/thumbnail?id=1tLuEKQBuksy-HZ61jymHSEfzl-DLVEkw&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 355,
        "url": "https://drive.google.com/thumbnail?id=19yhALl5n0RcL5qyP8GvJlSiN_2pexgjj&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 2,
        "imageNum": 345,
        "url": "https://drive.google.com/thumbnail?id=1Bnp4xWypMCCMY0-kDRZt1M-JzRkx0E89&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 140,
        "url": "https://drive.google.com/thumbnail?id=1ltspzuLLmojzOCbJanaLHPt46vomO3U4&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "imageNum": 80,
        "url": "https://drive.google.com/thumbnail?id=1dvo9SjsVd6ca6a5jVc0TrP6tO2k9Z6hp&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 343,
        "url": "https://drive.google.com/thumbnail?id=1ITKsmCL5rA3VYTxKriRa_73m3mbuLYkZ&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 104,
        "url": "https://drive.google.com/thumbnail?id=1lZ4ny-mRxtXa3pMYKgFwJnVvazeTRk9y&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 2,
        "5": 3,
        "imageNum": 69,
        "url": "https://drive.google.com/thumbnail?id=1nXun6asDv5AqG4Xv6GZigc3UrNSBx8Oj&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 103,
        "url": "https://drive.google.com/thumbnail?id=1Q2z_DcwWBebMolo9PNUA7OGLOfElErv8&sz=w595",
        "middleK": "2.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 84,
        "url": "https://drive.google.com/thumbnail?id=1zskomwb5u5QOBH9NrlS6evmSXWnIDNDm&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "imageNum": 550,
        "url": "https://drive.google.com/thumbnail?id=1oaZX3kaX6x-WufuAsO1uFq3Ix-be1VTs&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 2,
        "imageNum": 99,
        "url": "https://drive.google.com/thumbnail?id=1ZLUETYMCfxordcPKgoaYlrlCwqCnV9Wv&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 37,
        "url": "https://drive.google.com/thumbnail?id=1jI7qqZGyx-BvMWvzz9rDcPDReuyWOfSM&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 335,
        "url": "https://drive.google.com/thumbnail?id=1Czm-sscmltVZHaD-ROjHi8VzYL78F4Ce&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 88,
        "url": "https://drive.google.com/thumbnail?id=1YBVnA1BmhelfoPbcumDv3WrRVlep_hZS&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 369,
        "url": "https://drive.google.com/thumbnail?id=1kNXQiKUu3zeEC-H7dPwhIcM3wCoAouKN&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 120,
        "url": "https://drive.google.com/thumbnail?id=1OMZpkkK2OnE2U4pF96NU7zfCHRRQhdfl&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 563,
        "url": "https://drive.google.com/thumbnail?id=1QgvSZh1OCoEpxCfnyUUXUjvyesUkfmqw&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 501,
        "url": "https://drive.google.com/thumbnail?id=1VXl2vWuFI9ox-njP6oyBaIKxpGua4W3L&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 98,
        "url": "https://drive.google.com/thumbnail?id=1wcsV1PN4LDaX1va3xCKnRS79Kz8ytlrX&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 301,
        "url": "https://drive.google.com/thumbnail?id=1rBY8ZbtqM5HTEJcVcV5LbNBwIRSGdY1v&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 503,
        "url": "https://drive.google.com/thumbnail?id=15WRQbtrA5uHOcOOgqOx4JsShUbtoljxG&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 341,
        "url": "https://drive.google.com/thumbnail?id=1fFwrBXdAX7rWJXkSVS1kFhFCTSJzy4sH&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 2,
        "5": 1,
        "imageNum": 322,
        "url": "https://drive.google.com/thumbnail?id=1sc13B_0CXPMp2RaE4NFE5vZ65fnvO1tJ&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 362,
        "url": "https://drive.google.com/thumbnail?id=1YDl_y43R0NmH3TuKbk4IhYoi36ymha6I&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 1,
        "imageNum": 22,
        "url": "https://drive.google.com/thumbnail?id=13uwXEuYR4ZGwNHkBvGcTxgvBPrEVESek&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 508,
        "url": "https://drive.google.com/thumbnail?id=1E1f8sF2ogdndmAJsVyWbKMmF0W2vvDmq&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 1,
        "imageNum": 132,
        "url": "https://drive.google.com/thumbnail?id=1e5DjvDFZDBaZNmLZfrYQb1SL8uemD3zV&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 511,
        "url": "https://drive.google.com/thumbnail?id=18uRNcL3xanQX9klQiOkCDuVPapemlEON&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 359,
        "url": "https://drive.google.com/thumbnail?id=1P8W9yoa33qLcy_LOEWobBgfiN5ewHXF9&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "imageNum": 321,
        "url": "https://drive.google.com/thumbnail?id=1RrhP8mbp_2jspTADA9n5UsYaSbwRZwjS&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 532,
        "url": "https://drive.google.com/thumbnail?id=1ynmHx02VSIej5QK2k6k2Qi3EwCIXNxr_&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 60,
        "url": "https://drive.google.com/thumbnail?id=1Uv-PIKc6sjKhOFa3MtqRonaBx9LQMm5t&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "imageNum": 513,
        "url": "https://drive.google.com/thumbnail?id=19XzVReQij_YthHiysr1wKtQPLOwe9PQF&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "imageNum": 89,
        "url": "https://drive.google.com/thumbnail?id=1XDhuBHY6m43agHb8CuvtarmS2XHpPRYu&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 303,
        "url": "https://drive.google.com/thumbnail?id=1SBlkRQKQXyXUxEYmBRTx1HE85wc9Zq30&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 305,
        "url": "https://drive.google.com/thumbnail?id=138chsFhZaOvEhZGmmMcGHJyH65uR6ar-&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "imageNum": 535,
        "url": "https://drive.google.com/thumbnail?id=17MBOGmXhHC4_wOeBgAWJ72Ef3k6wGQyd&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 2,
        "imageNum": 25,
        "url": "https://drive.google.com/thumbnail?id=10aDWXp3FBX6eR0W5f2mBueK46tVz_QVZ&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "imageNum": 373,
        "url": "https://drive.google.com/thumbnail?id=1RGf9iPVpyCIs1bUBomognyDqJnMgmpFl&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "imageNum": 85,
        "url": "https://drive.google.com/thumbnail?id=1KW0vM86tlP3uLwVEimJdnaBDWtK1VnuC&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 538,
        "url": "https://drive.google.com/thumbnail?id=1OuEY0S-icNkekqKhpZKRVEmIOlGeXjwA&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 370,
        "url": "https://drive.google.com/thumbnail?id=1CqxBlOJ3auleoLdHN-9O_6waKD8ZdyFl&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 141,
        "url": "https://drive.google.com/thumbnail?id=1a6fXON6vR_Rgbe2cif_-g7fdKFkxYxZy&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "imageNum": 311,
        "url": "https://drive.google.com/thumbnail?id=1ncMQn7dW2IhBwMfAXd9MLPl04erpR39Z&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 330,
        "url": "https://drive.google.com/thumbnail?id=1ESvm9HX7qYHE7UCRNPdsWO41EgyTJg6U&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "imageNum": 1,
        "url": "https://drive.google.com/thumbnail?id=1Wmw-vKmetbOS9iq5lOYwP2izwXS3_pp4&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 3,
        "imageNum": 364,
        "url": "https://drive.google.com/thumbnail?id=1zc4PX8GE07k5pv52nUUDg5gMv8aGHYYy&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 506,
        "url": "https://drive.google.com/thumbnail?id=1YRD7caBCY8gB6-yFPbUdMvY-l8RerOAv&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 540,
        "url": "https://drive.google.com/thumbnail?id=1hl7CBTmhtGn9UNZwze1672ssfrGhIRKd&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 1,
        "imageNum": 97,
        "url": "https://drive.google.com/thumbnail?id=1cJp-LKQv1eoc3K-vhCt7wEWcnOXCgWBF&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 1,
        "imageNum": 567,
        "url": "https://drive.google.com/thumbnail?id=1jkWUucx_gahQrCGglh3zOlS2TfIKDyQm&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 91,
        "url": "https://drive.google.com/thumbnail?id=16N7eLS0QgiAmb4u5ZzIoRdH1p1RfT6G5&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 575,
        "url": "https://drive.google.com/thumbnail?id=1En5nVHDB3AxZXpNgKEFawP8qwHC4s0gL&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "imageNum": 555,
        "url": "https://drive.google.com/thumbnail?id=1wqiHS3iY7DbABaQq_-W37SBEFubOBCKx&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "imageNum": 510,
        "url": "https://drive.google.com/thumbnail?id=1xfbM8UZr0-TGffr_wDTGV_e9OfFi9Foc&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 314,
        "url": "https://drive.google.com/thumbnail?id=1z1HgrqMSvymy4JaWTrtXPwit45HlIInr&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "imageNum": 29,
        "url": "https://drive.google.com/thumbnail?id=1Atou7bH3PZIv6j59l8IVJXf4sbvGKmws&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 1,
        "imageNum": 574,
        "url": "https://drive.google.com/thumbnail?id=1xt1StYC19J0nc2_Xw-u21BcQe2EBb0CX&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 525,
        "url": "https://drive.google.com/thumbnail?id=1ENHTvg9YkmlHaLk4Y1p-J0UtcC-ATiVQ&sz=w595",
        "middleK": "2.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 543,
        "url": "https://drive.google.com/thumbnail?id=15v5D-cUjnBLeg_vCFJlEwMg-V9EGYcAT&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 86,
        "url": "https://drive.google.com/thumbnail?id=1KRAS59HFdg-ZjwjiOPdDwKb9AGw-hTBo&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 318,
        "url": "https://drive.google.com/thumbnail?id=1jYkKGXI8KDSjBaNgWRubtIK0v7Wi1vy8&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 2,
        "3": 0,
        "4": 2,
        "5": 0,
        "imageNum": 372,
        "url": "https://drive.google.com/thumbnail?id=14spW9DmHkZI_nVIoF82fGBWO7JT5ZYm_&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 145,
        "url": "https://drive.google.com/thumbnail?id=1Huf-SuFPiSWDTTcmbIHEzjzw7B1WjvFi&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 0,
        "imageNum": 52,
        "url": "https://drive.google.com/thumbnail?id=1fTkjWpm_1pjEjs2T7r-T6ZGvVzpOnBj5&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "imageNum": 332,
        "url": "https://drive.google.com/thumbnail?id=1OdvjNHeb7G-TnaookORtmgLi5gxGdbTg&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 114,
        "url": "https://drive.google.com/thumbnail?id=1BCf3ZAfiwN0yF-oh2-95L0L9JWGSAz_r&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 14,
        "url": "https://drive.google.com/thumbnail?id=1Cg3GQNz4hUroQiu1NjwzvYRTc-Nyk4W5&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 371,
        "url": "https://drive.google.com/thumbnail?id=1zdyYPkMEVk1zsgJlApH9mQDeArp_pbcU&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 50,
        "url": "https://drive.google.com/thumbnail?id=1BdRlIwwz9299YbowfrYztey9uso5Bx7Y&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 95,
        "url": "https://drive.google.com/thumbnail?id=1u9ri_-ZKdJumag7NoLTjk293RRzN1Y0W&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "imageNum": 126,
        "url": "https://drive.google.com/thumbnail?id=12TfoX7IWV1E3C2DpT81WC9bR_OWlbqV8&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 562,
        "url": "https://drive.google.com/thumbnail?id=1jNItQDh6bymXbk253qaZtUi_MDAsAlVu&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "imageNum": 360,
        "url": "https://drive.google.com/thumbnail?id=1Wue1JemrXljmvLk90ep7Ap-OycCnc0fE&sz=w595",
        "middleK": "0.000"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "imageNum": 561,
        "url": "https://drive.google.com/thumbnail?id=18Zsf4ixeqDwlH0sQgYTJZkxMps-ZGyjn&sz=w595",
        "middleK": "2.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 90,
        "url": "https://drive.google.com/thumbnail?id=1YspWHHgRn814ONqMMBZX123YvnF_-AVC&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 1,
        "imageNum": 21,
        "url": "https://drive.google.com/thumbnail?id=170GRMuJNfDlngEle5dotIXsFqObnYSzK&sz=w595",
        "middleK": "1.400"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "imageNum": 568,
        "url": "https://drive.google.com/thumbnail?id=1JycLsy3F7blw5XQUOAdGWRrbyXf9M-IL&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "imageNum": 519,
        "url": "https://drive.google.com/thumbnail?id=1JFQBGS_ZPslhzDWCn-DJJaDZMsZH8qZQ&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "imageNum": 33,
        "url": "https://drive.google.com/thumbnail?id=1M5IEDoITCpRYrOMlWNF0TX_qTULXOES5&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "imageNum": 119,
        "url": "https://drive.google.com/thumbnail?id=1vsMXRZPPeBJQyF9f2N6WBsoHSs69eGBN&sz=w595",
        "middleK": "0.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 306,
        "url": "https://drive.google.com/thumbnail?id=1S6OyZS37piE7jTMstyYxAxDkHYivWBij&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 43,
        "url": "https://drive.google.com/thumbnail?id=1QHP5siQdRDprCdmII3ZXORAJ9etAtQra&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 337,
        "url": "https://drive.google.com/thumbnail?id=1dwOF6X-Z6NzFEt81lp69ZPQPYcyI_uw3&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "imageNum": 307,
        "url": "https://drive.google.com/thumbnail?id=1GwRrmV2rqBXemlKF3Plk_f_EbmnHpabz&sz=w595",
        "middleK": "1.600"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "imageNum": 122,
        "url": "https://drive.google.com/thumbnail?id=1044NwkMJnmBaTasBq4oIwSQUKLImnGF4&sz=w595",
        "middleK": "1.800"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 3,
        "imageNum": 537,
        "url": "https://drive.google.com/thumbnail?id=1yYOt5c6Wo0JO1_5N0ooNuoEyk5fsxFkp&sz=w595",
        "middleK": "0.800"
    },
    {
        "1": 0,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 2,
        "imageNum": 56,
        "url": "https://drive.google.com/thumbnail?id=19SarjNYEh9a0yzV2uBNA2PKF2-trVN1F&sz=w595",
        "middleK": "1.000"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "imageNum": 143,
        "url": "https://drive.google.com/thumbnail?id=1NsqqBT8ySsFmujFZS77GrLvUpVTfZvcF&sz=w595",
        "middleK": "1.200"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "imageNum": 11,
        "url": "https://drive.google.com/thumbnail?id=1yQIz47q2bMc9lu64MfXnRhOsJbHs3fvX&sz=w595",
        "middleK": "1.400"
    }
]

const result2 = [
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 1,
        "imageNum": 549,
        "url": "https://drive.google.com/thumbnail?id=1A9PQLZbESxXMYVm8UeE79OzRXtnzhIOR&sz=w595",
        "middleK": "0.429",
        "author": "Дарья Недачина"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 2,
        "7": 3,
        "imageNum": 9,
        "url": "https://drive.google.com/thumbnail?id=15Ob6zrsYkjIWiut-Ni48U1DTxCTsxkY0&sz=w595",
        "middleK": "1.286",
        "author": "Jack Fu"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 46,
        "url": "https://drive.google.com/thumbnail?id=1uniOKxSPWjJMer0mJFWoCTnDnwNX5xYQ&sz=w595",
        "middleK": "0.429",
        "author": "Masoud Saffari"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 0,
        "imageNum": 147,
        "url": "https://drive.google.com/thumbnail?id=1B5bq1p3FUK5hRyVfYBVw2kjVk5yOEnZ4&sz=w595",
        "middleK": "1.571",
        "author": "Антон Шлёнкин"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 1,
        "imageNum": 544,
        "url": "https://drive.google.com/thumbnail?id=1VKhzuM1V_0RdGcSUUTdtSn97ufHtiQxS&sz=w595",
        "middleK": "1.714",
        "author": "Luis Antonio Rivera Rodriguez"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 146,
        "url": "https://drive.google.com/thumbnail?id=1yF3E5ZxQPuaJxbe4rCDnWzqCilBtKd7E&sz=w595",
        "middleK": "1.714",
        "author": "Антон Шлёнкин"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 130,
        "url": "https://drive.google.com/thumbnail?id=1ZIGVTAeSWGIzvZXpdF6eD_-6wVkp7M1f&sz=w595",
        "middleK": "0.286",
        "author": "YI AN LIU"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 109,
        "url": "https://drive.google.com/thumbnail?id=IegtXLXy_UxzlE3arxsesZjkwIOnn5SB &sz=w595",
        "middleK": "1.571",
        "author": "Артем Кривченков"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 17,
        "url": "https://drive.google.com/thumbnail?id=1-vlk7I9Leok4qOP-LAQAC7LXE7KL0wxY&sz=w595",
        "middleK": "1.429",
        "author": "SHEN ZEWEN"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 4,
        "url": "https://drive.google.com/thumbnail?id=1Ssdfkus_7cqxmujkLiySTEgKZY6NdNiA&sz=w595",
        "middleK": "2.286",
        "author": "Yibiao Qin"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 125,
        "url": "https://drive.google.com/thumbnail?id=1pYZNiYkxjf6f0zm9O6jN7-7b33uh8uPX&sz=w595",
        "middleK": "1.286",
        "author": "Kye-soo Myung"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 338,
        "url": "https://drive.google.com/thumbnail?id=1UzVXqA1cRz4vWvEkgtOrip9Phavka5UI&sz=w595",
        "middleK": "1.857",
        "author": "Алиса Зимина"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 0,
        "imageNum": 128,
        "url": "https://drive.google.com/thumbnail?id=1iK1YLw17ZZP0N6kl0q_RjlWMf-8jGfrh&sz=w595",
        "middleK": "0.714",
        "author": "Goyen Chen"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 151,
        "url": "https://drive.google.com/thumbnail?id=1NLBMp0Fng93Fh3Gphm9uaCbi_Dua0NOC&sz=w595",
        "middleK": "1.714",
        "author": "Катя Слободская"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 107,
        "url": "https://drive.google.com/thumbnail?id=1dNphi8YkN9tc__1FjLvYBjS_MlmLohyZ&sz=w595",
        "middleK": "1.571",
        "author": "Маргарита Крухтанова"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 531,
        "url": "https://drive.google.com/thumbnail?id=1xsLmDocOvDMi54ZpI44QeQW_82sbQJVc&sz=w595",
        "middleK": "1.571",
        "author": "zhaoxin"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 2,
        "6": 1,
        "7": 0,
        "imageNum": 578,
        "url": "https://drive.google.com/thumbnail?id=15Ne7yVq91TlGenCKbpxsY2ZimWb9CGG4&sz=w595",
        "middleK": "0.571",
        "author": "Jumping He"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 77,
        "url": "https://drive.google.com/thumbnail?id=1zwqvkHgGBsnfxAhN6EgcXNyI53a-v5tS&sz=w595",
        "middleK": "0.429",
        "author": "Екатерина Березовская"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 18,
        "url": "https://drive.google.com/thumbnail?id=1QBJrjf2EvKYhgP7FR3KVRh54km4QBgUD&sz=w595",
        "middleK": "2.143",
        "author": "XU Kai"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 61,
        "url": "https://drive.google.com/thumbnail?id=15fq1ILPeSvooAihJtQOweY5qvWpM6Fy7&sz=w595",
        "middleK": "0.857",
        "author": "Владимир Перекрестов"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 1,
        "imageNum": 539,
        "url": "https://drive.google.com/thumbnail?id=1GDJ2d2NDVN94TxG97cC_XBVa336cWZ-t&sz=w595",
        "middleK": "1.000",
        "author": "Akram Mokhber"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 348,
        "url": "https://drive.google.com/thumbnail?id=1fN0b0WUVcce9lusEVAQ4uslElmR0V0pz&sz=w595",
        "middleK": "2.143",
        "author": "Зотова Наташа"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "6": 2,
        "7": 0,
        "imageNum": 40,
        "url": "https://drive.google.com/thumbnail?id=1Ww_o_AtRq2x2X0WSoq8R5dEfQRuQVvT3&sz=w595",
        "middleK": "1.429",
        "author": "AK Bill"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 44,
        "url": "https://drive.google.com/thumbnail?id=1j9OxQ72VUJ2MmhH752QRCdPmo-jXbEKW&sz=w595",
        "middleK": "2.000",
        "author": "Emran Abtahi"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 354,
        "url": "https://drive.google.com/thumbnail?id=1YcVeopkz2KOZtlV-0DygVMPG2lyVJQD6&sz=w595",
        "middleK": "1.571",
        "author": "Артем Кривченков"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 1,
        "imageNum": 16,
        "url": "https://drive.google.com/thumbnail?id=1uV9pvGQ7afElqcF1hvx626yPcaVlDILR&sz=w595",
        "middleK": "1.429",
        "author": "ZHUO LI"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 0,
        "7": 1,
        "imageNum": 320,
        "url": "https://drive.google.com/thumbnail?id=1cHTczGWk5ZGYdX-7Q4t3nx-uKnq-TRga&sz=w595",
        "middleK": "1.429",
        "author": "Зырянова Александра"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 0,
        "7": 0,
        "imageNum": 94,
        "url": "https://drive.google.com/thumbnail?id=1MU0oXU9Ov4V0IQcgGUHLSLCTWZ-vWKAG&sz=w595",
        "middleK": "1.000",
        "author": "Мария Синькова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 112,
        "url": "https://drive.google.com/thumbnail?id=1PZZcrVCUaOwz8o_bFrLVM5SkKUztb_rZ&sz=w595",
        "middleK": "1.714",
        "author": "Варвара Халилюлина"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 517,
        "url": "https://drive.google.com/thumbnail?id=1KukR-s5JeAblLrLXJuMNGBYKFIPyAC0m&sz=w595",
        "middleK": "1.714",
        "author": "Chen Jie"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 0,
        "imageNum": 42,
        "url": "https://drive.google.com/thumbnail?id=1Bas5ycu84-Mk9ls9aMOjUKhIHPd-5eZJ&sz=w595",
        "middleK": "0.857",
        "author": "Hossein Abdi"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 547,
        "url": "https://drive.google.com/thumbnail?id=1keGQ0mxWsZXY6zDZZ_13w-07GUx1c0LU&sz=w595",
        "middleK": "1.429",
        "author": "Зырянова Александра"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 53,
        "url": "https://drive.google.com/thumbnail?id=1ls6A3wpuVKbI3pdx-Ndut7UFa_KszuKO&sz=w595",
        "middleK": "2.143",
        "author": "Luis Antonio Rivera Rodriguez"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 515,
        "url": "https://drive.google.com/thumbnail?id=1vbWvW_v_6GWoeB62QIf2xl7PciPkyV_R&sz=w595",
        "middleK": "1.571",
        "author": "Zhang He"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 0,
        "imageNum": 127,
        "url": "https://drive.google.com/thumbnail?id=1NRWSTEHMjHf53LxWwRRMmq9VqqCh6Prb&sz=w595",
        "middleK": "1.857",
        "author": "Chang, Fang-Pang"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 520,
        "url": "https://drive.google.com/thumbnail?id=1Ed2w7JSEkhrDmWNJ7kWcmBEb4oZL1JmL&sz=w595",
        "middleK": "1.857",
        "author": "Wenjie Huo"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 577,
        "url": "https://drive.google.com/thumbnail?id=1-G65a9B32SdnCaDgoqo3bIvxMKWkPNYq&sz=w595",
        "middleK": "1.714",
        "author": "Jumping He"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "6": 2,
        "7": 3,
        "imageNum": 27,
        "url": "https://drive.google.com/thumbnail?id=1bkWd0xd35NcuuQjXMl5yfnZoihHZ9BZz&sz=w595",
        "middleK": "1.571",
        "author": "Wenjie Huo"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 374,
        "url": "https://drive.google.com/thumbnail?id=1vJZFSvPuYTLOQjOpOEMWGf1UBKuN3fuk&sz=w595",
        "middleK": "1.286",
        "author": "Cardona"
    },
    {
        "1": 0,
        "2": 2,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 366,
        "url": "https://drive.google.com/thumbnail?id=1F9O5le9xLC5CsgOU2bWBCPfF8PndmPLb&sz=w595",
        "middleK": "2.000",
        "author": "Dmitry Mirilenko"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 358,
        "url": "https://drive.google.com/thumbnail?id=18c0gq_5W_K-12a7qFh58CZ670I_T28Mr&sz=w595",
        "middleK": "1.000",
        "author": "Женя Щербакова"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 41,
        "url": "https://drive.google.com/thumbnail?id=1EdxQg0IvtOMJS0FskLwCdWN3q_xaWEzD&sz=w595",
        "middleK": "1.571",
        "author": "Kata Kaldor"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 0,
        "imageNum": 63,
        "url": "https://drive.google.com/thumbnail?id=1FVKQSdoioDcTXSntrAy_ouOov1Uszwqq&sz=w595",
        "middleK": "1.286",
        "author": "Мария Темченко"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 93,
        "url": "https://drive.google.com/thumbnail?id=1siRVxV1TG2xIGYNQXCrAKpw365qyoRXR&sz=w595",
        "middleK": "0.857",
        "author": "Мария Синькова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 3,
        "7": 3,
        "imageNum": 137,
        "url": "https://drive.google.com/thumbnail?id=1ShPaPnRppywB7rs6jWxjJJ9acIq-p1wG&sz=w595",
        "middleK": "2.143",
        "author": "Eduardo Davit"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 524,
        "url": "https://drive.google.com/thumbnail?id=1SMtem3wmqGysPBoFG5w3gFEro9zvAmEY&sz=w595",
        "middleK": "1.857",
        "author": "SHUYING HUANG"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 81,
        "url": "https://drive.google.com/thumbnail?id=1wAFAp6E0fUT5a7vGJteamLvlZk5nvmJP&sz=w595",
        "middleK": "1.857",
        "author": "Анастасия Бардакова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 361,
        "url": "https://drive.google.com/thumbnail?id=1Urr7NTvBb2DjP2ZfEr6ZelTSMwEUC1lL&sz=w595",
        "middleK": "0.857",
        "author": "Алена Демченко"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 67,
        "url": "https://drive.google.com/thumbnail?id=1nXbBmBQDHRI4ePRazX1hxosYqhoXG28v&sz=w595",
        "middleK": "1.714",
        "author": "Екатерина Крючкова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 0,
        "imageNum": 83,
        "url": "https://drive.google.com/thumbnail?id=1x1gweSzuB6SidZEBDwPx5fDJSPkjAsjA&sz=w595",
        "middleK": "1.429",
        "author": "Алиса Чернова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 75,
        "url": "https://drive.google.com/thumbnail?id=1YuBzCLrELRprk8neUVXU5ui1IbXhTAOI&sz=w595",
        "middleK": "1.286",
        "author": "Екатерина Березовская"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 72,
        "url": "https://drive.google.com/thumbnail?id=1ErDToQyJ7GnhtliUDTdJZ_vU4WBeGLca&sz=w595",
        "middleK": "1.571",
        "author": "Сёмкина Дарья"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 312,
        "url": "https://drive.google.com/thumbnail?id=1YTkEhBlPGKTUmyYNPfDLaLEbBByYbuSq&sz=w595",
        "middleK": "1.286",
        "author": "fei Cheng"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 111,
        "url": "https://drive.google.com/thumbnail?id=1iCiD47ACHI-3yBQ49kniEoKxL-ziHa5_&sz=w595",
        "middleK": "2.429",
        "author": "Артем Кривченков"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 66,
        "url": "https://drive.google.com/thumbnail?id=1kkNg0GwybgI7Md_8MsK53HoyGRz-zHDW&sz=w595",
        "middleK": "1.286",
        "author": "Михаил Ситников"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 1,
        "imageNum": 20,
        "url": "https://drive.google.com/thumbnail?id=1Ksqg3C-DO9DgMF7_OAF8vcjuWTGLHbGL&sz=w595",
        "middleK": "1.429",
        "author": "JiaNing Song"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 1,
        "6": 2,
        "7": 3,
        "imageNum": 142,
        "url": "https://drive.google.com/thumbnail?id=1o3ZTw6oGmYbrUcm0gsODY5iPUryhz22T&sz=w595",
        "middleK": "1.857",
        "author": "Бельчикова Марта"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 1,
        "imageNum": 15,
        "url": "https://drive.google.com/thumbnail?id=1qZf9NPh58eRtHuHVtSgVwFVIZoFMaMuN&sz=w595",
        "middleK": "0.571",
        "author": "Chuang Qiao"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 74,
        "url": "https://drive.google.com/thumbnail?id=1twolYjFR4MbwI9JSO9eJlEnUrCZ0HcxV&sz=w595",
        "middleK": "1.286",
        "author": "Максим Вавенков"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 368,
        "url": "https://drive.google.com/thumbnail?id=1Cix-b8ZmHpelSGG6imvjvEXJnacV_t3k&sz=w595",
        "middleK": "1.286",
        "author": "SHAO-WEI CHUANG"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 527,
        "url": "https://drive.google.com/thumbnail?id=1OSPQ2eDv8yVAzKPLWhYWJqSnvgSV5IVK&sz=w595",
        "middleK": "2.143",
        "author": "SHUYING HUANG"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "6": 2,
        "7": 2,
        "imageNum": 28,
        "url": "https://drive.google.com/thumbnail?id=1IhiChI8CWvtojvWFlEuO4dJWCTvdoPH-&sz=w595",
        "middleK": "1.143",
        "author": "Yongqi Chou"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 78,
        "url": "https://drive.google.com/thumbnail?id=1qLg2qy-vWNLObQyswEaWLbRHL4jBmsCp&sz=w595",
        "middleK": "1.857",
        "author": "Виктория Волкова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 518,
        "url": "https://drive.google.com/thumbnail?id=1nq2CsAQ059R2_wu47MATvMxgz27Qj_Xd&sz=w595",
        "middleK": "1.857",
        "author": "Chen Jie"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 76,
        "url": "https://drive.google.com/thumbnail?id=1q0mGmspapCwWsFcuWewpXrTA9bAxiOF7&sz=w595",
        "middleK": "0.429",
        "author": "Екатерина Березовская"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 2,
        "imageNum": 96,
        "url": "https://drive.google.com/thumbnail?id=1wAca646gQWlPgaV32nUOcLOWwAP_dMrH&sz=w595",
        "middleK": "1.571",
        "author": "Зотова Наташа"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 73,
        "url": "https://drive.google.com/thumbnail?id=14gRV3z_ysIObuYqmUk863eQBLNJn2vBV&sz=w595",
        "middleK": "1.429",
        "author": "Дарья Недачина"
    },
    {
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 5,
        "url": "https://drive.google.com/thumbnail?id=11gj31Tl6cmeomndI3liIlg7KiSGMUBcy&sz=w595",
        "middleK": "1.286",
        "author": "Yibiao Qin"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 115,
        "url": "https://drive.google.com/thumbnail?id=18nq8THB92KFHlEW61VDljtCXYy9pO6mS&sz=w595",
        "middleK": "1.857",
        "author": "Женя Щербакова"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 1,
        "6": 0,
        "7": 2,
        "imageNum": 47,
        "url": "https://drive.google.com/thumbnail?id=1Nd90g9oNamp0CCzHP4R1Oc-dBZeaLvgR&sz=w595",
        "middleK": "1.000",
        "author": "Akram Mokhber"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 136,
        "url": "https://drive.google.com/thumbnail?id=1gpX454mFD8gb0hEsWzpHW44yoNxeRIxH&sz=w595",
        "middleK": "1.429",
        "author": "Eduardo Davit"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 349,
        "url": "https://drive.google.com/thumbnail?id=1qUA8xpf8JCj7-PZOgnZS38iyi0ehs2o-&sz=w595",
        "middleK": "1.000",
        "author": "Валерия Молянова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 507,
        "url": "https://drive.google.com/thumbnail?id=1sbCmJaN98HZ5U4_JRXj7X9zgi-oc7vPJ&sz=w595",
        "middleK": "1.571",
        "author": "QiHe"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 350,
        "url": "https://drive.google.com/thumbnail?id=1skXwPMTFQfVOyG_qI0c2EEX-dWR3NJuC&sz=w595",
        "middleK": "2.000",
        "author": "Константин Семененко"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 68,
        "url": "https://drive.google.com/thumbnail?id=1734zk4XL5TjgaKJlr6J1doqimZiMopMb&sz=w595",
        "middleK": "1.714",
        "author": "Таисия Голомазова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 71,
        "url": "https://drive.google.com/thumbnail?id=1--xNCJTURfB1BawwYzztsAG7v4K-5xf-&sz=w595",
        "middleK": "1.714",
        "author": "Шевцова Полина"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 325,
        "url": "https://drive.google.com/thumbnail?id=1O5iCX2zuHIYtuYadkzDKqwlHz0Pt2uaa&sz=w595",
        "middleK": "2.429",
        "author": "Якушина Юлия"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 87,
        "url": "https://drive.google.com/thumbnail?id=10PCfXPyfXmd23Q3DmaMYddWCPSYMB6D5&sz=w595",
        "middleK": "2.429",
        "author": "Михаил Злобин"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 2,
        "imageNum": 35,
        "url": "https://drive.google.com/thumbnail?id=1Dh1qNhuIqWhYYNqNkivupkN-yDfc9lAh&sz=w595",
        "middleK": "1.429",
        "author": "zhaoxin"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 0,
        "7": 1,
        "imageNum": 546,
        "url": "https://drive.google.com/thumbnail?id=1QssVBoU55SOyrqYiTkire1-LWv-jXScw&sz=w595",
        "middleK": "1.000",
        "author": "Зырянова Александра"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 23,
        "url": "https://drive.google.com/thumbnail?id=1N5QBFpFmvoDKcNogz9OMuvjl4szXNrdE&sz=w595",
        "middleK": "2.000",
        "author": "Xian Liyun"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 3,
        "url": "https://drive.google.com/thumbnail?id=13bs06H83ASnZoDhlHmZU_KiKx_TNuTrW&sz=w595",
        "middleK": "1.429",
        "author": "QIANG GANG"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 0,
        "7": 2,
        "imageNum": 62,
        "url": "https://drive.google.com/thumbnail?id=1JugJQBwIDiti3Wu8ENPBypOj2V7VgEsc&sz=w595",
        "middleK": "1.429",
        "author": "Алфёрова Анастасия"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 152,
        "url": "https://drive.google.com/thumbnail?id=1kFJW704zDBzA4Uu2Loejdnoyc8e1J945&sz=w595",
        "middleK": "2.429",
        "author": "Катя Слободская"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 326,
        "url": "https://drive.google.com/thumbnail?id=1sr2E7CpDStUGjXaOQGrXfOTZXDtj5Q4_&sz=w595",
        "middleK": "0.857",
        "author": "Дарья Козлова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 64,
        "url": "https://drive.google.com/thumbnail?id=1Jc7Ov5C6iCD_hzYoWlFEA5CcP-FGKsrH&sz=w595",
        "middleK": "0.857",
        "author": "Гуменная Ульяна"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "imageNum": 139,
        "url": "https://drive.google.com/thumbnail?id=1fFVH4krFx9mWqfBl90L_9-sv2ch57nqn&sz=w595",
        "middleK": "1.143",
        "author": "Li Zhang"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 100,
        "url": "https://drive.google.com/thumbnail?id=137T7UgbcW4UuSGsGHAnYlnYOrFiXLMWi&sz=w595",
        "middleK": "1.714",
        "author": "Ирина Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 552,
        "url": "https://drive.google.com/thumbnail?id=1dnSjp5ZO7DeqNBRWLagix3X-9UqD7qi4&sz=w595",
        "middleK": "1.286",
        "author": "Мария Синькова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 144,
        "url": "https://drive.google.com/thumbnail?id=1tFJgMDmky9d4cKj7h0sF-iYCRKaMlUof&sz=w595",
        "middleK": "2.429",
        "author": "Бельчикова Марта"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 1,
        "imageNum": 566,
        "url": "https://drive.google.com/thumbnail?id=1S55sHXH7hTwdJJTkRMVF-Jgtwll8esK4&sz=w595",
        "middleK": "1.286",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "6": 1,
        "7": 1,
        "imageNum": 12,
        "url": "https://drive.google.com/thumbnail?id=191M2rdL8FKbV1lghYjJJH6CgqAFXVomp&sz=w595",
        "middleK": "1.286",
        "author": "Fan Yu"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 3,
        "imageNum": 569,
        "url": "https://drive.google.com/thumbnail?id=1q7FdO0BP4VjGYpJ8IggfcO_5hnC2l9Fu&sz=w595",
        "middleK": "1.857",
        "author": "Chang, Fang-Pang"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 0,
        "7": 0,
        "imageNum": 105,
        "url": "https://drive.google.com/thumbnail?id=1IiL9rkKbtfZPpvPYQfU6SSofPEj2PwCg&sz=w595",
        "middleK": "1.286",
        "author": "Кристина Большакова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 134,
        "url": "https://drive.google.com/thumbnail?id=1KT60EV8w3dUwGhW3DhKaqxoIXlfn0klI&sz=w595",
        "middleK": "1.857",
        "author": "Resul AY"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 58,
        "url": "https://drive.google.com/thumbnail?id=1spn7mDMkZovYCR4CDCXFrEcr8M6SOYKB&sz=w595",
        "middleK": "1.571",
        "author": "Зырянова Александра"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 110,
        "url": "https://drive.google.com/thumbnail?id=1fQ8jjfWWDbwdg1BAnoqabNOH6yLJjC5e&sz=w595",
        "middleK": "1.286",
        "author": "Артем Кривченков"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 536,
        "url": "https://drive.google.com/thumbnail?id=15hko0qAQ0dbUcaQWh80JFj-vO8qWQ1yg&sz=w595",
        "middleK": "1.143",
        "author": "Mario Fuentes"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 526,
        "url": "https://drive.google.com/thumbnail?id=1KpVUbFRX_ebVAZWVXhRc84LV5p6DOCqX&sz=w595",
        "middleK": "2.429",
        "author": "SHUYING HUANG"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 1,
        "7": 2,
        "imageNum": 34,
        "url": "https://drive.google.com/thumbnail?id=1l5V9EJ3ZZQkczVSDjRKQceqEq7d1AQxe&sz=w595",
        "middleK": "1.714",
        "author": "zhaoxin"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 553,
        "url": "https://drive.google.com/thumbnail?id=1SqB4cmDzVrQ-_2SfP36eQQogVGihj5st&sz=w595",
        "middleK": "2.143",
        "author": "Никитина Анна"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 3,
        "imageNum": 557,
        "url": "https://drive.google.com/thumbnail?id=15NEzKMoOEwzoBvwbNGBHjlRhe8csRN9M&sz=w595",
        "middleK": "1.429",
        "author": "Арина Кириллова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 31,
        "url": "https://drive.google.com/thumbnail?id=1aElLUNIJNXVFmRnwRaShQnY61zBpSRHt&sz=w595",
        "middleK": "1.857",
        "author": "Xujie Lyu"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 339,
        "url": "https://drive.google.com/thumbnail?id=18qrtGMAQLqSlrQvvRPg3Fq2G1PKjxg5R&sz=w595",
        "middleK": "2.000",
        "author": "Зоя Беликова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 304,
        "url": "https://drive.google.com/thumbnail?id=1QemW3MiLkAx4hKyvSRqUWrvCtcXr_zI1&sz=w595",
        "middleK": "1.571",
        "author": "Yibiao Qin"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 70,
        "url": "https://drive.google.com/thumbnail?id=1DMA6ypRA4-yOcRu7If7hwX8_O9g5lj-Y&sz=w595",
        "middleK": "1.857",
        "author": "Динара Туйсина"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 541,
        "url": "https://drive.google.com/thumbnail?id=1bL4sb8A7yTvVe6KsLJg-uZbesBwnX4i5&sz=w595",
        "middleK": "1.571",
        "author": "Katsuya Kawahira"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 333,
        "url": "https://drive.google.com/thumbnail?id=1bbVZEq8YPQGB7xXdERfXJ7XgZhP-2CAc&sz=w595",
        "middleK": "1.714",
        "author": "Виктория Волкова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 1,
        "imageNum": 7,
        "url": "https://drive.google.com/thumbnail?id=1n2qo2NuTAx-Pm13XpFKFSE8souNbpJ-H&sz=w595",
        "middleK": "1.429",
        "author": "jianqiang qiu"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 0,
        "imageNum": 106,
        "url": "https://drive.google.com/thumbnail?id=1EtiXcUST0VdRGGL9o2NJ-Xi29oHUZIDL&sz=w595",
        "middleK": "1.857",
        "author": "Варвара Исаева"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 505,
        "url": "https://drive.google.com/thumbnail?id=1wxQRSB6Lx3dCRFWvo0-1va9EU0ute988&sz=w595",
        "middleK": "1.143",
        "author": "jianqiang qiu"
    },
    {
        "1": 3,
        "2": 2,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 117,
        "url": "https://drive.google.com/thumbnail?id=1wZaSBsItbQWnn8PNndHctZIpkr8ZKHzD&sz=w595",
        "middleK": "1.143",
        "author": "Устапасиди"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 512,
        "url": "https://drive.google.com/thumbnail?id=15RjM5iB_ZzqAtIM5gyFmIdTFzR0m02jW&sz=w595",
        "middleK": "0.714",
        "author": "Xian Liyun"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 336,
        "url": "https://drive.google.com/thumbnail?id=1T14pXI4IT1VMLDmResLZxl0C3csg70Dx&sz=w595",
        "middleK": "2.429",
        "author": "Владимир Егоров"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 331,
        "url": "https://drive.google.com/thumbnail?id=1IECOwm1EfCC20VIJjwwP6wDffUraWeDw&sz=w595",
        "middleK": "2.429",
        "author": "Полина Бушмакова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 353,
        "url": "https://drive.google.com/thumbnail?id=1bDoc8VP-E2SSmvZTWh6fqXJM-RHpOTOq&sz=w595",
        "middleK": "1.714",
        "author": "Анастасия Исакова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 523,
        "url": "https://drive.google.com/thumbnail?id=15LBv4BPO4gRQo6VbipRVgsElQI8KMx9x&sz=w595",
        "middleK": "1.857",
        "author": "SHUYING HUANG"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 316,
        "url": "https://drive.google.com/thumbnail?id=1gNw2IK7_W6eilQCvmnM7oRWsKzV3LBmy&sz=w595",
        "middleK": "1.286",
        "author": "saideh khorsandi"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 2,
        "imageNum": 554,
        "url": "https://drive.google.com/thumbnail?id=1RCtu4D_e84rxJzBwF_Tn0Mp1sPdfAbeS&sz=w595",
        "middleK": "1.571",
        "author": "Ирина Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 0,
        "imageNum": 148,
        "url": "https://drive.google.com/thumbnail?id=158NB1BRNuwY8ohu7B7MdjpFw1ZBkehUf&sz=w595",
        "middleK": "0.571",
        "author": "Татьяна Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "6": 0,
        "7": 2,
        "imageNum": 149,
        "url": "https://drive.google.com/thumbnail?id=1rJvTpPp-gPYVxVXoJriG3dty11kD6BkJ&sz=w595",
        "middleK": "0.571",
        "author": "Татьяна Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 521,
        "url": "https://drive.google.com/thumbnail?id=1YGfUPwqCBTXowwpiKP7u4NIcq8yj2rTK&sz=w595",
        "middleK": "1.143",
        "author": "Yongqi Chou"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 302,
        "url": "https://drive.google.com/thumbnail?id=1ODzqV5BlAWiF8OL1yIhI4FkvcKpA6e6R&sz=w595",
        "middleK": "2.286",
        "author": "Камила Акназарова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 534,
        "url": "https://drive.google.com/thumbnail?id=1yfHssClsRhVjRp0ZY_oIwLhDB6M3iifc&sz=w595",
        "middleK": "1.143",
        "author": "元一设计"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 3,
        "imageNum": 357,
        "url": "https://drive.google.com/thumbnail?id=1bX3NsIGq9wcY-8ll5xxl7FddM6hSoYB5&sz=w595",
        "middleK": "1.429",
        "author": "Женя Щербакова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 38,
        "url": "https://drive.google.com/thumbnail?id=1-9XXflaiXYPXI38-WdlOhrupVXQKm4RB&sz=w595",
        "middleK": "1.286",
        "author": "Hanan Awny Mohamed"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 1,
        "imageNum": 573,
        "url": "https://drive.google.com/thumbnail?id=1PD1c7SllzpZVdUoiBjZtskRm44yP22qt&sz=w595",
        "middleK": "1.429",
        "author": "Владимир Дородний"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 570,
        "url": "https://drive.google.com/thumbnail?id=1EFL2evvLxJHdwgf2IjyThLsn8IFGpgsa&sz=w595",
        "middleK": "1.714",
        "author": "Chang, Fang-Pang"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 556,
        "url": "https://drive.google.com/thumbnail?id=1vPZO8OBpkueDvcJKZuTYOsaZynoFWPRI&sz=w595",
        "middleK": "1.286",
        "author": "Варвара Исаева"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 545,
        "url": "https://drive.google.com/thumbnail?id=1fQkAvFBPROoeas9DAu4h_vYflOpLsDDl&sz=w595",
        "middleK": "0.714",
        "author": "LILIA LUJÁN"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 559,
        "url": "https://drive.google.com/thumbnail?id=1F0s6-_9AiFrt_ihtZIm__PKf4trMsQ9I&sz=w595",
        "middleK": "1.286",
        "author": "Ева Волкова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 317,
        "url": "https://drive.google.com/thumbnail?id=1hLFma8sdHHXF-w_VtXuJItGPyxhiZSpN&sz=w595",
        "middleK": "0.857",
        "author": "Abulqasim Najah"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 101,
        "url": "https://drive.google.com/thumbnail?id=1K_JX2CXk4C7gU0XtFD-TtCc0Wz1tnStJ&sz=w595",
        "middleK": "2.429",
        "author": "Ирина Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 0,
        "imageNum": 49,
        "url": "https://drive.google.com/thumbnail?id=1xYcgNgvPoc4CHbZdkOj9i8EYrxg5mhsM&sz=w595",
        "middleK": "1.143",
        "author": "Raqee Najmuldeen"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 356,
        "url": "https://drive.google.com/thumbnail?id=1pUhV0Dkk6JrELjRy0P2RvlBMoftwNKWI&sz=w595",
        "middleK": "2.000",
        "author": "Ева Волкова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 308,
        "url": "https://drive.google.com/thumbnail?id=1MTmHZsvS5hHKIX8yYVWQs4kZ-84B-dkQ&sz=w595",
        "middleK": "0.714",
        "author": "ZHUO LI"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 1,
        "imageNum": 6,
        "url": "https://drive.google.com/thumbnail?id=1jnHT14BET7nmGubuK-pMgdtxF6XNbW8g&sz=w595",
        "middleK": "0.571",
        "author": "xuran zhang"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 571,
        "url": "https://drive.google.com/thumbnail?id=1UYXFX3FhZVUMCU97L5If2Hpfjxw__LHr&sz=w595",
        "middleK": "0.857",
        "author": "DR. MAHIMA GUPTA"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 533,
        "url": "https://drive.google.com/thumbnail?id=1PzI03CeDZuU9S_YqIvX4JpO9VD_0r_wG&sz=w595",
        "middleK": "1.571",
        "author": "Lou Chunag"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 51,
        "url": "https://drive.google.com/thumbnail?id=1xDtZxTjdcThmkpTUHmXOa_tkiWdKrXcB&sz=w595",
        "middleK": "1.429",
        "author": "Katsuya Kawahira"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 327,
        "url": "https://drive.google.com/thumbnail?id=1zGpdfdPEQx4VE8bSUhgUvE7_Tu3Rois8&sz=w595",
        "middleK": "1.714",
        "author": "Вера Михайлова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 344,
        "url": "https://drive.google.com/thumbnail?id=18bVCrf-i3q5cG9aSoB0yrLOoP6FoIZQv&sz=w595",
        "middleK": "2.000",
        "author": "Наталия Поволокина"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 59,
        "url": "https://drive.google.com/thumbnail?id=1cKE5HsfVgzIvfdc_-VoWrL_zzo9f3jFC&sz=w595",
        "middleK": "2.571",
        "author": "Полина Григорьева"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 10,
        "url": "https://drive.google.com/thumbnail?id=1OliMT2YllOzamSTxMqWrMqr46vLnwH8N&sz=w595",
        "middleK": "1.714",
        "author": "Jack Fu"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 352,
        "url": "https://drive.google.com/thumbnail?id=1tZVZyTxVqB33-pXEjf7HFDk5Wlo7IqIi&sz=w595",
        "middleK": "2.143",
        "author": "Анастасия Исакова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 2,
        "imageNum": 92,
        "url": "https://drive.google.com/thumbnail?id=1P1fnc19NGtHVg6sEubmXm75gffrsEHW9&sz=w595",
        "middleK": "1.714",
        "author": "Надежда Сотир"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 329,
        "url": "https://drive.google.com/thumbnail?id=1qy-k-LxOEo8ER0B5tnP1_Wu52nER_fT-&sz=w595",
        "middleK": "1.571",
        "author": "Шевцова Полина"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 328,
        "url": "https://drive.google.com/thumbnail?id=1bpQevfg-LreTsrfpypwc4p3g9wNuWSRy&sz=w595",
        "middleK": "2.143",
        "author": "Динара Туйсина"
    },
    {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 528,
        "url": "https://drive.google.com/thumbnail?id=1gxbuzt20fkDV-LVBFxPpvoFpQ_TzCdsh&sz=w595",
        "middleK": "1.429",
        "author": "Xujie Lyu"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 1,
        "6": 0,
        "7": 1,
        "imageNum": 529,
        "url": "https://drive.google.com/thumbnail?id=11NloI2Msst1YiDKrHDzq5iaWZhwq0zig&sz=w595",
        "middleK": "1.286",
        "author": "Yibin Huang"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 576,
        "url": "https://drive.google.com/thumbnail?id=13YOAiPkcwSzfhsIwYHSUdGcBAFmhZOG8&sz=w595",
        "middleK": "1.571",
        "author": "BAGUS INSANU ROKHMAN"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 133,
        "url": "https://drive.google.com/thumbnail?id=1gtkkDdmDHnysnOfp9uOdrXOn53Sn7PVZ&sz=w595",
        "middleK": "1.286",
        "author": "Resul AY"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 2,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 310,
        "url": "https://drive.google.com/thumbnail?id=13hEzf12mfxefEcyqpwGKnoSN9JEhobbx&sz=w595",
        "middleK": "1.857",
        "author": "Xuwei Zhang"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 1,
        "imageNum": 564,
        "url": "https://drive.google.com/thumbnail?id=1EGt_BiGqeb_NiUSnI-4HajPJrOS4OTHW&sz=w595",
        "middleK": "1.286",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 315,
        "url": "https://drive.google.com/thumbnail?id=16BqifVkObTSbanSTIhnQxmbSRUzSUOvb&sz=w595",
        "middleK": "0.571",
        "author": "AK Bill"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 121,
        "url": "https://drive.google.com/thumbnail?id=1CVQMLSossyoIOTNxD8RnerZc-MX9s-cq&sz=w595",
        "middleK": "2.143",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 509,
        "url": "https://drive.google.com/thumbnail?id=1rP2PEdbC4XA8eFThU2dkN0YET_jrVIjr&sz=w595",
        "middleK": "2.000",
        "author": "QiHe"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 530,
        "url": "https://drive.google.com/thumbnail?id=1aC36JtjMqe4NcztS9ObF8s4VBJs4Vywr&sz=w595",
        "middleK": "1.571",
        "author": "zhaoxin"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 0,
        "imageNum": 79,
        "url": "https://drive.google.com/thumbnail?id=1YDTCc7U0A54yRDYRvIA6-rRHG4yiuVrv&sz=w595",
        "middleK": "1.714",
        "author": "Борис Житков"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 363,
        "url": "https://drive.google.com/thumbnail?id=1vaWAZkzJJbCR0qSy4L_Kt9d2OtKzV4nS&sz=w595",
        "middleK": "2.000",
        "author": "Эппле Евгения"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 1,
        "6": 1,
        "7": 1,
        "imageNum": 579,
        "url": "https://drive.google.com/thumbnail?id=1-7oYwO4NIc8PlPkGv798iuEWA_yZz7h3&sz=w595",
        "middleK": "1.143",
        "author": "Jumping He"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 504,
        "url": "https://drive.google.com/thumbnail?id=1TvtXj2nUVtYCtvLbkoRTBj9dB7HwRPgp&sz=w595",
        "middleK": "2.000",
        "author": "yulu zhou"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 351,
        "url": "https://drive.google.com/thumbnail?id=1dXzCQNdBqTWYZWxSD1LCqu3XaaqcGwWa&sz=w595",
        "middleK": "2.000",
        "author": "Ирина Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 54,
        "url": "https://drive.google.com/thumbnail?id=1LVo44LgPZ-rpTek1DcidGuicMPZ47DnK&sz=w595",
        "middleK": "0.429",
        "author": "LILIA LUJÁN"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "imageNum": 138,
        "url": "https://drive.google.com/thumbnail?id=1rLFtSC4u-izh0Htu3Gzn00MMyUdiwXTy&sz=w595",
        "middleK": "0.857",
        "author": "Ryan Slone"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 572,
        "url": "https://drive.google.com/thumbnail?id=1nMtFx9Qy6wpKoJjXPsb1UsMyTf0rX3Pz&sz=w595",
        "middleK": "1.857",
        "author": "Владимир Дородний"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 1,
        "imageNum": 319,
        "url": "https://drive.google.com/thumbnail?id=1_MbHbSteUow6nBXk3LopBw3-b5p1FKeG&sz=w595",
        "middleK": "0.429",
        "author": "Damian Klaczkiewicz"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 2,
        "7": 3,
        "imageNum": 26,
        "url": "https://drive.google.com/thumbnail?id=1vRdp5ezW6Mm_PeoJUTeN44ut7WsHb4hk&sz=w595",
        "middleK": "1.286",
        "author": "Zhang He"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 113,
        "url": "https://drive.google.com/thumbnail?id=1-1aAQ8DmYYq16yUrYflyBT69SSMoip8j&sz=w595",
        "middleK": "1.571",
        "author": "Полина Бережная"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 516,
        "url": "https://drive.google.com/thumbnail?id=18kNobH32AAfldq50x_sQBCcVOe7x1hDM&sz=w595",
        "middleK": "1.429",
        "author": "Yan Wu"
    },
    {
        "1": 2,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 1,
        "imageNum": 313,
        "url": "https://drive.google.com/thumbnail?id=1S1qSWBNcbx3WeMKUYDg1yVB5_tQCFrrG&sz=w595",
        "middleK": "1.143",
        "author": "Huiqiong Yang"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 2,
        "imageNum": 324,
        "url": "https://drive.google.com/thumbnail?id=1s2rgEJ0enloYLbLCabYLH8UC1Is2lore&sz=w595",
        "middleK": "1.714",
        "author": "Валиева Варвара Максимовна"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 0,
        "imageNum": 123,
        "url": "https://drive.google.com/thumbnail?id=1POWd8PkBu6WL9jR3xDShk7teBf4bbNkp&sz=w595",
        "middleK": "1.000",
        "author": "Eduard Cehovin"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "imageNum": 342,
        "url": "https://drive.google.com/thumbnail?id=1_-6SFQRnAqPcw0PCSkbAEEjF5dKIsFQy&sz=w595",
        "middleK": "1.286",
        "author": "Залогина Наталья"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "6": 2,
        "7": 0,
        "imageNum": 153,
        "url": "https://drive.google.com/thumbnail?id=1Z_zqoLBA6e3rdtcsd8MGvQJYCMQHzG7n&sz=w595",
        "middleK": "1.857",
        "author": "Катя Слободская"
    },
    {
        "1": 0,
        "2": 2,
        "3": 0,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 551,
        "url": "https://drive.google.com/thumbnail?id=1PVfPJ40S-A2J9SsF7gtXN4_ilji13OdG&sz=w595",
        "middleK": "0.714",
        "author": "Алексей Лозовский"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 3,
        "imageNum": 129,
        "url": "https://drive.google.com/thumbnail?id=1fZ_E0UPcAn9FdF5Zr96mXLPw7uymsg9_&sz=w595",
        "middleK": "1.000",
        "author": "YI AN LIU"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 367,
        "url": "https://drive.google.com/thumbnail?id=1qzTxn8gCVK0KilIU7ZrbSlf60Bg8zEQ6&sz=w595",
        "middleK": "2.286",
        "author": "Ivan Mišić"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 2,
        "6": 3,
        "7": 0,
        "imageNum": 45,
        "url": "https://drive.google.com/thumbnail?id=1xaYGiauhMfgCkD6-VxP__AU7AL_JgiyA&sz=w595",
        "middleK": "1.714",
        "author": "Emran Abtahi"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 13,
        "url": "https://drive.google.com/thumbnail?id=1D2iLYyxbJm5E83DXwrA3ItLsMTBfRAUG&sz=w595",
        "middleK": "1.571",
        "author": "Chasel Peng"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 116,
        "url": "https://drive.google.com/thumbnail?id=1Vmx7JbDYfWWjnZ2Uuv8B223AoC41CSM7&sz=w595",
        "middleK": "1.429",
        "author": "Харатишвили Валерия"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 522,
        "url": "https://drive.google.com/thumbnail?id=17bBLpcDfprUQ7NIpz_JRs7Kr1uTLtk-X&sz=w595",
        "middleK": "2.571",
        "author": "SHUYING HUANG"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 154,
        "url": "https://drive.google.com/thumbnail?id=160QVDg7dBjw7JvKCjXmCx4PUDFsW4eLZ&sz=w595",
        "middleK": "1.286",
        "author": "Jumping He"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 36,
        "url": "https://drive.google.com/thumbnail?id=1i74rnkveQCltFyjejf-E9JKK6jR3pS4Q&sz=w595",
        "middleK": "0.714",
        "author": "ZHU BAITAO"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 102,
        "url": "https://drive.google.com/thumbnail?id=1QYlYZr1y9e6NbDEi2ZTFQ3qhPO390bF2&sz=w595",
        "middleK": "2.000",
        "author": "Ирина Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 118,
        "url": "https://drive.google.com/thumbnail?id=1SWRvRnBLvw4sP4Yki1jVhuu_FBxCsLJc&sz=w595",
        "middleK": "0.857",
        "author": "Устапасиди"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 1,
        "6": 3,
        "7": 2,
        "imageNum": 124,
        "url": "https://drive.google.com/thumbnail?id=1JP87L5IDsa-1zDqKsjtKhLXY6ZcVNWsW&sz=w595",
        "middleK": "1.286",
        "author": "Christopher Han"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 1,
        "6": 2,
        "7": 1,
        "imageNum": 8,
        "url": "https://drive.google.com/thumbnail?id=1oX1tVl3KQIqqCttdasaWcUrULiIt0Ad9&sz=w595",
        "middleK": "1.857",
        "author": "Wenlong Zhang"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 65,
        "url": "https://drive.google.com/thumbnail?id=1hziZxe0Q6ybSGkAp1PF-So2YAOClA_oW&sz=w595",
        "middleK": "1.714",
        "author": "Дарья Беда"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 32,
        "url": "https://drive.google.com/thumbnail?id=1aT7qsMoJ7-fdYqllCka22jQooSLjOUl1&sz=w595",
        "middleK": "2.000",
        "author": "Xujie Lyu"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 39,
        "url": "https://drive.google.com/thumbnail?id=1o_oskwb9mXuGQGZVxgZZAqRPzkyZzyRU&sz=w595",
        "middleK": "1.000",
        "author": "Daniel Meier"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 334,
        "url": "https://drive.google.com/thumbnail?id=1XVNjXNHrxY5oFGCKcHjm12MHKnXoVWHx&sz=w595",
        "middleK": "1.286",
        "author": "Ульяна Ивакина"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 502,
        "url": "https://drive.google.com/thumbnail?id=1n0BHzWp1OlZi4wroqZqPooisn5NDYz_U&sz=w595",
        "middleK": "2.000",
        "author": "Yibiao Qin"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 2,
        "url": "https://drive.google.com/thumbnail?id=1aCTNlpj0rxyKdvJXGEex2VZm0fJxAqHC&sz=w595",
        "middleK": "2.286",
        "author": "QIANG GANG"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 346,
        "url": "https://drive.google.com/thumbnail?id=1oUcbKWZJOxXJZcyM5ef9IvjnsiFRsnE4&sz=w595",
        "middleK": "1.714",
        "author": "Кира Федосова"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 57,
        "url": "https://drive.google.com/thumbnail?id=1shaC8Wbmui8KVJvdNN8nr6dPaXYcRn6B&sz=w595",
        "middleK": "1.857",
        "author": "Зырянова Александра"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 323,
        "url": "https://drive.google.com/thumbnail?id=1pkWknoELzZ1nC15fMBZTjyov2q56WkAp&sz=w595",
        "middleK": "1.143",
        "author": "Ольга Назарова"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 0,
        "imageNum": 108,
        "url": "https://drive.google.com/thumbnail?id=1LPHfzfDkuhFsLdR0elf7noronB10c23E&sz=w595",
        "middleK": "1.714",
        "author": "Карабанова Анна"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 347,
        "url": "https://drive.google.com/thumbnail?id=1mPLrNUMY-ounSOyf1F_lXmt_dJpoXeKR&sz=w595",
        "middleK": "1.714",
        "author": "Арина Константинова"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 309,
        "url": "https://drive.google.com/thumbnail?id=1a17kRvT9eJvhV3Q4Sh04CSTVTWxXgoQ_&sz=w595",
        "middleK": "2.000",
        "author": "Xian Liyun"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 135,
        "url": "https://drive.google.com/thumbnail?id=1-IIPgeFyIKmkzFNHnEbiGYa953watls-&sz=w595",
        "middleK": "1.429",
        "author": "ORHUN TURKER"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 514,
        "url": "https://drive.google.com/thumbnail?id=1XJAG-KOEusdEdDrZ33Q8Az7_8Cbsf5Qc&sz=w595",
        "middleK": "2.143",
        "author": "Zhang He"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 542,
        "url": "https://drive.google.com/thumbnail?id=1XROWiKnalE0Fga4kMeyfC5IenQC6w7QY&sz=w595",
        "middleK": "1.571",
        "author": "Takashi Matsuda"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 565,
        "url": "https://drive.google.com/thumbnail?id=1guxboy2tD1rQ1WX4DFDHT_-mZ3vOEAhn&sz=w595",
        "middleK": "1.571",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 24,
        "url": "https://drive.google.com/thumbnail?id=1NSX0bL_Tm1j4LpB4B1mBdRq5pppBgkeH&sz=w595",
        "middleK": "0.571",
        "author": "HAN ZHANG"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 0,
        "7": 2,
        "imageNum": 82,
        "url": "https://drive.google.com/thumbnail?id=15XEg0U2p6EBWBJZF2wkZb6cwiUsfkOnn&sz=w595",
        "middleK": "1.000",
        "author": "Анастасия Бардакова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 30,
        "url": "https://drive.google.com/thumbnail?id=124EoWNgES0EnGFHMA_msF6kW2wP-7C-h&sz=w595",
        "middleK": "1.857",
        "author": "Yongqi Chou"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 131,
        "url": "https://drive.google.com/thumbnail?id=1w5_TGxICuYdWIO056_Ecvw1YNpVl1NLB&sz=w595",
        "middleK": "0.857",
        "author": "Nebican Taskan"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 1,
        "7": 2,
        "imageNum": 19,
        "url": "https://drive.google.com/thumbnail?id=15BTInry-j7yxE_Feda39gYwXchI4NTAE&sz=w595",
        "middleK": "1.714",
        "author": "JiaNing Song"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 560,
        "url": "https://drive.google.com/thumbnail?id=1ViX6oFHuzlsOtXexeXAJTMxQQxkLY08I&sz=w595",
        "middleK": "0.857",
        "author": "Мария Богданова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 150,
        "url": "https://drive.google.com/thumbnail?id=1YaKL-Mzf0vBLyYiDP04l-okqh_35CMeq&sz=w595",
        "middleK": "0.714",
        "author": "Татьяна Кузнецова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 48,
        "url": "https://drive.google.com/thumbnail?id=1z1EVfiFVXLLHQYMcpz7_8aW8O3EjhH41&sz=w595",
        "middleK": "1.714",
        "author": "saideh khorsandi"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 558,
        "url": "https://drive.google.com/thumbnail?id=1aCiYocKSLIFyUW4avITk1wDzTTn98XYW&sz=w595",
        "middleK": "1.286",
        "author": "Артем Кривченков"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 365,
        "url": "https://drive.google.com/thumbnail?id=1SxrRXUMUnnEK_yP2jAyis5cdWFOb29p6&sz=w595",
        "middleK": "1.571",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 55,
        "url": "https://drive.google.com/thumbnail?id=14RFO-0XsENyVxg9RyEGuTMY454sEKyU2&sz=w595",
        "middleK": "2.857",
        "author": "Luis Yañez"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 548,
        "url": "https://drive.google.com/thumbnail?id=142-zSIdz_1f8fY9Dm21IMwKVk-us6iMH&sz=w595",
        "middleK": "1.286",
        "author": "Никита Баталов"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 340,
        "url": "https://drive.google.com/thumbnail?id=1tLuEKQBuksy-HZ61jymHSEfzl-DLVEkw&sz=w595",
        "middleK": "2.143",
        "author": "Дарья Кравцова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 355,
        "url": "https://drive.google.com/thumbnail?id=19yhALl5n0RcL5qyP8GvJlSiN_2pexgjj&sz=w595",
        "middleK": "2.000",
        "author": "Ева Волкова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 2,
        "6": 0,
        "7": 0,
        "imageNum": 345,
        "url": "https://drive.google.com/thumbnail?id=1Bnp4xWypMCCMY0-kDRZt1M-JzRkx0E89&sz=w595",
        "middleK": "1.000",
        "author": "Елизавета Драч"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 140,
        "url": "https://drive.google.com/thumbnail?id=1ltspzuLLmojzOCbJanaLHPt46vomO3U4&sz=w595",
        "middleK": "0.429",
        "author": "DR. MAHIMA GUPTA"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 2,
        "imageNum": 80,
        "url": "https://drive.google.com/thumbnail?id=1dvo9SjsVd6ca6a5jVc0TrP6tO2k9Z6hp&sz=w595",
        "middleK": "1.286",
        "author": "Борис Житков"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 0,
        "imageNum": 343,
        "url": "https://drive.google.com/thumbnail?id=1ITKsmCL5rA3VYTxKriRa_73m3mbuLYkZ&sz=w595",
        "middleK": "0.857",
        "author": "Марина Швец"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 104,
        "url": "https://drive.google.com/thumbnail?id=1lZ4ny-mRxtXa3pMYKgFwJnVvazeTRk9y&sz=w595",
        "middleK": "1.143",
        "author": "Екатерина Нестерова"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 69,
        "url": "https://drive.google.com/thumbnail?id=1nXun6asDv5AqG4Xv6GZigc3UrNSBx8Oj&sz=w595",
        "middleK": "1.714",
        "author": "Даниил Попов"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 103,
        "url": "https://drive.google.com/thumbnail?id=1Q2z_DcwWBebMolo9PNUA7OGLOfElErv8&sz=w595",
        "middleK": "2.000",
        "author": "Полина Вахлева"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 84,
        "url": "https://drive.google.com/thumbnail?id=1zskomwb5u5QOBH9NrlS6evmSXWnIDNDm&sz=w595",
        "middleK": "1.714",
        "author": "Белоусова Екатерина"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 550,
        "url": "https://drive.google.com/thumbnail?id=1oaZX3kaX6x-WufuAsO1uFq3Ix-be1VTs&sz=w595",
        "middleK": "1.857",
        "author": "Дмитрий Синявский"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 3,
        "5": 2,
        "6": 0,
        "7": 0,
        "imageNum": 99,
        "url": "https://drive.google.com/thumbnail?id=1ZLUETYMCfxordcPKgoaYlrlCwqCnV9Wv&sz=w595",
        "middleK": "1.143",
        "author": "Голушко Анастасия"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 37,
        "url": "https://drive.google.com/thumbnail?id=1jI7qqZGyx-BvMWvzz9rDcPDReuyWOfSM&sz=w595",
        "middleK": "1.286",
        "author": "Andreas Panayi"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 335,
        "url": "https://drive.google.com/thumbnail?id=1Czm-sscmltVZHaD-ROjHi8VzYL78F4Ce&sz=w595",
        "middleK": "2.143",
        "author": "Натали Матвеева"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 88,
        "url": "https://drive.google.com/thumbnail?id=1YBVnA1BmhelfoPbcumDv3WrRVlep_hZS&sz=w595",
        "middleK": "1.857",
        "author": "Софья Сорокина"
    },
    {
        "1": 3,
        "2": 2,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 369,
        "url": "https://drive.google.com/thumbnail?id=1kNXQiKUu3zeEC-H7dPwhIcM3wCoAouKN&sz=w595",
        "middleK": "2.143",
        "author": "Jie-Fei Yang"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 2,
        "imageNum": 120,
        "url": "https://drive.google.com/thumbnail?id=1OMZpkkK2OnE2U4pF96NU7zfCHRRQhdfl&sz=w595",
        "middleK": "1.714",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 563,
        "url": "https://drive.google.com/thumbnail?id=1QgvSZh1OCoEpxCfnyUUXUjvyesUkfmqw&sz=w595",
        "middleK": "1.429",
        "author": "Устапасиди"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 501,
        "url": "https://drive.google.com/thumbnail?id=1VXl2vWuFI9ox-njP6oyBaIKxpGua4W3L&sz=w595",
        "middleK": "2.000",
        "author": "Irina Tall"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 98,
        "url": "https://drive.google.com/thumbnail?id=1wcsV1PN4LDaX1va3xCKnRS79Kz8ytlrX&sz=w595",
        "middleK": "1.286",
        "author": "Надежда Фоминых"
    },
    {
        "1": 3,
        "2": 2,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 301,
        "url": "https://drive.google.com/thumbnail?id=1rBY8ZbtqM5HTEJcVcV5LbNBwIRSGdY1v&sz=w595",
        "middleK": "1.571",
        "author": "Татьяна Рузанова"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 503,
        "url": "https://drive.google.com/thumbnail?id=15WRQbtrA5uHOcOOgqOx4JsShUbtoljxG&sz=w595",
        "middleK": "2.000",
        "author": "yulu zhou"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 341,
        "url": "https://drive.google.com/thumbnail?id=1fFwrBXdAX7rWJXkSVS1kFhFCTSJzy4sH&sz=w595",
        "middleK": "2.143",
        "author": "Дарья Борисова"
    },
    {
        "1": 0,
        "2": 2,
        "3": 2,
        "4": 2,
        "5": 1,
        "6": 3,
        "7": 1,
        "imageNum": 322,
        "url": "https://drive.google.com/thumbnail?id=1sc13B_0CXPMp2RaE4NFE5vZ65fnvO1tJ&sz=w595",
        "middleK": "1.571",
        "author": "Зырянова Александра"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 0,
        "imageNum": 362,
        "url": "https://drive.google.com/thumbnail?id=1YDl_y43R0NmH3TuKbk4IhYoi36ymha6I&sz=w595",
        "middleK": "0.857",
        "author": "Милана Сохт"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 1,
        "6": 3,
        "7": 1,
        "imageNum": 22,
        "url": "https://drive.google.com/thumbnail?id=13uwXEuYR4ZGwNHkBvGcTxgvBPrEVESek&sz=w595",
        "middleK": "1.857",
        "author": "JiaNing Song"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 508,
        "url": "https://drive.google.com/thumbnail?id=1E1f8sF2ogdndmAJsVyWbKMmF0W2vvDmq&sz=w595",
        "middleK": "2.429",
        "author": "QiHe"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 1,
        "6": 0,
        "7": 2,
        "imageNum": 132,
        "url": "https://drive.google.com/thumbnail?id=1e5DjvDFZDBaZNmLZfrYQb1SL8uemD3zV&sz=w595",
        "middleK": "1.143",
        "author": "Resul AY"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 511,
        "url": "https://drive.google.com/thumbnail?id=18uRNcL3xanQX9klQiOkCDuVPapemlEON&sz=w595",
        "middleK": "2.000",
        "author": "Xian Liyun"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 359,
        "url": "https://drive.google.com/thumbnail?id=1P8W9yoa33qLcy_LOEWobBgfiN5ewHXF9&sz=w595",
        "middleK": "2.143",
        "author": "Женя Щербакова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 321,
        "url": "https://drive.google.com/thumbnail?id=1RrhP8mbp_2jspTADA9n5UsYaSbwRZwjS&sz=w595",
        "middleK": "1.571",
        "author": "Зырянова Александра"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 532,
        "url": "https://drive.google.com/thumbnail?id=1ynmHx02VSIej5QK2k6k2Qi3EwCIXNxr_&sz=w595",
        "middleK": "1.571",
        "author": "Yawen Yao"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 60,
        "url": "https://drive.google.com/thumbnail?id=1Uv-PIKc6sjKhOFa3MtqRonaBx9LQMm5t&sz=w595",
        "middleK": "2.000",
        "author": "Маргарита Маркова"
    },
    {
        "1": 2,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 513,
        "url": "https://drive.google.com/thumbnail?id=19XzVReQij_YthHiysr1wKtQPLOwe9PQF&sz=w595",
        "middleK": "1.714",
        "author": "Xuwei Zhang"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 89,
        "url": "https://drive.google.com/thumbnail?id=1XDhuBHY6m43agHb8CuvtarmS2XHpPRYu&sz=w595",
        "middleK": "1.857",
        "author": "Натали Матвеева"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 303,
        "url": "https://drive.google.com/thumbnail?id=1SBlkRQKQXyXUxEYmBRTx1HE85wc9Zq30&sz=w595",
        "middleK": "1.857",
        "author": "Yibiao Qin"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 305,
        "url": "https://drive.google.com/thumbnail?id=138chsFhZaOvEhZGmmMcGHJyH65uR6ar-&sz=w595",
        "middleK": "2.000",
        "author": "xuran zhang"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 2,
        "imageNum": 535,
        "url": "https://drive.google.com/thumbnail?id=17MBOGmXhHC4_wOeBgAWJ72Ef3k6wGQyd&sz=w595",
        "middleK": "1.571",
        "author": "元一设计"
    },
    {
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 25,
        "url": "https://drive.google.com/thumbnail?id=10aDWXp3FBX6eR0W5f2mBueK46tVz_QVZ&sz=w595",
        "middleK": "1.857",
        "author": "Zhang He"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "6": 0,
        "7": 2,
        "imageNum": 373,
        "url": "https://drive.google.com/thumbnail?id=1RGf9iPVpyCIs1bUBomognyDqJnMgmpFl&sz=w595",
        "middleK": "0.857",
        "author": "Cardona"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 2,
        "6": 2,
        "7": 0,
        "imageNum": 85,
        "url": "https://drive.google.com/thumbnail?id=1KW0vM86tlP3uLwVEimJdnaBDWtK1VnuC&sz=w595",
        "middleK": "1.429",
        "author": "Белоусова Екатерина"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 538,
        "url": "https://drive.google.com/thumbnail?id=1OuEY0S-icNkekqKhpZKRVEmIOlGeXjwA&sz=w595",
        "middleK": "1.143",
        "author": "Akram Mokhber"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 370,
        "url": "https://drive.google.com/thumbnail?id=1CqxBlOJ3auleoLdHN-9O_6waKD8ZdyFl&sz=w595",
        "middleK": "1.714",
        "author": "Wei-Chih, Liu"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 141,
        "url": "https://drive.google.com/thumbnail?id=1a6fXON6vR_Rgbe2cif_-g7fdKFkxYxZy&sz=w595",
        "middleK": "0.857",
        "author": "DR. MAHIMA GUPTA"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 0,
        "6": 3,
        "7": 1,
        "imageNum": 311,
        "url": "https://drive.google.com/thumbnail?id=1ncMQn7dW2IhBwMfAXd9MLPl04erpR39Z&sz=w595",
        "middleK": "1.286",
        "author": "Yongqi Chou"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 330,
        "url": "https://drive.google.com/thumbnail?id=1ESvm9HX7qYHE7UCRNPdsWO41EgyTJg6U&sz=w595",
        "middleK": "0.714",
        "author": "Сёмкина Дарья"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 1,
        "url": "https://drive.google.com/thumbnail?id=1Wmw-vKmetbOS9iq5lOYwP2izwXS3_pp4&sz=w595",
        "middleK": "2.000",
        "author": "Katarina Nikic"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 364,
        "url": "https://drive.google.com/thumbnail?id=1zc4PX8GE07k5pv52nUUDg5gMv8aGHYYy&sz=w595",
        "middleK": "1.571",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 506,
        "url": "https://drive.google.com/thumbnail?id=1YRD7caBCY8gB6-yFPbUdMvY-l8RerOAv&sz=w595",
        "middleK": "2.143",
        "author": "Fan Yu"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 540,
        "url": "https://drive.google.com/thumbnail?id=1hl7CBTmhtGn9UNZwze1672ssfrGhIRKd&sz=w595",
        "middleK": "1.429",
        "author": "Katsuya Kawahira"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 97,
        "url": "https://drive.google.com/thumbnail?id=1cJp-LKQv1eoc3K-vhCt7wEWcnOXCgWBF&sz=w595",
        "middleK": "1.429",
        "author": "Ульяна Девяткина"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 567,
        "url": "https://drive.google.com/thumbnail?id=1jkWUucx_gahQrCGglh3zOlS2TfIKDyQm&sz=w595",
        "middleK": "2.143",
        "author": "Eduard Cehovin"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 91,
        "url": "https://drive.google.com/thumbnail?id=16N7eLS0QgiAmb4u5ZzIoRdH1p1RfT6G5&sz=w595",
        "middleK": "0.857",
        "author": "Дмитрий Синявский"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 575,
        "url": "https://drive.google.com/thumbnail?id=1En5nVHDB3AxZXpNgKEFawP8qwHC4s0gL&sz=w595",
        "middleK": "2.000",
        "author": "Елена Коренева"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 2,
        "imageNum": 555,
        "url": "https://drive.google.com/thumbnail?id=1wqiHS3iY7DbABaQq_-W37SBEFubOBCKx&sz=w595",
        "middleK": "1.571",
        "author": "Ирина Кузнецова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 1,
        "5": 2,
        "6": 3,
        "7": 2,
        "imageNum": 510,
        "url": "https://drive.google.com/thumbnail?id=1xfbM8UZr0-TGffr_wDTGV_e9OfFi9Foc&sz=w595",
        "middleK": "1.286",
        "author": "ZHUO LI"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 0,
        "imageNum": 314,
        "url": "https://drive.google.com/thumbnail?id=1z1HgrqMSvymy4JaWTrtXPwit45HlIInr&sz=w595",
        "middleK": "0.857",
        "author": "Daniel Meier"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 29,
        "url": "https://drive.google.com/thumbnail?id=1Atou7bH3PZIv6j59l8IVJXf4sbvGKmws&sz=w595",
        "middleK": "1.429",
        "author": "Yongqi Chou"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 1,
        "6": 3,
        "7": 3,
        "imageNum": 574,
        "url": "https://drive.google.com/thumbnail?id=1xt1StYC19J0nc2_Xw-u21BcQe2EBb0CX&sz=w595",
        "middleK": "1.429",
        "author": "Антон Шлёнкин"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 525,
        "url": "https://drive.google.com/thumbnail?id=1ENHTvg9YkmlHaLk4Y1p-J0UtcC-ATiVQ&sz=w595",
        "middleK": "2.429",
        "author": "SHUYING HUANG"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 543,
        "url": "https://drive.google.com/thumbnail?id=15v5D-cUjnBLeg_vCFJlEwMg-V9EGYcAT&sz=w595",
        "middleK": "1.714",
        "author": "Luis Antonio Rivera Rodriguez"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 86,
        "url": "https://drive.google.com/thumbnail?id=1KRAS59HFdg-ZjwjiOPdDwKb9AGw-hTBo&sz=w595",
        "middleK": "1.286",
        "author": "Михаил Злобин"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 318,
        "url": "https://drive.google.com/thumbnail?id=1jYkKGXI8KDSjBaNgWRubtIK0v7Wi1vy8&sz=w595",
        "middleK": "1.286",
        "author": "LILIA LUJÁN"
    },
    {
        "1": 3,
        "2": 2,
        "3": 0,
        "4": 2,
        "5": 0,
        "6": 0,
        "7": 2,
        "imageNum": 372,
        "url": "https://drive.google.com/thumbnail?id=14spW9DmHkZI_nVIoF82fGBWO7JT5ZYm_&sz=w595",
        "middleK": "1.286",
        "author": "Zeliha Begüm Aydın"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 2,
        "7": 0,
        "imageNum": 145,
        "url": "https://drive.google.com/thumbnail?id=1Huf-SuFPiSWDTTcmbIHEzjzw7B1WjvFi&sz=w595",
        "middleK": "1.429",
        "author": "Антон Шлёнкин"
    },
    {
        "1": 3,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 0,
        "6": 2,
        "7": 3,
        "imageNum": 52,
        "url": "https://drive.google.com/thumbnail?id=1fTkjWpm_1pjEjs2T7r-T6ZGvVzpOnBj5&sz=w595",
        "middleK": "1.714",
        "author": "Luis Antonio Rivera Rodriguez"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 3,
        "imageNum": 332,
        "url": "https://drive.google.com/thumbnail?id=1OdvjNHeb7G-TnaookORtmgLi5gxGdbTg&sz=w595",
        "middleK": "0.857",
        "author": "Мария Макеенко"
    },
    {
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 3,
        "imageNum": 114,
        "url": "https://drive.google.com/thumbnail?id=1BCf3ZAfiwN0yF-oh2-95L0L9JWGSAz_r&sz=w595",
        "middleK": "2.143",
        "author": "Анастасия Осипова"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 14,
        "url": "https://drive.google.com/thumbnail?id=1Cg3GQNz4hUroQiu1NjwzvYRTc-Nyk4W5&sz=w595",
        "middleK": "1.000",
        "author": "Chuang Qiao"
    },
    {
        "1": 3,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 371,
        "url": "https://drive.google.com/thumbnail?id=1zdyYPkMEVk1zsgJlApH9mQDeArp_pbcU&sz=w595",
        "middleK": "1.286",
        "author": "Oktay Barkın"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 50,
        "url": "https://drive.google.com/thumbnail?id=1BdRlIwwz9299YbowfrYztey9uso5Bx7Y&sz=w595",
        "middleK": "1.571",
        "author": "Abulqasim Najah"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 0,
        "imageNum": 95,
        "url": "https://drive.google.com/thumbnail?id=1u9ri_-ZKdJumag7NoLTjk293RRzN1Y0W&sz=w595",
        "middleK": "0.857",
        "author": "Залогина Наталья"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 3,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 126,
        "url": "https://drive.google.com/thumbnail?id=12TfoX7IWV1E3C2DpT81WC9bR_OWlbqV8&sz=w595",
        "middleK": "2.000",
        "author": "Liu Guan Chen"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 562,
        "url": "https://drive.google.com/thumbnail?id=1jNItQDh6bymXbk253qaZtUi_MDAsAlVu&sz=w595",
        "middleK": "1.000",
        "author": "Софья Пантелеева"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "imageNum": 360,
        "url": "https://drive.google.com/thumbnail?id=1Wue1JemrXljmvLk90ep7Ap-OycCnc0fE&sz=w595",
        "middleK": "0.000",
        "author": "Бакина"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 561,
        "url": "https://drive.google.com/thumbnail?id=18Zsf4ixeqDwlH0sQgYTJZkxMps-ZGyjn&sz=w595",
        "middleK": "2.000",
        "author": "Алина Авилова"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 2,
        "imageNum": 90,
        "url": "https://drive.google.com/thumbnail?id=1YspWHHgRn814ONqMMBZX123YvnF_-AVC&sz=w595",
        "middleK": "1.571",
        "author": "Ксения Первушева"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 1,
        "6": 3,
        "7": 1,
        "imageNum": 21,
        "url": "https://drive.google.com/thumbnail?id=170GRMuJNfDlngEle5dotIXsFqObnYSzK&sz=w595",
        "middleK": "1.571",
        "author": "JiaNing Song"
    },
    {
        "1": 2,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 1,
        "imageNum": 568,
        "url": "https://drive.google.com/thumbnail?id=1JycLsy3F7blw5XQUOAdGWRrbyXf9M-IL&sz=w595",
        "middleK": "1.714",
        "author": "Chang, Fang-Pang"
    },
    {
        "1": 3,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 3,
        "6": 3,
        "7": 1,
        "imageNum": 519,
        "url": "https://drive.google.com/thumbnail?id=1JFQBGS_ZPslhzDWCn-DJJaDZMsZH8qZQ&sz=w595",
        "middleK": "1.857",
        "author": "Chen Jie"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 1,
        "5": 2,
        "6": 2,
        "7": 3,
        "imageNum": 33,
        "url": "https://drive.google.com/thumbnail?id=1M5IEDoITCpRYrOMlWNF0TX_qTULXOES5&sz=w595",
        "middleK": "1.429",
        "author": "Xujie Lyu"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 3,
        "imageNum": 119,
        "url": "https://drive.google.com/thumbnail?id=1vsMXRZPPeBJQyF9f2N6WBsoHSs69eGBN&sz=w595",
        "middleK": "0.857",
        "author": "Морозова Ольга"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 306,
        "url": "https://drive.google.com/thumbnail?id=1S6OyZS37piE7jTMstyYxAxDkHYivWBij&sz=w595",
        "middleK": "1.714",
        "author": "Jack Fu"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 3,
        "7": 0,
        "imageNum": 43,
        "url": "https://drive.google.com/thumbnail?id=1QHP5siQdRDprCdmII3ZXORAJ9etAtQra&sz=w595",
        "middleK": "1.714",
        "author": "Hossein Abdi"
    },
    {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 0,
        "7": 1,
        "imageNum": 337,
        "url": "https://drive.google.com/thumbnail?id=1dwOF6X-Z6NzFEt81lp69ZPQPYcyI_uw3&sz=w595",
        "middleK": "1.000",
        "author": "Дмитрий Синявский"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 0,
        "imageNum": 307,
        "url": "https://drive.google.com/thumbnail?id=1GwRrmV2rqBXemlKF3Plk_f_EbmnHpabz&sz=w595",
        "middleK": "1.571"
    },
    {
        "1": 3,
        "2": 0,
        "3": 3,
        "4": 0,
        "5": 3,
        "6": 2,
        "7": 3,
        "imageNum": 122,
        "url": "https://drive.google.com/thumbnail?id=1044NwkMJnmBaTasBq4oIwSQUKLImnGF4&sz=w595",
        "middleK": "2.000",
        "author": "Pavel Pisklakov"
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 3,
        "6": 0,
        "7": 2,
        "imageNum": 537,
        "url": "https://drive.google.com/thumbnail?id=1yYOt5c6Wo0JO1_5N0ooNuoEyk5fsxFkp&sz=w595",
        "middleK": "0.857",
        "author": "Татьяна Талабанова, Инна Шмоль, Анна Петрачук"
    },
    {
        "1": 0,
        "2": 2,
        "3": 1,
        "4": 0,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 56,
        "url": "https://drive.google.com/thumbnail?id=19SarjNYEh9a0yzV2uBNA2PKF2-trVN1F&sz=w595",
        "middleK": "1.571",
        "author": "Ulises Ortiz Castillo"
    },
    {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 2,
        "5": 2,
        "6": 3,
        "7": 3,
        "imageNum": 143,
        "url": "https://drive.google.com/thumbnail?id=1NsqqBT8ySsFmujFZS77GrLvUpVTfZvcF&sz=w595",
        "middleK": "1.714",
        "author": "Бельчикова Марта"
    },
    {
        "1": 1,
        "2": 0,
        "3": 3,
        "4": 1,
        "5": 2,
        "6": 2,
        "7": 1,
        "imageNum": 11,
        "url": "https://drive.google.com/thumbnail?id=1yQIz47q2bMc9lu64MfXnRhOsJbHs3fvX&sz=w595",
        "middleK": "1.429",
        "author": "Fan Yu"
    }
];

const headers = [
    { label: "Image Num", key: "imageNum" },
    { label: "Author", key: "author" },
    { label: "Url", key: "url" },
    { label: "1", key: "1" },
    { label: "2", key: "2" },
    { label: "3", key: "3" },
    { label: "4", key: "4" },
    { label: "5", key: "5" },
    { label: "6", key: "6" },
    { label: "7", key: "7" },
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

const authorObject = {
    301: 'Татьяна Рузанова',
    302: 'Камила Акназарова',
    501: 'Irina Tall',
    1: 'Katarina Nikic',
    2: 'QIANG GANG',
    3: 'QIANG GANG',
    4: 'Yibiao Qin',
    5: 'Yibiao Qin',
    303: 'Yibiao Qin',
    304: 'Yibiao Qin',
    502: 'Yibiao Qin',
    503: 'yulu zhou',
    504: 'yulu zhou',
    305: 'xuran zhang',
    6: 'xuran zhang',
    7: 'jianqiang qiu',
    306: 'jianqiang qiu',
    505: 'jianqiang qiu',
    8: 'Wenlong Zhang',
    9: 'Jack Fu',
    10: 'Jack Fu',
    306: 'Jack Fu',
    11: 'Fan Yu',
    12: 'Fan Yu',
    506: 'Fan Yu',
    507: 'QiHe',
    508: 'QiHe',
    509: 'QiHe',
    13: 'Chasel Peng',
    14: 'Chuang Qiao',
    15: 'Chuang Qiao',
    16: 'ZHUO LI',
    308: 'ZHUO LI',
    510: 'ZHUO LI',
    17: 'SHEN ZEWEN',
    18: 'XU Kai',
    19: 'JiaNing Song',
    20: 'JiaNing Song',
    21: 'JiaNing Song',
    22: 'JiaNing Song',
    23: 'Xian Liyun',
    309: 'Xian Liyun',
    511: 'Xian Liyun',
    512: 'Xian Liyun',
    310: 'Xuwei Zhang',
    513: 'Xuwei Zhang',
    24: 'HAN ZHANG',
    25: 'Zhang He',
    26: 'Zhang He',
    514: 'Zhang He',
    515: 'Zhang He',
    516: 'Yan Wu',
    517: 'Chen Jie',
    518: 'Chen Jie',
    519: 'Chen Jie',
    27: 'Wenjie Huo',
    520: 'Wenjie Huo',
    28: 'Yongqi Chou',
    29: 'Yongqi Chou',
    30: 'Yongqi Chou',
    311: 'Yongqi Chou',
    521: 'Yongqi Chou',
    522: 'SHUYING HUANG',
    523: 'SHUYING HUANG',
    524: 'SHUYING HUANG',
    525: 'SHUYING HUANG',
    526: 'SHUYING HUANG',
    527: 'SHUYING HUANG',
    31: 'Xujie Lyu',
    32: 'Xujie Lyu',
    33: 'Xujie Lyu',
    528: 'Xujie Lyu',
    529: 'Yibin Huang',
    34: 'zhaoxin',
    35: 'zhaoxin',
    530: 'zhaoxin',
    531: 'zhaoxin',
    36: 'ZHU BAITAO',
    532: 'Yawen Yao',
    312: 'fei Cheng',
    533: 'Lou Chunag',
    313: 'Huiqiong Yang',
    534: '元一设计',
    535: '元一设计',
    37: 'Andreas Panayi',
    38: 'Hanan Awny Mohamed',
    39: 'Daniel Meier',
    40: 'AK Bill',
    41: 'Kata Kaldor',
    42: 'Hossein Abdi',
    43: 'Hossein Abdi',
    44: 'Emran Abtahi',
    45: 'Emran Abtahi',
    46: 'Masoud Saffari',
    47: 'Akram Mokhber',
    48: 'saideh khorsandi',
    49: 'Raqee Najmuldeen',
    50: 'Abulqasim Najah',
    51: 'Katsuya Kawahira',
    52: 'Luis Antonio Rivera Rodriguez',
    53: 'Luis Antonio Rivera Rodriguez',
    54: 'LILIA LUJÁN',
    55: 'Luis Yañez',
    56: 'Ulises Ortiz Castillo',
    57: 'Зырянова Александра',
    58: 'Зырянова Александра',
    59: 'Полина Григорьева',
    60: 'Маргарита Маркова',
    61: 'Владимир Перекрестов',
    62: 'Алфёрова Анастасия',
    63: 'Мария Темченко',
    64: 'Гуменная Ульяна',
    65: 'Дарья Беда',
    66: 'Михаил Ситников',
    67: 'Екатерина Крючкова',
    68: 'Таисия Голомазова',
    69: 'Даниил Попов',
    70: 'Динара Туйсина',
    71: 'Шевцова Полина',
    72: 'Сёмкина Дарья',
    73: 'Дарья Недачина',
    74: 'Максим Вавенков',
    75: 'Екатерина Березовская',
    76: 'Екатерина Березовская',
    77: 'Екатерина Березовская',
    78: 'Виктория Волкова',
    79: 'Борис Житков',
    80: 'Борис Житков',
    81: 'Анастасия Бардакова',
    82: 'Анастасия Бардакова',
    83: 'Алиса Чернова',
    84: 'Белоусова Екатерина',
    85: 'Белоусова Екатерина',
    86: 'Михаил Злобин',
    87: 'Михаил Злобин',
    88: 'Софья Сорокина',
    89: 'Натали Матвеева',
    90: 'Ксения Первушева',
    91: 'Дмитрий Синявский',
    92: 'Надежда Сотир',
    93: 'Мария Синькова',
    94: 'Мария Синькова',
    95: 'Залогина Наталья',
    96: 'Зотова Наташа',
    97: 'Ульяна Девяткина',
    98: 'Надежда Фоминых',
    99: 'Голушко Анастасия',
    100: 'Ирина Кузнецова',
    101: 'Ирина Кузнецова',
    102: 'Ирина Кузнецова',
    103: 'Полина Вахлева',
    104: 'Екатерина Нестерова',
    105: 'Кристина Большакова',
    106: 'Варвара Исаева',
    107: 'Маргарита Крухтанова',
    108: 'Карабанова Анна',
    109: 'Артем Кривченков',
    110: 'Артем Кривченков',
    111: 'Артем Кривченков',
    112: 'Варвара Халилюлина',
    113: 'Полина Бережная',
    114: 'Анастасия Осипова',
    115: 'Женя Щербакова',
    116: 'Харатишвили Валерия',
    117: 'Устапасиди',
    118: 'Устапасиди',
    119: 'Морозова Ольга',
    120: 'Pavel Pisklakov',
    121: 'Pavel Pisklakov',
    122: 'Pavel Pisklakov',
    123: 'Eduard Cehovin',
    124: 'Christopher Han',
    125: 'Kye-soo Myung',
    126: 'Liu Guan Chen',
    127: 'Chang, Fang-Pang',
    128: 'Goyen Chen',
    129: 'YI AN LIU',
    130: 'YI AN LIU',
    131: 'Nebican Taskan',
    132: 'Resul AY',
    133: 'Resul AY',
    134: 'Resul AY',
    135: 'ORHUN TURKER',
    136: 'Eduardo Davit',
    137: 'Eduardo Davit',
    138: 'Ryan Slone',
    139: 'Li Zhang',
    140: 'DR. MAHIMA GUPTA',
    141: 'DR. MAHIMA GUPTA',
    142: 'Бельчикова Марта',
    143: 'Бельчикова Марта',
    144: 'Бельчикова Марта',
    145: 'Антон Шлёнкин',
    146: 'Антон Шлёнкин',
    147: 'Антон Шлёнкин',
    148: 'Татьяна Кузнецова',
    149: 'Татьяна Кузнецова',
    150: 'Татьяна Кузнецова',
    151: 'Катя Слободская',
    152: 'Катя Слободская',
    153: 'Катя Слободская',
    154: 'Jumping He',
    314: 'Daniel Meier',
    315: 'AK Bill',
    316: 'saideh khorsandi',
    317: 'Abulqasim Najah',
    318: 'LILIA LUJÁN',
    319: 'Damian Klaczkiewicz',
    320: 'Зырянова Александра',
    321: 'Зырянова Александра',
    322: 'Зырянова Александра',
    323: 'Ольга Назарова',
    324: 'Валиева Варвара Максимовна',
    325: 'Якушина Юлия',
    326: 'Дарья Козлова',
    327: 'Вера Михайлова',
    328: 'Динара Туйсина',
    329: 'Шевцова Полина',
    330: 'Сёмкина Дарья',
    331: 'Полина Бушмакова',
    332: 'Мария Макеенко',
    333: 'Виктория Волкова',
    334: 'Ульяна Ивакина',
    335: 'Натали Матвеева',
    336: 'Владимир Егоров',
    337: 'Дмитрий Синявский',
    338: 'Алиса Зимина',
    339: 'Зоя Беликова',
    340: 'Дарья Кравцова',
    341: 'Дарья Борисова',
    342: 'Залогина Наталья',
    343: 'Марина Швец',
    344: 'Наталия Поволокина',
    345: 'Елизавета Драч',
    346: 'Кира Федосова',
    347: 'Арина Константинова',
    348: 'Зотова Наташа',
    349: 'Валерия Молянова',
    350: 'Константин Семененко',
    351: 'Ирина Кузнецова',
    352: 'Анастасия Исакова',
    353: 'Анастасия Исакова',
    354: 'Артем Кривченков',
    355: 'Ева Волкова',
    356: 'Ева Волкова',
    357: 'Женя Щербакова',
    358: 'Женя Щербакова',
    359: 'Женя Щербакова',
    360: 'Бакина',
    361: 'Алена Демченко',
    362: 'Милана Сохт',
    363: 'Эппле Евгения',
    364: 'Pavel Pisklakov',
    365: 'Pavel Pisklakov',
    366: 'Dmitry Mirilenko',
    367: 'Ivan Mišić',
    368: 'SHAO-WEI CHUANG',
    369: 'Jie-Fei Yang',
    370: 'Wei-Chih, Liu',
    371: 'Oktay Barkın',
    372: 'Zeliha Begüm Aydın',
    373: 'Cardona',
    374: 'Cardona',
    536: 'Mario Fuentes',
    537: 'Татьяна Талабанова, Инна Шмоль, Анна Петрачук',
    538: 'Akram Mokhber',
    539: 'Akram Mokhber',
    540: 'Katsuya Kawahira',
    541: 'Katsuya Kawahira',
    542: 'Takashi Matsuda',
    543: 'Luis Antonio Rivera Rodriguez',
    544: 'Luis Antonio Rivera Rodriguez',
    545: 'LILIA LUJÁN',
    546: 'Зырянова Александра',
    547: 'Зырянова Александра',
    548: 'Никита Баталов',
    549: 'Дарья Недачина',
    550: 'Дмитрий Синявский',
    551: 'Алексей Лозовский',
    552: 'Мария Синькова',
    553: 'Никитина Анна',
    554: 'Ирина Кузнецова',
    555: 'Ирина Кузнецова',
    556: 'Варвара Исаева',
    557: 'Арина Кириллова',
    558: 'Артем Кривченков',
    559: 'Ева Волкова',
    560: 'Мария Богданова',
    561: 'Алина Авилова',
    562: 'Софья Пантелеева',
    563: 'Устапасиди',
    564: 'Pavel Pisklakov',
    565: 'Pavel Pisklakov',
    566: 'Pavel Pisklakov',
    567: 'Eduard Cehovin',
    568: 'Chang, Fang-Pang',
    569: 'Chang, Fang-Pang',
    570: 'Chang, Fang-Pang',
    571: 'DR. MAHIMA GUPTA',
    572: 'Владимир Дородний',
    573: 'Владимир Дородний',
    574: 'Антон Шлёнкин',
    575: 'Елена Коренева',
    576: 'BAGUS INSANU ROKHMAN',
    577: 'Jumping He',
    578: 'Jumping He',
    579: 'Jumping He',
}

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
    "xkruglow@gmail.com": 1,
    "ankl@jgroup.ru": 2,
    "chipper24_brisker@icloud.com": 3,
    "nellykamaeva@gmail.com": 4,
    "jilkina-e@yandex.ru": 5,
    "iul.ratnikova@gmail.com": 6,
    "dianakaraganova@gmail.com": 7,
    // "jilkina@gmail.com": 8,
    // "rslone@uark.edu": 9,
    // "svishnakov@gmail.com": 10,
    // "th.a.tmrk@gmail.com": 11,
}

function TotalPage() {

    const [images, setImages] = useState(testImagesData);
    const [rowData, setRowData] = useState(result2);

    console.log("images", images);
// Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            field: "imageNum",
            width: 150,
        },
        {
            field: "author",
            width: 200,
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
        // { field: "8", width: 40, },
        // { field: "9", width: 40, },
        // { field: "10", width: 50, },
        // { field: "11", width: 50, },
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
        if (num > 0 && num < 200) {
            return { background: 'lightcoral' };
        } else if (num >= 200 && num < 400) {
            return { background: 'lightgreen' };
        } else if (num >= 500) {
            return { background: 'lightskyblue' };
        } else {
            return {}
        }
    }

    function addAuth(number) {
        // let sortArray = [...resultArray];
        switch (true) {
            case (number === 301):
                return "Татьяна Рузанова"
            case (number === 302):
                return "Камила Акназарова"
            case (number === 501):
                return "Камила Акназарова"
            // case number<=10 && number>5:
            //     return "Татьяна Рузанова"
            //     break;
            // case number>10:
            //     return "Татьяна Рузанова"
            default:
                return '1111'
                break;   
        }
    }


    function addAuthor(resultArray) {
        // let sortArray = [...resultArray];
        const changedArray = resultArray.map((item) => {
            // const res = addAuth(item.imageNum);
            return { ...item, author: authorObject[item.imageNum]};
        })

        console.log("------------>>>----------->>> changedArray", changedArray)
    }

    useEffect(() => {
        // addAuthor(result2)
    }, [])

    useEffect(() => {
        if (images.length > 0) {
            return;
            console.log("images[0].num", images[0].num);
           
            let arrayRows = [];

            console.log("started arrayRows", arrayRows);

            images.forEach((img, index) => {
                // if (index > 0) {
                //     return;
                // }
                let obj = { imageNum: img.num, url: img.url };

                const q = query(likesRef, where('imageNum', '==', img.num), orderBy("createBy", 'desc'));
                onSnapshot(q, (snap) => {
                    console.log('======> onSnapshot images', snap);
                    snap.forEach((doc, index) => {
                        console.log('index', index)
                        const likeInfo = doc.data();
                        console.log("likeInfo", likeInfo.email, likeInfo.value);
                        console.log("obj in", obj);
                        if (!obj.hasOwnProperty(constants[likeInfo.email])) {
                            console.log('hasOwnProperty no');
                            obj[constants[likeInfo.email]] = likeInfo.value;
                        } else {
                            console.log('hasOwnProperty yes');
                        }

                        // obj[likeInfo.email] = likeInfo.value;
                        // array.push({ id: doc.id, ...doc.data() })
                    })
                    const middleK = (obj[1] + obj[2] + obj[3] + obj[4] + obj[5] + obj[6] + obj[7]) / 7;
                    console.log('================== after changes', obj);
                    console.log('after changes with middleK', { ...obj, middleK: middleK.toFixed(3) });
                    arrayRows.push({ ...obj, middleK: middleK.toFixed(3) });
                    console.log("after arrayRows", arrayRows);
                    // setRowData(arrayRows);
                    // if (images.length === 0) {
                    //     getALlUrls(snap);
                    // }
                    // if (index === 191) {
                    //     // console.log(arrayRows);
                    //     setRowData(arrayRows);
                    // }
                })
            });

            console.log("finished arrayRows", arrayRows);

            addAuthor(arrayRows);
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
        <div style={{display: "flex", color: 'lightcoral'}}>
            <div style={{width: "400px"}}>Music Poster</div>
            <div> images nums: 1-299</div>
        </div>
        <div style={{display: "flex", color: 'lightgreen'}}>
            <div style={{width: "400px"}}>Myths and legends</div>
            <div> images nums: 300-499</div>
        </div>
        <div style={{display: "flex", color: 'lightskyblue'}}>
            <div style={{width: "400px"}}>The cultural code</div>
            <div> images nums: 500-700</div>
        </div>
        <br/>
        <span style={{fontWeight: "bold"}}>Juri:</span>
        <br/>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> xkruglow@gmail.com</div>
            <div> {constants["xkruglow@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> ankl@jgroup.ru</div>
            <div> {constants["ankl@jgroup.ru"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> chipper24_brisker@icloud.com</div>
            <div> {constants["chipper24_brisker@icloud.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> nellykamaeva@gmail.com</div>
            <div> {constants["nellykamaeva@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> jilkina-e@yandex.ru</div>
            <div> {constants["jilkina-e@yandex.ru"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> iul.ratnikova@gmail.com</div>
            <div> {constants["iul.ratnikova@gmail.com"]} </div>
        </div>
        <div style={{display: "flex"}}>
            <div style={{width: "300px"}}> dianakaraganova@gmail.com</div>
            <div> {constants["dianakaraganova@gmail.com"]} </div>
        </div>
        <br/>
            <CSVLink data={result2} headers={headers}>
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
