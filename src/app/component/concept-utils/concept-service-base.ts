import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../service/config.service";
import {ConceptBaseModel} from "../../model/concept-base.model";

export abstract class ConceptServiceBase<T extends ConceptBaseModel> {
  protected conceptUrl: string;
  protected readonly url: string;
  protected type: T | undefined;
  protected code!: string;
  protected endpoints: {[key: string]: string}

  protected constructor(protected http: HttpClient,
                        protected configService: ConfigService,
                        conceptUrl: string,
                        endpoints: {[key: string]: string}) {
    this.url = this.configService.apiConfiguration.baseUrl
    this.conceptUrl = conceptUrl;
    this.endpoints = endpoints
  }

  async postTypeConcept(type: T): Promise<T | undefined> {
    try {
      const createdType: T = await firstValueFrom(this.http.post<T>(
        this.configService.apiConfiguration.baseUrl + `/${this.conceptUrl}`,
        type
      ))
      this.code = createdType.code ?? "";
      this.type = createdType
      return createdType
    } catch (err) {
      console.error(err)
    }
  }

  async patchTypeConcept(type: T, uuid:any): Promise<T | undefined> {
    try {
      const patchedType: T = await firstValueFrom(this.http.patch<T>(
        this.configService.apiConfiguration.baseUrl + `/${this.conceptUrl}/${uuid}`,
        type
      ))
      this.code = patchedType.code ?? "";
      this.type = patchedType
      return patchedType
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * This simple function will invalidate the currently stored type concept. The next time the
   * getConcept is called it will fetch the updated type.
   */
  setConceptUpdateNeeded() {
    this.type = undefined
  }

  /**
   * Formats a string by capitalizing the second word and removing hyphens.
   *
   * @param stepTitle - The stepTitle string to be formatted.
   * @returns The formatted string with the second word capitalized and hyphens removed.
   */
  formatStepTitle(stepTitle: string): string {
    const words = stepTitle.split('-'); // Split the string into an array of words

    if (words.length < 2) {
      // If there are less than 2 words, return the stepTitle as is
      return stepTitle;
    }

    const secondWord = words[1];
    const capitalizedSecondWord = secondWord.charAt(0).toUpperCase() + secondWord.slice(1);

    words.splice(1, 1, capitalizedSecondWord); // Replace the second word with the capitalized version

    return words.join(''); // Join the words back into a single string
  }

  add(model: any, type: string, uuid: string): void {
    const postUrl = `${this.url}/${this.conceptUrl}/${uuid}/${this.endpoints[type]}`;
    this.http.post(postUrl, model)
      .subscribe({
        next: (response) => {
          this.type = response as T;
        },
        error: (error) => {
          console.log(error);
        }
      });
  };

  getConceptListForStep(title: string) {
    if (this.type === undefined) {
      return;
    }
    //We need to format stepTitle first to match with the type object key.
    // @ts-ignore
    return this.type[this.formatStepTitle(title.toLowerCase())] ?? [];
  }

  /**
   * Should be used to clear the zaaktype in cache, if any.
   */
  clear() {
    this.type = undefined
    this.code = ""
  }

  setTypeCode(code: string) {
    this.code = code
  }
}
