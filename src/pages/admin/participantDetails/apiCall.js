import {IMAGE_URL, PARTICIPANTS} from "../../../config/api";

export async function updateParticipant(updateBody) {
    try {
        const token = sessionStorage.getItem('token');
        console.log('updateBody', updateBody);
        await fetch(PARTICIPANTS, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(removeEmptyObjects(updateBody)),
        })
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

export async function downloadImage(imageUrl) {
    try {
        const apiBody = {
            "url": imageUrl,
            "thumbnail": true
        }
        const token = sessionStorage.getItem('token');
        const response = await fetch(IMAGE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(removeEmptyObjects(apiBody)),
        })
        return await response.blob()
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const removeEmptyObjects = (obj) => {
    if (Array.isArray(obj)) {
        return obj
            .map(removeEmptyObjects)
            .filter((item) => !(typeof item === "object" && item !== null && Object.keys(item).length === 0));
    } else if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach((key) => {
            obj[key] = removeEmptyObjects(obj[key]);
            if (typeof obj[key] === "object" && obj[key] !== null && Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        });
    }
    return obj;
};