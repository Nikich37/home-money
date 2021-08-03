import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../models/bill.model";
import {map} from "rxjs/operators";
import {BaseApi} from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi{
  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any>{
    return this.http.get('http://data.fixer.io/api/latest\n'+
      '?access_key=7e42fd8b56c52164c31b22336ab1074d')
      .pipe(map((data: any)=>{
        return data;
      }));
  }
}
