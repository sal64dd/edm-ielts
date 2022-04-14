/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { ChangeDetectorRef, OnChanges } from '@angular/core';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterContentInit,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import {
  DictionaryServices,
} from 'src/app/services/dictionary.service';
import { createPopper } from '@popperjs/core';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/services/bookmark.service';
import {
  DefinationStatus,
  iHighlightRange,
  iHighlightRangeID,
  iWord,
} from 'src/app/types/annotation-types';
import { iDictonaryWordDefination, iDictonarySearchResult } from 'src/app/types/dictionary-types';

@Component({
  selector: 'mx-annotate',
  templateUrl: './annotation.html',
  styleUrls: ['./annotation.scss'],
})
export class MxAnnotationComponent implements OnChanges, AfterViewInit {
  /* ==== Properties ======= */
  @Input() HTML: string;
  @Input() PageID: string = 'test';
  @Input() Limited: boolean = false;
  Popperhandle: any = null;

  @ViewChild('popper') Popper: ElementRef;

  // Sequential list of all the words
  wordNodes: iWord[] = [];

  // Sequential list of all the nodes (words + spaces + everything else)
  allNodes: iWord[] = [];

  // selected element
  selectedNode: iWord | null = null;

  // status of popup
  popupStatus: 'hidden' | 'default' | 'define' = 'hidden';

  // status of highlighting
  highlightStatus: 'none' | 'highlighting' = 'none';
  highlightArray: iHighlightRange[] = [];
  currentHighlight: iHighlightRange = { start: null, end: null };

  // status of defination
  definationStatus: DefinationStatus = 'none';

  wordDefination: iDictonaryWordDefination | null = null;

  // default menu
  default = [
    { text: 'Define', onclick: () => this.define() },
    { text: 'Highlight', onclick: () => this.highlight() },
  ];

  /* ==== Methods ======= */
  constructor(
    public dictApi: DictionaryServices,
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private bookmarkService: BookmarkService,
    private router: Router
  ) {}

  highlight() {
    console.log('highlighting started');
    if(this.selectedNode){
      this.highlightStatus = 'highlighting';
      this.currentHighlight.start = this.selectedNode.node ;
      this.currentHighlight.end = null;
    }
  }

  removeHighlight() {
    console.log('remove highlight called for', this.selectedNode);
    if(this.selectedNode){
      this.selectedNode.highlightRanges.forEach( h =>
        this.removeHighlightRange(h)
      );
    }

  }

  define() {
    if(!this.selectedNode) return;
    console.log('define', this.selectedNode.word);
    const selectedText = this.selectedNode.word;

    // update system hack - bad
    this.popupStatus = 'define';
    this.definationStatus = 'loading';
    this.cd.detectChanges();
    this.Popperhandle.update();

    // check cache
    const def = this.dictApi.getCached(selectedText);
    if (def) {
      this.wordDefination = def;
      this.definationStatus = 'found';
      console.log('defination in cache found', def);
      this.showPopup(this.selectedNode.node);
      return;
    }

    // check serach api
    this.dictApi.search(selectedText).subscribe({
      error: (e) => {
        console.error('annotation - dictonary search query error', e);
      },
      next: (data) => {
        const results = data.results as iDictonarySearchResult[];
        console.log('define results: ', results);
        // no search results
        if (!results || results.length <= 0) {
          console.log('no search results found for', selectedText);

          this.definationStatus = 'not-found';
          this.showPopup(this.selectedNode!.node);
          return;
        }

        // get word defination
        this.dictApi.getResult(results[0].id).subscribe({
          next: (data2) => {
            const result = data2 as iDictonaryWordDefination;
            console.log('define word:', result);
            if (result) {
              this.wordDefination = result;
              this.definationStatus = 'found';
            } else {
              this.definationStatus = 'not-found';
            }

            this.showPopup(this.selectedNode!.node);

            return;
          },
          error: (e) => {
            console.error('annotation - dictonary get results query error', e);
          }}
        );
      }
    });

  }

  private reset() {
    this.wordDefination = null;
    this.definationStatus = 'none';
    this.currentHighlight = { start: null, end: null };
    this.highlightArray = [];
    this.highlightStatus = 'none';
    this.popupStatus = 'hidden';
    this.selectedNode = null;
    this.allNodes = [];
    this.wordNodes = [];
    this.Popperhandle = null;
  }

