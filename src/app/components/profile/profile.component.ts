import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public topics: Topic[];
  public url: string;
  public status: string;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var userId = params['id'];
      this.getUser(userId);
      this.getTopics(userId);
    });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.user) {
          this.status = 'success';
          this.user = response.user;
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  getTopics(userId) {
    this._topicService.getMyTopics(userId).subscribe(
      response => {
        if (response.topics) {
          this.status = 'success'
          this.topics = response.topics;
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
