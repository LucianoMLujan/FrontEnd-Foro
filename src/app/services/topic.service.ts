import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class TopicService{
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    addTopic(token, topic):Observable<any> {
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'topic', params, {headers: headers});
        
    }

    getMyTopics(userId):Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url + 'user-topics/'+userId, {headers: headers});
    }

    getTopic(topicId):Observable<any> {
        return this._http.get(this.url + 'topic/' + topicId);
    }

    update(token, id, topic):Observable<any> {
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                      .set('Authorization', token);
        
        return this._http.put(this.url + 'topic/' + id, params, {headers: headers});
    }

    delete(token, id):Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                      .set('Authorization', token);
        
        return this._http.delete(this.url + 'topic/'+id, {headers: headers});
    }

    getTopics(page = 1):Observable<any> {
        return this._http.get(this.url+'topics/'+page);
    }

    search(search):Observable<any> {
        return this._http.get(this.url+'search/'+search);
    }

}