  /* ==== Hooks ======= */
  ngOnChanges() {
    this.reset();

    console.log('PageID', this.PageID);

    if (this.Limited) {
      this.default = [
        { text: 'Define(Disabled)', onclick: () => null },
        { text: 'Highlight', onclick: () => this.highlight() },
      ];
    }

    this.prepareHTML();

    this.cd.detectChanges();

    this.buildWordList();
    this.initClickTargets();
    this.highlightArray = this.bookmarkService.get(this.PageID).map((v) => ({
      start: this.getWordFromID(v.startId)?.node ?? null,
      end: this.getWordFromID(v.endId)?.node ?? null,
    }));
    this.highlightArray.forEach((d) => this.highlightRange(d));
  }
  ngAfterViewInit() {}

  /* ==== Handlers ===== */

  // handles clicks
  onClickHandler(event: MouseEvent) {
    // select the element
    this.clearSelection();
    this.selectedNode = this.getWord(event.target as HTMLElement);
    this.select(this.selectedNode!.node);

    console.log('onclick handler called for: ', this.selectedNode!.id, event);

    // see if highlighting is on
    if (this.highlightStatus == 'highlighting') {
      this.highlightStatus = 'none';
      this.currentHighlight.end = this.selectedNode!!.node;
      this.highlightRange(this.currentHighlight);
      this.setHighlightArray(this.highlightArray.concat(this.currentHighlight));
    }

    // else just show the default popup
    else {
      if (this.isHighlighted(this.selectedNode!.node)) {
        this.default[1] = {
          text: 'Remove Highlight',
          onclick: () => this.removeHighlight(),
        };
      } else {
        this.default[1] = {
          text: 'Highlight',
          onclick: () => this.highlight(),
        };
      }

      this.showDefaultPopup(this.selectedNode!.node);
    }
  }

  // handles hovers
  onHoverHandler(event: MouseEvent) {
    const node = event.target as HTMLElement;

    // if pop up is on, dont do anything
    if (this.popupStatus != 'hidden') {
      return;
    } else if (this.highlightStatus == 'highlighting') {
      // highlighted the temporary range
    }
  }

  // handles mouse out
  onOutHandler(event: MouseEvent) {}

  /* ==== Anti Handlers ======= */
  @HostListener('document:click', ['$event']) onclickevent = (
    e: MouseEvent
  ) => {
    // console.log('document clicked', e.target);

    // check if a word was clicked
    for (const s of this.wordNodes) {
      if (s.node == e.target) {
        return;
      }
    }

    // else just reset everything else

    this.popupStatus = 'hidden';
    this.clearSelection();
  };

  @HostListener('document:mouseover', ['$event']) onhoverevent = (
    e: MouseEvent
  ) => {
    // check if a word was hovered
    for (const s of this.wordNodes) {
      if (s.node == e.target) {
        return;
      }
    }
  };

  /* ==== Helpers ======= */

  // Prepares the inner HTML by adding a span around each word
  private prepareHTML() {
    let idCounter = 0;
    const pageId = this.PageID;

    if (this.HTML) {
      // get content between the html opening and closing tags
      this.HTML = this.HTML.replace(/[^<>]+(?=[<])/g, (sentence): string =>
        // get the words from those sentences
        sentence.replace(/\S+|\s/g, (word) => {
          let id;
          let cls;
          if (word == ' ') {
            id = pageId + '_space_' + idCounter++;
            cls = 'annotate-space';
          } else {
            id = pageId + '_word_' + idCounter++;
            cls = 'annotate-btn';
          }

          return `<span class="ant ${cls} ${id}" >${word}</span>`;
        })
      );
    }
  }

  // builds word list by getting the id from the class list
  private buildWordList() {
    this.elementRef.nativeElement.querySelectorAll('.ant').forEach((node: HTMLElement) => {
      // get id from class name
      for (let i = 0; i < node.classList.length; i++) {
        const cls = node.classList[i];
        const isWord = node.classList.contains('annotate-btn');
        const regexp = isWord ? /(\w+_word_\d+)/g : /(\w+_space_\d+)/g;

        // if a valid class id exists then add to allNodes and wordNodes
        if (regexp.test(cls)) {
          // build the object
          const nodeIword: iWord = {
            word: node.innerText,
            id: cls,
            node,
            highlightRanges: [],
            highlighted: false,
          };

          // add to all nodes list
          this.allNodes.push(nodeIword);

          // add to word list if a word
          if (isWord) {
            this.wordNodes.push(nodeIword);
          }

          return;
        }
      }

      // loop ended without returning; valid classid not found
      console.error('Word Id not found for node: ', node);
    });
  }

