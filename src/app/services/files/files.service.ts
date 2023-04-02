import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { INode } from 'src/app/interfaces/INode';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = 'http://localhost:3000/files';
  private cache = new Map<string, Observable<any>>();

  constructor(private _httpService: HttpClient) {}

  /**
   * Get all files from the server
   * @returns {Observable<any[]>} Observable of files
   */
  getAllFiles(): Observable<INode[] | any> {
    const cacheKey = 'getAllFiles';

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this._httpService
      .get<INode[]>(this.apiUrl)
      .pipe(tap((data: any) => this.cache.set(cacheKey, data)));
  }

  /**
   * Get files by query from the server. e.g. q=foo
   * @param {string} query Query to search for
   * @returns {Observable<any[]>} Observable of files
   * @memberof FilesService
   */
  getFilesByQuery(query: string): Observable<INode[] | any> {
    const cacheKey = `getFilesByQuery_${query}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this._httpService.get<INode[]>(`${this.apiUrl}?q=${query}`).pipe(
      tap((data: any) => {
        this.cache.set(cacheKey, data);
      })
    );
  }
}
