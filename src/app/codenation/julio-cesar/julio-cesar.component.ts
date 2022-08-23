import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**Models.*/
import { GeneratedData } from '../model/generated-data.model';

/**Services.*/
import { CodenationService } from '../codenation.service';

@Component({
  selector: 'app-julio-cesar',
  templateUrl: './julio-cesar.component.html',
  styleUrls: ['./julio-cesar.component.css']
})
export class JulioCesarComponent implements OnDestroy {

  private readonly end = new Subject<boolean>();

  /**
   * Lowercase alphabet letters code.
   */
  private charCode = { minimum: 97, maximum: 122 };

  public generatedData: GeneratedData = null;

  public answerFile: File = null;

  constructor(
    private codenationService: CodenationService
  ) { }

  ngOnDestroy(): void {
    this.end.next();
    this.end.complete();
  }

  private getGeneratedData(): void {
    this.codenationService
      .getGeneratedData()
      .pipe(takeUntil(this.end))
      .subscribe(
        response => {
          this.generatedData = response;
          this.treatGeneratedData();
        },
        error => {
          console.log(error);
        }
      )
    ;
  }

  private sendAnswerFile(object: File): void {
    this.codenationService
      .sendAnswerFile(object)
      .pipe(takeUntil(this.end))
      .subscribe(
        response => {
          this.answerFile = null;
          console.log(response);
        },
        error => {
          this.answerFile = null;
          console.log(error);
        }
      )
    ;
  }

  private saveGeneratedData(object: GeneratedData): void {
    this.codenationService
      .saveGeneratedData(object)
      .pipe(takeUntil(this.end))
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    ;
  }

  private decipherMessage(encryptedMessage: string, encryptionKey: number): string {
    if (encryptedMessage && typeof encryptedMessage === 'string') {
      if ((encryptionKey || encryptionKey === 0) && typeof encryptionKey === 'number' && encryptionKey >= 0) {
        const message = String(encryptedMessage).toLowerCase();
        let decipheredMessage = '';
        let letterCode = 0;

        for (let i = 0; i < message.length; i++) {
          letterCode = message.charCodeAt(i);

          if (letterCode >= this.charCode.minimum && letterCode <= this.charCode.maximum) {
            if ((letterCode - encryptionKey) >= this.charCode.minimum && (letterCode - encryptionKey) <= this.charCode.maximum) {
              decipheredMessage += String.fromCharCode(letterCode - encryptionKey);

            } else if ((letterCode - encryptionKey) < this.charCode.minimum) {
              decipheredMessage += String.fromCharCode(
                this.charCode.maximum - this.treatLowerEncryptionKey(letterCode - encryptionKey)
              );
            }

          } else {
            decipheredMessage += message[i];
          }
        }
        return decipheredMessage;
      }
    }
    return '';
  }

  private async generateCryptographicSummary(decipheredMessage: string): Promise<string> {
    const internalDecipheredMessage = decipheredMessage;
    const textEncoder = new TextEncoder();
    const buffer = textEncoder.encode(internalDecipheredMessage);
    const digest = await crypto.subtle.digest('SHA-1', buffer);
    const hash = Array
      .from(new Uint8Array(digest))
      .map(element => element.toString(16).padStart(2,'0'))
      .join('')
    ;
    return hash;
  }

  private treatLowerEncryptionKey(lowerCharCode: number): number {
    let expectedCharCode = lowerCharCode;

    if (expectedCharCode >= 0) {
      expectedCharCode = (this.charCode.minimum - expectedCharCode) - 1;

    } else {
      expectedCharCode = Math.abs(expectedCharCode) + this.charCode.minimum;
    }

    while (expectedCharCode > (this.charCode.maximum - this.charCode.minimum)) {
      expectedCharCode = expectedCharCode - (this.charCode.maximum - this.charCode.minimum);
    }

    return expectedCharCode;
  }

  private treatGeneratedData(): void {
    if (this.generatedData) {
      this.generatedData.decifrado = this.decipherMessage(
        this.generatedData.cifrado,
        this.generatedData.numero_casas
      );

      this.generateCryptographicSummary(this.generatedData.decifrado).then(
        response => {
          this.generatedData.resumo_criptografico = response;
          this.saveGeneratedData(this.generatedData);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public changeAnswerFile(fileList: FileList): void {
    if (fileList) {
      this.answerFile = fileList[0];
    }
  }

  public clickGetGeneratedData(): void {
    this.generatedData = null;
    this.answerFile = null;
    this.getGeneratedData();
  }

  public clickSendAnswerFile(): void {
    if (this.answerFile) {
      this.sendAnswerFile(this.answerFile);
    }
  }
}
