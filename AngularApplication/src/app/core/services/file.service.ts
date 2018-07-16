import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {

  }

  public readFile(path: string): Observable<any> {
    return this.http.get<any>(path, { responseType: <any>'text' });
  }
}
