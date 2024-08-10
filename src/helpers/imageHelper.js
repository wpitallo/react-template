const imageRequestCache = new Map();

const dbName = 'imageCache';
const storeName = 'images';

const clearObjectStore = async (dbName, storeName) => {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName);

        openRequest.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const clearRequest = store.clear();

            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = (event) => reject(event.target.error);
        };

        openRequest.onerror = (event) => reject(event.target.error);
    });
};

export const clearImageCache = () => {
    clearObjectStore(dbName, storeName)
        .then(() => console.log('Object store cleared successfully'))
        .catch(error => console.error('Error clearing object store:', error));
}

window.app.utils.clearImageCache = clearImageCache

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName);
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

const saveToIndexedDB = async (url, base64data) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.put(base64data, url);
    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject(event.target.error);
    });
};

const fetchFromIndexedDB = async (url) => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.get(url);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Function to fetch and cache the image
export const fetchAndCacheImage = async (url) => {
    // Check if the image is already in the cache
    if (imageRequestCache.has(url)) {
        return imageRequestCache.get(url); // Return the cached image
    }

    // Check if the image is in IndexedDB
    const storedImage = await fetchFromIndexedDB(url);
    if (storedImage) {
        imageRequestCache.set(url, storedImage); // Cache it in memory
        return storedImage; // Return the stored image
    }

    // If not in IndexedDB, fetch from the URL
    try {
        const response = await fetch(url, { mode: 'cors' });

        // Convert response to Blob and store in IndexedDB and cache
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64data = reader.result;
                await saveToIndexedDB(url, base64data); // Store image in IndexedDB
                imageRequestCache.set(url, base64data); // Cache it in memory
                resolve(base64data); // Return the fetched image
            };
            reader.onerror = reject;
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return null; // Handle error appropriately (e.g., return a placeholder image)
    }
};

// Function to retrieve the image from cache or fetch if necessary
export const getImage = (url) => {
    if (imageRequestCache.has(url)) {
        return imageRequestCache.get(url); // Return the cached image
    }

    fetchAndCacheImage(url); // Fetch and cache if not found
    return url
};
