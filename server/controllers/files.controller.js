const fs = require("fs");
const path = require("path");
const simplifyJson = require("../utils/utils");
// get the tree.json path
const treePath = path.join(__dirname, "../data/tree.json");

class File {
  constructor() {}

  /**
   * This method reads the tree.json file and returns the simplified data.
   * @returns {Array} filesAndDirectories
   * @throws {Error} if there is an error reading or parsing the tree.json file
   */
  getFiles() {
    try {
      const fileContents = fs.readFileSync(treePath, "utf-8");
      return simplifyJson(JSON.parse(fileContents));
    } catch (err) {
      console.error(`Error reading or parsing ${treePath}: ${err}`);
      throw new Error(`Error reading or parsing ${treePath}: ${err}`);
    }
  }

  /**
   * This recursive method searches each node's files and directories names for the given prefix recursively. If the prefix is empty, it returns all the files and directories.
   * If the prefix is not empty, it returns the files and directories that start with the given prefix.
   * @param {string} prefix
   * @returns {Array} filesAndDirectories
   */
  searchNodesForPrefix(prefix) {
    // get all the files and directories
    const filesAndDirectories = this.getFiles();
    // if the prefix is empty, return all the files and directories
    if (!prefix) {
      console.error("prefix is empty");
      return filesAndDirectories;
    }
    // if the prefix is not empty, search for the files and directories that start with the given prefix
    const filteredFilesAndDirectories = [];
    const searchNodes = (nodes) => {
      nodes.forEach((node) => {
        // Directory names
        if (node?.name?.startsWith(prefix)) {
          filteredFilesAndDirectories.push(node);
        }
        // File names
        if (node?.files) {
          node?.files?.map((file) => {
            if (file?.startsWith(prefix)) {
              filteredFilesAndDirectories.push(file);
            }
          });
        }
        // Subdirectories
        if (node?.directories && node?.directories?.length > 0) {
          searchNodes(node.directories);
        }
      });
    };
    searchNodes(filesAndDirectories);
    return filteredFilesAndDirectories;
  }
}

module.exports = new File();