  // To Each span adds required event listeners
  private initClickTargets() {
    this.wordNodes.forEach((word: iWord) => {
      word.node.addEventListener('click', (e) => this.onClickHandler(e));
      word.node.addEventListener('mouseover', (e) => this.onHoverHandler(e));
      word.node.addEventListener('mouseout', (e) => this.onOutHandler(e));
    });
  }

  //gets word id of a word node
  getWordId(node: HTMLElement): string | null {
    let word = this.getWord(node);
    return word ? word.id : null;
  }

  //gets word from wordlist
  private getWord(node: HTMLElement): iWord | null {
    for (const n of this.wordNodes) {
      if (n.node == node) {
        return n;
      }
    }
    return null;
  }

  // add select class to a word
  private select = (e: HTMLElement) => e.classList.add('selected');

  // remove select class from all wordNodes
  private clearSelection() {
    this.wordNodes.forEach((e) => e.node.classList.remove('selected'));
  }

  // show popper
  private showPopup(node: HTMLElement) {
    const popper: HTMLElement = this.Popper.nativeElement as HTMLElement;
    this.Popperhandle = createPopper(node, popper, {
      placement: 'top',
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: { offset: [0, 12] },
        },
      ],
    });
    this.cd.detectChanges();
    this.Popperhandle.update();
  }

  // show default popper
  private showDefaultPopup(node: HTMLElement) {
    this.popupStatus = 'default';
    this.showPopup(node);
  }

  // highlight a range of words
  private highlightRange(h: iHighlightRange) {
    let inRange = false;
    for (const w of this.allNodes) {
      if (w.node == h.start || w.node == h.end || inRange) {
        // highlight
        w.node.classList.add('highlighted');

        // update properties
        w.highlighted = true;
        w.highlightRanges.push({ start: h.start, end: h.end });

        // set inrange variable
        if (w.node == h.start) {
          inRange = !inRange;
        }
        if (w.node == h.end) {
          inRange = !inRange;
        }
      }
    }
  }

  // removes highlight from a range
  private removeHighlightRange(h: iHighlightRange) {
    let inRange = false;
    console.log('highlight-rage: ', h);
    for (const w of this.allNodes) {
      if (w.node == h.start || w.node == h.end || inRange) {
        // update properties - remove this range
        const newHighRange: iHighlightRange[] = [];
        for (const r of w.highlightRanges) {
          if (r.start != h.start || r.end != h.end) {
            newHighRange.push(r);
          }
        }
        w.highlightRanges = newHighRange;

        // set other properties
        if (newHighRange.length == 0) {
          w.highlighted = false;
          w.node.classList.remove('highlighted');
        }
      }

      // set inrange on or off
      if (w.node == h.start) {
        inRange = !inRange;
      }
      if (w.node == h.end) {
        inRange = !inRange;
      }
    }

    //remove from highlightranges too
    const newHighlightedArray: iHighlightRange[] = [];
    for (const r of this.highlightArray) {
      if (r.start != h.start || r.end != h.end) {
        newHighlightedArray.push(r);
      }
    }
    this.setHighlightArray(newHighlightedArray);
  }

  // returns true if the element is highlighted
  private isHighlighted(node: HTMLElement): boolean {
    return node.classList.contains('highlighted');
  }

  // capitalize
  public capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // sets the highlight array as well as bookmarks
  private setHighlightArray(newhighlightarray: iHighlightRange[]) {
    console.log('seting bookmark', this.PageID);
    this.highlightArray = [];
    for (const r of newhighlightarray) {
      this.highlightArray.push({ start: r.start, end: r.end });
    }

    if (this.Limited) {
      return;
    }

    this.bookmarkService.set(
      this.PageID,
      this.highlightArray.map( v => {
        let startId = this.getWordId(v.start!);
        let endId = this.getWordId(v.end!);
        let text = this.getText(v);

        if (startId && endId){
          return { startId, endId, text }
        } else {
          return null;
        }
      }).filter(v => v).map(v => v!),
      { name: 'Test', link: this.router.url }
    );
  }

  // gets the word from its id
  private getWordFromID(id: string): iWord | null {
    for (const w of this.wordNodes) {
      if (w.id == id) {
        return w;
      }
    }
    return null;
  }

  //get text
  private getText(h: iHighlightRange): string {
    let inRange = false;
    let text = '';
    for (const w of this.allNodes) {
      if (w.node == h.start || w.node == h.end || inRange) {
        text += w.word;
      }

      // set inrange on or off
      if (w.node == h.start) {
        inRange = !inRange;
      }
      if (w.node == h.end) {
        inRange = !inRange;
      }
    }
    return text;
  }
}
