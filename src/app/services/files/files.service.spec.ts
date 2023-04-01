import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FilesService } from './files.service';
import { INode } from 'src/app/interfaces/INode';

fdescribe('FilesService', () => {
  let service: FilesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilesService],
    });
    service = TestBed.inject(FilesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return files from the server when getAllFiles is called', () => {
    const dummyFiles: INode[] = [
      { directories: [], files: [], name: 'file1.txt' },
      { directories: [], files: [], name: 'file2.txt' },
    ];

    service.getAllFiles().subscribe((files) => {
      expect(files.length).toBe(2);
      expect(files).toEqual(dummyFiles);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/files');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFiles);
  });

  it('should return files by query from the server when getFilesByQuery is called', () => {
    const query = 'foo';
    const dummyFiles: INode[] = [
      { directories: [], files: [], name: 'file1.txt' },
      { directories: [], files: [], name: 'file2.txt' },
    ];

    service.getFilesByQuery(query).subscribe((files) => {
      expect(files.length).toBe(2);
      expect(files).toEqual(dummyFiles);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/files?q=${query}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyFiles);
  });
});
