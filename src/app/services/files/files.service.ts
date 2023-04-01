import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INode } from 'src/app/interfaces/INode';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = 'http://localhost:3000/files';

  constructor(private _httpService: HttpClient) {}

  /**
   * Get all files from the server
   * @returns {Observable<any[]>} Observable of files
   */
  getAllFiles(): Observable<INode[]> {
    return this._httpService.get<INode[]>(this.apiUrl);
  }

  /**
   * Get files by query from the server. e.g. q=foo
   * @param {string} query Query to search for
   * @returns {Observable<any[]>} Observable of files
   * @memberof FilesService
   */
  getFilesByQuery(query: string): Observable<INode[]> {
    return this._httpService.get<INode[]>(`${this.apiUrl}?q=${query}`);
  }
}
