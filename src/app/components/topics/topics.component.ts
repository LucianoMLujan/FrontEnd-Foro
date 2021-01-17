import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public totalPage: number;
  public page: number;
  public nextPage: number;
  public prevPage: number;
  public status: string;
  public numberPages: number[];
  public paginate: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ){
    this.page_title = 'Temas';
    this.paginate = true;
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let page = +params['page'];

      if(!page || page == null || page == undefined) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.getTopics(page);
    });
  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      response => {
        if(response.topics) {
          this.topics = response.topics;
          this.status = 'success';
          this.totalPage = response.totalPages;
          let numberPages = [];

          for(let i=1; i <= this.totalPage; i++) {
            numberPages.push(i);
          }

          this.numberPages = numberPages;

          if(page >= 2) {
            this.prevPage = page-1;
          }else{
            this.prevPage = 1;
          }

          if(page < this.totalPage) {
            this.nextPage = page+1;
          }else{
            this.nextPage = this.totalPage;
          }

        }else{
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
