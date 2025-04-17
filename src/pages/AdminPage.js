import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import {useState} from "react";

function AdminPage() {

    const [ url, setUrl ] = useState( '');
    const [ num, setNum ] = useState( 0);

    // const collectionRef = collection(db, 'images');
    const addImage = async () => {
        // console.log('url', url);
        const imagesRef = await collection(db, 'images');
        // const linksRef = await collection(db, 'links');
        // const q = await query(imagesRef, where('url', '==', url));
        // const alovelaceDocumentRef = doc(db, 'images', images[index].id);

        const responseImage = await addDoc(imagesRef, {
            num: +num,
            createDate: new Date(),
            category: 'Eat, drink and love',
            url: url,
        });

        // console.log('response', response);

        if (responseImage.id) {
            // const imageDocumentRef = doc(db, 'images', response.id);
            // console.log("responseImage", responseImage);
            // const responseLink = await addDoc(linksRef, {
            //     createDate: new Date(),
            //     imageId: responseImage,
            //     name: "am32-4fg1-23nm",
            // });

            // console.log("responseLink", responseLink);

        }
    }

    const changeUrl = () => {
        let newUrl;
        newUrl = "https://drive.google.com/thumbnail?id=" + url.slice(-33) + "&sz=w595";
        // console.log(newUrl);
        setUrl(newUrl);
    }


    return <div style={{color: 'rgb(0, 203, 95)', fontSize: 19}}>
        <h1>
            Create imageUrl
        </h1>
        <input style={{width: 600}} placeholder='imageUrl' value={url} onChange={(e) => setUrl(e.target.value)}>
        </input>
        <br/>
        { url }
        <br/>
        <input placeholder='num' type='number' value={num} onChange={(e) => setNum(e.target.value)}/>
        <br/>
        { num }
        <br/>
        <button onClick={addImage}> Creat new imageUrl</button>
        <button onClick={changeUrl}> Change url</button>
    </div>
}

export default AdminPage;
