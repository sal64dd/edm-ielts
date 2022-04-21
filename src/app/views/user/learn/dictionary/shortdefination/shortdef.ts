import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DictionaryServices } from 'src/app/services/dictionary.service';

@Component({
  selector: 'shortdef',
  template: `{{ toTitleCase(pronunciations.definitions) }}`,
})
export class ShortDefComponent implements OnChanges, OnInit {
  @Input() label: string;
  @Output() labelChange = new EventEmitter<string>();
  @Input() id: string;
  @Output() idChange = new EventEmitter<string>();

  @ViewChild('audio') audio: ElementRef;

  toTitleCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  processing = true;
  datas: any;
  audioPlay: any = true;
  pronunciations: any = {
    dialects: '',
    phoneticNotation: '',
    phoneticSpelling: '',
    audioFile: '',
    lexicalCategory: '',
    definitions: '',
    definationexamples: [],
    shortDefinitions: '',
    synonyms: [],
    language: '',
    etymologies: '',
    phrases: [],
  };

  constructor(
    public dictionaryApi: DictionaryServices,
  ) {}
  ngOnInit(): void {
    this.processing = true;
    console.log(this.label);
    console.log(this.id);
    this.getSearchResult();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.processing = true;
    this.getSearchResult();
  }

  playAudio() {
    this.audio.nativeElement.play();

    console.log(this.pronunciations.audioFile);
  }

  getSearchResult() {
    this.dictionaryApi.getResult(this.id).subscribe(
      (data) => {
        this.datas = data;
        console.log(this.datas);
        //.........................................pronunciations
        let pronunciations;
        try {
          pronunciations =
            this.datas.results[0].lexicalEntries[0].entries[0].pronunciations.filter(
              (data: any) => data.audioFile != undefined
            );
          console.log(pronunciations);
        } catch (err) {}
        try {
          this.pronunciations.audioFile = pronunciations[0].audioFile;
        } catch (err) {}
        try {
          this.pronunciations.dialects = pronunciations[0].dialects[0];
        } catch (err) {}
        try {
          this.pronunciations.phoneticNotation =
            pronunciations[0].phoneticNotation;
        } catch (err) {}
        try {
          this.pronunciations.phoneticSpelling =
            pronunciations[0].phoneticSpelling;
        } catch (err) {}
        try {
          this.pronunciations.lexicalCategory =
            this.datas.results[0].lexicalEntries[0].lexicalCategory.text;
        } catch (err) {}

        //..........................................defination...............
        try {
          this.pronunciations.definitions =
            this.datas.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        } catch (err) {}
        try {
          this.pronunciations.definationexamples =
            this.datas.results[0].lexicalEntries[0].entries[0].senses[0].examples;
        } catch (err) {}
        try {
          this.pronunciations.shortDefinitions =
            this.datas.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0];
        } catch (err) {}
        try {
          this.pronunciations.synonyms =
            this.datas.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
        } catch (err) {}
        try {
          this.pronunciations.language = this.datas.results[0].language;
        } catch (err) {}
        try {
          this.pronunciations.etymologies =
            this.datas.results[0].lexicalEntries[0].entries[0].etymologies[0];
        } catch (err) {}
        try {
          this.pronunciations.phrases =
            this.datas.results[0].lexicalEntries[0].phrases;
        } catch (err) {}
        this.processing = false;

        //    const browser = this.iab.create(this.data);
        setTimeout(() => {
          this.audio.nativeElement.load();

          this.audio.nativeElement.onplay = () => {
            this.audioPlay = false;
          };
          this.audio.nativeElement.onpause = () => {
            this.audioPlay = true;
          };
          this.audio.nativeElement.onended = () => {
            this.audioPlay = true;
          };
        }, 100);
      },
      (err) => {
        console.log(err);
        this.processing = false;
      }
    );
  }
}
