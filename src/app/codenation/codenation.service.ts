import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**Models.*/
import { GeneratedData } from './model/generated-data.model';

@Injectable()
export class CodenationService {

  private readonly endpoint = '';

  private readonly token = '';

  private readonly server = 'http://localhost:3001/';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=SEU_TOKEN
   */
  public sendAnswerFile(object: File): Observable<any> {
    const formData = new FormData();
    formData.append('answer', object, object.name);
    return this.httpClient.post(
      `${this.endpoint}submit-solution?token=${this.token}`, formData
    );
  }

  /**
   * https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=SEU_TOKEN
   */
  public getGeneratedData(): Observable<GeneratedData> {
    return this.httpClient.get<GeneratedData>(
      `${this.endpoint}generate-data?token=${this.token}`
    );
  }

  public saveGeneratedData(object: GeneratedData): Observable<any> {
    return this.httpClient.post(
      `${this.server}answer`,
      object
    );
  }
}
