export const getLocalStorageSize = () => {
    let totalSize = 0;

    // Iterate through all items in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const value = localStorage.getItem(key);

            // Measure the size of the value
            if (value) {
                // Calculate size in bytes
                totalSize += new Blob([key + value]).size;
            }
        }
    }

    // Convert bytes to megabytes (1 MB = 1024 * 1024 bytes)
    const sizeInMB = totalSize / (1024 * 1024);

    // Return size in MB with two decimal places
    return `${sizeInMB.toFixed(2)} MB`;
};