import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { INode } from 'src/app/interfaces/INode';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  fullTree: any;
  searchResults: any;
  query = '';
  searchQuery = new FormControl();
  fileNotFound = false;
  private _subscriptions: Subscription = new Subscription(); // Subscription to unsubscribe from all subscriptions when the component is destroyed

  constructor(private _filesService: FilesService) {}

  ngOnInit(): void {
    // Get all files from the server
    this._subscriptions.add(
      this._filesService
        .getAllFiles()
        .pipe(map((data: any[]) => this._convertINodesToTreeNodes(data)))
        .subscribe({
          next: (data) => {
            this.fullTree = data;
          },
          error: (err) => {
            console.error(err);
          },
        })
    );
    // Subscribe to the search query and filter the tree based on the query, after the user has stopped typing for 1200ms and the query is at least 3 characters long
    this._subscriptions.add(
      this.searchQuery.valueChanges
        .pipe(
          debounceTime(1200), // wait 1500ms after the last event before emitting last event
          map((value: string) => value.trim()),
          filter((value: string) => {
            if (value.length < 3) {
              this.searchResults = [];
              this.fileNotFound = false;
            }
            return value.length >= 3;
          }), // only emit if value is at least 3 characters long
          distinctUntilChanged(), // only emit if value is different from previous value
          switchMap((value: string) =>
            this._filesService.getFilesByQuery(value)
          ), // switch to new observable each time the value changes
          map((data: any[]) => this._convertINodesToTreeNodes(data)) // convert the INode[] to TreeNode[]
        )
        .subscribe({
          next: (res) => {
            if (res.length) {
              this.searchResults = res;
            } else {
              this.fileNotFound = true;
            }
          },
          error: (err) => {
            console.error(err);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /*
  * This method resets the tree to the initial state
  */
  resetTree(): void {
    this.searchQuery.setValue('');
    this.searchResults = [];
    this.fileNotFound = false;
  }

  /**
   * Helper function to convert the INode[] to TreeNode[]
   * @param iNodes (INode[])
   */
  private _convertINodesToTreeNodes(iNodes: INode[]): TreeNode[] {
    const treeNodes: TreeNode[] = [];
    iNodes.forEach((iNode: any) => {
      const tNode: TreeNode = {
        label: iNode.name ? iNode.name : iNode, // If the node is a file, it doesn't have a name property
        data: iNode.files,
        icon: iNode.name ? 'pi pi-folder' : 'pi pi-file',
        type: iNode.name ? 'directories' : 'files',
        children: this._convertINodesToTreeNodes(
          iNode.directories || iNode.files || []
        ),
      };
      treeNodes.push(tNode);
    });
    return treeNodes;
  }

  /**
   * Helper function to filter the tree based on the query
   * @param nodes
   * @param query
   * @returns filtered nodes
   */
  private _filterNodes(nodes: TreeNode[], query: string): TreeNode[] {
    const filteredNodes: TreeNode[] = [];
    nodes.forEach((node) => {
      if (
        node.label &&
        node.label.toLowerCase().includes(query.toLowerCase())
      ) {
        filteredNodes.push(node);
      } else if (node.children) {
        const filteredChildren = this._filterNodes(node.children, query);
        if (filteredChildren.length) {
          filteredNodes.push({ ...node, children: filteredChildren });
        }
      }
    });
    return filteredNodes;
  }
}
