import React, {useContext, useState, useEffect} from "react";
import { addDoc, getDoc, collection, doc, where, DocumentReference, query, orderBy } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { onSnapshot } from "firebase/firestore";
import { db, } from "../firebase/firebaseConfig";
import {UserContext} from "../index";
import logo from '../images/PED2024-logo.svg';

const testAfter = null;

function MainPage() {
    console.log('MainPage 2');
    let { lindId } = useParams();
    // const [ images ] = useState( []);
    const [ snaps, setSnaps ] = useState( []);
    const [ currentImage, setCurrentImage ] = useState( );

    const collectionRef = collection(db, 'links');

    // console.log('collectionRef', collectionRef);
    // console.log(lindId);
    // console.log('snaps', snaps);

    const { user, setLink } = useContext(UserContext);

    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const imageStyle = {
        backgroundImage: `url(${currentImage?.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        gridArea: '2 / 2 / 6 / 3',
        overflow: 'hidden',
        height: '842px',
        width: '595px',
    }

    // const imageStyleTest = {
    //     background: `no-repeat url('https://drive.google.com/thumbnail?id=1ZYLYAJCITqBKff6lakYxcpGz7vTsL2nS&sz=w595')`,
    //     gridArea: '2 / 2 / 6 / 3',
    //     overflow: 'hidden',
    //     height: '842px',
    //     width: '595px',
    // }

    // https://drive.google.com/thumbnail?id=1mFHFIBwQabWotXNwcSGbHrMxKpwWiHzn&sz=w595
    // https://drive.google.com/thumbnail?id=1RaF1sy-u7odmTQ6aATx2GYD3-GCcqacB&sz=w595
    // https://drive.google.com/thumbnail?id=1ZYLYAJCITqBKff6lakYxcpGz7vTsL2nS&sz=w595
    // https://drive.google.com/thumbnail?id=1jzaZFdTvcDtcUWNQZlWVxgfBH-HvlOur&sz=w595

    // https://drive.google.com/uc?id=1jzaZFdTvcDtcUWNQZlWVxgfBH-HvlOur
    // https://drive.google.com/thumbnail?id=1jzaZFdTvcDtcUWNQZlWVxgfBH-HvlOur&sz=w1000

    const logoStyle = {
        background: `url(${logo})`,
        backgroundRepeat: 'no-repeat'
    }

    // if (lindId) {
    //     console.log('lindId', lindId);
    //     const q = query(collectionRef, where('name', '==', lindId));
    //     onSnapshot(q, (snap) => {
    //         console.log('onSnapshot images', images);
    //         if (images.length === 0) {
    //             getALlUrls(snap);
    //         }
    //     })
    // }

    // const getALlUrls = async (snap) => {
    //     // console.log('getALlUrls');
    //     let urls = [];
    //     // console.log('snap.docs', snap.docs);
    //     for (const doc of snap.docs) {
    //         // console.log("doc.data()", doc.data())
    //         const item = doc.data().imageId;
    //         // console.log("item", item);
    //         const url = await getClubById(item);
    //         // console.log(url);
    //         urls.push({ ...url, id: item.id});
    //     }
    //
    //     if (!user?.mail) {
    //         navigate('/login');
    //     } else if (urls.length === 0) {
    //         navigate('/');
    //     } else {
    //         setImages(urls);
    //     }
    // }


    // const getClubById = async (clubDocRef: DocumentReference) => {
    //     // console.log('getClubById');
    //     const clubSnapshot = await getDoc(clubDocRef);
    //     return clubSnapshot.data();
    // }

    useEffect(() => {
        // console.log('!user?.mail', !user?.mail);
        // console.log('!lindId', !lindId);
        // console.log(!(user?.mail && lindId));
        if (!user?.mail) {
            navigate('/images-quiz/login');
        }

        if (!lindId) {
            navigate('/images-quiz/login');
        }

        if (lindId && user?.mail) {
            // console.log('lindId && user?.mail', lindId, user?.mail);
            const q = query(collectionRef, where('name', '==', lindId), orderBy("createDate"));
            onSnapshot(q, (snap) => {
                // console.log('onSnapshot images', images);
                if (snaps.length === 0) {
                    // console.log('snap', snap)
                    setSnaps(snap.docs);
                }
                // if (images.length === 0) {
                //     getALlUrls(snap);
                // }
            })
        }

        // console.log('setLink', lindId);
        setLink(lindId);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (snaps.length > 0 && index === snaps.length) {
            navigate('/done');
        }
    }, [snaps, index, navigate])

    const handleClick = async (number) => {
        try {
            // console.log('handleClick');
            // console.log('currentImage', currentImage);

            const likesRef = await collection(db, 'likes');
            const alovelaceDocumentRef = doc(db, 'images', snaps[index].id);
            // console.log('alovelaceDocumentRef', alovelaceDocumentRef);
            const response = await addDoc(likesRef, {
                changedBy: new Date(),
                createBy: new Date(),
                email: user.mail ?? '',
                imageNum: currentImage?.num,
                imageId: alovelaceDocumentRef,
                username: "New",
                value: number
            });

            // console.log('response', response);
            if (response.id) {
                setIndex(index + 1);
            }
        } catch (e) {
            console.log(e);
        }

        //     .then(res => {
        //     console.log('Успешно');
        //     setIndex(index + 1);
        // }).catch(error => {
        //     console.log('error', error);
        // })
    }

    const handleEscape = (e) => {
        // console.log('handleEscape');
        const symbol = e.key;
        if (symbol === '1' || symbol === '2' || symbol === '3') {
            handleClick(+symbol);
        }
        if (symbol === 'x' || symbol === 'X') {
            // console.log(symbol);
            handleClick(0);
        }
    }

    const getClubByIdNew = async (clubDocRef) => {
        // console.log('getClubById');
        const clubSnapshot = await getDoc(clubDocRef);
        return clubSnapshot.data();
    }

    // const getImage = async (snap) => {
    //     const newItem = await getClubById(snaps[index].data().imageId);
    //     console.log('newItem', newItem);
    // }

    // useEffect(() => {
    //     document.addEventListener("keydown", handleEscape);
    //
    //     return () => {
    //         document.removeEventListener('keydown', handleEscape);
    //     };
    //     // eslint-disable-next-line
    // }, [images, index])

    useEffect(() => {
        // console.log('useEffect');
        if (snaps.length > 0) {

            if (index === snaps.length) {
                return;
            }
            // console.log('snaps[index]', index, snaps[index]);
            // console.log('snaps[index].data().imageId', index, snaps[index].data().imageId);

            getClubByIdNew(snaps[index].data().imageId).then(r => {
                // console.log('responce', r);
                // console.log('responce data', r.data);
                setCurrentImage(r);
            });
            // console.log('newItem', newItem);

        }
        // eslint-disable-next-line
    }, [snaps, index])

    useEffect(() => {
        // console.log('useEffect currentImage', currentImage);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
        // eslint-disable-next-line
    }, [currentImage])

    return (
        <div>
            <div id="cssportal-grid">
                <div id="poster" style={imageStyle}></div>
                {/*<div id="poster" style={imageStyleTest}></div>*/}
                <div id="category">
                    <div id="PED2024-Logo" style={logoStyle}></div>
                    <div id="category-name">
                        {
                            currentImage && currentImage?.category
                        }
                    </div>
                </div>
                <div id="awesome">
                    <button type="button" id="btn" onClick={() => handleClick(1)}>AWESOME (1)</button>
                </div>
                <div id="fine">
                    <button type="button" id="btn" onClick={() => handleClick(2)}>FINE (2)</button>
                </div>
                <div id="ok">
                    <button type="button" id="btn" onClick={() => handleClick(3)}>OK (3)</button>
                </div>
                <div id="no">
                    <button type="button" id="btnNo" onClick={() => handleClick(0)}>NO (x)</button>
                </div>
            </div>
            {/*{*/}
            {/*    images.length > 0 && <Slider images={images}/>*/}
            {/*}*/}
            {/*{*/}
            {/*    images && images.map((image, index) => {*/}
            {/*        console.log('image url', image.url);*/}
            {/*        return (*/}
            {/*            <img key={index} src={image.url} alt="no_image" width="200" height="200"/>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
        </div>
    );
}

export default MainPage;
