/**
 * A tree node is a directory with a name, a list of files and a list of subdirectories.
 * The files and subdirectories are also tree nodes.
 * The files are strings.
 * The subdirectories are also tree nodes.
 */
export interface INode {
  name: string;
  files: string[];
  directories: INode[];
}
