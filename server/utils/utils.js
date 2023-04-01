/**
 * This recursive method simplifies the JSON data by removing empty directories and files.
 * @param {Array} data - Array of objects with directories and files
 * @returns {Array} simplifiedData - Array of objects with directories and files
*/
const simplifyJson = (data) => {
  let simplifiedData = [];

  data.forEach((item) => {
    let simplifiedItem = { name: item.name, files: item.files };

    if (item.directories && item.directories.length > 0) {
      let simplifiedDirectories = [];

      item.directories.forEach((directory) => {
        let simplifiedSubdirectories = simplifyJson(directory);

        if (simplifiedSubdirectories.length > 0) {
          simplifiedDirectories = simplifiedDirectories.concat(
            simplifiedSubdirectories
          );
        }
      });

      if (simplifiedDirectories.length > 0) {
        simplifiedItem.directories = simplifiedDirectories;
      }
    }

    if (
      simplifiedItem.files.length > 0 ||
      (simplifiedItem.directories && simplifiedItem.directories.length > 0)
    ) {
      simplifiedData.push(simplifiedItem);
    }
  });

  return simplifiedData;
};

module.exports = simplifyJson;
