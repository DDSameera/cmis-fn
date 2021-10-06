import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTickets'
})
export class FilterTicketsPipe implements PipeTransform {

  transform(tikcetsArray:any,filterText:string) {
   let resultArray = [];

   for (let index = 0; index < tikcetsArray.length; index++) {
     const item  = tikcetsArray[index];
     console.log(filterText);
     console.log(item.cust_name.indexOf(filterText))

     if(item.cust_name.indexOf(filterText) != -1){
       resultArray.push(item);
     }

   }
   return resultArray;
  }

}
